import React from 'react';

type ListBoxContextType = {
  keyboardFocusedOption?: string;
  onItemClick?(value: string, id?: string): void;
};

export const ListBoxContext = React.createContext<ListBoxContextType>({});
