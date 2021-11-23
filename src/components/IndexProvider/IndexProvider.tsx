import {useMemo} from 'react';

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
        <IndexSelectionChangeContext.Provider value={handleSelectionChange}>
          {children}
        </IndexSelectionChangeContext.Provider>
      </IndexRowContext.Provider>
    </IndexContext.Provider>
  );
}
