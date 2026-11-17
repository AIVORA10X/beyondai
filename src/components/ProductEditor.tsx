'use client';

import { useState } from 'react';
import type { Product, ProductStatus } from '@/lib/catalog';

export function ProductEditor({ product, statusLabel }: { product: Product; statusLabel: string }) {
  const [amount, setAmount] = useState(String(product.amount));
  const [priceLabel, setPriceLabel] = useState(product.priceLabel);
  const [status, setStatus] = useState<ProductStatus>(product.status);
  const [deliveryNote, setDeliveryNote] = useState(product.deliveryNote);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  async function save() {
    setLoading(true);
    setMsg('');
    try {
      const res = await fetch('/api/admin/products', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: product.id,
          amount: Number(amount) || 0,
          priceLabel,
          status,
          deliveryNote,
        }),
      });
      const data = await res.json();
      setMsg(res.ok ? 'ذخیره شد ✓' : data.error || 'خطا');
    } catch {
      setMsg('خطای شبکه');
    }
    setLoading(false);
  }

  return (
    <article className="admin-product-card">
      <div className="admin-product-head">
        <h3>{product.name}</h3>
        <span className={`status ${product.status}`}>{statusLabel}</span>
      </div>
      <p className="short-desc">{product.shortDesc}</p>
      <div className="admin-product-grid">
        <div className="form-field">
          <label>مبلغ (تومان)</label>
          <input value={amount} onChange={(e) => setAmount(e.target.value)} inputMode="numeric" />
        </div>
        <div className="form-field">
          <label>برچسب قیمت</label>
          <input value={priceLabel} onChange={(e) => setPriceLabel(e.target.value)} />
        </div>
        <div className="form-field">
          <label>وضعیت</label>
          <select value={status} onChange={(e) => setStatus(e.target.value as ProductStatus)}>
            <option value="active">قابل سفارش</option>
            <option value="paused">غیرفعال</option>
            <option value="verification_pending">در انتظار تأیید</option>
          </select>
        </div>
        <div className="form-field" style={{ gridColumn: '1 / -1' }}>
          <label>توضیح تحویل</label>
          <input value={deliveryNote} onChange={(e) => setDeliveryNote(e.target.value)} />
        </div>
      </div>
      <div className="admin-product-actions">
        <button type="button" className="primary" onClick={save} disabled={loading}>
          {loading ? '...' : 'ذخیره تغییرات'}
        </button>
        {msg && <span className="admin-save-msg">{msg}</span>}
      </div>
    </article>
  );
}
