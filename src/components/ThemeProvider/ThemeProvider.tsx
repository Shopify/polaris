import React, {useMemo, useEffect, useContext} from 'react';
import {
  ThemeContext,
  ThemeConfig,
  buildThemeContext,
  buildCustomProperties,
  UNSTABLE_Color,
  Tokens,
} from '../../utilities/theme';
import {useFeatures} from '../../utilities/features';

interface ThemeProviderProps {
  /** Custom logos and colors provided to select components */
  theme: ThemeConfig;
  /** The content to display */
  children?: React.ReactNode;
}

export function ThemeProvider({
  theme: themeConfig,
  children,
}: ThemeProviderProps) {
  const {unstableGlobalTheming = false} = useFeatures();

  const parentContext = useContext(ThemeContext);
  const isParentThemeProvider = parentContext === undefined;
  const parentMode = parentContext && parentContext.mode && parentContext.mode;
  const parentColors =
    parentContext &&
    parentContext.UNSTABLE_colors &&
    parentContext.UNSTABLE_colors;

  const {UNSTABLE_colors, mode, ...rest} = themeConfig;

  const childShouldInheritParentColors =
    !isParentThemeProvider && mode !== undefined && mode !== parentMode;

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

  const processedThemeConfig: ThemeConfig = {
    ...rest,
    ...(mode !== undefined ? {mode} : {mode: parentMode}),
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
      <div style={customProperties}>{children}</div>
    </ThemeContext.Provider>
  );
}
