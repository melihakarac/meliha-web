import { useCallback } from 'react';

/**
 * Custom hook for smooth scrolling to sections
 * @returns {Function} scrollToSection function
 */
const useSmoothScroll = () => {
  const scrollToSection = useCallback((sectionId, options = {}) => {
    const { block = 'start', behavior = 'smooth' } = options;
    const element = document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({ behavior, block });
      return true;
    }
    return false;
  }, []);

  const handleScrollClick = useCallback(
    (e, sectionId, callback) => {
      e.preventDefault();
      scrollToSection(sectionId);
      if (callback) callback();
    },
    [scrollToSection]
  );

  return { scrollToSection, handleScrollClick };
};

export default useSmoothScroll;
