import type {ContextType} from 'react';
import React, {useMemo, useState} from 'react';

import {
  IndexFiltersContext,
  IndexFiltersMode,
} from '../../utilities/index-filters';

export interface IndexFiltersManagerProps {
  children?: React.ReactNode;
}

type Context = NonNullable<ContextType<typeof IndexFiltersContext>>;

export function IndexFiltersManager({children}: IndexFiltersManagerProps) {
  const [mode, setMode] = useState<Context['mode']>(IndexFiltersMode.Default);

  const value = useMemo(
    () => ({
      mode,
      setMode,
    }),
    [mode, setMode],
  );

  return (
    <IndexFiltersContext.Provider value={value}>
      {children}
    </IndexFiltersContext.Provider>
  );
}
