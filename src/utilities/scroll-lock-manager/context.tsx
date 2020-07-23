import {createContext} from 'react';

import type {ScrollLockManager} from './scroll-lock-manager';

export const ScrollLockManagerContext = createContext<
  ScrollLockManager | undefined
>(undefined);
