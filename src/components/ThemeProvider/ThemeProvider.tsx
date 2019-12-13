import React, {useMemo, useEffect, useContext} from 'react';
import {
  ThemeContext,
  ThemeProviderThemeConfig,
  buildThemeContext,
  buildCustomProperties,
  DefaultTheme,
  DefaultColorScheme,
  Tokens,
  ColorScheme,
  ThemeProviderColorScheme,
} from '../../utilities/theme';
import {useFeatures} from '../../utilities/features';

interface ThemeProviderProps {
  /** Custom logos and colors provided to select components */
  theme: ThemeProviderThemeConfig;
  /** Whether to display a light, dark, or inverse of the parent color scheme */
  colorScheme?: ThemeProviderColorScheme;
  /** The content to display */
  children?: React.ReactNode;
}

export function ThemeProvider({
  theme: themeConfig,
  children,
  colorScheme,
}: ThemeProviderProps) {
  const {unstableGlobalTheming = false} = useFeatures();

  const parentContext = useContext(ThemeContext);
  const isParentThemeProvider = parentContext === undefined;
  const parentColorScheme =
    parentContext && parentContext.colorScheme && parentContext.colorScheme;
  const parentColors =
    parentContext &&
    parentContext.UNSTABLE_colors &&
    parentContext.UNSTABLE_colors;

  const {UNSTABLE_colors, ...rest} = themeConfig;

  function isInverseColorScheme(
    colorScheme: ThemeProviderColorScheme | ColorScheme,
  ): colorScheme is 'inverse' {
    return colorScheme === 'inverse';
  }

  function shouldInheritParentColors() {
    if (isParentThemeProvider) {
      return false;
    } else if (
      isInverseColorScheme(colorScheme) ||
      (colorScheme === 'dark' && parentColorScheme === 'light') ||
      (colorScheme === 'light' && parentColorScheme === 'dark')
    ) {
      return true;
    } else {
      return false;
    }
  }

  function getColorScheme() {
    if (colorScheme == null) {
      return parentColorScheme || DefaultColorScheme;
    } else if (isInverseColorScheme(colorScheme)) {
      return parentColorScheme === 'dark' ? 'light' : 'dark';
    } else {
      return colorScheme;
    }
  }

  const processedThemeConfig = {
    ...rest,
    ...{colorScheme: getColorScheme()},
    UNSTABLE_colors: {
      ...(isParentThemeProvider && DefaultTheme),
      ...(shouldInheritParentColors() && parentColors),
      ...UNSTABLE_colors,
    },
  };

  const customProperties = useMemo(
    () =>
      buildCustomProperties(
        processedThemeConfig,
        unstableGlobalTheming,
        isParentThemeProvider ? Tokens : undefined,
      ),
    [isParentThemeProvider, processedThemeConfig, unstableGlobalTheming],
  );

  const theme = useMemo(
    () =>
      buildThemeContext(
        processedThemeConfig,
        unstableGlobalTheming ? customProperties : undefined,
      ),
    [customProperties, processedThemeConfig, unstableGlobalTheming],
  );

  // We want these values to be empty string instead of `undefined` when not set.
  // Otherwise, setting a style property to `undefined` does not remove it from the DOM.
  const backgroundColor = customProperties['--p-surface-background'] || '';
  const color = customProperties['--p-text-on-surface'] || '';

  useEffect(() => {
    if (isParentThemeProvider) {
      document.body.style.backgroundColor = backgroundColor;
      document.body.style.color = color;
    }
  }, [backgroundColor, color, isParentThemeProvider]);

  const style = {...customProperties, ...(!isParentThemeProvider && {color})};

  return (
    <ThemeContext.Provider value={theme}>
      <div style={style}>{children}</div>
    </ThemeContext.Provider>
  );
}
