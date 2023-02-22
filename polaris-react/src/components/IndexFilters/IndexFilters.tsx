import type {KeyboardEvent} from 'react';
import React, {useMemo, useCallback} from 'react';

import {useI18n} from '../../utilities/i18n';
import {classNames} from '../../utilities/css';
import {Inline} from '../Inline';
import {Spinner} from '../Spinner';
import {Filters} from '../Filters';
import type {FiltersProps} from '../Filters';
import {Tabs} from '../Tabs';
import type {TabsProps} from '../Tabs';
import {useBreakpoints} from '../../utilities/breakpoints';
import type {DisabledInfo} from '../DisabledTooltipWrapper';

import {IndexFiltersMode, useIsSticky} from './hooks';
import {
  Container,
  SortButton,
  SearchFilterButton,
  UpdateButtons,
} from './components';
import type {IndexFiltersUpdateAction, SortButtonChoice} from './types';
import styles from './IndexFilters.scss';

type ExecutedCallback = (name: string) => Promise<boolean>;

export interface IndexFiltersProps
  extends Omit<FiltersProps, 'focused' | 'children'>,
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
  /** Optional callback invoked when a merchant updates a view based upon the filters and search string */
  onUpdateIndexFilters?: ExecutedCallback;
  /** Optional callback invoked when a merchant cancels the current filters and search string */
  onCancelIndexFilters?: () => void;
  /** Optional callback invoked when a merchant saves a view based upon the filters and search string */
  onSaveAsIndexFilters?: ExecutedCallback;
  /** Optional callback invoked when a merchant begins to edit a view */
  onStartEditing?: () => void;
  /** Whether to disable the Sort button */
  disableSort?: DisabledInfo;
  /** Whether to disable the Update/Save as button */
  updateButtonDisabled?: boolean;
  /** Whether the Update button should be in a loading state */
  updateButtonLoading?: boolean;
  /** The current state of the Update button */
  updateButtonState?: IndexFiltersUpdateAction;
  /** If true, will hide the update buttons */
  shouldHideUpdateButtons?: boolean;
  /** The array of current view names. Used for validation in the Save new view modal */
  viewNames: string[];
  /** The current mode of the IndexFilters component. Used to determine which view to show */
  mode: IndexFiltersMode;
  /** Callback to set the mode of the IndexFilters component */
  setMode: (mode: IndexFiltersMode) => void;
  /** If true, the sticky interaction on smaller devices will be disabled */
  disableStickyMode?: boolean;
  /** If true, the tabs will be disabled */
  disableTabs?: boolean;
  /** If the consumer of this component is the Shopify mobile app in-app browser */
  isMobileClient?: boolean;
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
  disableQueryField,
  filters,
  appliedFilters,
  onClearAll,
  onQueryChange,
  onQueryFocus,
  onQueryClear,
  onUpdateIndexFilters,
  onCancelIndexFilters,
  onSaveAsIndexFilters,
  onStartEditing,
  disableFiltering,
  disableSort,
  updateButtonDisabled,
  updateButtonLoading,
  updateButtonState,
  shouldHideUpdateButtons,
  viewNames,
  loading,
  mode,
  setMode,
  disableStickyMode,
  disableTabs,
  isMobileClient = false,
}: IndexFiltersProps) {
  const i18n = useI18n();
  const {mdDown} = useBreakpoints();

  const {intersectionRef, measurerRef, indexFilteringHeight, isSticky} =
    useIsSticky(mode, Boolean(disableStickyMode), isMobileClient);

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

  const handleUpdate = useExecutedCallback(onUpdateIndexFilters);
  const handleSaveAs = useExecutedCallback(onSaveAsIndexFilters);
  const handleCancel = useCallback(() => {
    onCancelIndexFilters?.();
    setMode(IndexFiltersMode.Default);
  }, [onCancelIndexFilters, setMode]);

  const beginEdit = useCallback(() => {
    setMode(IndexFiltersMode.Filtering);
    onStartEditing?.();
  }, [onStartEditing, setMode]);

  const updateButtonsMarkup = useMemo(
    () => (
      <UpdateButtons
        onUpdate={handleUpdate}
        onSaveAs={handleSaveAs}
        onCancel={handleCancel}
        updateButtonDisabled={updateButtonDisabled}
        updateButtonLoading={updateButtonLoading}
        updateButtonState={updateButtonState}
        viewNames={viewNames}
        shouldHideUpdateButtons={shouldHideUpdateButtons}
        disabled={
          mode === IndexFiltersMode.Filtering ? disableFiltering : undefined
        }
      />
    ),
    [
      disableFiltering,
      handleCancel,
      handleSaveAs,
      handleUpdate,
      mode,
      shouldHideUpdateButtons,
      updateButtonDisabled,
      updateButtonLoading,
      updateButtonState,
      viewNames,
    ],
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
        disabled={disableSort?.isDisabled}
        disabledTooltipMessage={disableSort?.tooltipMessage}
      />
    );
  }, [
    handleChangeSortButton,
    onSortChangeDirection,
    onSortChangeKey,
    sortOptions,
    sortSelected,
    disableSort?.isDisabled,
    disableSort?.tooltipMessage,
  ]);

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

    const isLoading = loading || updateButtonLoading;

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
                    mode !== IndexFiltersMode.Default || disableTabs,
                  )}
                  onSetStateToEditingColumns={setStateToEditingColumns}
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
                    disabled={disableFiltering?.isDisabled}
                    disabledTooltipMessage={disableFiltering?.tooltipMessage}
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
    disableTabs,
    tabs,
    updateButtonLoading,
    disableFiltering?.isDisabled,
    disableFiltering?.tooltipMessage,
    sortMarkup,
    i18n,
    onSelect,
    selected,
    updateButtonsMarkup,
  ]);

  function onPressEscape() {
    onCancelIndexFilters?.();
    setMode(IndexFiltersMode.Default);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (mode !== IndexFiltersMode.Default && event.key === 'Escape') {
      onPressEscape();
    }

    if (event.key === 'f') {
      onPressF();
    }
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
      onKeyDown={handleKeyDown}
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
              disableFiltering={disableFiltering}
              disableQueryField={disableQueryField}
              loading={loading || updateButtonLoading}
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
