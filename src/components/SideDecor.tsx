/** تزئین دو طرف صفحه در دسکتاپ */

export function SideDecor() {
  return (
    <>
      <div className="side-decor side-decor-left" aria-hidden>
        <div className="float-card float-1">
          <span className="float-dot" />
          <strong>AI Ready</strong>
          <small>سفارش شفاف</small>
        </div>
        <div className="float-card float-2">
          <div className="mini-bars">
            <i /><i /><i /><i />
          </div>
          <strong>پشتیبانی FA</strong>
        </div>
        <div className="blob blob-a" />
        <div className="blob blob-b" />
      </div>
      <div className="side-decor side-decor-right" aria-hidden>
        <div className="float-card float-3">
          <strong>۰ رمز حساب</strong>
          <small>امنیت مشتری</small>
        </div>
        <div className="float-card float-4">
          <span className="pulse-ring" />
          <strong>Live</strong>
          <small>پیگیری سفارش</small>
        </div>
        <div className="blob blob-c" />
        <div className="blob blob-d" />
      </div>
    </>
  );
}
