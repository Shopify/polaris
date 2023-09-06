import type {ThemeName} from '@shopify/polaris-tokens';
import {themeNameDefault} from '@shopify/polaris-tokens';
import {createContext, useContext} from 'react';

export const ThemeNameContext = createContext<ThemeName>(themeNameDefault);

export function useThemeName() {
  const themeName = useContext(ThemeNameContext);

  if (!themeName) {
    throw new Error(
      'No themeName was provided. Your application must be wrapped in an <AppProvider> component. See https://polaris.shopify.com/components/app-provider for implementation instructions.',
    );
  }

  return themeName;
}
