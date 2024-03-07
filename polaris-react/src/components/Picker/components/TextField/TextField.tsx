import React, {useMemo, useId, useCallback, useEffect} from 'react';

import {Label, labelID} from '../../../Label';
import type {TextFieldProps} from '../../../TextField';
import {useComboboxTextField} from '../../../../utilities/combobox';

export function TextField({
  value,
  id: idProp,
  type = 'text',
  onFocus,
  onBlur,
  onChange,
  label,
  labelHidden,
}: TextFieldProps) {
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

  return (
    <>
      <Label id={textFieldId} hidden={labelHidden}>
        {label}
      </Label>
      <input
        value={value}
        id={textFieldId}
        type={type}
        aria-activedescendant={activeOptionId}
        role="combobox"
        aria-haspopup="listbox"
        aria-autocomplete="list"
        aria-expanded="true"
        aria-controls={listboxId}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={({target}) => handleChange(target.value, textFieldId)}
      />
    </>
  );
}
