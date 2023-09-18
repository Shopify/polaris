import {useContext} from 'react';

import {IndexFiltersContext} from './context';

export function useIndexFiltersManager() {
  const indexFiltersManager = useContext(IndexFiltersContext);

  if (!indexFiltersManager) {
    throw new Error(
      'No index filters manager was provided. Your application must be wrapped in an <AppProvider> component. See https://polaris.shopify.com/components/app-provider for implementation instructions.',
    );
  }

  const {mode, setMode} = indexFiltersManager;

  return {
    mode,
    setMode,
  };
}
