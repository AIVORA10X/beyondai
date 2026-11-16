'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SupportPage() {
  const router = useRouter();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, message }),
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
        <h1>پشتیبانی</h1>
        <p style={{ color: 'var(--muted)', marginBottom: 20 }}>تیکت جدید برای تیم پشتیبانی ارسال کنید.</p>
        <form onSubmit={onSubmit}>
          <div className="form-field">
            <label>موضوع</label>
            <input value={subject} onChange={(e) => setSubject(e.target.value)} required placeholder="مثلاً مشکل سفارش" />
          </div>
          <div className="form-field">
            <label>پیام</label>
            <textarea rows={5} value={message} onChange={(e) => setMessage(e.target.value)} required placeholder="توضیح کامل" />
          </div>
          {error && <p className="form-error">{error}</p>}
          <button className="primary" type="submit" disabled={loading} style={{ width: '100%' }}>
            {loading ? '...' : 'ارسال تیکت'}
          </button>
        </form>
      </div>
    </main>
  );
}
