import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { getOrders, orderStatusText } from '@/lib/orders';
import { Header } from '@/components/Header';
import { AdminNav } from '@/components/AdminNav';
import { OrderStatusForm } from '@/components/OrderStatusForm';

export default async function AdminOrdersPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');
  if (user.role !== 'admin') redirect('/dashboard');
  const orders = await getOrders();

  return (
    <main>
      <Header />
      <section className="dash admin-layout">
        <div className="eyebrow">
          <span />
          ادمین
        </div>
        <h1>سفارش‌ها</h1>
        <p style={{ color: 'var(--muted)', marginBottom: 8 }}>
          مسیر: بررسی → منتظر پرداخت → پرداخت‌شده → در حال انجام → تکمیل با اطلاعات تحویل
        </p>
        <AdminNav active="/admin/orders" />
        {orders.length === 0 ? (
          <p className="empty" style={{ marginTop: 24 }}>
            هنوز سفارشی ثبت نشده.
          </p>
        ) : (
          <div className="admin-order-list">
            {orders.map((o) => (
              <article key={o.id} className="admin-order-card">
                <div className="ticket-head">
                  <strong dir="ltr">{o.id}</strong>
                  <span className="status-pill">{orderStatusText[o.status]}</span>
                </div>
                <p>
                  <strong>{o.productName}</strong> — {o.userName}{' '}
                  <span dir="ltr" style={{ color: 'var(--muted)', fontSize: 13 }}>
                    ({o.userEmail})
                  </span>
                </p>
                <p style={{ color: 'var(--muted)', fontSize: 14 }}>
                  مبلغ: {o.amount ? o.amount.toLocaleString('fa-IR') + ' تومان' : '—'}
                  {' · '}
                  پرداخت: {o.paymentStatus}
                  {o.planNote ? ` · پلن: ${o.planNote}` : ''}
                </p>
                {o.userNote && <p style={{ fontSize: 14 }}>یادداشت کاربر: {o.userNote}</p>}
                {o.deliveryInfo && (
                  <p style={{ fontSize: 13, color: 'var(--ok)' }}>تحویل: {o.deliveryInfo}</p>
                )}
                <OrderStatusForm
                  orderId={o.id}
                  currentStatus={o.status}
                  teamNote={o.teamNote || ''}
                  amount={o.amount}
                  deliveryInfo={o.deliveryInfo}
                />
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
