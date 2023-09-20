import type {ContextType} from 'react';
import React, {useMemo, useState} from 'react';

import {IndexFiltersModeContext} from './context';
import {IndexFiltersMode} from './types';

export interface IndexFiltersManagerProps {
  children?: React.ReactNode;
}

type Context = NonNullable<ContextType<typeof IndexFiltersModeContext>>;

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
    <IndexFiltersModeContext.Provider value={value}>
      {children}
    </IndexFiltersModeContext.Provider>
  );
}
