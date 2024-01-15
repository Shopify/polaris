import type {PropsWithChildren} from 'react';
import React, {useState, useRef, useEffect} from 'react';
import {PlusIcon} from '@shopify/polaris-icons';
import type {TransitionStatus} from 'react-transition-group';

import {useI18n} from '../../../../utilities/i18n';
import {useOnValueChange} from '../../../../utilities/use-on-value-change';
import {Popover} from '../../../Popover';
import {ActionList} from '../../../ActionList';
import {Text} from '../../../Text';
import {UnstyledButton} from '../../../UnstyledButton';
import {classNames} from '../../../../utilities/css';
import {useBreakpoints} from '../../../../utilities/breakpoints';
import type {
  ActionListItemDescriptor,
  AppliedFilterInterface,
  FilterInterface,
} from '../../../../types';
import {InlineStack} from '../../../InlineStack';
import {Box} from '../../../Box';
import {Button} from '../../../Button';
import {FilterPill} from '../FilterPill';
import styles from '../../Filters.module.scss';

export interface FiltersBarProps {
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
  mountedStateStyles?: any;
}

export function FiltersBar({
  filters,
  appliedFilters,
  onClearAll,
  disabled,
  hideQueryField,
  disableFilters,
  mountedStateStyles,
  onAddFilterClick,
  closeOnChildOverlayClick,
  children,
}: PropsWithChildren<FiltersBarProps>) {
  const i18n = useI18n();
  const {mdDown} = useBreakpoints();
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

  useOnValueChange(filters.length, () => {
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

  const hasOneOrMorePinnedFilters = pinnedFilters.length >= 1;

  const labelVariant = mdDown ? 'bodyMd' : 'bodySm';

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
        <Text variant={labelVariant} as="span">
          {i18n.translate('Polaris.Filters.addFilter')}{' '}
        </Text>
        <PlusIcon />
      </UnstyledButton>
    </div>
  );

  const handleClearAllFilters = () => {
    setLocalPinnedFilters([]);
    onClearAll?.();
  };
  const shouldShowAddButton = filters.some((filter) => !filter.pinned);

  const pinnedFiltersMarkup = pinnedFilters.map(
    ({key: filterKey, ...pinnedFilter}) => {
      const appliedFilter = appliedFilters?.find(({key}) => key === filterKey);
      const handleFilterPillRemove = () => {
        setLocalPinnedFilters((currentLocalPinnedFilters) =>
          currentLocalPinnedFilters.filter((key) => key !== filterKey),
        );
        appliedFilter?.onRemove(filterKey);
      };

      return (
        <FilterPill
          key={filterKey}
          {...pinnedFilter}
          initialActive={
            hasMounted.current && !pinnedFilter.pinned && !appliedFilter
          }
          label={appliedFilter?.label || pinnedFilter.label}
          filterKey={filterKey}
          selected={appliedFilterKeys?.includes(filterKey)}
          onRemove={handleFilterPillRemove}
          disabled={pinnedFilter.disabled || disableFilters}
          closeOnChildOverlayClick={closeOnChildOverlayClick}
        />
      );
    },
  );

  const addButton = shouldShowAddButton ? (
    <div
      className={classNames(
        styles.AddFilterActivator,
        hasOneOrMorePinnedFilters && styles.AddFilterActivatorMultiple,
      )}
    >
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

  const clearAllMarkup =
    appliedFilters?.length || localPinnedFilters.length ? (
      <div
        className={classNames(
          styles.ClearAll,
          hasOneOrMorePinnedFilters &&
            shouldShowAddButton &&
            styles.MultiplePinnedFilterClearAll,
        )}
      >
        <Button
          size="micro"
          onClick={handleClearAllFilters}
          removeUnderline
          variant="monochromePlain"
        >
          {i18n.translate('Polaris.Filters.clearFilters')}
        </Button>
      </div>
    ) : null;

  return (
    <div
      className={classNames(
        styles.FiltersWrapper,
        shouldShowAddButton &&
          hasOneOrMorePinnedFilters &&
          styles.FiltersWrapperWithAddButton,
      )}
      aria-live="polite"
      style={mountedStateStyles}
    >
      <div className={classNames(styles.FiltersInner)}>
        <div className={classNames(styles.FiltersStickyArea)}>
          {pinnedFiltersMarkup}
          {addButton}
          {clearAllMarkup}
        </div>
      </div>
      {hideQueryField ? (
        <Box
          paddingInlineEnd="300"
          paddingBlockStart="200"
          paddingBlockEnd="200"
        >
          <InlineStack
            align="start"
            blockAlign="center"
            gap={{
              xs: '400',
              md: '300',
            }}
          >
            {children}
          </InlineStack>
        </Box>
      ) : null}
    </div>
  );
}
