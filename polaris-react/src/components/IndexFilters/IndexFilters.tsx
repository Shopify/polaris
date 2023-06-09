import React, {useMemo, useCallback, useRef} from 'react';
import {Transition} from 'react-transition-group';

import {useI18n} from '../../utilities/i18n';
import {classNames} from '../../utilities/css';
import {useEventListener} from '../../utilities/use-event-listener';
import {useToggle} from '../../utilities/use-toggle';
import {useOnValueChange} from '../../utilities/use-on-value-change';
import {HorizontalStack} from '../HorizontalStack';
import {Spinner} from '../Spinner';
import {Filters} from '../Filters';
import type {FiltersProps} from '../Filters';
import {Tabs} from '../Tabs';
import type {TabsProps} from '../Tabs';
import {useBreakpoints} from '../../utilities/breakpoints';

import {useIsSticky} from './hooks';
import {
  Container,
  SortButton,
  SearchFilterButton,
  UpdateButtons,
} from './components';
import type {
  IndexFiltersPrimaryAction,
  IndexFiltersCancelAction,
  SortButtonChoice,
} from './types';
import {IndexFiltersMode} from './types';
import styles from './IndexFilters.scss';

const DEFAULT_IGNORED_TAGS = ['INPUT', 'SELECT', 'TEXTAREA'];

const TRANSITION_DURATION = 150;

const defaultStyle = {
  transition: `opacity ${TRANSITION_DURATION}ms var(--p-motion-ease)`,
  opacity: 0,
};

const transitionStyles = {
  entering: {opacity: 1},
  entered: {opacity: 1},
  exiting: {opacity: 0},
  exited: {opacity: 0},
  unmounted: {opacity: 0},
};

type ExecutedCallback = (name: string) => Promise<boolean>;

export interface IndexFiltersProps
  extends Omit<
      FiltersProps,
      'focused' | 'children' | 'disableQueryField' | 'disableFilters'
    >,
    Pick<TabsProps, 'tabs' | 'onSelect' | 'selected'> {
  /** The available sorting choices. If not present, the sort button will not show */
  sortOptions?: SortButtonChoice[];
  /** The currently selected sort choice. Required if using sorting */
  sortSelected?: string[];
  /** Optional callback invoked when a merchant changes the sort order. Required if using sorting */
  onSort?: (value: string[]) => void;
  /** Optional callback when using saved views and changing the sort key */
  onSortKeyChange?: (value: string) => void;
  /** Optional callback when using saved views and changing the sort direction */
  onSortDirectionChange?: (value: string) => void;
  /** Callback when the add filter button is clicked, to be passed to AlphaFilters. */
  onAddFilterClick?: () => void;
  /** The primary action to display  */
  primaryAction?: IndexFiltersPrimaryAction;
  /** The cancel action to display */
  cancelAction: IndexFiltersCancelAction;
  /** Optional callback invoked when a merchant begins to edit a view */
  onEditStart?: () => void;
  /** The current mode of the IndexFilters component. Used to determine which view to show */
  mode: IndexFiltersMode;
  /** Callback to set the mode of the IndexFilters component */
  setMode: (mode: IndexFiltersMode) => void;
  /** Will disable all the elements within the IndexFilters component */
  disabled?: boolean;
  /** Will disable just the query field */
  disableQueryField?: boolean;
  /** If true, the sticky interaction on smaller devices will be disabled */
  disableStickyMode?: boolean;
  /** If the component should go flush to the top of the page when sticking */
  isFlushWhenSticky?: boolean;
  /** Whether the index supports creating new views */
  canCreateNewView?: boolean;
  /** Callback invoked when a merchant creates a new view */
  onCreateNewView?: (name: string) => Promise<boolean>;
  /** Optional override to the default aria-label for the button that toggles the filtering mode */
  filteringAccessibilityLabel?: string;
  /** Optional override to the default Tooltip message for the button that toggles the filtering mode */
  filteringAccessibilityTooltip?: string;
  /** If true, display a loading state in the filters area */
  isFilterDataLoading?: boolean;
}

export function IndexFilters({
  tabs,
  selected,
  onSelect,
  onSort,
  onSortKeyChange,
  onSortDirectionChange,
  onAddFilterClick,
  sortOptions,
  sortSelected,
  queryValue = '',
  queryPlaceholder,
  primaryAction,
  cancelAction,
  filters,
  appliedFilters,
  onClearAll,
  onQueryChange,
  onQueryFocus,
  onQueryClear,
  onEditStart,
  disabled,
  disableQueryField,
  hideFilters,
  loading,
  isFilterDataLoading,
  mode,
  setMode,
  disableStickyMode,
  isFlushWhenSticky = false,
  canCreateNewView = true,
  onCreateNewView,
  filteringAccessibilityLabel,
  filteringAccessibilityTooltip,
  hideQueryField,
}: IndexFiltersProps) {
  const i18n = useI18n();
  const {mdDown} = useBreakpoints();
  const defaultRef = useRef(null);
  const filteringRef = useRef(null);
  const {
    value: filtersFocused,
    setFalse: setFiltersUnFocused,
    setTrue: setFiltersFocused,
  } = useToggle(false);

  useOnValueChange(mode, (newMode) => {
    if (newMode === IndexFiltersMode.Filtering) {
      setFiltersFocused();
    } else {
      setFiltersUnFocused();
    }
  });

  useEventListener('keydown', (event) => {
    const {key} = event;
    const tag = document?.activeElement?.tagName;
    if (mode !== IndexFiltersMode.Default && event.key === 'Escape') {
      onPressEscape();
    }

    if (key === 'f' && mode === IndexFiltersMode.Default) {
      if (tag && DEFAULT_IGNORED_TAGS.includes(tag)) {
        return;
      }
      onPressF();
      event.preventDefault();
    }
  });

  const {intersectionRef, measurerRef, indexFilteringHeight, isSticky} =
    useIsSticky(mode, Boolean(disableStickyMode), isFlushWhenSticky);

  const viewNames = tabs.map(({content}) => content);

  const handleChangeSortButton = useCallback(
    (value: string[]) => {
      onSort?.(value);
    },
    [onSort],
  );

  const handleChangeSearch = useCallback(
    (value: string) => {
      onQueryChange(value);
    },
    [onQueryChange],
  );

  const useExecutedCallback = (
    action?: ExecutedCallback,
    afterEffect?: () => void,
  ) =>
    useCallback(
      async (name: string) => {
        const hasExecuted = await action?.(name);
        if (hasExecuted) {
          setMode(IndexFiltersMode.Default);
          afterEffect?.();
        }
      },
      [action, afterEffect],
    );

  const onExecutedPrimaryAction = useExecutedCallback(primaryAction?.onAction);

  const onExecutedCancelAction = useCallback(() => {
    cancelAction.onAction?.();
    setMode(IndexFiltersMode.Default);
  }, [cancelAction, setMode]);

  const enhancedPrimaryAction = useMemo(() => {
    return primaryAction
      ? {
          ...primaryAction,
          onAction: onExecutedPrimaryAction,
        }
      : undefined;
  }, [onExecutedPrimaryAction, primaryAction]);

  const enhancedCancelAction = useMemo(() => {
    return {
      ...cancelAction,
      onAction: onExecutedCancelAction,
    };
  }, [cancelAction, onExecutedCancelAction]);

  const beginEdit = useCallback(() => {
    setMode(IndexFiltersMode.Filtering);
    onEditStart?.();
  }, [onEditStart, setMode]);

  const updateButtonsMarkup = useMemo(
    () => (
      <UpdateButtons
        primaryAction={enhancedPrimaryAction}
        cancelAction={enhancedCancelAction}
        viewNames={viewNames}
        disabled={disabled}
      />
    ),
    [enhancedPrimaryAction, enhancedCancelAction, disabled, viewNames],
  );

  const sortMarkup = useMemo(() => {
    if (!sortOptions?.length) {
      return null;
    }
    return (
      <SortButton
        choices={sortOptions}
        selected={sortSelected!}
        onChange={handleChangeSortButton}
        onChangeKey={onSortKeyChange}
        onChangeDirection={onSortDirectionChange}
        disabled={disabled}
      />
    );
  }, [
    handleChangeSortButton,
    onSortDirectionChange,
    onSortKeyChange,
    sortOptions,
    sortSelected,
    disabled,
  ]);

  const isActionLoading = primaryAction?.loading || cancelAction?.loading;

  function handleClickFilterButton() {
    beginEdit();
  }

  const searchFilterTooltip =
    filteringAccessibilityTooltip ||
    i18n.translate('Polaris.IndexFilters.searchFilterTooltip');
  const searchFilterAriaLabel =
    filteringAccessibilityLabel ||
    i18n.translate('Polaris.IndexFilters.searchFilterAccessibilityLabel');

  const isLoading = loading || isActionLoading;

  function onPressEscape() {
    cancelAction?.onAction();
    setMode(IndexFiltersMode.Default);
  }

  function handleClearSearch() {
    onQueryClear?.();
  }

  function handleQueryBlur() {
    setFiltersUnFocused();
  }

  function handleQueryFocus() {
    setFiltersFocused();
    onQueryFocus?.();
  }

  function onPressF() {
    if (mode !== IndexFiltersMode.Default) {
      return;
    }
    beginEdit();
  }

  return (
    <div
      className={styles.IndexFiltersWrapper}
      style={{height: indexFilteringHeight}}
    >
      <div ref={intersectionRef} />
      <div
        className={classNames(
          styles.IndexFilters,
          isSticky && styles.IndexFiltersSticky,
          isSticky && isFlushWhenSticky && styles.IndexFiltersStickyFlush,
        )}
        ref={measurerRef}
      >
        <Transition
          nodeRef={defaultRef}
          in={mode !== IndexFiltersMode.Filtering}
          timeout={TRANSITION_DURATION}
        >
          {(state) => (
            <div ref={defaultRef}>
              {mode !== IndexFiltersMode.Filtering ? (
                <Container>
                  <HorizontalStack
                    align="start"
                    blockAlign="center"
                    gap={{
                      xs: '0',
                      md: '2',
                    }}
                  >
                    <div
                      className={classNames(
                        styles.TabsWrapper,
                        mdDown && styles.SmallScreenTabsWrapper,
                        isLoading && styles.TabsWrapperLoading,
                      )}
                    >
                      <div
                        className={styles.TabsInner}
                        style={{
                          ...defaultStyle,
                          ...transitionStyles[state],
                        }}
                      >
                        <Tabs
                          tabs={tabs}
                          selected={selected}
                          onSelect={onSelect}
                          disabled={Boolean(
                            mode !== IndexFiltersMode.Default || disabled,
                          )}
                          canCreateNewView={canCreateNewView}
                          onCreateNewView={onCreateNewView}
                        />
                      </div>
                      {isLoading && mdDown && (
                        <div className={styles.TabsLoading}>
                          <Spinner size="small" />
                        </div>
                      )}
                    </div>
                    <div className={styles.ActionWrap}>
                      {isLoading && !mdDown && <Spinner size="small" />}
                      {mode === IndexFiltersMode.Default ? (
                        <>
                          {hideFilters && hideQueryField ? null : (
                            <SearchFilterButton
                              onClick={handleClickFilterButton}
                              label={searchFilterAriaLabel}
                              tooltipContent={searchFilterTooltip}
                              disabled={disabled}
                              hideFilters={hideFilters}
                              hideQueryField={hideQueryField}
                              style={{
                                ...defaultStyle,
                                ...transitionStyles[state],
                              }}
                            />
                          )}
                          {sortMarkup}
                        </>
                      ) : null}
                      {mode === IndexFiltersMode.EditingColumns
                        ? updateButtonsMarkup
                        : null}
                    </div>
                  </HorizontalStack>
                </Container>
              ) : null}
            </div>
          )}
        </Transition>
        <Transition
          nodeRef={filteringRef}
          in={mode === IndexFiltersMode.Filtering}
          timeout={TRANSITION_DURATION}
        >
          {(state) => (
            <div ref={filteringRef}>
              {mode === IndexFiltersMode.Filtering ? (
                <Filters
                  queryValue={queryValue}
                  queryPlaceholder={queryPlaceholder}
                  onQueryChange={handleChangeSearch}
                  onQueryClear={handleClearSearch}
                  onQueryFocus={handleQueryFocus}
                  onQueryBlur={handleQueryBlur}
                  onAddFilterClick={onAddFilterClick}
                  filters={filters}
                  appliedFilters={appliedFilters}
                  isFilterDataLoading={isFilterDataLoading}
                  onClearAll={onClearAll}
                  disableFilters={disabled}
                  hideFilters={hideFilters}
                  hideQueryField={hideQueryField}
                  disableQueryField={disabled || disableQueryField}
                  loading={loading || isActionLoading}
                  focused={filtersFocused}
                  mountedState={mdDown ? undefined : state}
                  borderlessQueryField
                >
                  <HorizontalStack gap="3" align="start" blockAlign="center">
                    <div
                      style={{
                        ...defaultStyle,
                        ...transitionStyles[state],
                      }}
                    >
                      {updateButtonsMarkup}
                    </div>
                    {sortMarkup}
                  </HorizontalStack>
                </Filters>
              ) : null}
            </div>
          )}
        </Transition>
      </div>
    </div>
  );
}
