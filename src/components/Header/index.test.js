import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from './index';

// Mock dependencies
jest.mock('hooks', () => ({
  useSmoothScroll: () => ({
    handleScrollClick: jest.fn((e) => {
      e.preventDefault();
    }),
  }),
}));

jest.mock('constants', () => ({
  getNavLinks: () => [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
  ],
  UI_CONFIG: {
    SCROLL_THRESHOLD: 50,
    SECTION_IDS: ['hero', 'about', 'skills', 'experience', 'contact'],
    INTERSECTION_OBSERVER: {},
  },
}));

jest.mock('i18n', () => ({
  t: (key) => {
    const translations = {
      'nav.contact': "Let's Talk",
    };
    return translations[key] || key;
  },
}));

describe('Header', () => {
  beforeEach(() => {
    // Mock IntersectionObserver
    global.IntersectionObserver = jest.fn(() => ({
      observe: jest.fn(),
      disconnect: jest.fn(),
      unobserve: jest.fn(),
    }));
  });

  it('renders header with navigation links', () => {
    render(<Header />);
    const homeLinks = screen.getAllByText('Home');
    expect(homeLinks.length).toBeGreaterThan(0);
    const aboutLinks = screen.getAllByText('About');
    expect(aboutLinks.length).toBeGreaterThan(0);
    const skillsLinks = screen.getAllByText('Skills');
    expect(skillsLinks.length).toBeGreaterThan(0);
    const experienceLinks = screen.getAllByText('Experience');
    expect(experienceLinks.length).toBeGreaterThan(0);
  });

  it('renders logo', () => {
    render(<Header />);
    const logo = screen.getByText(/M/);
    expect(logo).toBeInTheDocument();
  });

  it('toggles mobile menu when menu button is clicked', () => {
    render(<Header />);
    const menuButton = screen.getByLabelText('Toggle menu');

    fireEvent.click(menuButton);
    expect(menuButton).toHaveAttribute('aria-expanded', 'true');

    fireEvent.click(menuButton);
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('has contact button', () => {
    render(<Header />);
    const contactButtons = screen.getAllByText("Let's Talk");
    expect(contactButtons.length).toBeGreaterThan(0);
  });
});
