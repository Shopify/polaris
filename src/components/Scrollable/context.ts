import React from 'react';

type ScrollToPositionFn = (scrollY: number) => void;

export const ScrollableContext = React.createContext<
  ScrollToPositionFn | undefined
>(undefined);
