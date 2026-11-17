import Link from 'next/link';

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        padding: 24,
        textAlign: 'center',
        fontFamily: 'Vazirmatn, sans-serif',
        background: '#06080f',
        color: '#f1f5f9',
      }}
    >
      <div>
        <p style={{ color: '#38bdf8', fontWeight: 700, marginBottom: 8 }}>۴۰۴</p>
        <h1 style={{ fontSize: '1.5rem', marginBottom: 12 }}>صفحه پیدا نشد</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24 }}>این آدرس در BeyondAI وجود ندارد.</p>
        <Link
          href="/"
          style={{
            display: 'inline-flex',
            padding: '10px 18px',
            borderRadius: 10,
            fontWeight: 700,
            background: 'linear-gradient(135deg, #38bdf8, #818cf8)',
            color: '#0b1020',
          }}
        >
          بازگشت به خانه
        </Link>
      </div>
    </main>
  );
}
