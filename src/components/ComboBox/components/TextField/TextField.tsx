import React, {useMemo, useCallback, useEffect} from 'react';

import {labelID} from '../../../Label';
import {useUniqueId} from '../../../../utilities/unique-id';
import {TextField as PolarisTextField} from '../../../TextField';
import type {TextFieldProps} from '../../../TextField';
import {useComboBoxTextField} from '../../../../utilities/combo-box';

export function TextField({
  value,
  id: idProp,
  onFocus,
  onBlur,
  onChange,
  ...rest
}: TextFieldProps) {
  const comboboxTextFieldContext = useComboBoxTextField();

  const {
    activeOptionId,
    listBoxId,
    expanded,
    setTextFieldFocused,
    setTextFieldLabelId,
    onTextFieldFocus,
    onTextFieldChange,
    onTextFieldBlur,
  } = comboboxTextFieldContext;

  const uniqueId = useUniqueId('ComboBoxTextField');
  const textFieldId = useMemo(() => idProp || uniqueId, [uniqueId, idProp]);

  const labelId = useMemo(() => labelID(idProp || uniqueId), [
    uniqueId,
    idProp,
  ]);

  useEffect(() => {
    if (setTextFieldLabelId) setTextFieldLabelId(labelId);
  }, [labelId, setTextFieldLabelId]);

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
      if (onTextFieldChange) onTextFieldChange();
    },
    [onChange, onTextFieldChange],
  );

  return (
    <PolarisTextField
      autoComplete={false}
      {...rest}
      value={value}
      id={textFieldId}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={handleChange}
      ariaAutocomplete="list"
      aria-haspopup="listbox"
      ariaActiveDescendant={activeOptionId}
      ariaControls={listBoxId}
      role="combobox"
      ariaExpanded={expanded}
    />
  );
}
