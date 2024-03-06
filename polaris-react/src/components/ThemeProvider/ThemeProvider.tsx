import React from 'react';
import type {ThemeName} from '@shopify/polaris-tokens';
import {themeNameDefault, createThemeClassName} from '@shopify/polaris-tokens';

import {ThemeContext, getTheme} from '../../utilities/use-theme';
import {classNames} from '../../utilities/css';

export interface ThemeProviderProps {
  as?: keyof React.ReactHTML;
  children: React.ReactNode;
  className?: string;
  theme?: ThemeName;
}

export function ThemeProvider(props: ThemeProviderProps) {
  const {
    as: ThemeContainer = 'div',
    children,
    className,
    theme: themeName = themeNameDefault,
  } = props;

  return (
    <ThemeContext.Provider value={getTheme(themeName)}>
      <ThemeContainer
        className={classNames(createThemeClassName(themeName), className)}
      >
        {children}
      </ThemeContainer>
    </ThemeContext.Provider>
  );
}
