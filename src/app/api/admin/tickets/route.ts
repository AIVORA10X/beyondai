import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { getTickets } from '@/lib/tickets';
import { ensureSchema, getSql } from '@/lib/db';

export async function GET() {
  const user = await getCurrentUser();
  if (!user || user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  return NextResponse.json({ tickets: await getTickets() });
}

export async function PATCH(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user || user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  try {
    const body = await req.json();
    const { id, reply, status } = body;
    if (!id) return NextResponse.json({ error: 'id الزامی' }, { status: 400 });
    await ensureSchema();
    const sql = getSql();
    const rows = await sql`
      UPDATE tickets SET
        reply = COALESCE(${reply || null}, reply),
        status = COALESCE(${status || null}, status),
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `;
    if (!rows[0]) return NextResponse.json({ error: 'یافت نشد' }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'خطای سرور' }, { status: 500 });
  }
}
