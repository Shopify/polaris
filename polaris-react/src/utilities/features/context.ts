import {createContext} from 'react';

import type {FeaturesConfig} from './types';

export const FeaturesContext = createContext<FeaturesConfig | undefined>(
  undefined,
);
