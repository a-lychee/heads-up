import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Minus, MonitorPlay, Pause, Play, Plus, RotateCcw, Square } from 'lucide-react';
import { SlideStage } from '../components/SlideStage';
import { useDeckSync } from '../hooks/useDeckSync';
import { useTimerDisplay } from '../hooks/useTimerDisplay';
import { formatCountdown, timerTone } from '../lib/timer';
import { slides } from '../slides';

const NOTES_SIZE_KEY = 'heads-up-notes-size';
const NOTES_SIZE_DEFAULT = 40;
const NOTES_SIZE_MIN = 20;
const NOTES_SIZE_MAX = 80;
const NOTES_SIZE_STEP = 4;

const clampNotesSize = (size: number) => Math.max(NOTES_SIZE_MIN, Math.min(NOTES_SIZE_MAX, size));
const readNotesSize = () => {
  const stored = Number(window.localStorage.getItem(NOTES_SIZE_KEY));
  return Number.isFinite(stored) && stored > 0 ? clampNotesSize(stored) : NOTES_SIZE_DEFAULT;
};

const label = 'text-[12px] font-semibold uppercase tracking-[0.14em] text-white/40';

export default function PresenterPage() {
  const { state, navigate, next, previous, controlTimer, setPresenting, peerConnected } = useDeckSync('presenter');
  const remaining = useTimerDisplay(state.timer);
  const [clock, setClock] = useState(new Date());
  const [notesSize, setNotesSize] = useState(readNotesSize);
  const slide = slides[state.index];
  const ActiveSlide = slide.Component;
  const nextSlide = slides[state.index + 1];
  const NextSlide = nextSlide?.Component;
  const tone = timerTone(remaining);

  const changeNotesSize = useCallback((delta: number) => {
    setNotesSize((size) => {
      const nextSize = clampNotesSize(size + delta);
      window.localStorage.setItem(NOTES_SIZE_KEY, String(nextSize));
      return nextSize;
    });
  }, []);

  const openAudienceWindow = useCallback(() => {
    window.open(`/deck#${state.index + 1}`, 'heads-up-audience');
  }, [state.index]);

  useEffect(() => {
    const interval = window.setInterval(() => setClock(new Date()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.matches('input, textarea, [contenteditable="true"]') || event.metaKey || event.ctrlKey || event.altKey) return;
      if (['ArrowRight', ' ', 'PageDown', 'ArrowDown'].includes(event.key)) { event.preventDefault(); next(); }
      else if (['ArrowLeft', 'PageUp', 'ArrowUp'].includes(event.key)) { event.preventDefault(); previous(); }
      else if (event.key === 'Home') navigate(0);
      else if (event.key === 'End') navigate(slides.length - 1);
      else if (event.key === '+' || event.key === '=') changeNotesSize(NOTES_SIZE_STEP);
      else if (event.key === '-' || event.key === '_') changeNotesSize(-NOTES_SIZE_STEP);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [changeNotesSize, navigate, next, previous]);

  return (
    <main className="flex h-dvh min-h-[600px] flex-col overflow-hidden bg-[var(--deck-chrome)] text-[var(--deck-chrome-text)]">
      <header className="flex flex-shrink-0 items-center gap-6 border-b border-[var(--deck-lines)] bg-[var(--deck-panel)] px-6 py-3">
        <div className="flex items-center gap-4">
          <p
            className="font-display text-[44px] font-extrabold leading-none tabular-nums"
            style={{ color: tone === 'normal' ? 'var(--deck-chrome-text)' : `var(--deck-timer-${tone})` }}
            aria-label="Time remaining"
          >
            {formatCountdown(remaining)}
          </p>
          <div className="flex gap-2">
            <button onClick={() => controlTimer('toggle')} className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-[13px] font-medium text-white/85 hover:bg-white/15">
              {state.timer.running ? <Pause size={15} fill="currentColor" /> : <Play size={15} fill="currentColor" />}{state.timer.running ? 'Pause' : 'Start'}
            </button>
            <button onClick={() => controlTimer('reset')} className="flex items-center gap-2 rounded-lg border border-[var(--deck-lines)] px-3 py-2 text-[13px] text-white/65 hover:text-white">
              <RotateCcw size={15} />Reset
            </button>
          </div>
        </div>

        <div className="mx-auto flex items-center gap-3">
          {!peerConnected ? (
            <button onClick={openAudienceWindow} className="flex items-center gap-2 rounded-lg border border-[var(--deck-timer-amber-line)] px-4 py-2 text-[14px] text-[var(--deck-timer-amber)] hover:bg-white/5">
              <MonitorPlay size={16} />Open audience window
            </button>
          ) : state.presenting ? (
            <>
              <span className="flex items-center gap-2 text-[14px] text-white/70"><span className="h-2.5 w-2.5 rounded-full bg-[var(--deck-live)]" />Audience screen is live</span>
              <button onClick={() => setPresenting(false)} className="flex items-center gap-2 rounded-lg border border-[var(--deck-lines)] px-3 py-2 text-[13px] text-white/65 hover:text-white">
                <Square size={13} fill="currentColor" />End
              </button>
            </>
          ) : (
            <button onClick={() => setPresenting(true)} className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-[14px] font-semibold text-[var(--deck-chrome)]">
              <Play size={15} fill="currentColor" />Start presenting
            </button>
          )}
        </div>

        <div className="flex items-center gap-6 text-right">
          <div>
            <p className={label}>Slide</p>
            <p className="mt-1 text-[22px] font-medium tabular-nums">{state.index + 1} <span className="text-white/40">/ {slides.length}</span></p>
          </div>
          <div>
            <p className={label}>Time</p>
            <p className="mt-1 text-[22px] font-medium tabular-nums">{clock.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</p>
          </div>
        </div>
      </header>

      <div className="grid min-h-0 flex-1 grid-cols-[minmax(280px,2fr)_minmax(0,3fr)] gap-5 p-5">
        <aside className="deck-scrollbar flex min-h-0 flex-col gap-5 overflow-y-auto pr-1">
          <section>
            <p className={`${label} mb-2`}>Now · {slide.title}</p>
            <div className="aspect-video w-full overflow-hidden rounded-lg border border-[var(--deck-lines)]">
              <SlideStage key={state.index} stageClassName="deck-stage-flat"><div className="deck-crossfade"><ActiveSlide /></div></SlideStage>
            </div>
          </section>
          <section className="w-[65%]">
            <p className={`${label} mb-2 truncate`}>{nextSlide ? `Next · ${nextSlide.title}` : 'Next'}</p>
            <div className="aspect-video w-full overflow-hidden rounded-lg border border-[var(--deck-lines)] bg-[var(--deck-panel)]">
              {NextSlide ? <SlideStage static stageClassName="deck-stage-flat"><NextSlide /></SlideStage> : <div className="flex h-full items-center justify-center text-[15px] text-white/40">End of deck</div>}
            </div>
          </section>
        </aside>

        <section className="flex min-h-0 flex-col rounded-xl border border-[var(--deck-lines)] bg-[var(--deck-panel)]">
          <div className="flex flex-shrink-0 items-center justify-between border-b border-[var(--deck-lines)] px-6 py-3">
            <p className={label}>Speaker notes</p>
            <div className="flex items-center gap-1" aria-label="Notes text size">
              <button onClick={() => changeNotesSize(-NOTES_SIZE_STEP)} disabled={notesSize <= NOTES_SIZE_MIN} aria-label="Smaller notes text" className="rounded-md p-2 text-white/60 hover:bg-white/5 hover:text-white disabled:opacity-30"><Minus size={16} /></button>
              <span className="w-[48px] text-center text-[12px] tabular-nums text-white/45">{notesSize}px</span>
              <button onClick={() => changeNotesSize(NOTES_SIZE_STEP)} disabled={notesSize >= NOTES_SIZE_MAX} aria-label="Larger notes text" className="rounded-md p-2 text-white/60 hover:bg-white/5 hover:text-white disabled:opacity-30"><Plus size={16} /></button>
            </div>
          </div>
          <p
            className="deck-scrollbar min-h-0 flex-1 overflow-y-auto px-8 py-6 font-medium text-white [text-wrap:pretty]"
            style={{ fontSize: notesSize, lineHeight: 1.4 }}
          >
            {slide.notes}
          </p>
        </section>
      </div>

      <footer className="grid flex-shrink-0 grid-cols-[1fr_auto_1fr] items-center gap-4 border-t border-[var(--deck-lines)] bg-[var(--deck-panel)] px-6 py-3">
        <button onClick={previous} disabled={state.index === 0} className="flex items-center gap-2 justify-self-start rounded-lg border border-[var(--deck-lines)] px-5 py-3 text-[15px] text-white/80 hover:text-white disabled:opacity-30">
          <ChevronLeft size={18} />Previous
        </button>
        <p className="text-center text-[13px] text-white/40">← → to move · + − for notes size</p>
        <button onClick={next} disabled={state.index === slides.length - 1} className="flex items-center gap-2 justify-self-end rounded-lg bg-white px-6 py-3 text-[15px] font-semibold text-[var(--deck-chrome)] disabled:opacity-30">
          Next<ChevronRight size={18} />
        </button>
      </footer>
    </main>
  );
}
