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
  notes: 'Introduce each person and their (very real) role. Keep this brief and move quickly to the user problem.',
};

// Edit names, roles and photos here. The closing copy (10-TeamAgain.tsx) and the edited version (11-TeamUpdate.tsx)
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
  title: RolePart[];
  note?: RolePart;
  photo: string;
}

export const team: Member[] = [
  { id: 'varun', first: 'Varun', last: 'Sanklecha', photo: varunPhoto,
    title: [{ text: 'Software Engineer', key: 'varun-title' }, { text: ' at Real Company' }] },
  { id: 'aryan', first: 'Aryan', last: 'Ochani', photo: aryanPhoto,
    title: [{ text: 'Software Engineer at Real Company' }], note: { text: '(Varun’s Teammate)', key: 'aryan-note' } },
  { id: 'alicia', first: 'Alicia', last: 'Wang', photo: aliciaPhoto.url,
    title: [{ text: 'Engineering Manager at Real Company' }], note: { text: '(Varun’s Manager)', key: 'alicia-note' } },
  { id: 'rishabh', first: 'Rishabh', last: 'Rajagopalan', photo: rishabhPhoto,
    title: [{ text: 'CTO at Real Company', key: 'rishabh-title' }], note: { text: '(Currently OOO)', key: 'rishabh-note' } },
  { id: 'gabe', first: 'Gabriel', last: 'Lam', photo: gabePhoto,
    title: [{ text: 'Intern at Real Company' }], note: { text: '(Out Getting Coffee)' } },
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
}

/** A piece of a role, struck through in the accent color if the edits say so. */
function Part({ part, edits, isStatic }: { part: RolePart; edits?: TeamEdits; isStatic: boolean }) {
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
    <div className="mt-[96px] grid grid-cols-5 gap-[24px]">
      {team.map((member, index) => {
        const correction = edits?.corrections?.[member.id];
        return (
          <Wrap key={member.id} delay={100 + index * 80}>
            <GlassCard className="h-[540px]">
              <div className="flex h-full flex-col items-center text-center">
                <div className="h-[200px] w-[200px] shrink-0 overflow-hidden rounded-full border-[7px] border-[var(--deck-accent)]" style={medallionShadow}>
                  <img src={member.photo} alt={`${member.first} ${member.last}`} className="h-full w-full object-cover object-top" />
                </div>
                <h2 className="mt-[26px] font-display text-[30px] font-extrabold leading-[1.12] tracking-[-0.03em]">
                  <span className="block">{member.first}</span>
                  <span className="block">{member.last}</span>
                </h2>
                {/* Slot for a hand-written correction; empty on the opening slide so both layouts match. */}
                <div className="flex h-[64px] items-end justify-center pb-[4px]">
                  {correction && (
                    <p
                      className={`rotate-[-3deg] font-display text-[36px] font-extrabold leading-none tracking-[-0.02em] text-[var(--deck-accent)] ${isStatic ? '' : 'deck-pop'}`}
                      style={{ animationDelay: `${correction.delay}ms` }}
                    >
                      {correction.text}
                    </p>
                  )}
                </div>
                <p className="text-[22px] font-semibold leading-[1.3] text-[var(--deck-ink)] [text-wrap:balance]">
                  {member.title.map((part) => <Part key={part.text} part={part} edits={edits} isStatic={isStatic} />)}
                </p>
                {member.note && (
                  <p className="mt-[6px] text-[20px] leading-[1.3] text-[var(--deck-muted)]">
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
        <Reveal><Headline>Meet the team.</Headline></Reveal>
        <TeamGrid />
      </div>
    </SlideFrame>
  );
}
