import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook for smooth scroll reveal based on IntersectionObserver.
 * Fully supports prefers-reduced-motion for accessibility.
 */
export function useScrollReveal({
  threshold = 0.15,
  rootMargin = '0px 0px -20px 0px',
  once = true,
} = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    // Check if user prefers reduced motion
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }

    const currentElem = ref.current;
    if (!currentElem || typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const getViewportHeight = () =>
      window.innerHeight || document.documentElement?.clientHeight || 800;

    const initialRect = currentElem.getBoundingClientRect();
    const initialViewportHeight = getViewportHeight();

    // Reveal immediately if element is already visible within the viewport on mount
    if (
      initialRect.height > 0 &&
      initialRect.top < initialViewportHeight - 20 &&
      initialRect.bottom > 0
    ) {
      setIsVisible(true);
      if (once) return;
    }

    // Use a safe low threshold for tall sections (e.g. mobile / landscape viewports)
    const effectiveThreshold =
      initialRect.height > initialViewportHeight * 0.5
        ? Math.min(threshold, Math.max(0.01, 40 / initialRect.height))
        : threshold;

    const thresholds = Array.from(
      new Set([0, 0.01, 0.05, 0.12, effectiveThreshold, threshold])
    )
      .filter((t) => t >= 0 && t <= 1)
      .sort((a, b) => a - b);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const viewportHeight = getViewportHeight();
          const elemHeight = entry.boundingClientRect.height;
          const minVisibleHeight = Math.min(40, elemHeight * threshold);
          const hasEnoughVisible =
            entry.intersectionRatio >= effectiveThreshold ||
            entry.intersectionRatio >= threshold ||
            entry.intersectionRect.height >= minVisibleHeight ||
            elemHeight > viewportHeight * 0.8;

          if (hasEnoughVisible) {
            setIsVisible(true);
            if (once) {
              observer.unobserve(entry.target);
            }
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold: thresholds, rootMargin }
    );

    observer.observe(currentElem);

    return () => {
      if (currentElem) {
        observer.unobserve(currentElem);
      }
    };
  }, [threshold, rootMargin, once]);

  return [ref, isVisible];
}

export default useScrollReveal;
