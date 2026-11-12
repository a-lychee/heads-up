import { ArrowRight, Bell } from 'lucide-react';
import { Headline } from '../components/Headline';
import { Reveal, useSlideEnvironment } from '../components/Reveal';
import { SlideFrame } from '../components/SlideFrame';
import type { SlideMetadata } from '../types';

export const metadata: SlideMetadata = {
  id: 'shift',
  title: 'The behavior change',
  section: '02 · Heads-Up',
  notes: 'Today Ansel is reactive: Ethan has to remember to go to Ansel, and light users do that about 0.4 times a week. We want Ansel to be proactive: it comes to him, thirty minutes before his next recurring meeting. Our solution is Heads-Up: a 30-second Slack brief before every recurring meeting. So let’s see that in action.',
};

/** Simple filled person figure. */
function Person({ color, size = 150 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true" className="flex-shrink-0">
      <circle cx="50" cy="34" r="18" fill={color} />
      <path d="M14 96c0-22 16-36 36-36s36 14 36 36z" fill={color} />
    </svg>
  );
}

function AnselTile({ faded = false }: { faded?: boolean }) {
  return (
    <div
      className="flex h-[150px] w-[150px] flex-shrink-0 items-center justify-center rounded-[36px] bg-[image:var(--deck-app-icon-gradient)] font-display text-[68px] font-extrabold text-white"
      style={{ opacity: faded ? 0.55 : 1 }}
      aria-label="Ansel"
    >
      A
    </div>
  );
}

/** Arrow between the two icons. Dashed arrows crawl (he has to chase Ansel); the accent arrow draws itself. */
function Flow({ label, accent, animate, drawDelay = 0 }: { label: string; accent: boolean; animate: boolean; drawDelay?: number }) {
  const color = accent ? 'var(--deck-accent)' : 'var(--deck-secondary)';
  const draw = animate && accent;
  return (
    <div className="flex flex-shrink-0 flex-col items-center gap-[10px]">
      <span className={`text-[24px] font-semibold ${draw ? 'deck-pop' : ''}`} style={{ color, animationDelay: draw ? `${drawDelay + 300}ms` : undefined }}>{label}</span>
      <svg width="230" height="30" viewBox="0 0 230 30" aria-hidden="true" overflow="visible">
        <line
          x1="4" y1="15" x2="212" y2="15" stroke={color} strokeWidth="5" strokeLinecap="round"
          pathLength={draw ? 1 : undefined}
          strokeDasharray={accent ? undefined : '10 10'}
          className={animate ? (accent ? 'deck-draw' : 'deck-ants') : undefined}
          style={draw ? { animationDelay: `${drawDelay}ms` } : undefined}
        />
        <path
          d="M208 4 L226 15 L208 26" fill="none" stroke={color} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"
          className={draw ? 'deck-pop' : undefined}
          style={draw ? { animationDelay: `${drawDelay + 550}ms`, transformBox: 'fill-box', transformOrigin: 'center' } : undefined}
        />
      </svg>
    </div>
  );
}

function HalfTitle({ proactive }: { proactive: boolean }) {
  return (
    <>
      <p className={`text-[22px] font-semibold uppercase tracking-[0.1em] ${proactive ? 'text-[var(--deck-accent)]' : 'text-[var(--deck-muted)]'}`}>
        {proactive ? 'With Heads-Up' : 'Today'}
      </p>
      <p className={`mt-[6px] font-display text-[64px] font-extrabold leading-none tracking-[-0.035em] ${proactive ? '' : 'text-[var(--deck-secondary)]'}`}>
        {proactive ? 'Proactive' : 'Reactive'}
      </p>
    </>
  );
}

export default function ShiftSlide() {
  const { static: isStatic } = useSlideEnvironment();
  const motion = !isStatic;
  // Timeline (ms after the slide appears): left half 120, right half 420, arrow draws 900,
  // Ethan pops 1550, bell drops 1800 and pings twice, caption 2000, solution band 2500.
  return (
    <SlideFrame section={metadata.section} source="Heads-Up brief v9, Behavior Change · Kilts Center Ansel case (2026), Ex 3, 7">
      <div className="absolute inset-x-[104px] top-[160px]">
        <Reveal>
          <Headline style={{ fontSize: 64 }} secondary={<span className="whitespace-nowrap">From a reactive notetaker to a proactive assistant.</span>}>
            The behavior change we&apos;re driving
          </Headline>
        </Reveal>
      </div>

      <div className="absolute inset-x-[104px] top-[370px] grid grid-cols-[1fr_auto_1fr] gap-[56px]">
        {/* Today: he has to pull */}
        <Reveal delay={120}>
          <HalfTitle proactive={false} />
          <div className="mt-[56px] flex items-center gap-[26px]">
            <Person color="var(--deck-secondary)" />
            <Flow label="has to remember" accent={false} animate={motion} />
            <AnselTile faded />
          </div>
        </Reveal>

        <Reveal delay={300} className="self-center pt-[60px]">
          <div className="flex h-[80px] w-[80px] items-center justify-center rounded-full bg-[var(--deck-ink)] text-white shadow-[var(--deck-card-shadow)]">
            <ArrowRight size={36} strokeWidth={1.8} />
          </div>
        </Reveal>

        {/* With Heads-Up: Ansel pushes to him */}
        <Reveal delay={420}>
          <HalfTitle proactive />
          <div className="mt-[56px] flex items-center gap-[26px]">
            <AnselTile />
            <Flow label="30 min before" accent animate={motion} drawDelay={900} />
            <div className="relative flex-shrink-0">
              <div className={`flex h-[150px] w-[150px] items-center justify-center rounded-full bg-[var(--deck-accent-wash)] ${motion ? 'deck-pop' : ''}`} style={{ animationDelay: '1550ms' }}>
                <Person color="var(--deck-ink)" size={120} />
              </div>
              {motion && (
                <span className="deck-ping absolute -right-[14px] -top-[14px] h-[58px] w-[58px] rounded-full bg-[var(--deck-accent)]" style={{ animationDelay: '2050ms' }} aria-hidden="true" />
              )}
              <span className={`absolute -right-[14px] -top-[14px] flex h-[58px] w-[58px] items-center justify-center rounded-full bg-[var(--deck-accent)] text-white shadow-[var(--deck-card-shadow)] ${motion ? 'deck-pop' : ''}`} style={{ animationDelay: '1800ms' }}>
                <Bell size={28} />
              </span>
            </div>
          </div>
        </Reveal>

        {/* Captions share a second row so they line up */}
        <Reveal delay={400} className="-mt-[22px]">
          <p className="text-[32px] leading-[1.25] text-[var(--deck-muted)]">He has to go to Ansel.</p>
        </Reveal>
        <span />
        <Reveal delay={2000} className="-mt-[22px]">
          <p className="text-[32px] font-semibold leading-[1.25]">Ansel comes to him.</p>
        </Reveal>
      </div>

      {/* Our solution, big, with the kicker into the demo */}
      <Reveal delay={2500} className="absolute inset-x-[104px] bottom-[96px]">
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-[44px] rounded-[32px] border-2 border-[var(--deck-accent)] bg-[var(--deck-card)] px-[48px] py-[28px] shadow-[var(--deck-card-shadow)]">
          <div>
            <p className="text-[20px] font-semibold uppercase tracking-[0.1em] text-[var(--deck-accent)]">Our solution</p>
            <p className="mt-[4px] font-display text-[76px] font-extrabold leading-none tracking-[-0.035em]">Heads-Up</p>
          </div>
          <p className="border-l border-[var(--deck-hairline-strong)] pl-[44px] text-[34px] font-semibold leading-[1.2]">
            A 30-second Slack brief before every recurring meeting.
          </p>
          <p className="flex items-center gap-[12px] whitespace-nowrap rounded-full bg-[var(--deck-accent)] px-[28px] py-[16px] text-[26px] font-semibold text-white">
            So let&apos;s see that in action <ArrowRight size={26} strokeWidth={2.4} className={motion ? 'deck-nudge' : undefined} style={{ animationDelay: '3300ms' }} />
          </p>
        </div>
      </Reveal>
    </SlideFrame>
  );
}
