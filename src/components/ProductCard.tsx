import Link from 'next/link';
import type { Product } from '@/lib/catalog';
import { statusText } from '@/lib/catalog';

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card">
      {product.tag ? <span className="product-tag">{product.tag}</span> : null}
      <div className="card-top">
        <div className={`product-icon ${product.id}`} aria-hidden>
          {product.name.slice(0, 1)}
        </div>
        <span className={`status ${product.status}`}>{statusText[product.status]}</span>
      </div>
      <div className="category">{product.category}</div>
      <h3>{product.name}</h3>
      <p className="short-desc">{product.shortDesc}</p>
      {product.features.length > 0 ? (
        <ul className="feature-list">
          {product.features.slice(0, 3).map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      ) : null}
      <div className="card-bottom">
        <span className="price">{product.priceLabel}</span>
        <Link href={`/order?product=${product.id}`} className="order-btn">
          سفارش
        </Link>
      </div>
      <small>{product.deliveryNote}</small>
    </article>
  );
}
