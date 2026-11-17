import Link from 'next/link';
import { getProducts } from '@/lib/catalog';
import { Header } from '@/components/Header';
import { SiteFooter } from '@/components/SiteFooter';
import { ProductCard } from '@/components/ProductCard';
import { SectionHead } from '@/components/SectionHead';

const FEATURES = [
  { icon: '◈', title: 'شفافیت کامل', text: 'شرایط رسمی و محدودیت‌ها قبل از فروش بررسی می‌شود.' },
  { icon: '⬡', title: 'امنیت حساب', text: 'رمز و کد یک‌بارمصرف مشتریان هرگز دریافت نمی‌شود.' },
  { icon: '◎', title: 'پیگیری سفارش', text: 'وضعیت هر درخواست را در داشبورد ببینید.' },
  { icon: '✧', title: 'پشتیبانی فارسی', text: 'تیکت بزنید؛ تیم به زبان فارسی پاسخ می‌دهد.' },
] as const;

const STEPS = [
  { n: '۱', title: 'ثبت‌نام', text: 'حساب بسازید و وارد شوید.' },
  { n: '۲', title: 'انتخاب محصول', text: 'از کاتالوگ سفارش ثبت کنید.' },
  { n: '۳', title: 'بررسی تیم', text: 'وضعیت در پنل به‌روز می‌شود.' },
  { n: '۴', title: 'تکمیل', text: 'پس از تأیید، سفارش بسته می‌شود.' },
] as const;

const FAQS = [
  {
    q: 'آیا رمز حساب از من گرفته می‌شود؟',
    a: 'خیر. BeyondAI رمز یا کد یک‌بارمصرف حساب‌ها را درخواست و ذخیره نمی‌کند.',
  },
  {
    q: 'چطور وضعیت سفارش را ببینم؟',
    a: 'بعد از ورود، در داشبورد لیست سفارش‌ها و وضعیت هر کدام را می‌بینید.',
  },
  {
    q: 'پشتیبانی چگونه است؟',
    a: 'از بخش پشتیبانی تیکت بسازید؛ پاسخ در همان تیکت ثبت می‌شود.',
  },
  {
    q: 'قیمت‌ها ثابت‌اند؟',
    a: 'قیمت‌ها از پنل ادمین قابل به‌روزرسانی‌اند و روی سایت اعمال می‌شوند.',
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
          پلتفرم فارسی ابزارهای هوش مصنوعی
        </div>
        <h1 id="hero-title">
          دسترسی قانونی و امن به
          <br />
          <em>قدرت هوش مصنوعی</em>
        </h1>
        <p>
          BeyondAI مسیر شفاف تهیه ابزارهای AI است؛ از انتخاب تا تحویل، با پشتیبانی فارسی و بدون
          درخواست رمز حساب.
        </p>
        <div className="hero-cta">
          <a className="primary" href="#products">
            مشاهده کاتالوگ
          </a>
          <Link href="/register" className="secondary-btn">
            شروع رایگان
          </Link>
        </div>
        <div className="hero-note">
          <span>✓ شفافیت شرایط</span>
          <span>✓ پشتیبانی فارسی</span>
          <span>✓ پیگیری سفارش</span>
        </div>
      </section>

      <section className="stats-bar" aria-label="آمار کلیدی">
        <div className="stats-bar-inner">
          <div>
            <strong>+۵</strong>
            <span>ابزار منتخب</span>
          </div>
          <div>
            <strong>۲۴/۷</strong>
            <span>ثبت درخواست</span>
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
          eyebrow="چرا BeyondAI"
          title="ساخته‌شده برای اعتماد"
          subtitle="هر مرحله قابل پیگیری است و هیچ محصولی بدون بررسی فعال نمی‌شود."
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
          title="ابزارهای منتخب هوش مصنوعی"
          subtitle="قیمت و وضعیت از پنل ادمین قابل به‌روزرسانی است."
        />
        <div className="grid">
          {products.length === 0 ? (
            <p className="empty">کاتالوگ به‌زودی بارگذاری می‌شود.</p>
          ) : (
            products.map((p) => <ProductCard key={p.id} product={p} />)
          )}
        </div>
      </section>

      <section className="how" id="how">
        <SectionHead center eyebrow="فرآیند" title="چهار قدم تا تحویل" />
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
        <SectionHead center eyebrow="سوالات پرتکرار" title="قبل از سفارش بدانید" />
        <div className="faq-grid">
          {FAQS.map((item, i) => (
            <details className="faq-item" key={item.q} open={i === 0}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="cta-band" id="about">
        <div className="eyebrow">BeyondAI</div>
        <h2>از ایده تا دسترسی، یک مسیر شفاف</h2>
        <p>برای تیم‌ها و افرادی که ابزار AI را منظم و با پشتیبانی فارسی می‌خواهند.</p>
        <div className="hero-cta">
          <Link href="/register" className="primary">
            ساخت حساب
          </Link>
          <Link href="/login" className="secondary-btn">
            ورود به پنل
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
