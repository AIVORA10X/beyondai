import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BeyondAI | ابزارهای هوش مصنوعی',
  description: 'پلتفرم فارسی معرفی و تهیه ابزارهای هوش مصنوعی',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
