import React from 'react';

import {TextField} from '../../../TextField';

import styles from './SearchField.scss';

export interface SearchFieldProps {
  onChange: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onClear?: () => void;
  focused?: boolean;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
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

  function handleFocus() {
    onFocus?.();
  }

  function handleBlur() {
    onBlur?.();
  }

  return (
    <div className={styles.SearchField}>
      <TextField
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        label={placeholder}
        labelHidden
        autoComplete="off"
        focused={focused}
        placeholder={placeholder}
        clearButton
        onClearButtonClick={handleClear}
        disabled={disabled}
        borderless
      />
    </div>
  );
}
