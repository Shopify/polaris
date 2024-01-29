import React, {useMemo, useState} from 'react';

import {
  IndexContext,
  IndexRowContext,
  IndexCellContext,
  IndexCellPreviewContext,
  IndexSelectionChangeContext,
  useBulkSelectionData,
  useHandleBulkSelection,
} from '../../utilities/index-provider';
import type {IndexProviderProps} from '../../utilities/index-provider';
import {useHoverCardActivatorWrapperProps} from '../HoverCard';

export function IndexProvider({
  children,
  resourceName: passedResourceName,
  loading,
  onSelectionChange,
  selectedItemsCount = 0,
  itemCount,
  hasMoreItems,
  hasCellPreviews,
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

  const [activeCellPreview, setActiveCellPreview] =
    useState<React.ReactNode | null>();

  const {
    className: previewActivatorWrapperClassName,
    activatorElement: currentCellPreviewActivator,
    handleMouseEnterActivator,
    handleMouseLeaveActivator,
  } = useHoverCardActivatorWrapperProps({
    snapToParent: true,
  });

  const cellContextValue = useMemo(() => {
    const handleMouseEnterCell =
      (preview: React.ReactNode) =>
      (event: React.MouseEvent<HTMLDivElement>) => {
        setActiveCellPreview(preview);
        handleMouseEnterActivator(event);
      };

    const handleMouseLeaveCell = (event: React.MouseEvent<HTMLDivElement>) => {
      setActiveCellPreview(null);
      handleMouseLeaveActivator(event);
    };

    return hasCellPreviews
      ? {
          previewActivatorWrapperClassName,
          onMouseEnterCell: handleMouseEnterCell,
          onMouseLeaveCell: handleMouseLeaveCell,
        }
      : undefined;
  }, [
    hasCellPreviews,
    previewActivatorWrapperClassName,
    handleMouseEnterActivator,
    handleMouseLeaveActivator,
  ]);

  const cellPreviewContextValue = useMemo(
    () => ({activeCellPreview, currentCellPreviewActivator}),
    [activeCellPreview, currentCellPreviewActivator],
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
        <IndexCellContext.Provider value={cellContextValue}>
          <IndexCellPreviewContext.Provider value={cellPreviewContextValue}>
            <IndexSelectionChangeContext.Provider value={handleSelectionChange}>
              {children}
            </IndexSelectionChangeContext.Provider>
          </IndexCellPreviewContext.Provider>
        </IndexCellContext.Provider>
      </IndexRowContext.Provider>
    </IndexContext.Provider>
  );
}
