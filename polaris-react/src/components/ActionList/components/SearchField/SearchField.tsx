import {CircleCancelMinor, SearchMinor} from '@shopify/polaris-icons';
import React, {useCallback, useId, useRef} from 'react';

import {useI18n} from '../../../../utilities/i18n';
import {Icon} from '../../../Icon';
import {Text} from '../../../Text';

import styles from './SearchField.scss';

export interface SearchFieldProps {
  /** Initial value for the input */
  value: string;
  /** Hint text to display */
  placeholder?: string;
  /** Callback when value is changed */
  onChange(value: string): void;
}

export function SearchField({value, placeholder, onChange}: SearchFieldProps) {
  const i18n = useI18n();

  const input = useRef<HTMLInputElement | null>(null);
  const searchId = useId();

  const handleChange = useCallback(
    ({currentTarget}: React.ChangeEvent<HTMLInputElement>) => {
      onChange(currentTarget.value);
    },
    [onChange],
  );

  const handleClear = useCallback(() => {
    if (!input.current) {
      return;
    }

    input.current.value = '';
    onChange('');
    input.current.focus();
  }, [onChange]);

  const clearMarkup = value !== '' && (
    <button
      type="button"
      aria-label={i18n.translate(
        'Polaris.ActionList.SearchField.clearButtonLabel',
      )}
      className={styles.Clear}
      onClick={handleClear}
      onBlur={() => {
        handleClear();
      }}
    >
      <Icon source={CircleCancelMinor} />
    </button>
  );

  const handleRef = (ref: HTMLInputElement) => {
    input.current = ref;

    // It won't focus if it's on the same tick as when it renders
    setTimeout(() => {
      ref?.focus();
    });
  };

  return (
    <div className={styles.SearchField}>
      <Text as="span" visuallyHidden>
        <label htmlFor={searchId}>
          {i18n.translate('Polaris.ActionList.SearchField.search')}
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
        ref={handleRef}
        value={value}
        onChange={handleChange}
        onKeyDown={preventDefault}
      />
      <span className={styles.Icon}>
        <Icon source={SearchMinor} />
      </span>

      {clearMarkup}
      <div className={styles.Backdrop} />
    </div>
  );
}

function preventDefault(event: React.KeyboardEvent<HTMLInputElement>) {
  if (event.key === 'Enter') {
    event.preventDefault();
  }
}
