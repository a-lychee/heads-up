import { ArrowRight, ShieldCheck } from 'lucide-react';
import { Headline } from '../components/Headline';
import { Reveal } from '../components/Reveal';
import { SlideFrame } from '../components/SlideFrame';
import type { SlideMetadata } from '../types';

export const metadata: SlideMetadata = {
  id: 'success-metrics',
  title: 'Success metrics',
  section: 'Appendix',
  notes: 'Four behavior metrics track light users moving from idle to active. Each target has a basis in the case data, and privacy is the guardrail: no increase in admin escalations or workspace opt-outs.',
};

// Heads-Up Phase 1 brief, Success Metrics. Targets are team estimates.
const metrics = [
  { name: 'Light users active each week', today: '20%', target: '26%', basis: '1 in 6 light users matching rediscovery users (57%) lifts the cohort to ~26%', source: 'Ex 3' },
  { name: '12-month seat retention, light users', today: '34%', target: '39%', basis: 'Half the gap to light users who catch up on missed meetings, who retain at 44%', source: 'Ex 3' },
  { name: 'Action items marked completed', today: '6%', target: '20%', basis: 'Acting on 1 of the ~4.7 items per meeting is ~20%', source: 'Ex 5' },
  { name: 'New seats active at day 90', today: '23%', target: '30%', basis: 'First value within 3 days retains 63% vs. 32% after 11+ days', source: 'Ex 2' },
];

const grid = 'grid grid-cols-[minmax(0,1fr)_330px_minmax(0,1.15fr)] items-center gap-x-[40px]';

export default function SuccessMetricsSlide() {
  return (
    <SlideFrame section={metadata.section} source="Targets are team estimates · Kilts Center Ansel case (2026), Ex 2, 3, 5; team analysis">
      <div className="absolute inset-x-[104px] top-[150px]">
        <Reveal>
          <Headline style={{ fontSize: 56 }} secondary="Four behavior metrics track light users moving from idle to active, with privacy as the guardrail.">
            Success metrics
          </Headline>
        </Reveal>
      </div>

      <div className="absolute inset-x-[104px] top-[360px]">
        <Reveal className={`${grid} pb-[12px]`}>
          <span className="text-[18px] font-semibold uppercase tracking-[0.1em] text-[var(--deck-muted)]">Metric</span>
          <span className="grid grid-cols-[1fr_40px_1fr] text-center text-[18px] font-semibold uppercase tracking-[0.1em] text-[var(--deck-muted)]">
            <span>Today</span><span /><span className="text-[var(--deck-accent)]">Target</span>
          </span>
          <span className="text-[18px] font-semibold uppercase tracking-[0.1em] text-[var(--deck-muted)]">Basis for the target</span>
        </Reveal>
        {metrics.map((metric, index) => (
          <Reveal key={metric.name} delay={100 + index * 90} className={`${grid} border-t border-[var(--deck-hairline)] py-[16px]`}>
            <p className="flex items-center gap-[16px] text-[24px] font-semibold leading-[1.25]">
              <span className={`flex h-[40px] w-[40px] flex-shrink-0 items-center justify-center rounded-full font-display text-[20px] font-extrabold ${index === 0 ? 'bg-[var(--deck-accent)] text-white' : 'bg-[var(--deck-tone-3)]'}`}>{index + 1}</span>
              {metric.name}
            </p>
            <div className="grid grid-cols-[1fr_40px_1fr] items-center text-center font-display font-extrabold tracking-[-0.035em]">
              <span className="text-[44px] text-[var(--deck-secondary)]">{metric.today}</span>
              <ArrowRight size={28} className="mx-auto text-[var(--deck-muted)]" />
              <span className="text-[52px] text-[var(--deck-accent)]">{metric.target}</span>
            </div>
            <p className="text-[20px] leading-[1.35] text-[var(--deck-muted)]">
              {metric.basis} <span className="text-[16px]">· {metric.source}</span>
            </p>
          </Reveal>
        ))}
        <Reveal delay={520} className="mt-[22px] flex items-center gap-[14px] rounded-[20px] bg-[var(--deck-callout)] px-[26px] py-[16px]">
          <ShieldCheck size={28} className="flex-shrink-0 text-[var(--deck-callout-text)]" />
          <p className="text-[22px] leading-[1.3]">
            <span className="font-semibold text-[var(--deck-callout-text)]">Guardrail:</span> no increase in admin privacy escalations or workspace opt-outs
          </p>
        </Reveal>
      </div>
    </SlideFrame>
  );
}
