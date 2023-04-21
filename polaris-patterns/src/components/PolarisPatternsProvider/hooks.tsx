import {I18nManager} from '@shopify/react-i18n';
import {useContext} from 'react';

import {I18nDetails} from './PolarisPatternsProvider';

const providerErrorMessage =
  'Your application must be wrapped in a <PolarisPatternsProvider> component.';

export function useI18nDetails() {
  const i18nDetails = useContext(I18nDetails);

  if (!i18nDetails) {
    throw new Error(providerErrorMessage);
  }

  return i18nDetails;
}

export function useShopifyI18nManager() {
  const i18nDetails = useContext(I18nDetails);

  if (!i18nDetails) {
    throw new Error(providerErrorMessage);
  }
  return new I18nManager(i18nDetails);
}
