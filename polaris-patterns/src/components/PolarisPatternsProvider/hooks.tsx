import {I18nManager} from '@shopify/react-i18n';
import {useContext} from 'react';

import {I18nDetails} from './PolarisPatternsProvider';

export function useI18nDetails() {
  const i18nDetails = useContext(I18nDetails);

  if (!i18nDetails) {
    throw new Error(
      'No i18nDetails were provided. Make sure to wrap library components in a <PolarisPatternsProvider />.',
    );
  }

  return i18nDetails;
}

export function useShopifyI18nManager() {
  const i18nDetails = useContext(I18nDetails);

  if (!i18nDetails) {
    throw new Error(
      'No i18nDetails were provided. Make sure to wrap library components in a <PolarisPatternsProvider />.',
    );
  }
  return new I18nManager(i18nDetails);
}
