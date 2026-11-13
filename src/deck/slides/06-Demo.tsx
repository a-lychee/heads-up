import { ArrowUpRight, CalendarDays, Check, Clock, Hash, Lock } from 'lucide-react';
import type { ReactNode } from 'react';
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

// What is already true (right two-thirds): each card is a small mockup plus one line.
// These are the demo's preconditions, and they keep it inside today's permissions.

/** A small app window frame for the mockups. */
function Window({ title, icon, children, dark = false, badge }: { title: string; icon: ReactNode; children: ReactNode; dark?: boolean; badge?: ReactNode }) {
  return (
    <div className={`flex h-full flex-col overflow-hidden rounded-[16px] border ${dark ? 'border-[var(--deck-ink)] bg-[var(--deck-ink)]' : 'border-[var(--deck-hairline)] bg-[var(--deck-card)]'} shadow-[0_14px_30px_rgba(70,30,60,0.12)]`}>
      <div className={`flex items-center gap-[8px] px-[14px] py-[8px] text-[15px] font-semibold ${dark ? 'text-white/70' : 'border-b border-[var(--deck-hairline)] text-[var(--deck-muted)]'}`}>
        <span className="flex gap-[5px]" aria-hidden="true">
          {[0, 1, 2].map((dot) => <span key={dot} className={`h-[8px] w-[8px] rounded-full ${dark ? 'bg-white/25' : 'bg-[var(--deck-tone-2)]'}`} />)}
        </span>
        <span className="ml-[6px] flex items-center gap-[6px]">{icon}{title}</span>
        {badge && <span className="ml-auto">{badge}</span>}
      </div>
      <div className="flex flex-1 flex-col justify-center px-[14px] py-[8px]">{children}</div>
    </div>
  );
}

function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="flex flex-shrink-0 items-center gap-[5px] rounded-full bg-[var(--deck-callout)] px-[10px] py-[3px] text-[14px] font-semibold text-[var(--deck-callout-text)]">
      <Check size={14} strokeWidth={3} />{children}
    </span>
  );
}

const AnselMark = () => (
  <span className="flex h-[18px] w-[18px] items-center justify-center rounded-[5px] bg-[image:var(--deck-app-icon-gradient)] text-[11px] font-bold text-white">A</span>
);

function SharedAccess() {
  return (
    <Window title="Ansel" icon={<AnselMark />}>
      <div className="flex items-center gap-[12px]">
        <span className="flex h-[40px] w-[40px] flex-shrink-0 items-center justify-center rounded-full bg-[var(--deck-accent)] text-[15px] font-bold text-white">AW</span>
        <div className="min-w-0 flex-1">
          <p className="text-[17px] font-semibold leading-[1.2]">Alicia Wang shared access</p>
          <p className="mt-[2px] flex items-center gap-[5px] text-[15px] text-[var(--deck-muted)]"><Lock size={13} />Weekly Product Sync · transcripts</p>
        </div>
        <Pill>Can view</Pill>
      </div>
    </Window>
  );
}

function CalendarInvite() {
  return (
    <Window title="Outlook Calendar" icon={<CalendarDays size={15} />}>
      <div className="flex gap-[12px] rounded-[10px] bg-[var(--deck-callout)] px-[12px] py-[9px]">
        <span className="w-[4px] flex-shrink-0 rounded-full bg-[var(--deck-accent)]" />
        <div className="min-w-0 flex-1">
          <p className="text-[17px] font-semibold leading-[1.2]">Weekly Product Sync</p>
          <p className="text-[15px] text-[var(--deck-muted)]">Mon 2:00–2:30 PM · Recurring</p>
        </div>
      </div>
      <div className="mt-[8px] flex items-center justify-between text-[15px]">
        <span className="text-[var(--deck-muted)]">Varun Sanklecha</span>
        <Pill>Accepted</Pill>
      </div>
    </Window>
  );
}

function Integrations() {
  const rows = [
    { icon: <CalendarDays size={16} />, name: 'Outlook Calendar' },
    { icon: <Hash size={16} />, name: 'Slack' },
  ];
  return (
    <Window title="Ansel · Integrations" icon={<AnselMark />}>
      <div className="space-y-[6px]">
        {rows.map((row) => (
          <div key={row.name} className="flex items-center gap-[10px] rounded-[10px] border border-[var(--deck-hairline)] px-[12px] py-[4px]">
            <span className="flex h-[26px] w-[26px] items-center justify-center rounded-[8px] bg-[var(--deck-tone-3)] text-[var(--deck-ink)]">{row.icon}</span>
            <span className="flex-1 text-[16px] font-semibold">{row.name}</span>
            <Pill>Connected</Pill>
          </div>
        ))}
      </div>
    </Window>
  );
}

function RecordedCall() {
  return (
    <Window
      title="Product Sync · last week"
      icon={null}
      dark
      badge={
        <span className="flex items-center gap-[6px] whitespace-nowrap rounded-full bg-[var(--deck-accent)] px-[10px] py-[2px] text-[13px] font-semibold text-white">
          <span className="h-[7px] w-[7px] rounded-full bg-white" />Ansel is recording
        </span>
      }
    >
      <div className="grid flex-1 grid-cols-3 gap-[8px]">
        {['AW', 'VS', 'AO'].map((initials) => (
          <div key={initials} className="flex items-center justify-center rounded-[10px] bg-white/10 text-[15px] font-semibold text-white/80">{initials}</div>
        ))}
      </div>
      <p className="mt-[8px] flex items-center gap-[6px] text-[14px] text-white/75"><Check size={14} strokeWidth={3} />Varun acknowledged recording</p>
    </Window>
  );
}

const assumptions = [
  { mockup: <SharedAccess />, line: 'Manager shared last week’s transcript' },
  { mockup: <CalendarInvite />, line: 'Invited to this week’s sync' },
  { mockup: <Integrations />, line: 'Calendar and Slack connected' },
  { mockup: <RecordedCall />, line: 'Attended last week’s recorded sync' },
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
            {assumptions.map((assumption, index) => (
              <Reveal key={assumption.line} delay={300 + index * 100} className="h-full">
                <div className="flex h-full flex-col rounded-[28px] border border-white/80 bg-white/55 p-[18px] backdrop-blur-[16px]">
                  {/* Top half: visual mockup */}
                  <div className="min-h-0 flex-1 rounded-[20px] bg-[var(--deck-tone-3)] p-[12px]">{assumption.mockup}</div>
                  {/* Bottom half: number and one line */}
                  <div className="flex items-center gap-[16px] px-[8px] pt-[16px] pb-[4px]">
                    <span className="font-display text-[52px] font-extrabold leading-none tracking-[-0.035em] text-[var(--deck-accent)]">{index + 1}</span>
                    <p className="text-[24px] font-semibold leading-[1.25]">{assumption.line}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}
