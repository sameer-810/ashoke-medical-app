import { Hero } from '../components/home/Hero';
import { TrustBar } from '../components/home/TrustBar';
import { QuickActions } from '../components/home/QuickActions';
import { Services } from '../components/home/Services';
import { VisitStore } from '../components/home/VisitStore';
import { Band } from '../components/common/SectionHeader';

export function HomePage() {
  return (
    <>
      <Hero />

      {/* trust card overlaps the bottom of the hero */}
      <div className="bg-page">
        <div className="container-page relative z-10 -mt-14">
          <TrustBar />
        </div>
      </div>

      <Band tone="grey" id="why-us" className="pt-14 sm:pt-16"><Services /></Band>
      <Band tone="white"><QuickActions /></Band>
      <Band tone="grey"><VisitStore /></Band>
    </>
  );
}
