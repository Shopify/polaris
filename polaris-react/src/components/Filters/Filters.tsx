import React from 'react';
import type {ReactNode} from 'react';

import {classNames} from '../../utilities/css';
import type {AppliedFilterInterface, FilterInterface} from '../../types';

import {FiltersBar, SearchField} from './components';
import styles from './Filters.module.css';

export interface FiltersProps {
  /** Currently entered text in the query field */
  queryValue?: string;
  /** Placeholder text for the query field. */
  queryPlaceholder?: string;
  /** Whether the query field is focused. */
  focused?: boolean;
  /** Available filters added to the filter bar. Shortcut filters are pinned to the front of the bar. */
  filters: FilterInterface[];
  /** Applied filters which are rendered as filter pills. The remove callback is called with the respective key. */
  appliedFilters?: AppliedFilterInterface[];
  /** Callback when the query field is changed. */
  onQueryChange: (queryValue: string) => void;
  /** Callback when the clear button is triggered. */
  onQueryClear: () => void;
  /** Callback when the reset all button is pressed. */
  onClearAll: () => void;
  /** Callback when the query field is blurred. */
  onQueryBlur?: () => void;
  /** Callback when the query field is focused. */
  onQueryFocus?: () => void;
  /** The content to display inline with the controls. */
  children?: ReactNode;
  /** Disable all filters. */
  disabled?: boolean;
  /** Hide filter bar for applied filters. */
  hideFilters?: boolean;
  /** Hide the query field. */
  hideQueryField?: boolean;
  /** Disable the query field. */
  disableQueryField?: boolean;
  /** Disable the filters */
  disableFilters?: boolean;
  /** Whether an asyncronous task is currently being run. */
  loading?: boolean;
  /** Callback when the add filter button is clicked. */
  onAddFilterClick?: () => void;
  /** Whether the filter should close when clicking inside another Popover. */
  closeOnChildOverlayClick?: boolean;
}

export function Filters({
  queryValue,
  queryPlaceholder,
  focused,
  filters,
  appliedFilters,
  onQueryChange,
  onQueryClear,
  onQueryBlur,
  onQueryFocus,
  onClearAll,
  children,
  disabled,
  hideFilters,
  hideQueryField,
  disableQueryField,
  loading,
  disableFilters,
  onAddFilterClick,
  closeOnChildOverlayClick,
}: FiltersProps) {
  const hideFilterBar = hideFilters || filters.length === 0;
  const queryFieldMarkup = hideQueryField ? null : (
    <SearchField
      onChange={onQueryChange}
      onFocus={onQueryFocus}
      onBlur={onQueryBlur}
      onClear={onQueryClear}
      value={queryValue}
      placeholder={queryPlaceholder}
      focused={focused}
      disabled={disabled || disableQueryField}
      loading={loading}
    />
  );

  const filtersMarkup = hideFilterBar ? null : (
    <FiltersBar
      filters={filters}
      appliedFilters={appliedFilters}
      onClearAll={onClearAll}
      disabled={disabled}
      queryField={queryFieldMarkup}
      disableFilters={disableFilters}
      onAddFilterClick={onAddFilterClick}
      hideQueryField={hideQueryField}
      closeOnChildOverlayClick={closeOnChildOverlayClick}
    >
      {children}
    </FiltersBar>
  );

  return <div className={classNames(styles.Filters)}>{filtersMarkup}</div>;
}
