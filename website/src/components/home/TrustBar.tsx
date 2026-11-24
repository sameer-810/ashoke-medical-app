import { ShieldCheck, Tag, Truck, Headphones } from 'lucide-react';
import { SITE } from '../../data/site';

const FEATURES = [
  { icon: ShieldCheck, title: '100% Genuine Medicines', text: 'Quality you can trust' },
  { icon: Tag, title: 'Best Prices', text: 'Save more on every order' },
  { icon: Truck, title: 'Fast & Reliable Delivery', text: 'On time, every time' },
  { icon: Headphones, title: `${SITE.supportHours} Support`, text: "We're here to help" },
];

/** White card that overlaps the bottom of the dark hero */
export function TrustBar() {
  return (
    <section className="grid grid-cols-1 overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_24px_48px_-24px_rgba(14,27,51,.35)] sm:grid-cols-2 xl:grid-cols-4">
      {FEATURES.map((f, i) => (
        <div
          key={f.title}
          className={[
            'flex items-center gap-4 px-6 py-6',
            i > 0 ? 'border-t border-divider sm:border-t-0' : '',
            i % 2 === 1 ? 'sm:border-l' : '',
            i >= 2 ? 'sm:border-t xl:border-t-0' : '',
            i === 2 ? 'xl:border-l' : '',
          ].join(' ')}
        >
          <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand-tint text-brand ring-1 ring-brand/10"><f.icon size={23} /></span>
          <div>
            <h3 className="text-[15.5px] font-bold leading-snug text-ink">{f.title}</h3>
            <p className="text-[14px] text-muted">{f.text}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
