import React from 'react';
import {Theme} from './types';

export interface ThemeProviderContextType {
  logo: Theme['logo'] | null;
}

const ThemeContext = React.createContext<ThemeProviderContextType>({
  logo: null,
});

export default ThemeContext;
