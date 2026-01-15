import React from 'react';
import { render } from '@testing-library/react';
import Container from './Container';

describe('Container', () => {
  it('should render children', () => {
    const { getByText } = render(
      <Container>
        <div>Container Content</div>
      </Container>
    );
    expect(getByText('Container Content')).toBeInTheDocument();
  });

  it('should apply default container class', () => {
    const { container } = render(<Container>Content</Container>);
    const containerElement = container.firstChild;
    expect(containerElement).toHaveClass('container');
  });

  it('should apply custom className', () => {
    const { container } = render(<Container className="custom-container">Content</Container>);
    const containerElement = container.firstChild;
    expect(containerElement).toHaveClass('custom-container');
  });

  it('should pass through additional props', () => {
    const { container } = render(
      <Container data-testid="container" aria-label="Test Container">
        Content
      </Container>
    );
    const containerElement = container.firstChild;
    expect(containerElement).toHaveAttribute('data-testid', 'container');
    expect(containerElement).toHaveAttribute('aria-label', 'Test Container');
  });
});
