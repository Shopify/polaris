import React from 'react';

type MediaQueryContextType = {
  isNavigationCollapsed: boolean;
};

export const MediaQueryContext = React.createContext<
  MediaQueryContextType | undefined
>(undefined);
