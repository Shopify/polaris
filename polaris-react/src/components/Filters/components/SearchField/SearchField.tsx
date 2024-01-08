import React, {useId, useMemo} from 'react';
import {SearchIcon} from '@shopify/polaris-icons';

import {Spinner} from '../../../Spinner';
import {Icon} from '../../../Icon';
import {TextField} from '../../../TextField';
import {Text} from '../../../Text';
import {InlineStack} from '../../../InlineStack';
import {useBreakpoints} from '../../../../utilities/breakpoints';
import {useI18n} from '../../../../utilities/i18n';

import styles from './SearchField.module.scss';

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
  /** If present, will show as a suffix in the text field when entering a search term */
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

  const suffix = useMemo(() => {
    const spinnerMarkup = loading ? (
      <div className={styles.Spinner}>
        <Spinner size="small" />
      </div>
    ) : null;
    const viewNameMarkup =
      value && selectedViewName ? (
        <Text as="span" variant="bodyMd" tone="subdued">
          {i18n.translate('Polaris.Filters.searchInView', {
            viewName: selectedViewName,
          })}
        </Text>
      ) : null;

    return (
      <InlineStack gap="200">
        {viewNameMarkup}
        {spinnerMarkup}
      </InlineStack>
    );
  }, [loading, value, selectedViewName, i18n]);

  console.log({value, suffix, selectedViewName, loading});

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
      onChange={(eventValue) => handleChange(eventValue ?? value)}
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
    />
  );
}
