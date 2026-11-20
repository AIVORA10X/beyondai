'use client';

import { useState } from 'react';
import type { OrderStatus } from '@/lib/orders';

const statuses: { value: OrderStatus; label: string }[] = [
  { value: 'pending_review', label: 'در انتظار بررسی' },
  { value: 'awaiting_payment', label: 'منتظر پرداخت' },
  { value: 'paid', label: 'پرداخت‌شده' },
  { value: 'in_progress', label: 'در حال انجام' },
  { value: 'awaiting_user', label: 'منتظر پاسخ کاربر' },
  { value: 'completed', label: 'تکمیل‌شده / تحویل‌شده' },
  { value: 'rejected', label: 'رد شده' },
  { value: 'cancelled', label: 'لغو شده' },
];

export function OrderStatusForm({
  orderId,
  currentStatus,
  teamNote,
  amount,
  deliveryInfo,
}: {
  orderId: string;
  currentStatus: OrderStatus;
  teamNote: string;
  amount: number;
  deliveryInfo?: string;
}) {
  const [status, setStatus] = useState(currentStatus);
  const [note, setNote] = useState(teamNote);
  const [amt, setAmt] = useState(String(amount || ''));
  const [delivery, setDelivery] = useState(deliveryInfo || '');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  async function save() {
    setLoading(true);
    setMsg('');
    try {
      const res = await fetch('/api/admin/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: orderId,
          status,
          teamNote: note,
          amount: Number(amt) || 0,
          deliveryInfo: delivery,
          paymentStatus: status === 'awaiting_payment' ? 'pending' : undefined,
        }),
      });
      const data = await res.json();
      setMsg(res.ok ? 'ذخیره شد ✓' : data.error || 'خطا');
    } catch {
      setMsg('خطای شبکه');
    }
    setLoading(false);
  }

  return (
    <div className="admin-order-edit">
      <div className="admin-form-row">
        <select value={status} onChange={(e) => setStatus(e.target.value as OrderStatus)}>
          {statuses.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="مبلغ تومان"
          value={amt}
          onChange={(e) => setAmt(e.target.value)}
        />
      </div>
      <div className="admin-form-row">
        <input
          placeholder="یادداشت داخلی تیم"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>
      <div className="admin-form-row">
        <textarea
          rows={2}
          placeholder="اطلاعات تحویل برای مشتری (لینک، کد، راهنما...)"
          value={delivery}
          onChange={(e) => setDelivery(e.target.value)}
          style={{ width: '100%', borderRadius: 12, padding: 10, fontFamily: 'inherit' }}
        />
      </div>
      <div className="admin-form-row">
        <button type="button" className="primary" onClick={save} disabled={loading}>
          {loading ? '...' : 'به‌روزرسانی سفارش'}
        </button>
        {msg && <span className="admin-save-msg">{msg}</span>}
      </div>
    </div>
  );
}
