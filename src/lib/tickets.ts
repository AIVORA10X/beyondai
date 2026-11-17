import crypto from 'crypto';
import { ensureSchema, getSql } from './db';

export type TicketStatus = 'open' | 'answered' | 'closed';

export type Ticket = {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  subject: string;
  message: string;
  status: TicketStatus;
  reply?: string;
  createdAt: string;
  updatedAt: string;
};

function mapTicket(row: Record<string, unknown>): Ticket {
  return {
    id: String(row.id),
    userId: String(row.user_id),
    userName: String(row.user_name),
    userEmail: String(row.user_email),
    subject: String(row.subject),
    message: String(row.message),
    status: row.status as TicketStatus,
    reply: row.reply ? String(row.reply) : undefined,
    createdAt: new Date(String(row.created_at)).toISOString(),
    updatedAt: new Date(String(row.updated_at)).toISOString(),
  };
}

export async function createTicket(input: {
  userId: string;
  userName: string;
  userEmail: string;
  subject: string;
  message: string;
}): Promise<Ticket> {
  await ensureSchema();
  const sql = getSql();
  const id = `TKT-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
  const rows = await sql`
    INSERT INTO tickets (id, user_id, user_name, user_email, subject, message, status)
    VALUES (
      ${id}, ${input.userId}, ${input.userName}, ${input.userEmail},
      ${input.subject}, ${input.message}, 'open'
    )
    RETURNING *
  `;
  return mapTicket(rows[0] as Record<string, unknown>);
}

export async function getTickets(): Promise<Ticket[]> {
  await ensureSchema();
  const sql = getSql();
  const rows = await sql`SELECT * FROM tickets ORDER BY created_at DESC`;
  return rows.map((r) => mapTicket(r as Record<string, unknown>));
}

export async function getTicketsByUser(userId: string): Promise<Ticket[]> {
  await ensureSchema();
  const sql = getSql();
  const rows = await sql`
    SELECT * FROM tickets WHERE user_id = ${userId} ORDER BY created_at DESC
  `;
  return rows.map((r) => mapTicket(r as Record<string, unknown>));
}
