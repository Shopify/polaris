import {createContext} from 'react';

import type {FeaturesConfig} from '../features';

import type {PortalsContainerElement} from './types';

export interface PortalsManager {
  container: PortalsContainerElement;
  features?: FeaturesConfig;
}

export const PortalsManagerContext = createContext<PortalsManager | undefined>(
  undefined,
);
