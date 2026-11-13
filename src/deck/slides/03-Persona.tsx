import { Brain, CheckCheck, FileText, MessagesSquare, Mic, TrendingUp, UserRound } from 'lucide-react';
import type { ReactNode } from 'react';
import personaImage from '@/assets/persona-engineer.png';
import { Headline } from '../components/Headline';
import { Reveal, useSlideEnvironment } from '../components/Reveal';
import { SlideFrame } from '../components/SlideFrame';
import type { SlideMetadata } from '../types';

export const metadata: SlideMetadata = {
  id: 'persona',
  title: 'User segment pain points',
  section: '01 · Context and Problem',
  notes: 'Meet Varun, a software engineer and a typical light user. He is an individual contributor, he attends all his meetings, he needs to speak at least once in most of them, and he cares about his performance at work. Ansel records everything, but by next week it is hard to remember what was said.',
};

export const painsMetadata: SlideMetadata = {
  id: 'persona-pains',
  title: 'User segment pain points · pains',
  section: '01 · Context and Problem',
  transition: 'none',
  notes: 'His pain points: he forgets what was said, he skips the meeting summaries, and he fails to see Ansel’s value. So today he rereads old notes, asks a teammate, or relies on memory.',
};

// Persona name and title are placeholders; edit here.
const persona = {
  name: 'Varun',
  role: 'Software engineer',
  traits: [
    { icon: UserRound, text: 'Serves as an individual contributor' },
    { icon: CheckCheck, text: 'Attends all his meetings' },
    { icon: Mic, text: 'Needs to speak at least once in most meetings' },
    { icon: TrendingUp, text: 'Cares about his performance at work' },
  ],
};

// Quotes from Kilts case Ex 7 and our team interviews (Oct 2026), as cited in the Heads-Up brief.
// Each card is one title line and one quote line; keep quotes short enough to fit on one line.
const pains = [
  { title: 'Forgets what was said', quote: 'Nobody remembers what we talked about last week, so we waste time recalling.', source: '(External Interview)' },
  { title: 'Skips meeting summaries', quote: 'Half the time I forget they are there after the email arrives.', source: '(Exhibit 7)' },
  { title: 'Fails to see Ansel’s value', quote: 'If I only have three meetings that week, this is not something I think to open.', source: '(Exhibit 7)' },
];

const options = [
  { icon: FileText, title: 'Reread old notes' },
  { icon: MessagesSquare, title: 'Ask a colleague' },
  { icon: Brain, title: 'Rely on memory' },
];

function Label({ children }: { children: ReactNode }) {
  return <p className="text-[20px] font-semibold uppercase tracking-[0.1em] text-[var(--deck-muted)]">{children}</p>;
}

type Step = 0 | 1;

/** Reveal on the first step only, so the click doesn't replay the entrance. */
function Enter({ step, delay, className, children }: { step: Step; delay: number; className?: string; children: ReactNode }) {
  return step === 0 ? <Reveal delay={delay} className={className}>{children}</Reveal> : <div className={className}>{children}</div>;
}

// Two steps: the persona alone first (with the card morph from the target-user slide), then on the click
// the pain points and options fade in on the right with the deck's usual soft reveal.
function PersonaStep({ step }: { step: Step }) {
  const { static: isStatic } = useSlideEnvironment();
  return (
    <SlideFrame section={metadata.section} source="Kilts Center Ansel case (2026), Ex 5, 7, 8; team interviews (n=13) · persona is a composite">
      <div className="absolute inset-x-[104px] top-[160px]">
        <Enter step={step} delay={0}>
          <Headline
            style={{ fontSize: 64 }}
            secondary={<span className="whitespace-nowrap">Varun struggles to remember last week&apos;s meeting.</span>}
          >
            User segment pain points
          </Headline>
        </Enter>
      </div>

      <div className="absolute inset-x-[104px] top-[370px] bottom-[96px] grid grid-cols-2 gap-[56px]">
        {/* Left half: profile. Label matches the right column's section labels. */}
        <Enter step={step} delay={950} className="flex h-full flex-col">
          <Label>Our persona</Label>
          <div className="mt-[14px] flex min-h-0 flex-1 overflow-hidden rounded-[32px] border border-white/70 bg-[var(--deck-card)] shadow-[var(--deck-card-shadow)]">
            <div className="flex w-[340px] flex-shrink-0 items-end justify-center bg-[var(--deck-accent-wash)] px-[28px] pt-[36px]">
              <img src={personaImage} alt="A software engineer working at his laptop, with a tangle of thoughts above his head" className="max-h-full w-full object-contain object-bottom" />
            </div>
            <div className="flex flex-1 flex-col justify-center px-[38px] py-[36px]">
              <span className="self-start rounded-full bg-[var(--deck-accent)] px-[14px] py-[5px] text-[16px] font-semibold uppercase tracking-[0.08em] text-white">Light user</span>
              <h2 className="mt-[18px] font-display text-[52px] font-extrabold leading-none tracking-[-0.035em]">{persona.name}</h2>
              <p className="mt-[8px] text-[26px] text-[var(--deck-muted)]">{persona.role}</p>
              <ul className="mt-[44px] space-y-[22px]">
                {persona.traits.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-start gap-[16px] text-[24px] leading-[1.3]">
                    <span className="flex h-[40px] w-[40px] flex-shrink-0 items-center justify-center rounded-[12px] bg-[var(--deck-callout)] text-[var(--deck-accent)]">
                      <Icon size={22} strokeWidth={2} />
                    </span>
                    <span className="pt-[5px]">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Enter>

        {/* Right half: pain points, then options today. Spacing is one rhythm: 14px from a label to its cards,
            16px between cards, 36px between the two sections. The pain cards share the free height evenly,
            so all three are the same size and the column lines up with the profile card. */}
        {/* Hidden on the first step; on the click it fades in with the same soft reveal as the rest of the deck. */}
        <Reveal className={`flex min-h-0 flex-col ${step === 0 ? 'invisible' : ''}`}>
          <Label>Pain points</Label>
          <div className="mt-[14px] flex min-h-0 flex-1 flex-col gap-[16px]">
            {pains.map((pain) => (
              <div key={pain.title} className="flex flex-1">
                <div className="flex w-full flex-col justify-center rounded-[24px] border border-white/80 bg-white/55 px-[28px] backdrop-blur-[16px]">
                  <p className="text-[26px] font-semibold leading-[1.25]">
                    {pain.title} <span className="text-[15px] font-normal text-[var(--deck-secondary)]">{pain.source}</span>
                  </p>
                  <p className="mt-[8px] whitespace-nowrap text-[21px] leading-[1.35] text-[var(--deck-muted)]">“{pain.quote}”</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-[36px]">
            <Label>Options today</Label>
            <div className="mt-[14px] grid grid-cols-3 gap-[16px]">
              {options.map(({ icon: Icon, title }) => (
                <div key={title} className="flex flex-col items-center gap-[12px] rounded-[22px] bg-[var(--deck-callout)] px-[16px] py-[22px] text-[var(--deck-callout-text)]">
                  <Icon size={40} strokeWidth={1.8} />
                  <p className="text-[26px] font-semibold leading-[1.2]">{title}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      {/* Transition from the target-user slide: the 1.29M box charges up, flies over and becomes Varun's profile card. */}
      {!isStatic && step === 0 && (
        <>
          <div className="deck-morph pointer-events-none absolute z-20 overflow-hidden bg-[var(--deck-card)]" aria-hidden="true">
            <div className="deck-morph-content flex h-[80px] w-[520px] items-baseline gap-[16px] px-[24px] py-[18px]">
              <p className="deck-morph-number font-display text-[42px] font-extrabold leading-none tracking-[-0.035em]">1.29M</p>
              <p className="text-[21px] leading-[1.25] text-[var(--deck-muted)]">have a weekly recurring meeting</p>
            </div>
          </div>
          <div className="deck-morph-burst pointer-events-none absolute left-[104px] top-[414px] z-10 h-[570px] w-[828px] rounded-[32px] border-[3px] border-[var(--deck-accent)]" aria-hidden="true" />
        </>
      )}
    </SlideFrame>
  );
}

export default function PersonaSlide() {
  return <PersonaStep step={0} />;
}

export function PersonaPainsSlide() {
  return <PersonaStep step={1} />;
}
