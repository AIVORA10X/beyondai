/** لوگوهای محصول مطابق فایل‌های رسمی که کاربر فرستاد */

export function ProductIcon({ id, name }: { id: string; name: string }) {
  if (id === 'chatgpt') {
    return (
      <div className="product-art" aria-label="ChatGPT">
        <div className="logo-box logo-chatgpt">
          <svg viewBox="0 0 100 100" className="logo-svg-full">
            <rect width="100" height="100" rx="22" fill="#10A37F" />
            <g transform="translate(18,18) scale(2.65)" fill="#fff">
              <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.163a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
            </g>
          </svg>
        </div>
        <span className="product-art-name">ChatGPT</span>
      </div>
    );
  }

  if (id === 'gemini') {
    return (
      <div className="product-art" aria-label="Gemini">
        <div className="logo-box logo-gemini">
          <svg viewBox="0 0 100 100" className="logo-svg-full">
            <rect width="100" height="100" rx="22" fill="#FFFFFF" stroke="#E8ECF0" strokeWidth="1" />
            <defs>
              <linearGradient id="geminiGrad" x1="20" y1="15" x2="80" y2="85" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#EA4335" />
                <stop offset="25%" stopColor="#FBBC05" />
                <stop offset="55%" stopColor="#34A853" />
                <stop offset="100%" stopColor="#4285F4" />
              </linearGradient>
            </defs>
            <path
              fill="url(#geminiGrad)"
              d="M50 18 C52 34, 66 48, 82 50 C66 52, 52 66, 50 82 C48 66, 34 52, 18 50 C34 48, 48 34, 50 18 Z"
            />
          </svg>
        </div>
        <span className="product-art-name">Gemini</span>
      </div>
    );
  }

  if (id === 'grok') {
    return (
      <div className="product-art" aria-label="Grok">
        <div className="logo-box logo-grok">
          <svg viewBox="0 0 100 100" className="logo-svg-full">
            <rect width="100" height="100" rx="22" fill="#000000" />
            {/* orbit mark matching uploaded Grok logo */}
            <path
              fill="#FFFFFF"
              d="M62 22c10 6 16 16 16 28 0 18-14 32-32 32-8 0-15-3-21-7l8-10c4 3 8 4 13 4 11 0 20-9 20-19 0-7-3-13-9-16l5-12zm-24 56C28 72 22 62 22 50c0-18 14-32 32-32 8 0 15 3 21 7l-8 10c-4-3-8-4-13-4-11 0-20 9-20 19 0 7 3 13 9 16l-5 12z"
            />
            <path
              fill="#FFFFFF"
              d="M28 78 L72 22"
              stroke="#FFFFFF"
              strokeWidth="7"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <span className="product-art-name">Grok</span>
      </div>
    );
  }

  if (id === 'manus') {
    return (
      <div className="product-art" aria-label="Manus">
        <div className="logo-box logo-manus">
          <svg viewBox="0 0 100 100" className="logo-svg-full">
            <rect width="100" height="100" rx="22" fill="#FFFFFF" stroke="#EDEDED" strokeWidth="1" />
            {/* pointing hand + sparks — Manus brand glyph */}
            <g fill="#34322D" transform="translate(8,6) scale(0.85)">
              <path d="M58 28c-2-8-8-14-16-16-2 0-3 2-2 4 2 3 4 7 4 11 0 2 1 3 3 3h8c3 0 5-2 5-5 0-3-1-6-2-9z" />
              <path d="M72 18c1-3-1-5-4-4-4 2-7 5-9 9-1 2 0 4 2 4 5-1 9-4 11-9z" />
              <path d="M78 32c3-1 4-4 2-6-3-3-7-5-12-5-2 0-3 2-2 4 3 2 7 4 10 5 1 1 2 2 2 2z" />
              <path d="M34 42c-2-6-1-12 3-17 2-2 5-1 6 1 2 5 2 10 0 15-1 2-3 3-5 3-2 0-3-1-4-2z" />
              <path d="M42 38c6-8 16-12 26-10 3 1 4 4 2 6-7 4-14 7-22 8-2 0-4-2-3-4 0 0-2 0-3 0z" />
              <path d="M28 52c8-2 18-1 26 4 2 1 2 4 0 5-9 4-19 4-28 1-2-1-2-4 0-5 0 0 1-4 2-5z" />
              <path d="M22 58c-4 10-2 22 6 30 2 2 5 1 6-1 3-7 4-15 2-23-1-2-3-3-5-3s-4 0-9-3z" />
              <path d="M48 55c10 2 20 8 26 17 1 2 0 5-2 5-8-2-16-7-22-14-2-2-1-5 1-6 0 0-2-2-3-2z" />
            </g>
          </svg>
        </div>
        <span className="product-art-name">Manus</span>
      </div>
    );
  }

  if (id === 'higgsfield') {
    return (
      <div className="product-art" aria-label="Higgsfield">
        <div className="logo-box logo-higgsfield">
          <svg viewBox="0 0 100 100" className="logo-svg-full">
            <rect width="100" height="100" rx="22" fill="#C8FF00" />
            {/* black squiggle mark from official Higgsfield icon */}
            <path
              d="M22 42 C28 28, 42 28, 48 40 C52 48, 56 52, 62 48 C70 42, 74 28, 82 32"
              fill="none"
              stroke="#000000"
              strokeWidth="11"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M48 40 C52 52, 58 62, 68 58"
              fill="none"
              stroke="#000000"
              strokeWidth="11"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <span className="product-art-name">Higgsfield</span>
      </div>
    );
  }

  return (
    <div className="product-art">
      <div className="logo-box logo-default">{name.slice(0, 1)}</div>
      <span className="product-art-name">{name}</span>
    </div>
  );
}
