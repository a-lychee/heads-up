import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from 'react';
import { deckTheme } from '../theme';
import { SlideEnvironmentProvider } from './Reveal';

interface SlideStageProps {
  children: ReactNode;
  static?: boolean;
  className?: string;
  stageClassName?: string;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  label?: string;
  /** Called with the slide's on-screen width in px whenever it is resized (e.g. to size a notes panel to match). */
  onWidthChange?: (width: number) => void;
}

export function SlideStage({ children, static: isStatic = false, className = '', stageClassName = '', onClick, label, onWidthChange }: SlideStageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  const onWidthChangeRef = useRef(onWidthChange);
  onWidthChangeRef.current = onWidthChange;

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;
    const update = () => {
      const { width, height } = element.getBoundingClientRect();
      if (!width || !height) return;
      const nextScale = Math.min(width / deckTheme.size.width, height / deckTheme.size.height);
      setScale(nextScale);
      onWidthChangeRef.current?.(nextScale * deckTheme.size.width);
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={`deck-stage-container ${className}`} aria-label={label}>
      <div
        className={`deck-stage ${stageClassName}`}
        style={{ transform: `translate(-50%, -50%) scale(${scale})` }}
        onClick={onClick}
      >
        <SlideEnvironmentProvider static={isStatic}>{children}</SlideEnvironmentProvider>
      </div>
    </div>
  );
}
