'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { DEFAULT_PRODUCTS, PRODUCT_DETAILS } from '@/lib/catalog';

function OrderForm() {
  const params = useSearchParams();
  const router = useRouter();
  const active = DEFAULT_PRODUCTS.filter((p) => p.status === 'active');
  const initial =
    params.get('product') || active[0]?.id || DEFAULT_PRODUCTS[0]?.id || '';
  const [productId, setProductId] = useState(initial);
  const [planNote, setPlanNote] = useState('');
  const [userNote, setUserNote] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const selected = DEFAULT_PRODUCTS.find((p) => p.id === productId);
  const detail = PRODUCT_DETAILS[productId];

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, planNote, userNote }),
      });
      const data = await res.json();
      if (res.status === 401) {
        router.push('/login?next=/order');
        return;
      }
      if (!res.ok) {
        setError(data.error || 'خطا');
        setLoading(false);
        return;
      }
      router.push('/dashboard?ordered=1');
    } catch {
      setError('خطای شبکه');
      setLoading(false);
    }
  }

  return (
    <main>
      <header className="topbar">
        <Link className="brand" href="/">
          <span className="brand-mark">B</span>
          <span>BeyondAI</span>
        </Link>
        <Link href="/dashboard" className="auth-link">
          داشبورد
        </Link>
      </header>

      <div className="order-page" style={{ maxWidth: 520 }}>
        <h1>ثبت سفارش</h1>
        <p style={{ color: 'var(--muted)', marginBottom: 16, fontSize: 14, lineHeight: 1.7 }}>
          ابتدا درخواست ثبت می‌شود. بعد از بررسی تیم، مبلغ نهایی و نحوه پرداخت اعلام می‌شود — قبل از تأیید
          ادمین لازم نیست واریز کنید.
        </p>

        <form onSubmit={onSubmit}>
          <div className="form-field">
            <label>محصول</label>
            <select value={productId} onChange={(e) => setProductId(e.target.value)} required>
              {DEFAULT_PRODUCTS.map((p) => (
                <option key={p.id} value={p.id} disabled={p.status === 'paused'}>
                  {p.name} — {p.priceLabel}
                  {p.status !== 'active' ? ' (محدود)' : ''}
                </option>
              ))}
            </select>
          </div>

          {selected && (
            <div className="trust-box" style={{ marginBottom: 16 }}>
              <p style={{ color: 'var(--text)', fontSize: 13, marginBottom: 8 }}>
                {selected.description}
              </p>
              <p style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 600 }}>
                مبلغ تقریبی:{' '}
                {selected.amount
                  ? selected.amount.toLocaleString('fa-IR') + ' تومان'
                  : selected.priceLabel}
              </p>
              <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 6 }}>
                زمان تقریبی: {detail?.eta || selected.deliveryNote}
              </p>
              {detail && (
                <>
                  <p style={{ fontSize: 12, marginTop: 10, fontWeight: 600 }}>چه می‌گیرید</p>
                  <ul style={{ fontSize: 12 }}>
                    {detail.gets.map((g) => (
                      <li key={g}>{g}</li>
                    ))}
                  </ul>
                  <p style={{ fontSize: 12, marginTop: 8, fontWeight: 600 }}>چه نمی‌گیرید</p>
                  <ul style={{ fontSize: 12 }}>
                    {detail.notGets.map((g) => (
                      <li key={g}>{g}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          )}

          <div className="form-field">
            <label>پلن / مدت</label>
            <input
              value={planNote}
              onChange={(e) => setPlanNote(e.target.value)}
              placeholder="مثلاً یک‌ماهه / سه‌ماهه"
            />
          </div>
          <div className="form-field">
            <label>توضیحات برای تیم</label>
            <textarea
              rows={4}
              value={userNote}
              onChange={(e) => setUserNote(e.target.value)}
              placeholder="نیاز دقیق‌تر، مهلت، یا سوال"
            />
          </div>
          {error && <p className="form-error">{error}</p>}
          <button className="primary" type="submit" disabled={loading} style={{ width: '100%' }}>
            {loading ? 'در حال ارسال...' : 'ثبت درخواست (بدون پرداخت در این مرحله)'}
          </button>
        </form>

        <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 16, lineHeight: 1.6 }}>
          با ثبت سفارش، <Link href="/terms">شرایط استفاده</Link> را می‌پذیرید.{' '}
          <Link href="/contact">پشتیبانی</Link>
        </p>
      </div>
    </main>
  );
}

export default function OrderPage() {
  return (
    <Suspense
      fallback={
        <main>
          <p style={{ padding: 40 }}>...</p>
        </main>
      }
    >
      <OrderForm />
    </Suspense>
  );
}
