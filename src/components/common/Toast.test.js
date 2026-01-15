import React from 'react';
import { render, screen } from '@testing-library/react';
import Toast from './Toast';

// Mock ReactDOM.createPortal
jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  createPortal: (node) => node,
}));

describe('Toast', () => {
  it('should render success toast with message', () => {
    render(<Toast type="success" message="Success message" />);
    const toast = screen.getByText('Success message');
    expect(toast).toBeInTheDocument();
    expect(toast).toHaveClass('form-status', 'form-status--success');
  });

  it('should render error toast with message', () => {
    render(<Toast type="error" message="Error message" />);
    const toast = screen.getByText('Error message');
    expect(toast).toBeInTheDocument();
    expect(toast).toHaveClass('form-status', 'form-status--error');
  });

  it('should apply hiding class when isHiding is true', () => {
    render(<Toast type="success" message="Message" isHiding={true} />);
    const toast = screen.getByText('Message');
    expect(toast).toHaveClass('hiding');
  });

  it('should not apply hiding class when isHiding is false', () => {
    render(<Toast type="success" message="Message" isHiding={false} />);
    const toast = screen.getByText('Message');
    expect(toast).not.toHaveClass('hiding');
  });
});
