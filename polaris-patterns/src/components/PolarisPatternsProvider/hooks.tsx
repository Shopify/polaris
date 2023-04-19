import {I18nManager} from '@shopify/react-i18n';
import {useContext} from 'react';

import {AppLocale} from './PolarisPatternsProvider';

export function useAppLocale() {
  const locale = useContext(AppLocale);

  if (!locale) {
    throw new Error(
      'No locale was provided. Make sure to wrap library components in a <PolarisPatternsProvider />.',
    );
  }

  return locale;
}

export function useI18nManager() {
  const locale = useContext(AppLocale);

  if (!locale) {
    throw new Error(
      'No locale was provided. Make sure to wrap library components in a <PolarisPatternsProvider />.',
    );
  }
  return new I18nManager(locale);
}
