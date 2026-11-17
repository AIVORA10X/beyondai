import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getCurrentUser } from '@/lib/auth';
import { getOrders } from '@/lib/orders';
import { getTickets } from '@/lib/tickets';
import { getProducts } from '@/lib/catalog';
import { Header } from '@/components/Header';
import { AdminNav } from '@/components/AdminNav';

export default async function AdminHomePage() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');
  if (user.role !== 'admin') redirect('/dashboard');

  const [orders, tickets, products] = await Promise.all([getOrders(), getTickets(), getProducts()]);
  const openTickets = tickets.filter((t) => t.status === 'open').length;
  const pendingOrders = orders.filter((o) =>
    ['pending_review', 'awaiting_payment', 'in_progress'].includes(o.status)
  ).length;

  return (
    <main>
      <Header />
      <section className="dash admin-layout">
        <div className="eyebrow"><span />پنل ادمین BeyondAI</div>
        <h1>مدیریت سایت</h1>
        <p style={{ color: 'var(--muted)', marginBottom: 20 }}>سلام {user.name} — بخش‌های جدا برای مدیریت</p>
        <AdminNav active="/admin" />
        <div className="stats-grid" style={{ marginTop: 24 }}>
          <Link href="/admin/orders" className="stat-card"><span className="stat-label">سفارش در جریان</span><strong>{pendingOrders}</strong></Link>
          <Link href="/admin/orders" className="stat-card"><span className="stat-label">کل سفارش‌ها</span><strong>{orders.length}</strong></Link>
          <Link href="/admin/tickets" className="stat-card"><span className="stat-label">تیکت باز</span><strong>{openTickets}</strong></Link>
          <Link href="/admin/products" className="stat-card"><span className="stat-label">محصولات</span><strong>{products.length}</strong></Link>
        </div>
        <div className="admin-quick">
          <Link href="/admin/products" className="primary">ویرایش قیمت‌ها</Link>
          <Link href="/admin/orders" className="secondary-btn">سفارش‌ها</Link>
          <Link href="/admin/tickets" className="secondary-btn">تیکت‌ها</Link>
        </div>
      </section>
    </main>
  );
}
