import React from 'react';
import { render, screen } from '@testing-library/react';
import SkillTag from './SkillTag';

describe('SkillTag', () => {
  it('should render children', () => {
    render(<SkillTag>React</SkillTag>);
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  it('should apply default variant class', () => {
    const { container } = render(<SkillTag>JavaScript</SkillTag>);
    const tag = container.firstChild;
    expect(tag).toHaveClass('skill-tag', 'skill-tag--default');
  });

  it('should apply custom variant class', () => {
    const { container } = render(<SkillTag variant="primary">TypeScript</SkillTag>);
    const tag = container.firstChild;
    expect(tag).toHaveClass('skill-tag--primary');
  });

  it('should apply custom className', () => {
    const { container } = render(<SkillTag className="custom-tag">Node.js</SkillTag>);
    const tag = container.firstChild;
    expect(tag).toHaveClass('custom-tag');
  });

  it('should apply custom style', () => {
    const customStyle = { backgroundColor: 'red', color: 'white' };
    const { container } = render(<SkillTag style={customStyle}>CSS</SkillTag>);
    const tag = container.firstChild;
    expect(tag).toHaveStyle({ backgroundColor: 'red', color: 'white' });
  });

  it('should filter out empty className values', () => {
    const { container } = render(
      <SkillTag variant="default" className="">
        Python
      </SkillTag>
    );
    const tag = container.firstChild;
    expect(tag.className).not.toContain('undefined');
    expect(tag.className).not.toContain('null');
  });

  it('should combine multiple classes correctly', () => {
    const { container } = render(
      <SkillTag variant="secondary" className="custom-class">
        Vue.js
      </SkillTag>
    );
    const tag = container.firstChild;
    expect(tag).toHaveClass('skill-tag', 'skill-tag--secondary', 'custom-class');
  });

  it('should render as span element', () => {
    const { container } = render(<SkillTag>Angular</SkillTag>);
    const tag = container.firstChild;
    expect(tag.tagName).toBe('SPAN');
  });
});
