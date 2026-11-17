import Link from 'next/link';
import { getProducts, statusText } from '@/lib/catalog';
import { Header } from '@/components/Header';

export default async function Home() {
  let products: Awaited<ReturnType<typeof getProducts>> = [];
  try {
    products = await getProducts();
  } catch {
    products = [];
  }

  return (
    <main className="home">
      <Header />

      <section className="hero">
        <div className="hero-grid-bg" />
        <div className="orb orb-one" />
        <div className="orb orb-two" />
        <div className="orb orb-three" />

        <div className="eyebrow">
          <span />
          پلتفرم فارسی ابزارهای هوش مصنوعی
        </div>
        <h1>
          دسترسی قانونی و امن به
          <br />
          <em>قدرت هوش مصنوعی</em>
        </h1>
        <p>
          BeyondAI مسیر شفاف تهیه ابزارهای AI است؛ از انتخاب محصول تا تحویل،
          با پشتیبانی فارسی و بدون درخواست رمز حساب.
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

      <section className="stats-bar">
        <div className="stats-bar-inner">
          <div>
            <strong>+۵</strong>
            <span>ابزار منتخب AI</span>
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
        <div className="section-head center">
          <div>
            <div className="eyebrow">چرا BeyondAI</div>
            <h2>ساخته‌شده برای اعتماد واقعی</h2>
            <p className="section-sub">
              هر مرحله از سفارش قابل پیگیری است و هیچ محصولی بدون بررسی فعال نمی‌شود.
            </p>
          </div>
        </div>
        <div className="features-grid">
          <article className="feature-card">
            <div className="feature-icon">◈</div>
            <h3>شفافیت کامل</h3>
            <p>شرایط رسمی ارائه‌دهنده و محدودیت‌های منطقه‌ای قبل از فروش بررسی می‌شود.</p>
          </article>
          <article className="feature-card">
            <div className="feature-icon">⬡</div>
            <h3>امنیت حساب شما</h3>
            <p>رمز عبور و کد یک‌بارمصرف مشتریان هرگز دریافت یا ذخیره نمی‌شود.</p>
          </article>
          <article className="feature-card">
            <div className="feature-icon">◎</div>
            <h3>داشبورد سفارش</h3>
            <p>از ثبت درخواست تا تکمیل، وضعیت را لحظه‌به‌لحظه در پنل خود ببینید.</p>
          </article>
          <article className="feature-card">
            <div className="feature-icon">✧</div>
            <h3>پشتیبانی انسانی</h3>
            <p>تیم فارسی‌زبان پاسخگوست؛ تیکت بزنید و پاسخ شفاف بگیرید.</p>
          </article>
        </div>
      </section>

      <section className="products" id="products">
        <div className="section-head">
          <div>
            <div className="eyebrow">کاتالوگ</div>
            <h2>ابزارهای منتخب هوش مصنوعی</h2>
          </div>
          <p className="section-sub">قیمت و وضعیت هر محصول از پنل ادمین قابل به‌روزرسانی است.</p>
        </div>
        <div className="grid">
          {products.length === 0 ? (
            <p className="empty">کاتالوگ به‌زودی بارگذاری می‌شود.</p>
          ) : (
            products.map((p) => (
              <article className="product-card" key={p.id}>
                {p.tag && <span className="product-tag">{p.tag}</span>}
                <div className="card-top">
                  <div className={`product-icon ${p.id}`}>{p.name.slice(0, 1)}</div>
                  <span className={`status ${p.status}`}>{statusText[p.status]}</span>
                </div>
                <div className="category">{p.category}</div>
                <h3>{p.name}</h3>
                <p className="short-desc">{p.shortDesc}</p>
                <ul className="feature-list">
                  {p.features.slice(0, 3).map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <div className="card-bottom">
                  <span className="price">{p.priceLabel}</span>
                  <Link href={`/order?product=${p.id}`} className="order-btn">
                    سفارش
                  </Link>
                </div>
                <small>{p.deliveryNote}</small>
              </article>
            ))
          )}
        </div>
      </section>

      <section className="how" id="how">
        <div className="section-head center">
          <div>
            <div className="eyebrow">فرآیند</div>
            <h2>چهار قدم تا تحویل</h2>
          </div>
        </div>
        <div className="steps">
          <div className="step">
            <div className="step-num">۱</div>
            <h3>ثبت‌نام</h3>
            <p>حساب بسازید؛ اولین کاربر نقش ادمین می‌گیرد.</p>
          </div>
          <div className="step">
            <div className="step-num">۲</div>
            <h3>انتخاب محصول</h3>
            <p>از کاتالوگ سفارش ثبت کنید و جزئیات را بنویسید.</p>
          </div>
          <div className="step">
            <div className="step-num">۳</div>
            <h3>بررسی تیم</h3>
            <p>وضعیت در داشبورد و پنل ادمین به‌روز می‌شود.</p>
          </div>
          <div className="step">
            <div className="step-num">۴</div>
            <h3>تکمیل</h3>
            <p>پس از تأیید و پرداخت، سفارش بسته می‌شود.</p>
          </div>
        </div>
      </section>

      <section className="faq" id="faq">
        <div className="section-head center">
          <div>
            <div className="eyebrow">سوالات پرتکرار</div>
            <h2>قبل از سفارش بدانید</h2>
          </div>
        </div>
        <div className="faq-grid">
          <details className="faq-item" open>
            <summary>آیا رمز حساب از من گرفته می‌شود؟</summary>
            <p>خیر. BeyondAI رمز یا کد یک‌بارمصرف حساب‌های شما را درخواست و ذخیره نمی‌کند.</p>
          </details>
          <details className="faq-item">
            <summary>چطور وضعیت سفارش را ببینم؟</summary>
            <p>بعد از ورود، از داشبورد کاربری لیست سفارش‌ها و وضعیت هر کدام را می‌بینید.</p>
          </details>
          <details className="faq-item">
            <summary>پشتیبانی چگونه است؟</summary>
            <p>از بخش پشتیبانی تیکت بسازید؛ تیم پاسخ را در همان تیکت ثبت می‌کند.</p>
          </details>
          <details className="faq-item">
            <summary>قیمت‌ها ثابت‌اند؟</summary>
            <p>قیمت‌ها از پنل ادمین قابل به‌روزرسانی‌اند و روی سایت همان لحظه اعمال می‌شوند.</p>
          </details>
        </div>
      </section>

      <section className="cta-band" id="about">
        <div className="eyebrow">BeyondAI</div>
        <h2>از ایده تا دسترسی، یک مسیر شفاف</h2>
        <p>
          برای تیم‌ها و افرادی که می‌خواهند ابزار AI را منظم، قابل پیگیری و با پشتیبانی فارسی تهیه کنند.
        </p>
        <div className="hero-cta">
          <Link href="/register" className="primary">
            ساخت حساب
          </Link>
          <Link href="/login" className="secondary-btn">
            ورود به پنل
          </Link>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-grid">
          <div>
            <div className="brand">
              <span className="brand-mark">B</span>
              <span>BeyondAI</span>
            </div>
            <p className="footer-desc">پلتفرم فارسی تهیه ابزارهای هوش مصنوعی</p>
          </div>
          <div>
            <h4>دسترسی</h4>
            <Link href="/#products">محصولات</Link>
            <Link href="/order">ثبت سفارش</Link>
            <Link href="/support">پشتیبانی</Link>
          </div>
          <div>
            <h4>حساب</h4>
            <Link href="/login">ورود</Link>
            <Link href="/register">ثبت‌نام</Link>
            <Link href="/dashboard">داشبورد</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} BeyondAI</span>
          <span dir="ltr">beatscolony.ir</span>
        </div>
      </footer>
    </main>
  );
}
