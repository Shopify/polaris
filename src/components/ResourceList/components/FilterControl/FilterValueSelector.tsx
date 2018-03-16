import * as React from 'react';
import {Select, TextField} from '../../../';
import {withProvider, WithProviderProps} from '../../../Provider';
import {Filter, AppliedFilter, FilterType} from './types';

export interface Props {
  filter: Filter,
  value?: AppliedFilter['value'],
  onChange(filterValue: AppliedFilter['value']): void,
}

export type CombinedProps = Props & WithProviderProps;

class FilterValueSelector extends React.PureComponent<CombinedProps> {
  render() {
    const {filter, value, onChange, polaris: {intl}} = this.props;

    const selectedFilterLabel = filter.operatorText || '';

    switch (filter.type) {
      case FilterType.Select:
        return (
          <Select
            label={selectedFilterLabel}
            options={filter.options}
            placeholder={intl.translate('Polaris.ResourceList.FilterValueSelector.selectFilterValuePlaceholder')}
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
}

export default withProvider()(FilterValueSelector);
