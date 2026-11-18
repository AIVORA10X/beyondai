import { SITE } from './site';

export type NotifyPayload = {
  type: 'order_created' | 'ticket_created';
  title: string;
  body: string;
  orderId?: string;
  userEmail?: string;
};

/**
 * اعلان ساده: در لاگ سرور + آماده‌سازی برای ایمیل واقعی.
 * برای ایمیل واقعی بعداً Resend/SMTP را با EMAIL_API_KEY وصل کنید.
 */
export async function notifyAdmin(payload: NotifyPayload) {
  const line = `[BeyondAI][ADMIN] ${payload.type} | ${payload.title} | ${payload.body}`;
  console.log(line);

  // اگر سرویس ایمیل تنظیم شود می‌توان اینجا فرستاد
  if (process.env.RESEND_API_KEY && SITE.adminEmail) {
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.EMAIL_FROM || 'BeyondAI <onboarding@resend.dev>',
          to: [SITE.adminEmail],
          subject: payload.title,
          text: payload.body,
        }),
      });
    } catch (e) {
      console.error('email failed', e);
    }
  }
}

export async function notifyCustomer(email: string, payload: Omit<NotifyPayload, 'userEmail'>) {
  console.log(`[BeyondAI][USER] ${email} | ${payload.title} | ${payload.body}`);
  if (process.env.RESEND_API_KEY && email) {
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.EMAIL_FROM || 'BeyondAI <onboarding@resend.dev>',
          to: [email],
          subject: payload.title,
          text: payload.body,
        }),
      });
    } catch (e) {
      console.error('email failed', e);
    }
  }
}
