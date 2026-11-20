'use client';

import { Suspense, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

function MockPayInner() {
  const params = useSearchParams();
  const router = useRouter();
  const authority = params.get('authority') || '';
  const orderId = params.get('orderId') || '';
  const [loading, setLoading] = useState(false);

  async function confirm() {
    setLoading(true);
    // Simulate successful gateway return
    window.location.href = `/api/pay/callback?Authority=${encodeURIComponent(authority)}&Status=OK`;
  }

  function cancel() {
    router.push('/dashboard?pay=cancel');
  }

  return (
    <main>
      <div className="auth-page" style={{ maxWidth: 440 }}>
        <div className="eyebrow">پرداخت آزمایشی</div>
        <h1 style={{ fontSize: '1.3rem', margin: '10px 0' }}>تأیید پرداخت</h1>
        <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 16 }}>
          درگاه زرین‌پال هنوز وصل نیست. این صفحه مسیر کامل را برای تست شبیه‌سازی می‌کند.
        </p>
        <p style={{ fontSize: 13, marginBottom: 8 }}>
          سفارش: <strong dir="ltr">{orderId}</strong>
        </p>
        <p style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 20 }} dir="ltr">
          {authority}
        </p>
        <button className="primary" style={{ width: '100%', marginBottom: 10 }} onClick={confirm} disabled={loading}>
          {loading ? '...' : 'پرداخت موفق (تست)'}
        </button>
        <button className="secondary-btn" style={{ width: '100%' }} onClick={cancel}>
          انصراف
        </button>
        <p style={{ fontSize: 12, marginTop: 16 }}>
          <Link href="/dashboard">بازگشت به داشبورد</Link>
        </p>
      </div>
    </main>
  );
}

export default function MockPayPage() {
  return (
    <Suspense fallback={<main><p style={{ padding: 40 }}>...</p></main>}>
      <MockPayInner />
    </Suspense>
  );
}
