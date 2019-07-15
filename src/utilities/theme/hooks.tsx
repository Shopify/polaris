import {useContext} from 'react';
import {ThemeContext} from './context';

export function useTheme() {
  return useContext(ThemeContext);
}
