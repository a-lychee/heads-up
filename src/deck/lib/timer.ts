import { TIMER_SECONDS } from '../theme';
import type { TimerState } from '../types';

export function getTimerRemaining(timer: TimerState, now = Date.now()) {
  if (!timer.running) return timer.remaining;
  return timer.remaining - (now - timer.updatedAt) / 1000;
}

export function createResetTimer(): TimerState {
  return { remaining: TIMER_SECONDS, running: false, updatedAt: Date.now() };
}

export function formatCountdown(remaining: number) {
  const overtime = remaining < 0;
  const total = overtime ? Math.ceil(-remaining) : Math.ceil(remaining);
  const minutes = Math.floor(total / 60);
  const seconds = total % 60;
  return `${overtime ? '+' : ''}${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export function timerTone(remaining: number): 'normal' | 'amber' | 'red' {
  if (remaining < 0) return 'red';
  if (remaining < 60) return 'amber';
  return 'normal';
}
