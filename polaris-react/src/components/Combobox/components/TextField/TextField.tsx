import React, {useMemo, useId, useCallback, useEffect, useRef} from 'react';

import {Label, labelID} from '../../../Label';
import {TextField as PolarisTextField} from '../../../TextField';
import type {TextFieldProps} from '../../../TextField';
import {useComboboxTextField} from '../../../../utilities/combobox';

export function TextField({
  value,
  id: idProp,
  type = 'text',
  ariaAutocomplete = 'list',
  inline,
  onFocus,
  onBlur,
  onChange,
  ...rest
}: TextFieldProps & {inline?: boolean}) {
  const comboboxTextFieldContext = useComboboxTextField();

  const {
    activeOptionId,
    listboxId,
    expanded,
    setTextFieldFocused,
    setTextFieldLabelId,
    onTextFieldFocus,
    onTextFieldChange,
    onTextFieldBlur,
  } = comboboxTextFieldContext;
  const uniqueId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
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

  inputRef.current?.focus();

  return inline ? (
    <>
      <Label id={textFieldId} hidden>
        {rest.label}
      </Label>
      <input
        value={value}
        ref={inputRef}
        autoComplete={rest.autoComplete}
        placeholder={rest.placeholder}
        id={textFieldId}
        type={type}
        aria-haspopup="listbox"
        aria-activedescendant={activeOptionId}
        aria-controls={listboxId}
        role="combobox"
        aria-expanded={expanded}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={(event) => handleChange(event.target.value, textFieldId)}
        style={{
          border: 'none',
          outline: 'none',
        }}
      />
    </>
  ) : (
    <PolarisTextField
      {...rest}
      value={value}
      id={textFieldId}
      type={type}
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
