import type { ComponentType } from 'react';

export interface SlideMetadata {
  id: string;
  title: string;
  section: string;
  notes: string;
}

export interface SlideDefinition extends SlideMetadata {
  Component: ComponentType;
}

export interface TimerState {
  remaining: number;
  running: boolean;
  updatedAt: number;
}

export interface DeckState {
  index: number;
  presenting: boolean;
  timer: TimerState;
}
