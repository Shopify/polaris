import React, {useCallback, useEffect, useState, useRef, useId} from 'react';
import {XCircleIcon, SearchIcon} from '@shopify/polaris-icons';

import {classNames} from '../../../../utilities/css';
import {useI18n} from '../../../../utilities/i18n';
import {Icon} from '../../../Icon';
import {Text} from '../../../Text';

import styles from './SearchField.module.css';

export interface SearchFieldProps {
  /** Initial value for the input */
  value: string;
  /** Hint text to display */
  placeholder?: string;
  /** Force the focus state on the input */
  focused?: boolean;
  /** Force a state where search is active but the text field component is not focused */
  active?: boolean;
  /** Callback when value is changed */
  onChange(value: string): void;
  /** Callback when input is focused */
  onFocus?(): void;
  /** Callback when focus is removed */
  onBlur?(): void;
  /** Callback when search field cancel button is clicked */
  onCancel?(): void;
  /** Show a border when the search field is focused */
  showFocusBorder?: boolean;
}

export function SearchField({
  value,
  focused,
  active,
  placeholder,
  onChange,
  onFocus,
  onBlur,
  onCancel,
  showFocusBorder,
}: SearchFieldProps) {
  const i18n = useI18n();
  const [forceActive, setForceActive] = useState(false);

  const input = useRef<HTMLInputElement>(null);
  const searchId = useId();

  const handleChange = useCallback(
    ({currentTarget}: React.ChangeEvent<HTMLInputElement>) => {
      onChange(currentTarget.value);
    },
    [onChange],
  );

  const handleFocus = useCallback(() => onFocus && onFocus(), [onFocus]);

  const handleBlur = useCallback(() => onBlur && onBlur(), [onBlur]);

  const handleClear = useCallback(() => {
    onCancel && onCancel();

    if (!input.current) {
      return;
    }

    input.current.value = '';
    onChange('');
    input.current.focus();
  }, [onCancel, onChange]);

  useEffect(() => {
    if (!input.current) {
      return;
    }

    if (focused) {
      input.current.focus();
    } else {
      input.current.blur();
    }
  }, [focused]);

  const clearMarkup = value !== '' && (
    <button
      type="button"
      aria-label={i18n.translate('Polaris.TopBar.SearchField.clearButtonLabel')}
      className={styles.Clear}
      onClick={handleClear}
      onBlur={() => {
        setForceActive(false);
        handleClear();
      }}
      onFocus={() => {
        handleFocus();
        setForceActive(true);
      }}
    >
      <Icon source={XCircleIcon} />
    </button>
  );

  const className = classNames(
    styles.SearchField,
    (focused || active || forceActive) && styles.focused,
  );

  return (
    <div className={className} onFocus={handleFocus} onBlur={handleBlur}>
      <Text as="span" visuallyHidden>
        <label htmlFor={searchId}>
          {i18n.translate('Polaris.TopBar.SearchField.search')}
        </label>
      </Text>
      <input
        id={searchId}
        className={styles.Input}
        placeholder={placeholder}
        type="search"
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        ref={input}
        value={value}
        onChange={handleChange}
        onKeyDown={preventDefault}
      />
      <span className={styles.Icon}>
        <Icon source={SearchIcon} />
      </span>

      {clearMarkup}
      <div
        className={classNames(
          styles.Backdrop,
          showFocusBorder && styles.BackdropShowFocusBorder,
        )}
      />
    </div>
  );
}

function preventDefault(event: React.KeyboardEvent<HTMLInputElement>) {
  if (event.key === 'Enter') {
    event.preventDefault();
  }
}
