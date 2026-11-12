import { Brain, CalendarDays, CheckCheck, FileText, MessageSquareText, MessagesSquare, UserRound } from 'lucide-react';
import type { ReactNode } from 'react';
import personaImage from '@/assets/persona-engineer.png';
import { Headline } from '../components/Headline';
import { Reveal } from '../components/Reveal';
import { SlideFrame } from '../components/SlideFrame';
import type { SlideMetadata } from '../types';

export const metadata: SlideMetadata = {
  id: 'persona',
  title: 'Our persona',
  section: '01 · Persona',
  notes: 'Meet Ethan, a software engineer and a typical light user. He has fewer than five meetings a week and goes to all of them. In each one he owns a piece: an update to give or an issue to resolve. Ansel records everything, but the notes reach him right after the meeting, and by next week they are buried. So today he rereads old notes, asks a teammate, or walks in cold.',
};

// Persona name and title are placeholders; edit here.
const persona = {
  name: 'Ethan',
  role: 'Software engineer',
  traits: [
    { icon: CalendarDays, text: 'Fewer than 5 meetings a week' },
    { icon: CheckCheck, text: 'Attends all of them' },
    { icon: UserRound, text: 'Individual contributor' },
    { icon: MessageSquareText, text: 'Gives an update or resolves an issue on most calls' },
  ],
};

// Quotes from the Heads-Up brief (Kilts case Ex 7 and team interviews, Oct 2026).
const pains = [
  { title: 'Forgets what was said', quote: 'We talk about something and I forget what we talked about. Annoying for next week.', who: 'PhD, 3 meetings a week' },
  { title: 'The notes get buried', quote: 'Half the time I forget they are there after the email arrives.', who: 'Case interview, Ex 7' },
  { title: 'Doesn’t think to open Ansel', quote: 'If I only have three meetings that week, this is not something I think to open.', who: 'Light user, Ex 7' },
];

const options = [
  { icon: FileText, title: 'Reread old notes', body: '22 seconds on a summary, then it’s buried' },
  { icon: MessagesSquare, title: 'Ask a colleague', body: 'Pulls a teammate off their own work' },
  { icon: Brain, title: 'Walk in cold', body: 'Catches up during the meeting' },
];

function Label({ children }: { children: ReactNode }) {
  return <p className="text-[20px] font-semibold uppercase tracking-[0.1em] text-[var(--deck-muted)]">{children}</p>;
}

export default function PersonaSlide() {
  return (
    <SlideFrame section={metadata.section} source="Kilts Center Ansel case (2026), Ex 5, 7, 8; team interviews (n=13) · persona is a composite">
      <div className="absolute inset-x-[104px] top-[160px]">
        <Reveal>
          <Headline
            style={{ fontSize: 68 }}
            secondary={<span className="whitespace-nowrap">He owns part of every meeting, but walks in cold.</span>}
          >
            Who we’re building for
          </Headline>
        </Reveal>
      </div>

      <div className="absolute inset-x-[104px] top-[370px] bottom-[96px] grid grid-cols-2 gap-[56px]">
        {/* Left half: profile */}
        <Reveal delay={100} className="h-full">
          <div className="flex h-full overflow-hidden rounded-[32px] border border-white/70 bg-[var(--deck-card)] shadow-[var(--deck-card-shadow)]">
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
        </Reveal>

        {/* Right half: pain points, then options today */}
        <div className="flex flex-col">
          <Reveal delay={180}><Label>Pain points</Label></Reveal>
          <div className="mt-[14px] space-y-[14px]">
            {pains.map((pain, index) => (
              <Reveal key={pain.title} delay={240 + index * 90}>
                <div className="rounded-[24px] border border-white/80 bg-white/55 px-[28px] py-[18px] backdrop-blur-[16px]">
                  <p className="text-[24px] font-semibold leading-[1.25]">{pain.title}</p>
                  <p className="mt-[6px] text-[21px] leading-[1.35] text-[var(--deck-muted)]">
                    “{pain.quote}” <span className="whitespace-nowrap text-[18px]">— {pain.who}</span>
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={560} className="mt-auto">
            <Label>Options today</Label>
            <div className="mt-[14px] grid grid-cols-3 gap-[14px]">
              {options.map(({ icon: Icon, title, body }) => (
                <div key={title} className="rounded-[22px] bg-[var(--deck-callout)] px-[20px] py-[16px]">
                  <div className="flex items-center gap-[10px] text-[var(--deck-callout-text)]">
                    <Icon size={22} strokeWidth={2} />
                    <p className="text-[22px] font-semibold">{title}</p>
                  </div>
                  <p className="mt-[6px] text-[20px] leading-[1.3] text-[var(--deck-muted)]">{body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </SlideFrame>
  );
}
