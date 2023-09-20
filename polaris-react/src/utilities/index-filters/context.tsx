import {createContext} from 'react';

import type {IndexFiltersMode} from './types';

export interface IndexFiltersModeContextType {
  mode: IndexFiltersMode;
  setMode: (mode: IndexFiltersMode) => void;
}

export const IndexFiltersModeContext = createContext<
  IndexFiltersModeContextType | undefined
>(undefined);
