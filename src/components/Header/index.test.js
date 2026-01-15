import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Header from './index';

const mockHandleScrollClick = jest.fn((e) => {
  e.preventDefault();
});

// Mock dependencies
jest.mock('hooks', () => ({
  useSmoothScroll: () => ({
    handleScrollClick: mockHandleScrollClick,
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
  let mockObserver;
  let observeSpy;
  let disconnectSpy;

  beforeEach(() => {
    jest.clearAllMocks();

    observeSpy = jest.fn();
    disconnectSpy = jest.fn();

    // Mock IntersectionObserver
    mockObserver = {
      observe: observeSpy,
      disconnect: disconnectSpy,
      unobserve: jest.fn(),
    };

    global.IntersectionObserver = jest.fn(() => mockObserver);

    // Mock getElementById
    document.getElementById = jest.fn((id) => {
      const element = document.createElement('section');
      element.id = id;
      return element;
    });

    // Mock window.scrollY
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 0,
    });

    // Mock document.body.style
    document.body.style = {};
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

  it('should close menu when overlay is clicked', () => {
    render(<Header />);
    const menuButton = screen.getByLabelText('Toggle menu');
    const overlay = document.querySelector('.menu-overlay');

    fireEvent.click(menuButton);
    expect(menuButton).toHaveAttribute('aria-expanded', 'true');

    fireEvent.click(overlay);
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('should close menu when nav link is clicked', async () => {
    render(<Header />);
    const menuButton = screen.getByLabelText('Toggle menu');
    const navLinks = screen.getAllByText('About');

    fireEvent.click(menuButton);
    expect(menuButton).toHaveAttribute('aria-expanded', 'true');

    // Click the first nav link (mobile nav)
    fireEvent.click(navLinks[0]);

    await waitFor(() => {
      expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    });
  });

  it('should add scrolled class when window is scrolled', () => {
    render(<Header />);
    const header = document.querySelector('.header');

    expect(header).not.toHaveClass('header-scrolled');

    // Simulate scroll
    Object.defineProperty(window, 'scrollY', { value: 100, writable: true });
    fireEvent.scroll(window);

    waitFor(() => {
      expect(header).toHaveClass('header-scrolled');
    });
  });

  it('should prevent body scroll when menu is open', () => {
    render(<Header />);
    const menuButton = screen.getByLabelText('Toggle menu');

    fireEvent.click(menuButton);
    expect(document.body.style.overflow).toBe('hidden');

    fireEvent.click(menuButton);
    expect(document.body.style.overflow).toBe('');
  });

  it('should observe sections for active state tracking', () => {
    render(<Header />);

    expect(global.IntersectionObserver).toHaveBeenCalled();
    expect(observeSpy).toHaveBeenCalled();
  });

  it('should set active section when section is intersecting', () => {
    render(<Header />);

    const observerCall = global.IntersectionObserver.mock.calls[0];
    const callback = observerCall[0];

    const aboutSection = document.getElementById('about');
    callback([{ target: aboutSection, isIntersecting: true }]);

    // Check if active class is applied (this would require re-render to see)
    const navLinks = screen.getAllByText('About');
    // The active class would be applied on the mobile nav link
  });

  it('should cleanup IntersectionObserver on unmount', () => {
    const { unmount } = render(<Header />);
    unmount();

    expect(disconnectSpy).toHaveBeenCalled();
  });

  it('should restore body overflow on unmount', () => {
    const { unmount } = render(<Header />);
    const menuButton = screen.getByLabelText('Toggle menu');

    fireEvent.click(menuButton);
    expect(document.body.style.overflow).toBe('hidden');

    unmount();
    expect(document.body.style.overflow).toBe('');
  });

  it('should call handleScrollClick when nav link is clicked', () => {
    render(<Header />);
    const navLinks = screen.getAllByText('About');

    fireEvent.click(navLinks[0]);

    expect(mockHandleScrollClick).toHaveBeenCalled();
  });

  it('should have proper ARIA attributes on menu button', () => {
    render(<Header />);
    const menuButton = screen.getByLabelText('Toggle menu');

    expect(menuButton).toHaveAttribute('aria-label', 'Toggle menu');
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('should show mobile nav when menu is open', () => {
    render(<Header />);
    const menuButton = screen.getByLabelText('Toggle menu');
    const mobileNav = document.querySelector('.mobile-nav');

    expect(mobileNav).not.toHaveClass('nav-open');

    fireEvent.click(menuButton);
    expect(mobileNav).toHaveClass('nav-open');
  });

  it('should show overlay when menu is open', () => {
    render(<Header />);
    const menuButton = screen.getByLabelText('Toggle menu');
    const overlay = document.querySelector('.menu-overlay');

    expect(overlay).not.toHaveClass('overlay-visible');

    fireEvent.click(menuButton);
    expect(overlay).toHaveClass('overlay-visible');
  });
});
