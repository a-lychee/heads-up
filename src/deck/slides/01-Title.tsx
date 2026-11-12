import { Headline } from '../components/Headline';
import { Reveal } from '../components/Reveal';
import { SlideFrame } from '../components/SlideFrame';
import type { SlideMetadata } from '../types';
import geometric from '@/assets/concept-a1-geometric.jpg';
import line from '@/assets/concept-a2-line.jpg';
import silhouette from '@/assets/concept-a3-silhouette.jpg';

export const metadata: SlideMetadata = {
  id: 'title',
  title: 'Heads-Up',
  section: 'Kilts Product Competition 2026',
  notes: 'Open with the simple promise: Ansel’s record, returned before the next recurring meeting. This is a private, timely Slack card—not another summary to find.',
};

// Visual concept options to pick from (temporary — keep one).
const concepts = [
  { key: 'A1', label: 'Flat geometric', src: geometric },
  { key: 'A2', label: 'Single line', src: line },
  { key: 'A3', label: 'Silhouette', src: silhouette },
];

export default function TitleSlide() {
  return (
    <SlideFrame section={metadata.section}>
      <div className="absolute inset-x-[104px] top-[170px] bottom-[70px] flex items-center gap-[64px]">
        <div className="w-[860px] flex-shrink-0">
          <Reveal>
            <Headline style={{ fontSize: 142 }} secondary={<span className="mt-[22px] block text-[58px] leading-[1.04]">Take credit, not notes.</span>}>
              Heads-Up
            </Headline>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-[42px] max-w-[760px] text-[28px] leading-[1.42] text-[var(--deck-muted)]">
              A Slack card before every recurring meeting: what you own, what&apos;s still open, what was decided.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-[70px] text-[20px] text-[var(--deck-muted)]">Team License to Kiltz · Chicago Booth · November 2026</p>
          </Reveal>
        </div>

        <div className="flex w-[790px] flex-shrink-0 flex-col gap-[22px]">
          <Reveal delay={180}>
            <figure className="overflow-hidden rounded-[24px] border border-[var(--deck-secondary)]/20 shadow-[0_24px_60px_-30px_rgba(42,29,23,0.5)]">
              <img src={concepts[0].src} alt={concepts[0].label} width={1024} height={768} className="h-[430px] w-full object-cover" />
            </figure>
            <p className="mt-[8px] text-[20px] text-[var(--deck-muted)]"><b className="text-[var(--deck-accent)]">{concepts[0].key}</b> · {concepts[0].label}</p>
          </Reveal>
          <div className="grid grid-cols-2 gap-[22px]">
            {concepts.slice(1).map((c, i) => (
              <Reveal key={c.key} delay={260 + i * 80}>
                <figure className="overflow-hidden rounded-[20px] border border-[var(--deck-secondary)]/20">
                  <img src={c.src} alt={c.label} width={1024} height={768} loading="lazy" className="h-[230px] w-full object-cover" />
                </figure>
                <p className="mt-[8px] text-[20px] text-[var(--deck-muted)]"><b className="text-[var(--deck-accent)]">{c.key}</b> · {c.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}
