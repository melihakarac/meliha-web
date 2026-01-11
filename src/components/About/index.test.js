import React from 'react';
import { render, screen } from '@testing-library/react';
import About from './index';

// Mock dependencies
jest.mock('hooks', () => ({
  useScrollReveal: () => ({ current: null }),
}));

jest.mock('i18n', () => ({
  t: (key) => {
    const translations = {
      'about.subtitle': 'Who I Am',
      'about.title': 'Developer. Problem Solver. Collaborator.',
      'about.description': ['First paragraph', 'Second paragraph'],
    };
    return translations[key] || key;
  },
}));

jest.mock('data', () => ({
  highlights: [
    { value: '5+', label: 'Years Building' },
    { value: '6+', label: 'Projects Shipped' },
    { value: '100%', label: 'Happy Clients' },
  ],
}));

jest.mock('constants', () => ({
  ANIMATION_TIMING: {
    COUNT_UP_DURATION: 2000,
    COUNT_UP_STAGGER_DELAY: 200,
  },
  getStaggerDelay: (index, baseDelay) => index * baseDelay,
}));

jest.mock('components/common', () => ({
  Section: ({ children, title, subtitle, id }) => (
    <section id={id}>
      {subtitle && <p>{subtitle}</p>}
      {title && <h2>{title}</h2>}
      {children}
    </section>
  ),
  CountUpNumber: ({ value }) => <span>{value}</span>,
}));

describe('About', () => {
  it('renders about section with title and subtitle', () => {
    render(<About />);
    expect(screen.getByText('Who I Am')).toBeInTheDocument();
    expect(screen.getByText('Developer. Problem Solver. Collaborator.')).toBeInTheDocument();
  });

  it('renders description paragraphs', () => {
    render(<About />);
    expect(screen.getByText('First paragraph')).toBeInTheDocument();
    expect(screen.getByText('Second paragraph')).toBeInTheDocument();
  });

  it('renders highlights', () => {
    render(<About />);
    expect(screen.getByText('Years Building')).toBeInTheDocument();
    expect(screen.getByText('Projects Shipped')).toBeInTheDocument();
    expect(screen.getByText('Happy Clients')).toBeInTheDocument();
  });

  it('has correct section id', () => {
    render(<About />);
    const section = document.getElementById('about');
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute('id', 'about');
  });
});
