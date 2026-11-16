import Link from 'next/link';
import { products, statusText } from '@/lib/products';
import { Header } from '@/components/Header';

export default function Home() {
  return (
    <main>
      <Header />

      <section className="hero">
        <div className="hero-grid-bg" />
        <div className="eyebrow"><span />پلتفرم هوشمند تهیه ابزارهای AI</div>
        <h1>آینده کار با<br /><em>هوش مصنوعی</em></h1>
        <p>
          BeyondAI مرجع فارسی معرفی و تهیه قانونی ابزارهای هوش مصنوعی است.
          شفاف، امن و با پشتیبانی واقعی فارسی.
        </p>
        <div className="hero-cta">
          <a className="primary" href="#products">مشاهده محصولات <span>←</span></a>
          <Link href="/register" className="secondary-btn">ایجاد حساب رایگان</Link>
        </div>
        <div className="hero-note">
          <span>شفافیت کامل شرایط</span>
          <span>پشتیبانی فارسی</span>
          <span>بدون دریافت رمز حساب</span>
        </div>
        <div className="orb orb-one" />
        <div className="orb orb-two" />
      </section>

      <section className="features" id="features">
        <div className="section-head center">
          <div>
            <div className="eyebrow">چرا BeyondAI</div>
            <h2>طراحی‌شده برای اعتماد</h2>
          </div>
        </div>
        <div className="features-grid">
          <article className="feature-card">
            <div className="feature-icon">◈</div>
            <h3>شفافیت کامل</h3>
            <p>هیچ محصولی بدون بررسی شرایط رسمی ارائه‌دهنده فعال نمی‌شود.</p>
          </article>
          <article className="feature-card">
            <div className="feature-icon">⬡</div>
            <h3>امنیت حساب شما</h3>
            <p>رمز عبور و کد یک‌بارمصرف مشتریان هرگز دریافت یا ذخیره نمی‌شود.</p>
          </article>
          <article className="feature-card">
            <div className="feature-icon">◎</div>
            <h3>پیگیری سفارش</h3>
            <p>از ثبت درخواست تا تکمیل، وضعیت را در داشبورد دنبال کنید.</p>
          </article>
          <article className="feature-card">
            <div className="feature-icon">✧</div>
            <h3>پشتیبانی فارسی</h3>
            <p>تیم پشتیبانی به زبان فارسی پاسخگوست و مراحل را شفاف توضیح می‌دهد.</p>
          </article>
        </div>
      </section>

      <section className="products" id="products">
        <div className="section-head">
          <div>
            <div className="eyebrow">کاتالوگ BeyondAI</div>
            <h2>ابزارهای منتخب هوش مصنوعی</h2>
          </div>
          <p>وضعیت هر محصول پیش از فعال‌شدن فروش بررسی می‌شود.</p>
        </div>
        <div className="grid">
          {products.map((p) => (
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
                <Link href={`/order?product=${p.id}`} className="order-btn">ثبت درخواست</Link>
              </div>
              <small>{p.deliveryNote}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="how" id="how">
        <div className="section-head center">
          <div>
            <div className="eyebrow">فرآیند کار</div>
            <h2>از درخواست تا تحویل</h2>
          </div>
        </div>
        <div className="steps">
          <div className="step"><div className="step-num">۱</div><h3>ثبت‌نام</h3><p>حساب بسازید و وارد شوید.</p></div>
          <div className="step-line" />
          <div className="step"><div className="step-num">۲</div><h3>ثبت سفارش</h3><p>محصول را انتخاب و درخواست بفرستید.</p></div>
          <div className="step-line" />
          <div className="step"><div className="step-num">۳</div><h3>بررسی تیم</h3><p>تیم BeyondAI درخواست را بررسی می‌کند.</p></div>
          <div className="step-line" />
          <div className="step"><div className="step-num">۴</div><h3>تکمیل</h3><p>پس از پرداخت، سفارش تکمیل می‌شود.</p></div>
        </div>
      </section>

      <section className="cta-band">
        <h2>آماده شروع هستید؟</h2>
        <p>همین حالا حساب بسازید و اولین درخواست را ثبت کنید.</p>
        <div className="hero-cta">
          <Link href="/register" className="primary">ثبت‌نام رایگان</Link>
          <a href="#products" className="secondary-btn">مشاهده محصولات</a>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-inner">
          <div className="brand"><span className="brand-mark">B</span> BeyondAI</div>
          <p>© {new Date().getFullYear()} BeyondAI — beatscolony.ir</p>
        </div>
      </footer>
    </main>
  );
}
