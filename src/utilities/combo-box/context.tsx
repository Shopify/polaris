import React from 'react';

type ComboBoxContextType = {
  activeDescendant: string;
  setActiveDescendant(id: string): void;
  firstOptionLabel?: string;
  setFirstOptionLabel?(label: React.ReactNode): void;
  textfieldId: string;
  setTextFieldId(id: string): void;
  textfieldValue?: string;
  setTextfieldValue?(value: string): void;
  listBoxId: string;
  onOptionSelected(value: string): void;
};

export const ComboBoxContext = React.createContext<ComboBoxContextType | null>(
  null,
);
