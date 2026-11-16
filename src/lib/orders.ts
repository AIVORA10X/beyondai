import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

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

function dataDir() {
  if (process.env.VERCEL) return path.join('/tmp', 'beyondai-data');
  return path.join(process.cwd(), 'data');
}
const ORDERS_FILE = path.join(dataDir(), 'orders.json');

function ensureFile() {
  const dir = path.dirname(ORDERS_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(ORDERS_FILE)) fs.writeFileSync(ORDERS_FILE, '[]', 'utf-8');
}

export function getOrders(): Order[] {
  ensureFile();
  try {
    return JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf-8')) as Order[];
  } catch {
    return [];
  }
}

function saveOrders(orders: Order[]) {
  ensureFile();
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), 'utf-8');
}

export function createOrder(input: {
  userId: string;
  userName: string;
  userEmail: string;
  productId: string;
  productName: string;
  planNote: string;
  userNote: string;
  amount?: number;
}): Order {
  const orders = getOrders();
  const now = new Date().toISOString();
  const order: Order = {
    id: `ORD-${crypto.randomBytes(4).toString('hex').toUpperCase()}`,
    ...input,
    amount: input.amount ?? 0,
    status: 'pending_review',
    paymentStatus: 'none',
    createdAt: now,
    updatedAt: now,
  };
  orders.unshift(order);
  saveOrders(orders);
  return order;
}

export function getOrdersByUser(userId: string): Order[] {
  return getOrders().filter((o) => o.userId === userId);
}

export function getOrderById(id: string): Order | undefined {
  return getOrders().find((o) => o.id === id);
}

export function updateOrder(
  id: string,
  patch: Partial<Pick<Order, 'status' | 'paymentStatus' | 'teamNote' | 'amount'>>
): Order | null {
  const orders = getOrders();
  const idx = orders.findIndex((o) => o.id === id);
  if (idx < 0) return null;
  orders[idx] = { ...orders[idx], ...patch, updatedAt: new Date().toISOString() };
  saveOrders(orders);
  return orders[idx];
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
