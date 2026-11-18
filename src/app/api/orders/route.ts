import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { createOrder, getOrdersByUser } from '@/lib/orders';
import { getProduct } from '@/lib/catalog';
import { notifyAdmin, notifyCustomer } from '@/lib/notify';
import { SITE } from '@/lib/site';

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'وارد شوید' }, { status: 401 });
  const orders = await getOrdersByUser(user.id);
  return NextResponse.json({ orders });
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'وارد شوید' }, { status: 401 });
  try {
    const body = await req.json();
    const { productId, planNote, userNote } = body;
    const product = await getProduct(productId);
    if (!product) {
      return NextResponse.json({ error: 'محصول یافت نشد' }, { status: 400 });
    }
    if (product.status === 'paused') {
      return NextResponse.json({ error: 'این محصول فعلاً قابل سفارش نیست.' }, { status: 400 });
    }

    const order = await createOrder({
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      productId: product.id,
      productName: product.name,
      planNote: planNote || '',
      userNote: userNote || '',
      amount: product.amount,
    });

    const summary = `سفارش ${order.id} | ${product.name} | ${user.name} <${user.email}> | مبلغ تقریبی: ${order.amount}`;
    await notifyAdmin({
      type: 'order_created',
      title: `سفارش جدید ${order.id}`,
      body: summary,
      orderId: order.id,
      userEmail: user.email,
    });
    await notifyCustomer(user.email, {
      type: 'order_created',
      title: `ثبت سفارش ${order.id} در BeyondAI`,
      body: `سفارش شما برای «${product.name}» ثبت شد و در صف بررسی است. وضعیت را در داشبورد ببینید: https://${SITE.domain}/dashboard`,
      orderId: order.id,
    });

    return NextResponse.json({ order }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'خطای سرور' }, { status: 500 });
  }
}
