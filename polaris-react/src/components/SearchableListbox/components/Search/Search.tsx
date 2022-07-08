import React from 'react';
import {SearchMinor} from '@shopify/polaris-icons';

import {TextField} from '../../../TextField';
import {Icon} from '../../../Icon';

interface Props {
  value: string;
  label: string;
  placeholder?: string;
  listId: string;
  activeOptionDomId?: string;
  onSearch: (search: string) => void;
}

export function Search({
  value,
  label,
  placeholder,
  listId,
  activeOptionDomId,
  onSearch,
}: Props) {
  return (
    <TextField
      labelHidden
      clearButton
      autoComplete="off"
      label={label}
      value={value}
      placeholder={placeholder}
      ariaActiveDescendant={activeOptionDomId}
      ariaControls={listId}
      ariaOwns={listId}
      onChange={onSearch}
      onClearButtonClick={() => onSearch('')}
      prefix={<Icon source={SearchMinor} />}
    />
  );
}
