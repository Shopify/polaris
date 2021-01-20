import React, {useState, useCallback, useMemo, Children} from 'react';

import {Popover} from '../../../Popover';
import type {PopoverProps} from '../../../Popover';
import type {TextFieldProps} from '../../../TextField';
import type {ListBoxProps} from '../ListBox';
import {
  ComboBoxTextFieldContext,
  ComboBoxTextFieldType,
  ComboBoxListBoxContext,
  ComboBoxListBoxType,
} from '../../../../utilities/combo-box';

import styles from './ComboBox.scss';
import {TextField} from './components';

export interface ComboBoxProps {
  children?: React.ReactElement<ListBoxProps> | null;
  activator: React.ReactElement<TextFieldProps>;
  allowMultiple?: boolean;
  onScrolledToBottom?(): void;
  preferredPosition?: PopoverProps['preferredPosition'];
}

export function ComboBox({
  children,
  activator,
  allowMultiple,
  onScrolledToBottom,
  preferredPosition = 'below',
}: ComboBoxProps) {
  const [popoverActive, setPopoverActive] = useState(false);
  const [activeOptionId, setActiveOptionId] = useState<string>();
  const [textFieldLabelId, setTextFieldLabelId] = useState<string>();
  const [listBoxId, setListBoxId] = useState<string>();
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

  const textFieldContextValue: ComboBoxTextFieldType = useMemo(
    () => ({
      activeOptionId,
      expanded: popoverActive,
      listBoxId,
      setTextFieldFocused,
      setTextFieldLabelId,
      onTextFieldFocus: handleFocus,
      onTextFieldChange: handleChange,
      onTextFieldBlur: handleBlur,
    }),
    [
      activeOptionId,
      popoverActive,
      listBoxId,
      setTextFieldFocused,
      setTextFieldLabelId,
      handleFocus,
      handleChange,
      handleBlur,
    ],
  );

  const listBoxContextValue: ComboBoxListBoxType = useMemo(
    () => ({
      setActiveOptionId,
      setListBoxId,
      listBoxId,
      textFieldLabelId,
      onOptionSelected,
      textFieldFocused,
      onKeyToBottom: onScrolledToBottom,
    }),
    [
      setActiveOptionId,
      setListBoxId,
      listBoxId,
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
        <ComboBoxTextFieldContext.Provider value={textFieldContextValue}>
          {activator}
        </ComboBoxTextFieldContext.Provider>
      }
      preventAutofocus
      preventFocusOnClose
      fullWidth
      preferInputActivator={false}
      preferredPosition={preferredPosition}
    >
      <Popover.Pane onScrolledToBottom={onScrolledToBottom}>
        {Children.count(children) > 0 ? (
          <ComboBoxListBoxContext.Provider value={listBoxContextValue}>
            <div className={styles.ListBox}>{children}</div>
          </ComboBoxListBoxContext.Provider>
        ) : null}
      </Popover.Pane>
    </Popover>
  );
}

ComboBox.TextField = TextField;
