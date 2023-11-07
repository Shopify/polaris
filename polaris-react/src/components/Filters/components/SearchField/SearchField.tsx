import React, {useEffect, useRef, useId} from 'react';
import {CircleCancelMinor} from '@shopify/polaris-icons';

import {InlineStack} from '../../../InlineStack';
import {Spinner} from '../../../Spinner';
import {Text} from '../../../Text';
import {classNames} from '../../../../utilities/css';
import {Icon} from '../../../Icon';
import {useI18n} from '../../../../utilities/i18n';
import {UnstyledButton} from '../../../UnstyledButton';
import {BlockStack} from '../../../BlockStack';
import {TextField} from '../../../TextField';
import {Box} from '../../../Box';

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
  /** Show a loading spinner to the right of the input */
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
  loading,
}: SearchFieldProps) {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  function handleChange(value: string) {
    onChange(value);
  }

  useEffect(() => {
    if (focused) inputRef.current?.focus();
  }, [focused]);

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
      labelHidden
      label={placeholder}
      focused={focused}
      variant={borderlessQueryField ? 'borderless' : undefined}
      value={value}
      onChange={handleChange}
      onFocus={onFocus}
      onBlur={onBlur}
      autoComplete="off"
      placeholder={placeholder}
      disabled={disabled}
      suffix={
        loading ? (
          <InlineStack align="center">
            <Spinner size="small" />
          </InlineStack>
        ) : undefined
      }
      onClearButtonClick={handleClear}
    />
  );
}
