import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { createOrder, getOrdersByUser } from '@/lib/orders';
import { getProduct } from '@/lib/products';

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'وارد شوید' }, { status: 401 });
  return NextResponse.json({ orders: getOrdersByUser(user.id) });
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'وارد شوید' }, { status: 401 });
  try {
    const body = await req.json();
    const { productId, planNote, userNote } = body;
    const product = getProduct(productId);
    if (!product) {
      return NextResponse.json({ error: 'محصول یافت نشد' }, { status: 400 });
    }
    const order = createOrder({
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      productId: product.id,
      productName: product.name,
      planNote: planNote || '',
      userNote: userNote || '',
      amount: product.amount,
    });
    return NextResponse.json({ order }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'خطای سرور' }, { status: 500 });
  }
}
