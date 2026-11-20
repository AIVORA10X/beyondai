import { NextRequest, NextResponse } from 'next/server';
import { getPaymentByAuthority, markPaymentPaid } from '@/lib/payments';
import { getOrderById, updateOrder } from '@/lib/orders';
import { isZarinpalEnabled, verifyZarinpalPayment } from '@/lib/payment';
import { notifyAdmin, notifyCustomer } from '@/lib/notify';
import { SITE } from '@/lib/site';

export async function GET(req: NextRequest) {
  const authority = req.nextUrl.searchParams.get('Authority') || req.nextUrl.searchParams.get('authority');
  const status = req.nextUrl.searchParams.get('Status') || req.nextUrl.searchParams.get('status');
  const origin = process.env.NEXT_PUBLIC_SITE_URL || `https://${SITE.domain}`;

  if (!authority) {
    return NextResponse.redirect(`${origin}/dashboard?pay=fail`);
  }

  const payment = await getPaymentByAuthority(authority);
  if (!payment) {
    return NextResponse.redirect(`${origin}/dashboard?pay=fail`);
  }

  if (status && status.toLowerCase() !== 'ok' && status.toLowerCase() !== 'success') {
    return NextResponse.redirect(`${origin}/dashboard?pay=cancel`);
  }

  let refId = `MOCK-${Date.now()}`;

  if (payment.gateway === 'zarinpal' && isZarinpalEnabled()) {
    const verified = await verifyZarinpalPayment({
      authority,
      amountTomans: payment.amount,
    });
    if (!verified.ok) {
      return NextResponse.redirect(`${origin}/dashboard?pay=fail`);
    }
    refId = verified.refId;
  }

  await markPaymentPaid(authority, refId);
  const order = await getOrderById(payment.orderId);
  if (order) {
    await updateOrder(order.id, { status: 'paid', paymentStatus: 'paid' });
    await notifyAdmin({
      type: 'order_created',
      title: `پرداخت موفق ${order.id}`,
      body: `سفارش ${order.id} پرداخت شد. مبلغ: ${order.amount} | ref: ${refId}`,
      orderId: order.id,
      userEmail: order.userEmail,
    });
    await notifyCustomer(order.userEmail, {
      type: 'order_created',
      title: `پرداخت سفارش ${order.id} موفق بود`,
      body: `پرداخت شما ثبت شد. کد پیگیری: ${refId}. تیم در حال آماده‌سازی تحویل است.`,
      orderId: order.id,
    });
  }

  return NextResponse.redirect(`${origin}/dashboard?pay=ok&ref=${refId}`);
}
