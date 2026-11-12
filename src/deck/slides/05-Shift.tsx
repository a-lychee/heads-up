import { ArrowRight, Bell, Check, Mail, Minus } from 'lucide-react';
import { Headline } from '../components/Headline';
import { Reveal } from '../components/Reveal';
import { SlideFrame } from '../components/SlideFrame';
import type { SlideMetadata } from '../types';

export const metadata: SlideMetadata = {
  id: 'shift',
  title: 'The behavior change',
  section: '02 · Heads-Up',
  notes: 'Today Ansel is reactive. The notes land six minutes after the meeting, and by the next sync a week later they are forgotten. We want Ansel to be proactive: it comes to Ethan right before the next meeting, so he glances at what he owns, what is open and what was decided, and walks in knowing what he owes. That is Heads-Up, a private Slack card thirty minutes before each recurring meeting. So let’s see that in action.',
};

// Heads-Up brief v9, "Behavior Change" (case Ex 3, 7, 8, 9).
const shifts = [
  { moment: 'Remembering Ansel', today: 'Forgets it once the email arrives', target: 'Ansel comes to them before each meeting' },
  { moment: 'Before the meeting', today: 'Nothing to prep from', target: 'Sees what they own, what’s open, what’s decided' },
  { moment: 'Walking in', today: 'Relies on memory or asks a colleague', target: 'Knows what they owe and what changed' },
];

const columns = 'grid grid-cols-[1fr_260px_1fr] gap-x-[32px]';

/** One week between two syncs, with a marker where Ansel's value lands. */
function WeekTimeline({ proactive }: { proactive: boolean }) {
  return (
    <div className="relative h-[124px]">
      {/* Marker pill above the track */}
      <div
        className={`absolute top-0 flex items-center gap-[8px] rounded-full px-[16px] py-[7px] text-[20px] font-semibold ${
          proactive ? 'right-0 bg-[var(--deck-accent)] text-white shadow-[var(--deck-card-shadow)]' : 'left-0 bg-[var(--deck-tone-3)] text-[var(--deck-muted)]'
        }`}
      >
        {proactive ? <Bell size={19} /> : <Mail size={19} />}
        {proactive ? 'Heads-Up, 30 min before' : 'Notes, 6 min after'}
      </div>

      {/* Track: today the value fades across the week; with Heads-Up it lands right before the next sync */}
      <div className="absolute inset-x-0 top-[62px] h-[6px] rounded-full bg-[var(--deck-tone-3)]" />
      {proactive ? (
        <div className="absolute right-0 top-[62px] h-[6px] w-[14%] rounded-full bg-[var(--deck-accent)]" />
      ) : (
        <div className="absolute left-0 top-[62px] h-[6px] w-[75%] rounded-full" style={{ background: 'linear-gradient(90deg, var(--deck-tone-1), transparent)' }} />
      )}
      <p className="absolute left-1/2 top-[30px] -translate-x-1/2 text-[18px] text-[var(--deck-muted)]">7 days</p>

      {/* Syncs at both ends */}
      <span className="absolute left-0 top-[55px] h-[20px] w-[20px] rounded-full border-[4px] border-[var(--deck-ink)] bg-[var(--deck-card)]" />
      <span
        className={`absolute right-0 top-[55px] h-[20px] w-[20px] rounded-full border-[4px] ${proactive ? 'border-[var(--deck-accent)] bg-[var(--deck-accent)]' : 'border-[var(--deck-tone-1)] bg-[var(--deck-card)]'}`}
      />
      <p className="absolute left-0 top-[90px] text-[20px] font-medium">Sync</p>
      <p className={`absolute right-0 top-[90px] text-[20px] font-semibold ${proactive ? 'text-[var(--deck-accent)]' : 'text-[var(--deck-muted)]'}`}>
        {proactive ? 'Next sync: briefed' : 'Next sync: unprepared'}
      </p>
    </div>
  );
}

export default function ShiftSlide() {
  return (
    <SlideFrame section={metadata.section} source="Heads-Up brief v9, Behavior Change · Kilts Center Ansel case (2026), Ex 3, 7, 8, 9">
      <div className="absolute inset-x-[104px] top-[160px]">
        <Reveal>
          <Headline style={{ fontSize: 68 }} secondary={<span className="whitespace-nowrap">From a reactive notetaker to a proactive assistant.</span>}>
            The behavior change we&apos;re driving
          </Headline>
        </Reveal>
      </div>

      <div className="absolute inset-x-[104px] top-[360px]">
        {/* Half titles */}
        <Reveal delay={100} className={columns}>
          <p className="text-[20px] font-semibold uppercase tracking-[0.1em] text-[var(--deck-muted)]">Today · Reactive</p>
          <span />
          <p className="text-[20px] font-semibold uppercase tracking-[0.1em] text-[var(--deck-accent)]">With Heads-Up · Proactive</p>
        </Reveal>

        {/* When the value lands */}
        <div className={`${columns} mt-[18px] items-center`}>
          <Reveal delay={160}><WeekTimeline proactive={false} /></Reveal>
          <Reveal delay={260} className="flex justify-center">
            <div className="flex h-[76px] w-[76px] items-center justify-center rounded-full bg-[var(--deck-ink)] text-white shadow-[var(--deck-card-shadow)]">
              <ArrowRight size={34} strokeWidth={1.8} />
            </div>
          </Reveal>
          <Reveal delay={340}><WeekTimeline proactive /></Reveal>
        </div>

        {/* The three behavior shifts */}
        <div className="mt-[34px] space-y-[12px]">
          {shifts.map((shift, index) => (
            <Reveal key={shift.moment} delay={440 + index * 90} className={`${columns} items-center`}>
              <div className="flex items-center justify-end gap-[14px] rounded-[20px] bg-white/40 px-[24px] py-[16px] text-right">
                <p className="text-[24px] leading-[1.25] text-[var(--deck-muted)]">{shift.today}</p>
                <Minus size={22} className="flex-shrink-0 text-[var(--deck-secondary)]" />
              </div>
              <p className="text-center text-[20px] font-semibold uppercase tracking-[0.08em] text-[var(--deck-ink)]">{shift.moment}</p>
              <div className="flex items-center gap-[14px] rounded-[20px] border border-white/80 bg-[var(--deck-card)] px-[24px] py-[16px] shadow-[0_12px_30px_rgba(70,30,60,0.08)]">
                <span className="flex h-[30px] w-[30px] flex-shrink-0 items-center justify-center rounded-full bg-[var(--deck-accent)] text-white"><Check size={18} strokeWidth={3} /></span>
                <p className="text-[24px] font-medium leading-[1.25]">{shift.target}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Very brief product summary, then the kicker into the demo */}
      <Reveal delay={760} className="absolute inset-x-[104px] bottom-[130px]">
        <p className="text-[24px] leading-[1.35]">
          <span className="font-semibold text-[var(--deck-accent)]">Heads-Up:</span>{' '}
          a private Slack card 30 minutes before each recurring meeting, with what you own, what&apos;s open and what was decided.
        </p>
      </Reveal>
      <Reveal delay={860} className="absolute bottom-[56px] left-[104px]">
        <p className="flex items-center gap-[14px] font-display text-[40px] font-extrabold tracking-[-0.03em] text-[var(--deck-accent)]">
          So let&apos;s see that in action <ArrowRight size={36} strokeWidth={2.2} />
        </p>
      </Reveal>
    </SlideFrame>
  );
}
