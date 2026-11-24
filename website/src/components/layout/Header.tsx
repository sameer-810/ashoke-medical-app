import { useCallback, useState } from 'react';
import { Menu, PhoneCall, MessageCircle, LogIn } from 'lucide-react';
import { Logo } from '../common/Logo';
import { MobileMenu } from './MobileMenu';
import { SITE, whatsappLink } from '../../data/site';

const navLink = 'hidden items-center gap-2 rounded-full px-3 py-2 text-[14.5px] font-semibold text-white/85 transition hover:bg-white/10 hover:text-white';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  return (
    <>
      <header className="sticky top-0 z-50 bg-header shadow-[0_1px_0_rgba(255,255,255,.06)]">
        <div className="container-page flex flex-nowrap items-center gap-x-2 py-2.5 lg:h-[68px] lg:gap-5 lg:py-0">
          <button type="button" className="grid size-10 place-items-center rounded-full text-white hover:bg-white/10 lg:hidden" onClick={() => setMenuOpen(true)} aria-label="Open menu">
            <Menu size={24} />
          </button>
          <Logo variant="dark" />
          <nav className="ml-auto flex items-center gap-1">
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={`${navLink} md:flex`}><MessageCircle size={18} /> WhatsApp</a>
            {/* A full page load, not a router link: /login is the staff portal, not this site. */}
            <a href="/login" className="flex items-center gap-2 rounded-full px-3 py-2 text-[14.5px] font-semibold text-white/85 transition hover:bg-white/10 hover:text-white"><LogIn size={18} /> Login</a>
            <a href={SITE.phoneHref} className="btn-primary h-10 px-4 text-[14px] sm:px-5">
              <PhoneCall size={17} /> <span className="hidden lg:inline">Call {SITE.phoneDisplay}</span><span className="lg:hidden">Call</span>
            </a>
          </nav>
        </div>
      </header>
      <MobileMenu open={menuOpen} onClose={closeMenu} />
    </>
  );
}
