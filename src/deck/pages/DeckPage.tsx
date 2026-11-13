import { useCallback, useEffect, useRef, useState, type TouchEvent } from 'react';
import { ChevronLeft, ChevronRight, CircleHelp, ExternalLink, MonitorUp, Play, X } from 'lucide-react';
import { ProgressDots } from '../components/ProgressDots';
import { NotesEditor } from '../components/NotesEditor';
import { SlideStage } from '../components/SlideStage';
import { useDeckSync } from '../hooks/useDeckSync';
import { useSpeakerNotes } from '../hooks/useSpeakerNotes';
import { slides } from '../slides';

const shortcuts = [
  ['Next slide', '→ / Space / Page Down / ↓'],
  ['Previous slide', '← / Page Up / ↑'],
  ['First / last slide', 'Home / End'],
  ['Jump to slide', 'Type a number, then Enter'],
  ['Present', 'F / F5'],
  ['Presenter window', 'P'],
  ['Black screen', 'B / .'],
  ['Exit presentation', 'Esc'],
  ['Shortcuts', '?'],
  ['Touch navigation', 'Swipe left / right'],
];

export default function DeckPage() {
  const { state, navigate, next, previous, setPresenting } = useDeckSync('editor');
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [blackScreen, setBlackScreen] = useState(false);
  const [idle, setIdle] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(() => Boolean(document.fullscreenElement));
  // Inside Lovable's preview iframe the browser isolates this page from the
  // presenter window, so syncing and fullscreen don't work. Offer a new tab.
  const inIframe = window.self !== window.top;
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const numberBuffer = useRef('');
  const numberTimeout = useRef<number | undefined>(undefined);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const slide = slides[state.index];
  const speakerNotes = useSpeakerNotes();
  const [copied, setCopied] = useState(false);
  // On-screen width of the slide, so the notes panel below can match it exactly.
  const [slideWidth, setSlideWidth] = useState<number>();
  const copyAllNotes = () => {
    void navigator.clipboard.writeText(speakerNotes.exportAll()).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    });
  };
  const ActiveSlide = slide.Component;

  const openPresenter = useCallback(() => {
    window.open('/deck/presenter', 'heads-up-presenter', 'popup,width=1440,height=960');
  }, []);

  const startPresent = useCallback(() => {
    setBlackScreen(false);
    setPresenting(true);
    if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => undefined);
  }, [setPresenting]);

  const exitPresent = useCallback(() => {
    setPresenting(false);
    setBlackScreen(false);
    if (document.fullscreenElement) document.exitFullscreen().catch(() => undefined);
  }, [setPresenting]);

  useEffect(() => {
    thumbnailRefs.current[state.index]?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [state.index]);

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
      if (!document.fullscreenElement && state.presenting) setPresenting(false);
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, [setPresenting, state.presenting]);

  // The presenter window can end the presentation; leave fullscreen too.
  useEffect(() => {
    if (!state.presenting && document.fullscreenElement) document.exitFullscreen().catch(() => undefined);
  }, [state.presenting]);

  useEffect(() => {
    if (!state.presenting) return;
    let timeout = window.setTimeout(() => setIdle(true), 2000);
    const wake = () => {
      setIdle(false);
      window.clearTimeout(timeout);
      timeout = window.setTimeout(() => setIdle(true), 2000);
    };
    wake();
    window.addEventListener('mousemove', wake);
    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener('mousemove', wake);
    };
  }, [state.presenting]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.matches('input, textarea, [contenteditable="true"]') || event.metaKey || event.ctrlKey || event.altKey) return;

      if (/^[0-9]$/.test(event.key)) {
        numberBuffer.current = `${numberBuffer.current}${event.key}`.slice(-2);
        window.clearTimeout(numberTimeout.current);
        numberTimeout.current = window.setTimeout(() => { numberBuffer.current = ''; }, 1000);
        return;
      }
      if (event.key === 'Enter' && numberBuffer.current) {
        event.preventDefault();
        navigate(Number(numberBuffer.current) - 1);
        numberBuffer.current = '';
        return;
      }

      switch (event.key) {
        case 'ArrowRight': case ' ': case 'PageDown': case 'ArrowDown':
          event.preventDefault(); next(); break;
        case 'ArrowLeft': case 'PageUp': case 'ArrowUp':
          event.preventDefault(); previous(); break;
        case 'Home': event.preventDefault(); navigate(0); break;
        case 'End': event.preventDefault(); navigate(slides.length - 1); break;
        case 'f': case 'F': case 'F5':
          event.preventDefault(); startPresent(); break;
        case 'Escape':
          if (showShortcuts) setShowShortcuts(false);
          else if (state.presenting) exitPresent();
          break;
        case 'p': case 'P': event.preventDefault(); openPresenter(); break;
        case 'b': case 'B': case '.':
          if (state.presenting) { event.preventDefault(); setBlackScreen((value) => !value); }
          break;
        case '?': event.preventDefault(); setShowShortcuts((value) => !value); break;
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [exitPresent, navigate, next, openPresenter, previous, showShortcuts, startPresent, state.presenting]);

  const onTouchStart = (event: TouchEvent) => {
    const touch = event.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };
  const onTouchEnd = (event: TouchEvent) => {
    if (!touchStart.current) return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - touchStart.current.x;
    const dy = touch.clientY - touchStart.current.y;
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy)) dx < 0 ? next() : previous();
    touchStart.current = null;
  };

  return (
    <main className="flex h-dvh min-h-[620px] flex-col overflow-hidden bg-[var(--deck-chrome)] text-[var(--deck-chrome-text)]" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <header className="flex h-[66px] flex-shrink-0 items-center justify-between border-b border-[var(--deck-lines)] bg-[var(--deck-panel)] px-5">
        <div className="flex items-center gap-3">
          <span className="h-3 w-3 rounded-full bg-[var(--deck-accent)]" />
          <h1 className="text-[15px] font-semibold">Heads-Up</h1>
          <span className="hidden text-[13px] text-white/40 sm:inline">Kilts Product Competition · Phase 2</span>
        </div>
        <div className="flex items-center gap-2">
          {inIframe && (
            <a href={window.location.href} target="_blank" rel="noreferrer" className="mr-2 flex items-center gap-2 rounded-lg border border-[var(--deck-timer-amber-line)] px-3 py-2 text-[12px] text-[var(--deck-timer-amber)] hover:bg-white/5">
              <ExternalLink size={14} />Open in a new tab to present
            </a>
          )}
          <div className="mr-2 flex items-center rounded-lg border border-[var(--deck-lines)]">
            <button onClick={previous} aria-label="Previous slide" className="p-2 text-white/70 hover:text-white"><ChevronLeft size={17} /></button>
            <span className="min-w-[58px] text-center text-[12px] tabular-nums text-white/60">{state.index + 1} / {slides.length}</span>
            <button onClick={next} aria-label="Next slide" className="p-2 text-white/70 hover:text-white"><ChevronRight size={17} /></button>
          </div>
          <button onClick={() => setShowShortcuts(true)} aria-label="Keyboard shortcuts" className="rounded-lg p-2 text-white/60 hover:bg-white/5 hover:text-white"><CircleHelp size={18} /></button>
          <button onClick={openPresenter} className="hidden items-center gap-2 rounded-lg px-3 py-2 text-[13px] font-medium text-white/75 hover:bg-white/5 hover:text-white md:flex"><MonitorUp size={16} />Presenter view <span className="text-white/35">(P)</span></button>
          <button onClick={startPresent} className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-[13px] font-semibold text-[var(--deck-chrome)]"><Play size={15} fill="currentColor" />Present <span className="font-normal opacity-45">(F)</span></button>
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        <aside className="deck-scrollbar hidden w-[232px] flex-shrink-0 overflow-y-auto border-r border-[var(--deck-lines)] bg-[var(--deck-panel)] p-3 lg:block">
          <div className="space-y-3">
            {slides.map((item, index) => {
              const Thumbnail = item.Component;
              return (
                <button
                  key={item.id}
                  ref={(element) => { thumbnailRefs.current[index] = element; }}
                  onClick={() => navigate(index)}
                  className={`block w-full rounded-lg border p-[5px] text-left ${index === state.index ? 'border-white bg-white/5' : 'border-transparent hover:border-white/20'}`}
                  aria-label={`Slide ${index + 1}: ${item.title}`}
                >
                  <div className="pointer-events-none aspect-video w-full overflow-hidden rounded-[5px]">
                    <SlideStage static stageClassName="deck-stage-thumbnail"><Thumbnail /></SlideStage>
                  </div>
                  <div className="flex items-center gap-2 px-1 pb-1 pt-2 text-[11px]"><span className="tabular-nums text-white/35">{String(index + 1).padStart(2, '0')}</span><span className="truncate text-white/65">{item.title}</span></div>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Slide and its notes share the column to the right of the thumbnails, so the thumbnail strip runs the full height. */}
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <section className="relative min-h-0 min-w-0 flex-1 bg-[var(--deck-chrome)] p-4 sm:p-7">
          <SlideStage key={state.index} stageClassName="deck-stage-flat sm:rounded-xl" label={`Slide ${state.index + 1}: ${slide.title}`} onWidthChange={setSlideWidth}>
            <div className={slide.transition === 'none' ? undefined : 'deck-crossfade'}><ActiveSlide /></div>
          </SlideStage>
          <div className="absolute right-2 top-1/2 -translate-y-1/2 sm:right-3">
            <ProgressDots index={state.index} onNavigate={navigate} />
          </div>
        </section>

      {/* Notes panel is exactly as wide as the slide above it. The label, slide id and Copy button sit in a row above
          the text box, so nothing overlaps the notes. */}
      <footer className="flex-shrink-0 border-t border-[var(--deck-lines)] bg-[var(--deck-panel)] px-4 py-3 sm:px-7">
        <div className="mx-auto flex max-w-full flex-col" style={{ width: slideWidth }}>
          <div className="flex items-center justify-between gap-4 pb-1">
            <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-white/40">Speaker notes</span>
            <div className="flex items-center gap-3 text-[12px] text-white/30">
              <span className="tabular-nums">{slide.id}</span>
              <button
                type="button"
                onClick={copyAllNotes}
                className="rounded-md border border-[var(--deck-lines)] px-2 py-1 text-white/55 hover:text-white"
                title="Copy every slide's notes, including your edits"
              >
                {copied ? 'Copied' : `Copy all notes${speakerNotes.editedCount ? ` (${speakerNotes.editedCount} edited)` : ''}`}
              </button>
            </div>
          </div>
          <div className="flex h-[112px]">
            <NotesEditor
              slideId={slide.id}
              value={speakerNotes.notesFor(slide.id)}
              edited={speakerNotes.isEdited(slide.id)}
              onSave={speakerNotes.saveNotes}
              onReset={speakerNotes.resetNotes}
              className="px-2 py-1 text-[15px] leading-[1.55] text-white/80"
            />
          </div>
        </div>
      </footer>
        </div>
      </div>

      {state.presenting && (
        <div className={`fixed inset-0 z-50 bg-black ${idle ? 'cursor-none' : ''}`}>
          {blackScreen ? <div className="h-full w-full bg-black" onClick={() => setBlackScreen(false)} /> : (
            <SlideStage stageClassName="deck-stage-flat" onClick={next} label={`Presenting slide ${state.index + 1}`}>
              <div key={state.index} className={slide.transition === 'none' ? undefined : 'deck-crossfade'}><ActiveSlide /></div>
            </SlideStage>
          )}
          <div className="absolute right-5 top-1/2 -translate-y-1/2"><ProgressDots index={state.index} onNavigate={navigate} idle={idle} /></div>
          {!isFullscreen && (
            <button
              onClick={startPresent}
              className={`absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full border border-white/15 bg-black/60 px-5 py-2 text-[14px] text-white/80 backdrop-blur-md transition-opacity duration-300 ${idle ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
            >
              Press F for fullscreen
            </button>
          )}
        </div>
      )}

      {showShortcuts && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-6 backdrop-blur-sm" onClick={() => setShowShortcuts(false)}>
          <section role="dialog" aria-modal="true" aria-labelledby="shortcuts-title" className="w-full max-w-[620px] rounded-2xl border border-[var(--deck-lines)] bg-[var(--deck-panel)] p-7 shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-center justify-between"><h2 id="shortcuts-title" className="text-xl font-semibold">Keyboard shortcuts</h2><button onClick={() => setShowShortcuts(false)} aria-label="Close shortcuts" className="rounded-lg p-2 text-white/50 hover:bg-white/5 hover:text-white"><X size={20} /></button></div>
            <div className="mt-6 divide-y divide-[var(--deck-lines)]">
              {shortcuts.map(([label, keys]) => <div key={label} className="flex items-center justify-between gap-6 py-3 text-[14px]"><span className="text-white/65">{label}</span><kbd className="text-right font-sans text-[12px] text-white/90">{keys}</kbd></div>)}
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
