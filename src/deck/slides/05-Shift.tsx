import { ArrowRight, Bell, Check, HelpCircle, Mail, Users } from 'lucide-react';
import { Headline } from '../components/Headline';
import { Reveal } from '../components/Reveal';
import { SlideFrame } from '../components/SlideFrame';
import type { SlideMetadata } from '../types';

export const metadata: SlideMetadata = {
  id: 'shift',
  title: 'The behavior change',
  section: '02 · Heads-Up',
  notes: 'Today Ansel is reactive: the notes land six minutes after the meeting, and by the next sync a week later Ethan has forgotten them. We want Ansel to be proactive: it comes to him right before the next sync, so he walks in knowing what he owns, what is open and what was decided. That is Heads-Up, a private Slack brief before every recurring meeting. So let’s see that in action.',
};

const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S', 'M'];

/** A week from one sync to the next, as eight day tiles. Words are kept to the day letters. */
function WeekStrip({ proactive }: { proactive: boolean }) {
  return (
    <div className="relative pt-[64px]">
      {/* Where Ansel's value lands */}
      <div
        className={`absolute top-0 flex items-center gap-[8px] rounded-full px-[16px] py-[8px] text-[22px] font-semibold ${
          proactive
            ? 'right-0 bg-[var(--deck-accent)] text-white shadow-[var(--deck-card-shadow)]'
            : 'left-[40px] bg-[var(--deck-tone-3)] text-[var(--deck-muted)]'
        }`}
      >
        {proactive ? <Bell size={22} /> : <Mail size={22} />}
        {proactive ? '30 min before' : '6 min after'}
      </div>

      <div className="grid grid-cols-8 gap-[10px]">
        {days.map((day, index) => {
          const first = index === 0;
          const last = index === days.length - 1;
          // Today the notes fade over the week; with Heads-Up the week stays neutral until the brief.
          const fade = !proactive && !first && !last ? 1 - index / 7 : 1;
          let tile = 'bg-white/45 text-[var(--deck-muted)]';
          let icon = null;
          if (first) {
            tile = 'bg-[var(--deck-ink)] text-white';
            icon = <Users size={30} />;
          } else if (last && proactive) {
            tile = 'bg-[var(--deck-accent)] text-white shadow-[var(--deck-card-shadow)]';
            icon = <Check size={34} strokeWidth={3} />;
          } else if (last) {
            tile = 'border-2 border-dashed border-[var(--deck-tone-1)] bg-transparent text-[var(--deck-secondary)]';
            icon = <HelpCircle size={32} />;
          } else if (!proactive) {
            icon = <Mail size={24} />;
          }
          return (
            <div key={index} className="flex flex-col items-center gap-[10px]">
              <div className={`flex aspect-square w-full items-center justify-center rounded-[18px] ${tile}`} style={{ opacity: fade }}>
                {icon}
              </div>
              <span className="text-[20px] font-semibold text-[var(--deck-muted)]">{day}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Half({ proactive }: { proactive: boolean }) {
  return (
    <div>
      <p className={`text-[22px] font-semibold uppercase tracking-[0.1em] ${proactive ? 'text-[var(--deck-accent)]' : 'text-[var(--deck-muted)]'}`}>
        {proactive ? 'With Heads-Up' : 'Today'}
      </p>
      <p className={`mt-[6px] font-display text-[64px] font-extrabold leading-none tracking-[-0.035em] ${proactive ? '' : 'text-[var(--deck-secondary)]'}`}>
        {proactive ? 'Proactive' : 'Reactive'}
      </p>
      <div className="mt-[40px]"><WeekStrip proactive={proactive} /></div>
      <p className={`mt-[30px] text-[30px] leading-[1.25] ${proactive ? 'font-semibold' : 'text-[var(--deck-muted)]'}`}>
        {proactive ? 'Ansel comes to him before the next one.' : 'Notes arrive, then get forgotten.'}
      </p>
    </div>
  );
}

export default function ShiftSlide() {
  return (
    <SlideFrame section={metadata.section} source="Heads-Up brief v9, Behavior Change · Kilts Center Ansel case (2026), Ex 3, 7">
      <div className="absolute inset-x-[104px] top-[160px]">
        <Reveal>
          <Headline style={{ fontSize: 68 }} secondary={<span className="whitespace-nowrap">From a reactive notetaker to a proactive assistant.</span>}>
            The behavior change we&apos;re driving
          </Headline>
        </Reveal>
      </div>

      <div className="absolute inset-x-[104px] top-[360px] grid grid-cols-[1fr_auto_1fr] gap-[56px]">
        <Reveal delay={120}><Half proactive={false} /></Reveal>
        <Reveal delay={300} className="self-center pt-[80px]">
          <div className="flex h-[80px] w-[80px] items-center justify-center rounded-full bg-[var(--deck-ink)] text-white shadow-[var(--deck-card-shadow)]">
            <ArrowRight size={36} strokeWidth={1.8} />
          </div>
        </Reveal>
        <Reveal delay={420}><Half proactive /></Reveal>
      </div>

      <Reveal delay={700} className="absolute bottom-[56px] left-[104px]">
        <p className="text-[26px] text-[var(--deck-muted)]">
          <span className="font-semibold text-[var(--deck-accent)]">Heads-Up</span> · a private Slack brief before every recurring meeting
        </p>
        <p className="mt-[14px] flex items-center gap-[14px] font-display text-[40px] font-extrabold tracking-[-0.03em] text-[var(--deck-accent)]">
          So let&apos;s see that in action <ArrowRight size={36} strokeWidth={2.2} />
        </p>
      </Reveal>
    </SlideFrame>
  );
}
