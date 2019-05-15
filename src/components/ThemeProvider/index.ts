import ThemeProvider from './ThemeProvider';

export {Theme, ColorsToParse, ThemeVariant, ThemeColors} from './types';
export {
  default as ThemeProviderContext,
  ThemeProviderContextType,
} from './context';
export {
  setColors,
  needsVariant,
  setTextColor,
  createThemeContext,
  setTheme,
} from './utils';
export {Props} from './ThemeProvider';
export default ThemeProvider;
