import {useContext} from 'react';
import {StickyManagerContext} from './context';

export function useStickyManager() {
  const stickyManager = useContext(StickyManagerContext);

  if (!stickyManager) {
    throw new Error(
      'No StickyManager was provided. Your application must be wrapped in an <AppProvider> component. See https://polaris.shopify.com/components/structure/app-provider for implementation instructions.',
    );
  }

  return stickyManager;
}
