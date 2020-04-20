import React from 'react';

import type {StickyManager} from './sticky-manager';

export const StickyManagerContext = React.createContext<
  StickyManager | undefined
>(undefined);
