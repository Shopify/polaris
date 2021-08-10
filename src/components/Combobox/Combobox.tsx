import React, {useState, useCallback, useMemo, Children} from 'react';

import {Popover} from '../Popover';
import type {PopoverProps} from '../Popover';
import type {TextFieldProps} from '../TextField';
import type {ListboxProps} from '../Listbox';
import {
  ComboboxTextFieldContext,
  ComboboxTextFieldType,
  ComboboxListboxContext,
  ComboboxListboxType,
  ComboboxListboxOptionType,
  ComboboxListboxOptionContext,
} from '../../utilities/combobox';

import styles from './Combobox.scss';
import {TextField} from './components';

export interface ComboboxProps {
  children?: React.ReactElement<ListboxProps> | null;
  activator: React.ReactElement<TextFieldProps>;
  allowMultiple?: boolean;
  onScrolledToBottom?(): void;
  preferredPosition?: PopoverProps['preferredPosition'];
}

export function Combobox({
  children,
  activator,
  allowMultiple,
  onScrolledToBottom,
  preferredPosition = 'below',
}: ComboboxProps) {
  const [popoverActive, setPopoverActive] = useState(false);
  const [activeOptionId, setActiveOptionId] = useState<string>();
  const [textFieldLabelId, setTextFieldLabelId] = useState<string>();
  const [listboxId, setListboxId] = useState<string>();
  const [textFieldFocused, setTextFieldFocused] = useState<boolean>(false);
  const shouldOpen = Boolean(!popoverActive && Children.count(children) > 0);

  const onOptionSelected = useCallback(() => {
    if (!allowMultiple) {
      setPopoverActive(false);
      setActiveOptionId(undefined);
    }
  }, [allowMultiple]);

  const handleClose = useCallback(() => {
    setPopoverActive(false);
    setActiveOptionId(undefined);
  }, []);

  const handleFocus = useCallback(() => {
    if (shouldOpen) {
      setPopoverActive(true);
    }
  }, [shouldOpen]);

  const handleChange = useCallback(() => {
    if (shouldOpen) {
      setPopoverActive(true);
    }
  }, [shouldOpen]);

  const handleBlur = useCallback(() => {
    if (popoverActive) {
      setPopoverActive(false);
      setActiveOptionId(undefined);
    }
  }, [popoverActive]);

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
      setActiveOptionId,
      setListboxId,
      listboxId,
      textFieldLabelId,
      onOptionSelected,
      textFieldFocused,
      onKeyToBottom: onScrolledToBottom,
    }),
    [
      setActiveOptionId,
      setListboxId,
      listboxId,
      textFieldLabelId,
      onOptionSelected,
      textFieldFocused,
      onScrolledToBottom,
    ],
  );

  return (
    <Popover
      active={popoverActive}
      onClose={handleClose}
      activator={
        <ComboboxTextFieldContext.Provider value={textFieldContextValue}>
          {activator}
        </ComboboxTextFieldContext.Provider>
      }
      autofocusTarget="none"
      preventFocusOnClose
      fullWidth
      preferInputActivator={false}
      preferredPosition={preferredPosition}
    >
      <Popover.Pane onScrolledToBottom={onScrolledToBottom}>
        {Children.count(children) > 0 ? (
          <ComboboxListboxContext.Provider value={listboxContextValue}>
            <ComboboxListboxOptionContext.Provider
              value={listboxOptionContextValue}
            >
              <div className={styles.Listbox}>{children}</div>
            </ComboboxListboxOptionContext.Provider>
          </ComboboxListboxContext.Provider>
        ) : null}
      </Popover.Pane>
    </Popover>
  );
}

Combobox.TextField = TextField;
