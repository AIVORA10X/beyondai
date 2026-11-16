export default function HomePage() {
  return (
    <main style={{ minHeight: '100vh', background: '#05050a', color: '#e8f0ff', fontFamily: 'Tahoma, sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 32px', borderBottom: '1px solid #1a1a2e' }}>
        <strong style={{ fontSize: 22, letterSpacing: 1 }}>BeyondAI</strong>
        <nav style={{ display: 'flex', gap: 16 }}>
          <a href="/login" style={{ color: '#7dd3fc' }}>ورود</a>
          <a href="/register" style={{ color: '#c4b5fd' }}>ثبت‌نام</a>
        </nav>
      </header>
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}>
        <p style={{ color: '#22d3ee', marginBottom: 12 }}>هوش مصنوعی · شفاف · امن</p>
        <h1 style={{ fontSize: 42, lineHeight: 1.3, marginBottom: 20 }}>ابزارهای AI را با BeyondAI تهیه کنید</h1>
        <p style={{ color: '#94a3b8', fontSize: 18, marginBottom: 32 }}>
          فروشگاه فارسی ابزارهای هوش مصنوعی برای دامنه beatscolony.ir
        </p>
        <a href="/order" style={{ display: 'inline-block', padding: '14px 28px', background: 'linear-gradient(135deg,#06b6d4,#8b5cf6)', color: '#fff', borderRadius: 12, textDecoration: 'none', fontWeight: 700 }}>
          ثبت سفارش
        </a>
      </section>
    </main>
  );
}
