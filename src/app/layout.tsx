import type { Metadata, Viewport } from 'next';
import './globals.css';
import './admin-styles.css';
import './layout-extras.css';
import './mobile.css';
import './legal.css';

export const metadata: Metadata = {
  title: {
    default: 'BeyondAI | ابزارهای هوش مصنوعی',
    template: '%s | BeyondAI',
  },
  description:
    'پلتفرم فارسی تهیه امن و شفاف ابزارهای هوش مصنوعی — سفارش، پیگیری، پشتیبانی',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
