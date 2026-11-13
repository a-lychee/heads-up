import { Headline } from '../components/Headline';
import { SlideFrame } from '../components/SlideFrame';
import type { SlideMetadata } from '../types';
import { TeamGrid } from './01-Team';

// Same layout as the team slide, with no fade-in, so the edits read as a live correction:
// Order: "Varun's Teammate", then "Varun's Manager", then Rishabh's CTO role, then Varun's "Software Engineer" becomes CTO.
export const metadata: SlideMetadata = {
  id: 'team-update',
  title: 'Meet the team (updated)',
  section: 'Q&A',
  notes: 'Let the edits play: Rishabh’s CTO role is crossed out, Aryan and Alicia stop being defined by Varun, and Varun is now CTO.',
};

export default function TeamUpdateSlide() {
  return (
    <SlideFrame section={metadata.section}>
      <div className="absolute inset-x-[104px] top-[180px]">
        <Headline>Meet the team.</Headline>
        <TeamGrid
          reveal={false}
          edits={{
            struck: { 'aryan-note': 500, 'alicia-note': 950, 'rishabh-title': 1400, 'rishabh-company': 1460, 'rishabh-note': 1550, 'varun-title': 2000 },
            corrections: { varun: { text: 'CTO', delay: 2350 } },
          }}
        />
      </div>
    </SlideFrame>
  );
}
