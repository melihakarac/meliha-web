export const formFields = [
  { name: 'name', type: 'text', placeholder: 'Jane Smith' },
  { name: 'email', type: 'email', placeholder: 'jane@company.com' },
  { name: 'subject', type: 'text', placeholder: 'New project opportunity' },
  {
    name: 'message',
    type: 'textarea',
    placeholder: 'Hi Meliha! I came across your portfolio and...',
  },
];

export const getInitialFormValues = () =>
  formFields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {});
