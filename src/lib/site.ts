/** تنظیمات عمومی سایت — در Vercel با NEXT_PUBLIC_ قابل override */

export const SITE = {
  name: 'BeyondAI',
  domain: 'beatscolony.ir',
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'tuhgf01@gmail.com',
  /** لینک تلگرام پشتیبانی — مثال: https://t.me/username */
  telegram: process.env.NEXT_PUBLIC_TELEGRAM_URL || '',
  /** لینک واتساپ — مثال: https://wa.me/98912... */
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_URL || '',
  adminEmail: process.env.ADMIN_EMAILS?.split(',')[0]?.trim() || 'tuhgf01@gmail.com',
};

export function hasQuickChat() {
  return Boolean(SITE.telegram || SITE.whatsapp);
}
