import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Twitter, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Logo } from '../common/Logo';
import { SITE } from '../../data/site';

const COMPANY = [
  { label: `About ${SITE.name}`, to: '/info/about' },
  { label: 'Contact Us', to: '/info/contact' },
  { label: 'FAQs', to: '/info/faq' },
  { label: 'Terms and Conditions', to: '/info/terms' },
  { label: 'Privacy Policy', to: '/info/privacy' },
];

const SOCIAL = [
  { label: 'Facebook', href: SITE.social.facebook, icon: Facebook },
  { label: 'Instagram', href: SITE.social.instagram, icon: Instagram },
  { label: 'YouTube', href: SITE.social.youtube, icon: Youtube },
  { label: 'X (Twitter)', href: SITE.social.x, icon: Twitter },
];

function Column({ title, links }: { title: string; links: { label: string; to: string }[] }) {
  return (
    <div>
      <h3 className="mb-4 text-[15px] font-extrabold uppercase tracking-wider text-accent-light">{title}</h3>
      <ul className="space-y-2.5">
        {links.map(l => (
          <li key={l.to}>
            <Link to={l.to} className="group inline-flex items-center gap-1.5 text-[15px] text-white/80 transition hover:text-white">
              <span className="h-px w-0 bg-accent-light transition-all group-hover:w-3" />{l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="relative bg-navy text-white">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[2fr_1fr]">
        <div>
          <Logo variant="dark" />
          <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-white/75">
            {SITE.fullName} — your neighbourhood chemist &amp; druggist. Genuine medicines and everyday health
            essentials, with registered pharmacists to help you.
          </p>
          <ul className="mt-5 space-y-2.5 text-[15px] text-white/80">
            <li className="flex gap-2.5"><Phone size={18} className="mt-0.5 shrink-0 text-accent-light" /><a href={SITE.phoneHref} className="hover:text-white">{SITE.phoneDisplay}</a></li>
            <li className="flex gap-2.5"><Mail size={18} className="mt-0.5 shrink-0 text-accent-light" /><a href={`mailto:${SITE.email}`} className="hover:text-white">{SITE.email}</a></li>
            <li className="flex gap-2.5"><Clock size={18} className="mt-0.5 shrink-0 text-accent-light" />{SITE.supportHours}, all days</li>
            <li className="flex gap-2.5"><MapPin size={18} className="mt-0.5 shrink-0 text-accent-light" />{SITE.address}</li>
          </ul>
          <div className="mt-6 flex gap-2.5">
            {SOCIAL.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                className="grid size-10 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/15 transition hover:bg-accent hover:text-on-accent hover:ring-accent">
                <s.icon size={18} />
              </a>
            ))}
          </div>
        </div>
        <Column title="Company" links={COMPANY} />
      </div>
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-center text-sm text-white/60 sm:flex-row sm:text-left">
          <p>© {new Date().getFullYear()} {SITE.fullName}. All rights reserved.</p>
          <p>Prescription medicines are dispensed only against a valid prescription.</p>
        </div>
      </div>
    </footer>
  );
}
