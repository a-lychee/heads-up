import { ArrowRight } from 'lucide-react';
import { Headline } from '../components/Headline';
import { Reveal } from '../components/Reveal';
import { SlideFrame } from '../components/SlideFrame';
import type { SlideMetadata } from '../types';

export const metadata: SlideMetadata = {
  id: 'key-risks',
  title: 'Key risks',
  section: 'Appendix',
  notes: 'The riskiest assumption is that light users’ recurring meetings leave them something they own or that is still open. With no item there is no card and no habit, so the pilot measures it first.',
};

type Level = 'Highest' | 'High' | 'Medium' | 'Low';
// Heads-Up Phase 1 brief, Key Assumptions; case Ex 3, 5, 9.
const risks: { assumption: string; level: Level; why: string; mitigation: string }[] = [
  { assumption: 'Meetings leave an item the user owns or that is open', level: 'Highest', why: 'With no item there is no card, so no habit forms', mitigation: 'Post only when recent summaries hold an item; the pilot tracks how many meetings produce a card' },
  { assumption: 'Value moments drive seat retention', level: 'High', why: 'Today’s evidence is correlational (46% vs. 34%)', mitigation: 'A randomized holdout measures the causal lift, with 60-day activity as the early read' },
  { assumption: 'Users open a calendar-timed Slack card', level: 'Medium', why: 'Must perform closer to Slack links (46%) and push (39%) than email (18%)', mitigation: 'Post at the meeting reminder only when there is an item; tune timing against the digest' },
  { assumption: 'Ansel identifies action-item owners correctly', level: 'Medium', why: 'A wrong owner erodes trust in the card', mitigation: 'Hedged wording (“may already be done”), a source link, and “not useful” feedback' },
  { assumption: 'Governance and AI cost stay in check', level: 'Low', why: 'FY24 open sharing was rolled back at 14 accounts', mitigation: 'Same-series records the user can already access; no new meeting processing' },
];

const levelStyle: Record<Level, string> = {
  Highest: 'bg-[var(--deck-accent)] text-white',
  High: 'bg-[var(--deck-callout)] text-[var(--deck-callout-text)]',
  Medium: 'bg-[var(--deck-tone-2)] text-[var(--deck-ink)]',
  Low: 'bg-[var(--deck-tone-3)] text-[var(--deck-muted)]',
};

const grid = 'grid grid-cols-[50px_minmax(0,1.05fr)_minmax(0,1.15fr)_40px_minmax(0,1.3fr)] items-center gap-x-[22px]';

export default function KeyRisksSlide() {
  return (
    <SlideFrame section={metadata.section} source="Heads-Up Phase 1 brief, Key Assumptions · Kilts Center Ansel case (2026), Ex 3, 5, 9">
      <div className="absolute inset-x-[104px] top-[150px]">
        <Reveal>
          <Headline style={{ fontSize: 56 }} secondary="Our riskiest assumption is that meetings leave light users an open item. The pilot tests it first.">
            Key risks
          </Headline>
        </Reveal>
      </div>

      <div className="absolute inset-x-[104px] top-[360px]">
        <Reveal className={`${grid} pb-[12px]`}>
          <span />
          <span className="text-[18px] font-semibold uppercase tracking-[0.1em] text-[var(--deck-muted)]">Assumption</span>
          <span className="text-[18px] font-semibold uppercase tracking-[0.1em] text-[var(--deck-muted)]">Risk and why it matters</span>
          <span />
          <span className="text-[18px] font-semibold uppercase tracking-[0.1em] text-[var(--deck-accent)]">Mitigation</span>
        </Reveal>
        {risks.map((risk, index) => (
          <Reveal key={risk.assumption} delay={100 + index * 80} className={`${grid} border-t border-[var(--deck-hairline)] py-[14px]`}>
            <span className={`flex h-[44px] w-[44px] items-center justify-center rounded-full font-display text-[22px] font-extrabold ${index === 0 ? 'bg-[var(--deck-accent)] text-white' : 'bg-[var(--deck-tone-3)] text-[var(--deck-ink)]'}`}>{index + 1}</span>
            <p className="text-[22px] font-semibold leading-[1.3]">{risk.assumption}</p>
            <div className="flex items-start gap-[12px]">
              <span className={`mt-[2px] flex-shrink-0 rounded-full px-[12px] py-[3px] text-[16px] font-semibold ${levelStyle[risk.level]}`}>{risk.level}</span>
              <p className="text-[20px] leading-[1.3] text-[var(--deck-muted)]">{risk.why}</p>
            </div>
            <ArrowRight size={24} className="text-[var(--deck-secondary)]" />
            <p className="rounded-[16px] bg-white/55 px-[18px] py-[10px] text-[20px] leading-[1.3]">{risk.mitigation}</p>
          </Reveal>
        ))}
      </div>
    </SlideFrame>
  );
}
