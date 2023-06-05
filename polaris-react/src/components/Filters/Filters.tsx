import React, {useState, useRef, useEffect, useMemo} from 'react';
import type {ReactNode} from 'react';
import {PlusMinor} from '@shopify/polaris-icons';
import type {TransitionStatus} from 'react-transition-group';

import {useI18n} from '../../utilities/i18n';
import {Popover} from '../Popover';
import {ActionList} from '../ActionList';
import {Text} from '../Text';
import {UnstyledButton} from '../UnstyledButton';
import {classNames} from '../../utilities/css';
import {useBreakpoints} from '../../utilities/breakpoints';
import {useFeatures} from '../../utilities/features';
import type {
  ActionListItemDescriptor,
  AppliedFilterInterface,
  FilterInterface,
} from '../../types';
import {HorizontalStack} from '../HorizontalStack';
import {Box} from '../Box';
import {Spinner} from '../Spinner';
import {Button} from '../Button';

import {FilterPill, SearchField} from './components';
import styles from './Filters.scss';

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
}: FiltersProps) {
  const i18n = useI18n();
  const {mdDown} = useBreakpoints();
  const {polarisSummerEditions2023: se23} = useFeatures();
  const [popoverActive, setPopoverActive] = useState(false);
  const [localPinnedFilters, setLocalPinnedFilters] = useState<string[]>([]);
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
    ({pinned, key}) =>
      (Boolean(pinned) || appliedFilterKeys?.includes(key)) &&
      // Filters that are pinned in local state display at the end of our list
      !localPinnedFilters.find((filterKey) => filterKey === key),
  );
  const pinnedFiltersFromLocalState = localPinnedFilters
    .map((key) => filters.find((filter) => filter.key === key))
    .reduce<FilterInterface[]>(
      (acc, filter) => (filter ? [...acc, filter] : acc),
      [],
    );

  const pinnedFilters = [
    ...pinnedFiltersFromPropsAndAppliedFilters,
    ...pinnedFiltersFromLocalState,
  ];

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
    .filter((filter) => !filter.section)
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

  const se23LabelVariant = mdDown && se23 ? 'bodyLg' : 'bodySm';
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
        <Text variant={se23 ? se23LabelVariant : labelVariant} as="span">
          {i18n.translate('Polaris.Filters.addFilter')}{' '}
        </Text>
        <PlusMinor />
      </UnstyledButton>
    </div>
  );

  const handleClearAllFilters = () => {
    setLocalPinnedFilters([]);
    onClearAll?.();
  };

  const shouldShowAddButton = filters.some((filter) => !filter.pinned);

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

  const queryFieldMarkup = hideQueryField ? null : (
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
        paddingInlineEnd={{
          xs: '4',
          md: '3',
        }}
      >
        <HorizontalStack
          align="start"
          blockAlign="center"
          gap={{
            xs: '4',
            md: '3',
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
            />
          </div>
          {additionalContent}
        </HorizontalStack>
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
          plain
          onClick={handleClearAllFilters}
          removeUnderline
        >
          {i18n.translate('Polaris.Filters.clearFilters')}
        </Button>
      </div>
    ) : null;

  const filtersMarkup =
    hideFilters || filters.length === 0 ? null : (
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
          <Box paddingInlineEnd="3" paddingBlockStart="2" paddingBlockEnd="2">
            <HorizontalStack
              align="start"
              blockAlign="center"
              gap={{
                xs: '4',
                md: '3',
              }}
            >
              {additionalContent}
            </HorizontalStack>
          </Box>
        ) : null}
      </div>
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
