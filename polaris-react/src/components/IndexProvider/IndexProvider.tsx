import React, {useMemo} from 'react';

import {
  IndexContext,
  IndexRowContext,
  IndexSelectionContext,
  useBulkSelectionData,
  useHandleBulkSelection,
} from '../../utilities/index-provider';
import type {IndexProviderProps} from '../../utilities/index-provider';

export function IndexProvider({
  children,
  resourceName: passedResourceName,
  loading,
  onSelectionChange,
  clearSelection,
  selectedItemsCount = 0,
  itemCount,
  hasMoreItems,
  condensed,
  selectable: isSelectableIndex = true,
}: IndexProviderProps) {
  const {
    paginatedSelectAllText,
    bulkActionsLabel,
    bulkActionsAccessibilityLabel,
    resourceName,
    selectMode,
    bulkSelectState,
  } = useBulkSelectionData({
    selectedItemsCount,
    itemCount,
    hasMoreItems,
    resourceName: passedResourceName,
  });
  const handleSelectionChange = useHandleBulkSelection({onSelectionChange});
  const selectionContext = useMemo(
    () => ({handleSelectionChange, handleClearSelection: clearSelection}),
    [handleSelectionChange, clearSelection],
  );

  const contextValue = useMemo(
    () => ({
      itemCount,
      selectMode: selectMode && isSelectableIndex,
      selectable: isSelectableIndex,
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
      isSelectableIndex,
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
      selectable: isSelectableIndex,
      selectMode: selectMode && isSelectableIndex,
      condensed,
    }),
    [condensed, selectMode, isSelectableIndex],
  );

  return (
    <IndexContext.Provider value={contextValue}>
      <IndexRowContext.Provider value={rowContextValue}>
        <IndexSelectionContext.Provider value={selectionContext}>
          {children}
        </IndexSelectionContext.Provider>
      </IndexRowContext.Provider>
    </IndexContext.Provider>
  );
}
