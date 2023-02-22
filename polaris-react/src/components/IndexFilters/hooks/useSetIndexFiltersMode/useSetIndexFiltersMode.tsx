import {useState} from 'react';

export enum IndexFiltersMode {
  Default = 'DEFAULT',
  Filtering = 'FILTERING',
  EditingColumns = 'EDITING_COLUMNS',
}

export function useSetIndexFiltersMode(
  defaultMode: IndexFiltersMode = IndexFiltersMode.Default,
) {
  const [mode, setMode] = useState<IndexFiltersMode>(defaultMode);

  return {mode, setMode};
}
