import React from 'react';

import type {NavigableOption} from '../../types';

export interface ListBoxContextType {
  onOptionSelect(option: NavigableOption): void;
  setLoading(label?: string): void;
}

export const ListBoxContext = React.createContext<
  ListBoxContextType | undefined
>(undefined);
