import React from 'react';

import type {Features} from './types';

export const FeaturesContext = React.createContext<Features | undefined>(
  undefined,
);
