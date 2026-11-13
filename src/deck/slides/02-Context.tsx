import anselLogo from '@/assets/ansel-logo.png';
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

function Label({ children }: { children: string }) {
  return <p className="text-[22px] font-semibold uppercase tracking-[0.1em] text-[var(--deck-muted)]">{children}</p>;
}

function DownArrow() {
  return (
    <svg width="56" height="74" viewBox="0 0 44 56" aria-hidden="true" className="flex-shrink-0">
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

      <div className="absolute inset-x-[104px] bottom-[96px] top-[340px] grid grid-cols-[544px_1fr] gap-[88px]">
        {/* Left third: Ansel in a muted rust card, text only, with the app icon tucked into the corner */}
        <Reveal delay={100} className="h-full">
          <div className="relative h-full overflow-hidden rounded-[32px] bg-[image:var(--deck-rust-gradient)] p-[44px] text-white">
            <p className="text-[22px] font-semibold uppercase tracking-[0.1em] text-white/70">Ansel</p>
            <p className="mt-[16px] max-w-[420px] text-[38px] leading-[1.3]">
              An AI meeting notetaker for enterprises that leads on notetaking quality and governance controls
            </p>
            <img
              src={anselLogo}
              alt=""
              aria-hidden="true"
              className="absolute -bottom-[70px] -right-[70px] h-[330px] w-[330px] rotate-[-10deg] drop-shadow-[0_24px_40px_rgba(40,12,4,0.45)]"
            />
          </div>
        </Reveal>

        {/* Right two-thirds: Ansel's size, then the problem */}
        <div className="flex h-full flex-col justify-between">
          <Reveal delay={250}>
            <Label>Ansel at a glance</Label>
            <div className="mt-[20px] flex gap-[80px]">
              {anselStats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-[72px] font-extrabold leading-none tracking-[-0.035em]">{stat.value}</p>
                  <p className="mt-[8px] text-[26px] text-[var(--deck-muted)]">{stat.label}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={450} className="border-t border-[var(--deck-hairline-strong)] pt-[30px]">
            <Label>The problem</Label>
            {declines.map((decline) => (
              <div key={decline.label} className="mt-[24px] flex items-center gap-[24px]">
                <DownArrow />
                <div>
                  <p className="whitespace-nowrap font-display text-[84px] font-extrabold leading-none tracking-[-0.04em]">
                    <span className="text-[var(--deck-secondary)]">{decline.from}</span>
                    <span className="text-[48px] text-[var(--deck-muted)]"> → </span>
                    <span className="text-[var(--deck-accent)]">{decline.to}</span>
                  </p>
                  <p className="mt-[8px] text-[26px] text-[var(--deck-muted)]">{decline.label}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </SlideFrame>
  );
}
