import { Headline } from '../components/Headline';
import { Reveal, useSlideEnvironment } from '../components/Reveal';
import { SlideFrame } from '../components/SlideFrame';
import type { SlideMetadata } from '../types';

export const metadata: SlideMetadata = {
  id: 'learnings',
  title: 'What we learned',
  section: '03 · Takeaways',
  notes: 'Walk the build from the Phase 1 mockup to today’s prototype. On the technical side, Slack could not render the card we designed, so the rich view moved into the Ansel app, which we control; and we dropped audio and video from transcripts to cut compute and make the app load faster. On how we worked, we put it in front of users early and iterated constantly, so no feedback arrived too late to act on.',
};

type Lane = 'technical' | 'qualitative';
interface Stop {
  lane: Lane;
  /** Position along the timeline, 0–100%. */
  at: number;
  tag: string;
  title: string;
  body: string;
  placeholder?: boolean;
}

// Edit learnings here. Top lane: technical changes to Ansel. Bottom lane: qualitative learnings.
const stops: Stop[] = [
  { lane: 'technical', at: 24, tag: 'Slack’s UI limits', title: 'Moved the rich view into the Ansel app', body: 'Our Phase 1 card wasn’t possible in Slack. The app is in our control.' },
  { lane: 'qualitative', at: 44, tag: 'Feedback', title: 'Tested early, iterated constantly', body: 'So no feedback came too late.' },
  { lane: 'technical', at: 63, tag: 'Speed', title: 'Dropped audio and video from transcripts', body: 'Less compute, and the Ansel app loads faster.' },
  { lane: 'qualitative', at: 82, tag: '[Tag]', title: '[Learning 4]', body: '[One line on what we learned]', placeholder: true },
];

const TRACK_Y = 300; // px from the top of the timeline area
const LANE_BOTTOM = 590; // bottom of the qualitative lane

// Each lane has its own color, used for its label, dots, stems, card top bar and tag.
const laneStyle: Record<Lane, { label: string; text: string; bg: string; border: string; stem: string; guide: string }> = {
  technical: {
    label: 'Technical changes to Ansel',
    text: 'text-[var(--deck-accent)]', bg: 'bg-[var(--deck-accent)]', border: 'border-t-[var(--deck-accent)]',
    stem: 'bg-[var(--deck-accent-wash)]', guide: 'border-[var(--deck-accent-wash)]',
  },
  qualitative: {
    label: 'Qualitative learnings',
    text: 'text-[var(--deck-ink)]', bg: 'bg-[var(--deck-ink)]', border: 'border-t-[var(--deck-ink)]',
    stem: 'bg-[var(--deck-tone-2)]', guide: 'border-[var(--deck-tone-2)]',
  },
};
const DRAW_MS = 1400; // the line draws left to right; each card appears as the line reaches it

/** Swimlane label, vertically centered on its lane. */
function LaneLabel({ lane, top, height }: { lane: Lane; top: number; height: number }) {
  const style = laneStyle[lane];
  return (
    <div className="absolute left-0 flex w-[210px] items-center" style={{ top, height }}>
      <p className={`flex items-start gap-[12px] text-[24px] font-bold leading-[1.25] ${style.text}`}>
        <span className={`mt-[6px] h-[16px] w-[16px] flex-shrink-0 rounded-[4px] ${style.bg}`} />
        {style.label}
      </p>
    </div>
  );
}

export default function LearningsSlide() {
  const { static: isStatic } = useSlideEnvironment();
  return (
    <SlideFrame section={metadata.section}>
      <div className="absolute inset-x-[104px] top-[160px]">
        <Reveal>
          <Headline style={{ fontSize: 64 }} secondary="Constraints shaped the product, feedback the process.">
            What we learned building it
          </Headline>
        </Reveal>
      </div>

      {/* Timeline area */}
      <div className="absolute inset-x-[104px] top-[360px] h-[620px]">
        {/* Swimlane labels and the divider between them and the lanes */}
        <LaneLabel lane="technical" top={0} height={TRACK_Y} />
        <LaneLabel lane="qualitative" top={TRACK_Y} height={LANE_BOTTOM - TRACK_Y} />
        <span className="absolute left-[230px] top-0 w-[2px] bg-[var(--deck-hairline-strong)]" style={{ height: LANE_BOTTOM }} />

        <div className="absolute inset-y-0 left-[260px] right-0">
          {/* Faint dashed guide through the middle of each lane */}
          <span className={`absolute inset-x-0 border-t-2 border-dashed ${laneStyle.technical.guide}`} style={{ top: TRACK_Y / 2 }} />
          <span className={`absolute inset-x-0 border-t-2 border-dashed ${laneStyle.qualitative.guide}`} style={{ top: (TRACK_Y + LANE_BOTTOM) / 2 }} />
          {/* Track */}
          <div
            className={`absolute left-0 right-0 h-[4px] origin-left rounded-full bg-[var(--deck-tone-1)] ${isStatic ? '' : 'deck-grow-x'}`}
            style={{ top: TRACK_Y - 2, animationDuration: `${DRAW_MS}ms`, animationDelay: '200ms' }}
          />
          {/* Start and end */}
          {[{ at: 0, phase: 'Phase 1', name: 'Mockup' }, { at: 100, phase: 'Today', name: 'Prototype' }].map((end, index) => (
            <div key={end.name}>
              <span
                className={`absolute h-[30px] w-[30px] rounded-full border-[6px] border-[var(--deck-ink)] bg-[var(--deck-card)] ${isStatic ? '' : 'deck-pop'}`}
                style={{ left: `${end.at}%`, top: TRACK_Y, marginLeft: -15, marginTop: -15, animationDelay: `${index === 0 ? 150 : 200 + DRAW_MS}ms` }}
              />
              <p
                className={`absolute whitespace-nowrap ${index === 0 ? '-translate-x-[15px] text-left' : '-translate-x-[calc(100%-15px)] text-right'}`}
                style={{ left: `${end.at}%`, top: TRACK_Y + 26 }}
              >
                <span className="block text-[16px] font-semibold uppercase tracking-[0.1em] text-[var(--deck-muted)]">{end.phase}</span>
                <span className="block text-[22px] font-semibold">{end.name}</span>
              </p>
            </div>
          ))}

          {/* Stops: a dot on the track, a stem, and a card above (technical) or below (qualitative) */}
          {stops.map((stop) => {
            const above = stop.lane === 'technical';
            const style = laneStyle[stop.lane];
            const delay = 200 + (DRAW_MS * stop.at) / 100;
            return (
              <div key={stop.title}>
                <span
                  className={`absolute z-10 h-[26px] w-[26px] rounded-full ${stop.placeholder ? 'border-[4px] border-dashed border-[var(--deck-tone-1)] bg-[var(--deck-card)]' : style.bg} ${isStatic ? '' : 'deck-pop'}`}
                  style={{ left: `${stop.at}%`, top: TRACK_Y, marginLeft: -13, marginTop: -13, animationDelay: `${delay}ms` }}
                />
                <span
                  className={`absolute w-[2px] -translate-x-1/2 ${style.stem}`}
                  style={{ left: `${stop.at}%`, top: above ? TRACK_Y - 70 : TRACK_Y + 14, height: 56 }}
                />
                {/* The wrapper centers the card on its stop; the Reveal inside animates without fighting that transform. */}
                <div className="absolute w-[400px] -translate-x-1/2" style={{ left: `${stop.at}%`, ...(above ? { bottom: 620 - TRACK_Y + 70 } : { top: TRACK_Y + 70 }) }}>
                <Reveal delay={delay + 80}>
                  <div className={`rounded-[24px] px-[26px] py-[20px] ${stop.placeholder ? 'border-2 border-dashed border-[var(--deck-hairline-strong)] bg-white/35' : `border border-t-[6px] border-white/80 ${style.border} bg-[var(--deck-card)] shadow-[var(--deck-card-shadow)]`}`}>
                    <span className={`inline-block rounded-full px-[11px] py-[3px] text-[15px] font-semibold uppercase tracking-[0.1em] ${stop.placeholder ? 'bg-[var(--deck-tone-3)] text-[var(--deck-muted)]' : `${style.bg} text-white`}`}>{stop.tag}</span>
                    <p className={`mt-[6px] font-display text-[28px] font-extrabold leading-[1.12] tracking-[-0.02em] ${stop.placeholder ? 'text-[var(--deck-secondary)]' : ''}`}>{stop.title}</p>
                    <p className="mt-[8px] text-[20px] leading-[1.35] text-[var(--deck-muted)]">{stop.body}</p>
                  </div>
                </Reveal>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SlideFrame>
  );
}
