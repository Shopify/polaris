import React from 'react';

interface ComboBoxContextType {
  comboBoxId?: string;
  selectedOptionId?: string;
}

export const ComboBoxContext = React.createContext<ComboBoxContextType>({});
