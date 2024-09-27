import React, {useId, useState} from 'react';
import {SearchIcon} from '@shopify/polaris-icons';

import {Bleed} from '../../../Bleed';
import {Box} from '../../../Box';
import {Icon} from '../../../Icon';
import {TextField} from '../../../TextField';
import {useBreakpoints} from '../../../../utilities/breakpoints';
import {useI18n} from '../../../../utilities/i18n';

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

  function handleFocus() {
    onFocus?.();
    setFocused(true);
  }

  function handleBlur() {
    onBlur?.();
    setFocused(false);
  }

  return (
    <Box width="300px">
      <TextField
        id={id}
        autoFocus
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
        prefix={
          mdUp ? (
            <Bleed marginInlineStart="200">
              <Icon source={SearchIcon} />
            </Bleed>
          ) : undefined
        }
        focused={focused}
        label={
          placeholder ??
          i18n.translate('Polaris.IndexFilters.SearchField.defaultPlaceholder')
        }
        labelHidden
        clearButton
        loading={loading}
      />
    </Box>
  );
}
