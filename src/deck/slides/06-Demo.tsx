import { ArrowUpRight, CalendarCheck, CalendarDays, Clock, KeyRound, Mic, Plug } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Headline } from '../components/Headline';
import { Reveal } from '../components/Reveal';
import { SlideFrame } from '../components/SlideFrame';
import type { SlideMetadata } from '../types';

export const metadata: SlideMetadata = {
  id: 'demo',
  title: 'Demo',
  section: '02 · Demo',
  notes: 'Set the scene: Varun is one of seven software engineers on the team and new to the project, with a weekly product sync in 30 minutes. He does not remember what was discussed last week, and like most light users he does not review Ansel summaries after meetings. Four things are already true: his manager invited him and gave him permission to review last meeting’s transcript, he is on the invite, he connected his calendar and Slack to Ansel, and he attended last week with Ansel recording. Then switch to the demo tab.',
};

// The situation (left third)
const traits = [
  'One of 7 engineers on the team',
  'New to the project',
  'Can’t recall last week’s meeting',
  'Skips Ansel summaries after meetings',
];

// What is already true (right two-thirds). These are the demo's preconditions, and they keep it inside today's permissions.
const assumptions = [
  { icon: KeyRound, title: 'Permission to review', body: 'His manager, who uses Ansel, invited him to the series and gave explicit permission to review last meeting’s transcript.' },
  { icon: CalendarCheck, title: 'On the invite', body: 'Varun is an invitee to the upcoming meeting.' },
  { icon: Plug, title: 'Already connected', body: 'He heard about the new Ansel feature and connected both his calendar and Slack, so both are set up.' },
  { icon: Mic, title: 'Recorded last week', body: 'He was in last week’s sync, where Ansel was already running, and he acknowledged the meeting was being recorded.' },
];

function Label({ children }: { children: string }) {
  return <p className="text-[20px] font-semibold uppercase tracking-[0.1em] text-[var(--deck-muted)]">{children}</p>;
}

export default function DemoSlide() {
  return (
    <SlideFrame section={metadata.section}>
      <div className="absolute inset-x-[104px] top-[160px]">
        <Reveal>
          <Headline style={{ fontSize: 64 }} secondary="Now imagine you’re Varun, 30 minutes before your meeting">
            Demo
          </Headline>
        </Reveal>
      </div>

      <div className="absolute inset-x-[104px] top-[370px] bottom-[96px] grid grid-cols-[520px_1fr] gap-[56px]">
        {/* Left third: the situation */}
        <div className="flex flex-col">
          <Reveal delay={100}><Label>The situation</Label></Reveal>
          <Reveal delay={160} className="mt-[14px]">
            <div className="rounded-[28px] border border-white/70 bg-[var(--deck-card)] px-[28px] py-[24px] shadow-[var(--deck-card-shadow)]">
              <div className="flex items-center gap-[16px]">
                <div className="flex h-[60px] w-[60px] flex-shrink-0 items-center justify-center rounded-[16px] bg-[var(--deck-callout)] text-[var(--deck-accent)]">
                  <CalendarDays size={30} strokeWidth={1.8} />
                </div>
                <div>
                  <p className="font-display text-[30px] font-extrabold leading-[1.1] tracking-[-0.03em]">Weekly Product Sync</p>
                  <p className="mt-[4px] text-[20px] text-[var(--deck-muted)]">Recurring every week</p>
                </div>
              </div>
              <p className="mt-[18px] flex items-center gap-[10px] self-start text-[20px] font-semibold text-[var(--deck-callout-text)]">
                <Clock size={20} />Starts in 30 minutes
              </p>
            </div>
          </Reveal>

          <Reveal delay={240} className="mt-[28px]">
            <p className="font-display text-[30px] font-extrabold tracking-[-0.03em] text-[var(--deck-accent)]">Varun</p>
            <ul className="mt-[12px] space-y-[14px]">
              {traits.map((trait) => (
                <li key={trait} className="flex gap-[14px] text-[24px] leading-[1.3]">
                  <span className="mt-[11px] h-[8px] w-[8px] flex-shrink-0 rounded-full bg-[var(--deck-accent)]" />
                  {trait}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={700} className="mt-auto">
            <Link to="/demo" className="inline-flex items-center gap-[10px] rounded-full bg-[var(--deck-ink)] px-[24px] py-[12px] text-[20px] font-semibold text-white">
              Open live demo <ArrowUpRight size={22} />
            </Link>
          </Reveal>
        </div>

        {/* Right two-thirds: what is already true */}
        <div className="flex min-h-0 flex-col">
          <Reveal delay={200}><Label>What’s already true</Label></Reveal>
          <div className="mt-[14px] grid min-h-0 flex-1 grid-cols-2 grid-rows-2 gap-[20px]">
            {assumptions.map(({ icon: Icon, title, body }, index) => (
              <Reveal key={title} delay={300 + index * 100} className="h-full">
                <div className="flex h-full flex-col rounded-[28px] border border-white/80 bg-white/55 px-[30px] py-[26px] backdrop-blur-[16px]">
                  <div className="flex items-center gap-[14px]">
                    <span className="flex h-[52px] w-[52px] flex-shrink-0 items-center justify-center rounded-[14px] bg-[var(--deck-accent)] text-white">
                      <Icon size={26} strokeWidth={2} />
                    </span>
                    <p className="text-[16px] font-semibold uppercase tracking-[0.1em] text-[var(--deck-muted)]">Assumption {index + 1}</p>
                  </div>
                  <p className="mt-[18px] font-display text-[30px] font-extrabold leading-[1.1] tracking-[-0.03em]">{title}</p>
                  <p className="mt-[10px] text-[22px] leading-[1.38] text-[var(--deck-muted)]">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}
