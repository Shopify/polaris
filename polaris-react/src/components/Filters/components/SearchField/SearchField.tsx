import React, {useId} from 'react';
import {SearchMinor} from '@shopify/polaris-icons';

import {Spinner} from '../../../Spinner';
import {Icon} from '../../../Icon';
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
  borderlessQueryField?: boolean;
  /** Prefix SearchMinor icon on query field. */
  showQueryIcon?: boolean;
  /** Show a loading spinner to the right of the TextField */
  loading?: boolean;
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
  showQueryIcon,
  loading,
}: SearchFieldProps) {
  const id = useId();
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
      id={id}
      value={value}
      onChange={(event) => handleChange(event ?? value)}
      onFocus={onFocus}
      onBlur={onBlur}
      onClearButtonClick={handleClear}
      autoComplete="off"
      placeholder={placeholder}
      disabled={disabled}
      variant={borderlessQueryField ? 'borderlessSlim' : 'slim'}
      prefix={showQueryIcon ? <Icon source={SearchMinor} /> : undefined}
      suffix={
        loading ? (
          <div className={styles.Spinner}>
            <Spinner size="small" />
          </div>
        ) : null
      }
      focused={focused}
      label=""
      labelHidden
      clearButton
    />
  );
}
