export type IndexSelectedItems = string[] | 'All';

export const SELECT_ALL_ITEMS = 'All';

export enum SelectionType {
  All = 'all',
  Page = 'page',
  Multi = 'multi',
  Single = 'single',
  Range = 'range',
}

export type Range = [number, number];

export interface IndexProviderProps {
  children?: React.ReactNode;
  selectable?: boolean;
  itemCount: number;
  selectedItemsCount?: typeof SELECT_ALL_ITEMS | number;
  resourceName?: {
    singular: string;
    plural: string;
  };
  loading?: boolean;
  hasMoreItems?: boolean;
  condensed?: boolean;
  onSelectionChange?(
    selectionType: SelectionType,
    toggleType: boolean,
    selection?: string | Range,
    position?: number,
  ): void;
  clearSelection?(): void;
}

export type HandleSelectionChange = (
  selectionType: SelectionType,
  toggleType: boolean,
  selection?: string | Range,
  sortOrder?: number,
) => void;

export interface BulkSelectionDataOptions {
  selectedItemsCount: number | typeof SELECT_ALL_ITEMS;
  itemCount: number;
  hasMoreItems?: boolean;
  resourceName?: {
    singular: string;
    plural: string;
  };
}

export interface HandleBulkSelectionOptions {
  onSelectionChange?(
    selectionType: SelectionType,
    toggleType: boolean,
    selection?: string | Range,
  ): void;
}
