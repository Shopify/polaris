import React from 'react';
import {themeNameDefault, createThemeClassName} from '@shopify/polaris-tokens';

import {
  ThemeContext,
  getTheme,
  ThemeNameContext,
} from '../../utilities/use-theme';
import {classNames} from '../../utilities/css';

import styles from './ThemeProvider.module.scss';

/**
 * Allowlist of local themes
 * TODO: Replace `as const` with `satisfies ThemeName[]`
 */
export const themeNamesLocal = ['light', 'dark'] as const;

type ThemeNameLocal = typeof themeNamesLocal[number];

export const isThemeNameLocal = (name: string): name is ThemeNameLocal =>
  themeNamesLocal.includes(name as any);

export interface ThemeProviderProps {
  as?: keyof React.ReactHTML;
  children: React.ReactNode;
  className?: string;
  theme?: ThemeNameLocal;
  'data-portal-id'?: string;
}

export function ThemeProvider(props: ThemeProviderProps) {
  const {
    as: ThemeContainer = 'div',
    children,
    className,
    theme: themeName = themeNameDefault,
  } = props;

  return (
    <ThemeNameContext.Provider value={themeName}>
      <ThemeContext.Provider value={getTheme(themeName)}>
        <ThemeContainer
          data-portal-id={props['data-portal-id']}
          className={classNames(
            createThemeClassName(themeName),
            styles.themeContainer,
            className,
          )}
        >
          {children}
        </ThemeContainer>
      </ThemeContext.Provider>
    </ThemeNameContext.Provider>
  );
}
