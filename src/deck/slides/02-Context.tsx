import { Headline } from '../components/Headline';
import { Reveal } from '../components/Reveal';
import { SlideFrame } from '../components/SlideFrame';
import type { SlideMetadata } from '../types';

export const metadata: SlideMetadata = {
  id: 'context',
  title: 'Context and problem',
  section: '01 · Context and Problem',
  notes: 'Ansel is an AI meeting notetaker for enterprises: $240M of ARR, 4.1 million seats and 3,900 customers, and it leads on note quality and governance. But usage is falling. Seats active in a week fell from 61% to 38% in two years, and net revenue retention from 141% to 103%.',
};

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
    <svg width="60" height="80" viewBox="0 0 44 56" aria-hidden="true" className="flex-shrink-0">
      <path d="M22 4 V46 M8 32 L22 48 L36 32" fill="none" stroke="var(--deck-accent)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ContextSlide() {
  return (
    <SlideFrame section={metadata.section} className="deck-no-glow" source="Kilts Center Ansel case (2026), company context and business situation">
      <div className="absolute inset-x-[104px] top-[160px]">
        <Reveal>
          <Headline style={{ fontSize: 64 }} secondary="Ansel is a leading notetaker, but its usage is falling">
            Context and problem
          </Headline>
        </Reveal>
      </div>

      <div className="absolute inset-x-[104px] bottom-[96px] top-[340px] grid grid-cols-2 content-center items-center gap-[96px]">
        {/* Left: Ansel in a dark card */}
        <Reveal delay={100}>
          <div className="rounded-[32px] bg-[var(--deck-ink)] px-[48px] py-[44px] text-white">
            <p className="text-[22px] font-semibold uppercase tracking-[0.1em] text-white/70">Ansel</p>
            <p className="mt-[16px] text-[36px] leading-[1.3] text-white/95">
              An AI meeting notetaker for enterprises that leads on notetaking quality and governance controls
            </p>
            <div className="mt-[36px] flex gap-[64px] border-t border-white/20 pt-[30px]">
              {anselStats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-[60px] font-extrabold leading-none tracking-[-0.03em]">{stat.value}</p>
                  <p className="mt-[8px] text-[24px] text-white/80">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Right: the problem */}
        <Reveal delay={300} className="pl-[8px]">
          <p className="text-[22px] font-semibold uppercase tracking-[0.1em] text-[var(--deck-muted)]">The problem</p>
          {declines.map((decline) => (
            <div key={decline.label} className="mt-[36px] flex items-center gap-[28px]">
              <DownArrow />
              <div>
                <p className="whitespace-nowrap font-display text-[96px] font-extrabold leading-none tracking-[-0.04em]">
                  <span className="text-[var(--deck-secondary)]">{decline.from}</span>
                  <span className="text-[56px] text-[var(--deck-muted)]"> → </span>
                  <span className="text-[var(--deck-accent)]">{decline.to}</span>
                </p>
                <p className="mt-[10px] text-[28px] text-[var(--deck-muted)]">{decline.label}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </SlideFrame>
  );
}
