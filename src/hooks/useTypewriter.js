import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for typewriter effect with typing, pause, and deleting
 * @param {string} text - The full text to type
 * @param {Object} options - Configuration options
 * @param {number} options.typeSpeed - Typing speed in ms (default: 100)
 * @param {number} options.deleteSpeed - Deleting speed in ms (default: 50)
 * @param {number} options.pauseDuration - Pause duration after typing in ms (default: 6000)
 * @param {number} options.startDelay - Delay before starting to type again in ms (default: 500)
 * @returns {string} The current display text
 */
const useTypewriter = (
  text,
  { typeSpeed = 100, deleteSpeed = 50, pauseDuration = 6000, startDelay = 500 } = {}
) => {
  const [displayText, setDisplayText] = useState('');

  const typeWriter = useCallback(() => {
    let currentIndex = 0;
    let isDeleting = false;
    let timeoutId;
    let intervalId;

    const tick = () => {
      intervalId = setInterval(
        () => {
          if (!isDeleting) {
            if (currentIndex <= text.length) {
              setDisplayText(text.slice(0, currentIndex));
              currentIndex++;
            } else {
              clearInterval(intervalId);
              timeoutId = setTimeout(() => {
                isDeleting = true;
                currentIndex = text.length;
                tick();
              }, pauseDuration);
            }
          } else {
            if (currentIndex >= 0) {
              setDisplayText(text.slice(0, currentIndex));
              currentIndex--;
            } else {
              clearInterval(intervalId);
              timeoutId = setTimeout(() => {
                isDeleting = false;
                currentIndex = 0;
                tick();
              }, startDelay);
            }
          }
        },
        isDeleting ? deleteSpeed : typeSpeed
      );
    };

    tick();

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [text, typeSpeed, deleteSpeed, pauseDuration, startDelay]);

  useEffect(() => {
    const cleanup = typeWriter();
    return cleanup;
  }, [typeWriter]);

  return displayText;
};

export default useTypewriter;
