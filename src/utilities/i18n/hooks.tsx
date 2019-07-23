import {useContext} from 'react';
import {I18nContext} from './context';

export function useI18n() {
  const i18n = useContext(I18nContext);

  if (!i18n) {
    throw new Error(
      'No i18n was provided. Your application must be wrapped in an <AppProvider> component. See https://polaris.shopify.com/components/structure/app-provider for implementation instructions.',
    );
  }

  return i18n;
}
