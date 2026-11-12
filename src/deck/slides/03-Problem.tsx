import { GlassCard } from '../components/GlassCard';
import { Headline } from '../components/Headline';
import { Kicker } from '../components/Kicker';
import { Reveal } from '../components/Reveal';
import { SlideFrame } from '../components/SlideFrame';
import { StatPill } from '../components/StatPill';
import { CountUp } from '../components/CountUp';
import type { SlideMetadata } from '../types';

export const metadata: SlideMetadata = {
  id: 'problem',
  title: 'The problem',
  section: '01 · The problem',
  notes: 'The summary is created after the meeting, but the next useful moment is seven days later. By then the email is archived and the user walks into the next sync without their context.',
};

export default function ProblemSlide() {
  return (
    <SlideFrame section={metadata.section} source="Source: Kilts Center Ansel case (2026), Ex 3, 5 · card is illustrative">
      <div className="absolute left-[104px] top-[250px] w-[960px]">
        <Reveal><Kicker>Where the value lands vs. where it&apos;s needed</Kicker></Reveal>
        <Reveal delay={80}>
          <Headline style={{ fontSize: 80 }} secondary={<>Light users need them 7<br />days later.</>}>
            Ansel&apos;s notes arrive 6<br />minutes after the meeting.
          </Headline>
        </Reveal>
      </div>

      <Reveal delay={160} className="absolute right-[104px] top-[222px] w-[640px]">
        <div className="relative h-[545px]">
          <div className="absolute left-[-26px] top-[-80px] h-[140px] w-[620px] rotate-[-4deg] rounded-[32px] bg-[var(--deck-card-back)] px-[34px] py-[30px]">
            <div className="flex items-center gap-[20px]">
              <div className="flex h-[64px] w-[64px] items-center justify-center rounded-[18px] bg-[image:var(--deck-app-icon-gradient)] text-[27px] font-semibold text-white">A</div>
              <div>
                <p className="text-[25px] font-semibold">Ansel · Meeting summary</p>
                <p className="mt-[5px] text-[18px] text-[var(--deck-muted)]">Weekly Product Sync · 7 days ago</p>
              </div>
              <span className="ml-auto rounded-[10px] bg-white/50 px-[14px] py-[8px] text-[15px] text-[var(--deck-muted)]">Archived</span>
            </div>
          </div>
          <GlassCard className="absolute top-[70px] h-[440px] w-full">
            <div className="flex items-center gap-[22px]">
              <div className="flex h-[66px] w-[60px] flex-col items-center justify-center rounded-[15px] border border-[var(--deck-secondary)]/25">
                <span className="text-[12px] font-semibold text-[var(--deck-accent)]">MON</span><strong className="text-[25px] leading-none">17</strong>
              </div>
              <div>
                <h2 className="text-[28px] font-semibold tracking-[-0.02em]">Weekly Product Sync</h2>
                <p className="mt-[4px] text-[18px] text-[var(--deck-muted)]">Today · 2:00 PM · starts in 30 min</p>
              </div>
            </div>
            <div className="mt-[24px] border-t border-[var(--deck-secondary)]/20">
              <div className="flex justify-between border-b border-[var(--deck-secondary)]/20 py-[16px] text-[19px]"><span>Last week&apos;s notes</span><strong className="text-[var(--deck-warning)]">Unopened</strong></div>
              <div className="flex justify-between border-b border-[var(--deck-secondary)]/20 py-[16px] text-[19px]"><span>Your action items</span><span className="text-[var(--deck-muted)]">0 of 4 marked done</span></div>
              <div className="flex justify-between py-[16px] text-[19px]"><span>What was decided</span><span className="text-[var(--deck-muted)]">Buried in email</span></div>
            </div>
            <div className="mt-[5px] flex items-center gap-[12px] rounded-[18px] bg-[var(--deck-callout)] px-[22px] py-[17px] text-[19px] font-semibold text-[var(--deck-callout-text)]">
              <span className="deck-blink h-[11px] w-[11px] rounded-full bg-[var(--deck-accent)]" />You&apos;re walking in cold.
            </div>
          </GlassCard>
        </div>
      </Reveal>

      <Reveal delay={260} className="absolute bottom-[58px] left-[104px] flex gap-[14px]">
        <StatPill value={<CountUp value={34} suffix="%" />} label="of summaries opened" />
        <StatPill value={<CountUp value={22} suffix="s" />} label="spent reading one" />
        <StatPill value={<CountUp value={6} suffix="%" />} label="of action items done" />
      </Reveal>
    </SlideFrame>
  );
}
