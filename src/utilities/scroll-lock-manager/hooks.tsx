import {useContext} from 'react';
import {ScrollLockManagerContext} from './context';

export function useScrollLockManager() {
  const scrollLockManager = useContext(ScrollLockManagerContext);

  if (!scrollLockManager) {
    throw new Error(
      'No ScrollLockManager was provided. Your application must be wrapped in an <AppProvider> component. See https://polaris.shopify.com/components/structure/app-provider for implementation instructions.',
    );
  }
  return scrollLockManager;
}
