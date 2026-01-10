import en from './en.json';

const translations = { en };

const defaultLocale = 'en';

export const t = (key, params = {}) => {
  const keys = key.split('.');
  let value = translations[defaultLocale];

  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
  }

  // Replace template params like {year}
  if (typeof value === 'string') {
    return value.replace(/\{(\w+)\}/g, (_, param) => params[param] ?? `{${param}}`);
  }

  return value;
};

export default translations;
