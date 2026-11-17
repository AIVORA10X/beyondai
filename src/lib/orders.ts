import crypto from 'crypto';
import { ensureSchema, getSql } from './db';

export type OrderStatus =
  | 'pending_review'
  | 'awaiting_payment'
  | 'paid'
  | 'in_progress'
  | 'awaiting_user'
  | 'completed'
  | 'rejected'
  | 'cancelled';

export type PaymentStatus = 'none' | 'pending' | 'paid' | 'failed';

export type Order = {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  productId: string;
  productName: string;
  planNote: string;
  userNote: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  amount: number;
  createdAt: string;
  updatedAt: string;
  teamNote?: string;
};

function mapOrder(row: Record<string, unknown>): Order {
  return {
    id: String(row.id),
    userId: String(row.user_id),
    userName: String(row.user_name),
    userEmail: String(row.user_email),
    productId: String(row.product_id),
    productName: String(row.product_name),
    planNote: String(row.plan_note || ''),
    userNote: String(row.user_note || ''),
    status: row.status as OrderStatus,
    paymentStatus: (row.payment_status as PaymentStatus) || 'none',
    amount: Number(row.amount || 0),
    createdAt: new Date(String(row.created_at)).toISOString(),
    updatedAt: new Date(String(row.updated_at)).toISOString(),
    teamNote: row.team_note ? String(row.team_note) : undefined,
  };
}

export async function createOrder(input: {
  userId: string;
  userName: string;
  userEmail: string;
  productId: string;
  productName: string;
  planNote: string;
  userNote: string;
  amount?: number;
}): Promise<Order> {
  await ensureSchema();
  const sql = getSql();
  const id = `ORD-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
  const amount = input.amount ?? 0;
  const rows = await sql`
    INSERT INTO orders (
      id, user_id, user_name, user_email, product_id, product_name,
      plan_note, user_note, status, payment_status, amount
    ) VALUES (
      ${id}, ${input.userId}, ${input.userName}, ${input.userEmail},
      ${input.productId}, ${input.productName}, ${input.planNote},
      ${input.userNote}, 'pending_review', 'none', ${amount}
    )
    RETURNING *
  `;
  return mapOrder(rows[0] as Record<string, unknown>);
}

export async function getOrders(): Promise<Order[]> {
  await ensureSchema();
  const sql = getSql();
  const rows = await sql`SELECT * FROM orders ORDER BY created_at DESC`;
  return rows.map((r) => mapOrder(r as Record<string, unknown>));
}

export async function getOrdersByUser(userId: string): Promise<Order[]> {
  await ensureSchema();
  const sql = getSql();
  const rows = await sql`
    SELECT * FROM orders WHERE user_id = ${userId} ORDER BY created_at DESC
  `;
  return rows.map((r) => mapOrder(r as Record<string, unknown>));
}

export async function getOrderById(id: string): Promise<Order | undefined> {
  await ensureSchema();
  const sql = getSql();
  const rows = await sql`SELECT * FROM orders WHERE id = ${id} LIMIT 1`;
  if (!rows[0]) return undefined;
  return mapOrder(rows[0] as Record<string, unknown>);
}

export async function updateOrder(
  id: string,
  patch: Partial<Pick<Order, 'status' | 'paymentStatus' | 'teamNote' | 'amount'>>
): Promise<Order | null> {
  await ensureSchema();
  const sql = getSql();
  const current = await getOrderById(id);
  if (!current) return null;
  const status = patch.status ?? current.status;
  const paymentStatus = patch.paymentStatus ?? current.paymentStatus;
  const teamNote = patch.teamNote ?? current.teamNote ?? null;
  const amount = patch.amount ?? current.amount;
  const rows = await sql`
    UPDATE orders SET
      status = ${status},
      payment_status = ${paymentStatus},
      team_note = ${teamNote},
      amount = ${amount},
      updated_at = NOW()
    WHERE id = ${id}
    RETURNING *
  `;
  if (!rows[0]) return null;
  return mapOrder(rows[0] as Record<string, unknown>);
}

export const orderStatusText: Record<OrderStatus, string> = {
  pending_review: 'در انتظار بررسی',
  awaiting_payment: 'منتظر پرداخت',
  paid: 'پرداخت‌شده',
  in_progress: 'در حال انجام',
  awaiting_user: 'منتظر پاسخ شما',
  completed: 'تکمیل‌شده',
  rejected: 'رد شده',
  cancelled: 'لغو شده',
};
