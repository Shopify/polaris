import tokens from '@shopify/polaris-tokens';
import {HSLColor, HSLAColor} from '../color-types';
import {colorToHsla, hslToString, hslToRgb} from '../color-transformers';
import {isLight} from '../color-validation';
import {constructColorName} from '../color-names';
import {createLightColor} from '../color-manipulation';
import {compose} from '../compose';
import {needsVariantList} from './config';
import {ThemeConfig, Theme, CustomPropertiesLike} from './types';
import colorAdjustmentsJson from './colorAdjustments.json';

export function buildCustomProperties(
  themeConfig: ThemeConfig,
  globalTheming: boolean,
): CustomPropertiesLike {
  return globalTheming
    ? buildColors(themeConfig)
    : buildLegacyColors(themeConfig);
}

export function buildThemeContext(
  themeConfig: ThemeConfig,
  cssCustomProperties?: CustomPropertiesLike,
): Theme {
  const {logo} = themeConfig;
  return {
    logo,
    // eslint-disable-next-line babel/camelcase
    UNSTABLE_cssCustomProperties: toString(cssCustomProperties),
  };
}

function toString(obj?: CustomPropertiesLike) {
  if (obj) {
    return Object.entries(obj)
      .map((pair) => pair.join(':'))
      .join(';');
  } else {
    return undefined;
  }
}

export function snakeCaseToCamelCase(str: string): string {
  return str
    .toLowerCase()
    .replace(/_([a-z])/g, (_match, char) => char.toUpperCase());
}

/* eslint-disable babel/camelcase */
// eslint-disable-next-line shopify/typescript/prefer-pascal-case-enums
export enum UNSTABLE_Color {
  Surface = '#FAFAFA',
  DarkSurface = '#111213',
  OnSurface = '#1F2225',
  Interactive = '#0870D9',
  Neutral = '#EAEAEB',
  Branded = '#008060',
  Critical = '#E32727',
  Warning = '#FFC453',
  Highlight = '#59D0C2',
  Success = '#008060',
}

export interface ColorAdjustments {
  [x: string]: {
    baseColor:
      | 'surface'
      | 'onSurface'
      | 'interactive'
      | 'neutral'
      | 'branded'
      | 'critical'
      | 'warning'
      | 'highlight'
      | 'success';
    light: {
      hue?: number;
      saturation?: number;
      lightness?: number;
      alpha?: number;
    };
    dark: {
      hue?: number;
      saturation?: number;
      lightness?: number;
      alpha?: number;
    };
  };
}

export function buildColors(theme: ThemeConfig) {
  /* eslint-enable babel/camelcase */
  const UNSTABLE_colors = {
    surface: UNSTABLE_Color.Surface,
    onSurface: UNSTABLE_Color.OnSurface,
    interactive: UNSTABLE_Color.Interactive,
    neutral: UNSTABLE_Color.Neutral,
    branded: UNSTABLE_Color.Branded,
    critical: UNSTABLE_Color.Critical,
    warning: UNSTABLE_Color.Warning,
    highlight: UNSTABLE_Color.Highlight,
    success: UNSTABLE_Color.Success,
    ...theme.UNSTABLE_colors,
  };

  const surfaceColor = colorToHsla(UNSTABLE_colors.surface);
  const lightSurface = isLight(
    hslToRgb({
      hue: surfaceColor.hue,
      lightness: surfaceColor.lightness,
      saturation: surfaceColor.saturation,
    }),
  );

  const allColors: any = {};
  const colorAdjustments = colorAdjustmentsJson as ColorAdjustments;

  Object.entries(colorAdjustments).forEach(([colorName, colorSettings]) => {
    const adjustments = colorSettings[lightSurface ? 'light' : 'dark'];
    const baseColor = colorToHsla(UNSTABLE_colors[colorSettings.baseColor]);

    allColors[snakeCaseToCamelCase(colorName)] = {
      alpha: baseColor.alpha,
      hue: baseColor.hue,
      lightness:
        adjustments.lightness !== undefined
          ? setLightness(baseColor, adjustments.lightness).lightness
          : baseColor.lightness,
      saturation:
        adjustments.saturation !== undefined
          ? setSaturation(baseColor, adjustments.saturation).saturation
          : baseColor.saturation,
    };
  });

  return {
    ...customPropertyTransformer(allColors),
    ...overrides(),
  };
}

function overrides() {
  return {
    [toCssCustomPropertySyntax('overrideNone')]: 'none',
    [toCssCustomPropertySyntax('overrideTransparent')]: 'transparent',
    [toCssCustomPropertySyntax('overrideOne')]: '1',
    [toCssCustomPropertySyntax('overrideVisible')]: 'visible',
    [toCssCustomPropertySyntax('buttonFontWeight')]: '500',
    [toCssCustomPropertySyntax('nonNullContent')]: "''",
    [toCssCustomPropertySyntax('borderRadiusBase')]: rem('4px'),
    [toCssCustomPropertySyntax('borderRadiusWide')]: rem('8px'),
    [toCssCustomPropertySyntax('bannerDefaultBorder')]: buildBannerBorder(
      '--p-divider-on-surface',
    ),
    [toCssCustomPropertySyntax('bannerSuccessBorder')]: buildBannerBorder(
      '--p-success-divider',
    ),

    [toCssCustomPropertySyntax('bannerHighlightBorder')]: buildBannerBorder(
      '--p-highlight-divider',
    ),

    [toCssCustomPropertySyntax('bannerWarningBorder')]: buildBannerBorder(
      '--p-warning-divider',
    ),

    [toCssCustomPropertySyntax('bannerCriticalBorder')]: buildBannerBorder(
      '--p-critical-divider',
    ),

    [toCssCustomPropertySyntax('badgeMixBlendMode')]: 'luminosity',
    [toCssCustomPropertySyntax('borderSubdued')]: `${rem(
      '1px',
    )} solid var(--p-divider-subdued-on-surface)`,
    [toCssCustomPropertySyntax('textFieldSpinnerOffset')]: rem('2px'),
    [toCssCustomPropertySyntax('textFieldFocusRingOffset')]: rem('-4px'),
    [toCssCustomPropertySyntax('textFieldFocusRingBorderRadius')]: rem('7px'),
    [toCssCustomPropertySyntax('focusRingStroke')]: rem('2px'),
  };
}

function customPropertyTransformer(colors: {[key: string]: HSLAColor}) {
  return Object.entries(colors).reduce(
    (transformed, [key, value]) => ({
      ...transformed,
      [toCssCustomPropertySyntax(key)]: hslToString(value),
    }),
    {},
  );
}

function toCssCustomPropertySyntax(camelCase: string) {
  return `--p-${camelCase.replace(/([A-Z0-9])/g, '-$1').toLowerCase()}`;
}

function setLightness(
  {hue, saturation, alpha}: HSLAColor,
  lightness: number,
): HSLAColor {
  return {hue, saturation, lightness, alpha};
}

function setSaturation(
  {hue, lightness, alpha}: HSLAColor,
  saturation: number,
): HSLAColor {
  return {hue, saturation, lightness, alpha};
}

function buildLegacyColors(theme?: ThemeConfig): CustomPropertiesLike {
  let colorPairs;
  const colors =
    theme && theme.colors && theme.colors.topBar
      ? theme.colors.topBar
      : {background: '#00848e', backgroundLighter: '#1d9ba4', color: '#f9fafb'};

  const colorKey = 'topBar';
  const colorKeys = Object.keys(colors);

  if (colorKeys.length > 1) {
    colorPairs = colorKeys.map((key) => {
      return [constructColorName(colorKey, key), colors[key]];
    });
  } else {
    colorPairs = parseColors([colorKey, colors]);
  }

  return colorPairs.reduce(
    (state, [key, value]) => ({...state, [key]: value}),
    {},
  );
}

export function needsVariant(name: string) {
  return needsVariantList.indexOf(name) !== -1;
}

const lightenToString: (
  color: HSLColor | string,
  lightness: number,
  saturation: number,
) => string = compose(
  hslToString,
  createLightColor,
);

export function setTextColor(
  name: string,
  variant: 'light' | 'dark' = 'dark',
): string[] {
  if (variant === 'light') {
    return [name, tokens.colorInk];
  }

  return [name, tokens.colorWhite];
}

export function setTheme(
  color: string | HSLColor,
  baseName: string,
  key: string,
  variant: 'light' | 'dark',
): string[][] {
  const colorPairs = [];
  switch (variant) {
    case 'light':
      colorPairs.push(
        setTextColor(constructColorName(baseName, null, 'color'), 'light'),
      );

      colorPairs.push([
        constructColorName(baseName, key, 'lighter'),
        lightenToString(color, 7, -10),
      ]);

      break;
    case 'dark':
      colorPairs.push(
        setTextColor(constructColorName(baseName, null, 'color'), 'dark'),
      );

      colorPairs.push([
        constructColorName(baseName, key, 'lighter'),
        lightenToString(color, 15, 15),
      ]);

      break;
    default:
  }

  return colorPairs;
}

function parseColors([baseName, colors]: [
  string,
  {[key: string]: string},
]): string[][] {
  const keys = Object.keys(colors);
  const colorPairs = [];
  for (let i = 0; i < keys.length; i++) {
    colorPairs.push([constructColorName(baseName, keys[i]), colors[keys[i]]]);

    if (needsVariant(baseName)) {
      const hslColor = colorToHsla(colors[keys[i]]);

      if (typeof hslColor === 'string') {
        return colorPairs;
      }

      const rgbColor = hslToRgb(hslColor);

      if (isLight(rgbColor)) {
        colorPairs.push(...setTheme(hslColor, baseName, keys[i], 'light'));
      } else {
        colorPairs.push(...setTheme(hslColor, baseName, keys[i], 'dark'));
      }
    }
  }

  return colorPairs;
}

function rem(px: string) {
  const baseFontSize = 10;
  return `${parseInt(px, 10) / baseFontSize}rem`;
}

function buildBannerBorder(cssVar: string) {
  return `inset 0 ${rem('2px')} 0 0 var(${cssVar}), inset 0 0 0 ${rem(
    '2px',
  )} var(${cssVar})`;
}
