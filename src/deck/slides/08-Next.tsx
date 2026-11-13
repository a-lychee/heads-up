import type { ReactNode } from 'react';
import { Headline } from '../components/Headline';
import { Reveal } from '../components/Reveal';
import { SlideFrame } from '../components/SlideFrame';
import type { SlideMetadata } from '../types';

export const metadata: SlideMetadata = {
  id: 'next',
  title: 'Now, next, later',
  section: '03 · Takeaways',
  notes: 'Now: we built the Heads-Up prototype, and in a controlled group our riskiest assumption held: light users want help prepping for recurring meetings. Next: test whether that still holds at scale, which is our product-market fit test, read through weekly activity, retention and action items, with privacy as the guardrail. Later: expand the product, starting with the ideas from our Phase 1 brief.',
};

// Pilot targets for light users (Heads-Up Phase 1 brief, Success Metrics; case Ex 2, 3, 5).
const metrics = [
  { label: 'Light users active weekly', from: '20%', to: '26%' },
  { label: '12-month seat retention', from: '34%', to: '39%' },
  { label: 'Action items acted on', from: '6%', to: '20%' },
];

// Roadmap ideas from the Phase 1 brief ("Later"). Still to be prioritized.
const roadmap = ['Chat with Ansel before the meeting', 'Teams, email and push', 'Questions sent ahead of the meeting', 'Non-recurring meetings'];

interface Column {
  word: string;
  tone: 'ink' | 'accent' | 'secondary';
  heading: string;
  body: ReactNode;
}

const toneText = { ink: 'text-[var(--deck-ink)]', accent: 'text-[var(--deck-accent)]', secondary: 'text-[var(--deck-secondary)]' };
const toneRule = { ink: 'border-[var(--deck-ink)]', accent: 'border-[var(--deck-accent)]', secondary: 'border-[var(--deck-secondary)]' };

const columns: Column[] = [
  {
    word: 'Now',
    tone: 'ink',
    heading: 'Built and proved',
    body: <p>We built the Heads-Up prototype. In a controlled group, our riskiest assumption held: light users want help prepping.</p>,
  },
  {
    word: 'Next',
    tone: 'accent',
    heading: 'Test it at scale',
    body: (
      <>
        <p>Does the need still hold? That’s product-market fit. We’d read it through:</p>
        <ul className="mt-[14px] space-y-[8px]">
          {metrics.map((metric) => (
            <li key={metric.label} className="flex items-baseline justify-between gap-[16px] border-t border-[var(--deck-hairline)] pt-[8px]">
              <span>{metric.label}</span>
              <span className="whitespace-nowrap font-display text-[30px] font-extrabold tracking-[-0.03em]">
                <span className="text-[var(--deck-secondary)]">{metric.from}</span>
                <span className="text-[22px] text-[var(--deck-muted)]"> → </span>
                <span className="text-[var(--deck-accent)]">{metric.to}</span>
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-[14px] text-[19px]">Guardrail: no increase in admin privacy escalations</p>
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
    <SlideFrame section={metadata.section} source="Kilts Center Ansel case (2026), Ex 2, 3, 5; Heads-Up Phase 1 brief">
      <div className="absolute inset-x-[104px] top-[160px]">
        <Reveal>
          <Headline style={{ fontSize: 64 }} secondary="Proven in a controlled group. Next, prove it at scale.">
            Now, next, later
          </Headline>
        </Reveal>
      </div>

      <div className="absolute inset-x-[104px] top-[380px] grid grid-cols-[1fr_1.2fr_1fr] gap-[64px]">
        {columns.map((column, index) => (
          <Reveal key={column.word} delay={150 + index * 180}>
            <div className={`border-t-[4px] pt-[26px] ${toneRule[column.tone]}`}>
              <p className={`font-display text-[104px] font-extrabold leading-none tracking-[-0.04em] ${toneText[column.tone]}`}>{column.word}</p>
              <p className="mt-[22px] text-[30px] font-semibold leading-[1.25]">{column.heading}</p>
              <div className="mt-[12px] text-[22px] leading-[1.4] text-[var(--deck-muted)]">{column.body}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </SlideFrame>
  );
}
