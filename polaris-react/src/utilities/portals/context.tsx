import {createContext} from 'react';

import type {PortalsContainerElement} from './types';

export interface PortalsManager {
  container: PortalsContainerElement;
}

export const PortalsManagerContext = createContext<PortalsManager | undefined>(
  undefined,
);
