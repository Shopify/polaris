import ThemeProvider from './ThemeProvider';

export {
  Theme,
  ThemeContext,
  ColorsToParse,
  ThemeVariant,
  ThemeColors,
  THEME_CONTEXT_TYPES,
} from './types';
export {
  setColors,
  needsVariant,
  setTextColor,
  createThemeContext,
  setTheme,
} from './utils';
export {Props, Context} from './ThemeProvider';
export default ThemeProvider;
