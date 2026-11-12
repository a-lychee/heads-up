import { Headline } from '../components/Headline';
import { Reveal } from '../components/Reveal';
import { SlideFrame } from '../components/SlideFrame';
import type { SlideMetadata } from '../types';
import beforeAfter from '@/assets/concept-a2-before-after.png';

export const metadata: SlideMetadata = {
  id: 'title',
  title: 'Heads-Up',
  section: '00 · Intro',
  notes: 'Open with the simple promise: Ansel’s record, returned before the next recurring meeting. This is a private, timely Slack card—not another summary to find.',
};

export default function TitleSlide() {
  // Glow centered on the illustration box (left 940px, right 90px, full height).
  return (
    <SlideFrame section={metadata.section} glow={{ x: 1385, y: 540 }}>
      <div className="absolute inset-x-[104px] top-[170px] bottom-[70px] flex items-center gap-[56px]">
        <div className="w-[800px] flex-shrink-0">
          <Reveal>
            <Headline style={{ fontSize: 142 }}>Heads-Up</Headline>
          </Reveal>
          <Reveal delay={80}>
            <p
              className="mt-[28px] font-display font-extrabold text-[var(--deck-accent)]"
              style={{ fontSize: 60, lineHeight: 1.04, letterSpacing: '-0.035em' }}
            >
              Take credit, not notes.
            </p>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-[36px] max-w-[720px] text-[28px] leading-[1.45] text-[var(--deck-muted)]">
              Ansel&apos;s new meeting prep companion, built to ensure you never need to scramble for a meeting again.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-[64px] text-[20px] tracking-[0.02em] text-[var(--deck-muted)]">License to Kilts · Chicago Booth · November 2026</p>
          </Reveal>
        </div>

      </div>

      <Reveal delay={180} className="absolute inset-y-0 left-[940px] right-[90px] flex items-center">
        <img
          src={beforeAfter}
          alt="Before: a stressed man at a laptop. After: the same man relaxed with coffee as a notification arrives."
          width={972}
          height={805}
          className="h-full w-full object-contain"
        />
      </Reveal>
    </SlideFrame>
  );
}
