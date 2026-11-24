import { Pill, ShoppingBasket, Truck, Stethoscope, ShieldCheck, ReceiptText } from 'lucide-react';
import { SectionHeader } from '../common/SectionHeader';

// Photos: frontend/public/images (CC0, see CREDITS.md there)
const SERVICES = [
  { icon: ShieldCheck, img: 'genuine-medicines', title: 'Genuine medicines only', text: 'Every medicine comes from an authorised distributor.' },
  { icon: Pill, img: 'prescription-capsules', title: 'Prescription medicines, responsibly', text: 'Prescription-only medicines are dispensed against a valid prescription, verified by our pharmacist.' },
  { icon: Stethoscope, img: 'pharmacist', title: 'A pharmacist you can ask', text: 'Dose, timing and substitutes explained by our registered pharmacist — at the counter or on call.' },
  { icon: ShoppingBasket, img: 'personal-care', title: 'General store essentials', text: 'Personal care, baby care, wellness and everyday health products under one roof.' },
  { icon: Truck, img: 'home-delivery', title: 'Home delivery', text: 'Order by call or WhatsApp — we bring your medicines to your doorstep.' },
  { icon: ReceiptText, img: 'store-shelves', title: 'A proper bill, every time', text: 'Every order comes with a bill, so you always know exactly what you were given.' },
];

/** "Why buy from us" photo cards */
export function Services() {
  return (
    <>
      <SectionHeader eyebrow="Why buy from us" title="What you can expect from your chemist" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map(s => (
          <article key={s.title} className="card group overflow-hidden transition hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-20px_rgba(14,27,51,.35)]">
            <div className="relative aspect-[16/9] overflow-hidden bg-brand-tint">
              <img src={`/images/${s.img}.jpg`} alt="" loading="lazy" width={900} height={600}
                className="size-full object-cover transition duration-500 group-hover:scale-105" />
              <span className="absolute inset-0 bg-gradient-to-t from-navy/35 to-transparent" />
            </div>
            <div className="relative px-6 pb-6">
              <span className="-mt-6 relative grid size-12 place-items-center rounded-xl bg-surface text-brand shadow-[0_8px_20px_-8px_rgba(14,27,51,.4)] ring-1 ring-line"><s.icon size={22} /></span>
              <h3 className="mt-3 text-[17px] font-bold text-ink">{s.title}</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{s.text}</p>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
