import crypto from 'crypto';
import { ensureSchema, getSql } from './db';

export type Payment = {
  id: string;
  orderId: string;
  userId: string;
  amount: number;
  status: 'pending' | 'paid' | 'failed';
  authority?: string;
  refId?: string;
  gateway: string;
  createdAt: string;
  paidAt?: string;
};

function mapPayment(row: Record<string, unknown>): Payment {
  return {
    id: String(row.id),
    orderId: String(row.order_id),
    userId: String(row.user_id),
    amount: Number(row.amount || 0),
    status: row.status as Payment['status'],
    authority: row.authority ? String(row.authority) : undefined,
    refId: row.ref_id ? String(row.ref_id) : undefined,
    gateway: String(row.gateway || 'mock'),
    createdAt: new Date(String(row.created_at)).toISOString(),
    paidAt: row.paid_at ? new Date(String(row.paid_at)).toISOString() : undefined,
  };
}

export async function createPayment(input: {
  orderId: string;
  userId: string;
  amount: number;
  gateway?: string;
  authority?: string;
}): Promise<Payment> {
  await ensureSchema();
  const sql = getSql();
  const id = `PAY-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
  const gateway = input.gateway || 'mock';
  const authority = input.authority || id;
  const rows = await sql`
    INSERT INTO payments (id, order_id, user_id, amount, status, authority, gateway)
    VALUES (${id}, ${input.orderId}, ${input.userId}, ${input.amount}, 'pending', ${authority}, ${gateway})
    RETURNING *
  `;
  return mapPayment(rows[0] as Record<string, unknown>);
}

export async function getPaymentByAuthority(authority: string): Promise<Payment | undefined> {
  await ensureSchema();
  const sql = getSql();
  const rows = await sql`SELECT * FROM payments WHERE authority = ${authority} LIMIT 1`;
  if (!rows[0]) return undefined;
  return mapPayment(rows[0] as Record<string, unknown>);
}

export async function markPaymentPaid(
  authority: string,
  refId: string
): Promise<Payment | null> {
  await ensureSchema();
  const sql = getSql();
  const rows = await sql`
    UPDATE payments SET status = 'paid', ref_id = ${refId}, paid_at = NOW()
    WHERE authority = ${authority}
    RETURNING *
  `;
  if (!rows[0]) return null;
  return mapPayment(rows[0] as Record<string, unknown>);
}

export async function getPaymentsByOrder(orderId: string): Promise<Payment[]> {
  await ensureSchema();
  const sql = getSql();
  const rows = await sql`SELECT * FROM payments WHERE order_id = ${orderId} ORDER BY created_at DESC`;
  return rows.map((r) => mapPayment(r as Record<string, unknown>));
}
