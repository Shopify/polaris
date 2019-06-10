import {useContext} from 'react';
import {StickyManagerContext} from './context';

export function useStickyManager() {
  const stickyManager = useContext(StickyManagerContext);

  return stickyManager;
}
