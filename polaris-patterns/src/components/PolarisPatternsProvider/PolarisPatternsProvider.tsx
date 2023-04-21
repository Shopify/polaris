import type {
  I18nDetails as Details,
  TranslationDictionary,
} from '@shopify/react-i18n';
import type {PropsWithChildren} from 'react';
import React, {createContext, useEffect} from 'react';
import {I18nextProvider, initReactI18next} from 'react-i18next';
import {createInstance} from 'i18next';

export interface Props {
  i18nDetails: Details;
  translations: TranslationDictionary;
}

export const i18next = createInstance({
  fallbackLng: 'en',
  debug: process.env.NODE_ENV === 'development',
  interpolation: {
    escapeValue: false,
  },
  resources: {},
});

i18next.use(initReactI18next).init();

const DEFAULT_I18N_DETAILS: Details = {
  locale: 'en',
  country: 'CA',
  currency: 'USD',
  timezone: 'EST',
};

export const I18nDetails = createContext(DEFAULT_I18N_DETAILS);

export function PolarisPatternsProvider({
  translations,
  i18nDetails,
  children,
}: PropsWithChildren<Props>) {
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
