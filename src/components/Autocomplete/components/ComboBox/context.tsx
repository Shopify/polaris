import React from 'react';

export interface ComboBoxContextType {
  comboBoxId?: string;
  selectedOptionId?: string;
}

const ComboBoxContext = React.createContext<ComboBoxContextType>({});

export default ComboBoxContext;
