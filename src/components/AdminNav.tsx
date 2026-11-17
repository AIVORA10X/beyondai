import Link from 'next/link';

const links = [
  { href: '/admin', label: 'خلاصه' },
  { href: '/admin/products', label: 'محصولات و قیمت' },
  { href: '/admin/orders', label: 'سفارش‌ها' },
  { href: '/admin/tickets', label: 'تیکت‌ها' },
];

export function AdminNav({ active }: { active: string }) {
  return (
    <nav className="admin-nav">
      {links.map((l) => (
        <Link key={l.href} href={l.href} className={active === l.href ? 'admin-nav-item active' : 'admin-nav-item'}>
          {l.label}
        </Link>
      ))}
      <Link href="/dashboard" className="admin-nav-item">داشبورد کاربر</Link>
    </nav>
  );
}
