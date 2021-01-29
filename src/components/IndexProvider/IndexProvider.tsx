import React, {useMemo} from 'react';

import {
  IndexContext,
  IndexRowContext,
  IndexSelectionChangeContext,
  IndexProviderProps,
  useBulkSelectionData,
  useHandleBulkSelection,
} from '../../utilities/index-provider';

export function IndexProvider({
  children,
  resourceName: passedResourceName,
  loading,
  onSelectionChange,
  selectedItemsCount,
  itemCount,
  hasMoreItems,
  condensed,
}: IndexProviderProps) {
  const {
    paginatedSelectAllText,
    bulkActionsLabel,
    bulkActionsAccessibilityLabel,
    resourceName,
    selectMode,
    bulkSelectState,
    selectable,
  } = useBulkSelectionData({
    selectedItemsCount,
    itemCount,
    hasMoreItems,
    resourceName: passedResourceName,
  });
  const handleSelectionChange = useHandleBulkSelection({onSelectionChange});

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
        <IndexSelectionChangeContext.Provider value={handleSelectionChange}>
          {children}
        </IndexSelectionChangeContext.Provider>
      </IndexRowContext.Provider>
    </IndexContext.Provider>
  );
}
