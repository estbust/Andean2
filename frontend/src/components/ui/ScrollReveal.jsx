import React from 'react';
import useScrollReveal from '../../hooks/useScrollReveal';

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  duration = 600,
  threshold = 0.12,
  direction = 'up',
  as: Component = 'div',
  ...props
}) {
  const [ref, isVisible] = useScrollReveal({ threshold, once: true });

  const getTransform = () => {
    if (isVisible) return 'translate-y-0 translate-x-0 opacity-100';
    if (direction === 'up') return 'translate-y-6 opacity-0';
    if (direction === 'down') return '-translate-y-6 opacity-0';
    if (direction === 'left') return 'translate-x-6 opacity-0';
    if (direction === 'right') return '-translate-x-6 opacity-0';
    return 'opacity-0';
  };

  return (
    <Component
      ref={ref}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
      className={`transition-all ease-out motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100 ${getTransform()} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
