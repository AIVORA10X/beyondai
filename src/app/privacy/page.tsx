import Link from 'next/link';
import { Header } from '@/components/Header';
import { SiteFooter } from '@/components/SiteFooter';

export const metadata = {
  title: 'حریم خصوصی | BeyondAI',
};

export default function PrivacyPage() {
  return (
    <main>
      <Header />
      <article className="legal-page">
        <div className="eyebrow">حریم خصوصی</div>
        <h1>سیاست حفظ حریم خصوصی</h1>
        <p className="legal-lead">
          ما حداقل داده لازم برای ارائه سرویس را نگه می‌داریم و از آن برای فروش به شخص ثالث استفاده نمی‌کنیم.
        </p>

        <h2>چه اطلاعاتی جمع می‌شود؟</h2>
        <ul>
          <li>نام، ایمیل و رمز عبور هش‌شده هنگام ثبت‌نام</li>
          <li>اطلاعات سفارش (محصول، یادداشت، وضعیت)</li>
          <li>متن تیکت‌های پشتیبانی</li>
        </ul>

        <h2>چه چیزی جمع نمی‌شود؟</h2>
        <ul>
          <li>رمز حساب‌های ChatGPT، Gemini و سایر سرویس‌های خارجی</li>
          <li>کد یک‌بارمصرف پیامکی/ایمیلی آن سرویس‌ها</li>
        </ul>

        <h2>نگهداری و امنیت</h2>
        <p>
          داده‌ها روی زیرساخت امن (دیتابیس و میزبانی ابری) ذخیره می‌شوند. رمز عبور به‌صورت برگشت‌ناپذیر هش
          می‌شود. دسترسی ادمین محدود به ایمیل‌های مجاز است.
        </p>

        <h2>حقوق شما</h2>
        <p>
          می‌توانید از طریق تیکت درخواست اصلاح یا حذف حساب را بدهید. بخشی از سوابق سفارش ممکن است برای
          الزامات مالی/پشتیبانی برای مدت محدود نگه داشته شود.
        </p>

        <p className="legal-note">
          سوال درباره حریم خصوصی؟ <Link href="/contact">تماس با ما</Link>
        </p>
      </article>
      <SiteFooter />
    </main>
  );
}
