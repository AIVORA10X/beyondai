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
          <p className="footer-desc">
            پلتفرم فارسی تهیه امن ابزارهای هوش مصنوعی — شفاف، قابل پیگیری، با پشتیبانی.
          </p>
        </div>
        <div>
          <h4>خدمات</h4>
          <Link href="/#products">محصولات</Link>
          <Link href="/order">ثبت سفارش</Link>
          <Link href="/support">پشتیبانی</Link>
          <Link href="/contact">تماس با ما</Link>
        </div>
        <div>
          <h4>حساب و قوانین</h4>
          <Link href="/login">ورود</Link>
          <Link href="/register">ثبت‌نام</Link>
          <Link href="/terms">شرایط استفاده</Link>
          <Link href="/privacy">حریم خصوصی</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {year} BeyondAI</span>
        <span dir="ltr">beatscolony.ir</span>
      </div>
    </footer>
  );
}
