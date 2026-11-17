import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { getOrders, updateOrder, type OrderStatus } from '@/lib/orders';

export async function GET() {
  const user = await getCurrentUser();
  if (!user || user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  return NextResponse.json({ orders: await getOrders() });
}

export async function PATCH(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user || user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  try {
    const body = await req.json();
    const { id, status, teamNote, amount, paymentStatus } = body;
    if (!id) return NextResponse.json({ error: 'id الزامی' }, { status: 400 });
    const order = await updateOrder(id, {
      status: status as OrderStatus | undefined,
      teamNote,
      amount,
      paymentStatus,
    });
    if (!order) return NextResponse.json({ error: 'یافت نشد' }, { status: 404 });
    return NextResponse.json({ order });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'خطای سرور' }, { status: 500 });
  }
}
