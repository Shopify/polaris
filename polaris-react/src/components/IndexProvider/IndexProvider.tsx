import React, {useMemo, useRef} from 'react';

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
import {useHoverCardActivatorWrapperProps} from '../AlphaHoverCard';

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

  const previewRef: React.RefObject<{
    preview: React.ReactNode;
    closePopover: (() => void) | null;
  }> = useRef({
    preview: null,
    closePopover: null,
  });

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
      (event: React.MouseEvent<HTMLButtonElement>) => {
        if (previewRef?.current) {
          previewRef.current.preview = preview;
        }
        handleMouseEnterActivator(event);
      };

    const handleMouseLeaveCell = (
      event: React.MouseEvent<HTMLButtonElement>,
    ) => {
      if (previewRef?.current) {
        previewRef.current.preview = null;
      }
      handleMouseLeaveActivator(event);
    };

    const closeOpenPopover = (closePopover: () => void | null) => {
      if (previewRef.current) {
        if (previewRef.current.closePopover) {
          previewRef.current.closePopover();
        }

        previewRef.current.closePopover = closePopover;
      }
    };

    const resetCloseOpenPopover = () => {
      if (previewRef.current) {
        previewRef.current.closePopover = null;
      }
    };

    return {
      previewActivatorWrapperClassName,
      onMouseEnterCell: handleMouseEnterCell,
      onMouseLeaveCell: handleMouseLeaveCell,
      closeOpenPopover,
      resetCloseOpenPopover,
    };
  }, [
    previewRef,
    previewActivatorWrapperClassName,
    handleMouseEnterActivator,
    handleMouseLeaveActivator,
  ]);

  const cellPreviewContextValue = useMemo(
    () => ({
      activeCellPreview: previewRef.current?.preview,
      currentCellPreviewActivator,
    }),
    [previewRef, currentCellPreviewActivator],
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
