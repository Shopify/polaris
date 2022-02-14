import React, {useState, useCallback, useMemo, Children, useRef} from 'react';

import {Popover, PopoverPublicAPI} from '../Popover';
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
  preferredPosition?: PopoverProps['preferredPosition'];
  onScrolledToBottom?(): void;
}

export function Combobox({
  children,
  activator,
  allowMultiple,
  preferredPosition = 'below',
  onScrolledToBottom,
}: ComboboxProps) {
  const [popoverActive, setPopoverActive] = useState(false);
  const [activeOptionId, setActiveOptionId] = useState<string>();
  const [activeOptionValue, setActiveOptionValue] = useState<string>();
  const [textFieldLabelId, setTextFieldLabelId] = useState<string>();
  const [listboxId, setListboxId] = useState<string>();
  const [textFieldFocused, setTextFieldFocused] = useState<boolean>(false);
  const shouldOpen = Boolean(!popoverActive && Children.count(children) > 0);
  const ref = useRef<PopoverPublicAPI | null>(null);

  const handleClose = useCallback(() => {
    setPopoverActive(false);
    setActiveOptionId(undefined);
  }, []);

  const handleOpen = useCallback(() => {
    setPopoverActive(true);
    setActiveOptionId(undefined);
  }, []);

  const onOptionSelected = useCallback(() => {
    if (!allowMultiple) {
      handleClose();
      return;
    } else {
      setActiveOptionId(undefined);
    }
    ref.current?.forceUpdatePosition();
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

  const handleNavigateList = useCallback(
    (activeOptionValue: string) => {
      setActiveOptionValue(activeOptionValue);
    },
    [setActiveOptionValue],
  );

  const textFieldContextValue: ComboboxTextFieldType = useMemo(
    () => ({
      activeOptionValue,
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
      activeOptionValue,
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
      setActiveOptionId,
      setListboxId,
      onOptionSelected,
      onActiveOptionChange: handleNavigateList,
      onKeyToBottom: onScrolledToBottom,
    }),
    [
      listboxId,
      textFieldLabelId,
      textFieldFocused,
      setActiveOptionId,
      setListboxId,
      onOptionSelected,
      onScrolledToBottom,
      handleNavigateList,
    ],
  );

  return (
    <Popover
      ref={ref}
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
