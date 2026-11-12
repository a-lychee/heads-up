import { Headline } from '../components/Headline';
import { SlideFrame } from '../components/SlideFrame';
import type { SlideMetadata } from '../types';
import { TeamGrid } from './01-Team';

// Same layout as the team slide, with no fade-in, so the edits read as a live correction:
// Rishabh's role is struck, then "Varun's Teammate" and "Varun's Manager", then Varun's "Software Engineer" becomes CTO.
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
            struck: { 'rishabh-title': 500, 'rishabh-company': 560, 'rishabh-note': 650, 'aryan-note': 1000, 'alicia-note': 1300, 'varun-title': 1700 },
            corrections: { varun: { text: 'CTO', delay: 2100 } },
          }}
        />
      </div>
    </SlideFrame>
  );
}
