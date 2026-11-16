'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'خطا در ثبت‌نام');
        setLoading(false);
        return;
      }
      window.location.href = '/';
    } catch {
      setError('خطای شبکه');
      setLoading(false);
    }
  }

  return (
    <main>
      <Header />
      <div className="auth-page">
        <h1>ثبت‌نام در BeyondAI</h1>
        <form onSubmit={onSubmit}>
          <div className="form-field">
            <label>نام</label>
            <input value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="form-field">
            <label>ایمیل</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-field">
            <label>رمز عبور</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
          </div>
          {error && <p className="form-error">{error}</p>}
          <button className="primary" type="submit" disabled={loading} style={{ width: '100%' }}>
            {loading ? '...' : 'ثبت‌نام'}
          </button>
        </form>
        <p style={{ marginTop: 16, color: 'var(--muted)', fontSize: 14 }}>
          قبلاً ثبت‌نام کرده‌اید؟ <Link href="/login" style={{ color: 'var(--cyan)' }}>ورود</Link>
        </p>
      </div>
    </main>
  );
}
