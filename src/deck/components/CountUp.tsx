import { useEffect, useState } from 'react';
import { useSlideEnvironment } from './Reveal';

interface CountUpProps {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  /** Number to count from (default 0), e.g. last year's value. */
  from?: number;
  /** Add thousands separators, e.g. 3,900. */
  grouping?: boolean;
}

export function CountUp({ value, decimals = 0, prefix = '', suffix = '', from = 0, grouping = false }: CountUpProps) {
  const { static: isStatic } = useSlideEnvironment();
  const [display, setDisplay] = useState(isStatic ? value : from);

  useEffect(() => {
    if (isStatic || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(value);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / 1100, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(from + (value - from) * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value, from, isStatic]);

  const text = grouping
    ? display.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
    : display.toFixed(decimals);
  return <>{prefix}{text}{suffix}</>;
}
