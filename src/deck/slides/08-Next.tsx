import type { ReactNode } from 'react';
import { Check, Flag } from 'lucide-react';
import { Headline } from '../components/Headline';
import { Reveal } from '../components/Reveal';
import { SlideFrame } from '../components/SlideFrame';
import type { SlideMetadata } from '../types';

export const metadata: SlideMetadata = {
  id: 'next',
  title: 'Now, next, later',
  section: '03 · Takeaways',
  notes: 'Now: we built the Heads-Up prototype, and in a controlled group our riskiest assumption held: light users want help prepping for recurring meetings. Next: test whether that still holds at scale, which is our product-market fit test. Read it in two horizons. Short term, weeks 1–4, leading signals: do light users open the card and click through to the transcript? There is no baseline today, so those targets are ours. Long term, two quarters, behavior change: action items acted on, light users active weekly, and 12-month seat retention. Privacy is the guardrail either way. Later: expand the product, starting with the ideas from our Phase 1 brief.',
};

// Short-term leading signals: do light users even look? No baseline today, so targets are team estimates.
const shortTerm = [
  { label: 'Cards opened before the meeting', from: '—', to: '60%' },
  { label: 'Transcript links clicked', from: '—', to: '25%' },
];

// Long-term behavior change (Heads-Up Phase 1 brief, Success Metrics; case Ex 2, 3, 5).
const longTerm = [
  { label: 'Action items acted on', from: '6%', to: '20%' },
  { label: 'Light users active weekly', from: '20%', to: '26%' },
  { label: '12-month seat retention', from: '34%', to: '39%' },
];

interface HorizonProps {
  tag: string;
  when: string;
  color: string;
  items: { label: string; from: string; to: string }[];
}

function Horizon({ tag, when, color, items }: HorizonProps) {
  return (
    <div className="mt-[16px]">
      <div className="flex items-baseline justify-between gap-[12px]">
        <span className="text-[17px] font-semibold uppercase tracking-[0.12em]" style={{ color }}>
          {tag}
        </span>
        <span className="text-[16px] text-[var(--deck-muted)]">{when}</span>
      </div>
      <ul className="mt-[6px] space-y-[6px]">
        {items.map((metric) => (
          <li key={metric.label} className="flex items-baseline justify-between gap-[14px] border-t border-[var(--deck-hairline)] pt-[6px]">
            <span className="text-[20px] leading-[1.2]">{metric.label}</span>
            <span className="whitespace-nowrap font-display text-[26px] font-extrabold tracking-[-0.03em]">
              <span className="text-[var(--deck-secondary)]">{metric.from}</span>
              <span className="text-[18px] text-[var(--deck-muted)]"> → </span>
              <span className="text-[var(--deck-accent)]">{metric.to}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Roadmap ideas from the Phase 1 brief ("Later"). Still to be prioritized.
const roadmap = ['Chat with Ansel before the meeting', 'Teams, email and push', 'Questions sent ahead of the meeting', 'Non-recurring meetings'];

interface Column {
  word: string;
  tone: 'ink' | 'accent' | 'secondary';
  heading: string;
  body: ReactNode;
  /** Stretches the body to the column height so the panel fills the lane. */
  fill?: boolean;
}

const toneText = { ink: 'text-[var(--deck-ink)]', accent: 'text-[var(--deck-accent)]', secondary: 'text-[var(--deck-secondary)]' };
const toneRule = { ink: 'border-[var(--deck-ink)]', accent: 'border-[var(--deck-accent)]', secondary: 'border-[var(--deck-secondary)]' };

const columns: Column[] = [
  {
    word: 'Now',
    tone: 'ink',
    heading: 'Built and proved',
    fill: true,
    body: (
      <>
        <p>We built the Heads-Up prototype.</p>
        <div
          className="mt-[18px] flex flex-1 flex-col justify-center rounded-[22px] border px-[22px] py-[18px]"
          style={{
            background: 'var(--deck-callout)',
            borderColor: 'color-mix(in srgb, var(--deck-accent) 30%, transparent)',
            boxShadow: '0 0 0 7px color-mix(in srgb, var(--deck-accent) 6%, transparent)',
          }}
        >
          <span className="flex items-center gap-[8px] text-[16px] font-semibold uppercase tracking-[0.1em] text-[var(--deck-accent)]">
            <Flag size={16} strokeWidth={2.4} />
            Riskiest assumption
          </span>
          <p className="mt-[10px] font-display text-[27px] font-extrabold leading-[1.14] tracking-[-0.02em] text-[var(--deck-ink)]">
            Light users want help prepping for recurring meetings
          </p>
          <span className="mt-[14px] inline-flex items-center gap-[8px] whitespace-nowrap rounded-full bg-[var(--deck-accent)] px-[14px] py-[5px] text-[18px] font-semibold text-white">
            <Check size={16} strokeWidth={2.6} />
            Held in a controlled group
          </span>
        </div>
      </>
    ),
  },
  {
    word: 'Next',
    tone: 'accent',
    heading: 'Test it at scale',
    body: (
      <>
        <p>Does the need still hold? We’d read it in two horizons:</p>
        <Horizon tag="Short term" when="weeks 1–4 · do they look?" color="var(--deck-accent)" items={shortTerm} />
        <Horizon tag="Long term" when="2 quarters · does it change the work?" color="var(--deck-ink)" items={longTerm} />
        <p className="mt-[14px] text-[18px]">Guardrail: no rise in admin privacy escalations</p>
      </>
    ),
  },
  {
    word: 'Later',
    tone: 'secondary',
    heading: 'Expand the product',
    body: (
      <>
        <p>Feature roadmap, still to be prioritized:</p>
        <ul className="mt-[14px] space-y-[8px]">
          {roadmap.map((item) => (
            <li key={item} className="flex items-center gap-[12px]">
              <span className="h-[10px] w-[10px] flex-shrink-0 rounded-full border-[3px] border-[var(--deck-secondary)]" />
              {item}
            </li>
          ))}
        </ul>
      </>
    ),
  },
];

export default function NextSlide() {
  return (
    <SlideFrame section={metadata.section} source="Kilts Center Ansel case (2026), Ex 2, 3, 5; Heads-Up Phase 1 brief · short-term targets are team estimates">
      <div className="absolute inset-x-[104px] top-[160px]">
        <Reveal>
          <Headline style={{ fontSize: 64 }} secondary="Proven in a controlled group. Next, prove it at scale.">
            Now, next, later
          </Headline>
        </Reveal>
      </div>

      <div className="absolute inset-x-[104px] top-[380px] grid grid-cols-[1fr_1.2fr_1fr] gap-[64px]">
        {columns.map((column, index) => (
          <Reveal key={column.word} delay={150 + index * 180} className={column.fill ? 'h-full' : ''}>
            <div className={`flex h-full flex-col border-t-[4px] pt-[26px] ${toneRule[column.tone]}`}>
              <p className={`font-display text-[104px] font-extrabold leading-none tracking-[-0.04em] ${toneText[column.tone]}`}>{column.word}</p>
              <p className="mt-[22px] text-[30px] font-semibold leading-[1.25]">{column.heading}</p>
              <div className={`mt-[12px] text-[22px] leading-[1.4] text-[var(--deck-muted)] ${column.fill ? 'flex flex-1 flex-col' : ''}`}>{column.body}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </SlideFrame>
  );
}
