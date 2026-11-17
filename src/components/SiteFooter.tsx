import Link from 'next/link';

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <Link className="brand" href="/">
            <span className="brand-mark" aria-hidden>
              B
            </span>
            <span>BeyondAI</span>
          </Link>
          <p className="footer-desc">پلتفرم فارسی تهیه امن ابزارهای هوش مصنوعی</p>
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
        <span>© {year} BeyondAI</span>
        <span dir="ltr">beatscolony.ir</span>
      </div>
    </footer>
  );
}
