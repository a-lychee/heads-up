import { describe, expect, it } from 'vitest';
import { createResetTimer, formatCountdown, getTimerRemaining, timerTone } from './timer';

describe('presenter countdown', () => {
  it('starts at the hard eight-minute limit', () => {
    expect(formatCountdown(createResetTimer().remaining)).toBe('8:00');
  });

  it('counts down from the timestamp while running', () => {
    const timer = { remaining: 480, running: true, updatedAt: 1_000 };
    expect(getTimerRemaining(timer, 13_000)).toBe(468);
    expect(formatCountdown(getTimerRemaining(timer, 13_000))).toBe('7:48');
  });

  it('turns amber under one minute', () => {
    expect(timerTone(60)).toBe('normal');
    expect(timerTone(59.9)).toBe('amber');
  });

  it('turns red and shows positive elapsed overtime', () => {
    expect(timerTone(-0.1)).toBe('red');
    expect(formatCountdown(-12)).toBe('+0:12');
  });
});
