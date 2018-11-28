export type SelectedItems = string[] | 'All';

export const SELECT_ALL_ITEMS = 'All';

export interface ResourceListContext {
  selectMode: boolean;
  selectable?: boolean;
  selectedItems?: SelectedItems;
  resourceName: {
    singular: string;
    plural: string;
  };
  loading?: boolean;
  onSelectionChange?(selected: boolean, id: string): void;
}
