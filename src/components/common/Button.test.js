import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

describe('Button', () => {
  it('should render button element by default', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button.tagName).toBe('BUTTON');
  });

  it('should render anchor element when href is provided', () => {
    render(<Button href="/test">Link Button</Button>);
    const link = screen.getByRole('link', { name: /link button/i });
    expect(link).toBeInTheDocument();
    expect(link.tagName).toBe('A');
    expect(link).toHaveAttribute('href', '/test');
  });

  it('should apply default variant and size classes', () => {
    render(<Button>Test</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('btn', 'btn-primary', 'btn-md');
  });

  it('should apply custom variant class', () => {
    render(<Button variant="secondary">Test</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('btn-secondary');
  });

  it('should apply custom size class', () => {
    render(<Button size="lg">Test</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('btn-lg');
  });

  it('should apply custom className', () => {
    render(<Button className="custom-class">Test</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  it('should call onClick handler when clicked', async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    const button = screen.getByRole('button');
    await userEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('should not call onClick when disabled', async () => {
    const handleClick = jest.fn();
    render(
      <Button onClick={handleClick} disabled>
        Disabled Button
      </Button>
    );

    const button = screen.getByRole('button');
    await userEvent.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });

  it('should set button type attribute', () => {
    render(<Button type="submit">Submit</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('should pass through additional props', () => {
    render(
      <Button data-testid="custom-button" aria-label="Custom">
        Test
      </Button>
    );
    const button = screen.getByTestId('custom-button');
    expect(button).toHaveAttribute('aria-label', 'Custom');
  });
});
