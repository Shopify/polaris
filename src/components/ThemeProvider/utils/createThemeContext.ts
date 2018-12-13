import {noop} from '@shopify/javascript-utilities/other';
import {Context as ThemeProviderContext} from '../ThemeProvider';
import {ThemeContext} from '../types';

export default function createThemeContext(
  theme?: ThemeContext,
): ThemeProviderContext {
  if (!theme) {
    return {polarisTheme: {logo: null, subscribe: noop, unsubscribe: noop}};
  }

  const {logo = null, subscribe = noop, unsubscribe = noop} = theme;
  return {polarisTheme: {logo, subscribe, unsubscribe}};
}
