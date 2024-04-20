import React, {useId} from 'react';
import {SearchIcon} from '@shopify/polaris-icons';

import {Icon} from '../../../Icon';
import {TextField} from '../../../TextField';
import {Text} from '../../../Text';
import {useBreakpoints} from '../../../../utilities/breakpoints';
import {useI18n} from '../../../../utilities/i18n';

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
  /** @deprecated If present, will show as a suffix in the text field when entering a search term */
  selectedViewName?: string;
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
  selectedViewName,
}: SearchFieldProps) {
  const i18n = useI18n();
  const id = useId();
  const {mdUp} = useBreakpoints();

  const suffix =
    value && selectedViewName && mdUp ? (
      <Text as="span" variant="bodyMd" tone="subdued">
        {i18n.translate('Polaris.Filters.searchInView', {
          viewName: selectedViewName,
        })}
      </Text>
    ) : null;

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

  return (
    <TextField
      id={id}
      value={value}
      onChange={handleChange}
      onFocus={onFocus}
      onBlur={onBlur}
      onClearButtonClick={handleClear}
      autoComplete="off"
      placeholder={placeholder}
      disabled={disabled}
      variant={borderlessQueryField ? 'borderless' : 'inherit'}
      size="slim"
      prefix={mdUp ? <Icon source={SearchIcon} /> : undefined}
      suffix={suffix}
      focused={focused}
      label={placeholder}
      labelHidden
      clearButton
      autoSize={Boolean(suffix)}
      loading={loading}
    />
  );
}
