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

// Edit names, roles and photos here. The closing copy (10-TeamAgain.tsx) and the edited version (11-TeamUpdate.tsx) reuse this list.
export const team = [
  { id: 'varun', first: 'Varun', last: 'Sanklecha', role: 'Software Engineer at Real Company (TM)', photo: varunPhoto },
  { id: 'aryan', first: 'Aryan', last: 'Ochani', role: 'Varun’s Teammate at Real Company (TM)', photo: aryanPhoto },
  { id: 'alicia', first: 'Alicia', last: 'Wang', role: 'Varun’s Manager at Real Company (TM)', photo: aliciaPhoto.url },
  { id: 'rishabh', first: 'Rishabh', last: 'Rajagopalan', role: 'CTO at Real Company (TM) (Currently OOO)', photo: rishabhPhoto },
  { id: 'gabe', first: 'Gabriel', last: 'Lam', role: 'Intern at Real Company (TM) (Out Getting Coffee)', photo: gabePhoto },
];

const medallionShadow = {
  boxShadow:
    '0 0 0 9px color-mix(in srgb, var(--deck-accent) 13%, transparent), 0 18px 38px color-mix(in srgb, var(--deck-ink) 16%, transparent)',
};

export interface TeamEdits {
  /** Roles to strike through. */
  struck?: string[];
  /** New roles written in above the struck one, by member id. */
  corrections?: Record<string, string>;
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
        const struck = edits?.struck?.includes(member.id);
        const correction = edits?.corrections?.[member.id];
        return (
          <Wrap key={member.id} delay={100 + index * 80}>
            <GlassCard className="h-[540px]">
              <div className="flex h-full flex-col items-center text-center">
                <div className="h-[200px] w-[200px] shrink-0 overflow-hidden rounded-full border-[7px] border-white/75" style={medallionShadow}>
                  <img src={member.photo} alt={`${member.first} ${member.last}`} className="h-full w-full object-cover object-top" />
                </div>
                <h2 className="mt-[26px] font-display text-[30px] font-extrabold leading-[1.12] tracking-[-0.03em]">
                  <span className="block">{member.first}</span>
                  <span className="block">{member.last}</span>
                </h2>
                {/* Slot for a hand-written correction; empty on the opening slide so both layouts match. */}
                <div className="flex h-[78px] items-end justify-center pb-[6px]">
                  {correction && (
                    <p
                      className={`rotate-[-3deg] font-display text-[26px] font-extrabold leading-[1.05] tracking-[-0.02em] text-[var(--deck-accent)] ${isStatic ? '' : 'deck-pop'}`}
                      style={{ animationDelay: '1500ms' }}
                    >
                      {correction}
                    </p>
                  )}
                </div>
                <p className="text-[20px] leading-[1.3] text-[var(--deck-muted)] [text-wrap:balance]">
                  <span
                    className={struck ? (isStatic ? 'deck-strike deck-strike-static' : 'deck-strike') : undefined}
                    style={struck ? { animationDelay: `${member.id === 'rishabh' ? 500 : 1000}ms` } : undefined}
                  >
                    {member.role}
                  </span>
                </p>
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
