import { Brain, FileText, MessagesSquare } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { Headline } from '../components/Headline';
import { Reveal } from '../components/Reveal';
import { SlideFrame } from '../components/SlideFrame';
import type { SlideMetadata } from '../types';

export const metadata: SlideMetadata = {
  id: 'today',
  title: 'What they do today',
  section: '01 · Today',
  notes: 'These workarounds all fail at the same moment: the start of the next meeting. Memory fades, colleagues get interrupted, and the existing summary does not pull out what matters to this person.',
};

const alternatives = [
  { icon: Brain, title: 'Rely on memory', body: 'Forgets once the email arrives', detail: '0.4 Ansel sessions a week' },
  { icon: MessagesSquare, title: 'Ask a colleague', body: 'Pulls a teammate off their own work', detail: '' },
  { icon: FileText, title: 'Reread old notes', body: '22 seconds on a summary, then it’s buried', detail: '' },
];

export default function TodaySlide() {
  return (
    <SlideFrame section={metadata.section} source="Ex 3, 5, 7, 8">
      <div className="absolute inset-x-[104px] top-[205px]">
        <Reveal><Headline>Today they walk in cold.</Headline></Reveal>
        <div className="mt-[100px] grid grid-cols-3 gap-[32px]">
          {alternatives.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={100 + index * 90}>
                <GlassCard className="h-[440px]">
                  <div className="flex h-[76px] w-[76px] items-center justify-center rounded-[22px] bg-[var(--deck-callout)] text-[var(--deck-accent)]"><Icon size={35} strokeWidth={1.7} /></div>
                  <h2 className="mt-[44px] font-display text-[38px] font-extrabold tracking-[-0.03em]">{item.title}</h2>
                  <p className="mt-[22px] text-[26px] leading-[1.4] text-[var(--deck-muted)]">{item.body}</p>
                  {item.detail && <p className="mt-[18px] text-[20px] text-[var(--deck-muted)]">({item.detail})</p>}
                </GlassCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </SlideFrame>
  );
}
