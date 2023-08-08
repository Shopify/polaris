import React, {useEffect, useRef, useId} from 'react';
import {CircleCancelMinor} from '@shopify/polaris-icons';

import {Text} from '../../../Text';
import {classNames} from '../../../../utilities/css';
import {useFeatures} from '../../../../utilities/features';
import {Icon} from '../../../Icon';
import {useI18n} from '../../../../utilities/i18n';
import {UnstyledButton} from '../../../UnstyledButton';
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
  const i18n = useI18n();
  const id = useId();
  const {polarisSummerEditions2023} = useFeatures();
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

  return polarisSummerEditions2023 ? (
    <div className={styles.SearchField}>
      <label className={styles.Label} htmlFor={id}>
        {placeholder}
      </label>
      <input
        id={id}
        ref={inputRef}
        className={classNames(
          styles.Input,
          focused && styles.focused,
          borderlessQueryField && styles.borderless,
        )}
        value={value}
        onChange={(event) => handleChange(event?.currentTarget.value ?? value)}
        onFocus={onFocus}
        onBlur={onBlur}
        autoComplete="off"
        placeholder={placeholder}
        disabled={disabled}
      />
      {value !== '' && (
        <UnstyledButton
          className={classNames(
            styles.ClearButton,
            focused && styles['ClearButton-focused'],
          )}
          onClick={() => handleClear()}
          disabled={disabled}
        >
          <Text as="span" visuallyHidden>
            {i18n.translate('Polaris.Common.clear')}
          </Text>
          <Icon source={CircleCancelMinor} color="subdued" />
        </UnstyledButton>
      )}
    </div>
  ) : (
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
