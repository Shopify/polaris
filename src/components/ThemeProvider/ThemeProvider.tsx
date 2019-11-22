import React, {useMemo, useEffect, useContext} from 'react';
import {
  ThemeContext,
  ThemeConfig,
  buildThemeContext,
  buildCustomProperties,
  UNSTABLE_Color,
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
  const isNested = Boolean(useContext(ThemeContext));
  const {UNSTABLE_colors, ...rest} = themeConfig;
  const processedThemeConfig: ThemeConfig = {
    ...rest,
    UNSTABLE_colors: {
      ...(isNested === false && {
        surface: UNSTABLE_Color.Surface,
        onSurface: UNSTABLE_Color.OnSurface,
        interactive: UNSTABLE_Color.Interactive,
        neutral: UNSTABLE_Color.Neutral,
        primary: UNSTABLE_Color.Primary,
        critical: UNSTABLE_Color.Critical,
        warning: UNSTABLE_Color.Warning,
        highlight: UNSTABLE_Color.Highlight,
        success: UNSTABLE_Color.Success,
      }),
      ...UNSTABLE_colors,
    },
  };
  const {unstableGlobalTheming = false} = useFeatures();

  const customProperties = useMemo(
    () => buildCustomProperties(processedThemeConfig, unstableGlobalTheming),
    [processedThemeConfig, unstableGlobalTheming],
  );

  const theme = useMemo(
    () =>
      buildThemeContext(
        processedThemeConfig,
        unstableGlobalTheming ? customProperties : undefined,
      ),
    [customProperties, processedThemeConfig, unstableGlobalTheming],
  );

  // We want these values to be `null` instead of `undefined` when not set.
  // Otherwise, setting a style property to `undefined` does not remove it from the DOM.
  const backgroundColor = customProperties['--p-surface-background'] || null;
  const color = customProperties['--p-text-on-surface'] || null;

  useEffect(() => {
    if (isNested === false) {
      document.body.style.backgroundColor = backgroundColor;
      document.body.style.color = color;
    }
  }, [backgroundColor, color, isNested]);

  return (
    <ThemeContext.Provider value={theme}>
      <div style={customProperties}>{children}</div>
    </ThemeContext.Provider>
  );
}
