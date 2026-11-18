import Link from 'next/link';
import { Header } from '@/components/Header';
import { SiteFooter } from '@/components/SiteFooter';
import { QuickContact } from '@/components/QuickContact';
import { SITE } from '@/lib/site';

export const metadata = {
  title: 'تماس با ما',
};

export default function ContactPage() {
  return (
    <main>
      <Header />
      <section className="legal-page contact-page">
        <div className="eyebrow">ارتباط</div>
        <h1>تماس با BeyondAI</h1>
        <p className="legal-lead">
          قبل از خرید یا وسط سفارش سوال دارید؟ از این راه‌ها با تیم در ارتباط باشید.
        </p>

        <QuickContact />

        <div className="contact-cards">
          <article className="feature-card">
            <h3>تیکت رسمی</h3>
            <p>بهترین راه برای پیگیری سفارش ثبت‌شده.</p>
            <Link href="/support" className="primary" style={{ marginTop: 12 }}>
              پشتیبانی / تیکت
            </Link>
          </article>
          <article className="feature-card">
            <h3>ایمیل</h3>
            <p dir="ltr" style={{ color: 'var(--accent)', fontWeight: 600, marginTop: 8 }}>
              {SITE.supportEmail}
            </p>
          </article>
          <article className="feature-card">
            <h3>داشبورد</h3>
            <p>وضعیت سفارش‌ها را ببینید.</p>
            <Link href="/dashboard" className="secondary-btn" style={{ marginTop: 12 }}>
              داشبورد من
            </Link>
          </article>
        </div>

        <div className="trust-box">
          <h3>مسیر خرید شفاف</h3>
          <ul>
            <li>۱) ثبت درخواست بدون پرداخت اجباری در لحظه</li>
            <li>۲) بررسی تیم و اعلام مبلغ نهایی</li>
            <li>۳) پرداخت بعد از تأیید</li>
            <li>۴) تحویل و پیگیری در داشبورد</li>
          </ul>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
