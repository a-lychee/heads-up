import { Headline } from '../components/Headline';
import { Reveal } from '../components/Reveal';
import { SlideFrame } from '../components/SlideFrame';
import type { SlideMetadata } from '../types';

export const metadata: SlideMetadata = {
  id: 'thank-you',
  title: 'Thank you',
  section: 'Q&A',
  notes: 'Thank the judges and invite questions. Keep the product promise visible in your answers: the right record, before the next recurring meeting.',
};

export default function ThankYouSlide() {
  return (
    <SlideFrame section={metadata.section}>
      <div className="absolute inset-x-[104px] top-[330px]">
        <Reveal><Headline style={{ fontSize: 150 }} secondary={<span className="mt-[25px]">Questions?</span>}>Thank you.</Headline></Reveal>
        <Reveal delay={160}><p className="mt-[90px] text-[26px] text-[var(--deck-muted)]">Ansel&apos;s record, back when it matters.</p></Reveal>
      </div>
    </SlideFrame>
  );
}
