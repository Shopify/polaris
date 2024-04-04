import React, {useMemo, useId, useCallback, useEffect} from 'react';

import {Label, labelID} from '../../../Label';
import type {TextFieldProps} from '../../../TextField';
import {useComboboxTextField} from '../../../../utilities/combobox';
import {InlineStack} from '../../../InlineStack';
import {Text} from '../../../Text';

import styles from './SearchField.module.css';

export type SearchFieldProps = Omit<TextFieldProps, 'autoComplete'>;

export function SearchField({
  value,
  id: idProp,
  type = 'text',
  onFocus,
  onBlur,
  onChange,
  label,
  prefix,
  placeholder,
  focused,
}: SearchFieldProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const comboboxTextFieldContext = useComboboxTextField();

  const {
    activeOptionId,
    listboxId,
    setTextFieldFocused,
    setTextFieldLabelId,
    onTextFieldFocus,
    onTextFieldChange,
    onTextFieldBlur,
  } = comboboxTextFieldContext;

  const uniqueId = useId();
  const textFieldId = useMemo(() => idProp || uniqueId, [uniqueId, idProp]);

  const labelId = useMemo(
    () => labelID(idProp || uniqueId),
    [uniqueId, idProp],
  );

  useEffect(() => {
    if (setTextFieldLabelId) setTextFieldLabelId(labelId);
  }, [labelId, setTextFieldLabelId]);

  const handleFocus = useCallback(
    (event: React.FocusEvent) => {
      if (onFocus) onFocus(event);
      if (onTextFieldFocus) onTextFieldFocus();
      if (setTextFieldFocused) setTextFieldFocused(true);
    },
    [onFocus, onTextFieldFocus, setTextFieldFocused],
  );

  const handleBlur = useCallback(
    (event: React.FocusEvent) => {
      if (onBlur) onBlur(event);
      if (onTextFieldBlur) onTextFieldBlur();
      if (setTextFieldFocused) setTextFieldFocused(false);
    },
    [onBlur, onTextFieldBlur, setTextFieldFocused],
  );

  const handleChange = useCallback(
    (value: string, id: string) => {
      if (onChange) onChange(value, id);
      if (onTextFieldChange) onTextFieldChange(value);
    },
    [onChange, onTextFieldChange],
  );

  if (focused && document.activeElement !== inputRef.current) {
    inputRef.current?.focus();
  }

  return (
    <InlineStack gap="100" blockAlign="center">
      <Label id={textFieldId}>
        <Text as="span" visuallyHidden>
          {label}
        </Text>
        <span>{prefix}</span>
      </Label>
      <input
        ref={inputRef}
        id={textFieldId}
        className={styles.SearchField}
        value={value}
        type={type}
        role="combobox"
        placeholder={placeholder}
        autoComplete="off"
        aria-activedescendant={activeOptionId}
        aria-haspopup="listbox"
        aria-autocomplete="list"
        aria-expanded="true"
        aria-controls={listboxId}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={({target}) => handleChange(target.value, textFieldId)}
      />
    </InlineStack>
  );
}
