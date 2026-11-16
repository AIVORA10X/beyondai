'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { products } from '@/lib/products';

function OrderForm() {
  const params = useSearchParams();
  const router = useRouter();
  const initial = params.get('product') || products.find((p) => p.status === 'active')?.id || '';
  const [productId, setProductId] = useState(initial);
  const [planNote, setPlanNote] = useState('');
  const [userNote, setUserNote] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const selected = products.find((p) => p.id === productId);

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
        router.push('/login');
        return;
      }
      if (!res.ok) {
        setError(data.error || 'خطا');
        setLoading(false);
        return;
      }
      router.push('/dashboard');
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
        <Link href="/dashboard" className="auth-link">داشبورد</Link>
      </header>
      <div className="order-page">
        <h1>ثبت سفارش</h1>
        <p style={{ color: 'var(--muted)', marginBottom: 20 }}>درخواست برای تیم BeyondAI ارسال می‌شود.</p>
        <form onSubmit={onSubmit}>
          <div className="form-field">
            <label>محصول</label>
            <select value={productId} onChange={(e) => setProductId(e.target.value)} required>
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} — {p.priceLabel}
                </option>
              ))}
            </select>
          </div>
          {selected && (
            <p style={{ fontSize: 13, color: 'var(--cyan)', marginBottom: 12 }}>
              مبلغ تقریبی: {selected.amount ? selected.amount.toLocaleString('fa-IR') + ' تومان' : selected.priceLabel}
            </p>
          )}
          <div className="form-field">
            <label>پلن / مدت</label>
            <input value={planNote} onChange={(e) => setPlanNote(e.target.value)} placeholder="مثلاً ماهانه / سالانه" />
          </div>
          <div className="form-field">
            <label>توضیحات</label>
            <textarea rows={4} value={userNote} onChange={(e) => setUserNote(e.target.value)} placeholder="نیاز یا جزئیات بیشتر" />
          </div>
          {error && <p className="form-error">{error}</p>}
          <button className="primary" type="submit" disabled={loading} style={{ width: '100%' }}>
            {loading ? 'در حال ارسال...' : 'ارسال سفارش'}
          </button>
        </form>
      </div>
    </main>
  );
}

export default function OrderPage() {
  return (
    <Suspense fallback={<main><p style={{ padding: 40 }}>...</p></main>}>
      <OrderForm />
    </Suspense>
  );
}
