import type { CSSProperties, ReactNode } from 'react';

interface HeadlineProps {
  children: ReactNode;
  secondary?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function Headline({ children, secondary, className = '', style }: HeadlineProps) {
  return (
    <h1 className={`deck-headline ${className}`} style={style}>
      <span className="deck-headline-primary">{children}</span>
      {secondary && <span className="deck-headline-secondary">{secondary}</span>}
    </h1>
  );
}
