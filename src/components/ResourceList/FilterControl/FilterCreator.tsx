import * as React from 'react';
import {autobind} from '@shopify/javascript-utilities/decorators';

import {Button, Popover, Select, FormLayout} from '../../';

import FilterValueSelector from './FilterValueSelector';
import {AppliedFilter, Filter} from './types';

export interface Props {
  filters: Filter[],
  resourceName: {
    singular: string,
    plural: string,
  },
  onAddFilter?(newFilter: AppliedFilter): void,
}

export interface State {
  popoverActive: boolean,
  selectedFilter?: Filter,
  selectedFilterValue?: AppliedFilter['value'],
}

export default class FilterCreator extends React.PureComponent<Props, State> {
  state: State = {
    popoverActive: false,
  };

  private filterButtonLabel = 'Filter';
  private selectFilterKeyPlaceholder = 'Select a filter\u2026';
  private addFilterButtonLabel = 'Add filter';
  private get selectFilterKeyLabel() {
    const resourceNamePlural =
      this.props.resourceName.plural.toLocaleLowerCase();
    return `Show all ${resourceNamePlural} where:`;
  }

  private get canAddFilter() {
    return Boolean(
      this.state.selectedFilter &&
      this.state.selectedFilterValue,
    );
  }

  render() {
    const {filters} = this.props;
    const {
      popoverActive,
      selectedFilter,
      selectedFilterValue,
    } = this.state;

    const activator = (
      <Button
        onClick={this.togglePopover}
        disclosure
        testID="FilterCreator-FilterActivator"
      >
        {this.filterButtonLabel}
      </Button>
    );

    const filterOptions = filters.map(({key, label}) => ({
      value: key, label,
    }));

    const filterValueSelectionMarkup = selectedFilter ? (
      <FilterValueSelector
        filter={selectedFilter}
        value={selectedFilterValue}
        onChange={this.handleFilterValueChange}
      />
    ) : null;

    const addFilterButtonMarkup = selectedFilter ? (
      <Button
        onClick={this.handleAddFilter}
        disabled={!this.canAddFilter}
        testID="FilterCreator-AddFilterButton"
      >
        {this.addFilterButtonLabel}
      </Button>
    ) : null;

    return (
      <Popover
        active={popoverActive}
        activator={activator}
        onClose={this.togglePopover}
        sectioned
      >
        <FormLayout>
          <Select
            label={this.selectFilterKeyLabel}
            placeholder={this.selectFilterKeyPlaceholder}
            options={filterOptions}
            onChange={this.handleFilterKeyChange}
            value={selectedFilter && selectedFilter.key}
          />
          {filterValueSelectionMarkup}
          {addFilterButtonMarkup}
        </FormLayout>
      </Popover>
    );
  }

  @autobind
  private togglePopover(): void {
    this.setState(({popoverActive}) => ({popoverActive: !popoverActive}));
  }

  @autobind
  private handleFilterKeyChange(filterKey: string) {
    const {filters} = this.props;

    const foundFilter = filters.find((filter) => (
      filter.key === filterKey
    ));

    if (!foundFilter) { return; }

    this.setState({
      selectedFilter: foundFilter,
      selectedFilterValue: undefined,
    });
  }

  @autobind
  private handleFilterValueChange(filterValue: string) {
    this.setState({selectedFilterValue: filterValue});
  }

  @autobind
  private handleAddFilter() {
    const {onAddFilter} = this.props;
    const selectedFilterKey =
      this.state.selectedFilter && this.state.selectedFilter.key;

    if (
      !onAddFilter ||
      !this.canAddFilter ||
      !selectedFilterKey
    ) { return; }

    onAddFilter({
      key: selectedFilterKey,
      value: this.state.selectedFilterValue || '',
    });
    this.setState({popoverActive: false});
  }
}

