import {createContext} from 'react';

import type {StickyManager} from './sticky-manager';

export const StickyManagerContext = createContext<StickyManager | undefined>(
  undefined,
);
