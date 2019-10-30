import React from 'react';

type ListBoxContextType = {
  keyboardFocusedItem?: string;
  scrollable?: HTMLElement | Document;
};

export const ListBoxContext = React.createContext<ListBoxContextType>({});
