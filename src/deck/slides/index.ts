import type { SlideDefinition } from '../types';
import TeamSlide, { metadata as team } from './01-Team';
import ContextSlide, { ContextDeclineSlide, ContextGrowthSlide, declineMetadata as contextDecline, growthMetadata as contextGrowth, metadata as context } from './02-Context';
import TargetUserSlide, { TargetUserIdleSlide, TargetUserOursSlide, idleMetadata as targetUserIdle, metadata as targetUser, oursMetadata as targetUserOurs } from './02b-TargetUser';
import PersonaSlide, { metadata as persona } from './03-Persona';
import TitleSlide, { metadata as title } from './04-Title';
import ShiftSlide, { metadata as shift } from './05-Shift';
import DemoSlide, { metadata as demo } from './06-Demo';
import LearningsSlide, { metadata as learnings } from './07-Learnings';
import NextSlide, { metadata as next } from './08-Next';
import TeamAgainSlide, { metadata as teamAgain } from './09-TeamAgain';
import TeamUpdateSlide, { metadata as teamUpdate } from './10-TeamUpdate';
import ThankYouSlide, { metadata as thankYou } from './11-ThankYou';
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
  { Component: ContextSlide, ...context },
  { Component: ContextGrowthSlide, ...contextGrowth },
  { Component: ContextDeclineSlide, ...contextDecline },
  { Component: TargetUserSlide, ...targetUser },
  { Component: TargetUserIdleSlide, ...targetUserIdle },
  { Component: TargetUserOursSlide, ...targetUserOurs },
  { Component: PersonaSlide, ...persona },
  { Component: TitleSlide, ...title },
  { Component: ShiftSlide, ...shift },
  { Component: DemoSlide, ...demo },
  { Component: LearningsSlide, ...learnings },
  { Component: NextSlide, ...next },
  { Component: TeamAgainSlide, ...teamAgain },
  { Component: TeamUpdateSlide, ...teamUpdate },
  { Component: ThankYouSlide, ...thankYou },
  { Component: AppendixSlide, ...appendix },
  { Component: GovernanceSlide, ...governance },
  { Component: WhyLightUsersSlide, ...whyLightUsers },
  { Component: WhyThisProblemSlide, ...whyThisProblem },
  { Component: MarketMathSlide, ...marketMath },
  { Component: AlternativesSlide, ...alternatives },
  { Component: KeyRisksSlide, ...keyRisks },
  { Component: SuccessMetricsSlide, ...successMetrics },
];
