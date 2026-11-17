import type { Metadata } from 'next';
import './globals.css';
import './admin-styles.css';
import './layout-extras.css';

export const metadata: Metadata = {
  title: 'BeyondAI | ابزارهای هوش مصنوعی',
  description: 'پلتفرم فارسی تهیه امن و شفاف ابزارهای هوش مصنوعی — سفارش، پیگیری، پشتیبانی',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
