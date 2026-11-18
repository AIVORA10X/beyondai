import { SITE, hasQuickChat } from '@/lib/site';

export function QuickContact() {
  if (!hasQuickChat() && !SITE.supportEmail) return null;

  return (
    <div className="quick-contact">
      {SITE.telegram ? (
        <a className="secondary-btn" href={SITE.telegram} target="_blank" rel="noreferrer">
          تلگرام پشتیبانی
        </a>
      ) : null}
      {SITE.whatsapp ? (
        <a className="secondary-btn" href={SITE.whatsapp} target="_blank" rel="noreferrer">
          واتساپ
        </a>
      ) : null}
      <a className="secondary-btn" href={`mailto:${SITE.supportEmail}`}>
        ایمیل
      </a>
    </div>
  );
}
