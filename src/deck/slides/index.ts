import type { SlideDefinition } from '../types';
import TitleSlide, { metadata as title } from './01-Title';
import TeamSlide, { metadata as team } from './02-Team';
import ContextSlide, { metadata as context } from './03-Context';
import ProblemSlide, { metadata as problem } from './04-Problem';
import TodaySlide, { metadata as today } from './05-Today';
import DemoSlide, { metadata as demo } from './06-Demo';
import LearningsSlide, { metadata as learnings } from './07-Learnings';
import NextSlide, { metadata as next } from './08-Next';
import ThankYouSlide, { metadata as thankYou } from './09-ThankYou';
import AppendixSlide, { metadata as appendix } from './10-Appendix';
import GovernanceSlide, { metadata as governance } from './11-Governance';
import OpportunitySlide, { metadata as opportunity } from './12-Opportunity';

export const slides: SlideDefinition[] = [
  { Component: TitleSlide, ...title },
  { Component: TeamSlide, ...team },
  { Component: ContextSlide, ...context },
  { Component: ProblemSlide, ...problem },
  { Component: TodaySlide, ...today },
  { Component: DemoSlide, ...demo },
  { Component: LearningsSlide, ...learnings },
  { Component: NextSlide, ...next },
  { Component: ThankYouSlide, ...thankYou },
  { Component: AppendixSlide, ...appendix },
  { Component: GovernanceSlide, ...governance },
  { Component: OpportunitySlide, ...opportunity },
];
