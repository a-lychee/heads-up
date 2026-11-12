import { ArrowRight, ShieldCheck } from 'lucide-react';
import { Headline } from '../components/Headline';
import { Reveal } from '../components/Reveal';
import { SlideFrame } from '../components/SlideFrame';
import type { SlideMetadata } from '../types';

export const metadata: SlideMetadata = {
  id: 'next',
  title: 'What we’d test next',
  section: '03 · Next',
  notes: 'Lead with weekly activity among light attendees, then connect it to retention and useful action. Privacy escalations are a guardrail, not a tradeoff we are willing to make.',
};

const tests = [
  { label: 'Primary metric: Light attendees active weekly', from: '20%', to: '26%' },
  { label: 'Seat retention, light attendees', from: '34%', to: '39%' },
  { label: 'Action items acted on', from: '6%', to: '20%' },
];

export default function NextSlide() {
  return (
    <SlideFrame section={metadata.section} source="Ex 2, 3, 5">
      <div className="absolute inset-x-[104px] top-[190px]">
        <Reveal><Headline>What we&apos;d test next.</Headline></Reveal>
        <div className="mt-[70px] space-y-[18px]">
          {tests.map((test, index) => (
            <Reveal key={test.label} delay={100 + index * 70}>
              <div className="flex h-[126px] items-center justify-between rounded-[26px] border border-white/70 bg-white/60 px-[36px]">
                <span className="text-[27px] font-medium">{test.label}</span>
                <div className="flex items-center gap-[24px] font-display text-[38px] font-extrabold tracking-[-0.03em]">
                  <span className="text-[var(--deck-secondary)]">{test.from}</span><ArrowRight size={30} className="text-[var(--deck-muted)]" /><span className="text-[var(--deck-accent)]">{test.to}</span>
                </div>
              </div>
            </Reveal>
          ))}
          <Reveal delay={310}>
            <div className="flex h-[126px] items-center gap-[22px] rounded-[26px] border border-white/70 bg-white/60 px-[36px]">
              <ShieldCheck size={32} className="text-[var(--deck-accent)]" /><span className="text-[27px] font-medium">Guardrail: no increase in admin privacy escalations</span>
            </div>
          </Reveal>
        </div>
      </div>
    </SlideFrame>
  );
}
