import React from 'react';

export type ComboBoxContextType = {
  activeDescendant?: string;
  setActiveDescendant?(id: string): void;
  suggestion?: string;
  setSuggestion?(value: string): void;
  textfieldId?: string;
  setTextFieldId?(id: string): void;
  labelId?: string;
  setLabelId?(id: string): void;
  labelledBy?: string;
  onOptionSelected?(value: string): void;
};

export const ComboBoxContext = React.createContext<ComboBoxContextType>({});
