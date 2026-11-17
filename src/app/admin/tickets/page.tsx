import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { getTickets } from '@/lib/tickets';
import { Header } from '@/components/Header';
import { AdminNav } from '@/components/AdminNav';
import { TicketReplyForm } from '@/components/TicketReplyForm';

export default async function AdminTicketsPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');
  if (user.role !== 'admin') redirect('/dashboard');
  const tickets = await getTickets();

  return (
    <main>
      <Header />
      <section className="dash admin-layout">
        <div className="eyebrow"><span />ادمین</div>
        <h1>تیکت‌های پشتیبانی</h1>
        <p style={{ color: 'var(--muted)' }}>پاسخ بدهید و وضعیت را ببندید.</p>
        <AdminNav active="/admin/tickets" />
        {tickets.length === 0 ? (
          <p className="empty" style={{ marginTop: 24 }}>تیکتی نیست.</p>
        ) : (
          <div className="ticket-list" style={{ marginTop: 20 }}>
            {tickets.map((t) => (
              <article key={t.id} className="ticket-card">
                <div className="ticket-head">
                  <strong>{t.subject}</strong>
                  <span className="status-pill">{t.status}</span>
                </div>
                <p>{t.message}</p>
                <small>{t.userName} · <span dir="ltr">{t.userEmail}</span> · {t.id}</small>
                {t.reply && <p className="ticket-reply">پاسخ قبلی: {t.reply}</p>}
                <TicketReplyForm ticketId={t.id} currentStatus={t.status} />
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
