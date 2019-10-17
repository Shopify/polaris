import React from 'react';

type ListBoxContextType = {
  keyboardFocusedOption?: string;
  onItemClick?(value: string): void;
};

export const ListBoxContext = React.createContext<ListBoxContextType>({});
