/**
 * Test utilities for React Testing Library
 */
import React from 'react';
import { render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';

/**
 * Custom render function that includes i18n provider
 * @param {React.ReactElement} ui - The component to render
 * @param {Object} options - Additional render options
 * @returns {Object} Render result
 */
export const renderWithI18n = (ui, options = {}) => {
  return render(<I18nextProvider i18n={i18n}>{ui}</I18nextProvider>, options);
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
