import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Contact from './index';
import { renderWithI18n, mockIntersectionObserver } from '../../utils/testUtils';

// Mock ReactDOM.createPortal for Toast component
jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  createPortal: (node) => node,
}));

// Mock dependencies
jest.mock('hooks', () => {
  const actualHooks = jest.requireActual('hooks');
  return {
    ...actualHooks,
    useScrollReveal: () => ({ current: null }),
  };
});

jest.mock('config', () => ({
  getGoogleFormUrl: () => 'https://docs.google.com/forms/d/test/formResponse',
  buildGoogleFormData: (values) => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      formData.append(`entry.${key}`, values[key]);
    });
    return formData;
  },
}));

jest.mock('constants', () => ({
  ANIMATION_TIMING: {
    TOAST_HIDE_DELAY: 100,
    TOAST_REMOVE_DELAY: 200,
  },
}));

describe('Contact Integration Tests', () => {
  beforeEach(() => {
    mockIntersectionObserver();
    global.fetch = jest.fn(() => Promise.resolve({ ok: true }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should submit form with valid data', async () => {
    renderWithI18n(<Contact />);

    const nameInput = screen.getByLabelText(/your name/i);
    const emailInput = screen.getByLabelText(/your email/i);
    const subjectInput = screen.getByLabelText(/what's this about/i);
    const messageInput = screen.getByLabelText(/your message/i);
    const submitButton = screen.getByRole('button', { name: /send message/i });

    await userEvent.type(nameInput, 'John Doe');
    await userEvent.type(emailInput, 'john@example.com');
    await userEvent.type(subjectInput, 'Test Subject');
    await userEvent.type(messageInput, 'This is a test message with enough characters');

    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          method: 'POST',
          mode: 'no-cors',
        })
      );
    });
  });

  it('should show validation errors for invalid form data', async () => {
    renderWithI18n(<Contact />);

    const submitButton = screen.getByRole('button', { name: /send message/i });
    await userEvent.click(submitButton);

    await waitFor(
      () => {
        // Check for any error message (could be "is required" or field-specific errors)
        const errorMessages = screen.queryAllByRole('alert');
        const requiredText = screen.queryByText(/required/i);
        // Either we have error messages with role="alert" or text containing "required"
        expect(errorMessages.length > 0 || requiredText).toBeTruthy();
      },
      { timeout: 2000 }
    );
  });

  it('should show success message after successful submission', async () => {
    renderWithI18n(<Contact />);

    const nameInput = screen.getByLabelText(/your name/i);
    const emailInput = screen.getByLabelText(/your email/i);
    const subjectInput = screen.getByLabelText(/what's this about/i);
    const messageInput = screen.getByLabelText(/your message/i);
    const submitButton = screen.getByRole('button', { name: /send message/i });

    await userEvent.type(nameInput, 'John Doe');
    await userEvent.type(emailInput, 'john@example.com');
    await userEvent.type(subjectInput, 'Test Subject');
    await userEvent.type(messageInput, 'This is a test message with enough characters');

    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/message sent/i)).toBeInTheDocument();
    });
  });

  it('should show error message after failed submission', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error('Network error')));
    renderWithI18n(<Contact />);

    const nameInput = screen.getByLabelText(/your name/i);
    const emailInput = screen.getByLabelText(/your email/i);
    const subjectInput = screen.getByLabelText(/what's this about/i);
    const messageInput = screen.getByLabelText(/your message/i);
    const submitButton = screen.getByRole('button', { name: /send message/i });

    await userEvent.type(nameInput, 'John Doe');
    await userEvent.type(emailInput, 'john@example.com');
    await userEvent.type(subjectInput, 'Test Subject');
    await userEvent.type(messageInput, 'This is a test message with enough characters');

    await userEvent.click(submitButton);

    await waitFor(
      () => {
        // Check for error toast or error message
        const errorToast = screen.queryByText(/something went wrong/i);
        const errorMessage = screen.queryByText(/error/i);
        expect(errorToast || errorMessage).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  it('should disable submit button while submitting', async () => {
    let resolveFetch;
    const fetchPromise = new Promise((resolve) => {
      resolveFetch = resolve;
    });
    global.fetch = jest.fn(() => fetchPromise);

    renderWithI18n(<Contact />);

    const nameInput = screen.getByLabelText(/your name/i);
    const emailInput = screen.getByLabelText(/your email/i);
    const subjectInput = screen.getByLabelText(/what's this about/i);
    const messageInput = screen.getByLabelText(/your message/i);
    const submitButton = screen.getByRole('button', { name: /send message/i });

    await userEvent.type(nameInput, 'John Doe');
    await userEvent.type(emailInput, 'john@example.com');
    await userEvent.type(subjectInput, 'Test Subject');
    await userEvent.type(messageInput, 'This is a test message with enough characters');

    await userEvent.click(submitButton);

    expect(submitButton).toBeDisabled();
    expect(screen.getByText(/sending/i)).toBeInTheDocument();

    resolveFetch({ ok: true });
    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
  });

  it('should reset form after successful submission', async () => {
    renderWithI18n(<Contact />);

    const nameInput = screen.getByLabelText(/your name/i);
    const emailInput = screen.getByLabelText(/your email/i);
    const subjectInput = screen.getByLabelText(/what's this about/i);
    const messageInput = screen.getByLabelText(/your message/i);
    const submitButton = screen.getByRole('button', { name: /send message/i });

    await userEvent.type(nameInput, 'John Doe');
    await userEvent.type(emailInput, 'john@example.com');
    await userEvent.type(subjectInput, 'Test Subject');
    await userEvent.type(messageInput, 'This is a test message with enough characters');

    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(nameInput).toHaveValue('');
      expect(emailInput).toHaveValue('');
      expect(subjectInput).toHaveValue('');
      expect(messageInput).toHaveValue('');
    });
  });

  it('should validate email format', async () => {
    renderWithI18n(<Contact />);

    const emailInput = screen.getByLabelText(/your email/i);
    await userEvent.type(emailInput, 'invalid-email');
    await userEvent.tab();

    await waitFor(() => {
      expect(screen.getByText(/valid email/i)).toBeInTheDocument();
    });
  });

  it('should validate minimum length requirements', async () => {
    renderWithI18n(<Contact />);

    const nameInput = screen.getByLabelText(/your name/i);
    await userEvent.type(nameInput, 'J');
    await userEvent.tab();

    await waitFor(() => {
      expect(screen.getByText(/at least 2 characters/i)).toBeInTheDocument();
    });
  });
});
