import { Quote, UserRound } from 'lucide-react';
import { CountUp } from '../components/CountUp';
import { GlassCard } from '../components/GlassCard';
import { Headline } from '../components/Headline';
import { Reveal } from '../components/Reveal';
import { SlideFrame } from '../components/SlideFrame';
import { StatPill } from '../components/StatPill';
import type { SlideMetadata } from '../types';

export const metadata: SlideMetadata = {
  id: 'user',
  title: 'Light users',
  section: '01 · The user',
  notes: 'Priya represents the light user: few meetings, but ownership in the ones she attends. She does not form a habit of opening Ansel, so the product must meet her at the calendar moment instead.',
};

export default function UserSlide() {
  return (
    <SlideFrame section={metadata.section} source="Kilts Center Ansel case (2026), Ex 3, 7; team interviews (n=13)">
      <div className="absolute inset-x-[104px] top-[185px]">
        <Reveal>
          <Headline style={{ fontSize: 82 }} secondary="Half of all seats. Two-thirds of idle ones.">
            Light users: under 5 meetings a week.
          </Headline>
        </Reveal>
        <div className="mt-[70px] flex gap-[34px]">
          <Reveal delay={100} className="w-[650px] flex-shrink-0">
            <GlassCard className="h-[320px]">
              <div className="flex items-start gap-[24px]">
                <div className="flex h-[82px] w-[82px] flex-shrink-0 items-center justify-center rounded-full bg-[var(--deck-callout)] text-[var(--deck-accent)]"><UserRound size={40} /></div>
                <div>
                  <h2 className="font-['Bricolage_Grotesque'] text-[34px] font-extrabold tracking-[-0.03em]">Priya, data analyst</h2>
                  <p className="mt-[18px] text-[24px] leading-[1.42] text-[var(--deck-muted)]">3–4 meetings a week, including one weekly team sync. Owns one piece of each meeting.</p>
                </div>
              </div>
            </GlassCard>
          </Reveal>
          <div className="flex flex-1 flex-col gap-[22px]">
            {["If I only have three meetings that week, this is not something I think to open.", "I usually just ask someone who was there."].map((quote, index) => (
              <Reveal key={quote} delay={170 + index * 70}>
                <div className="flex min-h-[145px] items-center gap-[20px] rounded-[28px] border border-white/80 bg-white/50 px-[30px] py-[24px] backdrop-blur-[16px]">
                  <Quote className="flex-shrink-0 text-[var(--deck-accent)]" size={28} />
                  <p className="text-[24px] leading-[1.35]">“{quote}”</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
      <Reveal delay={280} className="absolute bottom-[70px] left-[104px] flex gap-[14px]">
        <StatPill value={<CountUp value={51} suffix="%" />} label="of all seats" />
        <StatPill value={<CountUp value={66} suffix="%" />} label="of idle seats" />
        <StatPill value={<CountUp value={20} suffix="%" />} label="active weekly" />
      </Reveal>
    </SlideFrame>
  );
}
