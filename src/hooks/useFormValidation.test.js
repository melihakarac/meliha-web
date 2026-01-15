import { renderHook, act } from '@testing-library/react';
import useFormValidation from './useFormValidation';
import { contactFormRules } from '../utils/validation';

describe('useFormValidation', () => {
  const initialValues = {
    name: '',
    email: '',
    subject: '',
    message: '',
  };

  it('should initialize with initial values', () => {
    const { result } = renderHook(() => useFormValidation(initialValues, contactFormRules));

    expect(result.current.values).toEqual(initialValues);
    expect(result.current.errors).toEqual({});
    expect(result.current.touched).toEqual({});
  });

  it('should update values on change', () => {
    const { result } = renderHook(() => useFormValidation(initialValues, contactFormRules));

    act(() => {
      const event = {
        target: { name: 'name', value: 'John Doe' },
      };
      result.current.handleChange(event);
    });

    expect(result.current.values.name).toBe('John Doe');
  });

  it('should clear error when field value changes', () => {
    const { result } = renderHook(() => useFormValidation(initialValues, contactFormRules));

    // First, create an error by blurring empty field
    act(() => {
      const blurEvent = {
        target: { name: 'name', value: '' },
      };
      result.current.handleBlur(blurEvent);
    });

    expect(result.current.hasError('name')).toBe(true);

    // Then change the value
    act(() => {
      const changeEvent = {
        target: { name: 'name', value: 'John' },
      };
      result.current.handleChange(changeEvent);
    });

    expect(result.current.hasError('name')).toBe(false);
  });

  it('should validate field on blur', () => {
    const { result } = renderHook(() => useFormValidation(initialValues, contactFormRules));

    act(() => {
      const event = {
        target: { name: 'email', value: 'invalid-email' },
      };
      result.current.handleBlur(event);
    });

    expect(result.current.hasError('email')).toBe(true);
    expect(result.current.touched.email).toBe(true);
  });

  it('should mark field as touched on blur', () => {
    const { result } = renderHook(() => useFormValidation(initialValues, contactFormRules));

    act(() => {
      const event = {
        target: { name: 'name', value: 'John' },
      };
      result.current.handleBlur(event);
    });

    expect(result.current.touched.name).toBe(true);
  });

  it('should return isValid as false when form has errors', () => {
    const { result } = renderHook(() => useFormValidation(initialValues, contactFormRules));

    expect(result.current.isValid).toBe(false);
  });

  it('should return isValid as true when form is valid', () => {
    const validValues = {
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Test Subject',
      message: 'This is a test message with enough characters',
    };

    const { result } = renderHook(() => useFormValidation(validValues, contactFormRules));

    expect(result.current.isValid).toBe(true);
  });

  it('should validate entire form and return isValid', () => {
    const { result } = renderHook(() => useFormValidation(initialValues, contactFormRules));

    let isValid;
    act(() => {
      isValid = result.current.validate();
    });

    expect(isValid).toBe(false);
    expect(Object.keys(result.current.errors).length).toBeGreaterThan(0);
  });

  it('should mark all fields as touched after validate', () => {
    const { result } = renderHook(() => useFormValidation(initialValues, contactFormRules));

    act(() => {
      result.current.validate();
    });

    Object.keys(initialValues).forEach((field) => {
      expect(result.current.touched[field]).toBe(true);
    });
  });

  it('should reset form to initial values', () => {
    const { result } = renderHook(() => useFormValidation(initialValues, contactFormRules));

    // Change some values
    act(() => {
      const event = {
        target: { name: 'name', value: 'John Doe' },
      };
      result.current.handleChange(event);
    });

    // Blur to create errors
    act(() => {
      const event = {
        target: { name: 'email', value: '' },
      };
      result.current.handleBlur(event);
    });

    // Reset
    act(() => {
      result.current.reset();
    });

    expect(result.current.values).toEqual(initialValues);
    expect(result.current.errors).toEqual({});
    expect(result.current.touched).toEqual({});
  });

  it('should return correct field props', () => {
    const { result } = renderHook(() => useFormValidation(initialValues, contactFormRules));

    const fieldProps = result.current.getFieldProps('name');

    expect(fieldProps).toHaveProperty('name', 'name');
    expect(fieldProps).toHaveProperty('value', '');
    expect(fieldProps).toHaveProperty('onChange');
    expect(fieldProps).toHaveProperty('onBlur');
  });

  it('should set aria-invalid when field has error', () => {
    const { result } = renderHook(() => useFormValidation(initialValues, contactFormRules));

    act(() => {
      const event = {
        target: { name: 'email', value: 'invalid' },
      };
      result.current.handleBlur(event);
    });

    const fieldProps = result.current.getFieldProps('email');
    expect(fieldProps['aria-invalid']).toBe('true');
    expect(fieldProps['aria-describedby']).toBe('email-error');
  });

  it('should return error message for field with error', () => {
    const { result } = renderHook(() => useFormValidation(initialValues, contactFormRules));

    act(() => {
      const event = {
        target: { name: 'name', value: '' },
      };
      result.current.handleBlur(event);
    });

    expect(result.current.getError('name')).toBeTruthy();
    expect(result.current.getError('name').length).toBeGreaterThan(0);
  });

  it('should return empty string for field without error', () => {
    const { result } = renderHook(() => useFormValidation(initialValues, contactFormRules));

    expect(result.current.getError('name')).toBe('');
  });
});
