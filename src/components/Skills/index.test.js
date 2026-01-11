import React from 'react';
import { render, screen } from '@testing-library/react';
import Skills from './index';

// Mock dependencies
jest.mock('hooks', () => ({
  useScrollReveal: () => ({ current: null }),
}));

jest.mock('i18n', () => ({
  t: (key) => {
    const translations = {
      'skills.subtitle': 'What I Work With',
      'skills.title': 'My Toolkit',
    };
    return translations[key] || key;
  },
}));

jest.mock('components/common', () => ({
  Section: ({ children, title, subtitle, id }) => (
    <section id={id}>
      {subtitle && <p>{subtitle}</p>}
      {title && <h2>{title}</h2>}
      {children}
    </section>
  ),
}));

jest.mock('components/SkillsTree', () => {
  return function SkillsTree() {
    return <div data-testid="skills-tree">Skills Tree</div>;
  };
});

describe('Skills', () => {
  it('renders skills section with title and subtitle', () => {
    render(<Skills />);
    expect(screen.getByText('What I Work With')).toBeInTheDocument();
    expect(screen.getByText('My Toolkit')).toBeInTheDocument();
  });

  it('renders SkillsTree component', () => {
    render(<Skills />);
    expect(screen.getByTestId('skills-tree')).toBeInTheDocument();
  });

  it('has correct section id', () => {
    render(<Skills />);
    const section = document.querySelector('#skills');
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute('id', 'skills');
  });
});
