import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BeyondAI | ابزارهای هوش مصنوعی',
  description: 'مرجع فارسی معرفی و تهیه قانونی ابزارهای هوش مصنوعی — شفاف، امن، با پشتیبانی فارسی',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
