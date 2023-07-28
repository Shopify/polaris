import React from 'react';

import {TextField} from '../../../TextField';

export interface SearchFieldProps {
  onChange: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onClear?: () => void;
  focused?: boolean;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  borderlessQueryField?: boolean;
}

export function SearchField({
  onChange,
  onClear,
  onFocus,
  onBlur,
  focused,
  value,
  placeholder,
  disabled,
  borderlessQueryField,
}: SearchFieldProps) {
  function handleChange(value: string) {
    onChange(value);
  }

  function handleClear() {
    if (onClear) {
      onClear();
    } else {
      onChange('');
    }
  }

  return (
    <TextField
      value={value}
      onChange={handleChange}
      onFocus={onFocus}
      onBlur={onBlur}
      label={placeholder}
      labelHidden
      autoComplete="off"
      focused={focused}
      placeholder={placeholder}
      clearButton
      onClearButtonClick={handleClear}
      disabled={disabled}
      borderless={borderlessQueryField}
    />
  );
}
