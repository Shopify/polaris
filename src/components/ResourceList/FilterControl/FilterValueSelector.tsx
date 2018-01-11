import * as React from 'react';
import {Select, TextField} from '../../';
import {Filter, AppliedFilter, FilterType} from './types';

export interface Props {
  filter: Filter,
  value?: AppliedFilter['value'],
  onChange?(filterValue: AppliedFilter['value']): void,
}

export default function FilterValueSelector({
  filter,
  value,
  onChange,
}: Props) {
  const selectFilterValuePlaceholder = 'Select a value\u2026';
  const selectedFilterLabel = filter.operatorText || '';

  switch (filter.type) {
    case FilterType.Select:
      return (
        <Select
          label={selectedFilterLabel}
          options={filter.options}
          placeholder={selectFilterValuePlaceholder}
          value={value}
          onChange={onChange}
        />
      );
    case FilterType.TextField:
      return (
        <TextField
          label={selectedFilterLabel}
          value={value}
          onChange={onChange}
        />
      );
    default:
      return null;
  }
}
