import type { ReactNode } from 'react';

export function Kicker({ children }: { children: ReactNode }) {
  return <p className="deck-kicker">{children}</p>;
}
