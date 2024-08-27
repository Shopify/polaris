import React, {useId, useState} from 'react';
import {SearchIcon, ReturnIcon} from '@shopify/polaris-icons';

import {Icon} from '../../../Icon';
import {TextField} from '../../../TextField';
import {useBreakpoints} from '../../../../utilities/breakpoints';
import {useI18n} from '../../../../utilities/i18n';
import {InlineStack} from '../../../InlineStack';
import {UnstyledButton} from '../../../UnstyledButton';

import styles from './SearchField.module.css';

export interface SearchFieldProps {
  focused?: boolean;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  /** Shows a loading spinner to the right of the input */
  loading?: boolean;
  onChange: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onClear?: () => void;
  onKeyDownEnter?(): void;
}

export function SearchField({
  focused: forceFocus = false,
  value,
  placeholder,
  disabled,
  loading,
  onChange,
  onClear,
  onFocus,
  onBlur,
  onKeyDownEnter,
}: SearchFieldProps) {
  const id = useId();
  const i18n = useI18n();
  const {mdUp} = useBreakpoints();
  const [focused, setFocused] = useState(forceFocus);

  function handleChange(eventValue: string) {
    onChange(eventValue ?? value);
  }

  function handleClear() {
    if (onClear) {
      onClear();
    } else {
      onChange('');
    }
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Enter') onKeyDownEnter?.();
  }

  function handleClick() {
    onKeyDownEnter?.();
  }

  function handleFocus() {
    onFocus?.();
    setFocused(true);
  }

  function handleBlur() {
    onBlur?.();
    setFocused(false);
  }

  const addAsFilterText =
    value && focused ? (
      <UnstyledButton
        onClick={handleClick}
        className={styles.AddAsFilterAction}
        accessibilityLabel={i18n.translate(
          'Polaris.IndexFilters.SearchField.action.accessibilityLabel',
        )}
      >
        <InlineStack gap="100" blockAlign="center" align="end">
          {i18n.translate(
            'Polaris.IndexFilters.SearchField.action.addAsFilter',
          )}
          <Icon source={ReturnIcon} tone="inherit" />
        </InlineStack>
      </UnstyledButton>
    ) : undefined;

  return (
    <div
      onKeyDown={handleKeyDown}
      style={{width: '100%', minWidth: mdUp ? '22.5rem' : 'none'}}
    >
      <TextField
        id={id}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onClearButtonClick={handleClear}
        autoComplete="off"
        placeholder={placeholder}
        disabled={disabled}
        variant="borderless"
        size="slim"
        prefix={mdUp ? <Icon source={SearchIcon} /> : undefined}
        focused={focused}
        label={
          placeholder ??
          i18n.translate('Polaris.IndexFilters.SearchField.defaultPlaceholder')
        }
        labelHidden
        clearButton
        loading={loading}
        suffix={addAsFilterText}
      />
    </div>
  );
}
