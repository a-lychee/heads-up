import { ArrowRight, Bell, Mail, Play } from 'lucide-react';
import type { ReactNode } from 'react';
import { Headline } from '../components/Headline';
import { Reveal } from '../components/Reveal';
import { SlideFrame } from '../components/SlideFrame';
import type { SlideMetadata } from '../types';

export const metadata: SlideMetadata = {
  id: 'shift',
  title: 'From reactive to proactive',
  section: '02 · Heads-Up',
  notes: 'Today Ansel is a notetaker. It reacts after the meeting: the summary lands in Ethan’s inbox and is buried by next week. Heads-Up makes it a companion. It acts before the meeting: thirty minutes ahead, a Slack card shows what he owns, what is still open, and what was decided. So let’s see that in action.',
};

const cardRows = [
  { label: 'YOU OWN', text: 'Forecast update (may already be done)', time: '14:32' },
  { label: 'STILL OPEN', text: 'Launch date: Mar 3 or Mar 10?', time: '27:05' },
  { label: 'DECIDED', text: 'Pricing page ships with v2', time: '41:18' },
];

function HalfTitle({ eyebrow, title, accent = false }: { eyebrow: string; title: string; accent?: boolean }) {
  return (
    <div>
      <p className={`text-[20px] font-semibold uppercase tracking-[0.1em] ${accent ? 'text-[var(--deck-accent)]' : 'text-[var(--deck-muted)]'}`}>{eyebrow}</p>
      <p className={`mt-[6px] font-display text-[44px] font-extrabold leading-none tracking-[-0.035em] ${accent ? '' : 'text-[var(--deck-secondary)]'}`}>{title}</p>
    </div>
  );
}

function Caption({ children }: { children: ReactNode }) {
  return <p className="mt-[22px] text-[26px] leading-[1.3] text-[var(--deck-muted)]">{children}</p>;
}

/** Today: an inbox where Ansel's summary sits under newer mail. Skeleton rows keep words to a minimum. */
function BuriedInbox() {
  return (
    <div className="rounded-[28px] border border-white/70 bg-white/45 p-[26px]">
      <div className="flex items-center gap-[10px] text-[18px] font-semibold text-[var(--deck-muted)]"><Mail size={20} />Inbox</div>
      <div className="mt-[16px] space-y-[10px]">
        {[0.9, 0.75, 0.82].map((width, index) => (
          <div key={index} className="flex items-center gap-[14px] rounded-[14px] bg-white/55 px-[16px] py-[14px]">
            <span className="h-[34px] w-[34px] flex-shrink-0 rounded-full bg-[var(--deck-tone-2)]" />
            <div className="flex-1 space-y-[8px]">
              <span className="block h-[10px] rounded-full bg-[var(--deck-tone-2)]" style={{ width: `${width * 60}%` }} />
              <span className="block h-[8px] rounded-full bg-[var(--deck-tone-3)]" style={{ width: `${width * 90}%` }} />
            </div>
          </div>
        ))}
        <div className="flex items-center gap-[14px] rounded-[14px] border border-dashed border-[var(--deck-hairline-strong)] px-[16px] py-[12px] opacity-70">
          <span className="flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center rounded-[10px] bg-[image:var(--deck-app-icon-gradient)] text-[16px] font-semibold text-white">A</span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[19px] font-semibold">Ansel · Meeting summary</p>
            <p className="text-[16px] text-[var(--deck-muted)]">7 days ago</p>
          </div>
          <span className="rounded-full bg-[var(--deck-tone-3)] px-[12px] py-[4px] text-[15px] font-semibold text-[var(--deck-muted)]">Unopened</span>
        </div>
      </div>
    </div>
  );
}

/** Heads-Up: the Slack card that arrives 30 minutes before the next meeting. */
function HeadsUpCard() {
  return (
    <div className="relative">
      <div className="absolute -top-[18px] right-[24px] z-10 flex items-center gap-[8px] rounded-full bg-[var(--deck-accent)] px-[16px] py-[7px] text-[17px] font-semibold text-white shadow-[var(--deck-card-shadow)]">
        <Bell size={17} />30 min before
      </div>
      <div className="rounded-[28px] border border-white/70 bg-[var(--deck-card)] px-[30px] py-[24px] shadow-[var(--deck-card-shadow)]">
        <div className="flex items-center gap-[12px]">
          <span className="flex h-[40px] w-[40px] items-center justify-center rounded-[12px] bg-[image:var(--deck-app-icon-gradient)] text-[18px] font-semibold text-white">A</span>
          <p className="text-[19px] font-semibold">Ansel <span className="ml-[6px] text-[16px] font-normal text-[var(--deck-muted)]">1:30 PM</span></p>
        </div>
        <p className="mt-[14px] font-display text-[28px] font-extrabold tracking-[-0.03em]">Weekly Product Sync · 2:00 PM</p>
        <div className="mt-[8px]">
          {cardRows.map((row) => (
            <div key={row.label} className="border-t border-[var(--deck-hairline)] py-[11px]">
              <p className="text-[14px] font-semibold tracking-[0.1em] text-[var(--deck-accent)]">{row.label}</p>
              <div className="mt-[3px] flex items-center justify-between gap-[14px]">
                <p className="text-[20px] leading-[1.25]">{row.text}</p>
                <span className="flex flex-shrink-0 items-center gap-[5px] text-[16px] tabular-nums text-[var(--deck-muted)]"><Play size={11} fill="currentColor" />{row.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ShiftSlide() {
  return (
    <SlideFrame section={metadata.section} source="Cards are illustrative">
      <div className="absolute inset-x-[104px] top-[160px]">
        <Reveal>
          <Headline style={{ fontSize: 68 }} secondary={<span className="whitespace-nowrap">From a reactive tool to a proactive assistant.</span>}>
            From notetaker to meeting companion
          </Headline>
        </Reveal>
      </div>

      <div className="absolute inset-x-[104px] top-[360px] grid grid-cols-[1fr_auto_1fr] items-start gap-[40px]">
        <Reveal delay={120}>
          <HalfTitle eyebrow="Ansel today" title="Reactive notetaker" />
          <div className="mt-[24px]"><BuriedInbox /></div>
          <Caption>Notes arrive after the meeting, then get buried.</Caption>
        </Reveal>

        <Reveal delay={320} className="self-center">
          <div className="flex h-[88px] w-[88px] items-center justify-center rounded-full bg-[var(--deck-ink)] text-white shadow-[var(--deck-card-shadow)]">
            <ArrowRight size={40} strokeWidth={1.8} />
          </div>
        </Reveal>

        <Reveal delay={420}>
          <HalfTitle eyebrow="With Heads-Up" title="Proactive assistant" accent />
          <div className="mt-[24px]"><HeadsUpCard /></div>
          <Caption>A brief arrives right before the next one.</Caption>
        </Reveal>
      </div>

      <Reveal delay={700} className="absolute bottom-[64px] left-[104px]">
        <p className="flex items-center gap-[14px] font-display text-[40px] font-extrabold tracking-[-0.03em] text-[var(--deck-accent)]">
          So let&apos;s see that in action <ArrowRight size={36} strokeWidth={2.2} />
        </p>
      </Reveal>
    </SlideFrame>
  );
}
