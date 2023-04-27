import {createContext} from 'react';
import {createInstance} from 'i18next';
import {initReactI18next} from 'react-i18next';

import enTranslations from '../../../locales/en.json';

import {DEFAULT_I18N_DETAILS} from './constants';
import type {I18nDetails} from './PolarisPatternsProvider';

export const I18nDetailsContext =
  createContext<I18nDetails>(DEFAULT_I18N_DETAILS);

export const i18next = createInstance({
  fallbackLng: DEFAULT_I18N_DETAILS.locale,
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      translation: enTranslations,
    },
  },
  returnNull: false,
});

i18next.use(initReactI18next).init();
