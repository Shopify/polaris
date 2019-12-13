import React, {useMemo, useEffect, useContext} from 'react';
import {
  ThemeContext,
  ThemeProviderThemeConfig,
  buildThemeContext,
  buildCustomProperties,
  DefaultTheme,
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

  const childShouldInheritParentColors =
    !isParentThemeProvider &&
    colorScheme !== undefined &&
    colorScheme !== parentColorScheme;

  const inverseParentColorScheme =
    parentColorScheme === 'dark' ? 'light' : 'dark';

  const processedColorScheme = isColorScheme(colorScheme)
    ? colorScheme
    : inverseParentColorScheme;

  function isColorScheme(
    colorScheme: ThemeProviderColorScheme | ColorScheme,
  ): colorScheme is ColorScheme {
    return colorScheme !== 'inverse';
  }

  const processedThemeConfig = {
    ...rest,
    ...{colorScheme: processedColorScheme || parentColorScheme},
    UNSTABLE_colors: {
      ...(isParentThemeProvider && DefaultTheme),
      ...(childShouldInheritParentColors && parentColors),
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
