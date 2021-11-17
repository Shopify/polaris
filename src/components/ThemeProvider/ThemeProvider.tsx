import React, {useMemo, useEffect, useContext} from 'react';
import DefaultThemeColors from '@shopify/polaris-tokens/dist-modern/theme/base.json';

import {
  Theme,
  ThemeContext,
  ThemeConfig,
  buildThemeContext,
  buildCustomProperties,
  Tokens,
} from '../../utilities/theme';

export interface ThemeProviderProps {
  /** Custom logos and colors provided to select components */
  theme?: ThemeConfig;
  /** The content to display */
  children?: React.ReactNode;
}

export function ThemeProvider({
  theme: themeConfig = {},
  children,
}: ThemeProviderProps) {
  const parentContext = useContext(ThemeContext);
  const isParentThemeProvider = parentContext === undefined;

  const parentColorScheme = parentContext?.colorScheme;
  const parentColors = parentContext?.colors;

  const [customProperties, theme] = useMemo(() => {
    const {colors, colorScheme, ...rest} = themeConfig;

    const processedThemeConfig = {
      ...rest,
      colorScheme: getColorScheme(colorScheme, parentColorScheme),
      colors: {
        ...(isParentThemeProvider && DefaultThemeColors),
        ...(parentColors != null && parentColors),
        ...colors,
      },
    };

    const customProperties = buildCustomProperties(
      processedThemeConfig,
      Tokens,
    );

    const theme = buildThemeContext(processedThemeConfig, customProperties);

    return [customProperties, theme];
  }, [isParentThemeProvider, parentColorScheme, parentColors, themeConfig]);

  // We want these values to be empty string instead of `undefined` when not set.
  // Otherwise, setting a style property to `undefined` does not remove it from the DOM.
  const backgroundColor = customProperties['--p-background'] || '';
  const color = customProperties['--p-text'] || '';

  useEffect(() => {
    if (isParentThemeProvider) {
      document.body.style.backgroundColor = backgroundColor;
      document.body.style.color = color;
    }
  }, [backgroundColor, color, isParentThemeProvider]);

  return (
    <ThemeContext.Provider value={theme}>
      <div>{children}</div>
    </ThemeContext.Provider>
  );
}

function getColorScheme(
  colorScheme: ThemeConfig['colorScheme'],
  parentColorScheme?: Theme['colorScheme'],
): Theme['colorScheme'] {
  if (colorScheme == null) {
    return parentColorScheme || 'light';
  } else if (colorScheme === 'inverse') {
    return parentColorScheme === 'dark' || parentColorScheme === undefined
      ? 'light'
      : 'dark';
  } else {
    return colorScheme;
  }
}
