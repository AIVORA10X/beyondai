import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

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

function dataDir() {
  if (process.env.VERCEL) return path.join('/tmp', 'beyondai-data');
  return path.join(process.cwd(), 'data');
}
const FILE = path.join(dataDir(), 'tickets.json');

function ensure() {
  const dir = path.dirname(FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(FILE)) fs.writeFileSync(FILE, '[]', 'utf-8');
}

export function getTickets(): Ticket[] {
  ensure();
  try {
    return JSON.parse(fs.readFileSync(FILE, 'utf-8')) as Ticket[];
  } catch {
    return [];
  }
}

function save(tickets: Ticket[]) {
  ensure();
  fs.writeFileSync(FILE, JSON.stringify(tickets, null, 2), 'utf-8');
}

export function createTicket(input: {
  userId: string;
  userName: string;
  userEmail: string;
  subject: string;
  message: string;
}): Ticket {
  const tickets = getTickets();
  const now = new Date().toISOString();
  const t: Ticket = {
    id: `TKT-${crypto.randomBytes(3).toString('hex').toUpperCase()}`,
    ...input,
    status: 'open',
    createdAt: now,
    updatedAt: now,
  };
  tickets.unshift(t);
  save(tickets);
  return t;
}

export function getTicketsByUser(userId: string): Ticket[] {
  return getTickets().filter((t) => t.userId === userId);
}
