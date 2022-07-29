import {useContext} from 'react';

import {MissingAppProviderError} from '../errors';

import {ScrollLockManagerContext} from './context';

export function useScrollLockManager() {
  const scrollLockManager = useContext(ScrollLockManagerContext);

  if (!scrollLockManager) {
    throw new MissingAppProviderError('No ScrollLockManager was provided.');
  }
  return scrollLockManager;
}
