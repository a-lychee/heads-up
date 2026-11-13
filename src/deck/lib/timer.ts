import type { TimerState } from '../types';

// The presenter timer is a plain stopwatch: it starts at 0:00 and counts up while running.

/** Seconds elapsed, including time since the last update if the timer is running. */
export function getTimerElapsed(timer: TimerState, now = Date.now()) {
  if (!timer.running) return timer.elapsed;
  return timer.elapsed + (now - timer.updatedAt) / 1000;
}

export function createResetTimer(): TimerState {
  return { elapsed: 0, running: false, updatedAt: Date.now() };
}

/** m:ss, e.g. 0:00, 4:07, 12:30. */
export function formatElapsed(elapsed: number) {
  const total = Math.max(0, Math.floor(elapsed));
  const minutes = Math.floor(total / 60);
  const seconds = total % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
