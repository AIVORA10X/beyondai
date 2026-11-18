import { ensureSchema, getSql } from './db';

export type ProductStatus = 'verification_pending' | 'paused' | 'active';

export type Product = {
  id: string;
  name: string;
  category: string;
  shortDesc: string;
  description: string;
  status: ProductStatus;
  priceLabel: string;
  amount: number;
  deliveryNote: string;
  features: string[];
  tag?: string;
};

/** متن شفاف برای مشتری: چه می‌گیرد / نمی‌گیرد */
export const PRODUCT_DETAILS: Record<
  string,
  { gets: string[]; notGets: string[]; eta: string }
> = {
  manus: {
    gets: ['هماهنگی تهیه دسترسی طبق پلن اعلام‌شده', 'پیگیری وضعیت در داشبورد', 'پشتیبانی فارسی تا تحویل'],
    notGets: ['رمز حساب شخصی شما ذخیره نمی‌شود', 'گارانتی آپتایم سرویس ثالث'],
    eta: 'معمولاً ۱ تا ۳ روز کاری پس از تأیید و پرداخت',
  },
  gemini: {
    gets: ['بررسی امکان تهیه', 'اعلام مبلغ نهایی قبل پرداخت', 'پیگیری تا تکمیل'],
    notGets: ['دسترسی غیرقانونی یا دور زدن محدودیت‌ها بدون شفافیت'],
    eta: '۱ تا ۳ روز کاری پس از تأیید',
  },
  grok: {
    gets: ['ثبت درخواست برای بررسی امکان ارائه'],
    notGets: ['فروش تا زمان فعال‌شدن محصول در کاتالوگ'],
    eta: 'پس از فعال‌سازی رسمی محصول',
  },
  chatgpt: {
    gets: ['هماهنگی دسترسی طبق پلن', 'بدون درخواست رمز حساب شما', 'پشتیبانی تیکتی'],
    notGets: ['اشتراک‌گذاری رمز یا کد یک‌بارمصرف شما با ما'],
    eta: '۱ تا ۳ روز کاری پس از پرداخت',
  },
  higgsfield: {
    gets: ['ثبت در صف بررسی'],
    notGets: ['فروش قبل از تأیید نهایی محصول'],
    eta: 'پس از تأیید محصول در کاتالوگ',
  },
};

export const DEFAULT_PRODUCTS: Product[] = [
  {
    id: 'manus',
    name: 'Manus',
    category: 'دستیار هوش مصنوعی',
    shortDesc: 'دستیار هوشمند برای اتوماسیون کار و تحقیق',
    description:
      'درخواست تهیه دسترسی به Manus ثبت می‌شود. مبلغ تقریبی روی کارت است؛ مبلغ نهایی بعد از بررسی اعلام می‌شود.',
    status: 'active',
    priceLabel: 'از ۱٬۲۰۰٬۰۰۰ تومان',
    amount: 1200000,
    deliveryNote: 'پس از تأیید تیم و پرداخت — معمولاً ۱ تا ۳ روز کاری',
    features: ['اتوماسیون وظایف', 'تحقیق', 'پشتیبانی فارسی'],
    tag: 'جدید',
  },
  {
    id: 'gemini',
    name: 'Gemini',
    category: 'هوش مصنوعی گوگل',
    shortDesc: 'مدل چندوجهی گوگل برای متن، تصویر و کد',
    description: 'سفارش بررسی می‌شود؛ در صورت امکان ارائه، راهنمای پرداخت و تحویل اعلام می‌گردد.',
    status: 'active',
    priceLabel: 'از ۹۵۰٬۰۰۰ تومان',
    amount: 950000,
    deliveryNote: 'پس از تأیید و پرداخت — ۱ تا ۳ روز کاری',
    features: ['تحلیل تصویر', 'کدنویسی', 'استدلال'],
  },
  {
    id: 'grok',
    name: 'Grok',
    category: 'هوش مصنوعی xAI',
    shortDesc: 'مدل xAI — فعلاً در کاتالوگ غیرفعال',
    description: 'فروش تا فعال‌سازی رسمی متوقف است؛ می‌توانید درخواست بررسی بگذارید.',
    status: 'paused',
    priceLabel: 'غیرفعال',
    amount: 0,
    deliveryNote: 'پس از فعال‌سازی محصول',
    features: ['دانش به‌روز'],
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    category: 'هوش مصنوعی OpenAI',
    shortDesc: 'دستیار گفتگوی OpenAI با پیگیری شفاف',
    description: 'بدون دریافت رمز حساب شما. جزئیات پلن را در سفارش بنویسید.',
    status: 'active',
    priceLabel: 'از ۸۵۰٬۰۰۰ تومان',
    amount: 850000,
    deliveryNote: 'پس از پرداخت — معمولاً ۱ تا ۳ روز کاری',
    features: ['گفتگو', 'فایل', 'محتوا'],
    tag: 'پرطرفدار',
  },
  {
    id: 'higgsfield',
    name: 'Higgsfield',
    category: 'تولید تصویر و ویدئو',
    shortDesc: 'تولید تصویر و ویدئو — در انتظار تأیید فروش',
    description: 'فعلاً فقط ثبت علاقه/بررسی؛ فروش بعد از تأیید نهایی.',
    status: 'verification_pending',
    priceLabel: 'به‌زودی',
    amount: 0,
    deliveryNote: 'پس از تأیید محصول',
    features: ['تصویر', 'ویدئو'],
  },
];

export const statusText: Record<ProductStatus, string> = {
  verification_pending: 'در انتظار تأیید',
  paused: 'غیرفعال',
  active: 'قابل سفارش',
};

function mapProduct(row: Record<string, unknown>): Product {
  let features: string[] = [];
  const f = row.features;
  if (Array.isArray(f)) features = f.map(String);
  else if (typeof f === 'string') {
    try {
      features = JSON.parse(f);
    } catch {
      features = [];
    }
  }
  return {
    id: String(row.id),
    name: String(row.name),
    category: String(row.category || ''),
    shortDesc: String(row.short_desc || ''),
    description: String(row.description || ''),
    status: (row.status as ProductStatus) || 'active',
    priceLabel: String(row.price_label || ''),
    amount: Number(row.amount || 0),
    deliveryNote: String(row.delivery_note || ''),
    features,
    tag: row.tag ? String(row.tag) : undefined,
  };
}

export async function seedProductsIfEmpty() {
  await ensureSchema();
  const sql = getSql();
  const count = await sql`SELECT COUNT(*)::int AS c FROM products`;
  if (Number(count[0]?.c || 0) > 0) return;
  for (const p of DEFAULT_PRODUCTS) {
    await sql`INSERT INTO products (id, name, category, short_desc, description, status, price_label, amount, delivery_note, features, tag)
      VALUES (${p.id}, ${p.name}, ${p.category}, ${p.shortDesc}, ${p.description}, ${p.status}, ${p.priceLabel}, ${p.amount}, ${p.deliveryNote}, ${JSON.stringify(p.features)}, ${p.tag || null})
      ON CONFLICT (id) DO NOTHING`;
  }
}

export async function getProducts(): Promise<Product[]> {
  await seedProductsIfEmpty();
  const sql = getSql();
  const rows = await sql`SELECT * FROM products ORDER BY name`;
  return rows.map((r) => mapProduct(r as Record<string, unknown>));
}

export async function getProduct(id: string): Promise<Product | undefined> {
  await seedProductsIfEmpty();
  const sql = getSql();
  const rows = await sql`SELECT * FROM products WHERE id = ${id} LIMIT 1`;
  if (!rows[0]) return undefined;
  return mapProduct(rows[0] as Record<string, unknown>);
}

export async function updateProduct(
  id: string,
  patch: Partial<{
    name: string;
    category: string;
    shortDesc: string;
    status: ProductStatus;
    priceLabel: string;
    amount: number;
    deliveryNote: string;
    tag: string | null;
  }>
): Promise<Product | null> {
  await ensureSchema();
  const sql = getSql();
  const current = await getProduct(id);
  if (!current) return null;
  const name = patch.name ?? current.name;
  const category = patch.category ?? current.category;
  const shortDesc = patch.shortDesc ?? current.shortDesc;
  const status = patch.status ?? current.status;
  const priceLabel = patch.priceLabel ?? current.priceLabel;
  const amount = patch.amount ?? current.amount;
  const deliveryNote = patch.deliveryNote ?? current.deliveryNote;
  const tag = patch.tag === undefined ? current.tag || null : patch.tag;
  const rows = await sql`UPDATE products SET name = ${name}, category = ${category}, short_desc = ${shortDesc}, status = ${status}, price_label = ${priceLabel}, amount = ${amount}, delivery_note = ${deliveryNote}, tag = ${tag}, updated_at = NOW() WHERE id = ${id} RETURNING *`;
  if (!rows[0]) return null;
  return mapProduct(rows[0] as Record<string, unknown>);
}
