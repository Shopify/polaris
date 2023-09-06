import type {ThemeVarName} from '@shopify/polaris-tokens';
import {createThemeSelector, themeNameDefault} from '@shopify/polaris-tokens';

import {useCSSDecl} from './use-css-decl';
import {useThemeName} from './use-theme-name';

export function useThemeVarDecl(themeVarName: ThemeVarName) {
  const themeName = useThemeName();

  return useCSSDecl(
    themeVarName,
    themeName === themeNameDefault ? ':root' : createThemeSelector(themeName),
  );
}
