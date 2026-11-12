import { Play } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { Headline } from '../components/Headline';
import { Reveal } from '../components/Reveal';
import { SlideFrame } from '../components/SlideFrame';
import type { SlideMetadata } from '../types';

export const metadata: SlideMetadata = {
  id: 'title',
  title: 'Heads-Up',
  section: 'Kilts Product Competition 2026',
  notes: 'Open with the simple promise: Ansel’s record, returned before the next recurring meeting. This is a private, timely Slack card—not another summary to find.',
};

const recordRows = [
  { label: 'YOU OWN', text: 'Forecast update (may already be done)', time: '14:32' },
  { label: 'STILL OPEN', text: 'Launch date: Mar 3 or Mar 10?', time: '27:05' },
  { label: 'DECIDED', text: 'Pricing page ships with v2', time: '41:18' },
];

export default function TitleSlide() {
  return (
    <SlideFrame section={metadata.section}>
      <div className="absolute inset-x-[104px] top-[190px] bottom-[70px] flex items-center gap-[70px]">
        <div className="w-[930px] flex-shrink-0">
          <Reveal>
            <Headline style={{ fontSize: 142 }} secondary={<span className="mt-[22px] text-[58px] leading-[1.04]">Ansel&apos;s record,<br />back when it matters.</span>}>
              Heads-Up
            </Headline>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-[42px] max-w-[790px] text-[28px] leading-[1.42] text-[var(--deck-muted)]">
              A Slack card before every recurring meeting: what you own, what&apos;s still open, what was decided.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-[70px] text-[20px] text-[var(--deck-muted)]">Team [Team name] · Chicago Booth · November 13, 2026</p>
          </Reveal>
        </div>

        <Reveal delay={180} className="w-[650px] flex-shrink-0">
          <GlassCard className="h-[720px]">
            <div className="flex items-center gap-[16px]">
              <div className="flex h-[52px] w-[52px] items-center justify-center rounded-[15px] bg-[var(--deck-ink)] text-[24px] font-semibold text-white">H</div>
              <div>
                <p className="text-[20px] font-semibold">Ansel <span className="ml-[5px] rounded-[5px] bg-[var(--deck-muted)] px-[6px] py-[2px] text-[12px] text-white">APP</span> <span className="ml-[8px] font-normal text-[var(--deck-muted)]">1:30 PM</span></p>
                <p className="mt-[3px] text-[16px] text-[var(--deck-muted)]">Your Heads-Up is ready</p>
              </div>
            </div>
            <h2 className="mt-[34px] font-['Bricolage_Grotesque'] text-[32px] font-extrabold tracking-[-0.03em]">Weekly Product Sync · 2:00 PM</h2>
            <div className="mt-[25px] space-y-[22px]">
              {recordRows.map((row) => (
                <div key={row.label} className="border-t border-[var(--deck-secondary)]/20 pt-[18px]">
                  <p className="text-[13px] font-semibold tracking-[0.13em] text-[var(--deck-accent)]">{row.label}</p>
                  <div className="mt-[8px] flex items-center justify-between gap-[16px]">
                    <p className="text-[21px] leading-[1.25]">{row.text}</p>
                    <span className="flex flex-shrink-0 items-center gap-[6px] text-[16px] text-[var(--deck-muted)]"><Play size={12} fill="currentColor" />{row.time}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-[30px] flex flex-wrap gap-[10px]">
              <button className="rounded-[10px] bg-[var(--deck-ink)] px-[17px] py-[11px] text-[16px] font-medium text-white">Open last meeting</button>
              <button className="rounded-[10px] border border-[var(--deck-secondary)]/30 px-[17px] py-[11px] text-[16px]">Mute series</button>
              <button className="rounded-[10px] border border-[var(--deck-secondary)]/30 px-[17px] py-[11px] text-[16px]">Not useful</button>
            </div>
          </GlassCard>
        </Reveal>
      </div>
    </SlideFrame>
  );
}
