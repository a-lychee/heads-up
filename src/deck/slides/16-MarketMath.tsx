import { Headline } from '../components/Headline';
import { Reveal } from '../components/Reveal';
import { SlideFrame } from '../components/SlideFrame';
import type { SlideMetadata } from '../types';

export const metadata: SlideMetadata = {
  id: 'market-math',
  title: 'Addressable market',
  section: 'Appendix',
  notes: 'Start from 4.1 million seats and $240M of ARR, so one realized price of $58.54 per seat. Light users are 51%, or 2.09 million seats and $122M. Remove the 18% with no recorded meeting: 1.71 million seats, $100M. Keep the ones with at least one recurring meeting a week: with 48.5% of meetings recurring and one to four meetings a week, about 75% qualify, leaving 1.29 million seats and $75M. That is the addressable base, not the expected lift.',
};

// Waterfall, $M. Light-seat ARR bridge from the Heads-Up brief (Opportunity Size).
const SCALE = 3.1; // px per $M
const bars = [
  { label: 'All light seats', seats: '2.09M seats', value: 122, from: 0, kind: 'total' },
  { label: 'No meetings', seats: '−0.38M', value: -22, from: 122, kind: 'drop' },
  { label: 'Attend', seats: '1.71M seats', value: 100, from: 0, kind: 'total' },
  { label: 'No recurring meeting', seats: '−0.42M', value: -25, from: 100, kind: 'drop' },
  { label: 'Weekly series', seats: '1.29M seats', value: 75, from: 0, kind: 'result' },
] as const;

const steps = [
  { n: 1, title: 'Price per seat', math: '$240M ARR ÷ 4.1M seats = $58.54', source: 'Ex 1' },
  { n: 2, title: 'All light seats', math: '4.1M × 51% = 2.09M seats → × $58.54 = $122M', source: 'Ex 3' },
  { n: 3, title: 'Remove seats with no meetings', math: '18% of new seats had no recorded meeting: 2.09M × 82% = 1.71M → $100M', source: 'Ex 2' },
  { n: 4, title: 'Keep a weekly recurring series', math: '48.5% of meetings recur. At 1–4 meetings a week, ~75% have at least one: 1.71M × 75% = 1.29M → $75M', source: 'Flowtrace' },
];

function Bar({ bar }: { bar: (typeof bars)[number] }) {
  const height = Math.abs(bar.value) * SCALE;
  const bottom = bar.kind === 'drop' ? (bar.from + bar.value) * SCALE : 0;
  const fill =
    bar.kind === 'result'
      ? 'bg-[var(--deck-accent)] shadow-[var(--deck-card-shadow)]'
      : bar.kind === 'drop'
        ? 'border-2 border-dashed border-[var(--deck-tone-1)] bg-transparent'
        : 'bg-[var(--deck-tone-2)]';
  return (
    <div className="relative h-full">
      <div className={`absolute inset-x-[14%] rounded-[12px] ${fill}`} style={{ bottom, height }} />
      <p
        className={`absolute inset-x-0 text-center font-display text-[30px] font-extrabold tracking-[-0.03em] ${bar.kind === 'result' ? 'text-[var(--deck-accent)]' : bar.kind === 'drop' ? 'text-[var(--deck-muted)]' : ''}`}
        style={{ bottom: bottom + height + 8 }}
      >
        {bar.value < 0 ? `−$${Math.abs(bar.value)}M` : `$${bar.value}M`}
      </p>
    </div>
  );
}

export default function MarketMathSlide() {
  return (
    <SlideFrame
      section={metadata.section}
      source="One realized price per seat; skippers are not removed · Kilts Center Ansel case (2026), Ex 1, 2, 3; Flowtrace (48.5% of meetings recurring); team analysis"
    >
      <div className="absolute inset-x-[104px] top-[150px]">
        <Reveal>
          <Headline style={{ fontSize: 56 }} secondary="$75M of ARR sits in light seats with a recurring weekly meeting.">
            Addressable market
          </Headline>
        </Reveal>
      </div>

      <div className="absolute inset-x-[104px] top-[356px] bottom-[110px] grid grid-cols-[1fr_700px] gap-[64px]">
        {/* Waterfall */}
        <Reveal delay={120} className="flex flex-col">
          <p className="text-[20px] font-semibold uppercase tracking-[0.1em] text-[var(--deck-muted)]">Light-seat ARR bridge</p>
          <div className="mt-[16px] grid flex-1 grid-cols-5 border-b-2 border-[var(--deck-hairline-strong)]">
            {bars.map((bar) => <Bar key={bar.label} bar={bar} />)}
          </div>
          <div className="grid grid-cols-5 pt-[10px]">
            {bars.map((bar) => (
              <p key={bar.label} className="px-[4px] text-center leading-[1.2]">
                <span className={`block text-[19px] font-semibold ${bar.kind === 'result' ? 'text-[var(--deck-accent)]' : ''}`}>{bar.label}</span>
                <span className="block text-[17px] text-[var(--deck-muted)]">{bar.seats}</span>
              </p>
            ))}
          </div>
        </Reveal>

        {/* The math, step by step */}
        <div className="flex flex-col">
          <Reveal delay={200}>
            <p className="text-[20px] font-semibold uppercase tracking-[0.1em] text-[var(--deck-muted)]">How we sized it</p>
          </Reveal>
          <div className="mt-[16px] space-y-[12px]">
            {steps.map((step, index) => (
              <Reveal key={step.n} delay={280 + index * 100}>
                <div className={`flex gap-[18px] rounded-[22px] px-[24px] py-[16px] ${step.n === 4 ? 'border-2 border-[var(--deck-accent)] bg-[var(--deck-card)]' : 'border border-white/80 bg-white/55'}`}>
                  <span className="flex h-[36px] w-[36px] flex-shrink-0 items-center justify-center rounded-full bg-[var(--deck-accent)] text-[18px] font-semibold text-white">{step.n}</span>
                  <div>
                    <p className="text-[22px] font-semibold leading-[1.25]">
                      {step.title} <span className="text-[16px] font-normal text-[var(--deck-muted)]">· {step.source}</span>
                    </p>
                    <p className="mt-[4px] text-[20px] leading-[1.35] text-[var(--deck-muted)]">{step.math}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={720} className="mt-auto">
            <p className="text-[18px] leading-[1.4] text-[var(--deck-muted)]">
              ~75% = chance of at least one recurring meeting, 1 − 0.515<sup>n</sup>, averaged over n = 1–4 meetings a week. This is the addressable base, not the expected lift.
            </p>
          </Reveal>
        </div>
      </div>
    </SlideFrame>
  );
}
