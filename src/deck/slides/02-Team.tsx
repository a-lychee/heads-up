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

const medallion =
  'flex h-[232px] w-[232px] shrink-0 items-center justify-center overflow-hidden rounded-full border-[7px] border-white/75';

const medallionShadow = {
  boxShadow:
    '0 0 0 9px color-mix(in srgb, var(--deck-accent) 13%, transparent), 0 18px 38px color-mix(in srgb, var(--deck-ink) 16%, transparent)',
};

export default function TeamSlide() {
  return (
    <SlideFrame section={metadata.section}>
      <div className="absolute inset-x-[104px] top-[190px]">
        <Reveal><Headline>Meet the team.</Headline></Reveal>
        <div className="mt-[122px] grid grid-cols-5 gap-[24px]">
          {team.map((member, index) => (
            <Reveal key={`${member.first} ${member.last}`} delay={100 + index * 80}>
              <GlassCard className="h-[500px]">
                <div className="flex h-full flex-col items-center justify-center text-center">
                  {member.photo ? (
                    <div className={medallion} style={medallionShadow}>
                      <img
                        src={member.photo}
                        alt={`${member.first} ${member.last}`}
                        className="h-full w-full object-cover object-top"
                      />
                    </div>
                  ) : (
                    <div
                      className={`${medallion} bg-[color-mix(in_srgb,var(--deck-accent)_7%,transparent)] text-[var(--deck-secondary)]`}
                      style={medallionShadow}
                    >
                      <UserRound size={92} strokeWidth={1.1} />
                    </div>
                  )}
                  <h2 className="mt-[30px] font-display text-[30px] font-extrabold leading-[1.12] tracking-[-0.03em]">
                    <span className="block">{member.first}</span>
                    <span className="block">{member.last}</span>
                  </h2>
                  <p className="mt-[18px] rounded-full bg-[var(--deck-callout)] px-[22px] py-[7px] text-[20px] font-medium text-[var(--deck-callout-text)]">
                    {member.role}
                  </p>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </SlideFrame>
  );
}
