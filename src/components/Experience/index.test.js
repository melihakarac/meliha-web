import React from 'react';
import { render, screen } from '@testing-library/react';
import Experience from './index';

// Mock dependencies
jest.mock('hooks', () => ({
  useStaggerReveal: () => ({ current: null }),
}));

jest.mock('i18n', () => ({
  t: (key) => {
    const translations = {
      'experience.subtitle': "Where I've Been",
      'experience.title': 'Experience & Background',
      'common.projectsLabel': 'Key Projects:',
    };
    return translations[key] || key;
  },
}));

jest.mock('data', () => ({
  experiences: [
    {
      title: 'Test Position',
      company: 'Test Company',
      period: '2020 - 2021',
      description: 'Test description',
      skills: ['React', 'Node.js'],
      type: 'work',
    },
  ],
}));

jest.mock('constants', () => ({
  ANIMATION_TIMING: {
    STAGGER_DELAY: 200,
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
  Card: ({ children, className }) => <div className={className}>{children}</div>,
  SkillTag: ({ children }) => <span>{children}</span>,
}));

describe('Experience', () => {
  it('renders experience section with title and subtitle', () => {
    render(<Experience />);
    expect(screen.getByText("Where I've Been")).toBeInTheDocument();
    expect(screen.getByText('Experience & Background')).toBeInTheDocument();
  });

  it('renders experience items', () => {
    render(<Experience />);
    expect(screen.getByText('Test Position')).toBeInTheDocument();
    expect(screen.getByText('Test Company')).toBeInTheDocument();
    expect(screen.getByText('2020 - 2021')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('renders skills for experience items', () => {
    render(<Experience />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
  });

  it('has correct section id', () => {
    render(<Experience />);
    const section = document.getElementById('experience');
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute('id', 'experience');
  });
});
