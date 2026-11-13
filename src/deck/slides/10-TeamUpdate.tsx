import { Headline } from '../components/Headline';
import { SlideFrame } from '../components/SlideFrame';
import type { SlideMetadata } from '../types';
import { TeamGrid } from './01-Team';

// Same layout as the team slide, with no fade-in, so the edits read as a live correction:
// Order: "Varun's Teammate", then "Varun's Manager", then Rishabh's CTO role (and "Currently OOO" becomes "Permanently OOO"),
// then Varun's "Software Engineer" becomes CTO. No crossfade from the team slide before it.
export const metadata: SlideMetadata = {
  id: 'team-update',
  title: 'Meet the team (updated)',
  section: 'Q&A',
  transition: 'none',
  notes: 'Let the edits play: Rishabh’s CTO role is crossed out, Aryan and Alicia stop being defined by Varun, and Varun is now CTO.',
};

export default function TeamUpdateSlide() {
  return (
    <SlideFrame section={metadata.section}>
      <div className="absolute inset-x-[104px] top-[180px]">
        <Headline>Meet Team Product to Kilts.</Headline>
        <TeamGrid
          reveal={false}
          edits={{
            struck: { 'aryan-note': 500, 'alicia-note': 950, 'rishabh-title': 1400, 'rishabh-company': 1460, 'varun-title': 2200 },
            corrections: { varun: { text: 'CTO', delay: 2550 } },
            replacements: { 'rishabh-note': { from: 'Currently', to: 'Permanently', delay: 1750 } },
          }}
        />
      </div>
    </SlideFrame>
  );
}
