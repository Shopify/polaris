import type {ReactNode} from 'react';
import type {
  FilterInterface,
  AppliedFilterInterface,
  SelectOption,
} from '@shopify/polaris';
import type {DisabledInfo} from 'components/DisabledTooltipWrapper';
import type {SavedViewSortOrder} from 'types/graphql/core-types';

import type {FiltersProps} from './components/Filters';

export enum IndexFilterViewState {
  Default = 'DEFAULT',
  Filtering = 'FILTERING',
}

export interface SortButtonChoice {
  label: string;
  disabled?: boolean;
  value: string;
  directionLabel: string;
}

export enum IndexFiltersUpdateAction {
  Update = 'UPDATE',
  SaveAs = 'SAVE_AS',
}

export interface FilterInterfaceWithAction extends FilterInterface {
  onAction?: () => void;
  pinned?: boolean;
}

export type SortDirection =
  | SavedViewSortOrder.Ascending
  | SavedViewSortOrder.Descending;

export interface Column {
  label: string | ReactNode;
  value: string;
  disabled?: boolean;
}

export interface FilterOptions
  extends Omit<
    FiltersProps,
    'onClearAll' | 'disabled' | 'filteringDisabled' | 'hideTags'
  > {
  /** Callback when clearing all filters */
  onClearAllFilters?(): void;

  /** Disable all filters */
  disabled?: DisabledInfo;

  /** Sort props */
  sortValue: string;
  sortOptions: SelectOption[];
  onSortChange(selected: string, id: string): void;
  sortToggleLabels?: {[key: string]: {asc: string; desc: string}};
  sortDirection?: SortDirection;
  onSortDirectionChange?(direction: SortDirection): void;

  /** New filter props */
  stagedFilters: string[];
  transformRemoveFilterKey?(key: string): string;
  onStagedFiltersChange(stagedFilters: string[]): void;
  condensedAppliedFilters?: AppliedFilterInterface[];
  onFilterListOpen?(): void;

  /** Column props */
  columns: Column[];
  selectedColumns: string[];

  /** @deprecated Added for development and will be removed in the future */
  hideColumnsUI: boolean;
  onColumnChange(updatedColumns: string[]): void;
  onColumnReorder(columns: Column[], value: string): void;
  onColumnActivatorHover?(): void;
  dragMin?: number;
  disableDrag?: boolean;
}
