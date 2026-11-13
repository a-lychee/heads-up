import type { ReactNode } from 'react';
import { CountUp } from '../components/CountUp';
import { Headline } from '../components/Headline';
import { Reveal, useSlideEnvironment } from '../components/Reveal';
import { SlideFrame } from '../components/SlideFrame';
import type { SlideMetadata } from '../types';

export const metadata: SlideMetadata = {
  id: 'context',
  title: 'Context and problem',
  section: '01 · Context and Problem',
  notes: 'Ansel is an AI meeting notetaker for enterprises: $240M of ARR, 4.1 million seats, and it leads on note quality and governance. But usage is falling. Seats active in a week fell from 61% to 38% in two years, and net revenue retention from 141% to 103%. Most idle seats, 66%, belong to light users, who have fewer than five meetings a week. Our user is the light user who rarely opens Ansel but still has a weekly recurring meeting: 1.29 million seats, or $75M of addressable ARR.',
};

// Exhibit 3 cohorts (FY25). Idle share is our calculation: share × (1 − weekly active).
const cohorts = [
  { id: 'heavy', name: 'Heavy', meetings: '15+ a week', seats: 14, idle: 4, active: 82 },
  { id: 'moderate', name: 'Moderate', meetings: '5–14 a week', seats: 28, idle: 19, active: 58 },
  { id: 'light', name: 'Light', meetings: 'Under 5 a week', seats: 51, idle: 66, active: 20 },
  { id: 'never', name: 'Never connected', meetings: 'No calendar', seats: 7, idle: 11, active: 0 },
];

const BAR_MAX = 170; // px height of the 66% column

// Light seats narrowed to our user (Heads-Up brief, Opportunity Size; appendix slide 16 shows the math).
const funnel = [
  { value: '2.09M', label: 'light seats' },
  { value: '1.71M', label: 'attend their meetings' },
  { value: '1.29M', label: 'have a weekly recurring meeting' },
];

function Label({ children, accent = false }: { children: ReactNode; accent?: boolean }) {
  return (
    <p className={`text-[20px] font-semibold uppercase tracking-[0.1em] ${accent ? 'text-[var(--deck-accent)]' : 'text-[var(--deck-muted)]'}`}>
      {children}
    </p>
  );
}

// Ansel at a glance (case, company context).
const anselStats = [
  { value: '$240M', label: 'ARR' },
  { value: '4.1M', label: 'seats' },
  { value: '3,900', label: 'customers' },
];

// The problem: two declines, each shown as was (gray) → now (accent). Case, business situation.
const declines = [
  { from: '61%', to: '38%', label: 'Seats active weekly, in 2 years' },
  { from: '141%', to: '103%', label: 'Net revenue retention, in 3 years' },
];

function DownArrow() {
  return (
    <svg width="44" height="56" viewBox="0 0 44 56" aria-hidden="true" className="flex-shrink-0">
      <path d="M22 4 V46 M8 32 L22 48 L36 32" fill="none" stroke="var(--deck-accent)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ContextSlide() {
  const { static: isStatic } = useSlideEnvironment();
  return (
    <SlideFrame
      section={metadata.section}
      className="deck-no-glow"
      source="Kilts Center Ansel case (2026), company context, Ex 3 · idle share is our calculation from Ex 3 · $75M at $58.54 per seat, 48.5% recurring (Flowtrace)"
    >
      <div className="absolute inset-x-[104px] top-[160px]">
        <Reveal>
          <Headline
            style={{ fontSize: 64 }}
            secondary="Ansel is a leading notetaker, but its usage is falling"
          >
            Context and problem
          </Headline>
        </Reveal>
      </div>

      {/* Two rows shared by both columns, so the left labels line up with the right ones. */}
      <div className="absolute inset-x-[104px] top-[360px] bottom-[96px] grid grid-cols-[500px_1fr] grid-rows-[auto_auto] items-start gap-x-[72px] gap-y-[30px]">
        {/* Left, row 1: Ansel in a dark card */}
        <Reveal delay={100}>
          <div className="rounded-[28px] bg-[var(--deck-ink)] px-[30px] pb-[28px] pt-[26px] text-white">
            <p className="text-[20px] font-semibold uppercase tracking-[0.1em] text-white/70">Ansel</p>
            <p className="mt-[12px] text-[25px] leading-[1.35] text-white/95">
              An AI meeting notetaker for enterprises that leads on notetaking quality and governance controls
            </p>
            <div className="mt-[20px] flex gap-[40px] border-t border-white/20 pt-[18px]">
              {anselStats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-[38px] font-extrabold leading-none tracking-[-0.03em]">{stat.value}</p>
                  <p className="mt-[6px] text-[19px] text-white/80">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Right two-thirds: where the idle seats are (as in appendix slide 14), then who we pick, then the kicker */}
        <div>
          <Reveal delay={240}>
            <Label>Share of idle seats, by meetings a week</Label>
          </Reveal>

          {/* Column chart of idle-seat share */}
          <div className="mt-[14px] grid grid-cols-4 items-end gap-[24px]" style={{ height: BAR_MAX + 52 }}>
            {cohorts.map((cohort, index) => {
              const ours = cohort.id === 'light';
              return (
                <Reveal key={cohort.id} delay={300 + index * 90} className="flex h-full flex-col items-center justify-end">
                  <p className={`font-display text-[40px] font-extrabold leading-none tracking-[-0.035em] ${ours ? 'text-[var(--deck-accent)]' : 'text-[var(--deck-secondary)]'}`}>
                    <CountUp value={cohort.idle} suffix="%" />
                  </p>
                  <div
                    className={`mt-[10px] w-[60%] rounded-t-[14px] ${ours ? 'bg-[var(--deck-accent)]' : 'bg-[var(--deck-tone-2)]'}`}
                    style={{ height: (cohort.idle / 66) * BAR_MAX }}
                  />
                </Reveal>
              );
            })}
          </div>
          <div className="grid grid-cols-4 gap-[24px] border-t-2 border-[var(--deck-hairline-strong)] pt-[10px]">
            {cohorts.map((cohort) => {
              const ours = cohort.id === 'light';
              return (
                <p key={cohort.id} className="text-center leading-[1.2]">
                  <span className={`block text-[22px] font-semibold ${ours ? 'text-[var(--deck-accent)]' : ''}`}>{cohort.name}</span>
                  <span className="block text-[18px] text-[var(--deck-muted)]">{cohort.meetings} · {cohort.seats}% of seats</span>
                </p>
              );
            })}
          </div>

        </div>

        {/* Left, row 2: the problem */}
        <Reveal delay={180}>
          <Label>The problem</Label>
          {declines.map((decline) => (
            <div key={decline.label} className="mt-[18px] flex items-center gap-[20px]">
              <DownArrow />
              <div>
                <p className="whitespace-nowrap font-display text-[56px] font-extrabold leading-none tracking-[-0.04em]">
                  <span className="text-[var(--deck-secondary)]">{decline.from}</span>
                  <span className="text-[34px] text-[var(--deck-muted)]"> → </span>
                  <span className="text-[var(--deck-accent)]">{decline.to}</span>
                </p>
                <p className="mt-[6px] text-[22px] text-[var(--deck-muted)]">{decline.label}</p>
              </div>
            </div>
          ))}
        </Reveal>

        <div>
          {/* Who we pick: light users, narrowed to those with a recurring meeting */}
          <Reveal delay={720}>
            <Label accent>Our user: light users who rarely open Ansel, but have a recurring meeting</Label>
            <div className="mt-[12px] grid grid-cols-[1fr_auto_1fr_auto_1.15fr] items-center gap-[14px]">
              {funnel.map((step, index) => {
                const last = index === funnel.length - 1;
                return (
                  <div key={step.label} className="contents">
                    <div
                      className={`rounded-[20px] px-[22px] py-[14px] ${
                        last
                          ? `border-2 border-[var(--deck-accent)] bg-[var(--deck-card)] shadow-[var(--deck-card-shadow)] ${isStatic ? '' : 'deck-spotlight'}`
                          : 'border border-white/80 bg-white/55'
                      }`}
                    >
                      <p className={`font-display text-[40px] font-extrabold leading-none tracking-[-0.035em] ${last ? 'text-[var(--deck-accent)]' : ''}`}>{step.value}</p>
                      <p className="mt-[6px] text-[19px] leading-[1.25] text-[var(--deck-muted)]">{step.label}</p>
                    </div>
                    {!last && <span className="text-[30px] text-[var(--deck-secondary)]" aria-hidden="true">→</span>}
                  </div>
                );
              })}
            </div>
          </Reveal>

          {/* Kicker */}
          <Reveal delay={900} className="mt-[16px]">
            <div className="flex items-center gap-[24px] rounded-[22px] bg-[var(--deck-accent)] px-[28px] py-[14px] text-white">
              <p className="font-display text-[52px] font-extrabold leading-none tracking-[-0.035em]">
                $<CountUp value={75} />M
              </p>
              <p className="text-[24px] font-semibold leading-[1.25]">
                of addressable ARR <span className="font-normal text-white/80">· 1.29M seats × $58.54 per seat</span>
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </SlideFrame>
  );
}
