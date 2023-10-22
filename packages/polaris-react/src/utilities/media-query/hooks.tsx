import {useContext} from 'react';

import {MediaQueryContext} from './context';

export function useMediaQuery() {
  const mediaQuery = useContext(MediaQueryContext);

  if (!mediaQuery) {
    throw new Error(
      'No mediaQuery was provided. Your application must be wrapped in an <AppProvider> component. See https://polaris.shopify.com/components/app-provider for implementation instructions.',
    );
  }

  return mediaQuery;
}
