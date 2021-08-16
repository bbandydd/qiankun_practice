import i18n from 'i18next';

import enUS from './en-US.json';
import zhTW from './zh-TW.json';

i18n.init({
  // we init with resources
  resources: {
    'en-US': {
      translations: enUS,
    },
    'zh-TW': {
      translations: zhTW,
    },
  },
  lng: localStorage.getItem('language') || 'en-US',
  fallbackLng: 'en-US',
  debug: false,

  // have a common namespace used around the full app
  ns: ['translations'],
  defaultNS: 'translations',

  // keySeparator: false, // we use content as keys

  interpolation: {
    escapeValue: false, // not needed for react!!
    formatSeparator: ',',
  },

  react: {
    wait: true,
  },
});

export default i18n;
