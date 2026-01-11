/**
 * Animation timing constants used throughout the application
 */
export const ANIMATION_TIMING = {
  // CountUp animation
  COUNT_UP_DURATION: 2000,
  COUNT_UP_STAGGER_DELAY: 200,

  // Stagger reveal animations
  STAGGER_DELAY: 200,

  // Toast/notification timings
  TOAST_HIDE_DELAY: 5000,
  TOAST_REMOVE_DELAY: 5300,

  // IntersectionObserver thresholds
  INTERSECTION_THRESHOLD: 0.5,

  // Default animation delays
  DEFAULT_DELAY: 0,
};

/**
 * Get staggered delay based on index
 * @param {number} index - Item index
 * @param {number} baseDelay - Base delay in milliseconds (default: STAGGER_DELAY)
 * @returns {number} Calculated delay
 */
export const getStaggerDelay = (index, baseDelay = ANIMATION_TIMING.STAGGER_DELAY) => {
  return index * baseDelay;
};
