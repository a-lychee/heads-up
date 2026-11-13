import { CountUp } from '../components/CountUp';
import { Headline } from '../components/Headline';
import { Reveal } from '../components/Reveal';
import { SlideFrame } from '../components/SlideFrame';
import type { SlideMetadata } from '../types';

export const metadata: SlideMetadata = {
  id: 'why-light-users',
  title: 'Why light users',
  section: 'Appendix',
  notes: 'Light users are half of all seats but two-thirds of idle seats. Only 20% are active in a week and 34% are still in use after a year, so this is where seats are being lost.',
};

// Kilts Center Ansel case (2026), Ex 3. Idle share is our calculation: share of seats × share not active weekly.
const cohorts = [
  { name: 'Heavy', detail: '15+ a week', idle: 4, seats: '14%', active: '82%', retained: '81%', read: 'Low', ours: false },
  { name: 'Moderate', detail: '5 to 14', idle: 19, seats: '28%', active: '58%', retained: '68%', read: 'Medium', ours: false },
  { name: 'Light', detail: 'Under 5', idle: 66, seats: '51%', active: '20%', retained: '34%', read: 'High: our focus', ours: true },
  { name: 'Never connected', detail: 'No calendar', idle: 11, seats: '7%', active: '0%', retained: '11%', read: 'Activation issue', ours: false },
];

const rows: { label: string; key: 'seats' | 'active' | 'retained' | 'read' }[] = [
  { label: 'Share of seats', key: 'seats' },
  { label: 'Active weekly', key: 'active' },
  { label: 'In use at 12 months', key: 'retained' },
  { label: 'Our read', key: 'read' },
];

const grid = 'grid grid-cols-[260px_repeat(4,1fr)] gap-x-[20px]';
const BAR_MAX = 220; // px height for 66%

export default function WhyLightUsersSlide() {
  return (
    <SlideFrame
      section={metadata.section}
      source="Share of idle seats is our calculation from Ex 3 (share of seats × share not active weekly) · Kilts Center Ansel case (2026), Ex 3; team analysis"
    >
      <div className="absolute inset-x-[104px] top-[150px]">
        <Reveal>
          <Headline style={{ fontSize: 56 }} secondary="Half of all seats, two-thirds of idle seats, and only 34% still in use after a year.">
            Why light users
          </Headline>
        </Reveal>

        <Reveal delay={120} className="mt-[44px]">
          <p className="text-[20px] font-semibold uppercase tracking-[0.1em] text-[var(--deck-muted)]">Share of idle seats by attendance cohort</p>
        </Reveal>

        {/* Columns: idle share */}
        <div className={`${grid} mt-[14px] items-end`} style={{ height: BAR_MAX + 56 }}>
          <span />
          {cohorts.map((cohort, index) => (
            <Reveal key={cohort.name} delay={200 + index * 90} className="flex h-full flex-col items-center justify-end">
              <p className={`font-display text-[44px] font-extrabold leading-none tracking-[-0.035em] ${cohort.ours ? 'text-[var(--deck-accent)]' : 'text-[var(--deck-secondary)]'}`}>
                <CountUp value={cohort.idle} suffix="%" />
              </p>
              <div
                className={`mt-[12px] w-[62%] rounded-t-[16px] ${cohort.ours ? 'bg-[var(--deck-accent)] shadow-[var(--deck-card-shadow)]' : 'bg-[var(--deck-tone-2)]'}`}
                style={{ height: (cohort.idle / 66) * BAR_MAX }}
              />
            </Reveal>
          ))}
        </div>

        {/* Cohort names under the axis */}
        <div className={`${grid} border-t-2 border-[var(--deck-hairline-strong)] pt-[12px]`}>
          <span />
          {cohorts.map((cohort) => (
            <p key={cohort.name} className="text-center leading-[1.2]">
              <span className={`block text-[22px] font-semibold ${cohort.ours ? 'text-[var(--deck-accent)]' : ''}`}>{cohort.name}</span>
              <span className="block text-[18px] text-[var(--deck-muted)]">{cohort.detail}</span>
            </p>
          ))}
        </div>

        {/* Supporting rows */}
        <Reveal delay={600} className="mt-[18px]">
          {rows.map((row) => (
            <div key={row.key} className={`${grid} items-center border-t border-[var(--deck-hairline)] py-[7px]`}>
              <p className="text-[20px] text-[var(--deck-muted)]">{row.label}</p>
              {cohorts.map((cohort) => (
                <p key={cohort.name} className={`text-center text-[22px] ${cohort.ours ? 'font-semibold text-[var(--deck-ink)]' : 'text-[var(--deck-muted)]'}`}>
                  {cohort[row.key]}
                </p>
              ))}
            </div>
          ))}
        </Reveal>
      </div>
    </SlideFrame>
  );
}
