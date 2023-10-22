import {createContext} from 'react';

type ScrollToPositionFn = (scrollY: number) => void;

export const ScrollableContext = createContext<ScrollToPositionFn | undefined>(
  undefined,
);
