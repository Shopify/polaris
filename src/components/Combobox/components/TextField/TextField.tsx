import React, {useMemo, useCallback, useEffect, useState} from 'react';

import {labelID} from '../../../Label';
import {useUniqueId} from '../../../../utilities/unique-id';
import {TextField as PolarisTextField} from '../../../TextField';
import type {TextFieldProps} from '../../../TextField';
import {useComboboxTextField} from '../../../../utilities/combobox';

export function TextField({
  value,
  id: idProp,
  ariaAutocomplete = 'list',
  onFocus,
  onBlur,
  onChange,
  ...rest
}: TextFieldProps) {
  const [inlineAutocomplete, setInlineAutocomplete] = useState('');
  const [selection, setSelection] = useState<TextFieldProps['selection']>();

  const comboboxTextFieldContext = useComboboxTextField();

  const {
    activeOptionValue,
    activeOptionId,
    listboxId,
    expanded,
    setTextFieldFocused,
    setTextFieldLabelId,
    onTextFieldFocus,
    onTextFieldChange,
    onTextFieldBlur,
  } = comboboxTextFieldContext;

  const uniqueId = useUniqueId('ComboboxTextField');
  const textFieldId = useMemo(() => idProp || uniqueId, [uniqueId, idProp]);

  const labelId = useMemo(
    () => labelID(idProp || uniqueId),
    [uniqueId, idProp],
  );

  useEffect(() => {
    if (setTextFieldLabelId) setTextFieldLabelId(labelId);
  }, [labelId, setTextFieldLabelId]);

  useEffect(() => {
    if (
      ariaAutocomplete === 'both' &&
      value !== undefined &&
      activeOptionValue !== undefined &&
      activeOptionValue.startsWith(value)
    ) {
      const nextInlineAutocomplete = activeOptionValue;
      const start = value.length;
      const end = activeOptionValue.length;
      const selection: TextFieldProps['selection'] = {
        start,
        end,
        direction: 'backward',
      };

      setInlineAutocomplete(`${value}${nextInlineAutocomplete}`);
      setSelection(selection);
    }
  }, [
    value,
    ariaAutocomplete,
    activeOptionValue,
    setInlineAutocomplete,
    setSelection,
  ]);

  const handleFocus = useCallback(() => {
    if (onFocus) onFocus();
    if (onTextFieldFocus) onTextFieldFocus();
    if (setTextFieldFocused) setTextFieldFocused(true);
  }, [onFocus, onTextFieldFocus, setTextFieldFocused]);

  const handleBlur = useCallback(() => {
    if (onBlur) onBlur();
    if (onTextFieldBlur) onTextFieldBlur();
    if (setTextFieldFocused) setTextFieldFocused(false);
  }, [onBlur, onTextFieldBlur, setTextFieldFocused]);

  const handleChange = useCallback(
    (value: string, id: string) => {
      if (onChange) onChange(value, id);
      if (onTextFieldChange) onTextFieldChange(value);
    },
    [onChange, onTextFieldChange],
  );

  const inputValue = inlineAutocomplete ? inlineAutocomplete : value;

  return (
    <PolarisTextField
      {...rest}
      value={inputValue}
      id={textFieldId}
      selection={selection}
      ariaAutocomplete={ariaAutocomplete}
      aria-haspopup="listbox"
      ariaActiveDescendant={activeOptionId}
      ariaControls={listboxId}
      role="combobox"
      ariaExpanded={expanded}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={handleChange}
    />
  );
}
