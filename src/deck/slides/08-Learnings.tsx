import { GlassCard } from '../components/GlassCard';
import { Headline } from '../components/Headline';
import { Reveal } from '../components/Reveal';
import { SlideFrame } from '../components/SlideFrame';
import type { SlideMetadata } from '../types';

export const metadata: SlideMetadata = {
  id: 'learnings',
  title: 'What we learned',
  section: '03 · Learnings',
  notes: 'Replace the three placeholders with lessons from building and testing the prototype. End on the riskiest assumption because it explains the next experiment.',
};

const learnings = ['[Learning 1]', '[Learning 2]', '[Learning 3]'];

export default function LearningsSlide() {
  return (
    <SlideFrame section={metadata.section}>
      <div className="absolute inset-x-[104px] top-[190px]">
        <Reveal><Headline>What we learned building it.</Headline></Reveal>
        <div className="mt-[80px] grid grid-cols-3 gap-[30px]">
          {learnings.map((learning, index) => (
            <Reveal key={learning} delay={100 + index * 80}>
              <GlassCard className="h-[360px]">
                <span className="font-['Bricolage_Grotesque'] text-[28px] font-extrabold text-[var(--deck-accent)]">0{index + 1}</span>
                <h2 className="mt-[42px] font-['Bricolage_Grotesque'] text-[38px] font-extrabold tracking-[-0.03em]">{learning}</h2>
                <p className="mt-[22px] text-[24px] text-[var(--deck-muted)]">[One-line learning placeholder]</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
        <Reveal delay={340} className="mt-[45px] flex justify-center">
          <div className="flex items-center gap-[20px] rounded-full border border-white/80 bg-white/50 px-[30px] py-[18px] backdrop-blur-[16px]">
            <span className="text-[17px] font-semibold uppercase tracking-[0.12em] text-[var(--deck-accent)]">Riskiest assumption</span>
            <span className="text-[21px]">Enough recurring meetings leave each light user something they own or still open.</span>
          </div>
        </Reveal>
      </div>
    </SlideFrame>
  );
}
