import {createContext} from 'react';

import type {SelectionType, SELECT_ALL_ITEMS, Range} from './types';

export interface IndexContextType {
  loading?: boolean;
  bulkSelectState?: boolean | 'indeterminate';
  resourceName: {
    singular: string;
    plural: string;
  };
  selectedItemsCount: typeof SELECT_ALL_ITEMS | number;
  bulkActionsAccessibilityLabel?: string;
  selectMode: boolean;
  paginatedSelectAllText?: string;
  itemCount: number;
  selectable?: boolean;
  hasMoreItems?: boolean;
  condensed?: boolean;
}

export const IndexContext = createContext<IndexContextType | undefined>(
  undefined,
);

export const IndexSelectionChangeContext = createContext<
  | ((
      selectionType: SelectionType,
      toggleType: boolean,
      selection?: string | Range,
      position?: number,
    ) => void)
  | undefined
>(undefined);

export interface IndexRowContextType {
  selectable: boolean;
  selectMode: boolean;
  condensed?: boolean;
}

export const IndexRowContext = createContext<IndexRowContextType | undefined>(
  undefined,
);
