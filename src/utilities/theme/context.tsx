import React from 'react';
import {Theme} from './types';

export interface ThemeContextType {
  logo: Theme['logo'] | null;
}

export const ThemeProviderContext = React.createContext<ThemeContextType>({
  logo: null,
});
