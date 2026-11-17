'use client';

import { useState } from 'react';

export function TicketReplyForm({ ticketId, currentStatus }: { ticketId: string; currentStatus: string }) {
  const [reply, setReply] = useState('');
  const [status, setStatus] = useState(currentStatus);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  async function save() {
    setLoading(true);
    setMsg('');
    try {
      const res = await fetch('/api/admin/tickets', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: ticketId, reply, status }),
      });
      const data = await res.json();
      setMsg(res.ok ? 'ذخیره شد ✓' : data.error || 'خطا');
    } catch {
      setMsg('خطای شبکه');
    }
    setLoading(false);
  }

  return (
    <div className="admin-form-row" style={{ marginTop: 12 }}>
      <textarea rows={2} placeholder="پاسخ تیم..." value={reply} onChange={(e) => setReply(e.target.value)} style={{ flex: 1, minWidth: 200 }} />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="open">باز</option>
        <option value="answered">پاسخ‌داده‌شده</option>
        <option value="closed">بسته</option>
      </select>
      <button type="button" className="primary" onClick={save} disabled={loading}>{loading ? '...' : 'ارسال'}</button>
      {msg && <span className="admin-save-msg">{msg}</span>}
    </div>
  );
}
