export type IndexSelectedItems = string[] | 'All';

export const SELECT_ALL_ITEMS = 'All';

export enum SelectionType {
  All = 'all',
  Page = 'page',
  Multi = 'multi',
  Single = 'single',
}

export type Range = [number, number];

export interface IndexProviderProps<T = any> {
  children?: React.ReactNode;
  selectable?: boolean;
  itemCount: number;
  selectedItemsCount: typeof SELECT_ALL_ITEMS | number;
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
  ): void;
  resolveItemId?(item: T): string;
}
