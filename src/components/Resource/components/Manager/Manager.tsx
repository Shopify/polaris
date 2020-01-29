import React, {
  ReactNode,
  useMemo,
  useRef,
  useEffect,
  useCallback,
  useState,
} from 'react';
import {useI18n} from '../../../../utilities/i18n';
import {useMediaQuery} from '../../../../utilities/media-query';
import {
  ResourceManagerForEmptyStateContext,
  ResourceManagerForHeaderContext,
  ResourceManagerForListContext,
  ResourceManagerForItemContext,
  SelectionType,
  ResourceName,
  HandleSelectionChange,
  Range,
} from '../../../../utilities/resources';

import styles from './Manager.scss';

type OnSelection = (
  selectionType: SelectionType,
  toggleType: boolean,
  selection?: string | Range,
) => void;

export interface ManagerProps {
  selectable?: boolean;
  resourceName?: ResourceName;
  loading?: boolean;
  children?: ReactNode;
  hasItemsSelected: boolean;
  onSelection?: OnSelection;
}

export function Manager({
  selectable: selectableProp = true,
  resourceName,
  onSelection,
  hasItemsSelected,
  loading,
  children,
}: ManagerProps) {
  const i18n = useI18n();
  const {resourceListSmallScreen} = useMediaQuery();
  const defaultResourceName = useRef({
    singular: i18n.translate('Polaris.ResourceList.defaultItemSingular'),
    plural: i18n.translate('Polaris.ResourceList.defaultItemPlural'),
  });

  const [selectable, setSelectable] = useState(selectableProp);
  const [selectMode, setSelectMode] = useState(hasItemsSelected);

  const isSelectable = Boolean(selectable || selectableProp);

  const handleSelectable = useCallback(
    (nextPossibleSelectable) => {
      if (selectable === nextPossibleSelectable) return;
      setSelectable(nextPossibleSelectable);
    },
    [selectable],
  );

  useEffect(() => {
    if (hasItemsSelected && !selectMode) {
      setSelectMode(true);
    } else if (!hasItemsSelected && !resourceListSmallScreen) {
      setSelectMode(false);
    }
  }, [hasItemsSelected, resourceListSmallScreen, selectMode]);

  const lastSelected = useRef<number | null>(null);
  const handleSelection: HandleSelectionChange = useCallback(
    (
      selectionType: SelectionType,
      toggleType: boolean,
      selection?: string | Range,
      sortOrder?: number,
    ) => {
      if (!onSelection) return;

      const prevSelected = lastSelected.current;
      if (SelectionType.Multi && typeof sortOrder === 'number') {
        lastSelected.current = sortOrder;
      }
      if (
        selectionType === SelectionType.Single ||
        (selectionType === SelectionType.Multi &&
          (typeof prevSelected !== 'number' || typeof sortOrder !== 'number'))
      ) {
        onSelection(SelectionType.Single, toggleType, selection);
      } else if (selectionType === SelectionType.Multi) {
        const min = Math.min(prevSelected as number, sortOrder as number);
        const max = Math.max(prevSelected as number, sortOrder as number);
        onSelection(selectionType, toggleType, [min, max]);
      } else if (
        selectionType === SelectionType.Page ||
        selectionType === SelectionType.All
      ) {
        onSelection(selectionType, toggleType);
      }
    },
    [onSelection],
  );

  const handleSelectMode = useCallback(
    (selectMode) => {
      setSelectMode(selectMode);
      if (!selectMode) {
        handleSelection(SelectionType.All, false);
      }
    },
    [handleSelection],
  );

  const contextForEmptyState = useMemo(
    () => ({
      resourceName: resourceName || defaultResourceName.current,
    }),
    [resourceName],
  );

  const contextForHeader = useMemo(
    () => ({
      loading: Boolean(loading),
      selectable: isSelectable,
      onSelection: handleSelection,
      onSelectMode: handleSelectMode,
      onSelectable: handleSelectable,
      resourceName: resourceName || defaultResourceName.current,
      selectMode,
    }),
    [
      handleSelectMode,
      handleSelectable,
      handleSelection,
      isSelectable,
      loading,
      resourceName,
      selectMode,
    ],
  );

  const contextForList = useMemo(
    () => ({
      selectMode: hasItemsSelected,
      loading: Boolean(loading),
    }),
    [hasItemsSelected, loading],
  );

  const contextForItem = useMemo(
    () => ({
      onSelection: handleSelection,
      resourceName: resourceName || defaultResourceName.current,
    }),
    [handleSelection, resourceName],
  );

  const resourceAttributes = {
    'data-polaris-resource-selectable': isSelectable,
    'data-polaris-resource-select-mode': selectMode,
  };

  return (
    <ResourceManagerForEmptyStateContext.Provider value={contextForEmptyState}>
      <ResourceManagerForHeaderContext.Provider value={contextForHeader}>
        <ResourceManagerForListContext.Provider value={contextForList}>
          <ResourceManagerForItemContext.Provider value={contextForItem}>
            <div className={styles.ResourceListWrapper} {...resourceAttributes}>
              {children}
            </div>
          </ResourceManagerForItemContext.Provider>
        </ResourceManagerForListContext.Provider>
      </ResourceManagerForHeaderContext.Provider>
    </ResourceManagerForEmptyStateContext.Provider>
  );
}
