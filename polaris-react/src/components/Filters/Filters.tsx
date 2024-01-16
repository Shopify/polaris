import React from 'react';
import type {ReactNode} from 'react';
import type {TransitionStatus} from 'react-transition-group';

import {classNames} from '../../utilities/css';
import type {AppliedFilterInterface, FilterInterface} from '../../types';
import {InlineStack} from '../InlineStack';
import {Box} from '../Box';

import {FiltersBar, SearchField} from './components';
import styles from './Filters.module.scss';

const TRANSITION_DURATION = 'var(--p-motion-duration-150)';
const TRANSITION_MARGIN = '-36px';

const defaultStyle = {
  transition: `opacity ${TRANSITION_DURATION} var(--p-motion-ease)`,
  opacity: 0,
};

const transitionStyles = {
  entering: {opacity: 1},
  entered: {opacity: 1},
  exiting: {opacity: 0},
  exited: {opacity: 0},
  unmounted: {opacity: 0},
};

const defaultFilterStyles = {
  transition: `opacity ${TRANSITION_DURATION} var(--p-motion-ease), margin ${TRANSITION_DURATION} var(--p-motion-ease)`,
  opacity: 0,
  marginTop: TRANSITION_MARGIN,
};

const transitionFilterStyles = {
  entering: {
    opacity: 1,
    marginTop: 0,
  },
  entered: {
    opacity: 1,
    marginTop: 0,
  },
  exiting: {
    opacity: 0,
    marginTop: TRANSITION_MARGIN,
  },
  exited: {
    opacity: 0,
    marginTop: TRANSITION_MARGIN,
  },
  unmounted: {
    opacity: 0,
    marginTop: TRANSITION_MARGIN,
  },
};

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
  /** Whether the text field should be borderless. Should be true when used as part of the IndexFilters component. */
  borderlessQueryField?: boolean;
  /** Whether an asyncronous task is currently being run. */
  loading?: boolean;
  mountedState?: TransitionStatus;
  /** Callback when the add filter button is clicked. */
  onAddFilterClick?: () => void;
  /** Whether the filter should close when clicking inside another Popover. */
  closeOnChildOverlayClick?: boolean;
  /** The name of the currently selected view */
  selectedViewName?: string;
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
  borderlessQueryField,
  loading,
  disableFilters,
  mountedState,
  onAddFilterClick,
  closeOnChildOverlayClick,
  selectedViewName,
}: FiltersProps) {
  const hideFilterBar = hideFilters || filters.length === 0;
  const queryFieldMarkup = hideQueryField ? null : (
    <div className={styles.Container}>
      <Box padding={hideFilterBar ? '300' : '200'}>
        <InlineStack
          align="start"
          blockAlign="center"
          gap={{
            xs: '400',
            md: '300',
          }}
        >
          <div
            className={styles.SearchField}
            style={
              mountedState
                ? {
                    ...defaultStyle,
                    ...transitionStyles[mountedState],
                  }
                : undefined
            }
          >
            <SearchField
              onChange={onQueryChange}
              onFocus={onQueryFocus}
              onBlur={onQueryBlur}
              onClear={onQueryClear}
              value={queryValue}
              placeholder={queryPlaceholder}
              focused={focused}
              disabled={disabled || disableQueryField}
              borderlessQueryField={borderlessQueryField}
              loading={loading}
              selectedViewName={selectedViewName}
            />
          </div>
          {children}
        </InlineStack>
      </Box>
    </div>
  );

  const mountedStateStyles =
    mountedState && !hideQueryField
      ? {
          ...defaultFilterStyles,
          ...transitionFilterStyles[mountedState],
        }
      : undefined;

  const filtersMarkup = hideFilterBar ? null : (
    <FiltersBar
      filters={filters}
      appliedFilters={appliedFilters}
      onClearAll={onClearAll}
      disabled={disabled}
      hideQueryField={hideQueryField}
      disableFilters={disableFilters}
      onAddFilterClick={onAddFilterClick}
      closeOnChildOverlayClick={closeOnChildOverlayClick}
      mountedStateStyles={mountedStateStyles}
    >
      {children}
    </FiltersBar>
  );

  return (
    <div
      className={classNames(
        styles.Filters,
        hideQueryField && styles.hideQueryField,
      )}
    >
      {queryFieldMarkup}
      {filtersMarkup}
    </div>
  );
}
