import {createContext, useContext} from 'react';
import type {ThemeName, Theme} from '@shopify/polaris-tokens';
import {themes} from '@shopify/polaris-tokens';

export const ThemeContext = createContext<Theme | null>(null);
export const ThemeNameContext = createContext<ThemeName | null>(null);

export function getTheme(themeName: ThemeName): Theme {
  return themes[themeName];
}

export function useTheme() {
  const theme = useContext(ThemeContext);

  if (!theme) {
    throw new Error(
      'No theme was provided. Your application must be wrapped in an <AppProvider> or <ThemeProvider> component. See https://polaris.shopify.com/components/app-provider for implementation instructions.',
    );
  }

  return theme;
}

export function useThemeName() {
  const themeName = useContext(ThemeNameContext);

  if (!themeName) {
    throw new Error(
      'No themeName was provided. Your application must be wrapped in an <AppProvider> or <ThemeProvider> component. See https://polaris.shopify.com/components/app-provider for implementation instructions.',
    );
  }

  return themeName;
}

export function UseTheme(props: {children(theme: Theme): JSX.Element}) {
  const theme = useTheme();

  return props.children(theme);
}
