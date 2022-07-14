import {useContext} from 'react';

import {PortalsManagerContext} from './context';

export function usePortalsManager() {
  const portalsManager = useContext(PortalsManagerContext);

  if (!portalsManager) {
    throw new Error(
      'No portals manager was provided. Your application must be wrapped in an <AppProvider> component. See https://polaris.shopify.com/components/app-provider for implementation instructions.',
    );
  }

  return portalsManager;
}
