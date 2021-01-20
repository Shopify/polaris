import {useContext} from 'react';

import {ComboBoxTextFieldContext, ComboBoxListBoxContext} from './context';

export function useComboBoxTextField() {
  const context = useContext(ComboBoxTextFieldContext);
  if (!context) {
    throw new Error(
      'No ComboBox was provided. Your component must be wrapped in a <ComboBox> component.',
    );
  }
  return context;
}

export function useComboBoxListBox() {
  const context = useContext(ComboBoxListBoxContext);
  return context;
}
