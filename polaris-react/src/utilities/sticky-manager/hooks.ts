import {useContext} from 'react';

import {MissingAppProviderError} from '../errors';

import {StickyManagerContext} from './context';

export function useStickyManager() {
  const stickyManager = useContext(StickyManagerContext);

  if (!stickyManager) {
    throw new MissingAppProviderError('No StickyManager was provided.');
  }

  return stickyManager;
}
