import * as React from 'react';
import {autobind} from '@shopify/javascript-utilities/decorators';

import {ComplexAction} from '../../../../types';
import {buttonsFrom} from '../../../Button';
import TextField from '../../../TextField';
import Icon from '../../../Icon';

import FilterAdder from './FilterAdder';
import {ActiveFilter, Filter} from './types';
import * as styles from './FilterControl.scss';

export interface Props {
  resourceName: {
    singular: string,
    plural: string,
  },
  searchValue?: string,
  activeFilters?: ActiveFilter[],
  additionalAction?: ComplexAction,
  focused?: boolean,
  filters?: Filter[],
  onSearchBlur?(): void,
  onSearchChange?(searchValue: string, id: string): void,
  onFiltersChange?(filters: ActiveFilter[]): void,
}

export default class SearchAndFilter extends React.Component<Props> {
  render() {
    const {
      resourceName,
      searchValue,
      filters,
      additionalAction,
      onSearchChange,
      onSearchBlur,
    } = this.props;

    const filterFormMarkup = filters && filters.length > 0
      ? (
        <FilterAdder
          resourceName={resourceName}
          filters={filters}
          onAddFilter={this.handleAddFilter}
        />
      )
      : null;

    const activeFiltersMarkup = null;

    const additionalActionButton =
      (additionalAction && buttonsFrom(additionalAction)) || null;

    const textFieldLabel = `Search ${resourceName.plural}`;

    return (
      <div>
        <div className={styles.SearchFieldWrapper}>
          <TextField
            id="SearchAndFilter-TextField"
            connectedLeft={filterFormMarkup}
            connectedRight={additionalActionButton}
            label={textFieldLabel}
            labelHidden
            placeholder={textFieldLabel}
            prefix={<Icon source="search" color="skyDark" />}
            value={searchValue}
            onChange={onSearchChange}
            onBlur={onSearchBlur}
            // Todo: add to TextField
            // focused={focused || false}
          />
        </div>
        {activeFiltersMarkup}
      </div>
    );
  }

  @autobind
  // tslint:disable-next-line prefer-function-over-method
  private handleAddFilter() {
    return;
  }
}
