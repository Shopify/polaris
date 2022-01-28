import {createContext} from 'react';

import type {NavigableOption} from './types';

export interface ListboxContextType {
  onOptionSelect(option: NavigableOption): void;
  setLoading(label?: string): void;
}

export const ListboxContext = createContext<ListboxContextType | undefined>(
  undefined,
);

export const WithinListboxContext = createContext(false);

export const ActionContext = createContext<boolean>(false);
