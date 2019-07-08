import {useContext} from 'react';
import {ThemeProviderContext} from './context';

export function useTheme() {
  return useContext(ThemeProviderContext);
}
