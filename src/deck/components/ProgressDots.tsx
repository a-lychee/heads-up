import { slides } from '../slides';

interface ProgressDotsProps {
  index: number;
  onNavigate: (index: number) => void;
  idle?: boolean;
}

export function ProgressDots({ index, onNavigate, idle = false }: ProgressDotsProps) {
  return (
    <nav
      aria-label="Slide progress"
      className={`flex flex-col items-center gap-[9px] rounded-full border border-white/10 bg-black/20 px-[10px] py-[14px] backdrop-blur-md transition-opacity duration-300 ${idle ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
      onClick={(event) => event.stopPropagation()}
    >
      {slides.map((slide, slideIndex) => (
        <button
          key={slide.id}
          type="button"
          title={`${slideIndex + 1} · ${slide.title}`}
          aria-label={`Go to slide ${slideIndex + 1}: ${slide.title}`}
          aria-current={slideIndex === index ? 'step' : undefined}
          onClick={() => onNavigate(slideIndex)}
          className={`w-[6px] rounded-full transition-all duration-200 ${slideIndex === index ? 'h-[25px] bg-white' : slideIndex < index ? 'h-[6px] bg-white/70 hover:bg-white' : 'h-[6px] bg-white/25 hover:bg-white/60'}`}
        />
      ))}
    </nav>
  );
}
