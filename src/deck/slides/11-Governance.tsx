import { Check } from 'lucide-react';
import { Headline } from '../components/Headline';
import { Reveal } from '../components/Reveal';
import { SlideFrame } from '../components/SlideFrame';
import type { SlideMetadata } from '../types';

export const metadata: SlideMetadata = {
  id: 'governance',
  title: 'Governance and cost',
  section: 'Appendix',
  notes: 'Heads-Up selects from summaries the attendee can already access. It does not alter sharing defaults or process another meeting, which limits both governance risk and incremental cost.',
};

const bullets = [
  'Only same-series records the user can already access as an attendee',
  'No sharing defaults change, so the FY24 rollback concern doesn’t arise',
  'Private card, audit-logged, respects retention',
  'No new meeting processing: a small selection step on existing summaries',
];

export default function GovernanceSlide() {
  return (
    <SlideFrame section={metadata.section}>
      <div className="absolute inset-x-[104px] top-[200px]">
        <Reveal><Headline>Built inside today&apos;s permissions.</Headline></Reveal>
        <div className="mt-[80px] space-y-[22px]">
          {bullets.map((bullet, index) => (
            <Reveal key={bullet} delay={100 + index * 75}>
              <div className="flex min-h-[116px] items-center gap-[25px] rounded-[25px] border border-white/70 bg-white/55 px-[34px] py-[24px]">
                <div className="flex h-[42px] w-[42px] flex-shrink-0 items-center justify-center rounded-full bg-[var(--deck-callout)] text-[var(--deck-accent)]"><Check size={24} strokeWidth={2.2} /></div>
                <p className="text-[27px] leading-[1.3]">{bullet}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </SlideFrame>
  );
}
