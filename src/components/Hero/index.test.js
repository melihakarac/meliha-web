import React from 'react';
import { render, screen } from '@testing-library/react';
import Hero from './index';

// Mock dependencies
jest.mock('hooks', () => ({
  useTypewriter: (text) => text,
  useSmoothScroll: () => ({
    handleScrollClick: jest.fn((e) => {
      e.preventDefault();
    }),
  }),
}));

jest.mock('components/common', () => ({
  Container: ({ children }) => <div>{children}</div>,
}));

jest.mock('components/ParticleBackground', () => {
  return function ParticleBackground() {
    return <div data-testid="particle-background">Particles</div>;
  };
});

jest.mock('assets/icons', () => ({
  ChevronDownIcon: () => <svg data-testid="chevron-icon" />,
}));

jest.mock('i18n', () => ({
  t: (key) => {
    const translations = {
      'hero.greeting': "Hello, I'm Meliha",
      'hero.title': ['Software Developer', 'who builds with purpose'],
      'hero.description': 'Test description',
      'common.scrollDown': 'Explore',
    };
    return translations[key] || key;
  },
}));

describe('Hero', () => {
  it('renders hero section with greeting', () => {
    render(<Hero />);
    expect(screen.getByText(/Hello/i)).toBeInTheDocument();
    expect(screen.getByText(/Meliha/i)).toBeInTheDocument();
  });

  it('renders hero title lines', () => {
    render(<Hero />);
    expect(screen.getByText('Software Developer')).toBeInTheDocument();
    expect(screen.getByText('who builds with purpose')).toBeInTheDocument();
  });

  it('renders hero description', () => {
    render(<Hero />);
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('renders ParticleBackground component', () => {
    render(<Hero />);
    expect(screen.getByTestId('particle-background')).toBeInTheDocument();
  });

  it('has scroll down link', () => {
    render(<Hero />);
    expect(screen.getByText('Explore')).toBeInTheDocument();
  });

  it('has correct section id', () => {
    render(<Hero />);
    const section = document.querySelector('#hero');
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute('id', 'hero');
  });
});
