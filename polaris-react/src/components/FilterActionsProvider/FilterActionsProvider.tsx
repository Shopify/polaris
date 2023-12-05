import type {PropsWithChildren} from 'react';
import React, {createContext} from 'react';

export const FilterActionsContext = createContext<boolean>(false);

type FilterActionsProviderProps = PropsWithChildren<{
  filterActions: boolean;
}>;

export function FilterActionsProvider({
  children,
  filterActions,
}: FilterActionsProviderProps) {
  return (
    <FilterActionsContext.Provider value={filterActions}>
      {children}
    </FilterActionsContext.Provider>
  );
}
