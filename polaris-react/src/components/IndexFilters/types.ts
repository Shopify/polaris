export interface SortButtonChoice {
  label: string;
  disabled?: boolean;
  value: string;
  directionLabel: string;
}

export interface IndexFiltersPrimaryAction {
  type: 'save' | 'save-as' | 'cancel';
  onAction: (name: string) => Promise<boolean>;
  disabled?: boolean;
  loading?: boolean;
}

export interface IndexFiltersCancelAction {
  onAction: () => void;
  disabled?: boolean;
  loading?: boolean;
}
