import { ArrowRight, Bell } from 'lucide-react';
import { Headline } from '../components/Headline';
import { Reveal } from '../components/Reveal';
import { SlideFrame } from '../components/SlideFrame';
import type { SlideMetadata } from '../types';

export const metadata: SlideMetadata = {
  id: 'shift',
  title: 'The behavior change',
  section: '02 · Heads-Up',
  notes: 'Today Ansel is reactive: Ethan has to remember to go to Ansel, and light users do that about 0.4 times a week. We want Ansel to be proactive: it comes to him, thirty minutes before his next recurring meeting. That is Heads-Up, a private Slack brief before every recurring meeting. So let’s see that in action.',
};

/** Simple filled person figure. */
function Person({ color, size = 150 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true" className="flex-shrink-0">
      <circle cx="50" cy="34" r="18" fill={color} />
      <path d="M14 96c0-22 16-36 36-36s36 14 36 36z" fill={color} />
    </svg>
  );
}

function AnselTile({ faded = false }: { faded?: boolean }) {
  return (
    <div
      className="flex h-[150px] w-[150px] flex-shrink-0 items-center justify-center rounded-[36px] bg-[image:var(--deck-app-icon-gradient)] font-display text-[68px] font-extrabold text-white"
      style={{ opacity: faded ? 0.55 : 1 }}
      aria-label="Ansel"
    >
      A
    </div>
  );
}

function Flow({ label, accent }: { label: string; accent: boolean }) {
  const color = accent ? 'var(--deck-accent)' : 'var(--deck-secondary)';
  return (
    <div className="flex flex-shrink-0 flex-col items-center gap-[10px]">
      <span className="text-[24px] font-semibold" style={{ color }}>{label}</span>
      <svg width="230" height="30" viewBox="0 0 230 30" aria-hidden="true">
        <line x1="4" y1="15" x2="212" y2="15" stroke={color} strokeWidth="5" strokeLinecap="round" strokeDasharray={accent ? undefined : '10 10'} />
        <path d="M208 4 L226 15 L208 26" fill="none" stroke={color} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function HalfTitle({ proactive }: { proactive: boolean }) {
  return (
    <>
      <p className={`text-[22px] font-semibold uppercase tracking-[0.1em] ${proactive ? 'text-[var(--deck-accent)]' : 'text-[var(--deck-muted)]'}`}>
        {proactive ? 'With Heads-Up' : 'Today'}
      </p>
      <p className={`mt-[6px] font-display text-[64px] font-extrabold leading-none tracking-[-0.035em] ${proactive ? '' : 'text-[var(--deck-secondary)]'}`}>
        {proactive ? 'Proactive' : 'Reactive'}
      </p>
    </>
  );
}

export default function ShiftSlide() {
  return (
    <SlideFrame section={metadata.section} source="Heads-Up brief v9, Behavior Change · Kilts Center Ansel case (2026), Ex 3, 7">
      <div className="absolute inset-x-[104px] top-[160px]">
        <Reveal>
          <Headline style={{ fontSize: 68 }} secondary={<span className="whitespace-nowrap">From a reactive notetaker to a proactive assistant.</span>}>
            The behavior change we&apos;re driving
          </Headline>
        </Reveal>
      </div>

      <div className="absolute inset-x-[104px] top-[370px] grid grid-cols-[1fr_auto_1fr] gap-[56px]">
        {/* Today: he has to pull */}
        <Reveal delay={120}>
          <HalfTitle proactive={false} />
          <div className="mt-[56px] flex items-center gap-[26px]">
            <Person color="var(--deck-secondary)" />
            <Flow label="has to remember" accent={false} />
            <AnselTile faded />
          </div>
          <p className="mt-[34px] text-[32px] leading-[1.25] text-[var(--deck-muted)]">He has to go to Ansel.</p>
        </Reveal>

        <Reveal delay={300} className="self-center pt-[60px]">
          <div className="flex h-[80px] w-[80px] items-center justify-center rounded-full bg-[var(--deck-ink)] text-white shadow-[var(--deck-card-shadow)]">
            <ArrowRight size={36} strokeWidth={1.8} />
          </div>
        </Reveal>

        {/* With Heads-Up: Ansel pushes to him */}
        <Reveal delay={420}>
          <HalfTitle proactive />
          <div className="mt-[56px] flex items-center gap-[26px]">
            <AnselTile />
            <Flow label="30 min before" accent />
            <div className="relative flex-shrink-0">
              <div className="flex h-[150px] w-[150px] items-center justify-center rounded-full bg-[var(--deck-accent-wash)]">
                <Person color="var(--deck-ink)" size={120} />
              </div>
              <span className="absolute -right-[14px] -top-[14px] flex h-[58px] w-[58px] items-center justify-center rounded-full bg-[var(--deck-accent)] text-white shadow-[var(--deck-card-shadow)]">
                <Bell size={28} />
              </span>
            </div>
          </div>
          <p className="mt-[34px] text-[32px] font-semibold leading-[1.25]">Ansel comes to him.</p>
        </Reveal>
      </div>

      <Reveal delay={700} className="absolute bottom-[56px] left-[104px]">
        <p className="text-[26px] text-[var(--deck-muted)]">
          <span className="font-semibold text-[var(--deck-accent)]">Heads-Up</span> · a private Slack brief before every recurring meeting
        </p>
        <p className="mt-[14px] flex items-center gap-[14px] font-display text-[40px] font-extrabold tracking-[-0.03em] text-[var(--deck-accent)]">
          So let&apos;s see that in action <ArrowRight size={36} strokeWidth={2.2} />
        </p>
      </Reveal>
    </SlideFrame>
  );
}
