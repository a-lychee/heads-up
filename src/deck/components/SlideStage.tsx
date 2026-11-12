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
}

export function SlideStage({ children, static: isStatic = false, className = '', stageClassName = '', onClick, label }: SlideStageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;
    const update = () => {
      const { width, height } = element.getBoundingClientRect();
      if (!width || !height) return;
      setScale(Math.min(width / deckTheme.size.width, height / deckTheme.size.height));
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
