import { UserRound } from 'lucide-react';
import aliciaPhoto from '@/assets/team-alicia.jpg.asset.json';
import { GlassCard } from '../components/GlassCard';
import { Headline } from '../components/Headline';
import { Reveal } from '../components/Reveal';
import { SlideFrame } from '../components/SlideFrame';
import type { SlideMetadata } from '../types';

export const metadata: SlideMetadata = {
  id: 'team',
  title: 'Meet the team',
  section: '00 · Team',
  notes: 'Introduce each person and the perspective they brought to the product. Keep this brief and move quickly to the user problem.',
};

const team = [
  { first: 'Alicia', last: 'Wang', role: 'Role TBD', photo: aliciaPhoto.url },
  { first: 'Aryan', last: 'Ochani', role: 'Role TBD' },
  { first: 'Gabriel', last: 'Lam', role: 'Role TBD' },
  { first: 'Rishabh', last: 'Rajagopalan', role: 'Role TBD' },
  { first: 'Varun', last: 'Sanklecha', role: 'Role TBD' },
];

export default function TeamSlide() {
  return (
    <SlideFrame section={metadata.section}>
      <div className="absolute inset-x-[104px] top-[190px]">
        <Reveal><Headline>Meet the team.</Headline></Reveal>
        <div className="mt-[76px] grid grid-cols-5 gap-[24px]">
          {team.map((member, index) => (
            <Reveal key={`${member.first} ${member.last}`} delay={100 + index * 80}>
              <GlassCard className="h-[520px]">
                {member.photo ? (
                  <div className="h-[126px] w-[126px] overflow-hidden rounded-full border border-white/80 bg-white/50">
                    <img
                      src={member.photo}
                      alt={`${member.first} ${member.last}`}
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                ) : (
                  <div className="flex h-[126px] w-[126px] items-center justify-center rounded-full border border-white/80 bg-white/50 text-[var(--deck-secondary)]">
                    <UserRound size={58} strokeWidth={1.4} />
                  </div>
                )}
                <h2 className="mt-[36px] font-display text-[30px] font-extrabold leading-[1.12] tracking-[-0.03em]">
                  <span className="block">{member.first}</span>
                  <span className="block">{member.last}</span>
                </h2>
                <p className="mt-[12px] text-[22px] font-medium">{member.role}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </SlideFrame>
  );
}
