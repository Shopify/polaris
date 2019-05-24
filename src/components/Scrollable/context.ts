import React from 'react';

export interface ScrollableContextType {
  scrollToPosition?(scrollY: number): void;
}

const ScrollableContext = React.createContext<ScrollableContextType>({});

export default ScrollableContext;
