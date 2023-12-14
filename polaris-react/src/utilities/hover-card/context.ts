import {createContext} from 'react';

export interface HoverCardContextType {
  /** Wraps the activator with the activatorWrapper configured by the HoverCard to handle mouse events. Use when more than one element activates the same HoverCard, like an IndexTable column of commerce objects.  */
  onMouseLeave?(): void;
  onMouseOver?(): void;
}

export const HoverCardContext = createContext<HoverCardContextType | null>(
  null,
);
