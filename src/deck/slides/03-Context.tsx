import { useEffect, useState, type ReactNode } from 'react';
import { CountUp } from '../components/CountUp';
import { Headline } from '../components/Headline';
import { Reveal, useSlideEnvironment } from '../components/Reveal';
import { SlideFrame } from '../components/SlideFrame';
import type { SlideMetadata } from '../types';

export const metadata: SlideMetadata = {
  id: 'context',
  title: 'Context and problem',
  section: '01 · Context',
  notes: 'Ansel makes the best meeting notes in its category, but usage is falling: weekly active seats went from 61% to 38%, and 44% of renewals cut seats for low usage. Look at who holds those seats. Light users are half of all seats but two-thirds of the idle ones. The light users who still attend a recurring meeting are 1.29 million seats and $75M of ARR. That is who we are building for.',
};

// Exhibit 3 cohorts, in bar order. Idle share is our calculation from Ex 3 (share × (1 − weekly active)).
const cohorts = [
  { id: 'heavy', name: 'Heavy', detail: '15+ meetings a week', seats: 14, idle: 4, fill: 'var(--deck-tone-1)' },
  { id: 'moderate', name: 'Moderate', detail: '5–14', seats: 28, idle: 19, fill: 'var(--deck-tone-2)' },
  { id: 'light', name: 'Light', detail: 'under 5', seats: 51, idle: 66, fill: 'var(--deck-accent)' },
  { id: 'never', name: 'Never connected', detail: '', seats: 7, idle: 11, fill: 'var(--deck-tone-3)' },
] as const;

const problemFacts = [
  'Weekly active seats: 61% → 38% in two years',
  'Net revenue retention: 141% → 103%',
  '44% of FY25 renewals cut seats, most often for low usage',
];

const reasons = [
  'Half of all seats, two-thirds of idle ones',
  'Only 20% active in a week, vs. 82% of heavy users',
  'They still attend, but open only a third of their summaries',
];

function Label({ children, accent = false }: { children: ReactNode; accent?: boolean }) {
  return (
    <p className={`text-[14px] font-semibold uppercase tracking-[0.12em] ${accent ? 'text-[var(--deck-accent)]' : 'text-[var(--deck-muted)]'}`}>
      {children}
    </p>
  );
}

/** A 100% stacked bar that wipes in from the left when the slide appears. */
function CohortBar({ field, delay }: { field: 'seats' | 'idle'; delay: number }) {
  const { static: isStatic } = useSlideEnvironment();
  const [shown, setShown] = useState(isStatic);

  useEffect(() => {
    if (isStatic) return;
    const timeout = window.setTimeout(() => setShown(true), delay);
    return () => window.clearTimeout(timeout);
  }, [delay, isStatic]);

  return (
    <div
      className="flex h-[60px] overflow-hidden rounded-[16px]"
      style={{
        clipPath: shown ? 'inset(0 0 0 0 round 16px)' : 'inset(0 100% 0 0 round 16px)',
        transition: 'clip-path 1s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {cohorts.map((cohort) => {
        const share = cohort[field];
        const light = cohort.id === 'light';
        return (
          <div
            key={cohort.id}
            className={`flex items-center justify-center border-r-2 border-[var(--deck-card)] last:border-r-0 ${light ? 'text-white' : 'text-[var(--deck-ink)]'}`}
            style={{ width: `${share}%`, background: cohort.fill }}
          >
            <span className={`font-display font-extrabold tracking-[-0.03em] ${light ? 'text-[28px]' : 'text-[20px]'}`}>
              {light ? <>Light users · <CountUp value={share} suffix="%" /></> : `${share}%`}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// Left edges of the light segment on each bar, in % of bar width.
const lightStartSeats = cohorts[0].seats + cohorts[1].seats; // 42
const lightEndSeats = lightStartSeats + cohorts[2].seats; // 93
const lightStartIdle = cohorts[0].idle + cohorts[1].idle; // 23
const lightEndIdle = lightStartIdle + cohorts[2].idle; // 89

export default function ContextSlide() {
  return (
    <SlideFrame
      section={metadata.section}
      source="Kilts Center Ansel case (2026), company context, Ex 3, 5 · idle share is our calculation from Ex 3 · $75M at $58.54 per seat, 48.5% recurring (Flowtrace)"
    >
      <div className="absolute inset-x-[104px] top-[170px]">
        <Reveal>
          <Headline style={{ fontSize: 72 }} secondary="Ansel’s notes lead the category, but its seats are going idle.">
            Context and our problem to solve
          </Headline>
        </Reveal>
      </div>

      <div className="absolute inset-x-[104px] top-[440px] bottom-[96px] grid grid-cols-[500px_1fr] gap-[80px]">
        {/* Left third: what Ansel is, and the problem */}
        <div className="flex flex-col">
          <Reveal delay={100}>
            <Label>Ansel</Label>
            <p className="mt-[14px] text-[24px] leading-[1.4]">
              AI meeting assistant for enterprises. It records, transcribes and summarizes meetings, and leads its category on quality.
            </p>
            <p className="mt-[14px] text-[18px] text-[var(--deck-muted)]">$240M ARR · 4.1M seats · 3,900 customers</p>
          </Reveal>
          <Reveal delay={180} className="mt-[30px] border-t border-[var(--deck-hairline)] pt-[30px]">
            <Label>The problem</Label>
            <p className="mt-[14px] text-[24px] font-semibold leading-[1.35]">Usage is falling, and customers are cutting seats.</p>
            <ul className="mt-[16px] space-y-[10px]">
              {problemFacts.map((fact) => (
                <li key={fact} className="flex gap-[12px] text-[19px] leading-[1.35] text-[var(--deck-muted)]">
                  <span className="mt-[9px] h-[6px] w-[6px] flex-shrink-0 rounded-full bg-[var(--deck-accent)]" />
                  {fact}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Right two-thirds: the user base, our user, and why */}
        <div className="flex flex-col">
          <Reveal delay={260} className="flex items-center justify-between">
            <Label>Who uses Ansel · by meetings a week</Label>
            <div className="flex items-center gap-[18px] text-[15px] text-[var(--deck-muted)]">
              {cohorts.map((cohort) => (
                <span key={cohort.id} className="flex items-center gap-[7px]">
                  <span className="h-[11px] w-[11px] rounded-[3px]" style={{ background: cohort.fill }} />
                  {cohort.name}{cohort.detail && ` (${cohort.detail})`}
                </span>
              ))}
            </div>
          </Reveal>

          <div className="mt-[18px]">
            <p className="mb-[8px] text-[17px] font-medium">All 4.1M seats</p>
            <CohortBar field="seats" delay={340} />
            <Reveal delay={700}>
              <svg className="block h-[40px] w-full" viewBox="0 0 100 1" preserveAspectRatio="none" aria-hidden="true">
                <polygon
                  points={`${lightStartSeats},0 ${lightEndSeats},0 ${lightEndIdle},1 ${lightStartIdle},1`}
                  fill="var(--deck-accent-wash)"
                />
              </svg>
            </Reveal>
            <CohortBar field="idle" delay={520} />
            <p className="mt-[8px] text-[17px] font-medium">Idle seats (not active in a typical week)</p>
          </div>

          <Reveal delay={820} className="mt-auto">
            <div className="grid grid-cols-[400px_1fr] gap-[36px] rounded-[28px] border-2 border-[var(--deck-accent)] bg-[var(--deck-card)] px-[34px] py-[26px] shadow-[var(--deck-card-shadow)]">
              <div>
                <Label accent>Our user</Label>
                <p className="mt-[10px] text-[19px] leading-[1.35] text-[var(--deck-muted)]">Light users who still attend at least one recurring meeting a week</p>
                <p className="mt-[12px] font-display text-[44px] font-extrabold leading-none tracking-[-0.035em] text-[var(--deck-accent)]">
                  $<CountUp value={75} />M <span className="text-[24px] text-[var(--deck-ink)]">ARR · <CountUp value={1.29} decimals={2} />M seats</span>
                </p>
              </div>
              <div className="border-l border-[var(--deck-hairline)] pl-[36px]">
                <Label>Why them</Label>
                <ul className="mt-[10px] space-y-[8px]">
                  {reasons.map((reason) => (
                    <li key={reason} className="flex gap-[12px] text-[19px] leading-[1.3]">
                      <span className="mt-[8px] h-[6px] w-[6px] flex-shrink-0 rounded-full bg-[var(--deck-accent)]" />
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </SlideFrame>
  );
}
