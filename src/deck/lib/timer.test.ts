import { describe, expect, it } from 'vitest';
import { createResetTimer, formatElapsed, getTimerElapsed } from './timer';

describe('presenter timer', () => {
  it('starts at zero', () => {
    expect(formatElapsed(createResetTimer().elapsed)).toBe('0:00');
  });

  it('counts up from the timestamp while running', () => {
    const timer = { elapsed: 60, running: true, updatedAt: 1_000 };
    expect(getTimerElapsed(timer, 13_000)).toBe(72);
    expect(formatElapsed(getTimerElapsed(timer, 13_000))).toBe('1:12');
  });

  it('holds still while paused', () => {
    const timer = { elapsed: 125, running: false, updatedAt: 1_000 };
    expect(getTimerElapsed(timer, 99_000)).toBe(125);
    expect(formatElapsed(125)).toBe('2:05');
  });
});
