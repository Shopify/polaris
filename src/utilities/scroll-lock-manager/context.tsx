import React from 'react';

import {ScrollLockManager} from './scroll-lock-manager';

export const ScrollLockManagerContext = React.createContext<
  ScrollLockManager | undefined
>(undefined);
