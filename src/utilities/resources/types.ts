export interface ResourceName {
  singular: string;
  plural: string;
}

export type Range = [number, number];

export enum SelectionType {
  All = 'all',
  Page = 'page',
  Multi = 'multi',
  Single = 'single',
}

export type HandleSelectionChange = (
  selectionType: SelectionType,
  toggleType: boolean,
  selection?: string | Range,
  sortOrder?: number,
) => void;

export type HandleSelectMode = (selectMode: boolean) => void;
export type HandleSelectable = (nextPossibleSelectable: boolean) => void;

export type ResourceIDResolver = (resource: unknown) => string;
