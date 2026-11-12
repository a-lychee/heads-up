import { CountUp } from '../components/CountUp';
import { Headline } from '../components/Headline';
import { Reveal } from '../components/Reveal';
import { SlideFrame } from '../components/SlideFrame';
import type { SlideMetadata } from '../types';

export const metadata: SlideMetadata = {
  id: 'opportunity',
  title: 'The opportunity',
  section: 'Appendix',
  notes: 'Narrow the market in two steps: light seats who attend, then those with at least one recurring meeting. That leaves 1.29 million seats and about $75 million of ARR where Heads-Up can recur.',
};

const bars = [
  { label: 'All light seats', seats: 2.09, arr: 122, width: 1500 },
  { label: 'Light seats that attend', seats: 1.71, arr: 100, width: 1250 },
  { label: 'With ≥1 recurring meeting a week', seats: 1.29, arr: 75, width: 1000 },
];

export default function OpportunitySlide() {
  return (
    <SlideFrame section={metadata.section} source="One price per seat ($240M ÷ 4.1M = $58.54); 48.5% recurring (Flowtrace)">
      <div className="absolute inset-x-[104px] top-[205px]">
        <Reveal><Headline style={{ fontSize: 86 }}>$75M of ARR sits on light seats with a recurring meeting.</Headline></Reveal>
        <div className="mt-[95px] flex flex-col items-center gap-[22px]">
          {bars.map((bar, index) => (
            <Reveal key={bar.label} delay={120 + index * 100} style={{ width: bar.width }}>
              <div className={`flex h-[112px] items-center justify-between rounded-[26px] border border-white/70 px-[36px] ${index === 2 ? 'bg-white/90 shadow-[var(--deck-card-shadow)]' : 'bg-white/50'}`}>
                <span className="text-[25px] font-medium">{bar.label}</span>
                <div className={`flex items-baseline gap-[24px] ${index === 2 ? 'text-[var(--deck-accent)]' : ''}`}>
                  <strong className="font-display text-[38px] font-extrabold tracking-[-0.035em]"><CountUp value={bar.seats} decimals={2} suffix="M" /></strong>
                  <span className="w-[105px] text-right font-display text-[38px] font-extrabold tracking-[-0.035em]">$<CountUp value={bar.arr} suffix="M" /></span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </SlideFrame>
  );
}
