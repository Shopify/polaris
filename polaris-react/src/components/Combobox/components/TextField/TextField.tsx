import {useMemo, useId, useCallback, useEffect} from 'react';

import {labelID} from '../../../Label';
import {TextField as PolarisTextField} from '../../../TextField';
import type {TextFieldProps} from '../../../TextField';
import {useComboboxTextField} from '../../../../utilities/combobox';

export function TextField({
  value,
  id: idProp,
  type = 'text',
  ariaAutocomplete = 'list',
  onFocus,
  onBlur,
  onChange,
  ...rest
}: TextFieldProps) {
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
