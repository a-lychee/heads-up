import type { ReactNode } from 'react';

interface StatPillProps {
  value: ReactNode;
  label: string;
  className?: string;
}

export function StatPill({ value, label, className = '' }: StatPillProps) {
  return (
    <div className={`deck-stat-pill ${className}`}>
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}
