import React from 'react';

export interface FocusManagerContextType {
  trapFocusList: string[];
  add: (id: string) => void;
  remove: (id: string) => boolean;
}

export const FocusManagerContext = React.createContext<
  FocusManagerContextType | undefined
>(undefined);
