import { Check, Minus, X } from 'lucide-react';
import { Headline } from '../components/Headline';
import { Reveal } from '../components/Reveal';
import { SlideFrame } from '../components/SlideFrame';
import type { SlideMetadata } from '../types';

export const metadata: SlideMetadata = {
  id: 'alternatives',
  title: 'Alternatives',
  section: 'Appendix',
  notes: 'Suite briefs are limited to their own platform or need an add-on license. Personal notetakers serve people who chose them, which light users rarely do. Manual prep is free but skipped. Heads-Up is the only option that does all six.',
};

type Mark = 'yes' | 'partial' | 'no';
const options = ['Heads-Up', 'Suite briefs', 'Personal notetakers', 'Manual prep'];
// Team assessment, from the Phase 2 appendix.
const criteria: { name: string; detail: string; marks: Mark[]; comment: string }[] = [
  { name: 'No new cost', detail: 'comes with the seat already paid for', marks: ['yes', 'partial', 'no', 'yes'], comment: 'Suite briefs can need an add-on license' },
  { name: 'Any platform', detail: 'works wherever Ansel records', marks: ['yes', 'no', 'partial', 'yes'], comment: 'Suite briefs stay inside their own platform' },
  { name: 'Reaches non-choosers', detail: 'serves users who never picked a tool', marks: ['yes', 'partial', 'no', 'yes'], comment: 'Light users rarely choose personal notetakers' },
  { name: 'Right moment', detail: 'before the next recurring meeting', marks: ['yes', 'partial', 'no', 'partial'], comment: 'Manual prep is often skipped' },
  { name: 'Source-linked', detail: 'each item links to where it was said', marks: ['yes', 'partial', 'partial', 'no'], comment: 'Users double-check commitments and numbers' },
  { name: 'No effort', detail: 'no rereading notes or asking a colleague', marks: ['yes', 'partial', 'partial', 'no'], comment: 'Asking a colleague draws on their time' },
];

const grid = 'grid grid-cols-[minmax(0,1.5fr)_repeat(4,150px)_minmax(0,1fr)] items-center gap-x-[18px]';

function MarkIcon({ mark, ours }: { mark: Mark; ours: boolean }) {
  if (mark === 'yes') {
    return (
      <span className={`flex h-[40px] w-[40px] items-center justify-center rounded-full ${ours ? 'bg-[var(--deck-accent)] text-white' : 'bg-[var(--deck-ink)] text-white'}`} aria-label="Yes">
        <Check size={22} strokeWidth={3} />
      </span>
    );
  }
  if (mark === 'partial') {
    return <span className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[var(--deck-tone-2)] text-[var(--deck-ink)]" aria-label="Partly"><Minus size={22} strokeWidth={3} /></span>;
  }
  return <span className="flex h-[40px] w-[40px] items-center justify-center rounded-full border-2 border-[var(--deck-tone-1)] text-[var(--deck-secondary)]" aria-label="No"><X size={20} strokeWidth={3} /></span>;
}

export default function AlternativesSlide() {
  return (
    <SlideFrame section={metadata.section} source="Team assessment · Kilts Center Ansel case (2026), Ex 5, 7, 8; team interviews, Oct 2026">
      <div className="absolute inset-x-[104px] top-[150px]">
        <Reveal>
          <Headline style={{ fontSize: 56 }} secondary="Only Heads-Up preps light users on any platform with no new license.">
            Alternatives
          </Headline>
        </Reveal>
      </div>

      <div className="absolute inset-x-[104px] top-[350px]">
        <div className="relative">
        {/* Highlight behind the Heads-Up column (table only, not the legend) */}
        <div className={`${grid} pointer-events-none absolute inset-x-0 -bottom-[10px] -top-[14px]`} aria-hidden="true">
          <span />
          <div className="h-full rounded-[24px] border-2 border-[var(--deck-accent)] bg-[var(--deck-card)] shadow-[var(--deck-card-shadow)]" />
        </div>

        <Reveal className={`${grid} relative pb-[14px]`}>
          <span className="text-[18px] font-semibold uppercase tracking-[0.1em] text-[var(--deck-muted)]">What light users need</span>
          {options.map((option, index) => (
            <p key={option} className={`text-center text-[21px] font-semibold leading-[1.15] ${index === 0 ? 'text-[var(--deck-accent)]' : ''}`}>{option}</p>
          ))}
          <span className="text-[18px] font-semibold uppercase tracking-[0.1em] text-[var(--deck-muted)]">Why</span>
        </Reveal>

        {criteria.map((row, index) => (
          <Reveal key={row.name} delay={100 + index * 70} className={`${grid} relative border-t border-[var(--deck-hairline)] py-[13px]`}>
            <p className="text-[22px] leading-[1.3]">
              <span className="font-semibold">{row.name}:</span> <span className="text-[var(--deck-muted)]">{row.detail}</span>
            </p>
            {row.marks.map((mark, col) => (
              <div key={col} className="flex justify-center"><MarkIcon mark={mark} ours={col === 0} /></div>
            ))}
            <p className="text-[19px] leading-[1.3] text-[var(--deck-muted)]">{row.comment}</p>
          </Reveal>
        ))}
        </div>

        <Reveal delay={600} className="relative mt-[26px] flex items-center gap-[28px] text-[18px] text-[var(--deck-muted)]">
          <span className="flex items-center gap-[10px]"><MarkIcon mark="yes" ours={false} /> Yes</span>
          <span className="flex items-center gap-[10px]"><MarkIcon mark="partial" ours={false} /> Partly</span>
          <span className="flex items-center gap-[10px]"><MarkIcon mark="no" ours={false} /> No</span>
        </Reveal>
      </div>
    </SlideFrame>
  );
}
