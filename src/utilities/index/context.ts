import React from 'react';
import {IndexSelectedItems} from './types';

export interface IndexContextType {
  items?: any[];
  selectMode?: boolean;
  selectable?: boolean;
  selectedItems?: IndexSelectedItems;
  resourceName?: {
    singular: string;
    plural: string;
  };
  loading?: boolean;
  bulkSelectState?: boolean | 'indeterminate';
  onSelectionChange?(selected: boolean, id: string): void;
  idForItem?(item: any, index: number): string;
  resolveItemId?(item: any): string;
}

export const IndexContext = React.createContext<IndexContextType>({});
