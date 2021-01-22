import {createContext} from 'react';

import type {NavigableOption} from './types';

export interface ListBoxContextType {
  onOptionSelect(option: NavigableOption): void;
  setLoading(label?: string): void;
}

export const ListBoxContext = createContext<ListBoxContextType | undefined>(
  undefined,
);

export const WithinListBoxContext = createContext(false);
