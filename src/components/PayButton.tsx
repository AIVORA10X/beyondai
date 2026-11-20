'use client';

import { useState } from 'react';

export function PayButton({ orderId }: { orderId: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function pay() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'خطا');
        setLoading(false);
        return;
      }
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      setError('لینک پرداخت ساخته نشد');
    } catch {
      setError('خطای شبکه');
    }
    setLoading(false);
  }

  return (
    <span style={{ display: 'inline-flex', flexDirection: 'column', gap: 4 }}>
      <button type="button" className="order-btn" onClick={pay} disabled={loading}>
        {loading ? '...' : 'پرداخت'}
      </button>
      {error ? <span style={{ fontSize: 11, color: 'var(--bad)' }}>{error}</span> : null}
    </span>
  );
}
