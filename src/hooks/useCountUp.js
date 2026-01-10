import { useState, useEffect, useRef } from 'react';

const useCountUp = (endValue, options = {}) => {
  const { duration = 2000, startOnView = true, delay = 0 } = options;

  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef(null);

  // Parse the end value (handle "5+", "100%", "6+", etc.)
  const parseValue = (value) => {
    const numericPart = parseInt(value.toString().replace(/[^0-9]/g, ''), 10);
    return isNaN(numericPart) ? 0 : numericPart;
  };

  const numericEnd = parseValue(endValue);
  const suffix = endValue.toString().replace(/[0-9]/g, '');

  useEffect(() => {
    if (!startOnView) {
      setHasStarted(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStarted) {
            setHasStarted(true);
          }
        });
      },
      { threshold: 0.5 }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [startOnView, hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp + delay;

      if (timestamp < startTime) {
        animationFrame = requestAnimationFrame(animate);
        return;
      }

      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);

      const currentValue = Math.floor(easeOut * numericEnd);
      setCount(currentValue);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [hasStarted, numericEnd, duration, delay]);

  return {
    count,
    displayValue: `${count}${suffix}`,
    ref: elementRef,
  };
};

export default useCountUp;
