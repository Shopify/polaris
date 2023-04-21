export interface Polaris {
  VERSION: string;
}

declare global {
  interface Window {
    Polaris: Polaris;
  }
}

if (typeof window !== 'undefined') {
  window.Polaris = window.Polaris || {};
  window.Polaris.VERSION = '{{POLARIS_VERSION}}';
}

export const polarisVersion = '{{POLARIS_VERSION}}';

export const DEFAULT_LOCALE = 'en';
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
