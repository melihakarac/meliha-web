import { useState, useCallback, useMemo } from 'react';
import { validateField, validateForm } from '../utils/validation';

/**
 * Custom hook for form validation
 * @param {Object} initialValues - Initial form values
 * @param {Object} validationRules - Validation rules for each field
 * @returns {Object} Form state and handlers
 */
const useFormValidation = (initialValues, validationRules) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Handle input change
  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setValues((prev) => ({ ...prev, [name]: value }));

      // Clear error when user starts typing
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: '' }));
      }
    },
    [errors]
  );

  // Handle input blur
  const handleBlur = useCallback(
    (e) => {
      const { name, value } = e.target;
      setTouched((prev) => ({ ...prev, [name]: true }));

      const error = validateField(name, value, validationRules);
      setErrors((prev) => ({ ...prev, [name]: error }));
    },
    [validationRules]
  );

  // Check if form is valid (without setting errors)
  const isValid = useMemo(() => {
    return Object.keys(values).every((field) => {
      const error = validateField(field, values[field], validationRules);
      return !error;
    });
  }, [values, validationRules]);

  // Validate entire form (sets errors and touched)
  const validate = useCallback(() => {
    const { isValid, errors: formErrors } = validateForm(values, validationRules);

    setErrors(formErrors);
    setTouched(Object.keys(values).reduce((acc, key) => ({ ...acc, [key]: true }), {}));

    return isValid;
  }, [values, validationRules]);

  // Reset form to initial state
  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  // Get field props for easy spreading
  const getFieldProps = useCallback(
    (name) => ({
      name,
      value: values[name] || '',
      onChange: handleChange,
      onBlur: handleBlur,
      'aria-invalid': touched[name] && errors[name] ? 'true' : 'false',
      'aria-describedby': errors[name] ? `${name}-error` : undefined,
    }),
    [values, handleChange, handleBlur, touched, errors]
  );

  // Check if field has error
  const hasError = useCallback((name) => touched[name] && !!errors[name], [touched, errors]);

  // Get error message for field
  const getError = useCallback((name) => errors[name] || '', [errors]);

  return {
    values,
    errors,
    touched,
    isValid,
    handleChange,
    handleBlur,
    validate,
    reset,
    getFieldProps,
    hasError,
    getError,
    setValues,
  };
};

export default useFormValidation;
