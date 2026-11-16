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

export const products: Product[] = [
  {
    id: 'manus',
    name: 'Manus',
    category: 'دستیار هوش مصنوعی',
    shortDesc: 'دستیار هوشمند برای اتوماسیون کارها و تحقیق',
    description: 'Manus یک دستیار هوش مصنوعی پیشرفته برای انجام کارهای پیچیده، تحقیق و اتوماسیون فرآیندهاست.',
    status: 'active',
    priceLabel: 'از ۱٬۲۰۰٬۰۰۰ تومان',
    amount: 1200000,
    deliveryNote: 'پس از پرداخت و تأیید تیم فعال می‌شود.',
    features: ['اتوماسیون وظایف', 'تحقیق عمیق', 'پشتیبانی چندزبانه', 'یکپارچه‌سازی ابزارها'],
    tag: 'جدید',
  },
  {
    id: 'gemini',
    name: 'Gemini',
    category: 'هوش مصنوعی گوگل',
    shortDesc: 'مدل چندوجهی قدرتمند گوگل برای متن، تصویر و کد',
    description: 'Gemini مدل هوش مصنوعی چندوجهی گوگل است.',
    status: 'active',
    priceLabel: 'از ۹۵۰٬۰۰۰ تومان',
    amount: 950000,
    deliveryNote: 'تحویل پس از تأیید پرداخت.',
    features: ['تحلیل تصویر', 'کدنویسی پیشرفته', 'استدلال پیچیده', 'ادغام با اکوسیستم گوگل'],
  },
  {
    id: 'grok',
    name: 'Grok',
    category: 'هوش مصنوعی xAI',
    shortDesc: 'مدل هوش مصنوعی xAI با دسترسی به اطلاعات لحظه‌ای',
    description: 'Grok ساخته xAI با تمرکز بر پاسخ‌های صریح.',
    status: 'paused',
    priceLabel: 'غیرفعال',
    amount: 0,
    deliveryNote: 'تا زمان تأیید رسمی پشتیبانی منطقه‌ای غیرفعال است.',
    features: ['پاسخ‌های بی‌پرده', 'دانش به‌روز', 'حالت Fun', 'تحلیل عمیق'],
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    category: 'هوش مصنوعی OpenAI',
    shortDesc: 'محبوب‌ترین دستیار گفتگوی هوش مصنوعی دنیا',
    description: 'ChatGPT پلتفرم گفتگوی هوش مصنوعی OpenAI است.',
    status: 'active',
    priceLabel: 'از ۸۵۰٬۰۰۰ تومان',
    amount: 850000,
    deliveryNote: 'بدون اشتراک‌گذاری رمز حساب.',
    features: ['گفتگوی طبیعی', 'تحلیل فایل', 'تولید محتوا', 'GPTهای سفارشی'],
    tag: 'پرطرفدار',
  },
  {
    id: 'higgsfield',
    name: 'Higgsfield',
    category: 'تولید تصویر و ویدئو',
    shortDesc: 'تولید تصویر و ویدئو با هوش مصنوعی پیشرفته',
    description: 'Higgsfield ابزار تولید تصویر و ویدئو با کیفیت بالا است.',
    status: 'verification_pending',
    priceLabel: 'به‌زودی',
    amount: 0,
    deliveryNote: 'فروش پس از تأیید رسمی فعال خواهد شد.',
    features: ['تولید تصویر', 'تولید ویدئو', 'کنترل سبک', 'کیفیت سینمایی'],
  },
];

export const statusText: Record<ProductStatus, string> = {
  verification_pending: 'در انتظار تأیید',
  paused: 'غیرفعال',
  active: 'قابل سفارش',
};

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
