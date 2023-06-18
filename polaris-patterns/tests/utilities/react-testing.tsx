import React from 'react';
import {
  createMount,
  mount,
  Element as ReactTestingElement,
  CustomRoot,
} from '@shopify/react-testing';
import {getIanaTimeZone} from '@shopify/dates';
import {PolarisTestProvider} from '@shopify/polaris';
import type {WithPolarisTestProviderOptions} from '@shopify/polaris';
import polarisEnTranslations from '@shopify/polaris/locales/en.json';
import {
  I18nContext,
  I18nManager,
  I18n,
  CurrencyCode,
} from '@shopify/react-i18n';
import type {I18nDetails, TranslationDictionary} from '@shopify/react-i18n';

export {createMount, mount, ReactTestingElement, CustomRoot};

export const mountWithApp = createMount<
  WithPolarisTestProviderOptions,
  WithPolarisTestProviderOptions
>({
  context(options) {
    return options;
  },
  render(element, context) {
    const i18nManager = new I18nManager({
      locale: 'en',
      currency: 'usd',
      country: 'CA',
    });

    return (
      <I18nContext.Provider value={i18nManager}>
        <PolarisTestProvider i18n={{...polarisEnTranslations}} {...context}>
          {element}
        </PolarisTestProvider>
      </I18nContext.Provider>
    );
  },
});

export const defaultI18nDetails = {
  locale: 'en',
  currency: CurrencyCode.Usd,
  country: 'CA',
  timezone: getIanaTimeZone() || 'UTC',
};

export function mockI18n(
  translations?: TranslationDictionary | TranslationDictionary[],
  details: Partial<I18nDetails> = {},
) {
  return new I18n(
    Array.isArray(translations)
      ? translations
      : (translations && [translations]) || [],
    {...defaultI18nDetails, ...details},
  );
}
