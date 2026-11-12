import type { SlideDefinition } from '../types';
import TitleSlide, { metadata as title } from './01-Title';
import TeamSlide, { metadata as team } from './02-Team';
import ProblemSlide, { metadata as problem } from './03-Problem';
import UserSlide, { metadata as user } from './04-User';
import OpportunitySlide, { metadata as opportunity } from './05-Opportunity';
import TodaySlide, { metadata as today } from './06-Today';
import DemoSlide, { metadata as demo } from './07-Demo';
import LearningsSlide, { metadata as learnings } from './08-Learnings';
import NextSlide, { metadata as next } from './09-Next';
import ThankYouSlide, { metadata as thankYou } from './10-ThankYou';
import AppendixSlide, { metadata as appendix } from './11-Appendix';
import GovernanceSlide, { metadata as governance } from './12-Governance';

export const slides: SlideDefinition[] = [
  { Component: TitleSlide, ...title },
  { Component: TeamSlide, ...team },
  { Component: ProblemSlide, ...problem },
  { Component: UserSlide, ...user },
  { Component: OpportunitySlide, ...opportunity },
  { Component: TodaySlide, ...today },
  { Component: DemoSlide, ...demo },
  { Component: LearningsSlide, ...learnings },
  { Component: NextSlide, ...next },
  { Component: ThankYouSlide, ...thankYou },
  { Component: AppendixSlide, ...appendix },
  { Component: GovernanceSlide, ...governance },
];
