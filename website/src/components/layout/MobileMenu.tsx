import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Phone, Info, BadgeCheck, MessageCircle, LogIn } from 'lucide-react';
import { SITE, whatsappLink } from '../../data/site';
import { Logo } from '../common/Logo';
import { cx } from '../../lib/format';

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const location = useLocation();

  // close when navigating
  useEffect(() => { onClose(); }, [location, onClose]);
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', esc);
    return () => { document.body.style.overflow = ''; document.removeEventListener('keydown', esc); };
  }, [open, onClose]);

  const row = 'flex items-center gap-3 rounded-lg px-3 py-2.5 font-bold text-ink hover:bg-brand-tint';
  return (
    <div className={cx('fixed inset-0 z-[200] lg:hidden', !open && 'pointer-events-none')} aria-hidden={!open}>
      <div className={cx('absolute inset-0 bg-black/45 transition-opacity', open ? 'opacity-100' : 'opacity-0')} onClick={onClose} />
      <aside
        className={cx('absolute inset-y-0 left-0 flex w-[86%] max-w-sm flex-col bg-surface shadow-2xl transition-transform duration-200', open ? 'translate-x-0' : '-translate-x-full')}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
      >
        <div className="flex items-center justify-between border-b border-divider p-4">
          <Logo />
          <button type="button" onClick={onClose} className="grid size-10 place-items-center rounded-full hover:bg-brand-soft" aria-label="Close menu"><X /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-3">
          <Link to="/#why-us" className={row}><BadgeCheck size={20} className="text-brand-ink" />Why buy from us</Link>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={row}><MessageCircle size={20} className="text-[#1fa855]" />WhatsApp us</a>
          <Link to="/info/about" className={row}><Info size={20} className="text-brand-ink" />About Us</Link>
          <Link to="/info/contact" className={row}><Phone size={20} className="text-brand-ink" />Contact Us</Link>
          <a href="/login" className={row}><LogIn size={20} className="text-brand-ink" />Login</a>        </div>
        <a href={SITE.phoneHref} className="m-3 btn-primary btn-md"><Phone size={18} /> Call {SITE.phoneDisplay}</a>
      </aside>
    </div>
  );
}
