import {useContext, useRef, useCallback} from 'react';

import {
  SELECT_ALL_ITEMS,
  SelectionType,
  HandleSelectionChange,
  Range,
  BulkSelectionDataOptions,
  HandleBulkSelectionOptions,
} from './types';
import {
  IndexContext,
  IndexRowContext,
  IndexSelectionChangeContext,
} from './context';

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

export function useBulkSelectionData({
  selectedItemsCount,
  itemCount,
  hasMoreItems,
  resourceName: passedResourceName,
}: BulkSelectionDataOptions) {
  const selectable = Boolean(selectedItemsCount);
  const selectMode = selectedItemsCount === 'All' || selectedItemsCount > 0;

  const defaultResourceName = {
    singular: 'Item',
    plural: 'Items',
  };

  const resourceName = passedResourceName
    ? passedResourceName
    : defaultResourceName;

  const paginatedSelectAllText = getPaginatedSelectAllText();

  const bulkActionsLabel = getBulkActionsLabel();
  const bulkActionsAccessibilityLabel = getBulkActionsAccessibilityLabel();

  let bulkSelectState: boolean | 'indeterminate' | undefined = 'indeterminate';
  if (!selectedItemsCount || selectedItemsCount === 0) {
    bulkSelectState = undefined;
  } else if (
    selectedItemsCount === SELECT_ALL_ITEMS ||
    selectedItemsCount === itemCount
  ) {
    bulkSelectState = true;
  }

  return {
    paginatedSelectAllText,
    bulkActionsLabel,
    bulkActionsAccessibilityLabel,
    resourceName,
    selectMode,
    bulkSelectState,
    selectable,
  };

  function getPaginatedSelectAllText() {
    if (!selectable || !hasMoreItems) {
      return;
    }

    if (selectedItemsCount === SELECT_ALL_ITEMS) {
      return `All ${itemCount}+ ${resourceName.plural.toLocaleLowerCase()} are selected.`;
    }
  }

  function getBulkActionsLabel() {
    const selectedItemsCountLabel =
      selectedItemsCount === SELECT_ALL_ITEMS
        ? `${itemCount}+`
        : selectedItemsCount;

    return `${selectedItemsCountLabel} selected.`;
  }

  function getBulkActionsAccessibilityLabel() {
    const totalItemsCount = itemCount;
    const allSelected = selectedItemsCount === totalItemsCount;

    if (totalItemsCount === 1 && allSelected) {
      return `Deselect ${resourceName.singular}`;
    } else if (totalItemsCount === 1) {
      return `Select ${resourceName.singular}`;
    } else if (allSelected) {
      return `Deselect all ${itemCount} ${resourceName.plural}`;
    } else {
      return `Select all ${itemCount} ${resourceName.plural}`;
    }
  }
}

export function useHandleBulkSelection({
  onSelectionChange = () => {},
}: HandleBulkSelectionOptions) {
  const lastSelected = useRef<number | null>(null);

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

  return handleSelectionChange;
}
