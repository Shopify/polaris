import React from 'react';
import {StickyManager} from './sticky-manager';

export const StickyManagerContext = React.createContext<
  StickyManager | undefined
>(undefined);
