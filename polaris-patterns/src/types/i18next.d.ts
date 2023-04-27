import 'react-i18next';

import type enTranslation from '../../locales/en.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: {
      translation: typeof enTranslation;
    };
  }
}
