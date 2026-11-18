/**
 * جریان پرداخت BeyondAI
 * ۱) مشتری سفارش ثبت می‌کند (pending_review)
 * ۲) ادمین مبلغ/امکان را تأیید می‌کند (awaiting_payment)
 * ۳) پرداخت — زرین‌پال اگر ZARINPAL_MERCHANT_ID باشد، وگرنه حالت راهنما
 */

export function isZarinpalEnabled() {
  return Boolean(process.env.ZARINPAL_MERCHANT_ID);
}

export function paymentModeLabel() {
  return isZarinpalEnabled() ? 'درگاه زرین‌پال' : 'پرداخت پس از اعلام ادمین (دستی/کارت‌به‌کارت تا اتصال درگاه)';
}

export async function requestZarinpalPayment(input: {
  amountTomans: number;
  description: string;
  email?: string;
  orderId: string;
  callbackUrl: string;
}): Promise<{ ok: true; url: string; authority: string } | { ok: false; error: string }> {
  const merchant = process.env.ZARINPAL_MERCHANT_ID;
  if (!merchant) {
    return {
      ok: false,
      error: 'درگاه هنوز وصل نیست. پس از تأیید ادمین، راهنمای پرداخت برایتان ارسال می‌شود.',
    };
  }

  const amountRial = input.amountTomans * 10;
  const endpoint = process.env.ZARINPAL_SANDBOX === '1'
    ? 'https://sandbox.zarinpal.com/pg/v4/payment/request.json'
    : 'https://api.zarinpal.com/pg/v4/payment/request.json';

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        merchant_id: merchant,
        amount: amountRial,
        description: input.description,
        callback_url: input.callbackUrl,
        metadata: { email: input.email, order_id: input.orderId },
      }),
    });
    const data = await res.json();
    const authority = data?.data?.authority;
    if (!authority) {
      return { ok: false, error: 'خطا در اتصال به درگاه' };
    }
    const payBase =
      process.env.ZARINPAL_SANDBOX === '1'
        ? 'https://sandbox.zarinpal.com/pg/StartPay/'
        : 'https://www.zarinpal.com/pg/StartPay/';
    return { ok: true, url: `${payBase}${authority}`, authority };
  } catch {
    return { ok: false, error: 'خطای شبکه درگاه' };
  }
}
