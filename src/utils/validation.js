export const patterns = {
  name: /^[a-zA-ZÀ-ÿ\s'-]+$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};

export const contactFormRules = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 100,
    pattern: patterns.name,
    patternMessage: 'Name can only contain letters, spaces, hyphens, and apostrophes',
    message: 'Name must be at least 2 characters',
  },
  email: {
    required: true,
    pattern: patterns.email,
    patternMessage: 'Please enter a valid email address',
    message: 'Please enter a valid email address',
  },
  subject: {
    required: true,
    minLength: 3,
    maxLength: 200,
    message: 'Subject must be at least 3 characters',
  },
  message: {
    required: true,
    minLength: 10,
    maxLength: 5000,
    message: 'Message must be at least 10 characters',
  },
};

/**
 * Validates a single field against its rules
 * @param {string} fieldName - The name of the field
 * @param {string} value - The value to validate
 * @param {Object} rules - The validation rules object
 * @returns {string} Error message or empty string if valid
 */
export const validateField = (fieldName, value, rules) => {
  const fieldRules = rules[fieldName];
  if (!fieldRules) return '';

  const trimmedValue = value.trim();
  const capitalizedName = fieldName.charAt(0).toUpperCase() + fieldName.slice(1);

  if (fieldRules.required && !trimmedValue) {
    return `${capitalizedName} is required`;
  }

  if (fieldRules.pattern && trimmedValue && !fieldRules.pattern.test(trimmedValue)) {
    return fieldRules.patternMessage || fieldRules.message;
  }

  if (fieldRules.minLength && trimmedValue.length < fieldRules.minLength) {
    return fieldRules.message;
  }

  if (fieldRules.maxLength && trimmedValue.length > fieldRules.maxLength) {
    return `${capitalizedName} is too long (max ${fieldRules.maxLength} characters)`;
  }

  return '';
};

/**
 * Validates all fields in a form
 * @param {Object} formData - The form data object
 * @param {Object} rules - The validation rules object
 * @returns {{ isValid: boolean, errors: Object }}
 */
export const validateForm = (formData, rules) => {
  const errors = {};
  let isValid = true;

  Object.keys(formData).forEach((field) => {
    const error = validateField(field, formData[field], rules);
    if (error) {
      errors[field] = error;
      isValid = false;
    }
  });

  return { isValid, errors };
};
