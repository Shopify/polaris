import type {PropsWithChildren} from 'react';
import React, {createContext, useEffect} from 'react';
import {I18nextProvider, initReactI18next} from 'react-i18next';
import {createInstance} from 'i18next';

import enTranslations from '../../../locales/en.json';
import {DEFAULT_I18N_DETAILS} from '../../configure';

export const I18nDetails = createContext(DEFAULT_I18N_DETAILS);

const i18next = createInstance({
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

interface TranslationDictionary {
  [key: string]: string | TranslationDictionary;
}

interface I18nDetails {
  locale: string;
  country?: string;
  currency?: string;
  timezone?: string;
}

export interface Props {
  i18nDetails: I18nDetails;
  translations: TranslationDictionary;
  enFallback: TranslationDictionary;
}

export function PolarisPatternsProvider({
  translations,
  i18nDetails,
  enFallback,
  children,
}: PropsWithChildren<Props>) {
  useEffect(() => {
    i18next.addResourceBundle('en', 'translation', enFallback);
  }, [enFallback]);
  useEffect(() => {
    i18next.changeLanguage(i18nDetails.locale);
    i18next.addResourceBundle(i18nDetails.locale, 'translation', translations);
  }, [i18nDetails, translations]);

  return (
    <I18nDetails.Provider value={i18nDetails}>
      <I18nextProvider i18n={i18next}>{children}</I18nextProvider>
    </I18nDetails.Provider>
  );
}
