import { Clock, PhoneCall, MapPin, MessageCircle } from 'lucide-react';
import { SITE, whatsappLink } from '../../data/site';

/** Photo + store details: timings, phone, address */
export function VisitStore() {
  const row = 'flex items-start gap-3.5';
  const tile = 'grid size-11 shrink-0 place-items-center rounded-xl bg-brand-tint text-brand ring-1 ring-brand/10';
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
      <div className="relative">
        <img src="/images/store-open.jpg" alt="Open sign on a shop door" loading="lazy" width={960} height={640}
          className="aspect-[4/3] w-full rounded-3xl object-cover shadow-[0_30px_60px_-30px_rgba(14,27,51,.5)]" />
        <div className="absolute -bottom-6 left-6 flex items-center gap-3 rounded-2xl bg-surface px-5 py-3.5 shadow-[0_18px_40px_-16px_rgba(14,27,51,.45)] ring-1 ring-line sm:left-auto sm:right-6">
          <span className="relative flex size-3"><span className="absolute inline-flex size-full animate-ping rounded-full bg-brand/60" /><span className="relative inline-flex size-3 rounded-full bg-brand" /></span>
          <div className="leading-tight">
            <p className="text-[12px] font-semibold uppercase tracking-wider text-subtle">Open daily</p>
            <p className="font-bold text-ink">{SITE.supportHours}</p>
          </div>
        </div>
      </div>

      <div className="pt-4 lg:pt-0">
        <p className="eyebrow mb-2.5">Visit or call us</p>
        <h2 className="text-[26px] font-bold leading-tight text-ink sm:text-[32px]">Your neighbourhood chemist &amp; druggist</h2>
        <p className="mt-3 text-[15.5px] leading-relaxed text-muted">
          Walk in, call, or send your prescription on WhatsApp — our registered pharmacist is here to help with
          medicines, dosage and everyday health needs.
        </p>
        <ul className="mt-7 space-y-5">
          <li className={row}>
            <span className={tile}><Clock size={21} /></span>
            <div><p className="font-bold text-ink">Timings</p><p className="text-muted">{SITE.supportHours}, all days</p></div>
          </li>
          <li className={row}>
            <span className={tile}><PhoneCall size={20} /></span>
            <div><p className="font-bold text-ink">Phone &amp; WhatsApp</p><a href={SITE.phoneHref} className="text-muted hover:text-brand-ink">{SITE.phoneDisplay}</a></div>
          </li>
          <li className={row}>
            <span className={tile}><MapPin size={21} /></span>
            <div><p className="font-bold text-ink">Address</p><p className="text-muted">{SITE.address}</p></div>
          </li>
        </ul>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={SITE.phoneHref} className="btn-primary btn-md h-12 px-6"><PhoneCall size={18} /> Call now</a>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-outline btn-md h-12 px-6"><MessageCircle size={18} /> WhatsApp us</a>
        </div>
      </div>
    </div>
  );
}
