import { UserRound } from 'lucide-react';
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
  { name: '[Name]', role: '[Role on team]', background: '[Background]' },
  { name: '[Name]', role: '[Role on team]', background: '[Background]' },
  { name: '[Name]', role: '[Role on team]', background: '[Background]' },
  { name: '[Name]', role: '[Role on team]', background: '[Background]' },
];

export default function TeamSlide() {
  return (
    <SlideFrame section={metadata.section}>
      <div className="absolute inset-x-[104px] top-[190px]">
        <Reveal><Headline>Meet the team.</Headline></Reveal>
        <div className="mt-[92px] grid grid-cols-4 gap-[28px]">
          {team.map((member, index) => (
            <Reveal key={index} delay={100 + index * 80}>
              <GlassCard className="h-[480px]">
                <div className="flex h-[126px] w-[126px] items-center justify-center rounded-full border border-white/80 bg-white/50 text-[var(--deck-secondary)]">
                  <UserRound size={58} strokeWidth={1.4} />
                </div>
                <h2 className="mt-[44px] font-['Bricolage_Grotesque'] text-[38px] font-extrabold tracking-[-0.03em]">{member.name}</h2>
                <p className="mt-[14px] text-[24px] font-medium">{member.role}</p>
                <p className="mt-[22px] text-[21px] leading-[1.4] text-[var(--deck-muted)]">{member.background}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </SlideFrame>
  );
}
