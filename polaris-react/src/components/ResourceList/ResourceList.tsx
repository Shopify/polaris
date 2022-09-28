import React, {
  ReactElement,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
  Children,
} from 'react';
import {EnableSelectionMinor} from '@shopify/polaris-icons';
import {tokens, toPx} from '@shopify/polaris-tokens';

import {debounce} from '../../utilities/debounce';
import type {CheckboxHandles} from '../../types';
import {classNames} from '../../utilities/css';
import {isElementOfType} from '../../utilities/components';
import {Button} from '../Button';
// eslint-disable-next-line import/no-deprecated
import {EventListener} from '../EventListener';
import {Sticky} from '../Sticky';
import {Spinner} from '../Spinner';
import {
  CheckableButtonKey,
  CheckableButtons,
  ResourceListContext,
  ResourceListSelectedItems,
  SELECT_ALL_ITEMS,
} from '../../utilities/resource-list';
import {Select, SelectOption} from '../Select';
import {EmptySearchResult} from '../EmptySearchResult';
import {useI18n} from '../../utilities/i18n';
import {ResourceItem} from '../ResourceItem';
import {useLazyRef} from '../../utilities/use-lazy-ref';
import {BulkActions, BulkActionsProps} from '../BulkActions';
import {SelectAllActions} from '../SelectAllActions';
import {CheckableButton} from '../CheckableButton';

import styles from './ResourceList.scss';

const SMALL_SPINNER_HEIGHT = 28;
const LARGE_SPINNER_HEIGHT = 45;

function getAllItemsOnPage<TItemType>(
  items: TItemType[],
  idForItem: (item: TItemType, index: number) => string,
) {
  return items.map((item: TItemType, index: number) => {
    return idForItem(item, index);
  });
}

const isBreakpointsXS = () => {
  return typeof window === 'undefined'
    ? false
    : window.innerWidth <
        parseFloat(toPx(tokens.breakpoints['breakpoints-sm']) ?? '');
};

function defaultIdForItem<TItemType extends {id?: any}>(
  item: TItemType,
  index: number,
) {
  return Object.prototype.hasOwnProperty.call(item, 'id')
    ? item.id
    : index.toString();
}

export interface ResourceListProps<TItemType = any> {
  /** Item data; each item is passed to renderItem */
  items: TItemType[];
  filterControl?: React.ReactNode;
  /** The markup to display when no resources exist yet. Renders when set and items is empty. */
  emptyState?: React.ReactNode;
  /** The markup to display when no results are returned on search or filter of the list. Renders when `filterControl` is set, items are empty, and `emptyState` is not set.
   * @default EmptySearchResult
   */
  emptySearchState?: React.ReactNode;
  /** Name of the resource, such as customers or products */
  resourceName?: {
    singular: string;
    plural: string;
  };
  /** Up to 2 bulk actions that will be given more prominence */
  promotedBulkActions?: BulkActionsProps['promotedActions'];
  /** Actions available on the currently selected items */
  bulkActions?: BulkActionsProps['actions'];
  /** Collection of IDs for the currently selected items */
  selectedItems?: ResourceListSelectedItems;
  /** Whether or not the list has filter(s) applied */
  isFiltered?: boolean;
  /** Renders a Select All button at the top of the list and checkboxes in front of each list item. For use when bulkActions aren't provided. **/
  selectable?: boolean;
  /** Whether or not there are more items than currently set on the items prop. Determines whether or not to set the paginatedSelectAllAction and paginatedSelectAllText props on the BulkActions component. */
  hasMoreItems?: boolean;
  /** Overlays item list with a spinner while a background action is being performed */
  loading?: boolean;
  /** Boolean to show or hide the header */
  showHeader?: boolean;
  /** Total number of resources */
  totalItemsCount?: number;
  /** Current value of the sort control */
  sortValue?: string;
  /** Collection of sort options to choose from */
  sortOptions?: SelectOption[];
  /** ReactNode to display instead of the sort control */
  alternateTool?: React.ReactNode;
  /** Callback when sort option is changed */
  onSortChange?(selected: string, id: string): void;
  /** Callback when selection is changed */
  onSelectionChange?(selectedItems: ResourceListSelectedItems): void;
  /** Function to render each list item, must return a ResourceItem component */
  renderItem(item: TItemType, id: string, index: number): React.ReactNode;
  /** Function to customize the unique ID for each item */
  idForItem?(item: TItemType, index: number): string;
  /** Function to resolve the ids of items */
  resolveItemId?(item: TItemType): string;
}

type ResourceListType = (<TItemType>(
  value: ResourceListProps<TItemType>,
) => ReactElement) & {
  Item: typeof ResourceItem;
};

export const ResourceList: ResourceListType = function ResourceList<TItemType>({
  items,
  filterControl,
  emptyState,
  emptySearchState,
  resourceName: resourceNameProp,
  promotedBulkActions,
  bulkActions,
  selectedItems = [],
  isFiltered,
  selectable,
  hasMoreItems,
  loading,
  showHeader,
  totalItemsCount,
  sortValue,
  sortOptions,
  alternateTool,
  onSortChange,
  onSelectionChange,
  renderItem,
  idForItem = defaultIdForItem,
  resolveItemId,
}: ResourceListProps<TItemType>) {
  const i18n = useI18n();
  const [selectMode, setSelectMode] = useState(
    Boolean(selectedItems && selectedItems.length > 0),
  );
  const [loadingPosition, setLoadingPositionState] = useState(0);
  const [lastSelected, setLastSelected] = useState<number>();
  const [smallScreen, setSmallScreen] = useState(isBreakpointsXS());
  const forceUpdate: (x?: number) => void = useReducer<(x?: number) => number>(
    (x = 0) => x + 1,
    0,
  )[1];

  const [checkableButtons, setCheckableButtons] = useState<CheckableButtons>(
    new Map(),
  );

  const defaultResourceName = useLazyRef(() => ({
    singular: i18n.translate('Polaris.ResourceList.defaultItemSingular'),
    plural: i18n.translate('Polaris.ResourceList.defaultItemPlural'),
  }));
  const listRef: React.RefObject<HTMLUListElement> = useRef(null);

  const handleSelectMode = (selectMode: boolean) => {
    setSelectMode(selectMode);
    if (!selectMode && onSelectionChange) {
      onSelectionChange([]);
    }
  };

  const handleResize = debounce(
    () => {
      const newSmallScreen = isBreakpointsXS();
      if (
        selectedItems &&
        selectedItems.length === 0 &&
        selectMode &&
        !newSmallScreen
      ) {
        handleSelectMode(false);
      }

      if (smallScreen !== newSmallScreen) {
        setSmallScreen(newSmallScreen);
      }
    },
    50,
    {leading: true, trailing: true, maxWait: 50},
  );

  const isSelectable = Boolean(
    (promotedBulkActions && promotedBulkActions.length > 0) ||
      (bulkActions && bulkActions.length > 0) ||
      selectable,
  );

  const selectAllSelectState = (): boolean | 'indeterminate' => {
    let selectState: boolean | 'indeterminate' = 'indeterminate';
    if (
      !selectedItems ||
      (Array.isArray(selectedItems) && selectedItems.length === 0)
    ) {
      selectState = false;
    } else if (
      selectedItems === SELECT_ALL_ITEMS ||
      (Array.isArray(selectedItems) && selectedItems.length === items.length)
    ) {
      selectState = true;
    }
    return selectState;
  };

  const resourceName = resourceNameProp
    ? resourceNameProp
    : defaultResourceName.current;

  const headerTitle = () => {
    const itemsCount = items.length;
    const resource =
      !loading &&
      ((!totalItemsCount && itemsCount === 1) || totalItemsCount === 1)
        ? resourceName.singular
        : resourceName.plural;

    if (loading) {
      return i18n.translate('Polaris.ResourceList.loading', {resource});
    } else if (totalItemsCount) {
      return i18n.translate('Polaris.ResourceList.showingTotalCount', {
        itemsCount,
        totalItemsCount,
        resource,
      });
    } else {
      return i18n.translate('Polaris.ResourceList.showing', {
        itemsCount,
        resource,
      });
    }
  };

  const selectAllActionsLabel = () => {
    const selectedItemsCount =
      selectedItems === SELECT_ALL_ITEMS
        ? `${items.length}+`
        : selectedItems.length;

    return i18n.translate('Polaris.ResourceList.selected', {
      selectedItemsCount,
    });
  };

  const selectAllActionsAccessibilityLabel = () => {
    const selectedItemsCount = selectedItems.length;
    const totalItemsCount = items.length;
    const allSelected = selectedItemsCount === totalItemsCount;

    if (totalItemsCount === 1 && allSelected) {
      return i18n.translate(
        'Polaris.ResourceList.a11yCheckboxDeselectAllSingle',
        {
          resourceNameSingular: resourceName.singular,
        },
      );
    } else if (totalItemsCount === 1) {
      return i18n.translate(
        'Polaris.ResourceList.a11yCheckboxSelectAllSingle',
        {
          resourceNameSingular: resourceName.singular,
        },
      );
    } else if (allSelected) {
      return i18n.translate(
        'Polaris.ResourceList.a11yCheckboxDeselectAllMultiple',
        {
          itemsLength: items.length,
          resourceNamePlural: resourceName.plural,
        },
      );
    } else {
      return i18n.translate(
        'Polaris.ResourceList.a11yCheckboxSelectAllMultiple',
        {
          itemsLength: items.length,
          resourceNamePlural: resourceName.plural,
        },
      );
    }
  };

  const paginatedSelectAllText = () => {
    if (!isSelectable || !hasMoreItems) {
      return;
    }

    if (selectedItems === SELECT_ALL_ITEMS) {
      return i18n.translate(
        isFiltered
          ? 'Polaris.ResourceList.allFilteredItemsSelected'
          : 'Polaris.ResourceList.allItemsSelected',
        {
          itemsLength: items.length,
          resourceNamePlural: resourceName.plural,
        },
      );
    }
  };

  const paginatedSelectAllAction = () => {
    if (!isSelectable || !hasMoreItems) {
      return;
    }

    const actionText =
      selectedItems === SELECT_ALL_ITEMS
        ? i18n.translate('Polaris.Common.undo')
        : i18n.translate(
            isFiltered
              ? 'Polaris.ResourceList.selectAllFilteredItems'
              : 'Polaris.ResourceList.selectAllItems',
            {
              itemsLength: items.length,
              resourceNamePlural: resourceName.plural,
            },
          );

    return {
      content: actionText,
      onAction: handleSelectAllItemsInStore,
    };
  };

  const emptySearchResultText = {
    title: i18n.translate('Polaris.ResourceList.emptySearchResultTitle', {
      resourceNamePlural: resourceName.plural,
    }),
    description: i18n.translate(
      'Polaris.ResourceList.emptySearchResultDescription',
    ),
  };

  const handleSelectAllItemsInStore = () => {
    const newlySelectedItems =
      selectedItems === SELECT_ALL_ITEMS
        ? getAllItemsOnPage(items, idForItem)
        : SELECT_ALL_ITEMS;

    if (onSelectionChange) {
      onSelectionChange(newlySelectedItems);
    }
  };

  const setLoadingPosition = useCallback(() => {
    if (listRef.current != null) {
      if (typeof window === 'undefined') {
        return;
      }

      const overlay = listRef.current.getBoundingClientRect();
      const viewportHeight = Math.max(
        document.documentElement ? document.documentElement.clientHeight : 0,
        window.innerHeight || 0,
      );

      const overflow = viewportHeight - overlay.height;

      const spinnerHeight =
        items.length === 1 ? SMALL_SPINNER_HEIGHT : LARGE_SPINNER_HEIGHT;

      const spinnerPosition =
        overflow > 0
          ? (overlay.height - spinnerHeight) / 2
          : (viewportHeight - overlay.top - spinnerHeight) / 2;

      setLoadingPositionState(spinnerPosition);
    }
  }, [listRef, items.length]);

  const itemsExist = items.length > 0;

  useEffect(() => {
    if (loading) {
      setLoadingPosition();
    }
  }, [loading, setLoadingPosition]);

  useEffect(() => {
    if (selectedItems && selectedItems.length > 0 && !selectMode) {
      setSelectMode(true);
    }
    if ((!selectedItems || selectedItems.length === 0) && !isBreakpointsXS()) {
      setSelectMode(false);
    }
  }, [selectedItems, selectMode]);

  useEffect(() => {
    forceUpdate();
  }, [forceUpdate, items]);

  const renderItemWithId = (item: TItemType, index: number) => {
    const id = idForItem(item, index);

    const itemContent = renderItem(item, id, index);

    if (
      process.env.NODE_ENV === 'development' &&
      !isElementOfType(itemContent, ResourceItem)
    ) {
      // eslint-disable-next-line no-console
      console.warn(
        '<ResourceList /> renderItem function should return a <ResourceItem />.',
      );
    }

    return itemContent;
  };

  const handleMultiSelectionChange = (
    lastSelected: number,
    currentSelected: number,
    resolveItemId: (item: TItemType) => string,
  ) => {
    const min = Math.min(lastSelected, currentSelected);
    const max = Math.max(lastSelected, currentSelected);
    return items.slice(min, max + 1).map(resolveItemId);
  };

  const handleCheckableButtonRegistration = (
    key: CheckableButtonKey,
    button: CheckboxHandles,
  ) => {
    if (!checkableButtons.get(key)) {
      setCheckableButtons(new Map(checkableButtons).set(key, button));
    }
  };

  const handleSelectionChange = (
    selected: boolean,
    id: string,
    sortOrder: number | undefined,
    shiftKey: boolean,
  ) => {
    if (selectedItems == null || onSelectionChange == null) {
      return;
    }

    let newlySelectedItems =
      selectedItems === SELECT_ALL_ITEMS
        ? getAllItemsOnPage(items, idForItem)
        : [...selectedItems];

    if (sortOrder !== undefined) {
      setLastSelected(sortOrder);
    }

    const lastSelectedFromState = lastSelected;

    let selectedIds: string[] = [id];

    if (
      shiftKey &&
      lastSelectedFromState != null &&
      sortOrder !== undefined &&
      resolveItemId
    ) {
      selectedIds = handleMultiSelectionChange(
        lastSelectedFromState,
        sortOrder,
        resolveItemId,
      );
    }
    newlySelectedItems = [...new Set([...newlySelectedItems, ...selectedIds])];

    if (!selected) {
      for (const selectedId of selectedIds) {
        newlySelectedItems.splice(newlySelectedItems.indexOf(selectedId), 1);
      }
    }

    if (newlySelectedItems.length === 0 && !isBreakpointsXS()) {
      handleSelectMode(false);
    } else if (newlySelectedItems.length > 0) {
      handleSelectMode(true);
    }

    if (onSelectionChange) {
      onSelectionChange(newlySelectedItems);
    }
  };

  const handleToggleAll = () => {
    let newlySelectedItems: string[];

    if (
      (Array.isArray(selectedItems) && selectedItems.length === items.length) ||
      selectedItems === SELECT_ALL_ITEMS
    ) {
      newlySelectedItems = [];
    } else {
      newlySelectedItems = items.map((item, index) => {
        return idForItem(item, index);
      });
    }

    if (newlySelectedItems.length === 0 && !isBreakpointsXS()) {
      handleSelectMode(false);
    } else if (newlySelectedItems.length > 0) {
      handleSelectMode(true);
    }

    let checkbox: CheckboxHandles | undefined;

    if (isBreakpointsXS()) {
      checkbox = checkableButtons.get('selectAll');
    } else if (newlySelectedItems.length === 0) {
      checkbox = checkableButtons.get('plain');
    } else {
      checkbox = checkableButtons.get('selectAll');
    }

    if (onSelectionChange) {
      onSelectionChange(newlySelectedItems);
    }

    // setTimeout ensures execution after the Transition on BulkActions
    setTimeout(() => {
      checkbox && checkbox.focus();
    }, 0);
  };

  const selectAllActionsMarkup = isSelectable ? (
    <div className={styles.SelectAllActionsWrapper}>
      <SelectAllActions
        label={selectAllActionsLabel()}
        accessibilityLabel={selectAllActionsAccessibilityLabel()}
        selected={selectAllSelectState()}
        onToggleAll={handleToggleAll}
        selectMode={selectMode}
        paginatedSelectAllAction={paginatedSelectAllAction()}
        paginatedSelectAllText={paginatedSelectAllText()}
        disabled={loading}
        smallScreen={smallScreen}
      />
    </div>
  ) : null;

  const bulkActionsMarkup = isSelectable ? (
    <div className={styles.BulkActionsWrapper}>
      <BulkActions
        selectMode={selectMode}
        onSelectModeToggle={handleSelectMode}
        promotedActions={promotedBulkActions}
        actions={bulkActions}
        disabled={loading}
      />
    </div>
  ) : null;

  const filterControlMarkup = filterControl ? (
    <div className={styles.FiltersWrapper}>{filterControl}</div>
  ) : null;

  const sortingSelectMarkup =
    sortOptions && sortOptions.length > 0 && !alternateTool ? (
      <div className={styles.SortWrapper}>
        <Select
          label={i18n.translate('Polaris.ResourceList.sortingLabel')}
          labelInline={!smallScreen}
          labelHidden={smallScreen}
          options={sortOptions}
          onChange={onSortChange}
          value={sortValue}
          disabled={selectMode}
        />
      </div>
    ) : null;

  const alternateToolMarkup =
    alternateTool && !sortingSelectMarkup ? (
      <div className={styles.AlternateToolWrapper}>{alternateTool}</div>
    ) : null;

  const headerTitleMarkup = (
    <div className={styles.HeaderTitleWrapper}>{headerTitle()}</div>
  );

  const selectButtonMarkup = isSelectable ? (
    <div className={styles.SelectButtonWrapper}>
      <Button
        disabled={selectMode}
        icon={EnableSelectionMinor}
        onClick={() => handleSelectMode(true)}
      >
        {i18n.translate('Polaris.ResourceList.selectButtonText')}
      </Button>
    </div>
  ) : null;

  const checkableButtonMarkup = isSelectable ? (
    <div className={styles.CheckableButtonWrapper}>
      <CheckableButton
        accessibilityLabel={selectAllActionsAccessibilityLabel()}
        label={headerTitle()}
        onToggleAll={handleToggleAll}
        plain
        disabled={loading}
      />
    </div>
  ) : null;

  const needsHeader =
    isSelectable || (sortOptions && sortOptions.length > 0) || alternateTool;

  const headerWrapperOverlay = loading ? (
    <div className={styles['HeaderWrapper-overlay']} />
  ) : null;

  const showEmptyState = emptyState && !itemsExist && !loading;

  const showEmptySearchState =
    !showEmptyState && filterControl && !itemsExist && !loading;

  const headerMarkup = !showEmptyState &&
    showHeader !== false &&
    !showEmptySearchState &&
    (showHeader || needsHeader) &&
    listRef.current && (
      <div className={styles.HeaderOuterWrapper}>
        <Sticky boundingElement={listRef.current}>
          {(isSticky: boolean) => {
            const headerClassName = classNames(
              styles.HeaderWrapper,
              sortOptions &&
                sortOptions.length > 0 &&
                !alternateTool &&
                styles['HeaderWrapper-hasSort'],
              alternateTool && styles['HeaderWrapper-hasAlternateTool'],
              isSelectable && styles['HeaderWrapper-hasSelect'],
              loading && styles['HeaderWrapper-disabled'],
              isSelectable &&
                selectMode &&
                styles['HeaderWrapper-inSelectMode'],
              isSticky && styles['HeaderWrapper-isSticky'],
            );
            return (
              <div className={headerClassName}>
                <EventListener event="resize" handler={handleResize} />
                {headerWrapperOverlay}
                <div className={styles.HeaderContentWrapper}>
                  {headerTitleMarkup}
                  {checkableButtonMarkup}
                  {alternateToolMarkup}
                  {sortingSelectMarkup}
                  {selectButtonMarkup}
                </div>
                {selectAllActionsMarkup}
              </div>
            );
          }}
        </Sticky>
      </div>
    );

  const emptySearchStateMarkup = showEmptySearchState
    ? emptySearchState || (
        <div className={styles.EmptySearchResultWrapper}>
          <EmptySearchResult {...emptySearchResultText} withIllustration />
        </div>
      )
    : null;

  const emptyStateMarkup = showEmptyState ? emptyState : null;

  const defaultTopPadding = 8;
  const topPadding = loadingPosition > 0 ? loadingPosition : defaultTopPadding;
  const spinnerStyle = {paddingTop: `${topPadding}px`};

  const spinnerSize = items.length < 2 ? 'small' : 'large';

  const loadingOverlay = loading ? (
    <>
      <li className={styles.SpinnerContainer} style={spinnerStyle}>
        <Spinner size={spinnerSize} accessibilityLabel="Items are loading" />
      </li>
      <li className={styles.LoadingOverlay} />
    </>
  ) : null;

  const className = classNames(
    styles.ItemWrapper,
    loading && styles['ItemWrapper-isLoading'],
  );
  const loadingWithoutItemsMarkup =
    loading && !itemsExist ? (
      <div className={className} tabIndex={-1}>
        {loadingOverlay}
      </div>
    ) : null;

  const resourceListClassName = classNames(
    styles.ResourceList,
    loading && styles.disabledPointerEvents,
    selectMode && styles.disableTextSelection,
  );

  const listMarkup = itemsExist ? (
    <ul
      className={resourceListClassName}
      ref={listRef}
      aria-live="polite"
      aria-busy={loading}
    >
      {loadingOverlay}
      {Children.toArray(items.map(renderItemWithId))}
    </ul>
  ) : null;

  // This is probably a legit error but I don't have the time to refactor this
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const context = {
    selectable: isSelectable,
    selectedItems,
    selectMode,
    resourceName,
    loading,
    onSelectionChange: handleSelectionChange,
    registerCheckableButtons: handleCheckableButtonRegistration,
  };

  return (
    <ResourceListContext.Provider value={context}>
      <div
        className={classNames(
          styles.ResourceListWrapper,
          Boolean(bulkActionsMarkup) &&
            selectMode &&
            styles.ResourceListWrapperWithBulkActions,
        )}
      >
        {filterControlMarkup}
        {headerMarkup}
        {listMarkup}
        {emptySearchStateMarkup}
        {emptyStateMarkup}
        {loadingWithoutItemsMarkup}
        {bulkActionsMarkup}
      </div>
    </ResourceListContext.Provider>
  );
};

ResourceList.Item = ResourceItem;
