import {createContext} from 'react';

// This is internal, but TS throws a build-time error if we don't export it
export interface MediaQueryContextType {
  isNavigationCollapsed: boolean;
}

export const MediaQueryContext = createContext<
  MediaQueryContextType | undefined
>(undefined);
