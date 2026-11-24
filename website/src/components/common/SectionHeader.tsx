import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { cx } from '../../lib/format';

interface Props {
  title: string;
  /** small capital label above the title, e.g. "WHY BUY FROM US" */
  eyebrow?: string;
  subtitle?: string;
  to?: string;
  actions?: ReactNode;
  center?: boolean;
}

export function SectionHeader({ title, eyebrow, subtitle, to, actions, center }: Props) {
  return (
    <div className={cx('mb-8 flex items-end gap-4', center ? 'justify-center text-center' : 'justify-between')}>
      <div className={center ? 'max-w-2xl' : 'max-w-3xl'}>
        {eyebrow && <p className="eyebrow mb-2.5">{eyebrow}</p>}
        <h2 className="text-[26px] font-bold leading-tight text-ink sm:text-[32px]">{title}</h2>
        {subtitle && <p className="mt-2.5 text-[15.5px] leading-relaxed text-muted">{subtitle}</p>}
      </div>
      {(to || actions) && (
        <div className="flex shrink-0 items-center gap-2">
          {actions}
          {to && (
            <Link to={to} className="inline-flex items-center gap-0.5 text-[15px] font-semibold text-brand-ink hover:underline">
              View all <ChevronRight size={18} />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

/** Centered divider title, e.g. "QUICK ACTIONS" */
export function DividerTitle({ children }: { children: ReactNode }) {
  return (
    <div className="mb-8 flex items-center gap-5">
      <span className="h-px flex-1 bg-line" />
      <span className="eyebrow">{children}</span>
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}

/** Full-width page band; tone alternates white / light grey like the reference */
export function Band({ tone = 'white', children, className, id }: { tone?: 'white' | 'grey'; children: ReactNode; className?: string; id?: string }) {
  return (
    // scroll-mt keeps the section title clear of the sticky header when jumped to
    <section id={id} className={cx(tone === 'white' ? 'bg-surface' : 'bg-page', 'scroll-mt-16 py-16 sm:py-20', className)}>
      <div className="container-page">{children}</div>
    </section>
  );
}
