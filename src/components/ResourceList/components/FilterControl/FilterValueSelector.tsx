import * as React from 'react';
import {Select, TextField} from '../../..';
import {withAppProvider, WithAppProviderProps} from '../../../AppProvider';
import DateSelector from './DateSelector';
import {Filter, AppliedFilter, FilterType} from './types';

export interface Props {
  filter: Filter;
  filterKey?: string;
  value?: AppliedFilter['value'];
  onChange(filterValue: AppliedFilter['value']): void;
  onFilterKeyChange(filterKey: string): void;
}

export type CombinedProps = Props & WithAppProviderProps;

export class FilterValueSelector extends React.PureComponent<CombinedProps> {
  render() {
    const {
      filter,
      filterKey,
      value,
      onChange,
      onFilterKeyChange,
      polaris: {intl},
    } = this.props;

    const selectedFilterLabel = filter.operatorText || '';

    switch (filter.type) {
      case FilterType.Select:
        return (
          <Select
            label={selectedFilterLabel}
            options={filter.options}
            placeholder={intl.translate(
              'Polaris.ResourceList.FilterValueSelector.selectFilterValuePlaceholder',
            )}
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
      case FilterType.DateSelector:
        return (
          <DateSelector
            dateOptionType={filter.dateOptionType}
            filterValue={value}
            filterKey={filterKey}
            filterMinKey={filter.minKey}
            filterMaxKey={filter.maxKey}
            onFilterValueChange={onChange}
            onFilterKeyChange={onFilterKeyChange}
          />
        );
      default:
        return null;
    }
  }
}

export default withAppProvider<Props>()(FilterValueSelector);
