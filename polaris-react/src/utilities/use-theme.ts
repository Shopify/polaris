import type {ThemeName} from '@shopify/polaris-tokens';
import {
  themePartials,
  themeNameDefault,
  createThemeVariant,
} from '@shopify/polaris-tokens';
import {createContext, useContext} from 'react';

export function getTheme(themeName: ThemeName) {
  return createThemeVariant(themePartials[themeName]);
}

export const ThemeContext = createContext(getTheme(themeNameDefault));

export function useTheme() {
  const theme = useContext(ThemeContext);

  if (!theme) {
    throw new Error(
      'No theme was provided. Your application must be wrapped in an <AppProvider> component. See https://polaris.shopify.com/components/app-provider for implementation instructions.',
    );
  }

  return theme;
}
