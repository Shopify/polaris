import {useContext, useRef} from 'react';

import {IndexFiltersModeContext} from './context';
import type {IndexFiltersMode} from './types';

export function useSetIndexFiltersMode(initialValue?: IndexFiltersMode) {
  const indexFiltersMode = useContext(IndexFiltersModeContext);

  if (!indexFiltersMode) {
    throw new Error(
      'No index filters manager was provided. Your application must be wrapped in an <AppProvider> component. See https://polaris.shopify.com/components/app-provider for implementation instructions.',
    );
  }

  const {mode, setMode} = indexFiltersMode;

  const hasMounted = useRef(false);

  if (!hasMounted.current) {
    if (initialValue) {
      setMode(initialValue);
    }
    hasMounted.current = true;
  }

  return {
    mode,
    setMode,
  };
}
