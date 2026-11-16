import { cookies } from 'next/headers';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

export type UserRole = 'user' | 'admin';

export type User = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  createdAt: string;
};

function dataDir() {
  if (process.env.VERCEL) return path.join('/tmp', 'beyondai-data');
  return path.join(process.cwd(), 'data');
}
const USERS_FILE = path.join(dataDir(), 'users.json');
const SESSION_SECRET = process.env.SESSION_SECRET || 'beyondai-dev-secret-change-me-in-production-2026';
const COOKIE_NAME = 'beyondai_session';
const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || 'admin@beyondai.example')
  .split(',')
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

function ensureUsersFile() {
  const dir = path.dirname(USERS_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(USERS_FILE)) fs.writeFileSync(USERS_FILE, '[]', 'utf-8');
}

export function getUsers(): User[] {
  ensureUsersFile();
  try {
    return JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8')) as User[];
  } catch {
    return [];
  }
}

function saveUsers(users: User[]) {
  ensureUsersFile();
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf-8');
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

export function createUser(
  name: string,
  email: string,
  password: string
): { ok: true; user: Omit<User, 'passwordHash'> } | { ok: false; error: string } {
  const users = getUsers();
  const normalized = email.trim().toLowerCase();
  if (users.some((u) => u.email === normalized)) {
    return { ok: false, error: 'این ایمیل قبلاً ثبت شده است.' };
  }
  if (password.length < 6) {
    return { ok: false, error: 'رمز عبور باید حداقل ۶ کاراکتر باشد.' };
  }
  if (!name.trim() || name.trim().length < 2) {
    return { ok: false, error: 'نام باید حداقل ۲ کاراکتر باشد.' };
  }
  const isFirstUser = users.length === 0;
  const role: UserRole =
    isFirstUser || ADMIN_EMAILS.includes(normalized) ? 'admin' : 'user';
  const user: User = {
    id: crypto.randomUUID(),
    name: name.trim(),
    email: normalized,
    passwordHash: hashPassword(password),
    role,
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  saveUsers(users);
  const { passwordHash, ...safe } = user;
  return { ok: true, user: safe };
}

export function findUserByEmail(email: string): User | undefined {
  return getUsers().find((u) => u.email === email.trim().toLowerCase());
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
  const age = Date.now() - Number(ts);
  if (age > 30 * 24 * 60 * 60 * 1000) return null;
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
  const user = getUsers().find((u) => u.id === userId);
  if (!user) return null;
  const { passwordHash, ...safe } = user;
  return safe;
}

export async function requireAdmin(): Promise<Omit<User, 'passwordHash'>> {
  const user = await getCurrentUser();
  if (!user || user.role !== 'admin') throw new Error('UNAUTHORIZED_ADMIN');
  return user;
}
