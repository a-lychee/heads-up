import type { CSSProperties, ReactNode } from 'react';

interface SlideFrameProps {
  children: ReactNode;
  section: string;
  source?: string;
  className?: string;
  /** Center of the warm background glow, in px on the 1920×1080 slide. Defaults to 78% / 46%. */
  glow?: { x: number; y: number };
}

export function SlideFrame({ children, section, source, className = '', glow }: SlideFrameProps) {
  const style = glow ? ({ '--deck-glow-x': `${glow.x}px`, '--deck-glow-y': `${glow.y}px` } as CSSProperties) : undefined;
  return (
    <article className={`deck-slide ${className}`} style={style}>
      <div className="deck-grain" aria-hidden="true" />
      <header className="deck-chrome">
        <div className="deck-brand"><span className="deck-brand-dot" />Heads-Up</div>
        <div className="deck-section">{section}</div>
      </header>
      {children}
      {source && <div className="deck-source">{source}</div>}
    </article>
  );
}
