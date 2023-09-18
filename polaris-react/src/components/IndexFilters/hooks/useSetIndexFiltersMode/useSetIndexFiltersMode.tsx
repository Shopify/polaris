import {useEffect} from 'react';

import {
  useIndexFiltersManager,
  IndexFiltersMode,
} from '../../../../utilities/index-filters';

export function useSetIndexFiltersMode(
  defaultMode: IndexFiltersMode = IndexFiltersMode.Default,
) {
  const {mode, setMode} = useIndexFiltersManager();

  useEffect(() => {
    setMode(defaultMode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultMode]);

  return {mode, setMode};
}
