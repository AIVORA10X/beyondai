import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getCurrentUser } from '@/lib/auth';
import { products, statusText } from '@/lib/products';
import { getOrdersByUser, orderStatusText } from '@/lib/orders';
import { getTicketsByUser } from '@/lib/tickets';
import { Header } from '@/components/Header';

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  const orders = await getOrdersByUser(user.id);
  const tickets = await getTicketsByUser(user.id);
  const activeOrders = orders.filter((o) =>
    ['pending_review', 'awaiting_payment', 'in_progress', 'awaiting_user', 'paid'].includes(o.status)
  ).length;

  return (
    <main>
      <Header />
      <section className="dash">
        <div className="dash-hero">
          <div>
            <div className="eyebrow"><span />داشبورد کاربری</div>
            <h1>سلام، {user.name}</h1>
            <p>سفارش‌ها، قیمت‌ها و پشتیبانی را از اینجا مدیریت کنید.</p>
          </div>
          <div className="dash-user-card">
            <div className="avatar">{user.name.slice(0, 1)}</div>
            <div>
              <strong>{user.name}</strong>
              <span dir="ltr">{user.email}</span>
              {user.role === 'admin' && <em className="admin-badge">ادمین</em>}
            </div>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card"><span className="stat-label">سفارش‌های فعال</span><strong>{activeOrders}</strong></div>
          <div className="stat-card"><span className="stat-label">کل سفارش‌ها</span><strong>{orders.length}</strong></div>
          <div className="stat-card"><span className="stat-label">تیکت‌ها</span><strong>{tickets.length}</strong></div>
          <div className="stat-card"><span className="stat-label">محصولات فعال</span><strong>{products.filter(p => p.status === 'active').length}</strong></div>
        </div>

        <div className="dash-actions">
          <Link href="/order" className="primary">ثبت سفارش جدید</Link>
          <Link href="/support" className="secondary-btn">پشتیبانی / تیکت</Link>
          {user.role === 'admin' && <Link href="/admin" className="secondary-btn">پنل ادمین</Link>}
        </div>

        <h2 className="dash-title">قیمت محصولات</h2>
        <div className="grid">
          {products.map((p) => (
            <article className="product-card" key={p.id}>
              <div className="card-top">
                <div className={`product-icon ${p.id}`}>{p.name.slice(0, 1)}</div>
                <span className={`status ${p.status}`}>{statusText[p.status]}</span>
              </div>
              <h3>{p.name}</h3>
              <p className="short-desc">{p.shortDesc}</p>
              <div className="card-bottom">
                <span className="price">{p.priceLabel}</span>
                <Link href={`/order?product=${p.id}`} className="order-btn">سفارش</Link>
              </div>
            </article>
          ))}
        </div>

        <h2 className="dash-title">سفارش‌های من</h2>
        {orders.length === 0 ? (
          <p className="empty">هنوز سفارشی ندارید. <Link href="/order">اولین سفارش را ثبت کنید</Link></p>
        ) : (
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>کد</th>
                  <th>محصول</th>
                  <th>مبلغ</th>
                  <th>وضعیت</th>
                  <th>تاریخ</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id}>
                    <td dir="ltr">{o.id}</td>
                    <td>{o.productName}</td>
                    <td>{o.amount ? o.amount.toLocaleString('fa-IR') + ' تومان' : '—'}</td>
                    <td><span className="status-pill">{orderStatusText[o.status]}</span></td>
                    <td>{new Date(o.createdAt).toLocaleDateString('fa-IR')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <h2 className="dash-title">تیکت‌های پشتیبانی</h2>
        {tickets.length === 0 ? (
          <p className="empty">تیکتی ندارید. <Link href="/support">ایجاد تیکت</Link></p>
        ) : (
          <div className="ticket-list">
            {tickets.map((t) => (
              <div className="ticket-card" key={t.id}>
                <div className="ticket-head">
                  <strong>{t.subject}</strong>
                  <span className="status-pill">{t.status === 'open' ? 'باز' : t.status === 'answered' ? 'پاسخ‌داده‌شده' : 'بسته'}</span>
                </div>
                <p>{t.message}</p>
                {t.reply && <p className="ticket-reply">پاسخ تیم: {t.reply}</p>}
                <small dir="ltr">{t.id} · {new Date(t.createdAt).toLocaleString('fa-IR')}</small>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
