import React, {useContext, useState} from 'react';

import {
  IndexContext,
  IndexSelectedItems,
  SELECT_ALL_ITEMS,
} from '../../utilities/index';

export interface IndexProviderProps {
  items: any[];
  children?: React.ReactNode;
  selectMode?: boolean;
  selectable?: boolean;
  selectedItems?: IndexSelectedItems;
  resourceName?: {
    singular: string;
    plural: string;
  };
  loading?: boolean;
  onSelectionChange?(selectedItems: IndexSelectedItems): void;
  idForItem?(item: any, index: number): string;
  resolveItemId?(item: any): string;
}

export function IndexProvider({
  children,
  items,
  selectMode,
  selectable,
  selectedItems,
  resourceName,
  loading,
  onSelectionChange,
  idForItem,
  resolveItemId,
}: IndexProviderProps) {
  const [lastSelected, setLastSelected] = useState(null);

  const getItemId = idForItem ? idForItem : defaultIdForItem;

  const handleSelectionChange = (
    selected: boolean,
    id: string,
    sortOrder?: number,
    shiftKey?: boolean,
  ) => {
    if (onSelectionChange == null) {
      return;
    }
    if (id === SELECT_ALL_ITEMS) {
      handleMultiSelection(selected);
    } else {
      handleSingleSelection(selected, id, sortOrder, shiftKey);
    }
  };

  const handleMultiSelectionChange = (
    lastSelected: number,
    currentSelected: number,
    resolveItemId: (item: any) => string,
  ) => {
    const min = Math.min(lastSelected, currentSelected);
    const max = Math.max(lastSelected, currentSelected);
    return items.slice(min, max + 1).map(resolveItemId);
  };

  const getAllItemsOnPage = (
    items: any,
    idForItem: (item: any, index: number) => string,
  ) => {
    return items.map((item: any, index: number) => {
      return idForItem(item, index);
    });
  };

  let bulkSelectState: boolean | 'indeterminate' | undefined = 'indeterminate';
  if (
    !selectedItems ||
    (Array.isArray(selectedItems) && selectedItems.length === 0)
  ) {
    bulkSelectState = undefined;
  } else if (
    selectedItems === SELECT_ALL_ITEMS ||
    (Array.isArray(selectedItems) && selectedItems.length === items.length)
  ) {
    bulkSelectState = true;
  }

  return (
    <IndexContext.Provider
      value={{
        items,
        selectMode,
        selectable,
        selectedItems,
        resourceName,
        loading,
        onSelectionChange: handleSelectionChange,
        idForItem,
        resolveItemId,
        bulkSelectState,
      }}
    >
      {children}
    </IndexContext.Provider>
  );

  function defaultIdForItem(item: any, index: number) {
    return item.hasOwnProperty('id') ? item.id : index.toString();
  }

  function handleSingleSelection(
    selected: boolean,
    id: string,
    sortOrder?: number,
    shiftKey?: boolean,
  ) {
    const oldSelectedItems = selectedItems ? selectedItems : [];

    let newlySelectedItems = [];

    newlySelectedItems =
      selectedItems === SELECT_ALL_ITEMS
        ? getAllItemsOnPage(items, getItemId)
        : [...oldSelectedItems];

    if (sortOrder !== undefined) {
      setLastSelected(sortOrder);
    }

    let selectedIds: string[] = [id];

    if (
      shiftKey &&
      lastSelected != null &&
      sortOrder !== undefined &&
      resolveItemId
    ) {
      selectedIds = handleMultiSelectionChange(
        lastSelected,
        sortOrder,
        resolveItemId,
      );
    }
    newlySelectedItems = [...new Set([...newlySelectedItems, ...selectedIds])];

    if (!selected) {
      for (let i = 0; i < selectedIds.length; i++) {
        newlySelectedItems.splice(
          newlySelectedItems.indexOf(selectedIds[i]),
          1,
        );
      }
    }

    if (onSelectionChange) {
      onSelectionChange(newlySelectedItems);
    }
  }

  function handleMultiSelection(selected: boolean) {
    let newlySelectedItems;
    if (selected) {
      newlySelectedItems =
        selected && selectedItems === SELECT_ALL_ITEMS
          ? getAllItemsOnPage(items, getItemId)
          : SELECT_ALL_ITEMS;
    } else {
      newlySelectedItems = [];
    }

    if (onSelectionChange) {
      onSelectionChange(newlySelectedItems);
    }
  }
}

export const useIndexValue = () => useContext(IndexContext);
