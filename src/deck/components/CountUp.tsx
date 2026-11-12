import { useEffect, useState } from 'react';
import { useSlideEnvironment } from './Reveal';

interface CountUpProps {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}

export function CountUp({ value, decimals = 0, prefix = '', suffix = '' }: CountUpProps) {
  const { static: isStatic } = useSlideEnvironment();
  const [display, setDisplay] = useState(isStatic ? value : 0);

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
      setDisplay(value * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value, isStatic]);

  return <>{prefix}{display.toFixed(decimals)}{suffix}</>;
}
