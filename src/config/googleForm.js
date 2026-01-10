/**
 * Google Form Configuration
 * Form submissions will be sent to your Google Form and stored in Google Sheets
 */

export const GOOGLE_FORM_CONFIG = {
  // Your Google Form ID
  formId: '1FAIpQLSfRLpkmB_2tOr8LJ-9HBlm5NWEcpT-d6BIKEwoAeOb113hBxg',

  // Entry IDs for each form field
  fields: {
    name: 'entry.1037547144',
    email: 'entry.1714862733',
    subject: 'entry.1460007839',
    message: 'entry.125925536',
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
