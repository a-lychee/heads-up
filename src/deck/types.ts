import type { ComponentType } from 'react';

export interface SlideMetadata {
  id: string;
  title: string;
  section: string;
  notes: string;
  /** Set to 'none' to skip the crossfade when this slide appears (e.g. a slide that edits the one before it). */
  transition?: 'none';
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
