import {createContext} from 'react';

export interface ComboboxTextFieldType {
  // Value for the TextField aria-activedescendant. (also on list context when not in combobox)
  activeOptionId?: string;
  // Value for the Combobox aria-owns and TextField aria-control
  listboxId?: string;
  // Value for aria-expanded on TextField
  expanded?: boolean;
  // Sets the value for the Listbox aria-labelledby
  setTextFieldLabelId?(id: string): void;
  // Sets a boolean to enable/disable keyboard control for the Listbox
  setTextFieldFocused?(value: boolean): void;
  // Callback when TextField is focused
  onTextFieldFocus?(): void;
  // Callback when TextField is blured
  onTextFieldBlur?(): void;
  // Callback when TextField is changed
  onTextFieldChange?(): void;
}

export interface ComboboxListboxType {
  // Value of the Texfields ID for listbox aria-labelledby
  textFieldLabelId?: string;
  // Enables/disables keyboard control
  textFieldFocused?: boolean;
  // Sets the value for the TextFields aria-activedescendant.
  setActiveOptionId?(id: string): void;
  // Sets the value of the listboxId use for the Combobox aria-owns and TextField aria-control
  setListboxId?(id: string): void;
  // Value of listboxId to avoid calling setListboxId
  listboxId?: string;
  // Handler used in Combobox to brings to manage popover state and focus based on multi or single select
  onOptionSelected?(): void;
  // Callback to onScrolledToBottom when using keyboard navigation navigates to the last item
  onKeyToBottom?(): void;
}

export interface ComboboxListboxOptionType {
  // Whether the option should visually support multiple selection
  allowMultiple?: boolean;
}

export const ComboboxTextFieldContext = createContext<
  ComboboxTextFieldType | undefined
>(undefined);

export const ComboboxListboxContext = createContext<ComboboxListboxType>({});

export const ComboboxListboxOptionContext = createContext<ComboboxListboxOptionType>(
  {},
);
