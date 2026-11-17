import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { getProducts, statusText } from '@/lib/catalog';
import { Header } from '@/components/Header';
import { AdminNav } from '@/components/AdminNav';
import { ProductEditor } from '@/components/ProductEditor';

export default async function AdminProductsPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');
  if (user.role !== 'admin') redirect('/dashboard');
  const products = await getProducts();

  return (
    <main>
      <Header />
      <section className="dash admin-layout">
        <div className="eyebrow"><span />ادمین</div>
        <h1>محصولات و قیمت‌ها</h1>
        <p style={{ color: 'var(--muted)' }}>مبلغ، برچسب قیمت و وضعیت را دستی تغییر دهید.</p>
        <AdminNav active="/admin/products" />
        <div className="admin-product-list">
          {products.map((p) => (
            <ProductEditor key={p.id} product={p} statusLabel={statusText[p.status]} />
          ))}
        </div>
      </section>
    </main>
  );
}
