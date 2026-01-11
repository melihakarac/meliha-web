import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Contact from './index';

// Mock dependencies
jest.mock('hooks', () => ({
  useScrollReveal: () => ({ current: null }),
  useFormValidation: () => ({
    values: { name: '', email: '', subject: '', message: '' },
    isValid: true,
    validate: jest.fn(() => true),
    reset: jest.fn(),
    getFieldProps: (name) => ({
      name,
      value: '',
      onChange: jest.fn(),
      onBlur: jest.fn(),
    }),
    hasError: jest.fn(() => false),
    getError: jest.fn(() => ''),
  }),
}));

jest.mock('config', () => ({
  getGoogleFormUrl: () => 'https://docs.google.com/forms/d/test/formResponse',
  buildGoogleFormData: () => new FormData(),
}));

jest.mock('constants', () => ({
  ANIMATION_TIMING: {
    TOAST_HIDE_DELAY: 5000,
    TOAST_REMOVE_DELAY: 5300,
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
  Button: ({ children, type, disabled, onClick }) => (
    <button type={type} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  ),
  Toast: ({ type, message }) => <div data-testid={`toast-${type}`}>{message}</div>,
}));

jest.mock('data', () => ({
  contactInfo: [
    { icon: '✉️', label: 'Email', value: 'test@example.com', link: 'mailto:test@example.com' },
  ],
  socialLinks: [{ name: 'LinkedIn', url: 'https://linkedin.com', icon: 'linkedin' }],
  formFields: [
    { name: 'name', type: 'text', placeholder: 'Your Name' },
    { name: 'email', type: 'email', placeholder: 'Your Email' },
  ],
  getInitialFormValues: () => ({ name: '', email: '', subject: '', message: '' }),
}));

jest.mock('i18n', () => ({
  t: (key) => {
    const translations = {
      'contact.subtitle': "What's Next?",
      'contact.title': "Let's Build Something Great",
      'contact.intro': 'Test intro',
      'contact.form.name': 'Your Name',
      'contact.form.email': 'Your Email',
      'common.sendMessage': 'Send Message',
      'common.sending': 'Sending...',
      'contact.successMessage': 'Message sent!',
      'contact.errorMessage': 'Error occurred',
    };
    return translations[key] || key;
  },
}));

jest.mock('assets/icons', () => ({
  Icon: ({ name }) => <span data-testid={`icon-${name}`}>{name}</span>,
}));

// Mock fetch
global.fetch = jest.fn(() => Promise.resolve({ ok: true }));

describe('Contact', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('renders contact section with title and subtitle', () => {
    render(<Contact />);
    expect(screen.getByText("What's Next?")).toBeInTheDocument();
    expect(screen.getByText("Let's Build Something Great")).toBeInTheDocument();
  });

  it('renders contact form fields', () => {
    render(<Contact />);
    expect(screen.getByLabelText(/Your Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Your Email/i)).toBeInTheDocument();
  });

  it('renders contact info', () => {
    render(<Contact />);
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
  });

  it('renders submit button', () => {
    render(<Contact />);
    expect(screen.getByText('Send Message')).toBeInTheDocument();
  });

  it('renders social links', () => {
    render(<Contact />);
    expect(screen.getByTestId('icon-linkedin')).toBeInTheDocument();
  });

  it('has correct section id', () => {
    render(<Contact />);
    const section = document.querySelector('#contact');
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute('id', 'contact');
  });
});
