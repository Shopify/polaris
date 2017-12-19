import * as React from 'react';
import {autobind} from '@shopify/javascript-utilities/decorators';

import {ComplexAction} from '../../../../types';
import {
  buttonsFrom,
  TextField,
  Icon,
} from '../../../';

import FilterCreator from './FilterCreator';
import {AppliedFilter, Filter} from './types';
import * as styles from './FilterControl.scss';

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
      filters = [],
      additionalAction,
      onSearchChange,
      onSearchBlur,
    } = this.props;

    const additionalActionButton =
      (additionalAction && buttonsFrom(additionalAction)) || null;

    return (
      <div>
        <div className={styles.SearchFieldWrapper}>
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
            // Todo: add to TextField
            // focused={focused || false}
          />
        </div>
      </div>
    );
  }

  @autobind
  // tslint:disable-next-line prefer-function-over-method
  private handleAddFilter() {
    return;
  }
}
