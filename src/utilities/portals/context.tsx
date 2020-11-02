import {createContext} from 'react';

export interface PortalsManager {
  portalsContainerRef: HTMLDivElement | null;
  setContainerNode(node: HTMLDivElement): void;
}

export const PortalsManagerContext = createContext<PortalsManager | undefined>(
  undefined,
);
