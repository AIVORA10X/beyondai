/** آیکون اختصاصی هر محصول — طراحی اصلی، نه لوگوی رسمی برند */

export function ProductIcon({ id, name }: { id: string; name: string }) {
  const label = name.slice(0, 1);

  if (id === 'chatgpt') {
    return (
      <div className="product-art chatgpt" aria-hidden>
        <svg viewBox="0 0 64 64" className="product-svg">
          <circle cx="32" cy="32" r="28" fill="url(#g1)" />
          <path
            d="M32 16c-6 0-11 4-12 9 2-1 5-2 8-1 1-3 4-5 8-5 5 0 9 4 9 9 0 1 0 2-1 3 3 1 5 4 5 7 0 5-4 9-9 9-1 0-2 0-3-1-1 3-4 6-8 6-5 0-9-4-9-9 0-1 0-2 1-3-3-1-5-4-5-7 0-3 2-6 5-7-1-1-1-2-1-3 0-5 4-9 9-9 1 0 2 0 3 1z"
            fill="#fff"
            opacity="0.95"
          />
          <defs>
            <linearGradient id="g1" x1="0" y1="0" x2="64" y2="64">
              <stop stopColor="#10a37f" />
              <stop offset="1" stopColor="#0d9488" />
            </linearGradient>
          </defs>
        </svg>
        <span className="product-art-name">ChatGPT</span>
      </div>
    );
  }

  if (id === 'gemini') {
    return (
      <div className="product-art gemini" aria-hidden>
        <svg viewBox="0 0 64 64" className="product-svg">
          <circle cx="32" cy="32" r="28" fill="url(#g2)" />
          <path d="M32 14l4 14h14l-11 8 4 14-11-8-11 8 4-14-11-8h14z" fill="#fff" opacity="0.95" />
          <defs>
            <linearGradient id="g2" x1="0" y1="0" x2="64" y2="64">
              <stop stopColor="#4285f4" />
              <stop offset="0.5" stopColor="#9b72cb" />
              <stop offset="1" stopColor="#d96570" />
            </linearGradient>
          </defs>
        </svg>
        <span className="product-art-name">Gemini</span>
      </div>
    );
  }

  if (id === 'grok') {
    return (
      <div className="product-art grok" aria-hidden>
        <svg viewBox="0 0 64 64" className="product-svg">
          <circle cx="32" cy="32" r="28" fill="url(#g3)" />
          <text x="32" y="40" textAnchor="middle" fill="#fff" fontSize="22" fontWeight="800" fontFamily="system-ui">
            X
          </text>
          <defs>
            <linearGradient id="g3" x1="0" y1="0" x2="64" y2="64">
              <stop stopColor="#111" />
              <stop offset="1" stopColor="#333" />
            </linearGradient>
          </defs>
        </svg>
        <span className="product-art-name">Grok</span>
      </div>
    );
  }

  if (id === 'manus') {
    return (
      <div className="product-art manus" aria-hidden>
        <svg viewBox="0 0 64 64" className="product-svg">
          <circle cx="32" cy="32" r="28" fill="url(#g4)" />
          <rect x="20" y="22" width="24" height="20" rx="6" fill="#fff" opacity="0.95" />
          <circle cx="28" cy="32" r="3" fill="#6366f1" />
          <circle cx="36" cy="32" r="3" fill="#6366f1" />
          <defs>
            <linearGradient id="g4" x1="0" y1="0" x2="64" y2="64">
              <stop stopColor="#6366f1" />
              <stop offset="1" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
        </svg>
        <span className="product-art-name">Manus</span>
      </div>
    );
  }

  if (id === 'higgsfield') {
    return (
      <div className="product-art higgsfield" aria-hidden>
        <svg viewBox="0 0 64 64" className="product-svg">
          <circle cx="32" cy="32" r="28" fill="url(#g5)" />
          <rect x="18" y="20" width="28" height="20" rx="4" fill="#fff" opacity="0.9" />
          <polygon points="28,26 28,34 36,30" fill="#ec4899" />
          <defs>
            <linearGradient id="g5" x1="0" y1="0" x2="64" y2="64">
              <stop stopColor="#ec4899" />
              <stop offset="1" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
        </svg>
        <span className="product-art-name">Higgsfield</span>
      </div>
    );
  }

  return (
    <div className="product-art default" aria-hidden>
      <div className="product-icon">{label}</div>
    </div>
  );
}
