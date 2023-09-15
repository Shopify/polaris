import {createContext} from 'react';

import type {IndexFiltersMode} from './types';

export interface IndexFiltersContextType {
  mode: IndexFiltersMode;
  setMode: (mode: IndexFiltersMode) => void;
}

export const IndexFiltersContext = createContext<
  IndexFiltersContextType | undefined
>(undefined);
