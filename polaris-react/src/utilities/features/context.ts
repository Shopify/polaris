import {createContext} from 'react';

import type {Features} from './types';

export const FeaturesContext = createContext<Features | undefined>(undefined);
