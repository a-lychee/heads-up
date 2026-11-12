import type { CSSProperties, ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  stacked?: boolean;
}

export function GlassCard({ children, className = '', style, stacked = false }: GlassCardProps) {
  return (
    <div className={`deck-card-wrap ${stacked ? 'deck-card-stacked' : ''} ${className}`} style={style}>
      {stacked && <div className="deck-card-back" aria-hidden="true" />}
      <div className="deck-glass-card">{children}</div>
    </div>
  );
}
