import {createContext} from 'react';

export interface ComboBoxTextFieldType {
  // Value for the TextField aria-activedescendant. (also on list context when not in combobox)
  activeOptionId?: string;
  // Value for the ComboBox aria-owns and TextField aria-control
  listBoxId?: string;
  // Value for aria-expanded on TextField
  expanded?: boolean;
  // Sets the value for the ListBox aria-labelledby
  setTextFieldLabelId?(id: string): void;
  // Sets a boolean to enable/disable keyboard control for the ListBox
  setTextFieldFocused?(value: boolean): void;
  // Callback when TextField is focused
  onTextFieldFocus?(): void;
  // Callback when TextField is blured
  onTextFieldBlur?(): void;
  // Callback when TextField is changed
  onTextFieldChange?(): void;
}

export interface ComboBoxListBoxType {
  // Value of the Texfields ID for listBox aria-labelledby
  textFieldLabelId?: string;
  // Enables/disables keyboard control
  textFieldFocused?: boolean;
  // Sets the value for the TextFields aria-activedescendant.
  setActiveOptionId?(id: string): void;
  // Sets the value of the listBoxId use for the ComboBox aria-owns and TextField aria-control
  setListBoxId?(id: string): void;
  // Value of listBoxId to avoid calling setListBoxId
  listBoxId?: string;
  // Handler used in ComboBox to brings to manage popover state and focus based on multi or single select
  onOptionSelected?(): void;
  // Callback to onScrolledToBottom when using keyboard navigation navigates to the last item
  onKeyToBottom?(): void;
}

export const ComboBoxTextFieldContext = createContext<
  ComboBoxTextFieldType | undefined
>(undefined);

export const ComboBoxListBoxContext = createContext<ComboBoxListBoxType>({});
