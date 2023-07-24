import {createContext} from 'react';

import type {FeaturesConfig} from './types';

export const classNamePolarisSummerEditions2023 =
  'Polaris-Summer-Editions-2023';
export const classNamePolarisSummerEditions2023ShadowBevelOptOut =
  'Polaris-SE23-Shadow-Bevel-Opt-Out';

export const FeaturesContext = createContext<FeaturesConfig | undefined>(
  undefined,
);
