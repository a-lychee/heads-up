import { ChevronRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { CountUp } from '../components/CountUp';
import { GlassCard } from '../components/GlassCard';
import { Headline } from '../components/Headline';
import { Reveal } from '../components/Reveal';
import { SlideFrame } from '../components/SlideFrame';
import type { SlideMetadata } from '../types';

export const metadata: SlideMetadata = {
  id: 'context',
  title: 'Ansel and the light user',
  section: '01 · Context',
  notes: 'Ansel is the quality leader in AI meeting notes: $240M ARR across 4.1 million seats. But only 38% of seats are active in a week, down from 61%, and 44% of renewals cut seats for low usage. Half of all seats, and two-thirds of the idle ones, belong to light users with under five meetings a week. The ones who attend at least one recurring meeting are 1.29 million seats and $75M of ARR. That is who we are building for.',
};

interface Step {
  label: string;
  value: ReactNode;
  caption: string;
  detail: string;
}

const steps: Step[] = [
  {
    label: 'Ansel today',
    value: <>$<CountUp value={240} />M</>,
    caption: 'ARR. The quality leader in AI meeting notes for enterprises.',
    detail: '4.1M seats · 3,900 customers',
  },
  {
    label: 'The problem',
    value: <CountUp value={38} suffix="%" />,
    caption: 'of seats are active in a typical week, down from 61%.',
    detail: '44% of FY25 renewals cut seats',
  },
  {
    label: 'Who we’re building for',
    value: <CountUp value={51} suffix="%" />,
    caption: 'of seats are light users, with under 5 meetings a week.',
    detail: '66% of all idle seats',
  },
];

function Label({ children, accent = false }: { children: ReactNode; accent?: boolean }) {
  return (
    <p className={`text-[14px] font-semibold uppercase tracking-[0.12em] ${accent ? 'text-[var(--deck-accent)]' : 'text-[var(--deck-muted)]'}`}>
      {children}
    </p>
  );
}

function Arrow() {
  return (
    <div className="flex items-center text-[var(--deck-secondary)]" aria-hidden="true">
      <ChevronRight size={30} strokeWidth={1.6} />
    </div>
  );
}

export default function ContextSlide() {
  return (
    <SlideFrame
      section={metadata.section}
      source="Kilts Center Ansel case (2026), company context and Ex 3 · $75M = light seats that attend with ≥1 recurring meeting a week ($58.54 per seat; 48.5% recurring, Flowtrace)"
    >
      <div className="absolute inset-x-[104px] top-[180px]">
        <Reveal>
          <Headline style={{ fontSize: 80 }} secondary="We’re building for the light users behind them.">
            Great notes. Idle seats.
          </Headline>
        </Reveal>

        <div className="mt-[72px] grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] gap-[12px]">
          {steps.map((step, index) => (
            <div key={step.label} className="contents">
              <Reveal delay={120 + index * 110}>
                <div className="flex h-[340px] flex-col rounded-[32px] border border-white/80 bg-white/50 px-[34px] py-[32px] backdrop-blur-[16px]">
                  <Label>{step.label}</Label>
                  <p className="mt-[34px] font-display text-[76px] font-extrabold leading-none tracking-[-0.035em]">{step.value}</p>
                  <p className="mt-[18px] text-[22px] leading-[1.38] text-[var(--deck-muted)]">{step.caption}</p>
                  <p className="mt-auto border-t border-[var(--deck-hairline)] pt-[16px] text-[18px] font-medium">{step.detail}</p>
                </div>
              </Reveal>
              <Reveal delay={170 + index * 110} className="flex"><Arrow /></Reveal>
            </div>
          ))}

          <Reveal delay={470}>
            <GlassCard className="h-[340px]">
              <div className="flex h-full flex-col">
                <Label accent>The opportunity</Label>
                <p className="mt-[34px] font-display text-[76px] font-extrabold leading-none tracking-[-0.035em] text-[var(--deck-accent)]">
                  $<CountUp value={75} />M
                </p>
                <p className="mt-[18px] text-[22px] leading-[1.38] text-[var(--deck-muted)]">of ARR on light seats with a recurring meeting.</p>
                <p className="mt-auto border-t border-[var(--deck-hairline)] pt-[16px] text-[18px] font-medium">1.29M seats</p>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </div>
    </SlideFrame>
  );
}
