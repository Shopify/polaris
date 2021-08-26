import {useContext} from 'react';

import {ComboboxTextFieldContext, ComboboxListboxContext} from './context';

export function useComboboxTextField() {
  const context = useContext(ComboboxTextFieldContext);
  if (!context) {
    throw new Error(
      'No Combobox was provided. Your component must be wrapped in a <Combobox> component.',
    );
  }
  return context;
}

export function useComboboxListbox() {
  const context = useContext(ComboboxListboxContext);
  return context;
}
