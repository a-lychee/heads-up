import type { ReactNode } from 'react';
import aliciaPhoto from '@/assets/team-alicia.jpg.asset.json';
import aryanPhoto from '@/assets/team-aryan.jpg';
import gabePhoto from '@/assets/team-gabe.jpg';
import rishabhPhoto from '@/assets/team-rishabh.jpg';
import varunPhoto from '@/assets/team-varun.jpg';
import { GlassCard } from '../components/GlassCard';
import { Headline } from '../components/Headline';
import { Reveal, useSlideEnvironment } from '../components/Reveal';
import { SlideFrame } from '../components/SlideFrame';
import type { SlideMetadata } from '../types';

export const metadata: SlideMetadata = {
  id: 'team',
  title: 'Meet the team',
  section: '00 · Intro',
  // Skit script from Heads-Up_Skit_Script.pdf. Line breaks show in the editor and presenter notes.
  notes: `PRE-SKIT: “The Summary Scroll” (Varun, Aryan, Alicia)

[Varun sits at a laptop. A calendar reminder dings.]
VARUN: “Weekly Product Sync in 30 minutes.” Uh oh. Aryan, what was I supposed to do for this meeting?
ARYAN: Relax. Ansel, the AI meeting assistant, generated the summary.
[Aryan hands Varun the kitchen roll. Varun starts unrolling and scrolling as he reads.]
VARUN: “Discussion themes. Sarah’s weekend with her fiancé. How cold Chicago gets in November. Whether the office needs a second coffee machine. Synergy…”
[Keeps unrolling. The roll hits the floor.]
VARUN: …still synergy. Where’s my part?
ARYAN: Near the bottom. Probably. You barely speak in meetings anyway.
VARUN: Do I even need to be in this meeting? Am I supposed to bring something?
ARYAN: Honestly? Just say your Wi-Fi is bad. Works every time.
[Cut to the meeting. Alicia sits across from Varun as if on a video call.]
VARUN: Hi Alicia, how’s it going?
ALICIA: I could be better. Let’s get straight into it. Where’s the forecast update?
VARUN: Forecast update? Oh yeah, yeah, I have it ready. Let me pull it up…
[Varun freezes, then fakes a lagging connection.]
VARUN: Can you… see my… screen…? You’re… breaking… up…
[Varun slams the laptop shut.]
VARUN: Why do I keep missing things?
ARYAN: (to the audience, holding up the roll) Ansel remembers everything. Varun remembers nothing.

Props: laptop, kitchen roll as the Ansel summary, reminder sound. Rehearse the unroll so it is fast and long; it is the biggest laugh. Aryan keeps the roll for the post-skit.

AFTER THE SKIT: Introduce each person and their (very real) role. Keep this brief and move quickly to the user problem.`,
};

// Edit names, roles and photos here. The closing copy (09-TeamAgain.tsx) and the edited version (10-TeamUpdate.tsx)
// reuse this list, so the card order is the same on all three slides.
// Each role is a black title plus an optional gray note. Give a piece a `key` if the updated slide strikes it.
interface RolePart {
  text: string;
  key?: string;
}
interface Member {
  id: string;
  first: string;
  last: string;
  /** First line of the title, e.g. "Software Engineer". */
  title: RolePart;
  /** Second line; key it to strike it on the updated slide. */
  company?: RolePart;
  note?: RolePart;
  photo: string;
}

const COMPANY = 'at Real Company';

export const team: Member[] = [
  { id: 'varun', first: 'Varun', last: 'Sanklecha', photo: varunPhoto,
    title: { text: 'Software Engineer', key: 'varun-title' } },
  { id: 'aryan', first: 'Aryan', last: 'Ochani', photo: aryanPhoto,
    title: { text: 'Software Engineer' }, note: { text: '(Varun’s Teammate)', key: 'aryan-note' } },
  { id: 'alicia', first: 'Alicia', last: 'Wang', photo: aliciaPhoto.url,
    title: { text: 'CEO' }, note: { text: '(Varun’s Manager)', key: 'alicia-note' } },
  { id: 'rishabh', first: 'Rishabh', last: 'Rajagopalan', photo: rishabhPhoto,
    title: { text: 'CTO', key: 'rishabh-title' }, company: { text: COMPANY, key: 'rishabh-company' }, note: { text: '(Currently OOO)', key: 'rishabh-note' } },
  { id: 'gabe', first: 'Gabriel', last: 'Lam', photo: gabePhoto,
    title: { text: 'Intern' }, note: { text: '(Out Getting Coffee)' } },
];

const medallionShadow = {
  boxShadow:
    '0 0 0 8px var(--deck-accent-wash), 0 18px 38px color-mix(in srgb, var(--deck-ink) 16%, transparent)',
};

export interface TeamEdits {
  /** Role pieces to strike through, by key, with the delay (ms) for each strike. */
  struck?: Record<string, number>;
  /** New text written in above a member's role, by member id. */
  corrections?: Record<string, { text: string; delay: number }>;
  /** Role pieces whose text swaps to new text (no strike), by key. */
  replacements?: Record<string, { from: string; to: string; delay: number }>;
}

/** A piece of a role, struck through in the accent color if the edits say so. */
function Part({ part, edits, isStatic }: { part: RolePart; edits?: TeamEdits; isStatic: boolean }) {
  const swap = part.key ? edits?.replacements?.[part.key] : undefined;
  if (swap) {
    // Swap the whole piece (it sits centered on its own line, so the old text lines up exactly with the previous slide).
    // The old text slides out and the new one slides in, with the changed word in the accent color.
    const [before, after] = part.text.split(swap.from);
    const next = <>{before}<span className="text-[var(--deck-accent)]">{swap.to}</span>{after}</>;
    if (isStatic) return next;
    return (
      <span className="inline-grid justify-items-center align-bottom">
        <span className="deck-swap-out col-start-1 row-start-1 whitespace-nowrap" style={{ animationDelay: `${swap.delay}ms` }}>{part.text}</span>
        <span className="deck-swap-in col-start-1 row-start-1 whitespace-nowrap" style={{ animationDelay: `${swap.delay + 120}ms` }}>{next}</span>
      </span>
    );
  }
  const delay = part.key ? edits?.struck?.[part.key] : undefined;
  if (delay === undefined) return <>{part.text}</>;
  return (
    <span className={isStatic ? 'deck-strike deck-strike-static' : 'deck-strike'} style={{ animationDelay: `${delay}ms` }}>
      {part.text}
    </span>
  );
}

function Plain({ children }: { children: ReactNode; delay?: number }) {
  return <div>{children}</div>;
}

/** The team grid, shared by the opening slide and the closing "updated" slide so the layout matches exactly. */
export function TeamGrid({ edits, reveal = true }: { edits?: TeamEdits; reveal?: boolean }) {
  const { static: isStatic } = useSlideEnvironment();
  // Without the reveal, the cards are already in place, so the edits read as a live correction.
  const Wrap = reveal ? Reveal : Plain;
  return (
    <div className="mt-[104px] grid grid-cols-5 gap-[24px]">
      {team.map((member, index) => {
        const correction = edits?.corrections?.[member.id];
        return (
          <Wrap key={member.id} delay={100 + index * 80}>
            <GlassCard className="h-[506px]">
              <div className="flex h-full flex-col items-center pt-[4px] text-center">
                <div className="h-[200px] w-[200px] shrink-0 overflow-hidden rounded-full border-[7px] border-[var(--deck-accent)]" style={medallionShadow}>
                  <img src={member.photo} alt={`${member.first} ${member.last}`} className="h-full w-full object-cover object-top" />
                </div>
                <h2 className="mt-[24px] font-display text-[30px] font-extrabold leading-[1.1] tracking-[-0.03em] text-[var(--deck-accent)]">
                  <span className="block">{member.first}</span>
                  <span className="block">{member.last}</span>
                </h2>
                {/* Divider between name and role. On the updated slide a correction takes its place, so no gap is reserved. */}
                <div className={`relative flex h-[52px] w-full justify-center ${correction ? 'items-end pb-[2px]' : 'items-center'}`}>
                  {correction ? (
                    <p
                      className={`rotate-[-3deg] font-display text-[34px] font-extrabold leading-none tracking-[-0.02em] text-[var(--deck-accent)] ${isStatic ? '' : 'deck-pop'}`}
                      style={{ animationDelay: `${correction.delay}ms` }}
                    >
                      {correction.text}
                    </p>
                  ) : (
                    <span className="h-[2px] w-[40px] rounded-full bg-[var(--deck-hairline-strong)]" aria-hidden="true" />
                  )}
                </div>
                <p className="text-[22px] font-semibold leading-[1.3] text-[var(--deck-ink)]">
                  <span className="block"><Part part={member.title} edits={edits} isStatic={isStatic} /></span>
                  <span className="block"><Part part={member.company ?? { text: COMPANY }} edits={edits} isStatic={isStatic} /></span>
                </p>
                {member.note && (
                  <p className="mt-[8px] text-[20px] leading-[1.3] text-[var(--deck-muted)]">
                    <Part part={member.note} edits={edits} isStatic={isStatic} />
                  </p>
                )}
              </div>
            </GlassCard>
          </Wrap>
        );
      })}
    </div>
  );
}

export default function TeamSlide() {
  return (
    <SlideFrame section={metadata.section}>
      <div className="absolute inset-x-[104px] top-[180px]">
        <Reveal><Headline>Meet Team License to Kilts.</Headline></Reveal>
        <TeamGrid />
      </div>
    </SlideFrame>
  );
}
