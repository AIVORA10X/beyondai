import Link from 'next/link';
import { getProducts } from '@/lib/catalog';
import { Header } from '@/components/Header';
import { SiteFooter } from '@/components/SiteFooter';
import { ProductCard } from '@/components/ProductCard';
import { SectionHead } from '@/components/SectionHead';

const FEATURES = [
  {
    icon: '✦',
    title: 'مسیر شفاف خرید',
    text: 'از انتخاب ابزار تا تحویل، هر مرحله در داشبورد قابل پیگیری است.',
  },
  {
    icon: '◈',
    title: 'بدون رمز حساب شما',
    text: 'رمز یا کد یک‌بارمصرف سرویس‌های خارجی از شما گرفته و ذخیره نمی‌شود.',
  },
  {
    icon: '◎',
    title: 'پشتیبانی فارسی',
    text: 'تیکت بزنید؛ تیم به زبان فارسی و با جزئیات پاسخ می‌دهد.',
  },
  {
    icon: '⬡',
    title: 'پرداخت بعد از تأیید',
    text: 'اول درخواست بررسی می‌شود؛ مبلغ نهایی قبل از پرداخت اعلام می‌گردد.',
  },
] as const;

const STEPS = [
  { n: '۱', title: 'ساخت حساب', text: 'ثبت‌نام کنید و وارد پنل خود شوید.' },
  { n: '۲', title: 'ثبت سفارش', text: 'ابزار AI و پلن موردنظر را انتخاب کنید.' },
  { n: '۳', title: 'بررسی و پرداخت', text: 'بعد از تأیید تیم، پرداخت را انجام دهید.' },
  { n: '۴', title: 'تحویل', text: 'ادمین سفارش را تکمیل و وضعیت را به‌روز می‌کند.' },
] as const;

const FAQS = [
  {
    q: 'آیا باید همین الان پرداخت کنم؟',
    a: 'خیر. ابتدا سفارش ثبت و بررسی می‌شود. مبلغ نهایی و راهنمای پرداخت بعد از تأیید اعلام می‌شود.',
  },
  {
    q: 'رمز حساب ChatGPT یا Gemini از من گرفته می‌شود؟',
    a: 'خیر. BeyondAI رمز یا کد یک‌بارمصرف حساب‌های شما را درخواست و ذخیره نمی‌کند.',
  },
  {
    q: 'چطور وضعیت سفارش را ببینم؟',
    a: 'پس از ورود، در داشبورد کاربری لیست سفارش‌ها و وضعیت هر کدام نمایش داده می‌شود.',
  },
  {
    q: 'اگر سوال داشتم چطور پشتیبانی بگیرم؟',
    a: 'از بخش پشتیبانی تیکت بسازید یا از صفحه تماس با ما اقدام کنید.',
  },
] as const;

export default async function Home() {
  let products: Awaited<ReturnType<typeof getProducts>> = [];
  try {
    products = await getProducts();
  } catch {
    products = [];
  }

  return (
    <main>
      <Header />

      <section className="hero" aria-labelledby="hero-title">
        <div className="eyebrow">
          <span aria-hidden />
          پلتفرم فارسی دسترسی به ابزارهای AI
        </div>
        <h1 id="hero-title">
          هوش مصنوعی را
          <br />
          <em>ساده، امن و شفاف</em> تهیه کنید
        </h1>
        <p>
          BeyondAI برای کسانی است که می‌خواهند ابزارهای AI را با مسیر مشخص سفارش دهند؛
          بدون ابهام در قیمت، بدون درخواست رمز حساب، و با پشتیبانی واقعی فارسی.
        </p>
        <div className="hero-cta">
          <a className="primary" href="#products">
            مشاهده ابزارها
          </a>
          <Link href="/register" className="secondary-btn">
            شروع رایگان
          </Link>
        </div>
        <div className="hero-note">
          <span>ثبت سفارش بدون پرداخت اجباری</span>
          <span>پیگیری در داشبورد</span>
          <span>پشتیبانی تیکتی</span>
        </div>
      </section>

      <section className="stats-bar" aria-label="نکات کلیدی">
        <div className="stats-bar-inner">
          <div>
            <strong>AI</strong>
            <span>ابزارهای منتخب</span>
          </div>
          <div>
            <strong>۳ گام</strong>
            <span>تا تحویل سفارش</span>
          </div>
          <div>
            <strong>۰</strong>
            <span>ذخیره رمز حساب</span>
          </div>
          <div>
            <strong>FA</strong>
            <span>پشتیبانی فارسی</span>
          </div>
        </div>
      </section>

      <section className="features" id="features">
        <SectionHead
          center
          eyebrow="تجربه خرید"
          title="طراحی‌شده برای اعتماد مشتری"
          subtitle="قبل از پرداخت همه چیز روشن است؛ بعد از پرداخت هم وضعیت را می‌بینید."
        />
        <div className="features-grid">
          {FEATURES.map((f) => (
            <article className="feature-card" key={f.title}>
              <div className="feature-icon" aria-hidden>
                {f.icon}
              </div>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="products" id="products">
        <SectionHead
          eyebrow="کاتالوگ"
          title="ابزارهایی که می‌توانید سفارش دهید"
          subtitle="قیمت‌ها تقریبی‌اند و پس از بررسی سفارش ممکن است نهایی شوند."
        />
        <div className="grid">
          {products.length === 0 ? (
            <p className="empty">کاتالوگ در حال آماده‌سازی است.</p>
          ) : (
            products.map((p) => <ProductCard key={p.id} product={p} />)
          )}
        </div>
      </section>

      <section className="how" id="how">
        <SectionHead center eyebrow="فرآیند" title="از ورود تا تحویل" />
        <div className="steps">
          {STEPS.map((s) => (
            <div className="step" key={s.n}>
              <div className="step-num" aria-hidden>
                {s.n}
              </div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="faq" id="faq">
        <SectionHead center eyebrow="سوالات" title="قبل از سفارش بدانید" />
        <div className="faq-grid">
          {FAQS.map((item, i) => (
            <details className="faq-item" key={item.q} open={i === 0}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="cta-band">
        <div className="eyebrow">آماده شروع؟</div>
        <h2>حساب بسازید و اولین سفارش را ثبت کنید</h2>
        <p>ثبت‌نام رایگان است. پرداخت فقط بعد از تأیید سفارش انجام می‌شود.</p>
        <div className="hero-cta">
          <Link href="/register" className="primary">
            ساخت حساب
          </Link>
          <Link href="/login" className="secondary-btn">
            ورود
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
