import type {I18nDetails, TranslationDictionary} from '@shopify/react-i18n';
import {CurrencyCode, I18n} from '@shopify/react-i18n';

export * from './react-testing';

const defaultI18nDetails = {
  locale: 'en',
  currency: CurrencyCode.Usd,
  country: 'CA',
  timezone: 'America/Toronto',
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
