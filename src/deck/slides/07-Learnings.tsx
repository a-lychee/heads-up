import { Headline } from '../components/Headline';
import { Reveal, useSlideEnvironment } from '../components/Reveal';
import { SlideFrame } from '../components/SlideFrame';
import type { SlideMetadata } from '../types';

export const metadata: SlideMetadata = {
  id: 'learnings',
  title: 'What we learned',
  section: '03 · Takeaways',
  notes: 'Walk the build from the Phase 1 mockup to today’s prototype. On the technical side, Slack could not render the card we designed, so the rich view moved into the Ansel app, which we control; and we dropped audio and video from transcripts to cut compute and make the app load faster. On how we worked, two lessons: feedback only shows up once people are actually using the app, so get it in front of them early; and every use case looks essential until you see which few do most of the work.',
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
  { lane: 'technical', at: 28, tag: 'Slack’s UI limits', title: 'Moved the rich view into the Ansel app', body: 'Our Phase 1 card wasn’t possible in Slack. The app is in our control.' },
  { lane: 'qualitative', at: 46, tag: 'Feedback', title: 'Feedback only shows up in use', body: 'Users couldn’t say what they needed until they were actually working in the app.' },
  { lane: 'technical', at: 64, tag: 'Speed', title: 'Dropped audio and video from transcripts', body: 'Less compute, and the Ansel app loads faster.' },
  { lane: 'qualitative', at: 82, tag: 'Scope', title: 'The product is the 20%', body: 'Every use case looked essential at first. Only a few did most of the work.' },
];

// Vertical rhythm, mirrored in both bands: 26px band padding, a 30px title, 26px to the cards, 44px from the cards
// to the timeline. Technical cards are up to ~197px tall, qualitative ~174px.
const PAD = 26;
const TITLE_GAP = 26;
const STEM = 44;
const TITLE_H = 30;
const TOP_CARD_H = 197;
const BOTTOM_CARD_H = 174;
const TRACK_Y = PAD + TITLE_H + TITLE_GAP + TOP_CARD_H + STEM; // 323: where the two shaded bands meet
const AREA_H = TRACK_Y + STEM + BOTTOM_CARD_H + TITLE_GAP + TITLE_H + PAD; // 623: height of the timeline area

// Each lane has its own color, used for its label, dots, stems, card top bar and tag.
const laneStyle: Record<Lane, { label: string; text: string; bg: string; border: string; stem: string; band: string }> = {
  technical: {
    label: 'Technical changes to Ansel',
    text: 'text-[var(--deck-accent)]', bg: 'bg-[var(--deck-accent)]', border: 'border-t-[var(--deck-accent)]',
    stem: 'bg-[var(--deck-accent-wash)]', band: 'bg-[var(--deck-accent-wash)] opacity-60',
  },
  qualitative: {
    label: 'Qualitative learnings',
    text: 'text-[var(--deck-ink)]', bg: 'bg-[var(--deck-ink)]', border: 'border-t-[var(--deck-ink)]',
    stem: 'bg-[var(--deck-tone-2)]', band: 'bg-[var(--deck-tone-3)] opacity-70',
  },
};
const DRAW_MS = 1400; // the line draws left to right; each card appears as the line reaches it

/** Lane title, inside its shaded band: large, sentence case, with a color swatch. */
function LaneTitle({ lane, position }: { lane: Lane; position: 'top' | 'bottom' }) {
  const style = laneStyle[lane];
  return (
    <p
      className={`absolute left-0 flex items-center gap-[12px] font-display text-[30px] font-extrabold leading-none tracking-[-0.02em] ${style.text}`}
      style={position === 'top' ? { top: PAD } : { bottom: PAD }}
    >
      <span className={`h-[18px] w-[18px] rounded-[5px] ${style.bg}`} />
      {style.label}
    </p>
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
      <div className="absolute inset-x-[104px] top-[346px]" style={{ height: AREA_H }}>
        {/* Shaded bands: technical changes above the timeline, qualitative learnings below */}
        <div className={`absolute -inset-x-[28px] top-0 rounded-t-[28px] ${laneStyle.technical.band}`} style={{ height: TRACK_Y }} />
        <div className={`absolute -inset-x-[28px] rounded-b-[28px] ${laneStyle.qualitative.band}`} style={{ top: TRACK_Y, bottom: 0 }} />
        <LaneTitle lane="technical" position="top" />
        <LaneTitle lane="qualitative" position="bottom" />

        <div className="absolute inset-0">
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
                  style={{ left: `${stop.at}%`, top: above ? TRACK_Y - STEM : TRACK_Y + 13, height: STEM - 13 }}
                />
                {/* The wrapper centers the card on its stop; the Reveal inside animates without fighting that transform. */}
                <div className="absolute w-[400px] -translate-x-1/2" style={{ left: `${stop.at}%`, ...(above ? { bottom: AREA_H - TRACK_Y + STEM } : { top: TRACK_Y + STEM }) }}>
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
