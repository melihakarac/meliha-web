import React from 'react';
import { render, screen } from '@testing-library/react';
import Section from './Section';
import { renderWithI18n, mockIntersectionObserver } from '../../utils/testUtils';

jest.mock('../../hooks', () => ({
  useScrollReveal: () => ({ current: null }),
}));

describe('Section', () => {
  beforeEach(() => {
    mockIntersectionObserver();
  });

  it('should render children', () => {
    renderWithI18n(
      <Section>
        <div>Section Content</div>
      </Section>
    );
    expect(screen.getByText('Section Content')).toBeInTheDocument();
  });

  it('should render with id attribute', () => {
    const { container } = renderWithI18n(<Section id="test-section">Content</Section>);
    const section = container.querySelector('#test-section');
    expect(section).toBeInTheDocument();
  });

  it('should render title when provided', () => {
    renderWithI18n(<Section title="Test Title">Content</Section>);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Title').tagName).toBe('H2');
  });

  it('should render subtitle when provided', () => {
    renderWithI18n(<Section subtitle="Test Subtitle">Content</Section>);
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
    expect(screen.getByText('Test Subtitle').tagName).toBe('P');
  });

  it('should render both title and subtitle', () => {
    renderWithI18n(
      <Section title="Title" subtitle="Subtitle">
        Content
      </Section>
    );
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Subtitle')).toBeInTheDocument();
  });

  it('should not render header when title and subtitle are not provided', () => {
    const { container } = renderWithI18n(<Section>Content</Section>);
    const header = container.querySelector('.section-header');
    expect(header).not.toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const { container } = renderWithI18n(<Section className="custom-section">Content</Section>);
    const section = container.querySelector('section');
    expect(section).toHaveClass('custom-section');
  });

  it('should have section class by default', () => {
    const { container } = renderWithI18n(<Section>Content</Section>);
    const section = container.querySelector('section');
    expect(section).toHaveClass('section');
  });
});
