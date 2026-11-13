import { Compass, ShieldCheck, Sprout, Target } from 'lucide-react';
import { Headline } from '../components/Headline';
import { Reveal } from '../components/Reveal';
import { SlideFrame } from '../components/SlideFrame';
import type { SlideMetadata } from '../types';

export const metadata: SlideMetadata = {
  id: 'why-this-problem',
  title: 'Why this problem',
  section: 'Appendix',
  notes: 'We weighed all four of the case’s hypotheses. Value has the strongest evidence, so we lead with it, and we use discovery (showing up in Slack at the right moment) to deliver it. Activation and trust matter less for this user.',
};

const hypotheses = [
  {
    icon: Target, name: 'Value / job to be done', read: 'Primary · High', tier: 'primary',
    evidence: 'Summaries get 22 seconds of reading, and only 6% of 4.7 action items per meeting are marked complete.',
    quote: 'We talk about something and I forget what we talked about. Annoying for next week.', who: 'Light user, team interview',
  },
  {
    icon: Compass, name: 'Discovery and habit', read: 'Secondary · High', tier: 'secondary',
    evidence: 'Email digests get 18% opens vs. 46% for Slack/Teams links. Light users who return via links retain 46% vs. 34%.',
    quote: 'I turned off the email digest after the first month.', who: 'Case interview, Ex 7',
  },
  {
    icon: Sprout, name: 'Activation', read: 'Our read · Medium', tier: 'other',
    evidence: 'Of 100 new seats, 44 open a note and 31 come back in week 2.',
    quote: 'Once it joined a real project review and I saw the decisions laid out, I understood the point.', who: 'Case interview, Ex 7',
  },
  {
    icon: ShieldCheck, name: 'Trust', read: 'Our read · Low', tier: 'other',
    evidence: '37% jump to the cited moment after an Ask Ansel answer.',
    quote: 'For a commitment, a number, or who approved something, I double-check.', who: 'Case interview, Ex 7',
  },
] as const;

export default function WhyThisProblemSlide() {
  return (
    <SlideFrame section={metadata.section} source="Kilts Center Ansel case (2026), Ex 2, 3, 5, 7; team interviews, Oct 2026">
      <div className="absolute inset-x-[104px] top-[150px]">
        <Reveal>
          <Headline style={{ fontSize: 56 }} secondary="Value has the strongest evidence, so we lead with it and use discovery to deliver it.">
            Why this problem
          </Headline>
        </Reveal>
      </div>

      <div className="absolute inset-x-[104px] top-[360px] bottom-[110px] grid grid-cols-4 gap-[22px]">
        {hypotheses.map(({ icon: Icon, ...h }, index) => {
          const primary = h.tier === 'primary';
          const secondary = h.tier === 'secondary';
          return (
            <Reveal key={h.name} delay={120 + index * 90} className="h-full">
              <div
                className={`flex h-full flex-col rounded-[28px] px-[28px] py-[28px] ${
                  primary
                    ? 'border-2 border-[var(--deck-accent)] bg-[var(--deck-card)] shadow-[var(--deck-card-shadow)]'
                    : secondary
                      ? 'border border-white/80 bg-[var(--deck-card)]'
                      : 'border border-white/70 bg-white/45'
                }`}
              >
                <div className={`flex h-[64px] w-[64px] items-center justify-center rounded-[18px] ${primary || secondary ? 'bg-[var(--deck-accent)] text-white' : 'bg-[var(--deck-tone-3)] text-[var(--deck-secondary)]'}`}>
                  <Icon size={32} strokeWidth={1.8} />
                </div>
                <p className={`mt-[22px] font-display text-[30px] font-extrabold leading-[1.1] tracking-[-0.03em] ${primary || secondary ? '' : 'text-[var(--deck-secondary)]'}`}>{h.name}</p>
                <span className={`mt-[12px] self-start rounded-full px-[14px] py-[5px] text-[17px] font-semibold ${primary || secondary ? 'bg-[var(--deck-callout)] text-[var(--deck-callout-text)]' : 'bg-[var(--deck-tone-3)] text-[var(--deck-muted)]'}`}>
                  {h.read}
                </span>
                <p className="mt-[20px] text-[21px] leading-[1.38]">{h.evidence}</p>
                <div className="mt-auto border-t border-[var(--deck-hairline)] pt-[16px]">
                  <p className="text-[20px] leading-[1.35] text-[var(--deck-muted)]">“{h.quote}”</p>
                  <p className="mt-[6px] text-[17px] text-[var(--deck-muted)]">{h.who}</p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </SlideFrame>
  );
}
