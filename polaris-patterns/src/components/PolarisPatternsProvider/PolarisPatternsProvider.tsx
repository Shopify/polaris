import type {TranslationDictionary} from '@shopify/react-i18n';
import type {PropsWithChildren} from 'react';
import React, {useMemo, createContext, useEffect} from 'react';
import {I18nextProvider, initReactI18next} from 'react-i18next';
import {createInstance} from 'i18next';

export interface Props {
  locale: string;
  country: string;
  currency: string;
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

export const AppLocale = createContext({
  locale: 'en',
  currency: 'usd',
  country: 'CA',
});

export function PolarisPatternsProvider({
  locale,
  country,
  currency,
  translations,
  children,
}: PropsWithChildren<Props>) {
  useEffect(() => {
    i18next.changeLanguage(locale);
    i18next.addResourceBundle(locale, 'translation', translations);
  }, [locale, translations]);

  const localeValue = useMemo(
    () => ({
      locale,
      country,
      currency,
    }),
    [locale, country, currency],
  );

  return (
    <AppLocale.Provider value={localeValue}>
      <I18nextProvider i18n={i18next}>{children}</I18nextProvider>
    </AppLocale.Provider>
  );
}
