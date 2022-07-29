export type SortDirection = 'ascending' | 'descending' | 'none';
export type VerticalAlign = 'top' | 'bottom' | 'middle' | 'baseline';

export interface ColumnVisibilityData {
  leftEdge: number;
  rightEdge: number;
  isVisible?: boolean;
  width: number;
  index: number;
}

export interface DataTableState {
  condensed: boolean;
  columnVisibilityData: ColumnVisibilityData[];
  previousColumn?: ColumnVisibilityData;
  currentColumn?: ColumnVisibilityData;
  sortedColumnIndex?: number;
  sortDirection?: SortDirection;
  isScrolledFarthestLeft?: boolean;
  isScrolledFarthestRight?: boolean;
  rowHovered: number | undefined;
}
