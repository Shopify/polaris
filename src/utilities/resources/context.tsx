import {createContext} from 'react';
import {
  ResourceName,
  HandleSelectMode,
  HandleSelectable,
  HandleSelectionChange,
} from './types';

export const ResourceManagerForEmptyStateContext = createContext<
  | {
      resourceName: ResourceName;
    }
  | undefined
>(undefined);

export const ResourceManagerForHeaderContext = createContext<
  | {
      loading: boolean;
      selectable: boolean;
      selectMode: boolean;
      resourceName: ResourceName;
      onSelection: HandleSelectionChange;
      onSelectMode: HandleSelectMode;
      onSelectable: HandleSelectable;
    }
  | undefined
>(undefined);

export const ResourceManagerForListContext = createContext<
  | {
      selectMode: boolean;
      loading: boolean;
    }
  | undefined
>(undefined);

export const ResourceManagerForItemContext = createContext<
  | {
      resourceName: ResourceName;
      onSelection: HandleSelectionChange;
    }
  | undefined
>(undefined);
