import { useEffect, useState } from 'react';
import { getTimerElapsed } from '../lib/timer';
import type { TimerState } from '../types';

export function useTimerDisplay(timer: TimerState) {
  const [elapsed, setElapsed] = useState(() => getTimerElapsed(timer));

  useEffect(() => {
    const update = () => setElapsed(getTimerElapsed(timer));
    update();
    if (!timer.running) return;
    const interval = window.setInterval(update, 200);
    return () => window.clearInterval(interval);
  }, [timer]);

  return elapsed;
}
