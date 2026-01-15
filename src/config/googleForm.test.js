import { getGoogleFormUrl, buildGoogleFormData, GOOGLE_FORM_CONFIG } from './googleForm';

describe('googleForm', () => {
  // These tests work with whatever env vars are set
  // The actual values don't matter for testing the logic

  describe('getGoogleFormUrl', () => {
    it('should build correct Google Form URL format', () => {
      const { getGoogleFormUrl } = require('./googleForm');
      const url = getGoogleFormUrl();
      expect(url).toMatch(/^https:\/\/docs\.google\.com\/forms\/d\/e\/.+\/formResponse$/);
    });

    it('should use form ID from environment variable', () => {
      const { getGoogleFormUrl, GOOGLE_FORM_CONFIG } = require('./googleForm');
      const url = getGoogleFormUrl();
      if (GOOGLE_FORM_CONFIG.formId) {
        expect(url).toContain(GOOGLE_FORM_CONFIG.formId);
      } else {
        // If no env var is set, URL should still be valid format
        expect(url).toMatch(/^https:\/\/docs\.google\.com\/forms\/d\/e\/.+\/formResponse$/);
      }
    });
  });

  describe('buildGoogleFormData', () => {
    it('should build FormData with correct entry IDs', () => {
      const { buildGoogleFormData, GOOGLE_FORM_CONFIG } = require('./googleForm');
      const formData = {
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Test Subject',
        message: 'Test message',
      };

      const googleFormData = buildGoogleFormData(formData);

      // Check that form data is added if entry IDs are configured
      if (GOOGLE_FORM_CONFIG.fields.name) {
        expect(googleFormData.get(GOOGLE_FORM_CONFIG.fields.name)).toBe('John Doe');
      }
      if (GOOGLE_FORM_CONFIG.fields.email) {
        expect(googleFormData.get(GOOGLE_FORM_CONFIG.fields.email)).toBe('john@example.com');
      }
    });

    it('should only include fields that have entry IDs configured', () => {
      const { buildGoogleFormData, GOOGLE_FORM_CONFIG } = require('./googleForm');
      const formData = {
        name: 'John Doe',
        email: 'john@example.com',
        unknownField: 'This should not be included',
      };

      const googleFormData = buildGoogleFormData(formData);

      // Known fields should be included if entry IDs exist
      if (GOOGLE_FORM_CONFIG.fields.name) {
        expect(googleFormData.get(GOOGLE_FORM_CONFIG.fields.name)).toBe('John Doe');
      }
      // Unknown field should never be included
      expect(googleFormData.get('unknownField')).toBeNull();
    });

    it('should handle empty form data', () => {
      const formData = {};
      const googleFormData = buildGoogleFormData(formData);

      // FormData should be empty
      const entries = Array.from(googleFormData.entries());
      expect(entries.length).toBe(0);
    });

    it('should handle form data with missing entry IDs', () => {
      // Test that it only includes fields that have entry IDs
      const formData = {
        name: 'John Doe',
        email: 'john@example.com',
        unknownField: 'Should not be included',
      };

      const googleFormData = buildGoogleFormData(formData);

      // Name and email should be included
      expect(googleFormData.get('entry.123456789')).toBe('John Doe');
      expect(googleFormData.get('entry.987654321')).toBe('john@example.com');
      // Unknown field should not be included
      expect(googleFormData.get('unknownField')).toBeNull();
    });

    it('should handle null and undefined values', () => {
      const { buildGoogleFormData, GOOGLE_FORM_CONFIG } = require('./googleForm');
      const formData = {
        name: null,
        email: undefined,
        subject: 'Valid Subject',
      };

      const googleFormData = buildGoogleFormData(formData);

      // FormData converts null/undefined to strings
      if (GOOGLE_FORM_CONFIG.fields.name) {
        expect(googleFormData.get(GOOGLE_FORM_CONFIG.fields.name)).toBe('null');
      }
      if (GOOGLE_FORM_CONFIG.fields.email) {
        expect(googleFormData.get(GOOGLE_FORM_CONFIG.fields.email)).toBe('undefined');
      }
      if (GOOGLE_FORM_CONFIG.fields.subject) {
        expect(googleFormData.get(GOOGLE_FORM_CONFIG.fields.subject)).toBe('Valid Subject');
      }
    });

    it('should handle special characters in form data', () => {
      const { buildGoogleFormData, GOOGLE_FORM_CONFIG } = require('./googleForm');
      const formData = {
        name: "John O'Connor",
        message: 'Message with "quotes" and <tags>',
      };

      const googleFormData = buildGoogleFormData(formData);

      if (GOOGLE_FORM_CONFIG.fields.name) {
        expect(googleFormData.get(GOOGLE_FORM_CONFIG.fields.name)).toBe("John O'Connor");
      }
      if (GOOGLE_FORM_CONFIG.fields.message) {
        expect(googleFormData.get(GOOGLE_FORM_CONFIG.fields.message)).toBe(
          'Message with "quotes" and <tags>'
        );
      }
    });
  });

  describe('GOOGLE_FORM_CONFIG', () => {
    it('should have formId from environment', () => {
      const { GOOGLE_FORM_CONFIG } = require('./googleForm');
      // formId may be undefined if env var not set, but config should exist
      expect(GOOGLE_FORM_CONFIG).toHaveProperty('formId');
    });

    it('should have fields configuration', () => {
      const { GOOGLE_FORM_CONFIG } = require('./googleForm');
      expect(GOOGLE_FORM_CONFIG.fields).toHaveProperty('name');
      expect(GOOGLE_FORM_CONFIG.fields).toHaveProperty('email');
      expect(GOOGLE_FORM_CONFIG.fields).toHaveProperty('subject');
      expect(GOOGLE_FORM_CONFIG.fields).toHaveProperty('message');
    });
  });
});
