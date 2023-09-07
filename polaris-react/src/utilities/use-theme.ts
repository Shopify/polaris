import {createContext, useContext} from 'react';
import type {ThemeName} from '@shopify/polaris-tokens';
import {themes} from '@shopify/polaris-tokens';

export type Theme = typeof themes[ThemeName];

export function getTheme(themeName: ThemeName): Theme {
  return themes[themeName];
}

export const ThemeContext = createContext<Theme | null>(null);

export function useTheme() {
  const theme = useContext(ThemeContext);

  if (!theme) {
    throw new Error(
      'No theme was provided. Your application must be wrapped in an <AppProvider> component. See https://polaris.shopify.com/components/app-provider for implementation instructions.',
    );
  }

  return theme;
}
