import {createContext} from 'react';

import type {FeaturesConfig} from './types';

export const summerEditions2023ClassName = 'Polaris-Summer-Editions-2023';

export const FeaturesContext = createContext<FeaturesConfig | undefined>(
  undefined,
);
