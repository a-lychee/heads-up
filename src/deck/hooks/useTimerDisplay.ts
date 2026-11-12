import { useEffect, useState } from 'react';
import { getTimerRemaining } from '../lib/timer';
import type { TimerState } from '../types';

export function useTimerDisplay(timer: TimerState) {
  const [remaining, setRemaining] = useState(() => getTimerRemaining(timer));

  useEffect(() => {
    const update = () => setRemaining(getTimerRemaining(timer));
    update();
    if (!timer.running) return;
    const interval = window.setInterval(update, 200);
    return () => window.clearInterval(interval);
  }, [timer]);

  return remaining;
}
