import { createContext, useContext, type CSSProperties, type ReactNode } from 'react';

interface SlideEnvironmentValue {
  static: boolean;
}

const SlideEnvironment = createContext<SlideEnvironmentValue>({ static: false });

export function SlideEnvironmentProvider({ static: isStatic, children }: SlideEnvironmentValue & { children: ReactNode }) {
  return <SlideEnvironment.Provider value={{ static: isStatic }}>{children}</SlideEnvironment.Provider>;
}

export function useSlideEnvironment() {
  return useContext(SlideEnvironment);
}

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: CSSProperties;
}

export function Reveal({ children, delay = 0, className, style }: RevealProps) {
  const { static: isStatic } = useSlideEnvironment();
  return (
    <div
      className={`deck-reveal ${isStatic ? 'deck-reveal-static' : ''} ${className ?? ''}`}
      style={{ ...style, animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
