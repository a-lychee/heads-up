import { AlertTriangle, ArrowDown, FlaskConical } from 'lucide-react';
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
const levelRank: Record<Level, number> = { Low: 1, Medium: 2, High: 3, Highest: 4 };

// Heads-Up Phase 1 brief, Key Assumptions; case Ex 3, 5, 9.
const riskiest = {
  assumption: 'Meetings leave an item the user owns or that is open',
  level: 'Highest' as Level,
  why: 'With no item there is no card, so no habit forms',
  mitigation: 'Post only when recent summaries hold an item; the pilot tracks how many meetings produce a card',
};

const alsoOnTheList: { assumption: string; level: Level; why: string; mitigation: string }[] = [
  { assumption: 'Value moments drive seat retention', level: 'High', why: 'Today’s evidence is correlational (46% vs. 34%)', mitigation: 'A randomized holdout measures the causal lift, with 60-day activity as the early read' },
  { assumption: 'Users open a calendar-timed Slack card', level: 'Medium', why: 'Must perform closer to Slack links (46%) and push (39%) than email (18%)', mitigation: 'Post at the meeting reminder only when there is an item; tune timing against the digest' },
  { assumption: 'Ansel identifies action-item owners correctly', level: 'Medium', why: 'A wrong owner erodes trust in the card', mitigation: 'Hedged wording (“may already be done”), a source link, and “not useful” feedback' },
  { assumption: 'Governance and AI cost stay in check', level: 'Low', why: 'FY24 open sharing was rolled back after objections at 14 accounts', mitigation: 'Same-series records the user can already access; no new meeting processing' },
];

/** Four-segment severity meter. The riskiest assumption is the only one shown filled in accent. */
function SeverityMeter({ level, highlight = false }: { level: Level; highlight?: boolean }) {
  const filled = levelRank[level];
  return (
    <span className="flex items-center gap-[12px]">
      <span className="flex items-center gap-[5px]">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className="h-[9px] w-[26px] rounded-full"
            style={{
              background:
                i < filled
                  ? highlight
                    ? 'var(--deck-accent)'
                    : 'var(--deck-tone-1)'
                  : 'var(--deck-tone-3)',
            }}
          />
        ))}
      </span>
      <span
        className={`whitespace-nowrap text-[18px] font-semibold ${highlight ? 'text-[var(--deck-accent)]' : 'text-[var(--deck-muted)]'}`}
      >
        {level}
      </span>
    </span>
  );
}

const label = 'text-[17px] font-semibold uppercase tracking-[0.1em] text-[var(--deck-muted)]';
const rowGrid = 'grid grid-cols-[minmax(0,1fr)_200px_minmax(0,1.15fr)] items-center gap-x-[28px]';

export default function KeyRisksSlide() {
  return (
    <SlideFrame section={metadata.section} source="Heads-Up Phase 1 brief, Key Assumptions · Kilts Center Ansel case (2026), Ex 3, 5, 9">
      <div className="absolute inset-x-[104px] top-[136px] bottom-[76px] flex flex-col">
        <Reveal>
          <Headline style={{ fontSize: 54 }}>Key risks</Headline>
          <p className="mt-[12px] text-[26px] leading-[1.25] text-[var(--deck-muted)]">
            Five assumptions behind Heads-Up. The first one decides whether the rest matter.
          </p>
        </Reveal>

        {/* The riskiest assumption, raised above the rest. */}
        <Reveal delay={140} className="mt-[30px]">
          <div
            className="flex items-center gap-[46px] rounded-[32px] px-[42px] py-[30px]"
            style={{
              background: 'var(--deck-callout)',
              border: '1px solid color-mix(in srgb, var(--deck-accent) 30%, transparent)',
              boxShadow:
                '0 40px 90px rgba(70, 30, 60, 0.18), 0 0 0 9px color-mix(in srgb, var(--deck-accent) 7%, transparent)',
            }}
          >
            <div className="min-w-0 flex-1">
              <span className="inline-flex items-center gap-[10px] rounded-full bg-[var(--deck-accent)] px-[18px] py-[7px] text-[19px] font-semibold uppercase tracking-[0.1em] text-white">
                <AlertTriangle size={20} strokeWidth={2.4} />
                Riskiest assumption
              </span>
              <h2 className="mt-[16px] font-display text-[46px] font-extrabold leading-[1.06] tracking-[-0.03em] text-[var(--deck-ink)]">
                {riskiest.assumption}
              </h2>
              <p className="mt-[10px] text-[22px] leading-[1.25] text-[var(--deck-callout-text)]">{riskiest.why}</p>
              <p className="mt-[18px] flex items-start gap-[12px] text-[20px] leading-[1.3] text-[var(--deck-muted)]">
                <FlaskConical size={22} className="mt-[2px] flex-shrink-0 text-[var(--deck-accent)]" />
                <span>
                  <span className="font-semibold text-[var(--deck-ink)]">Pilot test:</span> {riskiest.mitigation}
                </span>
              </p>
            </div>

            {/* The failure chain, if the assumption is wrong. */}
            <div className="flex w-[330px] flex-shrink-0 flex-col items-center">
              <span className={`${label} self-start`}>If this fails</span>
              <div className="mt-[14px] flex flex-col items-center gap-[8px]">
                {['No item', 'No card', 'No habit'].map((step, i) => (
                  <div key={step} className="flex flex-col items-center gap-[8px]">
                    {i > 0 && <ArrowDown size={22} className="text-[var(--deck-accent)]" strokeWidth={2.4} />}
                    <span
                      className={`w-[220px] rounded-full px-[20px] py-[9px] text-center text-[21px] font-semibold ${
                        i === 2
                          ? 'bg-[var(--deck-accent)] text-white'
                          : 'bg-white/70 text-[var(--deck-callout-text)]'
                      }`}
                    >
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Everything else, ranked. */}
        <div className="mt-[26px] flex min-h-0 flex-1 flex-col">
          <Reveal delay={280} className={`${rowGrid} pb-[10px]`}>
            <span className={label}>Also on the list</span>
            <span className={label}>Severity</span>
            <span className={label}>Mitigation</span>
          </Reveal>
          {alsoOnTheList.map((risk, index) => (
            <Reveal
              key={risk.assumption}
              delay={340 + index * 80}
              className={`${rowGrid} min-h-0 flex-1 border-t border-[var(--deck-hairline)]`}
            >
              <div className="min-w-0">
                <p className="text-[22px] font-semibold leading-[1.25]">{risk.assumption}</p>
                <p className="mt-[3px] text-[19px] leading-[1.25] text-[var(--deck-muted)]">{risk.why}</p>
              </div>
              <SeverityMeter level={risk.level} />
              <p className="text-[19px] leading-[1.3] text-[var(--deck-muted)]">{risk.mitigation}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </SlideFrame>
  );
}
