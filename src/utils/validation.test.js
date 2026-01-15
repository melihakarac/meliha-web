import { validateField, validateForm, contactFormRules, patterns } from './validation';

describe('validation', () => {
  describe('validateField', () => {
    it('should return empty string for valid name', () => {
      const error = validateField('name', 'John Doe', contactFormRules);
      expect(error).toBe('');
    });

    it('should return error for empty required field', () => {
      const error = validateField('name', '', contactFormRules);
      expect(error).toBe('Name is required');
    });

    it('should return error for name shorter than minLength', () => {
      const error = validateField('name', 'J', contactFormRules);
      expect(error).toBe('Name must be at least 2 characters');
    });

    it('should return error for name with invalid characters', () => {
      const error = validateField('name', 'John123', contactFormRules);
      expect(error).toBe('Name can only contain letters, spaces, hyphens, and apostrophes');
    });

    it('should accept valid name with hyphen and apostrophe', () => {
      const error = validateField('name', "Mary-Jane O'Connor", contactFormRules);
      expect(error).toBe('');
    });

    it('should return error for invalid email', () => {
      const error = validateField('email', 'invalid-email', contactFormRules);
      expect(error).toBe('Please enter a valid email address');
    });

    it('should return empty string for valid email', () => {
      const error = validateField('email', 'test@example.com', contactFormRules);
      expect(error).toBe('');
    });

    it('should return error for empty email', () => {
      const error = validateField('email', '', contactFormRules);
      expect(error).toBe('Email is required');
    });

    it('should return error for subject shorter than minLength', () => {
      const error = validateField('subject', 'Hi', contactFormRules);
      expect(error).toBe('Subject must be at least 3 characters');
    });

    it('should return empty string for valid subject', () => {
      const error = validateField('subject', 'Hello World', contactFormRules);
      expect(error).toBe('');
    });

    it('should return error for message shorter than minLength', () => {
      const error = validateField('message', 'Short', contactFormRules);
      expect(error).toBe('Message must be at least 10 characters');
    });

    it('should return empty string for valid message', () => {
      const error = validateField(
        'message',
        'This is a valid message with enough characters',
        contactFormRules
      );
      expect(error).toBe('');
    });

    it('should return error for field exceeding maxLength', () => {
      const longName = 'a'.repeat(101);
      const error = validateField('name', longName, contactFormRules);
      expect(error).toBe('Name is too long (max 100 characters)');
    });

    it('should trim whitespace before validation', () => {
      const error = validateField('name', '  ', contactFormRules);
      expect(error).toBe('Name is required');
    });

    it('should return empty string for unknown field', () => {
      const error = validateField('unknown', 'value', contactFormRules);
      expect(error).toBe('');
    });
  });

  describe('validateForm', () => {
    it('should return isValid true for valid form data', () => {
      const formData = {
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Test Subject',
        message: 'This is a test message with enough characters',
      };

      const result = validateForm(formData, contactFormRules);
      expect(result.isValid).toBe(true);
      expect(Object.keys(result.errors).length).toBe(0);
    });

    it('should return isValid false for invalid form data', () => {
      const formData = {
        name: '',
        email: 'invalid-email',
        subject: 'Hi',
        message: 'Short',
      };

      const result = validateForm(formData, contactFormRules);
      expect(result.isValid).toBe(false);
      expect(Object.keys(result.errors).length).toBeGreaterThan(0);
    });

    it('should return errors for all invalid fields', () => {
      const formData = {
        name: '',
        email: '',
        subject: '',
        message: '',
      };

      const result = validateForm(formData, contactFormRules);
      expect(result.isValid).toBe(false);
      expect(result.errors.name).toBeTruthy();
      expect(result.errors.email).toBeTruthy();
      expect(result.errors.subject).toBeTruthy();
      expect(result.errors.message).toBeTruthy();
    });

    it('should only return errors for invalid fields', () => {
      const formData = {
        name: 'John Doe',
        email: 'invalid-email',
        subject: 'Valid Subject',
        message: 'This is a valid message with enough characters',
      };

      const result = validateForm(formData, contactFormRules);
      expect(result.isValid).toBe(false);
      expect(result.errors.name).toBeUndefined();
      expect(result.errors.email).toBeTruthy();
      expect(result.errors.subject).toBeUndefined();
      expect(result.errors.message).toBeUndefined();
    });
  });

  describe('patterns', () => {
    it('should match valid name pattern', () => {
      expect(patterns.name.test('John Doe')).toBe(true);
      expect(patterns.name.test("Mary-Jane O'Connor")).toBe(true);
      expect(patterns.name.test('José')).toBe(true);
    });

    it('should not match invalid name pattern', () => {
      expect(patterns.name.test('John123')).toBe(false);
      expect(patterns.name.test('John@Doe')).toBe(false);
    });

    it('should match valid email pattern', () => {
      expect(patterns.email.test('test@example.com')).toBe(true);
      expect(patterns.email.test('user.name@domain.co.uk')).toBe(true);
    });

    it('should not match invalid email pattern', () => {
      expect(patterns.email.test('invalid-email')).toBe(false);
      expect(patterns.email.test('test@')).toBe(false);
      expect(patterns.email.test('@example.com')).toBe(false);
    });
  });
});
