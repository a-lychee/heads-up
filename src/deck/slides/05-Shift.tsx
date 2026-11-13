import { ArrowRight, Bell } from 'lucide-react';
import { Headline } from '../components/Headline';
import { Reveal, useSlideEnvironment } from '../components/Reveal';
import { SlideFrame } from '../components/SlideFrame';
import type { SlideMetadata } from '../types';

export const metadata: SlideMetadata = {
  id: 'shift',
  title: 'The behavior change',
  section: '02 · Demo',
  notes: 'Today Ansel is reactive: Varun has to go to Ansel himself, days later if at all. Light users open it about 0.4 times a week. We want Ansel to be proactive: it comes to him, thirty minutes before his next recurring meeting. That is the behavior change Heads-Up drives.',
};

/** Simple filled person figure. The viewBox is trimmed to the figure so the gaps around it match the other icons. */
function Person({ color, size = 190 }: { color: string; size?: number }) {
  return (
    <svg width={size * 0.72} height={size} viewBox="14 0 72 100" aria-hidden="true" className="flex-shrink-0">
      <circle cx="50" cy="34" r="18" fill={color} />
      <path d="M14 96c0-22 16-36 36-36s36 14 36 36z" fill={color} />
    </svg>
  );
}

function AnselTile({ faded = false }: { faded?: boolean }) {
  return (
    <div
      className="flex h-[190px] w-[190px] flex-shrink-0 items-center justify-center rounded-[46px] bg-[image:var(--deck-app-icon-gradient)] font-display text-[88px] font-extrabold text-white"
      style={{ opacity: faded ? 0.55 : 1 }}
      aria-label="Ansel"
    >
      A
    </div>
  );
}

/** Arrow between the two icons. Only the arrow line takes part in the row's vertical centering, so it sits exactly on
 *  the icons' center line; the label floats a fixed 12px above it. Dashed arrows crawl (he has to chase Ansel); the
 *  accent arrow draws itself. */
function Flow({ label, accent, animate, drawDelay = 0 }: { label: string; accent: boolean; animate: boolean; drawDelay?: number }) {
  const color = accent ? 'var(--deck-accent)' : 'var(--deck-secondary)';
  const draw = animate && accent;
  return (
    <div className="relative h-[30px] w-[260px] flex-shrink-0">
      <div className="absolute bottom-full left-[4px] right-[4px] mb-[12px] flex justify-center">
        <span className={`whitespace-nowrap text-[28px] font-semibold leading-none ${draw ? 'deck-pop' : ''}`} style={{ color, animationDelay: draw ? `${drawDelay + 300}ms` : undefined }}>{label}</span>
      </div>
      <svg width="260" height="30" viewBox="0 0 260 30" aria-hidden="true" overflow="visible" className="block">
        <line
          x1="4" y1="15" x2="242" y2="15" stroke={color} strokeWidth="5" strokeLinecap="round"
          pathLength={draw ? 1 : undefined}
          strokeDasharray={accent ? undefined : '10 10'}
          className={animate ? (accent ? 'deck-draw' : 'deck-ants') : undefined}
          style={draw ? { animationDelay: `${drawDelay}ms` } : undefined}
        />
        <path
          d="M238 4 L256 15 L238 26" fill="none" stroke={color} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"
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
      <p className={`text-[26px] font-semibold uppercase tracking-[0.1em] ${proactive ? 'text-[var(--deck-accent)]' : 'text-[var(--deck-muted)]'}`}>
        {proactive ? 'With Heads-Up' : 'Today'}
      </p>
      <p className={`mt-[8px] font-display text-[84px] font-extrabold leading-none tracking-[-0.035em] ${proactive ? '' : 'text-[var(--deck-secondary)]'}`}>
        {proactive ? 'Proactive' : 'Reactive'}
      </p>
    </>
  );
}

export default function ShiftSlide() {
  const { static: isStatic } = useSlideEnvironment();
  const motion = !isStatic;
  // Timeline (ms after the slide appears): left half 120, right half 420, arrow draws 900,
  // Varun pops 1550, bell drops 1800 and pings twice, caption 2000.
  return (
    <SlideFrame section={metadata.section} source="Heads-Up brief v9, Behavior Change · Kilts Center Ansel case (2026), Ex 3, 7">
      <div className="absolute inset-x-[104px] top-[160px]">
        <Reveal>
          <Headline style={{ fontSize: 64 }} secondary={<span className="whitespace-nowrap">From a reactive notetaker to a proactive assistant.</span>}>
            The behavior change we&apos;re driving
          </Headline>
        </Reveal>
      </div>

      <div className="absolute inset-x-[104px] bottom-[96px] top-[340px] grid grid-cols-[auto_auto_auto] content-center justify-between gap-y-[48px]">
        {/* Today: he has to pull, days later if at all (0.4 Ansel sessions a week, Ex 3) */}
        <Reveal delay={120}>
          <HalfTitle proactive={false} />
          <div className="mt-[64px] flex items-center gap-[30px]">
            <Person color="var(--deck-secondary)" />
            <Flow label="days later, if ever" accent={false} animate={motion} />
            <AnselTile faded />
          </div>
        </Reveal>

        {/* Center arrow: equal space on both sides, and level with the icon row (eyebrow 39 + title 84 + gap 64 + half the 190px icons, minus half the arrow). */}
        <Reveal delay={300} className="self-start pt-[232px]">
          <div className="flex h-[100px] w-[100px] items-center justify-center rounded-full bg-[var(--deck-ink)] text-white shadow-[var(--deck-card-shadow)]">
            <ArrowRight size={46} strokeWidth={1.8} />
          </div>
        </Reveal>

        {/* With Heads-Up: Ansel pushes to him */}
        <Reveal delay={420}>
          <HalfTitle proactive />
          <div className="mt-[64px] flex items-center gap-[30px]">
            <AnselTile />
            <Flow label="30 min before" accent animate={motion} drawDelay={900} />
            <div className="relative flex-shrink-0">
              <div className={`flex h-[190px] w-[190px] items-center justify-center rounded-full bg-[var(--deck-accent-wash)] ${motion ? 'deck-pop' : ''}`} style={{ animationDelay: '1550ms' }}>
                <Person color="var(--deck-ink)" size={152} />
              </div>
              {motion && (
                <span className="deck-ping absolute -right-[16px] -top-[16px] h-[70px] w-[70px] rounded-full bg-[var(--deck-accent)]" style={{ animationDelay: '2050ms' }} aria-hidden="true" />
              )}
              <span className={`absolute -right-[16px] -top-[16px] flex h-[70px] w-[70px] items-center justify-center rounded-full bg-[var(--deck-accent)] text-white shadow-[var(--deck-card-shadow)] ${motion ? 'deck-pop' : ''}`} style={{ animationDelay: '1800ms' }}>
                <Bell size={34} />
              </span>
            </div>
          </div>
        </Reveal>

        {/* Captions share a second row so they line up */}
        <Reveal delay={400}>
          <p className="text-[40px] leading-[1.2] text-[var(--deck-muted)]">He has to go to Ansel.</p>
        </Reveal>
        <span />
        <Reveal delay={2000}>
          <p className="text-[40px] font-semibold leading-[1.2]">Ansel comes to him.</p>
        </Reveal>
      </div>

    </SlideFrame>
  );
}
