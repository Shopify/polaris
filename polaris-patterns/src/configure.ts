import type {I18nDetails} from '@shopify/react-i18n';

export interface PolarisPatterns {
  VERSION: string;
}

declare global {
  interface Window {
    PolarisPatterns: PolarisPatterns;
  }
}

if (typeof window !== 'undefined') {
  window.PolarisPatterns = window.PolarisPatterns || {};
  window.PolarisPatterns.VERSION = '{{POLARIS_PATTERNS_VERSION}}';
}

export const polarisPatternsVersion = '{{POLARIS_PATTERNS_VERSION}}';

export const DEFAULT_I18N_DETAILS: I18nDetails = {
  locale: 'en',
  country: 'CA',
  currency: 'USD',
  timezone: 'EST',
};

export const SUPPORTED_LOCALES = [
  'cs',
  'da',
  'de',
  'en',
  'es',
  'fi',
  'fr',
  'it',
  'ja',
  'ko',
  'nb',
  'nl',
  'pl',
  'pt-BR',
  'pt-PT',
  'sv',
  'th',
  'tr',
  'vi',
  'zh-CN',
  'zh-TW',
];
