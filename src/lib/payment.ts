/** درگاه پرداخت — زرین‌پال اگر تنظیم شده، وگرنه mock برای تست کامل مسیر */

export function isZarinpalEnabled() {
  return Boolean(process.env.ZARINPAL_MERCHANT_ID);
}

export function paymentModeLabel() {
  return isZarinpalEnabled()
    ? 'درگاه زرین‌پال'
    : 'پرداخت آزمایشی (تا اتصال زرین‌پال)';
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
    return { ok: false, error: 'ZARINPAL_NOT_CONFIGURED' };
  }

  const amountRial = input.amountTomans * 10;
  const endpoint =
    process.env.ZARINPAL_SANDBOX === '1'
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

export async function verifyZarinpalPayment(input: {
  authority: string;
  amountTomans: number;
}): Promise<{ ok: true; refId: string } | { ok: false; error: string }> {
  const merchant = process.env.ZARINPAL_MERCHANT_ID;
  if (!merchant) return { ok: false, error: 'no merchant' };

  const endpoint =
    process.env.ZARINPAL_SANDBOX === '1'
      ? 'https://sandbox.zarinpal.com/pg/v4/payment/verify.json'
      : 'https://api.zarinpal.com/pg/v4/payment/verify.json';

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        merchant_id: merchant,
        amount: input.amountTomans * 10,
        authority: input.authority,
      }),
    });
    const data = await res.json();
    const code = data?.data?.code;
    const refId = data?.data?.ref_id;
    if ((code === 100 || code === 101) && refId) {
      return { ok: true, refId: String(refId) };
    }
    return { ok: false, error: 'تأیید پرداخت ناموفق' };
  } catch {
    return { ok: false, error: 'خطای شبکه تأیید' };
  }
}
