import React, {useMemo, useEffect, useContext} from 'react';
import {
  ThemeContext,
  ThemeConfig,
  buildThemeContext,
  buildCustomProperties,
  UNSTABLE_Color,
  Tokens,
  customPropertyTransformer,
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
  const rawContext = useContext(ThemeContext);
  const isNested = Boolean(rawContext);
  const {UNSTABLE_colors, mode, ...rest} = themeConfig;
  const processedThemeConfig: ThemeConfig = {
    ...rest,
    ...(isNested === true && {
      mode: mode !== undefined ? mode : rawContext!.mode,
    }),
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

  const customProperties = useMemo(() => {
    return {
      ...buildCustomProperties(processedThemeConfig, unstableGlobalTheming),
      ...(unstableGlobalTheming === true &&
        isNested === false &&
        customPropertyTransformer(Tokens)),
    };
  }, [isNested, processedThemeConfig, unstableGlobalTheming]);

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
