import React, {useMemo, useEffect, useContext} from 'react';
import {now} from '@shopify/performance';
import DefaultThemeColors from '@shopify/polaris-tokens/dist-modern/theme/base.json';

import {
  ThemeContext,
  ThemeConfig,
  buildThemeContext,
  buildCustomProperties,
  Tokens,
  buildLegacyColors,
  customPropertyTransformer,
  toString,
} from '../../utilities/theme';
import {useFeatures} from '../../utilities/features';

import {lightTheme, darkTheme} from './themes';

type OriginalColorScheme = Required<ThemeConfig['colorScheme']>;
type Inverse = 'inverse';
export type InversableColorScheme = OriginalColorScheme | Inverse;

// TS 3.5+ includes the built-in Omit type which does the same thing. But if we
// use that then we break consumers on older versions of TS. Consider removing
// this when we drop support for consumers using TS <3.5 (in v5?)
type Discard<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

interface ThemeProviderThemeConfig extends Discard<ThemeConfig, 'colorScheme'> {
  colorScheme?: InversableColorScheme;
}

interface ThemeProviderProps {
  /** Custom logos and colors provided to select components */
  theme: ThemeProviderThemeConfig;
  /** The content to display */
  children?: React.ReactNode;
}

export function HardCodedThemeProvider({
  theme: themeConfig,
  children,
}: ThemeProviderProps) {
  const start = now();
  const {newDesignLanguage} = useFeatures();

  const parentContext = useContext(ThemeContext);
  let theme;
  if (newDesignLanguage) {
    const inverseTheme =
      parentContext?.colorScheme === 'dark' ? lightTheme : darkTheme;
    const themeMap = new Map([
      ['light', lightTheme],
      ['dark', darkTheme],
      ['inverse', inverseTheme],
      [undefined, lightTheme],
    ]);
    theme = themeMap.get(themeConfig.colorScheme);
  }
  const {colors, colorScheme, frameOffset = 0, ...rest} = themeConfig;
  const isParentThemeProvider = parentContext === undefined;

  const backgroundColor = theme ? theme['--p-background'] : '';
  const color = theme ? theme['--p-text'] : '';

  useEffect(() => {
    if (isParentThemeProvider && newDesignLanguage) {
      document.body.style.backgroundColor = backgroundColor;
      document.body.style.color = color;
    }
  }, [backgroundColor, color, isParentThemeProvider, newDesignLanguage]);

  const style = newDesignLanguage
    ? {
        ...theme,
        ...customPropertyTransformer(Tokens),
        ...customPropertyTransformer({frameOffset: `${frameOffset}px`}),
        ...(!isParentThemeProvider && {color}),
      }
    : {
        ...buildLegacyColors({colors, ...rest}),
        ...customPropertyTransformer({frameOffset: `${frameOffset}px`}),
      };

  const parentColors =
    parentContext && parentContext.colors && parentContext.colors;

  const end = now();
  console.log(
    `Rendering HardCodedThemeProvider took ${end - start} milliseconds.`,
  );

  return (
    <ThemeContext.Provider
      value={{
        cssCustomProperties: toString(theme),
        ...rest,
        colors: {
          ...(isParentThemeProvider && DefaultThemeColors),
          ...(parentColors != null && parentColors),
          ...colors,
        },
      }}
    >
      <div style={style}>{children}</div>
    </ThemeContext.Provider>
  );
}

export function ThemeProvider({
  theme: themeConfig,
  children,
}: ThemeProviderProps) {
  const {newDesignLanguage} = useFeatures();

  const parentContext = useContext(ThemeContext);
  const isParentThemeProvider = parentContext === undefined;
  const processedThemeConfig = useMemo(() => {
    const parentColorScheme =
      parentContext && parentContext.colorScheme && parentContext.colorScheme;
    const parentColors =
      parentContext && parentContext.colors && parentContext.colors;

    const {colors, colorScheme, ...rest} = themeConfig;

    return {
      ...rest,
      ...{colorScheme: getColorScheme(colorScheme, parentColorScheme)},
      colors: {
        ...(isParentThemeProvider && DefaultThemeColors),
        ...(parentColors != null && parentColors),
        ...colors,
      },
    };
  }, [parentContext, themeConfig, isParentThemeProvider]);

  const customProperties = useMemo(
    () =>
      buildCustomProperties(processedThemeConfig, newDesignLanguage, Tokens),
    [processedThemeConfig, newDesignLanguage],
  );

  const theme = useMemo(
    () =>
      buildThemeContext(
        processedThemeConfig,
        newDesignLanguage ? customProperties : undefined,
      ),
    [customProperties, processedThemeConfig, newDesignLanguage],
  );

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

  const style = {...customProperties, ...(!isParentThemeProvider && {color})};

  return (
    <ThemeContext.Provider value={{...theme, textColor: color}}>
      <div style={style}>{children}</div>
    </ThemeContext.Provider>
  );
}

function isInverseColorScheme(
  colorScheme?: InversableColorScheme,
): colorScheme is Inverse {
  return colorScheme === 'inverse';
}

function getColorScheme(
  colorScheme: InversableColorScheme | undefined,
  parentColorScheme: OriginalColorScheme | undefined,
) {
  if (colorScheme == null) {
    return parentColorScheme || 'light';
  } else if (isInverseColorScheme(colorScheme)) {
    return parentColorScheme === 'dark' || parentColorScheme === undefined
      ? 'light'
      : 'dark';
  } else {
    return colorScheme;
  }
}
