import {createContext} from 'react';

export interface FocusManagerContextType {
  trapFocusList: string[];
  add: (id: string) => void;
  remove: (id: string) => boolean;
}

export const FocusManagerContext = createContext<
  FocusManagerContextType | undefined
>(undefined);
