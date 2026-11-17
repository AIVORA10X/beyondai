import Link from 'next/link';
import { Header } from '@/components/Header';
import { SiteFooter } from '@/components/SiteFooter';

export const metadata = {
  title: 'تماس با ما | BeyondAI',
};

export default function ContactPage() {
  return (
    <main>
      <Header />
      <section className="legal-page contact-page">
        <div className="eyebrow">ارتباط</div>
        <h1>تماس با BeyondAI</h1>
        <p className="legal-lead">
          قبل از خرید یا وسط سفارش سوال دارید؟ از یکی از این راه‌ها با تیم در ارتباط باشید.
        </p>

        <div className="contact-cards">
          <article className="feature-card">
            <h3>تیکت داخل سایت</h3>
            <p>سریع‌ترین راه برای پیگیری سفارش و پشتیبانی رسمی.</p>
            <Link href="/support" className="primary" style={{ marginTop: 12 }}>
              رفتن به پشتیبانی
            </Link>
          </article>
          <article className="feature-card">
            <h3>ایمیل</h3>
            <p>برای موضوعات عمومی و همکاری:</p>
            <p dir="ltr" style={{ color: 'var(--accent)', fontWeight: 600, marginTop: 8 }}>
              tuhgf01@gmail.com
            </p>
          </article>
          <article className="feature-card">
            <h3>داشبورد سفارش</h3>
            <p>وضعیت سفارش‌های ثبت‌شده را از پنل کاربری ببینید.</p>
            <Link href="/dashboard" className="secondary-btn" style={{ marginTop: 12 }}>
              داشبورد من
            </Link>
          </article>
        </div>

        <div className="trust-box">
          <h3>قبل از واریز بدانید</h3>
          <ul>
            <li>مبلغ و امکان تحویل بعد از بررسی سفارش اعلام می‌شود.</li>
            <li>رمز حساب سرویس‌های خارجی از شما گرفته نمی‌شود.</li>
            <li>همه چیز از داشبورد و تیکت قابل پیگیری است.</li>
          </ul>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
