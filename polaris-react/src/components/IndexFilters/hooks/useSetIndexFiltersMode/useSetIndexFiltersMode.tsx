import {useState} from 'react';

import {IndexFiltersMode} from '../../types';

export function useSetIndexFiltersMode(
  defaultMode: IndexFiltersMode = IndexFiltersMode.Default,
) {
  const [mode, setMode] = useState<IndexFiltersMode>(defaultMode);

  return {mode, setMode};
}
