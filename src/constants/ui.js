import { SECTIONS } from './sections';

/**
 * UI configuration constants
 */
export const UI_CONFIG = {
  // Scroll detection threshold (pixels)
  SCROLL_THRESHOLD: 50,

  // IntersectionObserver configuration
  INTERSECTION_OBSERVER: {
    rootMargin: '-40% 0px -40% 0px',
    threshold: 0,
  },

  // All section IDs array (for scroll tracking)
  SECTION_IDS: [
    SECTIONS.HERO,
    SECTIONS.ABOUT,
    SECTIONS.SKILLS,
    SECTIONS.EXPERIENCE,
    SECTIONS.CONTACT,
  ],
};
