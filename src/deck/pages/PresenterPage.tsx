import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play, RotateCcw } from 'lucide-react';
import { SlideStage } from '../components/SlideStage';
import { useDeckSync } from '../hooks/useDeckSync';
import { useTimerDisplay } from '../hooks/useTimerDisplay';
import { formatCountdown, timerTone } from '../lib/timer';
import { slides } from '../slides';

export default function PresenterPage() {
  const { state, navigate, next, previous, controlTimer } = useDeckSync('presenter');
  const remaining = useTimerDisplay(state.timer);
  const [clock, setClock] = useState(new Date());
  const slide = slides[state.index];
  const ActiveSlide = slide.Component;
  const nextSlide = slides[state.index + 1];
  const NextSlide = nextSlide?.Component;
  const tone = timerTone(remaining);

  useEffect(() => {
    const interval = window.setInterval(() => setClock(new Date()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.matches('input, textarea, [contenteditable="true"]')) return;
      if (['ArrowRight', ' ', 'PageDown', 'ArrowDown'].includes(event.key)) { event.preventDefault(); next(); }
      if (['ArrowLeft', 'PageUp', 'ArrowUp'].includes(event.key)) { event.preventDefault(); previous(); }
      if (event.key === 'Home') navigate(0);
      if (event.key === 'End') navigate(slides.length - 1);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [navigate, next, previous]);

  return (
    <main className="flex h-dvh min-h-[640px] flex-col overflow-hidden bg-[var(--deck-chrome)] text-[var(--deck-chrome-text)]">
      <header className="flex min-h-[82px] flex-shrink-0 items-center gap-5 border-b border-[var(--deck-lines)] bg-[var(--deck-panel)] px-6">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/35">Time remaining</p>
          <p className="mt-1 font-['Bricolage_Grotesque'] text-[34px] font-extrabold leading-none tabular-nums" style={{ color: tone === 'normal' ? 'var(--deck-chrome-text)' : `var(--deck-timer-${tone})` }}>{formatCountdown(remaining)}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => controlTimer('toggle')} className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-[13px] font-semibold text-[var(--deck-chrome)]">{state.timer.running ? <Pause size={15} fill="currentColor" /> : <Play size={15} fill="currentColor" />}{state.timer.running ? 'Pause' : 'Start'}</button>
          <button onClick={() => controlTimer('reset')} className="flex items-center gap-2 rounded-lg border border-[var(--deck-lines)] px-3 py-2 text-[13px] text-white/65 hover:text-white"><RotateCcw size={15} />Reset</button>
        </div>
        <div className="ml-auto text-right">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/35">Current time</p>
          <p className="mt-1 text-[22px] font-medium tabular-nums">{clock.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</p>
        </div>
      </header>

      <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_360px] gap-5 p-5">
        <section className="relative min-w-0 overflow-hidden rounded-xl border border-[var(--deck-lines)] bg-black/20">
          <div className="absolute left-4 top-3 z-10 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">Current slide · {state.index + 1}</div>
          <div className="absolute inset-0 px-4 pb-4 pt-9"><SlideStage key={state.index} stageClassName="deck-stage-flat"><div className="deck-crossfade"><ActiveSlide /></div></SlideStage></div>
        </section>
        <aside className="flex min-h-0 flex-col gap-5">
          <section className="flex-shrink-0">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">Next</p>
            <div className="aspect-video overflow-hidden rounded-lg border border-[var(--deck-lines)] bg-[var(--deck-panel)]">
              {NextSlide ? <SlideStage static stageClassName="deck-stage-flat"><NextSlide /></SlideStage> : <div className="flex h-full items-center justify-center text-[16px] text-white/40">End of deck</div>}
            </div>
            <p className="mt-2 truncate text-[13px] text-white/50">{nextSlide ? `${state.index + 2}. ${nextSlide.title}` : 'You have reached the final slide'}</p>
          </section>
          <section className="flex min-h-0 flex-1 flex-col rounded-xl border border-[var(--deck-lines)] bg-[var(--deck-panel)] p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">Speaker notes</p>
            <p className="deck-scrollbar mt-4 overflow-y-auto text-[20px] leading-[1.55] text-white/85">{slide.notes}</p>
          </section>
        </aside>
      </div>

      <footer className="flex min-h-[68px] flex-shrink-0 items-center justify-between border-t border-[var(--deck-lines)] bg-[var(--deck-panel)] px-6">
        <button onClick={previous} disabled={state.index === 0} className="flex items-center gap-2 rounded-lg border border-[var(--deck-lines)] px-4 py-2 text-[14px] text-white/75 disabled:opacity-30"><ChevronLeft size={17} />Previous</button>
        <span className="text-[14px] text-white/50">Slide {state.index + 1} of {slides.length}</span>
        <button onClick={next} disabled={state.index === slides.length - 1} className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-[14px] font-semibold text-[var(--deck-chrome)] disabled:opacity-30">Next<ChevronRight size={17} /></button>
      </footer>
    </main>
  );
}
