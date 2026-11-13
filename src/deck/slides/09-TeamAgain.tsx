import { Headline } from '../components/Headline';
import { Reveal } from '../components/Reveal';
import { SlideFrame } from '../components/SlideFrame';
import type { SlideMetadata } from '../types';
import { TeamGrid } from './01-Team';

// A copy of the opening team slide, shown again right before the "updated" version.
export const metadata: SlideMetadata = {
  id: 'team-again',
  title: 'Meet the team (again)',
  section: 'Q&A',
  notes: 'Bring the team slide back up. Pause on it, then advance to the updated version.',
};

export default function TeamAgainSlide() {
  return (
    <SlideFrame section={metadata.section}>
      <div className="absolute inset-x-[104px] top-[180px]">
        <Reveal><Headline>Meet the team.</Headline></Reveal>
        <TeamGrid />
      </div>
    </SlideFrame>
  );
}
