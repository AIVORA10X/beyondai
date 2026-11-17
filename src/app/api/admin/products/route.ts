import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { updateProduct, getProducts, type ProductStatus } from '@/lib/catalog';

export async function GET() {
  const user = await getCurrentUser();
  if (!user || user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  return NextResponse.json({ products: await getProducts() });
}

export async function PATCH(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user || user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  try {
    const body = await req.json();
    const { id, amount, priceLabel, status, deliveryNote, name, category, shortDesc, tag } = body;
    if (!id) return NextResponse.json({ error: 'id الزامی است' }, { status: 400 });
    const product = await updateProduct(id, {
      amount: typeof amount === 'number' ? amount : undefined,
      priceLabel, status: status as ProductStatus | undefined, deliveryNote, name, category, shortDesc, tag,
    });
    if (!product) return NextResponse.json({ error: 'محصول یافت نشد' }, { status: 404 });
    return NextResponse.json({ product });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'خطای سرور' }, { status: 500 });
  }
}
