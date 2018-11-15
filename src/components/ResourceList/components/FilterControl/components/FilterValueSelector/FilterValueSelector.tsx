import * as React from 'react';
import {autobind} from '@shopify/javascript-utilities/decorators';
import {withAppProvider, WithAppProviderProps} from 'components/AppProvider';
import Select from 'components/Select';
import Stack from 'components/Stack';
import TextField from 'components/TextField';
import DateSelector from '../DateSelector';
import {Filter, AppliedFilter, FilterType, Operator} from '../../types';

export interface Props {
  filter: Filter;
  filterKey?: string;
  value?: AppliedFilter['value'];
  onChange(filterValue: AppliedFilter['value']): void;
  onFilterKeyChange(filterKey: string): void;
}

export type CombinedProps = Props & WithAppProviderProps;

export class FilterValueSelector extends React.PureComponent<CombinedProps> {
  componentDidMount() {
    const {
      filter: {operatorText, type},
    } = this.props;

    if (
      type === FilterType.DateSelector ||
      !operatorText ||
      typeof operatorText === 'string' ||
      operatorText.length === 0
    ) {
      return;
    }

    this.handleOperatorOptionChange(operatorText[0].key);
  }

  render() {
    const {
      filter,
      filterKey,
      value,
      onChange,
      onFilterKeyChange,
      polaris: {intl},
    } = this.props;

    const {operatorText} = filter;

    const showOperatorOptions =
      filter.type !== FilterType.DateSelector &&
      operatorText &&
      typeof operatorText !== 'string';
    const operatorOptionsMarkup = showOperatorOptions ? (
      <Select
        label={filter.label}
        labelHidden
        options={buildOperatorOptions(operatorText)}
        value={filterKey}
        onChange={this.handleOperatorOptionChange}
      />
    ) : null;

    const selectedFilterLabel =
      typeof operatorText === 'string' ? operatorText : '';

    switch (filter.type) {
      case FilterType.Select:
        return (
          <Stack vertical>
            {operatorOptionsMarkup}
            <Select
              label={selectedFilterLabel}
              options={filter.options}
              placeholder={intl.translate(
                'Polaris.ResourceList.FilterValueSelector.selectFilterValuePlaceholder',
              )}
              value={value}
              onChange={onChange}
            />
          </Stack>
        );
      case FilterType.TextField:
        return (
          <Stack vertical>
            {operatorOptionsMarkup}
            <TextField
              label={selectedFilterLabel}
              value={value}
              type={filter.textFieldType}
              onChange={onChange}
            />
          </Stack>
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

  @autobind
  private handleOperatorOptionChange(operatorKey: string) {
    const {value, onChange, onFilterKeyChange} = this.props;
    onFilterKeyChange(operatorKey);

    if (!value) {
      return;
    }

    onChange(value);
  }
}

function buildOperatorOptions(operatorText?: string | Operator[]) {
  if (!operatorText || typeof operatorText === 'string') {
    return [];
  }

  return operatorText.map(({key, optionLabel}) => {
    return {value: key, label: optionLabel};
  });
}

export default withAppProvider<Props>()(FilterValueSelector);
