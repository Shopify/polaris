import React, {useMemo, useCallback} from 'react';

import {useI18n} from '../../utilities/i18n';
import {classNames} from '../../utilities/css';
import {useEventListener} from '../../utilities/use-event-listener';
import {Inline} from '../Inline';
import {Spinner} from '../Spinner';
import {Filters} from '../Filters';
import type {FiltersProps} from '../Filters';
import {Tabs} from '../Tabs';
import type {TabsProps} from '../Tabs';
import {useBreakpoints} from '../../utilities/breakpoints';

import {IndexFiltersMode, useIsSticky} from './hooks';
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
import styles from './IndexFilters.scss';

const DEFAULT_IGNORED_TAGS = ['INPUT', 'SELECT', 'TEXTAREA'];

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
  onSortChange?: (value: string[]) => void;
  /** Optional callback when using saved views and changing the sort key */
  onSortChangeKey?: (value: string) => void;
  /** Optional callback when using saved views and changing the sort direction */
  onSortChangeDirection?: (value: string) => void;
  /** The primary action to display  */
  primaryAction?: IndexFiltersPrimaryAction;
  /** The cancel action to display */
  cancelAction: IndexFiltersCancelAction;
  /** Optional callback invoked when a merchant begins to edit a view */
  onStartEditing?: () => void;
  /** The current mode of the IndexFilters component. Used to determine which view to show */
  mode: IndexFiltersMode;
  /** Callback to set the mode of the IndexFilters component */
  setMode: (mode: IndexFiltersMode) => void;
  /** Will disable all the elements within the IndexFilters component */
  disabled?: boolean;
  /** If true, the sticky interaction on smaller devices will be disabled */
  disableStickyMode?: boolean;
  /** If the consumer of this component is the Shopify mobile app in-app browser */
  isMobileClient?: boolean;
  /** Whether the index supports creating new views */
  canCreateNewView?: boolean;
  /** Callback invoked when a merchant creates a new view */
  onCreateNewView: (name: string) => Promise<boolean>;
}

export function IndexFilters({
  tabs,
  selected,
  onSelect,
  onSortChange,
  onSortChangeKey,
  onSortChangeDirection,
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
  onStartEditing,
  disabled,
  loading,
  mode,
  setMode,
  disableStickyMode,
  isMobileClient = false,
  canCreateNewView = true,
  onCreateNewView,
}: IndexFiltersProps) {
  const i18n = useI18n();
  const {mdDown} = useBreakpoints();

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
    useIsSticky(mode, Boolean(disableStickyMode), isMobileClient);

  const viewNames = tabs.map(({content}) => content);

  const handleChangeSortButton = useCallback(
    (value: string[]) => {
      onSortChange?.(value);
    },
    [onSortChange],
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
    onStartEditing?.();
  }, [onStartEditing, setMode]);

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
        onChangeKey={onSortChangeKey}
        onChangeDirection={onSortChangeDirection}
        disabled={disabled}
      />
    );
  }, [
    handleChangeSortButton,
    onSortChangeDirection,
    onSortChangeKey,
    sortOptions,
    sortSelected,
    disabled,
  ]);

  const isActionLoading = primaryAction?.loading || cancelAction?.loading;

  const topContent = useMemo(() => {
    function setStateToEditingColumns() {
      beginEdit();
      setMode(IndexFiltersMode.EditingColumns);
    }

    function handleClickFilterButton() {
      beginEdit();
    }

    const searchFilterTooltip = i18n.translate(
      'Polaris.IndexFilters.searchFilterTooltip',
    );
    const searchFilterAriaLabel = i18n.translate(
      'Polaris.IndexFilters.searchFilterAccessibilityLabel',
    );

    const isLoading = loading || isActionLoading;

    switch (mode) {
      case IndexFiltersMode.Default:
      case IndexFiltersMode.EditingColumns:
        return (
          <Inline
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
              <div className={styles.TabsInner}>
                <Tabs
                  tabs={tabs}
                  selected={selected}
                  onSelect={onSelect}
                  disabled={Boolean(
                    mode !== IndexFiltersMode.Default || disabled,
                  )}
                  onSetStateToEditingColumns={setStateToEditingColumns}
                  showNewTab={canCreateNewView}
                  onSaveNewViewModal={onCreateNewView}
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
                  <SearchFilterButton
                    onClick={handleClickFilterButton}
                    aria-label={searchFilterAriaLabel}
                    tooltipContent={searchFilterTooltip}
                    disabled={disabled}
                  />
                  {sortMarkup}
                </>
              ) : null}
              {mode === IndexFiltersMode.EditingColumns
                ? updateButtonsMarkup
                : null}
            </div>
          </Inline>
        );
      default:
        return null;
    }
  }, [
    mode,
    beginEdit,
    setMode,
    mdDown,
    loading,
    disabled,
    tabs,
    sortMarkup,
    i18n,
    onSelect,
    selected,
    updateButtonsMarkup,
    isActionLoading,
    canCreateNewView,
    onCreateNewView,
  ]);

  function onPressEscape() {
    cancelAction?.onAction();
    setMode(IndexFiltersMode.Default);
  }

  function handleClearSearch() {
    onQueryClear?.();
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
          isSticky && isMobileClient && styles.IndexFiltersStickyMobile,
        )}
        ref={measurerRef}
      >
        {topContent ? <Container>{topContent}</Container> : null}
        {mode === IndexFiltersMode.Filtering && (
          <>
            <Filters
              queryValue={queryValue}
              queryPlaceholder={queryPlaceholder}
              onQueryChange={handleChangeSearch}
              onQueryClear={handleClearSearch}
              onQueryFocus={onQueryFocus}
              filters={filters}
              appliedFilters={appliedFilters}
              onClearAll={onClearAll}
              disableFilters={disabled}
              disableQueryField={disabled}
              loading={loading || isActionLoading}
              focused
            >
              <Inline gap="3" align="start" blockAlign="center">
                {updateButtonsMarkup}
                {sortMarkup}
              </Inline>
            </Filters>
          </>
        )}
      </div>
    </div>
  );
}
