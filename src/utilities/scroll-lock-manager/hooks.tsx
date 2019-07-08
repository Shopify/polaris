import {useContext} from 'react';
import {ScrollLockManagerContext} from './context';

export function useScrollLockManager() {
  const scrollLockManager = useContext(ScrollLockManagerContext);

  return scrollLockManager;
}
