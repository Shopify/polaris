import React from 'react';

import type {ScrollLockManager} from './scroll-lock-manager';

export const ScrollLockManagerContext = React.createContext<
  ScrollLockManager | undefined
>(undefined);
