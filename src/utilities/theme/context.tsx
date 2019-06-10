import React from 'react';
import {Theme} from './types';

export interface ThemeProviderContextType {
  logo: Theme['logo'] | null;
}

export const ThemeProviderContext = React.createContext<
  ThemeProviderContextType
>({
  logo: null,
});
