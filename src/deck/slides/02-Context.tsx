import type { ReactNode } from 'react';
import anselLogo from '@/assets/ansel-logo.png';
import { CountUp } from '../components/CountUp';
import { Headline } from '../components/Headline';
import { Reveal, useSlideEnvironment } from '../components/Reveal';
import { SlideFrame } from '../components/SlideFrame';
import type { SlideMetadata } from '../types';

// This slide is three clicks of one picture: FY23, then growth to FY25 (green), then decline to FY25 (red).
// The three steps are separate slides with no crossfade between them, so each click only animates the numbers.

const section = '01 · Context and Problem';
const source = 'Kilts Center Ansel case (2026), Phase 1, Ex 1 (financial and operating summary) and Ex 6 (FY25 renewals)';

export const metadata: SlideMetadata = {
  id: 'context',
  title: 'Context and problem · FY23',
  section,
  notes: 'Ansel is an AI meeting notetaker for enterprises, and it leads on note quality and governance controls. Start in FY23: $58M of ARR, 1,450 customer organizations and 1.1 million seats. Net revenue retention was 141%, and 61% of seats were active every week.',
};

export const growthMetadata: SlideMetadata = {
  id: 'context-growth',
  title: 'Context and problem · growth',
  section,
  transition: 'none',
  notes: 'Fast forward to FY25. On the surface Ansel is thriving: ARR is up to $240M, customers to 3,900, and provisioned seats to 4.1 million.',
};

export const declineMetadata: SlideMetadata = {
  id: 'context-decline',
  title: 'Context and problem · decline',
  section,
  transition: 'none',
  notes: 'But underneath, usage is falling. Net revenue retention is down from 141% to 103%. Only 38% of seats are active in a week, down from 61%. And 44% of customers cut seats at their FY25 renewal.',
};

type Step = 0 | 1 | 2;

interface Metric {
  label: string;
  /** FY23 value; null if the case only reports it for FY25. */
  from: number | null;
  to: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  grouping?: boolean;
  /** Percent change from FY23 to FY25 (relative, for every metric so the six read the same way). */
  change: 'percent' | 'none';
}

// Case Ex 1, FY23 → FY25.
const growth: Metric[] = [
  { label: 'Annual recurring revenue', from: 58, to: 240, prefix: '$', suffix: 'M', change: 'percent' },
  { label: 'Customer organizations', from: 1450, to: 3900, grouping: true, change: 'percent' },
  { label: 'Provisioned seats', from: 1.1, to: 4.1, suffix: 'M', decimals: 1, change: 'percent' },
];

// Case Ex 1, FY23 → FY25; the renewal figure is FY25 only (Ex 6).
const decline: Metric[] = [
  { label: 'Net revenue retention', from: 141, to: 103, suffix: '%', change: 'percent' },
  { label: 'Seats active weekly', from: 61, to: 38, suffix: '%', change: 'percent' },
  { label: 'FY25 customers that cut seats', from: null, to: 44, suffix: '%', change: 'none' },
];

/** Wraps content in a Reveal on the first step only, so later clicks don't replay the entrance. */
function Enter({ step, delay, className, children }: { step: Step; delay: number; className?: string; children: ReactNode }) {
  return step === 0 ? <Reveal delay={delay} className={className}>{children}</Reveal> : <div className={className}>{children}</div>;
}

function changeText(metric: Metric) {
  if (metric.from === null || metric.change === 'none') return null;
  const diff = metric.to - metric.from;
  const sign = diff > 0 ? '+' : '−';
  return `${sign}${Math.round(Math.abs(diff / metric.from) * 100)}%`;
}

function Stat({ metric, showFY25, animate, tone, delay }: { metric: Metric; showFY25: boolean; animate: boolean; tone: 'up' | 'down'; delay: number }) {
  const { static: isStatic } = useSlideEnvironment();
  const color = tone === 'up' ? 'text-[var(--deck-up)]' : 'text-[var(--deck-down)]';
  const change = changeText(metric);
  const format = { prefix: metric.prefix, suffix: metric.suffix, decimals: metric.decimals, grouping: metric.grouping };

  let value: ReactNode;
  if (!showFY25) {
    value = metric.from === null ? <span className="text-[var(--deck-secondary)]">—</span> : <CountUp {...format} value={metric.from} from={metric.from} />;
  } else if (animate && metric.from !== null) {
    value = <CountUp {...format} value={metric.to} from={metric.from} />;
  } else if (animate) {
    // No FY23 value: the number pops in instead of counting.
    value = <span className={isStatic ? '' : 'deck-pop inline-block'} style={{ animationDelay: `${delay + 300}ms` }}><CountUp {...format} value={metric.to} from={metric.to} /></span>;
  } else {
    value = <CountUp {...format} value={metric.to} from={metric.to} />;
  }

  return (
    <div>
      <div className="flex items-baseline gap-[12px] whitespace-nowrap">
        <p style={{ animationDelay: `${delay}ms` }} className={`font-display text-[64px] font-extrabold leading-none tracking-[-0.035em] ${showFY25 ? color : ''} ${showFY25 && animate && !isStatic ? 'deck-tint' : ''}`}>{value}</p>
        {showFY25 && change && (
          <span className={`text-[24px] font-semibold ${color} ${animate && !isStatic ? 'deck-pop' : ''}`} style={{ animationDelay: `${delay + 1000}ms` }}>
            {change}
          </span>
        )}
      </div>
      <p className="mt-[10px] whitespace-nowrap text-[24px] leading-[1.25] text-[var(--deck-muted)]">{metric.label}</p>
    </div>
  );
}

function Year({ step }: { step: Step }) {
  const { static: isStatic } = useSlideEnvironment();
  const big = 'font-display text-[64px] font-extrabold leading-none tracking-[-0.035em] text-[var(--deck-accent)]';
  // Flips from FY23 to FY25 on the growth click, then stays.
  if (step === 1 && !isStatic) {
    return (
      <span className="inline-grid">
        <span className={`deck-swap-out col-start-1 row-start-1 ${big}`}>FY23</span>
        <span className={`deck-swap-in col-start-1 row-start-1 ${big}`} style={{ animationDelay: '120ms' }}>FY25</span>
      </span>
    );
  }
  return <span className={big}>{step === 0 ? 'FY23' : 'FY25'}</span>;
}

function ContextStep({ step }: { step: Step }) {
  return (
    <SlideFrame section={section} className="deck-no-glow" source={source}>
      <div className="absolute inset-x-[104px] top-[160px]">
        <Enter step={step} delay={0}>
          <Headline style={{ fontSize: 64 }} secondary="Ansel is a leading notetaker, but its usage is falling">
            Context and problem
          </Headline>
        </Enter>
      </div>

      <div className="absolute inset-x-[104px] bottom-[96px] top-[340px] grid grid-cols-[544px_1fr] gap-[88px]">
        {/* Left third: Ansel introduces itself, with its app icon as the speaker */}
        <Enter step={step} delay={100} className="flex flex-col justify-center">
          <div className="rounded-[36px_36px_36px_8px] bg-white px-[40px] py-[38px] shadow-[var(--deck-card-shadow)]">
            <p className="text-[36px] leading-[1.3]">
              “Hi, I’m <span className="font-bold text-[var(--deck-accent)]">Ansel</span>. I’m an AI meeting notetaker for enterprises, and I lead on notetaking quality and governance controls.”
            </p>
          </div>
          <div className="mt-[26px] flex items-center gap-[20px]">
            <img src={anselLogo} alt="Ansel app icon" className="h-[120px] w-[120px] drop-shadow-[0_16px_30px_rgba(40,60,110,0.25)]" />
            <div>
              <p className="text-[22px] font-semibold uppercase tracking-[0.1em] text-[var(--deck-accent)]">Ansel</p>
              <p className="mt-[4px] text-[22px] text-[var(--deck-muted)]">Your AI meeting assistant</p>
            </div>
          </div>
        </Enter>

        {/* Right two-thirds: six numbers, FY23 then FY25. Click 1 turns the top row green, click 2 the bottom row red. */}
        <div className="flex flex-col justify-center">
          <Enter step={step} delay={250} className="flex items-baseline gap-[18px]">
            {/* Same size as the year; only the year takes the accent color */}
            <span className="font-display text-[64px] font-extrabold leading-none tracking-[-0.035em]">Ansel in</span>
            <Year step={step} />
          </Enter>

          {/* Matching heavier rules above and below the six stats frame them; a lighter rule splits the two rows.
              Every gap around the rules is 36px. The third column is a bit wider so its longest label stays on one line. */}
          <Enter step={step} delay={350} className="mt-[36px] border-t-2 border-[var(--deck-tone-1)] pt-[36px]">
            <div className="grid grid-cols-[1fr_1fr_1.15fr] gap-[40px]">
              {growth.map((metric, index) => (
                <Stat key={metric.label} metric={metric} showFY25={step >= 1} animate={step === 1} tone="up" delay={index * 120} />
              ))}
            </div>
          </Enter>

          {/* Dimmed on the growth click: these are still FY23 numbers until the next click. */}
          <Enter step={step} delay={450} className={`mt-[36px] border-y border-t-[var(--deck-hairline-strong)] border-b-2 border-b-[var(--deck-tone-1)] pb-[36px] pt-[36px] transition-opacity duration-500 ${step === 1 ? 'opacity-40' : ''}`}>
            <div className="grid grid-cols-[1fr_1fr_1.15fr] gap-[40px]">
              {decline.map((metric, index) => (
                <Stat key={metric.label} metric={metric} showFY25={step === 2} animate={step === 2} tone="down" delay={index * 120} />
              ))}
            </div>
          </Enter>
        </div>
      </div>
    </SlideFrame>
  );
}

export default function ContextSlide() {
  return <ContextStep step={0} />;
}

export function ContextGrowthSlide() {
  return <ContextStep step={1} />;
}

export function ContextDeclineSlide() {
  return <ContextStep step={2} />;
}
