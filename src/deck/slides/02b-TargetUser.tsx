import type { CSSProperties, ReactNode } from 'react';
import { ArrowDown } from 'lucide-react';
import { CountUp } from '../components/CountUp';
import { Headline } from '../components/Headline';
import { Reveal, useSlideEnvironment } from '../components/Reveal';
import { SlideFrame } from '../components/SlideFrame';
import type { SlideMetadata } from '../types';

// Three steps of one picture. Step 0: share of all seats by cohort, bars rising from 0.
// Step 1: the same bars morph into share of idle seats. Step 2: our user group's cards appear one by one on the right.
// The steps are separate slides with no crossfade, so the click only animates the change.

const section = '01 · Context and Problem';
const source = 'Kilts Center Ansel case (2026), Ex 3 · idle share is our calculation from Ex 3 · $75M at $58.54 per seat, 48.5% recurring (Flowtrace)';

export const metadata: SlideMetadata = {
  id: 'target-user',
  title: 'Our target user segment · all seats',
  section,
  notes: 'Start with who holds Ansel’s 4.1 million seats. Split by how many meetings people have a week, light users, with fewer than five, are the biggest group: 51% of all seats.',
};

export const idleMetadata: SlideMetadata = {
  id: 'target-user-idle',
  title: 'Our target user segment · idle seats',
  section,
  transition: 'none',
  notes: 'Now look only at the idle seats. Light users go from half of all seats to two-thirds of the idle ones.',
};

export const oursMetadata: SlideMetadata = {
  id: 'target-user-ours',
  title: 'Our target user segment · our user',
  section,
  transition: 'none',
  notes: 'Our user is the light user who rarely opens Ansel but still has a weekly recurring meeting. Of 2.09 million light seats, 1.71 million attend their meetings, and 1.29 million have a weekly recurring one. At $58.54 a seat, that is $75M of addressable ARR.',
};

type Step = 0 | 1 | 2;

// Exhibit 3 cohorts (FY25). Idle share is our calculation: share of seats × (1 − weekly active rate).
const cohorts = [
  { id: 'heavy', name: 'Heavy', meetings: '15+ meetings a week', seats: 14, idle: 4 },
  { id: 'moderate', name: 'Moderate', meetings: '5–14 meetings a week', seats: 28, idle: 19 },
  { id: 'light', name: 'Light', meetings: 'Under 5 meetings a week', seats: 51, idle: 66 },
  { id: 'never', name: 'Never connected', meetings: 'No calendar connected', seats: 7, idle: 11 },
];

// One scale for both steps (66% is the tallest bar), so the change in height is honest.
const BAR_MAX = 400; // bottom of the chart lines up with the kicker on the right
const SCALE_MAX = 66;
const barHeight = (share: number) => (share / SCALE_MAX) * BAR_MAX;

// Light seats narrowed to our user (Heads-Up brief, Opportunity Size; appendix shows the math).
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

/** Reveal on the first step only, so the click doesn't replay the entrance. */
function Enter({ step, delay, className, children }: { step: Step; delay: number; className?: string; children: ReactNode }) {
  return step === 0 ? <Reveal delay={delay} className={className}>{children}</Reveal> : <div className={className}>{children}</div>;
}

function ChartTitle({ step }: { step: Step }) {
  const { static: isStatic } = useSlideEnvironment();
  const all = 'Share of all seats, by meetings a week';
  const idle = 'Share of idle seats, by meetings a week';
  if (step === 1 && !isStatic) {
    return (
      <span className="inline-grid">
        <span className="deck-swap-out col-start-1 row-start-1"><Label>{all}</Label></span>
        <span className="deck-swap-in col-start-1 row-start-1" style={{ animationDelay: '120ms' }}><Label>{idle}</Label></span>
      </span>
    );
  }
  return <Label>{step === 0 ? all : idle}</Label>;
}

function TargetUserStep({ step }: { step: Step }) {
  const { static: isStatic } = useSlideEnvironment();
  return (
    <SlideFrame section={section} className="deck-no-glow" source={source}>
      <div className="absolute inset-x-[104px] top-[160px]">
        <Enter step={step} delay={0}>
          <Headline style={{ fontSize: 64 }} secondary="Light users hold two-thirds of idle seats">
            Our target user segment
          </Headline>
        </Enter>
      </div>

      <div className="absolute inset-x-[104px] bottom-[96px] top-[360px] grid grid-cols-[1fr_520px] gap-[80px]">
        {/* Left two-thirds: one chart. Step 0 shows all seats; step 1 morphs the same bars to idle seats. */}
        <div className="flex flex-col">
          <Enter step={step} delay={100}>
            <ChartTitle step={step} />
          </Enter>
          <div className="mt-[20px] grid grid-cols-4 items-end gap-[32px]" style={{ height: BAR_MAX + 66 }}>
            {cohorts.map((cohort, index) => {
              const ours = cohort.id === 'light';
              const share = step === 0 ? cohort.seats : cohort.idle;
              // Step 2 holds the idle values still; only steps 0 and 1 animate the bars.
              const animate = !isStatic && step < 2;
              const from = step === 0 ? 0 : step === 1 ? cohort.seats : cohort.idle;
              const delay = step === 0 ? 300 + index * 120 : 200 + index * 80;
              const barStyle: CSSProperties & Record<'--bar-from', string> = {
                height: barHeight(share),
                '--bar-from': `${barHeight(from)}px`,
                animationDelay: `${delay}ms`,
              };
              return (
                <div key={cohort.id} className="flex h-full flex-col items-center justify-end">
                  <p className={`font-display text-[52px] font-extrabold leading-none tracking-[-0.035em] ${ours ? 'text-[var(--deck-accent)]' : 'text-[var(--deck-secondary)]'}`}>
                    <CountUp value={share} from={animate ? from : share} suffix="%" />
                  </p>
                  <div
                    className={`mt-[14px] w-[58%] rounded-t-[18px] ${ours ? 'bg-[var(--deck-accent)]' : 'bg-[var(--deck-tone-2)]'} ${animate ? 'deck-bar' : ''}`}
                    style={barStyle}
                  />
                </div>
              );
            })}
          </div>
          <div className="grid grid-cols-4 gap-[32px] border-t-2 border-[var(--deck-hairline-strong)] pt-[14px]">
            {cohorts.map((cohort) => {
              const ours = cohort.id === 'light';
              return (
                <p key={cohort.id} className="text-center leading-[1.25]">
                  <span className={`block text-[26px] font-semibold ${ours ? 'text-[var(--deck-accent)]' : ''}`}>{cohort.name}</span>
                  <span className="block text-[21px] text-[var(--deck-muted)]">{cohort.meetings}</span>
                </p>
              );
            })}
          </div>
        </div>

        {/* Right third: our user group, narrowed to the addressable market. Only on the last step, one card at a time.
            Every card is a single row (number, then its label) and every gap between cards is the same 44px connector. */}
        {step === 2 && (
          <div>
            <Reveal delay={100}>
              <Label accent>Our user</Label>
              <p className="mt-[8px] text-[26px] font-semibold leading-[1.3]">Light users who rarely open Ansel, but have a recurring meeting</p>
            </Reveal>
            <div className="mt-[24px] flex flex-col">
              {funnel.map((item, index) => {
                const last = index === funnel.length - 1;
                return (
                  <div key={item.label}>
                    <Reveal delay={400 + index * 350}>
                      <div
                        className={`flex items-baseline gap-[16px] rounded-[20px] px-[24px] py-[18px] ${
                          last
                            ? `border-2 border-[var(--deck-accent)] bg-[var(--deck-card)] shadow-[var(--deck-card-shadow)] ${isStatic ? '' : 'deck-spotlight'}`
                            : 'border border-white/80 bg-white/55'
                        }`}
                        style={last ? { animationDelay: '2300ms' } : undefined}
                      >
                        <p className={`font-display text-[42px] font-extrabold leading-none tracking-[-0.035em] ${last ? 'text-[var(--deck-accent)]' : ''}`}>{item.value}</p>
                        <p className="text-[21px] leading-[1.25] text-[var(--deck-muted)]">{item.label}</p>
                      </div>
                    </Reveal>
                    <Reveal delay={550 + index * 350}>
                      <div className="flex h-[44px] items-center justify-center text-[var(--deck-secondary)]" aria-hidden="true">
                        {last ? <span className="text-[34px] font-semibold leading-none">=</span> : <ArrowDown size={26} strokeWidth={2.2} />}
                      </div>
                    </Reveal>
                  </div>
                );
              })}
              {/* Kicker */}
              <Reveal delay={400 + funnel.length * 350}>
                <div className="flex items-baseline gap-[16px] rounded-[20px] bg-[var(--deck-accent)] px-[24px] py-[18px] text-white">
                  <p className="font-display text-[42px] font-extrabold leading-none tracking-[-0.035em]">
                    $<CountUp value={75} />M
                  </p>
                  <p className="text-[21px] leading-[1.25] text-white/85">addressable ARR at $58.54 a seat</p>
                </div>
              </Reveal>
            </div>
          </div>
        )}
      </div>
    </SlideFrame>
  );
}

export default function TargetUserSlide() {
  return <TargetUserStep step={0} />;
}

export function TargetUserIdleSlide() {
  return <TargetUserStep step={1} />;
}

export function TargetUserOursSlide() {
  return <TargetUserStep step={2} />;
}
