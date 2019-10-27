import React from 'react';

type ListBoxContextType = {
  keyboardFocusedItem?: string;
  onItemClick?(value: string): void;
  scrollable?: Element;
};

export const ListBoxContext = React.createContext<ListBoxContextType>({});
