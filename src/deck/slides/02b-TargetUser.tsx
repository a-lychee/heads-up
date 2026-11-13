import type { ReactNode } from 'react';
import { CountUp } from '../components/CountUp';
import { Headline } from '../components/Headline';
import { Reveal, useSlideEnvironment } from '../components/Reveal';
import { SlideFrame } from '../components/SlideFrame';
import type { SlideMetadata } from '../types';

export const metadata: SlideMetadata = {
  id: 'target-user',
  title: 'Our target user',
  section: '01 · Context and Problem',
  notes: 'Look at who holds the idle seats. Two-thirds of them belong to light users, who have fewer than five meetings a week. Our user is the light user who rarely opens Ansel but still has a weekly recurring meeting. Of 2.09 million light seats, 1.71 million attend their meetings, and 1.29 million have a weekly recurring one. At $58.54 a seat, that is $75M of addressable ARR.',
};

// Exhibit 3 cohorts (FY25). Idle share is our calculation: share × (1 − weekly active).
const cohorts = [
  { id: 'heavy', name: 'Heavy', meetings: '15+ a week', seats: 14, idle: 4 },
  { id: 'moderate', name: 'Moderate', meetings: '5–14 a week', seats: 28, idle: 19 },
  { id: 'light', name: 'Light', meetings: 'Under 5 a week', seats: 51, idle: 66 },
  { id: 'never', name: 'Never connected', meetings: 'No calendar', seats: 7, idle: 11 },
];

const BAR_MAX = 210; // px height of the 66% column

// Light seats narrowed to our user (Heads-Up brief, Opportunity Size; appendix slide 16 shows the math).
// The 1.29M box is where the persona slide's card morph starts (see .deck-morph in index.css).
const funnel = [
  { value: '2.09M', label: 'light seats' },
  { value: '1.71M', label: 'attend their meetings' },
  { value: '1.29M', label: 'have a weekly recurring meeting' },
];

function Label({ children, accent = false }: { children: ReactNode; accent?: boolean }) {
  return (
    <p className={`text-[22px] font-semibold uppercase tracking-[0.1em] ${accent ? 'text-[var(--deck-accent)]' : 'text-[var(--deck-muted)]'}`}>
      {children}
    </p>
  );
}

export default function TargetUserSlide() {
  const { static: isStatic } = useSlideEnvironment();
  return (
    <SlideFrame
      section={metadata.section}
      className="deck-no-glow"
      source="Kilts Center Ansel case (2026), Ex 3 · idle share is our calculation from Ex 3 · $75M at $58.54 per seat, 48.5% recurring (Flowtrace)"
    >
      <div className="absolute inset-x-[104px] top-[160px]">
        <Reveal>
          <Headline style={{ fontSize: 64 }} secondary="Light users hold two-thirds of idle seats">
            Our target user
          </Headline>
        </Reveal>
      </div>

      <div className="absolute inset-x-[104px] top-[360px]">
        {/* Where the idle seats are (as in appendix slide 14) */}
        <Reveal delay={100}>
          <Label>Share of idle seats, by meetings a week</Label>
        </Reveal>
        <div className="mt-[16px] grid grid-cols-4 items-end gap-[32px]" style={{ height: BAR_MAX + 62 }}>
          {cohorts.map((cohort, index) => {
            const ours = cohort.id === 'light';
            return (
              <Reveal key={cohort.id} delay={180 + index * 90} className="flex h-full flex-col items-center justify-end">
                <p className={`font-display text-[48px] font-extrabold leading-none tracking-[-0.035em] ${ours ? 'text-[var(--deck-accent)]' : 'text-[var(--deck-secondary)]'}`}>
                  <CountUp value={cohort.idle} suffix="%" />
                </p>
                <div
                  className={`mt-[12px] w-[56%] rounded-t-[16px] ${ours ? 'bg-[var(--deck-accent)]' : 'bg-[var(--deck-tone-2)]'}`}
                  style={{ height: (cohort.idle / 66) * BAR_MAX }}
                />
              </Reveal>
            );
          })}
        </div>
        <div className="grid grid-cols-4 gap-[32px] border-t-2 border-[var(--deck-hairline-strong)] pt-[12px]">
          {cohorts.map((cohort) => {
            const ours = cohort.id === 'light';
            return (
              <p key={cohort.id} className="text-center leading-[1.2]">
                <span className={`block text-[26px] font-semibold ${ours ? 'text-[var(--deck-accent)]' : ''}`}>{cohort.name}</span>
                <span className="block text-[21px] text-[var(--deck-muted)]">{cohort.meetings} · {cohort.seats}% of seats</span>
              </p>
            );
          })}
        </div>

        {/* Who we pick: light users, narrowed to those with a recurring meeting, equal to the addressable market */}
        <Reveal delay={600} className="mt-[44px]">
          <Label accent>Our user: light users who rarely open Ansel, but have a recurring meeting</Label>
          <div className="mt-[14px] grid grid-cols-[1fr_auto_1fr_auto_1.15fr_auto_1.15fr] items-center gap-[18px]">
            {funnel.map((step, index) => {
              const last = index === funnel.length - 1;
              return (
                <div key={step.label} className="contents">
                  <div
                    className={`rounded-[22px] px-[26px] py-[18px] ${
                      last
                        ? `border-2 border-[var(--deck-accent)] bg-[var(--deck-card)] shadow-[var(--deck-card-shadow)] ${isStatic ? '' : 'deck-spotlight'}`
                        : 'border border-white/80 bg-white/55'
                    }`}
                  >
                    <p className={`font-display text-[48px] font-extrabold leading-none tracking-[-0.035em] ${last ? 'text-[var(--deck-accent)]' : ''}`}>{step.value}</p>
                    <p className="mt-[8px] text-[22px] leading-[1.25] text-[var(--deck-muted)]">{step.label}</p>
                  </div>
                  <span className="text-[36px] text-[var(--deck-secondary)]" aria-hidden="true">{last ? '=' : '→'}</span>
                </div>
              );
            })}
            {/* Kicker */}
            <div className="rounded-[22px] bg-[var(--deck-accent)] px-[26px] py-[18px] text-white">
              <p className="font-display text-[48px] font-extrabold leading-none tracking-[-0.035em]">
                $<CountUp value={75} />M
              </p>
              <p className="mt-[8px] text-[22px] leading-[1.25] text-white/85">addressable ARR, at $58.54 a seat</p>
            </div>
          </div>
        </Reveal>
      </div>
    </SlideFrame>
  );
}
