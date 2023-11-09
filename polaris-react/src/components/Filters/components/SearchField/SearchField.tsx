import React, {useEffect, useState, useRef, useId} from 'react';
import {CircleCancelMinor} from '@shopify/polaris-icons';

import {InlineStack} from '../../../InlineStack';
import {Spinner} from '../../../Spinner';
import {Text} from '../../../Text';
import {classNames} from '../../../../utilities/css';
import {Icon} from '../../../Icon';
import {useI18n} from '../../../../utilities/i18n';
import {UnstyledButton} from '../../../UnstyledButton';

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
  const i18n = useI18n();
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  const [focusVisible, setFocusVisible] = useState(false);

  const handleFocus = () => {
    onFocus?.();
    setFocusVisible(true);
  };

  const handleBlur = () => {
    onBlur?.();
    setFocusVisible(false);
  };

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const nextValue = event.currentTarget.value;
    onChange(nextValue);
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

  const loadingMarkup = loading ? (
    <div className={styles.Spinner}>
      <Spinner size="small" />
    </div>
  ) : null;

  const clearButtonMarkup = (
    <UnstyledButton
      className={classNames(
        styles.ClearButton,
        (focused || focusVisible) && value !== '' && styles.visible,
      )}
      onClick={handleClear}
      disabled={disabled}
    >
      <Text as="span" visuallyHidden>
        {i18n.translate('Polaris.Common.clear')}
      </Text>
      <Icon source={CircleCancelMinor} tone="subdued" />
    </UnstyledButton>
  );

  const suffixMarkup =
    loadingMarkup || clearButtonMarkup ? (
      <div className={styles.Suffix}>
        {clearButtonMarkup}
        {loadingMarkup}
      </div>
    ) : null;

  return (
    <div
      className={classNames(
        styles.SearchField,
        (focused || focusVisible) && !disabled && styles.focusVisible,
        borderlessQueryField && styles.borderless,
        disabled && styles.disabled,
      )}
    >
      <label className={styles.Label} htmlFor={id}>
        {placeholder}
      </label>
      <input
        id={id}
        ref={inputRef}
        className={classNames(styles.Input)}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        autoComplete="off"
        placeholder={placeholder}
        disabled={disabled}
      />
      {suffixMarkup}
    </div>
  );
}
