import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { getOrderById, updateOrder } from '@/lib/orders';
import { createPayment } from '@/lib/payments';
import { isZarinpalEnabled, requestZarinpalPayment } from '@/lib/payment';
import { SITE } from '@/lib/site';

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'وارد شوید' }, { status: 401 });

  try {
    const { orderId } = await req.json();
    const order = await getOrderById(orderId);
    if (!order) return NextResponse.json({ error: 'سفارش یافت نشد' }, { status: 404 });
    if (order.userId !== user.id && user.role !== 'admin') {
      return NextResponse.json({ error: 'دسترسی ندارید' }, { status: 403 });
    }
    if (order.status !== 'awaiting_payment' && order.paymentStatus !== 'pending') {
      if (order.status !== 'awaiting_payment') {
        return NextResponse.json(
          { error: 'این سفارش هنوز برای پرداخت تأیید نشده است.' },
          { status: 400 }
        );
      }
    }
    if (order.paymentStatus === 'paid') {
      return NextResponse.json({ error: 'این سفارش قبلاً پرداخت شده' }, { status: 400 });
    }
    if (!order.amount || order.amount <= 0) {
      return NextResponse.json({ error: 'مبلغ سفارش مشخص نیست' }, { status: 400 });
    }

    const origin =
      process.env.NEXT_PUBLIC_SITE_URL ||
      `https://${SITE.domain}` ||
      req.nextUrl.origin;
    const callbackUrl = `${origin}/api/pay/callback`;

    if (isZarinpalEnabled()) {
      const zp = await requestZarinpalPayment({
        amountTomans: order.amount,
        description: `سفارش ${order.id} — ${order.productName}`,
        email: order.userEmail,
        orderId: order.id,
        callbackUrl,
      });
      if (!zp.ok) return NextResponse.json({ error: zp.error }, { status: 502 });
      await createPayment({
        orderId: order.id,
        userId: order.userId,
        amount: order.amount,
        gateway: 'zarinpal',
        authority: zp.authority,
      });
      await updateOrder(order.id, { paymentStatus: 'pending' });
      return NextResponse.json({ url: zp.url, mode: 'zarinpal' });
    }

    // Mock gateway for end-to-end testing without merchant id
    const payment = await createPayment({
      orderId: order.id,
      userId: order.userId,
      amount: order.amount,
      gateway: 'mock',
    });
    await updateOrder(order.id, { paymentStatus: 'pending' });
    const mockUrl = `${origin}/pay/mock?authority=${payment.authority}&orderId=${order.id}`;
    return NextResponse.json({ url: mockUrl, mode: 'mock' });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'خطای سرور' }, { status: 500 });
  }
}
