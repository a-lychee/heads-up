import type { SlideDefinition } from '../types';
import TeamSlide, { metadata as team } from './01-Team';
import TitleSlide, { metadata as title } from './02-Title';
import ContextSlide, { metadata as context } from './03-Context';
import PersonaSlide, { metadata as persona } from './04-Persona';
import ShiftSlide, { metadata as shift } from './05-Shift';
import DemoSlide, { metadata as demo } from './06-Demo';
import LearningsSlide, { metadata as learnings } from './07-Learnings';
import NextSlide, { metadata as next } from './08-Next';
import ThankYouSlide, { metadata as thankYou } from './09-ThankYou';
import TeamAgainSlide, { metadata as teamAgain } from './10-TeamAgain';
import TeamUpdateSlide, { metadata as teamUpdate } from './11-TeamUpdate';
import AppendixSlide, { metadata as appendix } from './12-Appendix';
import GovernanceSlide, { metadata as governance } from './13-Governance';
import WhyLightUsersSlide, { metadata as whyLightUsers } from './14-WhyLightUsers';
import WhyThisProblemSlide, { metadata as whyThisProblem } from './15-WhyThisProblem';
import MarketMathSlide, { metadata as marketMath } from './16-MarketMath';
import AlternativesSlide, { metadata as alternatives } from './17-Alternatives';
import KeyRisksSlide, { metadata as keyRisks } from './18-KeyRisks';
import SuccessMetricsSlide, { metadata as successMetrics } from './19-SuccessMetrics';

export const slides: SlideDefinition[] = [
  { Component: TeamSlide, ...team },
  { Component: TitleSlide, ...title },
  { Component: ContextSlide, ...context },
  { Component: PersonaSlide, ...persona },
  { Component: ShiftSlide, ...shift },
  { Component: DemoSlide, ...demo },
  { Component: LearningsSlide, ...learnings },
  { Component: NextSlide, ...next },
  { Component: ThankYouSlide, ...thankYou },
  { Component: TeamAgainSlide, ...teamAgain },
  { Component: TeamUpdateSlide, ...teamUpdate },
  { Component: AppendixSlide, ...appendix },
  { Component: GovernanceSlide, ...governance },
  { Component: WhyLightUsersSlide, ...whyLightUsers },
  { Component: WhyThisProblemSlide, ...whyThisProblem },
  { Component: MarketMathSlide, ...marketMath },
  { Component: AlternativesSlide, ...alternatives },
  { Component: KeyRisksSlide, ...keyRisks },
  { Component: SuccessMetricsSlide, ...successMetrics },
];
