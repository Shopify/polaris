import type {PropsWithChildren, ReactNode} from 'react';
import React, {useState, useRef, useEffect} from 'react';
import {PlusIcon} from '@shopify/polaris-icons';
import type {TransitionStatus} from 'react-transition-group';

import {useI18n} from '../../../../utilities/i18n';
import {useOnValueChange} from '../../../../utilities/use-on-value-change';
import {Popover} from '../../../Popover';
import {ActionList} from '../../../ActionList';
import {Text} from '../../../Text';
import {UnstyledButton} from '../../../UnstyledButton';
import type {
  ActionListItemDescriptor,
  AppliedFilterInterface,
  FilterInterface,
} from '../../../../types';
import {InlineStack} from '../../../InlineStack';
import {InlineGrid} from '../../../InlineGrid';
import {Box} from '../../../Box';
import {FilterPill} from '../FilterPill';
import styles from '../../Filters.module.css';
import {Scrollable} from '../../../Scrollable';

export interface FiltersBarProps {
  /** The query field markup to render left of the filters */
  queryField?: ReactNode;
  /** Whether the query field is focused. */
  focused?: boolean;
  /** Available filters added to the filter bar. Shortcut filters are pinned to the front of the bar. */
  filters: FilterInterface[];
  /** Applied filters which are rendered as filter pills. The remove callback is called with the respective key. */
  appliedFilters?: AppliedFilterInterface[];
  /** Callback when the reset all button is pressed. */
  onClearAll: () => void;
  /** Disable all filters. */
  disabled?: boolean;
  /** Hide the query field. */
  hideQueryField?: boolean;
  /** Disable the filters */
  disableFilters?: boolean;
  mountedState?: TransitionStatus;
  /** Callback when the add filter button is clicked. */
  onAddFilterClick?: () => void;
  /** Whether the filter should close when clicking inside another Popover. */
  closeOnChildOverlayClick?: boolean;
}

export function FiltersBar({
  filters,
  appliedFilters,
  disabled,
  queryField,
  disableFilters,
  onAddFilterClick,
  closeOnChildOverlayClick,
  children,
}: PropsWithChildren<FiltersBarProps>) {
  const i18n = useI18n();
  const [popoverActive, setPopoverActive] = useState(false);
  const hasMounted = useRef(false);

  useEffect(() => {
    hasMounted.current = true;
  });

  const togglePopoverActive = () =>
    setPopoverActive((popoverActive) => !popoverActive);

  const handleAddFilterClick = () => {
    onAddFilterClick?.();
    togglePopoverActive();
  };

  const appliedFilterKeys = appliedFilters?.map(({key}) => key);

  const pinnedFromPropsKeys = filters
    .filter(({pinned}) => pinned)
    .map(({key}) => key);

  const pinnedFiltersFromPropsAndAppliedFilters = filters.filter(
    ({pinned, key}) => {
      const isPinnedOrApplied =
        Boolean(pinned) || appliedFilterKeys?.includes(key);
      return isPinnedOrApplied;
    },
  );

  const [localPinnedFilters, setLocalPinnedFilters] = useState<string[]>(
    pinnedFiltersFromPropsAndAppliedFilters.map(({key}) => key),
  );

  useOnValueChange(appliedFilters, () => {
    setLocalPinnedFilters(
      pinnedFiltersFromPropsAndAppliedFilters.map(({key}) => key),
    );
  });

  const pinnedFilters = localPinnedFilters
    .map((key) => filters.find((filter) => filter.key === key))
    .reduce<FilterInterface[]>(
      (acc, filter) => (filter ? [...acc, filter] : acc),
      [],
    );

  const onFilterClick =
    ({key, onAction}: FilterInterface) =>
    () => {
      // PopoverOverlay will cause a rerender of the component and nuke the
      // popoverActive state, so we set this as a microtask
      setTimeout(() => {
        setLocalPinnedFilters((currentLocalPinnedFilters) => [
          ...new Set([...currentLocalPinnedFilters, key]),
        ]);
        onAction?.();
        togglePopoverActive();
      }, 0);
    };

  const filterToActionItem = (filter: FilterInterface) => ({
    ...filter,
    content: filter.label,
    onAction: onFilterClick(filter),
  });

  const unpinnedFilters = filters.filter(
    (filter) => !pinnedFilters.some(({key}) => key === filter.key),
  );

  const unsectionedFilters = unpinnedFilters
    .filter((filter) => !filter.section && !filter.hidden)
    .map(filterToActionItem);

  const sectionedFilters = unpinnedFilters
    .filter((filter) => filter.section)
    .reduce(
      (acc, filter) => {
        const filterActionItem = filterToActionItem(filter);
        const sectionIndex = acc.findIndex(
          (section) => section.title === filter.section,
        );

        if (sectionIndex === -1) {
          acc.push({
            title: filter.section!,
            items: [filterActionItem],
          });
        } else {
          acc[sectionIndex].items.push(filterActionItem);
        }

        return acc;
      },
      [] as {
        title: string;
        items: ActionListItemDescriptor[];
      }[],
    );

  const addFilterActivator = (
    <div>
      <UnstyledButton
        type="button"
        className={styles.AddFilter}
        onClick={handleAddFilterClick}
        aria-label={i18n.translate('Polaris.Filters.addFilter')}
        disabled={
          disabled ||
          (unsectionedFilters.length === 0 && sectionedFilters.length === 0) ||
          disableFilters
        }
      >
        <PlusIcon />
        <Text as="span" variant="bodySm" tone={disabled ? 'disabled' : 'base'}>
          {i18n.translate('Polaris.Filters.addFilter')}{' '}
        </Text>
      </UnstyledButton>
    </div>
  );

  const shouldShowAddButton = filters.length !== localPinnedFilters?.length;

  const pinnedFiltersMarkup = (
    <Scrollable
      shadow
      hint
      vertical={false}
      scrollbarWidth="none"
      className={styles.AppliedFilters}
    >
      {pinnedFilters.map(({key: filterKey, ...pinnedFilter}) => {
        const appliedFilter = appliedFilters?.find(
          ({key}) => key === filterKey,
        );
        const handleFilterPillRemove = () => {
          setLocalPinnedFilters((currentLocalPinnedFilters) =>
            currentLocalPinnedFilters.filter((key) => {
              const isMatchedFilters = key === filterKey;
              const isPinnedFilterFromProps = pinnedFromPropsKeys.includes(key);
              return !isMatchedFilters || isPinnedFilterFromProps;
            }),
          );
          appliedFilter?.onRemove?.(filterKey);
        };

        return (
          <FilterPill
            key={filterKey}
            {...pinnedFilter}
            initialActive={
              hasMounted.current && !pinnedFilter.pinned && !appliedFilter
            }
            unsavedChanges={appliedFilter?.unsavedChanges}
            label={appliedFilter?.label || pinnedFilter.label}
            filterKey={filterKey}
            selected={appliedFilterKeys?.includes(filterKey)}
            onRemove={
              appliedFilter?.onRemove ? handleFilterPillRemove : undefined
            }
            disabled={pinnedFilter.disabled || disableFilters}
            closeOnChildOverlayClick={closeOnChildOverlayClick}
          />
        );
      })}
    </Scrollable>
  );

  const addButton = shouldShowAddButton ? (
    <div className={styles.AddFilterActivator}>
      <Popover
        active={popoverActive && !disabled}
        activator={addFilterActivator}
        onClose={togglePopoverActive}
      >
        <ActionList
          actionRole="menuitem"
          items={unsectionedFilters}
          sections={sectionedFilters}
        />
      </Popover>
    </div>
  ) : null;

  const filterMarkup = (
    <div className={styles.FiltersInner} aria-live="polite">
      {pinnedFiltersMarkup}
      <div className={styles.FilterActionWrapper}>{addButton}</div>
    </div>
  );

  return (
    <Box paddingInline="200" borderColor="border" borderBlockEndWidth="025">
      <InlineGrid
        columns={{xs: 1, md: children ? ['twoThirds', 'oneThird'] : 1}}
        alignItems="center"
      >
        <InlineStack wrap={false} align="start" blockAlign="center">
          <div className={styles.SearchFieldWrapper}>{queryField}</div>
          {filterMarkup}
        </InlineStack>
        {children}
      </InlineGrid>
    </Box>
  );
}
