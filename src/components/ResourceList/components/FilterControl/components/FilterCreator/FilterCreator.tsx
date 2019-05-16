import React from 'react';
import Button from '../../../../../Button';
import Popover from '../../../../../Popover';
import Select from '../../../../../Select';
import FormLayout from '../../../../../FormLayout';
import Form from '../../../../../Form';
import {
  withAppProvider,
  WithAppProviderProps,
} from '../../../../../AppProvider';

import FilterValueSelector from '../FilterValueSelector';
import {AppliedFilter, Filter, Operator} from '../../types';

export interface Props {
  filters: Filter[];
  resourceName: {
    singular: string;
    plural: string;
  };
  disabled: boolean;
  onAddFilter?(newFilter: AppliedFilter): void;
}

export type CombinedProps = Props & WithAppProviderProps;

export interface State {
  popoverActive: boolean;
  selectedFilter?: Filter;
  selectedFilterKey?: AppliedFilter['key'];
  selectedFilterValue?: AppliedFilter['value'];
}

export class FilterCreator extends React.PureComponent<CombinedProps, State> {
  state: State = {
    popoverActive: false,
  };

  private node: HTMLButtonElement | null = null;

  private get canAddFilter() {
    return Boolean(
      this.state.selectedFilter &&
        this.state.selectedFilterKey &&
        this.state.selectedFilterValue,
    );
  }

  render() {
    const {
      filters,
      resourceName,
      disabled,
      polaris: {intl},
    } = this.props;

    const {
      popoverActive,
      selectedFilter,
      selectedFilterKey,
      selectedFilterValue,
    } = this.state;

    const activator = (
      <Button
        onClick={this.togglePopover}
        disclosure
        testID="FilterCreator-FilterActivator"
        disabled={disabled}
        onFocus={this.handleButtonFocus}
      >
        {intl.translate('Polaris.ResourceList.FilterCreator.filterButtonLabel')}
      </Button>
    );

    const filterOptions = filters.map(({key, label}) => ({
      value: key,
      label,
    }));

    const filterValueSelectionMarkup = selectedFilter ? (
      <FilterValueSelector
        filter={selectedFilter}
        filterKey={selectedFilterKey}
        value={selectedFilterValue}
        onFilterKeyChange={this.handleFilterKeyChange}
        onChange={this.handleFilterValueChange}
      />
    ) : null;

    const addFilterButtonMarkup = selectedFilter ? (
      <Button
        onClick={this.handleAddFilter}
        disabled={!this.canAddFilter}
        testID="FilterCreator-AddFilterButton"
      >
        {intl.translate(
          'Polaris.ResourceList.FilterCreator.addFilterButtonLabel',
        )}
      </Button>
    ) : null;

    return (
      <Popover
        active={popoverActive}
        activator={activator}
        onClose={this.togglePopover}
        sectioned
        fullHeight
      >
        <Form onSubmit={this.handleAddFilter}>
          <FormLayout>
            <Select
              label={intl.translate(
                'Polaris.ResourceList.FilterCreator.showAllWhere',
                {resourceNamePlural: resourceName.plural.toLocaleLowerCase()},
              )}
              placeholder={intl.translate(
                'Polaris.ResourceList.FilterCreator.selectFilterKeyPlaceholder',
              )}
              options={filterOptions}
              onChange={this.handleFilterKeyChange}
              value={selectedFilter && selectedFilter.key}
            />
            {filterValueSelectionMarkup}
            {addFilterButtonMarkup}
          </FormLayout>
        </Form>
      </Popover>
    );
  }

  private handleButtonFocus = (
    ...args: React.FocusEvent<HTMLButtonElement>[]
  ) => {
    const event = args[0];
    if (!this.node && event) {
      this.node = event.target as HTMLButtonElement;
    }
  };

  private togglePopover = (): void => {
    this.setState(({popoverActive}) => ({popoverActive: !popoverActive}));
  };

  private handleFilterKeyChange = (filterKey: string) => {
    const {filters} = this.props;

    const foundFilter = filters.find((filter: any) => {
      const {minKey, maxKey, operatorText} = filter;

      if (minKey || maxKey) {
        return (
          filter.key === filterKey ||
          minKey === filterKey ||
          maxKey === filterKey
        );
      }

      if (operatorText && typeof operatorText !== 'string') {
        return (
          filter.key === filterKey ||
          operatorText.filter(({key}: Operator) => key === filterKey).length ===
            1
        );
      }

      return filter.key === filterKey;
    });

    if (!foundFilter) {
      return;
    }

    this.setState({
      selectedFilter: foundFilter,
      selectedFilterKey: filterKey,
      selectedFilterValue: undefined,
    });
  };

  private handleFilterValueChange = (filterValue: string) => {
    this.setState({selectedFilterValue: filterValue});
  };

  private handleAddFilter = () => {
    const {onAddFilter} = this.props;
    const {selectedFilterKey} = this.state;

    if (!onAddFilter || !this.canAddFilter || !selectedFilterKey) {
      return;
    }

    onAddFilter({
      key: selectedFilterKey,
      value: this.state.selectedFilterValue || '',
    });
    this.setState({
      popoverActive: false,
      selectedFilter: undefined,
      selectedFilterValue: undefined,
    });

    if (this.node != null) {
      this.node.focus();
    }
  };
}

export default withAppProvider<Props>()(FilterCreator);
