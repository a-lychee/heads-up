import type { ReactNode } from 'react';

interface SlideFrameProps {
  children: ReactNode;
  section: string;
  source?: string;
  className?: string;
}

export function SlideFrame({ children, section, source, className = '' }: SlideFrameProps) {
  return (
    <article className={`deck-slide ${className}`}>
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
