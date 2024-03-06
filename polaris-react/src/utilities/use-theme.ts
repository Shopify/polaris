import {createContext, useContext} from 'react';
import type {ThemeName, Theme} from '@shopify/polaris-tokens';
import {themes} from '@shopify/polaris-tokens';

type ThemeContextValue = Theme & {themeName: ThemeName};

export function getTheme(themeName: ThemeName): ThemeContextValue {
  return {...themes[themeName], themeName};
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme() {
  const theme = useContext(ThemeContext);

  if (!theme) {
    throw new Error(
      'No theme was provided. Your application must be wrapped in an <AppProvider> component. See https://polaris.shopify.com/components/app-provider for implementation instructions.',
    );
  }

  return theme;
}

export function UseTheme(props: {children(theme: Theme): JSX.Element}) {
  const theme = useTheme();

  return props.children(theme);
}
