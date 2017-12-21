import * as React from 'react';
import {autobind, memoize} from '@shopify/javascript-utilities/decorators';

import {ComplexAction} from '../../../../types';
import {
  buttonsFrom,
  TextField,
  Icon,
  Tag,
  Stack,
  FormLayout,
} from '../../../';

import FilterCreator from './FilterCreator';
import {AppliedFilter, Filter, FilterType} from './types';

export interface Props {
  resourceName: {
    singular: string,
    plural: string,
  },
  searchValue?: string,
  appliedFilters?: AppliedFilter[],
  additionalAction?: ComplexAction,
  focused?: boolean,
  filters?: Filter[],
  onSearchBlur?(): void,
  onSearchChange?(searchValue: string, id: string): void,
  onFiltersChange?(appliedFilters: AppliedFilter[]): void,
}

export default class FilterControl extends React.Component<Props> {
  private get textFieldLabel() {
    const resourceNamePlural =
      this.props.resourceName.plural.toLocaleLowerCase();
    return `Search ${resourceNamePlural}`;
  }

  render() {
    const {
      resourceName,
      searchValue,
      appliedFilters = [],
      additionalAction,
      focused = false,
      filters = [],
      onSearchBlur,
      onSearchChange,
    } = this.props;

    const additionalActionButton =
      (additionalAction && buttonsFrom(additionalAction)) || null;

    const appliedFiltersMarkup = appliedFilters.map((appliedFilter) => {
      const activeFilterLabel = this.getFilterLabel(appliedFilter);
      const filterId = idFromFilter(appliedFilter);
      return (
        <Tag
          onRemove={this.getRemoveFilterCallback(filterId)}
          key={filterId}
        >
          {activeFilterLabel}
        </Tag>
      );
    });

    const appliedFiltersWrapper = appliedFilters.length > 0
      ? (
        <Stack spacing="tight">
          {appliedFiltersMarkup}
        </Stack>
      )
      : null;

    return (
      <FormLayout>
        <TextField
          connectedLeft={
            <FilterCreator
              resourceName={resourceName}
              filters={filters}
              onAddFilter={this.handleAddFilter}
            />
          }
          connectedRight={additionalActionButton}
          label={this.textFieldLabel}
          labelHidden
          placeholder={this.textFieldLabel}
          prefix={<Icon source="search" color="skyDark" />}
          value={searchValue}
          onChange={onSearchChange}
          onBlur={onSearchBlur}
          focused={focused}
        />
        {appliedFiltersWrapper}
      </FormLayout>
    );
  }

  @autobind
  private handleAddFilter(newFilter: AppliedFilter) {
    const {onFiltersChange, appliedFilters = []} = this.props;

    if (!onFiltersChange) { return; }

    const foundFilter = appliedFilters.find((appliedFilter) => (
      idFromFilter(appliedFilter)  === idFromFilter(newFilter)
    ));

    if (foundFilter) { return; }

    const newAppliedFilters = [
      ...appliedFilters,
      newFilter,
    ];

    onFiltersChange(newAppliedFilters);
  }

  @memoize()
  private getRemoveFilterCallback(filterId: string) {
    return () => {
      this.handleRemoveFilter(filterId);
    };
  }

  private handleRemoveFilter(filterId: string) {
    const {onFiltersChange, appliedFilters = []} = this.props;

    if (!onFiltersChange) {
      return;
    }

    const foundIndex = appliedFilters.findIndex((appliedFilter) => (
      idFromFilter(appliedFilter) === filterId
    ));

    const newAppliedFilters = foundIndex >= 0
      ? [
        ...appliedFilters.slice(0, foundIndex),
        ...appliedFilters.slice(foundIndex + 1, appliedFilters.length),
      ]
      : [...appliedFilters];

    onFiltersChange(newAppliedFilters);
  }

  private getFilterLabel({key, value}: AppliedFilter): string {
    const {filters = []} = this.props;

    const filter = filters.find(
      ({key: filterKey}) => filterKey === key,
    );

    if (!filter) {
      return value;
    }

    const filterLabelByType = findFilterLabelByType(filter, value);
    const filterLabels = [
      filter.label,
      filter.operatorText,
      filterLabelByType,
    ];
    return filterLabels.join(' ');
  }
}

function idFromFilter(appliedFilter: AppliedFilter) {
  return `${appliedFilter.key}-${appliedFilter.value}`;
}

function findFilterLabelByType(
  filter: Filter,
  appliedFilterValue: AppliedFilter['value'],
): string {
  if (filter.type === FilterType.Select) {
    const foundFilterOption = filter.options.find((option) => (
      (typeof option === 'string')
        ? option === appliedFilterValue
        : option.value === appliedFilterValue
    ));

    if (foundFilterOption) {
      return (typeof foundFilterOption === 'string')
        ? foundFilterOption
        : foundFilterOption.label;
    }
  }

  return appliedFilterValue;
}
