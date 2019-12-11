import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationES from './assets/i18n/es.json';
import translationEN from './assets/i18n/en.json';
import Storage from './services/storage';

const fallbackLng = Storage.getLocalItem('asms_lang') || 'en';

const resources = {
  en: {
    translation: translationEN,
  },
  es: {
    translation: translationES,
  },
};

i18n
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources,
    fallbackLng,
    debug: true,
    keySeparator: true,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
