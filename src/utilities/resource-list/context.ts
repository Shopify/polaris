import React from 'react';
import {ResourceListSelectedItems} from './types';

export interface ResourceListContextType {
  selectMode?: boolean;
  selectable?: boolean;
  selectedItems?: ResourceListSelectedItems;
  resourceName?: {
    singular: string;
    plural: string;
  };
  loading?: boolean;
  onSelectionChange?(
    selected: boolean,
    id: string,
    sortNumber: number | undefined,
    shiftKey: boolean,
  ): void;
}

export const ResourceListContext = React.createContext<ResourceListContextType>(
  {},
);
