import React from 'react';
import { render, screen } from '@testing-library/react';
import CountUpNumber from './CountUpNumber';
import { mockIntersectionObserver } from '../../utils/testUtils';

jest.mock('../../hooks', () => ({
  useCountUp: jest.fn(),
}));

import { useCountUp } from '../../hooks';

describe('CountUpNumber', () => {
  beforeEach(() => {
    mockIntersectionObserver();
    jest.clearAllMocks();
  });

  it('should render display value from useCountUp hook', () => {
    useCountUp.mockReturnValue({
      displayValue: '100',
      ref: { current: null },
    });

    render(<CountUpNumber value={100} />);
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  it('should pass value and options to useCountUp hook', () => {
    useCountUp.mockReturnValue({
      displayValue: '50',
      ref: { current: null },
    });

    render(<CountUpNumber value={50} duration={3000} delay={500} />);

    expect(useCountUp).toHaveBeenCalledWith(50, {
      duration: 3000,
      delay: 500,
      startOnView: true,
    });
  });

  it('should use default duration and delay', () => {
    useCountUp.mockReturnValue({
      displayValue: '25',
      ref: { current: null },
    });

    render(<CountUpNumber value={25} />);

    expect(useCountUp).toHaveBeenCalledWith(25, {
      duration: 2000,
      delay: 0,
      startOnView: true,
    });
  });

  it('should apply custom className', () => {
    useCountUp.mockReturnValue({
      displayValue: '100',
      ref: { current: null },
    });

    const { container } = render(<CountUpNumber value={100} className="custom-class" />);

    const span = container.querySelector('span');
    expect(span).toHaveClass('custom-class');
  });

  it('should attach ref to span element', () => {
    const mockRef = { current: null };
    useCountUp.mockReturnValue({
      displayValue: '100',
      ref: mockRef,
    });

    const { container } = render(<CountUpNumber value={100} />);
    const span = container.querySelector('span');

    expect(mockRef.current).toBe(span);
  });

  it('should handle string values', () => {
    useCountUp.mockReturnValue({
      displayValue: '50+',
      ref: { current: null },
    });

    render(<CountUpNumber value="50+" />);
    expect(screen.getByText('50+')).toBeInTheDocument();
  });
});
