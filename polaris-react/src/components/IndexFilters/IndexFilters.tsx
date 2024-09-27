import React, {useMemo, useCallback, useRef} from 'react';

import {classNames} from '../../utilities/css';
import {InlineStack} from '../InlineStack';
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
  UpdateButtons,
  EditColumnsButton,
} from './components';
import type {
  IndexFiltersPrimaryAction,
  IndexFiltersCancelAction,
  SortButtonChoice,
} from './types';
import {IndexFiltersMode} from './types';
import styles from './IndexFilters.module.css';

type ExecutedCallback = (name: string) => Promise<boolean>;

type ActionableIndexFiltersMode = Exclude<
  IndexFiltersMode,
  IndexFiltersMode.Default
>;

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
  /** Whether or not the current sort order has been saved. An indicator of unsaved changes renders when sort is unsaved.
   * @default false
   */
  sortUnsaved?: boolean;
  /** Optional callback invoked when a merchant changes the sort order. Required if using sorting */
  onSort?: (value: string[]) => void;
  /** Optional callback when using saved views and changing the sort key */
  onSortKeyChange?: (value: string) => void;
  /** Optional callback when using saved views and changing the sort direction */
  onSortDirectionChange?: (value: string) => void;
  /** Callback when the add filter button is clicked, to be passed to Filters. */
  onAddFilterClick?: () => void;
  /** The primary action to display  */
  primaryAction?: IndexFiltersPrimaryAction;
  /** The cancel action to display */
  cancelAction?: IndexFiltersCancelAction;
  /** Optional callback invoked when a merchant begins to edit a view */
  onEditStart?: (mode: ActionableIndexFiltersMode) => void;
  /** The current mode of the IndexFilters component. Used to determine which view to show */
  mode: IndexFiltersMode;
  /** Override z-index of popovers and tooltips */
  disclosureZIndexOverride?: number;
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
  /** Whether the filter should close when clicking inside another Popover. */
  closeOnChildOverlayClick?: boolean;
  /** Whether to display the edit columns button with the other default mode filter actions */
  showEditColumnsButton?: boolean;
}

export function IndexFilters({
  tabs,
  selected,
  onSelect,
  onSort,
  onSortKeyChange,
  onSortDirectionChange,
  onAddFilterClick,
  sortUnsaved,
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
  mode,
  setMode,
  disabled,
  disableQueryField,
  hideFilters,
  loading,
  disclosureZIndexOverride,
  disableStickyMode,
  isFlushWhenSticky = false,
  canCreateNewView = true,
  onCreateNewView,
  hideQueryField,
  closeOnChildOverlayClick,
  showEditColumnsButton,
}: IndexFiltersProps) {
  const {mdDown} = useBreakpoints();
  const defaultRef = useRef(null);
  const filteringRef = useRef(null);

  const {intersectionRef, measurerRef, indexFilteringHeight, isSticky} =
    useIsSticky(Boolean(disableStickyMode), isFlushWhenSticky);

  const viewNames = tabs.map(({content}) => content);

  const handleChangeSortButton = useCallback(
    (value: string[]) => {
      onSort?.(value);
    },
    [onSort],
  );

  const useExecutedCallback = (
    action?: ExecutedCallback,
    afterEffect?: () => void,
  ) =>
    useCallback(
      async (name: string) => {
        const hasExecuted = await action?.(name);
        if (hasExecuted) {
          // setMode(IndexFiltersMode.Default);
          afterEffect?.();
        }
      },
      [action, afterEffect],
    );

  const onExecutedPrimaryAction = useExecutedCallback(primaryAction?.onAction);

  const onExecutedCancelAction = useCallback(() => {
    cancelAction?.onAction?.();
  }, [cancelAction]);

  const enhancedPrimaryAction = useMemo(() => {
    return primaryAction
      ? {
          ...primaryAction,
          onAction: onExecutedPrimaryAction,
        }
      : undefined;
  }, [onExecutedPrimaryAction, primaryAction]);

  const enhancedCancelAction = useMemo(() => {
    return cancelAction
      ? {
          ...cancelAction,
          onAction: onExecutedCancelAction,
        }
      : undefined;
  }, [cancelAction, onExecutedCancelAction]);

  const beginEdit = useCallback(
    (mode: ActionableIndexFiltersMode) => {
      setMode(mode);
      onEditStart?.(mode);
    },
    [onEditStart, setMode],
  );

  const updateButtonsMarkup = useMemo(
    () =>
      enhancedCancelAction || enhancedPrimaryAction ? (
        <UpdateButtons
          primaryAction={enhancedPrimaryAction}
          cancelAction={enhancedCancelAction}
          viewNames={viewNames}
          disabled={disabled}
        />
      ) : null,
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
        disabled={disabled}
        hasUnsavedChanges={sortUnsaved}
        disclosureZIndexOverride={disclosureZIndexOverride}
        onChange={handleChangeSortButton}
        onChangeKey={onSortKeyChange}
        onChangeDirection={onSortDirectionChange}
      />
    );
  }, [
    handleChangeSortButton,
    onSortDirectionChange,
    onSortKeyChange,
    sortUnsaved,
    sortOptions,
    sortSelected,
    disabled,
    disclosureZIndexOverride,
  ]);

  function handleClickEditColumnsButton() {
    beginEdit(IndexFiltersMode.EditingColumns);
  }

  const editColumnsMarkup = showEditColumnsButton ? (
    <EditColumnsButton
      onClick={handleClickEditColumnsButton}
      disabled={disabled}
    />
  ) : null;

  const isActionLoading = primaryAction?.loading || cancelAction?.loading;

  const isLoading = loading || isActionLoading;

  const handleQueryChange = useCallback(
    (value: string) => {
      onQueryChange(value);
    },
    [onQueryChange],
  );

  const handleQueryClear = useCallback(() => {
    onQueryClear?.();
  }, [onQueryClear]);

  function handleQueryFocus() {
    onQueryFocus?.();
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
        <div ref={defaultRef}>
          <Container>
            <InlineStack
              align="start"
              blockAlign="center"
              gap={{
                xs: '0',
                md: '200',
              }}
              wrap={false}
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
                    disabled={disabled}
                    disclosureZIndexOverride={disclosureZIndexOverride}
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
                {isLoading && !mdDown && (
                  <div className={styles.DesktopLoading}>
                    {isLoading ? <Spinner size="small" /> : null}
                  </div>
                )}
                {editColumnsMarkup}
                {sortMarkup}
                {mode === IndexFiltersMode.EditingColumns
                  ? updateButtonsMarkup
                  : null}
              </div>
            </InlineStack>
          </Container>
        </div>

        <div ref={filteringRef}>
          <Filters
            hideQueryField={hideQueryField}
            queryValue={queryValue}
            queryPlaceholder={queryPlaceholder}
            disabled={disabled || disableQueryField}
            onQueryChange={handleQueryChange}
            onQueryFocus={handleQueryFocus}
            onQueryClear={handleQueryClear}
            onAddFilterClick={onAddFilterClick}
            filters={filters}
            appliedFilters={appliedFilters}
            onClearAll={onClearAll}
            disableFilters={disabled}
            hideFilters={hideFilters}
            loading={loading || isActionLoading}
            closeOnChildOverlayClick={closeOnChildOverlayClick}
          >
            <div className={styles.ButtonWrap}>{updateButtonsMarkup}</div>
          </Filters>
        </div>
      </div>
    </div>
  );
}
