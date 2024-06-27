import {useState} from 'react';

import {AppCardSizingMode} from '../types';

export function useAppCardSizing(sizingMode: AppCardSizingMode) {
  const [forceNarrow, setForceNarrow] = useState(false);
  const onNarrowChange = (isNarrow: boolean) => setForceNarrow(isNarrow);
  const isNarrow = sizingMode === AppCardSizingMode.AlwaysNarrow || forceNarrow;

  return {onNarrowChange, isNarrow};
}
