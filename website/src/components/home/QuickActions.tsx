import { PhoneCall, ArrowUpRight } from 'lucide-react';
import { SITE, whatsappLink } from '../../data/site';
import { SectionHeader } from '../common/SectionHeader';

function WhatsAppIcon({ size = 26 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden>
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.3.8 3.2.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.2-.2-.5-.3z" />
    </svg>
  );
}

export function QuickActions({ withHeader = true }: { withHeader?: boolean }) {
  const card = 'card group flex items-start gap-5 p-6 transition hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-20px_rgba(14,27,51,.35)] sm:p-7';
  return (
    <>
      {withHeader && <SectionHeader eyebrow="Quick actions" title="Prefer to talk? Order by call or WhatsApp" />}
      <div className="grid gap-5 md:grid-cols-2">
        <a href={SITE.phoneHref} className={card}>
          <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-accent-soft text-accent-ink ring-1 ring-accent/20"><PhoneCall size={26} /></span>
          <div className="flex-1">
            <h3 className="flex items-center justify-between gap-2 text-[19px] font-bold text-ink">Order via Call <ArrowUpRight size={20} className="text-subtle transition group-hover:text-ink" /></h3>
            <p className="mt-1 text-[15px] leading-relaxed text-muted">Speak to our registered pharmacist</p>
            <p className="mt-2 text-[17px] font-bold text-accent-ink">{SITE.phoneDisplay}</p>
          </div>
        </a>
        <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={card}>
          <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-[#e8f9ee] text-[#1fa855] ring-1 ring-[#25d366]/25"><WhatsAppIcon /></span>
          <div className="flex-1">
            <h3 className="flex items-center justify-between gap-2 text-[19px] font-bold text-ink">Order on WhatsApp <ArrowUpRight size={20} className="text-subtle transition group-hover:text-ink" /></h3>
            <p className="mt-1 text-[15px] leading-relaxed text-muted">Send your prescription &amp; order medicines easily</p>
            <p className="mt-2 text-[17px] font-bold text-[#1a8f4a]">{SITE.whatsappDisplay}</p>
          </div>
        </a>
      </div>
    </>
  );
}
