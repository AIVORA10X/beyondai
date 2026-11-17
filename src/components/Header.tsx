import Link from 'next/link';
import { getCurrentUser } from '@/lib/auth';
import { LogoutButton } from './LogoutButton';

export async function Header() {
  const user = await getCurrentUser();

  return (
    <header className="topbar">
      <Link className="brand" href="/" aria-label="BeyondAI — صفحه اصلی">
        <span className="brand-mark" aria-hidden>
          B
        </span>
        <span>BeyondAI</span>
      </Link>

      <nav aria-label="منوی اصلی">
        <Link href="/#products">محصولات</Link>
        <Link href="/#how">فرآیند</Link>
        <Link href="/#faq">سوالات</Link>
        {user ? <Link href="/dashboard">داشبورد</Link> : <Link href="/#features">ویژگی‌ها</Link>}
        {user?.role === 'admin' ? <Link href="/admin">ادمین</Link> : null}
      </nav>

      <div className="auth-actions">
        {user ? (
          <>
            <Link href="/order" className="auth-link">
              ثبت سفارش
            </Link>
            <Link href="/dashboard" className="user-chip" title={user.email}>
              {user.role === 'admin' ? `ادمین · ${user.name}` : user.name}
            </Link>
            <LogoutButton />
          </>
        ) : (
          <>
            <Link href="/login" className="auth-link">
              ورود
            </Link>
            <Link href="/register" className="contact">
              ثبت‌نام
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
