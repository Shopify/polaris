import React, {useMemo, useEffect, useContext} from 'react';
import DefaultThemeColors from '@shopify/polaris-tokens/dist-modern/theme/base.json';

import {
  Theme,
  ThemeContext,
  ThemeConfig,
  buildThemeContext,
  buildCustomProperties,
  toString,
  Tokens,
} from '../../utilities/theme';

export interface ThemeProviderLegacyProps {
  /** Custom logos and colors provided to select components */
  theme?: ThemeConfig;
  /**
   * By default, Polaris avoids re-declaring custom properties within the same React tree
   * This prop ensures that the CSS custom properties are always rendered. This is useful
   * for components such as portals that render outside of the root DOM node
   */
  alwaysRenderCustomProperties?: boolean;
  /** The content to display */
  children?: React.ReactNode;
}

export function ThemeProviderLegacy({
  theme: themeConfig = {},
  alwaysRenderCustomProperties = false,
  children,
}: ThemeProviderLegacyProps) {
  const parentContext = useContext(ThemeContext);
  const isParentThemeProviderLegacy = parentContext === undefined;

  const parentColorScheme = parentContext?.colorScheme;
  const parentColors = parentContext?.colors;

  const [customProperties, theme] = useMemo(() => {
    const {colors, colorScheme, ...rest} = themeConfig;

    const processedThemeConfig = {
      ...rest,
      colorScheme: getColorScheme(colorScheme, parentColorScheme),
      colors: {
        ...(isParentThemeProviderLegacy && DefaultThemeColors),
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
  }, [
    isParentThemeProviderLegacy,
    parentColorScheme,
    parentColors,
    themeConfig,
  ]);

  // We want these values to be empty string instead of `undefined` when not set.
  // Otherwise, setting a style property to `undefined` does not remove it from the DOM.
  const backgroundColor = customProperties['--p-background'] || '';
  const color = customProperties['--p-text'] || '';

  useEffect(() => {
    if (isParentThemeProviderLegacy) {
      document.body.style.backgroundColor = backgroundColor;
      document.body.style.color = color;
    }
  }, [backgroundColor, color, isParentThemeProviderLegacy]);

  let style;

  if (isParentThemeProviderLegacy) {
    style = customProperties;
  } else if (
    alwaysRenderCustomProperties ||
    (!isParentThemeProviderLegacy &&
      parentContext!.cssCustomProperties !== toString(customProperties))
  ) {
    style = {...customProperties, ...{color}};
  } else {
    style = {color};
  }

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
