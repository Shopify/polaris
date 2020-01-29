import React from 'react';

// This is internal, but TS throws a build-time error if we don't export it
export interface MediaQueryContextType {
  isNavigationCollapsed: boolean;
  resourceListSmallScreen: boolean;
}

export const MediaQueryContext = React.createContext<
  MediaQueryContextType | undefined
>(undefined);
