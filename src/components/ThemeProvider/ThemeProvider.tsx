import React, {useMemo, useEffect} from 'react';
import {
  ThemeContext,
  ThemeConfig,
  buildThemeContext,
  buildCustomProperties,
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
  const customProperties = useMemo(
    () => buildCustomProperties(themeConfig, unstableGlobalTheming),
    [unstableGlobalTheming, themeConfig],
  );
  const theme = useMemo(
    () =>
      buildThemeContext(
        themeConfig,
        unstableGlobalTheming ? customProperties : undefined,
      ),
    [customProperties, themeConfig, unstableGlobalTheming],
  );

  // We want these values to be `null` instead of `undefined` when not set.
  // Otherwise, setting a style property to `undefined` does not remove it from the DOM.
  const backgroundColor = customProperties['--p-surface-background'] || null;
  const color = customProperties['--p-text-on-surface'] || null;

  useEffect(() => {
    document.body.style.backgroundColor = backgroundColor;
    document.body.style.color = color;
  }, [backgroundColor, color]);

  return (
    <ThemeContext.Provider value={theme}>
      <div style={customProperties}>{children}</div>
    </ThemeContext.Provider>
  );
}
