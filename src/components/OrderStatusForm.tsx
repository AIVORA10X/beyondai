'use client';

import { useState } from 'react';
import type { OrderStatus } from '@/lib/orders';

const statuses: { value: OrderStatus; label: string }[] = [
  { value: 'pending_review', label: 'در انتظار بررسی' },
  { value: 'awaiting_payment', label: 'منتظر پرداخت' },
  { value: 'paid', label: 'پرداخت‌شده' },
  { value: 'in_progress', label: 'در حال انجام' },
  { value: 'awaiting_user', label: 'منتظر پاسخ کاربر' },
  { value: 'completed', label: 'تکمیل‌شده' },
  { value: 'rejected', label: 'رد شده' },
  { value: 'cancelled', label: 'لغو شده' },
];

export function OrderStatusForm({ orderId, currentStatus, teamNote }: { orderId: string; currentStatus: OrderStatus; teamNote: string }) {
  const [status, setStatus] = useState(currentStatus);
  const [note, setNote] = useState(teamNote);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  async function save() {
    setLoading(true);
    setMsg('');
    try {
      const res = await fetch('/api/admin/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: orderId, status, teamNote: note }),
      });
      const data = await res.json();
      setMsg(res.ok ? 'ذخیره شد ✓' : data.error || 'خطا');
    } catch {
      setMsg('خطای شبکه');
    }
    setLoading(false);
  }

  return (
    <div className="admin-form-row">
      <select value={status} onChange={(e) => setStatus(e.target.value as OrderStatus)}>
        {statuses.map((s) => (
          <option key={s.value} value={s.value}>{s.label}</option>
        ))}
      </select>
      <input placeholder="یادداشت تیم" value={note} onChange={(e) => setNote(e.target.value)} />
      <button type="button" className="primary" onClick={save} disabled={loading}>{loading ? '...' : 'به‌روزرسانی'}</button>
      {msg && <span className="admin-save-msg">{msg}</span>}
    </div>
  );
}
