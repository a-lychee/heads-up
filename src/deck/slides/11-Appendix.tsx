import { Headline } from '../components/Headline';
import { Reveal } from '../components/Reveal';
import { SlideFrame } from '../components/SlideFrame';
import type { SlideMetadata } from '../types';

export const metadata: SlideMetadata = {
  id: 'appendix',
  title: 'Appendix',
  section: 'Appendix',
  notes: 'Use the following slides for detailed questions about governance, permissions, and cost.',
};

export default function AppendixSlide() {
  return (
    <SlideFrame section={metadata.section}>
      <div className="absolute inset-x-[104px] top-[365px]">
        <Reveal><Headline style={{ fontSize: 150 }}>Appendix</Headline></Reveal>
        <Reveal delay={140}><div className="mt-[55px] h-[8px] w-[150px] rounded-full bg-[var(--deck-accent)]" /></Reveal>
      </div>
    </SlideFrame>
  );
}
