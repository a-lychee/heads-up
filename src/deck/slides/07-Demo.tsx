import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Headline } from '../components/Headline';
import { Reveal } from '../components/Reveal';
import { SlideFrame } from '../components/SlideFrame';
import type { SlideMetadata } from '../types';

export const metadata: SlideMetadata = {
  id: 'demo',
  title: 'Demo',
  section: '02 · Demo',
  notes: 'Switch to the demo tab.',
};

export default function DemoSlide() {
  return (
    <SlideFrame section={metadata.section}>
      <div className="absolute inset-x-[104px] top-[205px]">
        <Reveal><Headline secondary="Heads-Up, 30 minutes before the sync.">Let&apos;s see it.</Headline></Reveal>
        <Reveal delay={140} className="mt-[105px]">
          <Link to="/demo" className="group flex h-[310px] w-full items-center justify-between rounded-[36px] border border-white/80 bg-[var(--deck-card)] px-[64px] shadow-[var(--deck-card-shadow)]">
            <div>
              <p className="text-[20px] font-semibold uppercase tracking-[0.14em] text-[var(--deck-accent)]">Product prototype</p>
              <p className="mt-[18px] font-['Bricolage_Grotesque'] text-[58px] font-extrabold tracking-[-0.035em]">Open live demo</p>
            </div>
            <div className="flex h-[112px] w-[112px] items-center justify-center rounded-full bg-[var(--deck-ink)] text-white">
              <ArrowUpRight size={54} strokeWidth={1.5} />
            </div>
          </Link>
        </Reveal>
      </div>
    </SlideFrame>
  );
}
