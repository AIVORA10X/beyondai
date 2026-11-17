import { neon } from '@neondatabase/serverless';

export function getSql() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('DATABASE_URL is not set');
  return neon(url);
}

let migrated = false;

export async function ensureSchema() {
  if (migrated) return;
  const sql = getSql();
  await sql`CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL, role TEXT NOT NULL DEFAULT 'user',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW())`;
  await sql`CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id),
    user_name TEXT NOT NULL, user_email TEXT NOT NULL,
    product_id TEXT NOT NULL, product_name TEXT NOT NULL,
    plan_note TEXT DEFAULT '', user_note TEXT DEFAULT '',
    status TEXT NOT NULL DEFAULT 'pending_review',
    payment_status TEXT NOT NULL DEFAULT 'none', amount INTEGER NOT NULL DEFAULT 0,
    team_note TEXT, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW())`;
  await sql`CREATE TABLE IF NOT EXISTS tickets (
    id TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id),
    user_name TEXT NOT NULL, user_email TEXT NOT NULL,
    subject TEXT NOT NULL, message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'open', reply TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW())`;
  await sql`CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY, name TEXT NOT NULL, category TEXT NOT NULL DEFAULT '',
    short_desc TEXT NOT NULL DEFAULT '', description TEXT NOT NULL DEFAULT '',
    status TEXT NOT NULL DEFAULT 'active', price_label TEXT NOT NULL DEFAULT '',
    amount INTEGER NOT NULL DEFAULT 0, delivery_note TEXT NOT NULL DEFAULT '',
    features JSONB NOT NULL DEFAULT '[]', tag TEXT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW())`;
  migrated = true;
}
