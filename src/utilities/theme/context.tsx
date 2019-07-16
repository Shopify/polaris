import React from 'react';
import {Theme} from './types';

export interface ThemeContextType {
  logo: Theme['logo'] | null;
}

export const ThemeContext = React.createContext<ThemeContextType>({
  logo: null,
});
