import { useEffect, useRef, useCallback } from 'react';

/**
 * Hook for staggered reveal animations on individual items
 * Each item animates when it enters the viewport
 */
const useStaggerReveal = (options = {}) => {
  const containerRef = useRef(null);
  const { threshold = 0.15, rootMargin = '0px 0px -50px 0px', staggerDelay = 150 } = options;

  const observeItems = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll('.stagger-item');
    let revealedCount = 0;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !entry.target.classList.contains('revealed')) {
            setTimeout(() => {
              entry.target.classList.add('revealed');
            }, revealedCount * staggerDelay);
            revealedCount++;
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    items.forEach((item) => {
      observer.observe(item);
    });

    return () => {
      items.forEach((item) => {
        observer.unobserve(item);
      });
    };
  }, [threshold, rootMargin, staggerDelay]);

  useEffect(() => {
    const timeoutId = setTimeout(observeItems, 100);
    return () => clearTimeout(timeoutId);
  }, [observeItems]);

  return containerRef;
};

export default useStaggerReveal;
