import {useContext} from 'react';

import {EphemeralPresenceManagerContext} from './context';

export function useEphemeralPresenceManager() {
  const ephemeralPresenceManager = useContext(EphemeralPresenceManagerContext);

  if (!ephemeralPresenceManager) {
    throw new Error(
      'No ephemeral presence manager was provided. Your application must be wrapped in an <AppProvider> component. See https://polaris.shopify.com/components/app-provider for implementation instructions.',
    );
  }

  return ephemeralPresenceManager;
}
