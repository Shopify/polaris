import React from 'react';

type ListBoxContextType = {
  keyboardFocusedItem?: string;
  scrollable?: Element | null;
};

export const ListBoxContext = React.createContext<ListBoxContextType>({});
