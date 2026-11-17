export function SectionHead({
  eyebrow,
  title,
  subtitle,
  center = false,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? 'section-head center' : 'section-head'}>
      <div>
        <div className="eyebrow">{eyebrow}</div>
        <h2>{title}</h2>
        {subtitle ? <p className="section-sub">{subtitle}</p> : null}
      </div>
    </div>
  );
}
