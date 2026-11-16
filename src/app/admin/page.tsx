import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getCurrentUser } from '@/lib/auth';
import { getOrders, orderStatusText } from '@/lib/orders';
import { getTickets } from '@/lib/tickets';
import { Header } from '@/components/Header';

export default async function AdminPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');
  if (user.role !== 'admin') redirect('/dashboard');

  const orders = getOrders();
  const tickets = getTickets();

  return (
    <main>
      <Header />
      <section className="dash">
        <div className="eyebrow"><span />پنل ادمین</div>
        <h1>مدیریت BeyondAI</h1>
        <p style={{ color: 'var(--muted)' }}>سفارش‌ها و تیکت‌های همه کاربران</p>

        <h2 className="dash-title">همه سفارش‌ها ({orders.length})</h2>
        {orders.length === 0 ? (
          <p className="empty">سفارشی نیست</p>
        ) : (
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>کد</th>
                  <th>کاربر</th>
                  <th>محصول</th>
                  <th>مبلغ</th>
                  <th>وضعیت</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id}>
                    <td dir="ltr">{o.id}</td>
                    <td>{o.userName}<br /><small dir="ltr">{o.userEmail}</small></td>
                    <td>{o.productName}</td>
                    <td>{o.amount ? o.amount.toLocaleString('fa-IR') : '—'}</td>
                    <td>{orderStatusText[o.status]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <h2 className="dash-title">تیکت‌ها ({tickets.length})</h2>
        {tickets.length === 0 ? (
          <p className="empty">تیکتی نیست</p>
        ) : (
          <div className="ticket-list">
            {tickets.map((t) => (
              <div className="ticket-card" key={t.id}>
                <div className="ticket-head">
                  <strong>{t.subject}</strong>
                  <span className="status-pill">{t.status}</span>
                </div>
                <p>{t.message}</p>
                <small>{t.userName} · {t.userEmail} · {t.id}</small>
              </div>
            ))}
          </div>
        )}

        <p style={{ marginTop: 24 }}>
          <Link href="/dashboard" className="secondary-btn">بازگشت به داشبورد</Link>
        </p>
      </section>
    </main>
  );
}
