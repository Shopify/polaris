import {
  useIndexFiltersManager,
  IndexFiltersMode,
} from '../../../../utilities/index-filters';

export function useSetIndexFiltersMode(
  defaultMode: IndexFiltersMode = IndexFiltersMode.Default,
) {
  const {mode, setMode} = useIndexFiltersManager(defaultMode);

  return {mode, setMode};
}
