import {createContext} from 'react';

interface ComboBoxContextType {
  comboBoxId?: string;
  selectedOptionId?: string;
}

export const ComboBoxContext = createContext<ComboBoxContextType>({});
