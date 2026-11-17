import { cookies } from 'next/headers';
import crypto from 'crypto';
import { ensureSchema, getSql } from './db';

export type UserRole = 'user' | 'admin';

export type User = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  createdAt: string;
};

const SESSION_SECRET = process.env.SESSION_SECRET || 'beyondai-dev-secret-change-me-in-production-2026';
const COOKIE_NAME = 'beyondai_session';

/** ایمیل‌های ادمین ثابت — از env یا پیش‌فرض مالک سایت */
const ADMIN_EMAILS = (
  process.env.ADMIN_EMAILS || 'tuhgf01@gmail.com'
)
  .split(',')
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

function isAdminEmail(email: string): boolean {
  return ADMIN_EMAILS.includes(email.trim().toLowerCase());
}

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(':');
  if (!salt || !hash) return false;
  const hashBuffer = Buffer.from(hash, 'hex');
  const test = crypto.scryptSync(password, salt, 64);
  try {
    return crypto.timingSafeEqual(hashBuffer, test);
  } catch {
    return false;
  }
}

function mapUser(row: Record<string, unknown>): User {
  const email = String(row.email);
  let role = (row.role as UserRole) || 'user';
  if (isAdminEmail(email)) role = 'admin';
  return {
    id: String(row.id),
    name: String(row.name),
    email,
    passwordHash: String(row.password_hash),
    role,
    createdAt: new Date(String(row.created_at)).toISOString(),
  };
}

/** اگر ایمیل ادمین است و نقش در DB هنوز user است، به admin ارتقا بده */
async function ensureAdminRole(user: User): Promise<User> {
  if (!isAdminEmail(user.email) || user.role === 'admin') return user;
  try {
    const sql = getSql();
    await sql`UPDATE users SET role = 'admin' WHERE id = ${user.id}`;
  } catch {
    /* ignore */
  }
  return { ...user, role: 'admin' };
}

export async function createUser(
  name: string,
  email: string,
  password: string
): Promise<{ ok: true; user: Omit<User, 'passwordHash'> } | { ok: false; error: string }> {
  await ensureSchema();
  const sql = getSql();
  const normalized = email.trim().toLowerCase();
  if (password.length < 6) return { ok: false, error: 'رمز عبور باید حداقل ۶ کاراکتر باشد.' };
  if (!name.trim() || name.trim().length < 2) return { ok: false, error: 'نام باید حداقل ۲ کاراکتر باشد.' };
  const existing = await sql`SELECT id FROM users WHERE email = ${normalized} LIMIT 1`;
  if (existing.length > 0) return { ok: false, error: 'این ایمیل قبلاً ثبت شده است.' };
  const countRows = await sql`SELECT COUNT(*)::int AS c FROM users`;
  const isFirstUser = Number(countRows[0]?.c || 0) === 0;
  const role: UserRole =
    isFirstUser || isAdminEmail(normalized) ? 'admin' : 'user';
  const id = crypto.randomUUID();
  const passwordHash = hashPassword(password);
  const rows = await sql`
    INSERT INTO users (id, name, email, password_hash, role)
    VALUES (${id}, ${name.trim()}, ${normalized}, ${passwordHash}, ${role})
    RETURNING id, name, email, password_hash, role, created_at
  `;
  const user = mapUser(rows[0] as Record<string, unknown>);
  const { passwordHash: _, ...safe } = user;
  return { ok: true, user: safe };
}

export async function findUserByEmail(email: string): Promise<User | undefined> {
  await ensureSchema();
  const sql = getSql();
  const rows = await sql`
    SELECT id, name, email, password_hash, role, created_at
    FROM users WHERE email = ${email.trim().toLowerCase()} LIMIT 1
  `;
  if (!rows[0]) return undefined;
  return ensureAdminRole(mapUser(rows[0] as Record<string, unknown>));
}

function sign(value: string): string {
  return crypto.createHmac('sha256', SESSION_SECRET).update(value).digest('hex');
}

export function createSessionToken(userId: string): string {
  const payload = `${userId}.${Date.now()}`;
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token: string): string | null {
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  const [userId, ts, signature] = parts;
  const payload = `${userId}.${ts}`;
  if (sign(payload) !== signature) return null;
  if (Date.now() - Number(ts) > 30 * 24 * 60 * 60 * 1000) return null;
  return userId;
}

export async function setSessionCookie(userId: string) {
  const token = createSessionToken(userId);
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 30 * 24 * 60 * 60,
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function getCurrentUser(): Promise<Omit<User, 'passwordHash'> | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  const userId = verifySessionToken(token);
  if (!userId) return null;
  await ensureSchema();
  const sql = getSql();
  const rows = await sql`
    SELECT id, name, email, password_hash, role, created_at
    FROM users WHERE id = ${userId} LIMIT 1
  `;
  if (!rows[0]) return null;
  const user = await ensureAdminRole(mapUser(rows[0] as Record<string, unknown>));
  const { passwordHash, ...safe } = user;
  return safe;
}

export async function requireAdmin(): Promise<Omit<User, 'passwordHash'>> {
  const user = await getCurrentUser();
  if (!user || user.role !== 'admin') throw new Error('UNAUTHORIZED_ADMIN');
  return user;
}
