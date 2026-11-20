/**
 * نشان محصول — بازنمایی نزدیک به هویت بصری شناخته‌شده هر سرویس
 * (برای شناسایی محصول در فروشگاه؛ استفاده تجاری از برندها تابع قوانین همان شرکت است)
 */

export function ProductIcon({ id, name }: { id: string; name: string }) {
  if (id === 'chatgpt') {
    return (
      <div className="product-art" aria-label="ChatGPT">
        <div className="logo-box logo-chatgpt">
          <svg viewBox="0 0 24 24" className="logo-svg" fill="none">
            <path
              fill="#fff"
              d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.163a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"
            />
          </svg>
        </div>
        <span className="product-art-name">ChatGPT · OpenAI</span>
      </div>
    );
  }

  if (id === 'gemini') {
    return (
      <div className="product-art" aria-label="Gemini">
        <div className="logo-box logo-gemini">
          <svg viewBox="0 0 24 24" className="logo-svg">
            <defs>
              <linearGradient id="gem" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1BA1E3" />
                <stop offset="45%" stopColor="#5489D6" />
                <stop offset="70%" stopColor="#9B72CB" />
                <stop offset="100%" stopColor="#D96570" />
              </linearGradient>
            </defs>
            <path
              fill="url(#gem)"
              d="M12 2c0 4.4-2.7 8-6.5 9.5C9.3 12.9 12 16.5 12 21c0-4.5 2.7-8.1 6.5-9.5C14.7 10 12 6.4 12 2z"
            />
          </svg>
        </div>
        <span className="product-art-name">Gemini · Google</span>
      </div>
    );
  }

  if (id === 'grok') {
    return (
      <div className="product-art" aria-label="Grok">
        <div className="logo-box logo-grok">
          <svg viewBox="0 0 24 24" className="logo-svg" fill="#fff">
            <path d="M12.186 3.03a1 1 0 0 1 .98-.03l7.5 4.2A1 1 0 0 1 21 8.06v7.88a1 1 0 0 1-.334.76l-7.5 6.1a1 1 0 0 1-1.332 0l-7.5-6.1A1 1 0 0 1 3 15.94V8.06a1 1 0 0 1 .334-.76l7.5-4.3a1 1 0 0 1 .352-.03zM8.2 9.35 5 11.2v3.9l3.2 2.6 3.2-2.6v-3.9L8.2 9.35zm7.6 0L12.6 11.2v3.9l3.2 2.6 3.2-2.6v-3.9l-3.2-1.85z" />
          </svg>
          <span className="logo-text-overlay">Grok</span>
        </div>
        <span className="product-art-name">Grok · xAI</span>
      </div>
    );
  }

  if (id === 'manus') {
    return (
      <div className="product-art" aria-label="Manus">
        <div className="logo-box logo-manus">
          <svg viewBox="0 0 64 64" className="logo-svg">
            {/* hand / pointer glyph inspired by Manus mark */}
            <path
              fill="#34322D"
              d="M38 12c-1.5 0-2.8.8-3.5 2.1L28 28.5V18a3 3 0 0 0-6 0v18.2l-3.2-3.8a3.2 3.2 0 0 0-5 4l8.5 11.2c1.2 1.6 3.1 2.5 5.1 2.5H42c4.4 0 8-3.1 8-7.5V28a4 4 0 0 0-8 0v2h-2V18a4 4 0 0 0-8 0v10.5l5.2-10.2A4 4 0 0 1 42 16c2.2 0 4 1.8 4 4v4h2v-4c0-3.3-2.7-8-10-8z"
            />
            <circle cx="46" cy="14" r="3" fill="#34322D" opacity="0.35" />
            <circle cx="52" cy="18" r="2" fill="#34322D" opacity="0.25" />
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
          <svg viewBox="0 0 64 64" className="logo-svg">
            <rect width="64" height="64" rx="14" fill="#C0FF00" />
            <path
              fill="#000"
              d="M18 28c0-2 1-4 3-5s4-1 6 0c2 1 3 2 5 2s4-1 5-3 3-3 5-3 4 1 5 3c1 2 1 4 0 6-1 2-3 3-5 4-2 1-4 2-5 4s-1 4 0 6c1 2 3 3 5 3s4-1 5-3"
              stroke="#000"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
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
