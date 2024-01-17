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
  // Callback fired when TextField is focused
  onTextFieldFocus?(): void;
  // Callback fired when TextField is blurred
  onTextFieldBlur?(): void;
  // Callback fired when TextField value changes
  onTextFieldChange?(value: string): void;
}

export interface ComboboxListboxType {
  // Value of the Texfields ID for listbox aria-labelledby
  textFieldLabelId?: string;
  // Enables/disables keyboard control
  textFieldFocused?: boolean;
  // Unique ID to set on the listbox. Used to set the Combobox aria-owns and TextField aria-controls attributes.
  listboxId?: string;
  focused?: boolean;
  // Whethor or not more options are available to lazy load. Use the hasMoreResults boolean provided by the GraphQL API of the paginated data. */
  willLoadMoreOptions?: boolean;
  // Sets the value for the TextField aria-activedescendant attribute.
  setActiveOptionId?(id: string): void;
  // Callback to set a generated listbox ID.
  setListboxId?(id: string): void;
  // Callback fired when an option is selected.
  onOptionSelected?(): void;
  // Callback fired when keyboard user navigates to the last item. Use to lazy load when listbox option data is paginated.
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

export const ComboboxListboxOptionContext =
  createContext<ComboboxListboxOptionType>({});
