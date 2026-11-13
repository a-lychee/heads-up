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
  // Skit script from Heads-Up_Skit_Script.pdf. Line breaks show in the editor and presenter notes.
  notes: `POST-SKIT: “The Secret” (Varun, Aryan, Alicia)

[After the meeting. Alicia walks over to Varun, impressed. Aryan hovers nearby.]
ALICIA: Varun. What is going on with you? Forecast done. Launch date sorted. You even remembered the pricing page. What’s your secret? Meditation? Twelve coffees? Did you clone yourself?
VARUN: (calm, holds up his phone) I just get a heads-up.
[The Heads-Up Slack card appears on screen.]
VARUN: Thirty minutes before every meeting, Ansel tells me what’s on my plate, what’s still open and what we decided. Takes thirty seconds.
ALICIA: Wait. Is this the same Ansel we were about to cut because no one was using it?
VARUN: That one.
ALICIA: (long pause, completely serious) That’s it. We’re firing our CTO. Varun, you’re the new CTO.
ARYAN: Wait. I thought I was up for a promotion!
[Alicia and Varun walk off. Aryan is left alone, tangled in the kitchen roll.]
ARYAN: (to the audience, struggling with the scroll) So… do we still need this?

Props: phone, the same kitchen roll, Heads-Up Slack card on screen. Show the card the moment Varun holds up his phone, and hold a full beat of silence before the CTO line. Aryan’s scroll line is the final laugh, so let it breathe.

AFTER THE SKIT: Bring the team slide back up. Pause on it, then advance to the updated version.`,
};

export default function TeamAgainSlide() {
  return (
    <SlideFrame section={metadata.section}>
      <div className="absolute inset-x-[104px] top-[180px]">
        <Reveal><Headline>Meet Team License to Kilts.</Headline></Reveal>
        <TeamGrid />
      </div>
    </SlideFrame>
  );
}
