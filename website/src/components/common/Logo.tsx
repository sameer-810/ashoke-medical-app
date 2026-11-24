import { Link } from 'react-router-dom';
import { SITE } from '../../data/site';
import { cx } from '../../lib/format';

type Variant = 'full' | 'mark' | 'dark';

/**
 * Store logo.
 *  full = the complete logo image (public/logo.png) — for light backgrounds
 *  mark = just the cross & mortar icon (public/logo-mark.png)
 *  dark = icon + store name in white — for the dark green header / navy footer
 */
export function Logo({ variant = 'full', className, link = true }: { variant?: Variant; className?: string; link?: boolean }) {
  const content =
    variant === 'mark' ? (
      <img src="/logo-mark.png" alt={SITE.fullName} width={162} height={169} className={cx('h-10 w-auto', className)} />
    ) : variant === 'dark' ? (
      <span className={cx('flex items-center gap-2.5', className)}>
        <img src="/logo-mark.png" alt="" width={162} height={169} className="h-9 w-auto sm:h-10" />
        <span className="leading-tight">
          <span className="block text-[15px] font-bold text-white sm:text-[17px]">
            <span className="sm:hidden">{SITE.name}</span><span className="hidden sm:inline">{SITE.fullName}</span>
          </span>
          <span className="hidden text-[11px] font-semibold uppercase tracking-[1.5px] text-accent-light sm:block">Chemist &amp; Druggist</span>
        </span>
      </span>
    ) : (
      <img src="/logo.png" alt={`${SITE.fullName} — Chemist & Druggist`} width={561} height={169} className={cx('h-11 w-auto sm:h-14', className)} />
    );

  if (!link) return content;
  return (
    <Link to="/" className="flex shrink-0 items-center" aria-label={`${SITE.fullName} — home`}>
      {content}
    </Link>
  );
}
