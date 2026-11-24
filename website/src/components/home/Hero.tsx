import { Plus, Syringe, Pill, ShieldCheck, Truck, BadgeCheck, PhoneCall, MessageCircle } from 'lucide-react';
import { SITE, whatsappLink } from '../../data/site';
import { cx } from '../../lib/format';

/** Capsule drawn in two halves */
function Capsule({ color, className }: { color: string; className?: string }) {
  return (
    <span className={cx('absolute flex h-9 w-[92px] overflow-hidden rounded-full shadow-[0_10px_24px_-8px_rgba(0,0,0,.5)]', className)}>
      <span className="w-1/2" style={{ background: color }} />
      <span className="w-1/2 bg-white" />
    </span>
  );
}

/** Hero picture: the store's logo mark inside orbit rings, with floating medicine shapes */
function OrbitArt() {
  return (
    <div className="relative size-full">
      <span className="absolute inset-[12%] rounded-full bg-[radial-gradient(circle,rgba(140,198,63,.28),transparent_70%)]" />
      <span className="absolute inset-0 rounded-full border border-white/15" />
      <span className="absolute inset-[30%] rounded-full border border-white/20" />
      <span className="absolute inset-[34%] grid place-items-center rounded-full bg-white shadow-[0_0_0_10px_rgba(255,255,255,.08),0_20px_50px_-10px_rgba(0,0,0,.5)]">
        <img src="/logo-mark.png" alt="" width={162} height={169} className="w-[62%]" />
      </span>
      <Capsule color="var(--color-accent)" className="animate-float left-[8%] top-[6%] -rotate-3" />
      <Capsule color="#5fcf4c" className="animate-float-slow bottom-[8%] right-[2%] -rotate-6" />
      <span className="animate-float-slow absolute right-[6%] top-[14%] grid size-14 place-items-center rounded-full bg-white shadow-lg">
        <span className="h-0.5 w-7 rotate-[-8deg] rounded bg-gray-300" />
      </span>
      <Plus className="animate-float absolute left-[2%] top-[42%] text-[#8cdc6e]" size={34} strokeWidth={2.5} />
      <Syringe className="animate-float absolute right-[-2%] top-[46%] text-accent-light" size={36} />
      <Pill className="animate-float-slow absolute bottom-[14%] left-[10%] rotate-45 text-[#a5e58e]" size={40} />
    </div>
  );
}

const POINTS = [
  { icon: ShieldCheck, text: '100% genuine medicines' },
  { icon: BadgeCheck, text: 'Pharmacist verified' },
  { icon: Truck, text: 'Home delivery' },
];

/** Dark green banner at the top of the home page */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,var(--color-forest)_0%,var(--color-forest-mid)_45%,#174f12_62%,var(--color-navy)_100%)] text-white">
      <span aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-full w-2/3 -translate-x-1/3 bg-[radial-gradient(ellipse_at_center,rgba(46,140,28,.35),transparent_65%)]" />
      <div className="container-page relative flex min-h-[460px] items-center justify-between gap-10 pb-24 pt-14 sm:pt-16 lg:min-h-[560px]">
        <div className="max-w-[620px]">
          <p className="text-[12.5px] font-bold uppercase tracking-[2.5px] text-accent-light">Chemist &amp; Druggist</p>
          <h1 className="mt-4 text-[34px] font-bold leading-[1.12] sm:text-[46px] lg:text-[54px]">Genuine medicines, delivered to your door.</h1>
          <p className="mt-5 max-w-[520px] text-[16px] leading-relaxed text-white/85 sm:text-[17px]">
            Call or WhatsApp us — our pharmacist confirms your medicines and price, and we deliver them to your doorstep.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={SITE.phoneHref} className="btn-primary btn-md h-12 px-7"><PhoneCall size={18} /> Call {SITE.phoneDisplay}</a>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-light btn-md h-12 px-7"><MessageCircle size={18} /> WhatsApp us</a>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2.5 text-[14px] font-medium text-white/85">
            {POINTS.map(p => <li key={p.text} className="flex items-center gap-2"><p.icon size={17} className="text-[#8cdc6e]" />{p.text}</li>)}
          </ul>
        </div>
        <div className="relative hidden size-[300px] shrink-0 md:block lg:size-[400px]"><OrbitArt /></div>
      </div>
    </section>
  );
}
