import ThemeProvider from './ThemeProvider';

export {
  Theme,
  ThemeProviderContext,
  ColorsToParse,
  ThemeVariant,
  ThemeColors,
  THEME_CONTEXT_TYPES,
} from './types';
export {Provider, Consumer} from './components';
export {
  setColors,
  needsVariant,
  setTextColor,
  createThemeContext,
  setTheme,
} from './utils';
export {Props} from './ThemeProvider';
export default ThemeProvider;
