import React, {useMemo, useEffect, useContext} from 'react';
import {
  ThemeContext,
  ThemeProviderThemeConfig,
  buildThemeContext,
  buildCustomProperties,
  UNSTABLE_Color,
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

  const defaultColors = {
    surface: UNSTABLE_Color.Surface,
    onSurface: UNSTABLE_Color.OnSurface,
    interactive: UNSTABLE_Color.Interactive,
    neutral: UNSTABLE_Color.Neutral,
    primary: UNSTABLE_Color.Primary,
    critical: UNSTABLE_Color.Critical,
    warning: UNSTABLE_Color.Warning,
    highlight: UNSTABLE_Color.Highlight,
    success: UNSTABLE_Color.Success,
    decorative: UNSTABLE_Color.Decorative,
  };

  let processedColorScheme: ColorScheme | undefined;

  if (colorScheme === 'inverse' && parentColorScheme === 'dark') {
    processedColorScheme = 'light';
  } else if (
    (colorScheme === 'inverse' && parentColorScheme === 'light') ||
    (colorScheme === 'inverse' && parentColorScheme === undefined)
  ) {
    processedColorScheme = 'dark';
  } else if (colorScheme !== 'inverse') {
    processedColorScheme = colorScheme;
  }

  const processedThemeConfig = {
    ...rest,
    ...{colorScheme: processedColorScheme || parentColorScheme},
    UNSTABLE_colors: {
      ...(isParentThemeProvider && defaultColors),
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

  return (
    <ThemeContext.Provider value={theme}>
      <div
        style={{
          ...(unstableGlobalTheming &&
            !isParentThemeProvider && {color, backgroundColor}),
          ...customProperties,
        }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
