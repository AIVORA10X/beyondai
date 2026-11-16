import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { createTicket, getTicketsByUser } from '@/lib/tickets';

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'وارد شوید' }, { status: 401 });
  return NextResponse.json({ tickets: getTicketsByUser(user.id) });
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'وارد شوید' }, { status: 401 });
  try {
    const body = await req.json();
    const { subject, message } = body;
    if (!subject || !message) {
      return NextResponse.json({ error: 'موضوع و متن الزامی است' }, { status: 400 });
    }
    const ticket = createTicket({
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      subject,
      message,
    });
    return NextResponse.json({ ticket }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'خطای سرور' }, { status: 500 });
  }
}
