import type { ReactNode } from 'react';
import { CountUp } from '../components/CountUp';
import { Headline } from '../components/Headline';
import { Reveal } from '../components/Reveal';
import { SlideFrame } from '../components/SlideFrame';
import type { SlideMetadata } from '../types';

export const metadata: SlideMetadata = {
  id: 'context',
  title: 'Context and problem',
  section: '01 · Context',
  notes: 'Ansel makes the best meeting notes in its category, but usage is falling: only 38% of seats are active in a week, down from 61%, and 44% of renewals cut seats. Look at who holds those seats. Light users are half of all seats and two-thirds of the idle ones, and only one in five is active in a week. The ones who still attend a recurring meeting are 1.29 million seats and $75M of ARR. That is who we are building for.',
};

// Exhibit 3 cohorts (FY25). Idle share is our calculation: share × (1 − weekly active).
const cohorts = [
  { id: 'heavy', name: 'Heavy', meetings: '15+ a week', seats: 14, idle: 4, active: 82 },
  { id: 'moderate', name: 'Moderate', meetings: '5–14 a week', seats: 28, idle: 19, active: 58 },
  { id: 'light', name: 'Light', meetings: 'Under 5 a week', seats: 51, idle: 66, active: 20 },
  { id: 'never', name: 'Never connected', meetings: 'No calendar', seats: 7, idle: 11, active: 0 },
];

function Label({ children, accent = false }: { children: ReactNode; accent?: boolean }) {
  return (
    <p className={`text-[20px] font-semibold uppercase tracking-[0.1em] ${accent ? 'text-[var(--deck-accent)]' : 'text-[var(--deck-muted)]'}`}>
      {children}
    </p>
  );
}

function Stat({ value, label }: { value: ReactNode; label: string }) {
  return (
    <div className="flex items-baseline gap-[16px]">
      <span className="w-[120px] flex-shrink-0 font-display text-[48px] font-extrabold leading-none tracking-[-0.035em]">{value}</span>
      <span className="text-[24px] leading-[1.3] text-[var(--deck-muted)]">{label}</span>
    </div>
  );
}

export default function ContextSlide() {
  return (
    <SlideFrame
      section={metadata.section}
      source="Kilts Center Ansel case (2026), company context, Ex 3 · idle share is our calculation from Ex 3 · $75M at $58.54 per seat, 48.5% recurring (Flowtrace)"
    >
      <div className="absolute inset-x-[104px] top-[160px]">
        <Reveal>
          <Headline
            style={{ fontSize: 68 }}
            secondary={<span className="whitespace-nowrap">Ansel&apos;s notes lead, but its seats sit idle.</span>}
          >
            Context and our problem to solve
          </Headline>
        </Reveal>
      </div>

      <div className="absolute inset-x-[104px] top-[370px] bottom-[96px] grid grid-cols-[500px_1fr] gap-[72px]">
        {/* Left third: what Ansel is, and the problem. Spread to match the right column's height. */}
        <div className="flex flex-col justify-between">
          <Reveal delay={100}>
            <Label>Ansel</Label>
            <p className="mt-[12px] text-[30px] font-semibold leading-[1.25]">The quality leader in AI meeting notes for enterprises</p>
            <p className="mt-[14px] text-[24px] text-[var(--deck-muted)]">$240M ARR · 4.1M seats</p>
          </Reveal>
          <Reveal delay={180} className="border-t border-[var(--deck-hairline-strong)] pt-[36px]">
            <Label>The problem</Label>
            <p className="mt-[12px] text-[30px] font-semibold leading-[1.25]">Usage is falling, and customers are cutting seats</p>
            <div className="mt-[30px] space-y-[28px]">
              <Stat value={<CountUp value={38} suffix="%" />} label="active weekly, down from 61%" />
              <Stat value={<CountUp value={44} suffix="%" />} label="of renewals cut seats" />
            </div>
          </Reveal>
        </div>

        {/* Right two-thirds: every cohort, ours highlighted, and why */}
        <div className="flex flex-col">
          <Reveal delay={240}>
            <Label>Who uses Ansel · share of 4.1M seats</Label>
          </Reveal>
          <div className="mt-[16px] grid grid-cols-[1fr_1fr_1.5fr_1fr] items-end gap-[18px]">
            {cohorts.map((cohort, index) => {
              const ours = cohort.id === 'light';
              return (
                <Reveal key={cohort.id} delay={300 + index * 90}>
                  <div
                    className={`flex flex-col rounded-[28px] px-[26px] ${
                      ours
                        ? 'h-[420px] border-2 border-[var(--deck-accent)] bg-[var(--deck-card)] py-[26px] shadow-[var(--deck-card-shadow)]'
                        : 'h-[380px] border border-white/80 bg-white/45 py-[24px]'
                    }`}
                  >
                    {ours && <span className="mb-[10px] self-start rounded-full bg-[var(--deck-accent)] px-[14px] py-[5px] text-[16px] font-semibold uppercase tracking-[0.08em] text-white">Our user</span>}
                    <p className={`font-display font-extrabold leading-[1.05] tracking-[-0.03em] ${ours ? 'text-[34px]' : 'text-[26px]'}`}>{cohort.name}</p>
                    <p className="mt-[4px] text-[20px] text-[var(--deck-muted)]">{cohort.meetings}</p>
                    <p className={`mt-auto font-display font-extrabold leading-none tracking-[-0.035em] ${ours ? 'text-[80px] text-[var(--deck-accent)]' : 'text-[56px] text-[var(--deck-secondary)]'}`}>
                      <CountUp value={cohort.seats} suffix="%" />
                    </p>
                    <p className="mt-[4px] text-[20px] text-[var(--deck-muted)]">of seats</p>
                    <div className={`mt-[16px] space-y-[6px] border-t pt-[14px] text-[20px] leading-[1.3] ${ours ? 'border-[var(--deck-hairline-strong)] font-semibold' : 'border-[var(--deck-hairline)] text-[var(--deck-muted)]'}`}>
                      <p>{cohort.idle}% of idle seats</p>
                      <p>{cohort.active}% active weekly</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={720} className="mt-auto">
            <div className="flex items-center gap-[32px] rounded-[24px] bg-[var(--deck-callout)] px-[30px] py-[20px]">
              <p className="font-display text-[44px] font-extrabold leading-none tracking-[-0.035em] text-[var(--deck-accent)]">
                $<CountUp value={75} />M
              </p>
              <p className="text-[24px] leading-[1.3]">
                <span className="font-semibold">1.29M light seats with a recurring meeting.</span>{' '}
                <span className="text-[var(--deck-muted)]">They still attend, but open only a third of their summaries.</span>
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </SlideFrame>
  );
}
