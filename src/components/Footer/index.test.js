import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './index';

// Mock i18n
jest.mock('i18n', () => ({
  t: (key, params) => {
    if (key === 'footer.copyright') {
      return `© ${params?.year || new Date().getFullYear()} Meliha Karac. All rights reserved.`;
    }
    return key;
  },
}));

describe('Footer', () => {
  it('renders footer with copyright text', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(`© ${currentYear} Meliha Karac. All rights reserved.`)
    ).toBeInTheDocument();
  });

  it('has correct footer structure', () => {
    render(<Footer />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveClass('footer');
  });
});
