/**
 * Test utilities for React Testing Library
 */
import React from 'react';
import { render } from '@testing-library/react';

/**
 * Custom render function for components (i18n is imported directly, no provider needed)
 * @param {React.ReactElement} ui - The component to render
 * @param {Object} options - Additional render options
 * @returns {Object} Render result
 */
export const renderWithI18n = (ui, options = {}) => {
  // Since i18n uses a simple t function imported directly, no provider is needed
  // This function is kept for consistency and future extensibility
  return render(ui, options);
};

/**
 * Mock intersection observer for scroll reveal tests
 */
export const mockIntersectionObserver = () => {
  global.IntersectionObserver = class IntersectionObserver {
    constructor() {}
    disconnect() {}
    observe() {}
    takeRecords() {
      return [];
    }
    unobserve() {}
  };
};
