import React from 'react';
import type {ThemeNameLocal} from '@shopify/polaris-tokens';
import {themeNameDefault, createThemeClassName} from '@shopify/polaris-tokens';

import {ThemeContext, getTheme} from '../../utilities/use-theme';
import {classNames} from '../../utilities/css';

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
    <ThemeContext.Provider value={getTheme(themeName)}>
      <ThemeContainer
        className={classNames(createThemeClassName(themeName), className)}
        // TODO: Remove this inline style when we update individual components
        // to set their own color and background-color properties.
        style={{color: 'var(--p-color-text)'}}
        data-portal-id={props['data-portal-id']}
      >
        {children}
      </ThemeContainer>
    </ThemeContext.Provider>
  );
}
