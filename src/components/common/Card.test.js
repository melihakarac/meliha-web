import React from 'react';
import { render } from '@testing-library/react';
import Card from './Card';

describe('Card', () => {
  it('should render children', () => {
    const { getByText } = render(
      <Card>
        <div>Card Content</div>
      </Card>
    );
    expect(getByText('Card Content')).toBeInTheDocument();
  });

  it('should apply default card class', () => {
    const { container } = render(<Card>Content</Card>);
    const card = container.firstChild;
    expect(card).toHaveClass('card');
  });

  it('should apply hover class when hover prop is true', () => {
    const { container } = render(<Card hover>Content</Card>);
    const card = container.firstChild;
    expect(card).toHaveClass('card-hover');
  });

  it('should not apply hover class when hover prop is false', () => {
    const { container } = render(<Card hover={false}>Content</Card>);
    const card = container.firstChild;
    expect(card).not.toHaveClass('card-hover');
  });

  it('should apply custom className', () => {
    const { container } = render(<Card className="custom-card">Content</Card>);
    const card = container.firstChild;
    expect(card).toHaveClass('custom-card');
  });

  it('should pass through additional props', () => {
    const { container } = render(
      <Card data-testid="card" aria-label="Test Card">
        Content
      </Card>
    );
    const card = container.firstChild;
    expect(card).toHaveAttribute('data-testid', 'card');
    expect(card).toHaveAttribute('aria-label', 'Test Card');
  });
});
