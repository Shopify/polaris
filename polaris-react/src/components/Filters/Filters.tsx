import React, {useState, useRef, useEffect, useMemo} from 'react';
import type {ReactNode} from 'react';
import {PlusMinor} from '@shopify/polaris-icons';

import {useI18n} from '../../utilities/i18n';
import {Popover} from '../Popover';
import {ActionList} from '../ActionList';
import {Text} from '../Text';
import {UnstyledButton} from '../UnstyledButton';
import {classNames} from '../../utilities/css';
import type {AppliedFilterInterface, FilterInterface} from '../../types';
import type {DisabledInfo} from '../DisabledTooltipWrapper';
import {DisabledTooltipWrapper} from '../DisabledTooltipWrapper';
import {Button} from '../Button';
import {Link} from '../Link';
import {Inline} from '../Inline';
import {Box} from '../Box';
import {Spinner} from '../Spinner';

import {FilterPill, SearchField} from './components';
import styles from './Filters.scss';

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
  appliedFilters: AppliedFilterInterface[];
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
  /** Whether an asyncronous task is currently being run. */
  loading?: boolean;
  /** Whether the filtering is disabled or not. */
  disableFiltering?: DisabledInfo;
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
  disableFiltering,
}: FiltersProps) {
  const i18n = useI18n();
  const [popoverActive, setPopoverActive] = useState(false);
  const [localPinnedFilters, setLocalPinnedFilters] = useState<string[]>([]);
  const hasMounted = useRef(false);

  const disableFilteringOrActualDisabled = disableFiltering
    ? {
        ...disableFiltering,
        isDisabled: disabled || disableFiltering?.isDisabled,
      }
    : undefined;

  const enabledFilters = filters.filter((filter) => !filter.disabled);

  useEffect(() => {
    hasMounted.current = true;
  });

  const togglePopoverActive = () =>
    setPopoverActive((popoverActive) => !popoverActive);

  const handleAddFilterClick = () => {
    togglePopoverActive();
  };
  const appliedFilterKeys = appliedFilters?.map(({key}) => key);

  const pinnedFiltersFromPropsAndAppliedFilters = enabledFilters.filter(
    ({pinned, key}) =>
      (Boolean(pinned) || appliedFilterKeys?.includes(key)) &&
      // Filters that are pinned in local state display at the end of our list
      !localPinnedFilters.find((filterKey) => filterKey === key),
  );
  const pinnedFiltersFromLocalState = localPinnedFilters
    .map((key) => enabledFilters.find((filter) => filter.key === key))
    .reduce<FilterInterface[]>(
      (acc, filter) => (filter ? [...acc, filter] : acc),
      [],
    );

  const pinnedFilters = [
    ...pinnedFiltersFromPropsAndAppliedFilters,
    ...pinnedFiltersFromLocalState,
  ];

  const additionalFilters = enabledFilters
    .filter((filter) => !pinnedFilters.find(({key}) => key === filter.key))
    .map((filter) => ({
      content: filter.label,
      onAction: () => {
        // PopoverOverlay will cause a rerender of the component and nuke the
        // popoverActive state, so we set this as a microtask
        setTimeout(() => {
          setLocalPinnedFilters((currentLocalPinnedFilters) => [
            ...new Set([...currentLocalPinnedFilters, filter.key]),
          ]);
          filter.onAction?.();
          togglePopoverActive();
        }, 0);
      },
    }));

  const hasOneOrMorePinnedFilters = pinnedFilters.length >= 1;

  const addFilterActivator = (
    // The enclosing div is necessary to prevent the Popover losing its root ref when DisabledTooltip conditionally
    // renders a Tooltip component
    <div>
      <Text variant="bodySm" as="p">
        <UnstyledButton
          type="button"
          className={styles.AddFilter}
          onClick={handleAddFilterClick}
          aria-label={i18n.translate('Polaris.Filters.addFilter')}
          disabled={
            disableFiltering?.isDisabled || additionalFilters.length === 0
          }
        >
          <span>{i18n.translate('Polaris.Filters.addFilter')}</span>
          <PlusMinor />
        </UnstyledButton>
      </Text>
    </div>
  );

  const handleClearAllFilters = () => {
    setLocalPinnedFilters([]);
    onClearAll?.();
  };

  const shouldShowAddButton = enabledFilters.some((filter) => !filter.pinned);

  const additionalContent = useMemo(() => {
    return (
      <>
        <div className={styles.Spinner}>
          {loading ? <Spinner size="small" /> : null}
        </div>
        {children}
      </>
    );
  }, [loading, children]);

  return (
    <div
      className={classNames(
        styles.Filters,
        hideQueryField && styles.hideQueryField,
      )}
    >
      {hideQueryField ? null : (
        <div className={styles.Container}>
          <Box
            paddingBlockStart={{
              xs: '3',
              md: '2',
            }}
            paddingBlockEnd={{
              xs: '3',
              md: '2',
            }}
            paddingInlineStart="2"
            paddingInlineEnd="3"
          >
            <Inline
              align="start"
              blockAlign="center"
              gap={{
                xs: '4',
                md: '3',
              }}
            >
              <div className={styles.SearchField}>
                <SearchField
                  onChange={onQueryChange}
                  onFocus={onQueryFocus}
                  onBlur={onQueryBlur}
                  onClear={onQueryClear}
                  value={queryValue}
                  placeholder={queryPlaceholder}
                  focused={focused}
                  disabled={{
                    isDisabled:
                      disableQueryField || disableFiltering?.isDisabled,
                    tooltipMessage: disableFiltering?.tooltipMessage,
                  }}
                />
              </div>
              {additionalContent}
            </Inline>
          </Box>
        </div>
      )}
      {hideFilters ? null : (
        <div
          className={classNames(
            styles.FiltersWrapper,
            shouldShowAddButton &&
              hasOneOrMorePinnedFilters &&
              styles.FiltersWrapperWithAddButton,
          )}
          aria-live="polite"
        >
          <div className={classNames(styles.FiltersInner)}>
            <div className={classNames(styles.FiltersStickyArea)}>
              {pinnedFilters.map(({key: filterKey, ...pinnedFilter}) => {
                const appliedFilter = appliedFilters?.find(
                  ({key}) => key === filterKey,
                );
                const handleFilterPillRemove = () => {
                  setLocalPinnedFilters((currentLocalPinnedFilters) =>
                    currentLocalPinnedFilters.filter(
                      (key) => key !== filterKey,
                    ),
                  );
                  appliedFilter?.onRemove(filterKey);
                };

                return (
                  <FilterPill
                    key={filterKey}
                    {...pinnedFilter}
                    initialActive={hasMounted.current && !pinnedFilter.pinned}
                    label={appliedFilter?.label || pinnedFilter.label}
                    filterKey={filterKey}
                    selected={appliedFilterKeys?.includes(filterKey)}
                    onRemove={handleFilterPillRemove}
                    disableFiltering={disableFiltering}
                  />
                );
              })}
              {shouldShowAddButton && (
                <div
                  className={classNames(
                    styles.AddFilterActivator,
                    hasOneOrMorePinnedFilters &&
                      styles.AddFilterActivatorMultiple,
                  )}
                >
                  <DisabledTooltipWrapper
                    disabled={disableFilteringOrActualDisabled}
                  >
                    <Popover
                      active={popoverActive && !disableFiltering?.isDisabled}
                      activator={addFilterActivator}
                      onClose={togglePopoverActive}
                    >
                      <ActionList
                        actionRole="menuitem"
                        items={additionalFilters}
                      />
                    </Popover>
                  </DisabledTooltipWrapper>
                </div>
              )}
              {appliedFilters?.length || localPinnedFilters.length ? (
                <div
                  className={classNames(
                    styles.ClearAll,
                    hasOneOrMorePinnedFilters &&
                      shouldShowAddButton &&
                      styles.MultiplePinnedFilterClearAll,
                  )}
                >
                  <DisabledTooltipWrapper
                    disabled={disableFilteringOrActualDisabled}
                  >
                    <Link onClick={handleClearAllFilters} removeUnderline>
                      <Text variant="bodySm" fontWeight="semibold" as="span">
                        {i18n.translate('Polaris.Filters.clearFilters')}
                      </Text>
                    </Link>
                  </DisabledTooltipWrapper>
                </div>
              ) : null}
            </div>
          </div>
          {hideQueryField ? (
            <Box paddingInlineEnd="2" paddingBlockStart="1">
              <Inline>{additionalContent}</Inline>
            </Box>
          ) : null}
        </div>
      )}
    </div>
  );
}
