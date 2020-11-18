import React, {useContext, useRef, useMemo, useCallback} from 'react';
import {useI18n} from '../../utilities/i18n';

import {
  IndexContext,
  IndexRowContext,
  IndexSelectionChangeContext,
  SELECT_ALL_ITEMS,
  IndexProviderProps,
  SelectionType,
  Range,
} from './utilities/index';

type HandleSelectionChange = (
  selectionType: SelectionType,
  toggleType: boolean,
  selection?: string | Range,
  sortOrder?: number,
) => void;

export function IndexProvider({
  children,
  resourceName: passedResourceName,
  loading,
  onSelectionChange = noop,
  selectedItemsCount,
  itemCount,
  hasMoreItems,
  condensed,
}: IndexProviderProps) {
  const selectable = Boolean(selectedItemsCount);

  const i18n = useI18n();
  const lastSelected = useRef<number | null>(null);

  const defaultResourceName = {
    singular: i18n.translate('Polaris.IndexTable.defaultItemSingular'),
    plural: i18n.translate('Polaris.IndexTable.defaultItemPlural'),
  };

  const selectMode = selectedItemsCount === 'All' || selectedItemsCount > 0;

  const handleSelectionChange: HandleSelectionChange = useCallback(
    (
      selectionType: SelectionType,
      toggleType: boolean,
      selection?: string | Range,
      sortOrder?: number,
    ) => {
      const prevSelected = lastSelected.current;

      if (SelectionType.Multi && typeof sortOrder === 'number') {
        lastSelected.current = sortOrder;
      }

      if (
        selectionType === SelectionType.Single ||
        (selectionType === SelectionType.Multi &&
          (typeof prevSelected !== 'number' || typeof sortOrder !== 'number'))
      ) {
        onSelectionChange(SelectionType.Single, toggleType, selection);
      } else if (selectionType === SelectionType.Multi) {
        const min = Math.min(prevSelected as number, sortOrder as number);
        const max = Math.max(prevSelected as number, sortOrder as number);
        onSelectionChange(selectionType, toggleType, [min, max]);
      } else if (
        selectionType === SelectionType.Page ||
        selectionType === SelectionType.All
      ) {
        onSelectionChange(selectionType, toggleType);
      }
    },
    [onSelectionChange],
  );

  let bulkSelectState: boolean | 'indeterminate' | undefined = 'indeterminate';
  if (!selectedItemsCount || selectedItemsCount === 0) {
    bulkSelectState = undefined;
  } else if (
    selectedItemsCount === SELECT_ALL_ITEMS ||
    selectedItemsCount === itemCount
  ) {
    bulkSelectState = true;
  }

  const resourceName = passedResourceName
    ? passedResourceName
    : defaultResourceName;

  const paginatedSelectAllText = getPaginatedSelectAllText();

  const bulkActionsLabel = getBulkActionsLabel();
  const bulkActionsAccessibilityLabel = getBulkActionsAccessibilityLabel();

  const contextValue = useMemo(
    () => ({
      itemCount,
      selectMode,
      selectable,
      resourceName,
      loading,
      paginatedSelectAllText,
      hasMoreItems,
      bulkActionsLabel,
      bulkActionsAccessibilityLabel,
      bulkSelectState,
      selectedItemsCount,
      condensed,
    }),
    [
      itemCount,
      selectMode,
      selectable,
      resourceName,
      loading,
      paginatedSelectAllText,
      hasMoreItems,
      bulkActionsLabel,
      bulkActionsAccessibilityLabel,
      bulkSelectState,
      selectedItemsCount,
      condensed,
    ],
  );

  const rowContextValue = useMemo(
    () => ({
      selectMode,
      condensed,
    }),
    [condensed, selectMode],
  );

  return (
    <IndexContext.Provider value={contextValue}>
      <IndexRowContext.Provider value={rowContextValue}>
        <IndexSelectionChangeContext.Provider
          value={handleSelectionChange as any}
        >
          {children}
        </IndexSelectionChangeContext.Provider>
      </IndexRowContext.Provider>
    </IndexContext.Provider>
  );

  function getPaginatedSelectAllText() {
    if (!selectable || !hasMoreItems) {
      return;
    }

    if (selectedItemsCount === SELECT_ALL_ITEMS) {
      return i18n.translate('Polaris.IndexTable.allItemsSelected', {
        itemsLength: itemCount,
        resourceNamePlural: resourceName.plural.toLocaleLowerCase(),
      });
    }
  }

  function getBulkActionsLabel() {
    const selectedItemsCountLabel =
      selectedItemsCount === SELECT_ALL_ITEMS
        ? `${itemCount}+`
        : selectedItemsCount;

    return i18n.translate('Polaris.IndexTable.selected', {
      selectedItemsCount: selectedItemsCountLabel,
    });
  }

  function getBulkActionsAccessibilityLabel() {
    const totalItemsCount = itemCount;
    const allSelected = selectedItemsCount === totalItemsCount;

    if (totalItemsCount === 1 && allSelected) {
      return i18n.translate(
        'Polaris.IndexTable.a11yCheckboxDeselectAllSingle',
        {
          resourceNameSingular: resourceName.singular,
        },
      );
    } else if (totalItemsCount === 1) {
      return i18n.translate('Polaris.IndexTable.a11yCheckboxSelectAllSingle', {
        resourceNameSingular: resourceName.singular,
      });
    } else if (allSelected) {
      return i18n.translate(
        'Polaris.IndexTable.a11yCheckboxDeselectAllMultiple',
        {
          itemsLength: itemCount,
          resourceNamePlural: resourceName.plural,
        },
      );
    } else {
      return i18n.translate(
        'Polaris.IndexTable.a11yCheckboxSelectAllMultiple',
        {
          itemsLength: itemCount,
          resourceNamePlural: resourceName.plural,
        },
      );
    }
  }
}

export function useIndexSelectionChange() {
  const onSelectionChange = useContext(IndexSelectionChangeContext);
  if (!onSelectionChange) {
    throw new Error(`Missing IndexProvider context`);
  }
  return onSelectionChange;
}

export function useIndexRow() {
  const indexRow = useContext(IndexRowContext);
  if (!indexRow) {
    throw new Error(`Missing IndexProvider context`);
  }
  return indexRow;
}

export function useIndexValue() {
  const index = useContext(IndexContext);
  if (!index) {
    throw new Error(`Missing IndexProvider context`);
  }
  return index;
}

function noop() {}
