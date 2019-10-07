import React from 'react';
import {Features} from './types';

export const FeaturesContext = React.createContext<Features | undefined>(
  undefined,
);
