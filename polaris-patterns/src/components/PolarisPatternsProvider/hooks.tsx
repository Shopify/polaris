import {useContext} from 'react';

import {I18nDetailsContext} from './i18n';

const providerErrorMessage =
  'Your application must be wrapped in a <PolarisPatternsProvider> component.';

export function useI18nDetails() {
  const i18nDetails = useContext(I18nDetailsContext);

  if (!i18nDetails) {
    throw new Error(providerErrorMessage);
  }

  return i18nDetails;
}
