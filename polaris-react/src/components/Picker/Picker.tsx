import React, {useState, useCallback, useMemo, Children, useRef} from 'react';

import {Popover} from '../Popover';
import type {PopoverPublicAPI} from '../Popover';
import {
  ComboboxTextFieldContext,
  ComboboxListboxContext,
  ComboboxListboxOptionContext,
} from '../../utilities/combobox';
import type {
  ComboboxTextFieldType,
  ComboboxListboxType,
  ComboboxListboxOptionType,
} from '../../utilities/combobox';
import {Box} from '../Box';
import type {TextFieldProps} from '../TextField';
import type {OptionProps} from '../Listbox';
import {Listbox} from '../Listbox';

import {TextField, Activator} from './components';
import type {ActivatorProps} from './components';

export interface PickerProps {
  /** Configure the button that activates the Picker */
  activator: ActivatorProps;
  /** Textfield that allows filtering of options */
  textField?: React.ReactElement<TextFieldProps> | TextFieldProps;
  /** Allows more than one option to be selected */
  allowMultiple?: boolean;
  /** The options to be listed within the picker */
  options?: OptionProps[];
  /** Whether or not more options are available to lazy load when the bottom of the listbox reached. Use the hasMoreResults boolean provided by the GraphQL API of the paginated data. */
  willLoadMoreOptions?: boolean;
  /** Height to set on the Popover Pane. */
  height?: string;
  /** Callback fired when the bottom of the lisbox is reached. Use to lazy load when listbox option data is paginated. */
  onScrolledToBottom?(): void;
  /** Callback fired when the popover closes */
  onClose?(): void;
}

export function Picker({
  activator,
  allowMultiple,
  textField,
  options,
  willLoadMoreOptions,
  height,
  onScrolledToBottom,
  onClose,
}: PickerProps) {
  const [popoverActive, setPopoverActive] = useState(false);
  const [activeOptionId, setActiveOptionId] = useState<string>();
  const [textFieldLabelId, setTextFieldLabelId] = useState<string>();
  const [listboxId, setListboxId] = useState<string>();
  const [textFieldFocused, setTextFieldFocused] = useState<boolean>(false);
  const popoverRef = useRef<PopoverPublicAPI | null>(null);
  const shouldOpen = !popoverActive;

  const handleClose = useCallback(() => {
    setPopoverActive(false);
    onClose?.();

    setActiveOptionId(undefined);
  }, [onClose]);

  const handleOpen = useCallback(() => {
    setPopoverActive(true);
    setActiveOptionId(undefined);
  }, []);

  const onOptionSelected = useCallback(() => {
    if (!allowMultiple) {
      handleClose();
      setActiveOptionId(undefined);
      return;
    }

    popoverRef.current?.forceUpdatePosition();
  }, [allowMultiple, handleClose]);

  const handleFocus = useCallback(() => {
    if (shouldOpen) {
      handleOpen();
    }
  }, [shouldOpen, handleOpen]);

  const handleChange = useCallback(() => {
    if (shouldOpen) {
      handleOpen();
    }
  }, [shouldOpen, handleOpen]);

  const handleBlur = useCallback(() => {
    if (popoverActive) {
      handleClose();
    }
  }, [popoverActive, handleClose]);

  const textFieldContextValue: ComboboxTextFieldType = useMemo(
    () => ({
      activeOptionId,
      expanded: popoverActive,
      listboxId,
      setTextFieldFocused,
      setTextFieldLabelId,
      onTextFieldFocus: handleFocus,
      onTextFieldChange: handleChange,
      onTextFieldBlur: handleBlur,
    }),
    [
      activeOptionId,
      popoverActive,
      listboxId,
      setTextFieldFocused,
      setTextFieldLabelId,
      handleFocus,
      handleChange,
      handleBlur,
    ],
  );

  const listboxOptionContextValue: ComboboxListboxOptionType = useMemo(
    () => ({
      allowMultiple,
    }),
    [allowMultiple],
  );

  const listboxContextValue: ComboboxListboxType = useMemo(
    () => ({
      listboxId,
      textFieldLabelId,
      textFieldFocused,
      willLoadMoreOptions,
      onOptionSelected,
      setActiveOptionId,
      setListboxId,
      onKeyToBottom: onScrolledToBottom,
    }),
    [
      listboxId,
      textFieldLabelId,
      textFieldFocused,
      willLoadMoreOptions,
      onOptionSelected,
      setActiveOptionId,
      setListboxId,
      onScrolledToBottom,
    ],
  );

  return (
    <Popover
      ref={popoverRef}
      active={popoverActive}
      activator={<Activator {...activator} onClick={handleOpen} />}
      autofocusTarget="none"
      preventFocusOnClose
      fullWidth
      preferInputActivator={false}
      preferredPosition="cover"
      onClose={handleClose}
    >
      <Popover.Pane onScrolledToBottom={onScrolledToBottom} height={height}>
        {textField ? (
          <Box paddingBlockStart="200" paddingInline="200">
            <ComboboxTextFieldContext.Provider value={textFieldContextValue}>
              {typeof textField === 'object' ? (
                <TextField
                  {...textField}
                  label="Search"
                  autoComplete="off"
                  type="search"
                />
              ) : (
                textField
              )}
            </ComboboxTextFieldContext.Provider>
          </Box>
        ) : null}

        <ComboboxListboxContext.Provider value={listboxContextValue}>
          <ComboboxListboxOptionContext.Provider
            value={listboxOptionContextValue}
          >
            <Listbox onSelect={onOptionSelected}>
              {options?.map((option) => (
                <Listbox.Option key={option.value} {...option} />
              ))}
            </Listbox>
          </ComboboxListboxOptionContext.Provider>
        </ComboboxListboxContext.Provider>
      </Popover.Pane>
    </Popover>
  );
}

Picker.TextField = TextField;
