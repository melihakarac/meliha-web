/**
 * Google Form Configuration
 * Form submissions will be sent to your Google Form and stored in Google Sheets
 * Values are loaded from environment variables (see .env.example)
 */

export const GOOGLE_FORM_CONFIG = {
  formId: process.env.REACT_APP_GOOGLE_FORM_ID,
  fields: {
    name: process.env.REACT_APP_FORM_ENTRY_NAME,
    email: process.env.REACT_APP_FORM_ENTRY_EMAIL,
    subject: process.env.REACT_APP_FORM_ENTRY_SUBJECT,
    message: process.env.REACT_APP_FORM_ENTRY_MESSAGE,
  },
};

/**
 * Builds the Google Form submission URL
 */
export const getGoogleFormUrl = () => {
  return `https://docs.google.com/forms/d/e/${GOOGLE_FORM_CONFIG.formId}/formResponse`;
};

/**
 * Builds form data for Google Forms submission
 */
export const buildGoogleFormData = (formData) => {
  const googleFormData = new FormData();

  Object.entries(formData).forEach(([key, value]) => {
    const entryId = GOOGLE_FORM_CONFIG.fields[key];
    if (entryId) {
      googleFormData.append(entryId, value);
    }
  });

  return googleFormData;
};
