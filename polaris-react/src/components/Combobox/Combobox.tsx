import React, {useState, useCallback, useMemo, Children, useRef} from 'react';

import {Popover} from '../Popover';
import type {PopoverPublicAPI, PopoverProps} from '../Popover';
import type {TextFieldProps} from '../TextField';
import type {ListboxProps} from '../Listbox';
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
import {classNames} from '../../utilities/css';

import styles from './Combobox.module.scss';
import {TextField} from './components';

export interface ComboboxProps {
  /** The text field component to activate the Popover */
  activator: React.ReactElement<TextFieldProps>;
  /** Allows more than one option to be selected */
  allowMultiple?: boolean;
  /** The content to display inside the popover */
  children?: React.ReactElement<ListboxProps> | null;
  /** The preferred direction to open the popover */
  preferredPosition?: PopoverProps['preferredPosition'];
  /** Whether or not more options are available to lazy load when the bottom of the listbox reached. Use the hasMoreResults boolean provided by the GraphQL API of the paginated data. */
  willLoadMoreOptions?: boolean;
  /** Height to set on the Popover Pane. */
  height?: string;
  persistent?: boolean;
  /** Callback fired when the bottom of the lisbox is reached. Use to lazy load when listbox option data is paginated. */
  onScrolledToBottom?(): void;
  /** Callback fired when the popover closes */
  onClose?(): void;
}

export function Combobox({
  activator,
  allowMultiple,
  children,
  preferredPosition = 'below',
  willLoadMoreOptions,
  height,
  persistent,
  onScrolledToBottom,
  onClose,
}: ComboboxProps) {
  const [popoverActive, setPopoverActive] = useState(false);
  const [activeOptionId, setActiveOptionId] = useState<string>();
  const [textFieldLabelId, setTextFieldLabelId] = useState<string>();
  const [listboxId, setListboxId] = useState<string>();
  const [textFieldFocused, setTextFieldFocused] = useState<boolean>(false);
  const shouldOpen = Boolean(!popoverActive && Children.count(children) > 0);
  const ref = useRef<PopoverPublicAPI | null>(null);

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

  const textFieldContextValue: ComboboxTextFieldType = useMemo(
    () => ({
      activeOptionId,
      expanded: popoverActive,
      listboxId,
      focused: persistent,
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
      persistent,
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

  return persistent ? (
    <>
      <Box paddingBlockStart="200" paddingInline="200">
        <ComboboxTextFieldContext.Provider value={textFieldContextValue}>
          {activator}
        </ComboboxTextFieldContext.Provider>
      </Box>

      <ComboboxListboxContext.Provider value={listboxContextValue}>
        <ComboboxListboxOptionContext.Provider
          value={listboxOptionContextValue}
        >
          <div
            className={classNames(
              styles.Listbox,
              allowMultiple && styles.allowMultiple,
            )}
          >
            {children}
          </div>
        </ComboboxListboxOptionContext.Provider>
      </ComboboxListboxContext.Provider>
    </>
  ) : (
    <Popover
      ref={ref}
      active={popoverActive}
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
      onClose={handleClose}
    >
      {Children.count(children) > 0 ? (
        <Popover.Pane onScrolledToBottom={onScrolledToBottom} height={height}>
          <ComboboxListboxContext.Provider value={listboxContextValue}>
            <ComboboxListboxOptionContext.Provider
              value={listboxOptionContextValue}
            >
              <div className={styles.Listbox}>{children}</div>
            </ComboboxListboxOptionContext.Provider>
          </ComboboxListboxContext.Provider>
        </Popover.Pane>
      ) : null}
    </Popover>
  );
}

Combobox.TextField = TextField;
