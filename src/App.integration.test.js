import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { renderWithI18n, mockIntersectionObserver } from './utils/testUtils';

// Mock all components to focus on App integration
jest.mock('./components/Header', () => {
  return function Header() {
    return <header data-testid="header">Header</header>;
  };
});

jest.mock('./components/Hero', () => {
  return function Hero() {
    return <section data-testid="hero">Hero</section>;
  };
});

jest.mock('./components/About', () => {
  return function About() {
    return <section data-testid="about">About</section>;
  };
});

jest.mock('./components/Skills', () => {
  return function Skills() {
    return <section data-testid="skills">Skills</section>;
  };
});

jest.mock('./components/Experience', () => {
  return function Experience() {
    return <section data-testid="experience">Experience</section>;
  };
});

jest.mock('./components/Contact', () => {
  return function Contact() {
    return <section data-testid="contact">Contact</section>;
  };
});

jest.mock('./components/Footer', () => {
  return function Footer() {
    return <footer data-testid="footer">Footer</footer>;
  };
});

describe('App Integration Tests', () => {
  beforeEach(() => {
    mockIntersectionObserver();
  });

  it('should render all main sections', () => {
    renderWithI18n(<App />);

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('hero')).toBeInTheDocument();
    expect(screen.getByTestId('about')).toBeInTheDocument();
    expect(screen.getByTestId('skills')).toBeInTheDocument();
    expect(screen.getByTestId('experience')).toBeInTheDocument();
    expect(screen.getByTestId('contact')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('should have skip link for accessibility', () => {
    renderWithI18n(<App />);

    const skipLink = screen.getByRole('link', { name: /skip to main content/i });
    expect(skipLink).toBeInTheDocument();
    expect(skipLink).toHaveAttribute('href', '#main-content');
  });

  it('should have main content area with correct id', () => {
    renderWithI18n(<App />);

    const mainContent = screen.getByRole('main');
    expect(mainContent).toBeInTheDocument();
    expect(mainContent).toHaveAttribute('id', 'main-content');
  });

  it('should render sections in correct order', () => {
    const { container } = renderWithI18n(<App />);

    const main = container.querySelector('main');
    const sections = Array.from(main.children);

    expect(sections[0]).toHaveAttribute('data-testid', 'hero');
    expect(sections[1]).toHaveAttribute('data-testid', 'about');
    expect(sections[2]).toHaveAttribute('data-testid', 'skills');
    expect(sections[3]).toHaveAttribute('data-testid', 'experience');
    expect(sections[4]).toHaveAttribute('data-testid', 'contact');
  });

  it('should have proper semantic structure', () => {
    renderWithI18n(<App />);

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});
