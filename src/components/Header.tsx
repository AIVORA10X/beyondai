import Link from 'next/link';
import { getCurrentUser } from '@/lib/auth';
import { LogoutButton } from './LogoutButton';

export async function Header() {
  const user = await getCurrentUser();

  return (
    <header className="topbar">
      <Link className="brand" href="/">
        <span className="brand-mark">B</span>
        <span>BeyondAI</span>
      </Link>

      <nav>
        <Link href="/#products">محصولات</Link>
        <Link href="/#how">فرآیند</Link>
        <Link href="/#faq">سوالات</Link>
        {user ? (
          <Link href="/dashboard">داشبورد</Link>
        ) : (
          <Link href="/#about">درباره ما</Link>
        )}
        {user?.role === 'admin' && <Link href="/admin">ادمین</Link>}
      </nav>

      <div className="auth-actions">
        {user ? (
          <>
            <Link href="/order" className="auth-link">ثبت سفارش</Link>
            <Link href="/dashboard" className="user-chip">
              {user.role === 'admin' ? `👑 ${user.name}` : user.name}
            </Link>
            <LogoutButton />
          </>
        ) : (
          <>
            <Link href="/login" className="auth-link">ورود</Link>
            <Link href="/register" className="contact">ثبت‌نام</Link>
          </>
        )}
      </div>
    </header>
  );
}
