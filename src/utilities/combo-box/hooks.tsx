import {useContext} from 'react';
import {ComboBoxContext} from './context';

export function useComboBox() {
  const context = useContext(ComboBoxContext);
  return context;
}
