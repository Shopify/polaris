import React from 'react';

export interface MediaQueryContextType {
  isNavigationCollapsed: boolean;
}

export const MediaQueryContext = React.createContext<
  MediaQueryContextType | undefined
>(undefined);
