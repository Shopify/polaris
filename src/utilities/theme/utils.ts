import tokens from '@shopify/polaris-tokens';
import {hexToHsluv, hsluvToHex} from 'hsluv';
import {HSLColor, HSLAColor} from '../color-types';
import {
  colorToHsla,
  hslToString,
  hslToRgb,
  hexToRgb,
} from '../color-transformers';
import {isLight} from '../color-validation';
import {constructColorName} from '../color-names';
import {createLightColor} from '../color-manipulation';
import {compose} from '../compose';
import {needsVariantList} from './config';
import {ThemeConfig, Theme, CustomPropertiesLike} from './types';
import colorAdjustmentsJson from './color-adjustments.json';

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

type ColorRole = keyof typeof colorAdjustmentsJson;

type BaseColor =
  | 'surface'
  | 'onSurface'
  | 'interactive'
  | 'neutral'
  | 'branded'
  | 'critical'
  | 'warning'
  | 'highlight'
  | 'success';

interface HslaAdjustment {
  hue?: number;
  saturation?: number;
  lightness?: number;
  alpha?: number;
}

export type ColorAdjustments = {
  [C in ColorRole]?: {
    baseColor: BaseColor;
    light: HslaAdjustment;
    dark: HslaAdjustment;
  };
};

function hexToHsluvObj(hex: string) {
  const [hue, saturation, lightness] = hexToHsluv(hex);

  return {
    hue,
    saturation,
    lightness,
  };
}

export function buildColors(theme: ThemeConfig) {
  const colors = {
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

  const lightSurface = isLight(hexToRgb(colors.surface));

  const colorAdjustments: ColorAdjustments = {};
  Object.assign(colorAdjustments, colorAdjustmentsJson);

  const allColors = Object.entries(colorAdjustments).reduce(
    (accumulator, [colorRole, colorAdjustment]) => {
      if (colorAdjustment == null) return accumulator;

      const baseColor = hexToHsluvObj(colors[colorAdjustment.baseColor]);
      const {
        hue = baseColor.hue,
        saturation = baseColor.saturation,
        lightness = baseColor.lightness,
        alpha = 1,
      } = colorAdjustment[lightSurface ? 'light' : 'dark'];

      return {
        ...accumulator,
        [colorRole]: hslToString({
          ...colorToHsla(hsluvToHex([hue, saturation, lightness])),
          alpha,
        }),
      };
    },
    {},
  );

  return customPropertyTransformer({
    ...allColors,
    ...overrides(),
  });
}
/* eslint-enable babel/camelcase */

function opacityColors() {
  return {
    opacityShallow: {
      hue: 180,
      saturation: 5,
      lightness: 8,
      alpha: 0.05,
    },
    opacity: {
      hue: 0,
      saturation: 0,
      lightness: 0,
      alpha: 0.15,
    },
    opacityDeep: {
      hue: 0,
      saturation: 0,
      lightness: 0,
      alpha: 0.5,
    },
  };
}

function overrides() {
  return {
    overrideNone: 'none',
    overrideTransparent: 'transparent',
    overrideOne: '1',
    overrideVisible: 'visible',
    buttonFontWeight: '500',
    nonNullContent: "''",
    borderRadiusBase: rem('4px'),
    borderRadiusWide: rem('8px'),
    bannerDefaultBorder: buildBannerBorder('--p-divider-on-surface'),
    bannerSuccessBorder: buildBannerBorder('--p-success-divider'),
    bannerHighlightBorder: buildBannerBorder('--p-highlight-divider'),
    bannerWarningBorder: buildBannerBorder('--p-warning-divider'),
    bannerCriticalBorder: buildBannerBorder('--p-critical-divider'),
    badgeMixBlendMode: 'luminosity',
    borderSubdued: `${rem('1px')} solid var(--p-divider-subdued-on-surface)`,
    textFieldSpinnerOffset: rem('2px'),
    textFieldFocusRingOffset: rem('-4px'),
    textFieldFocusRingBorderRadius: rem('7px'),
    focusRingStroke: rem('2px'),
  };
}

function customPropertyTransformer(
  properties: Record<string, HSLAColor | string>,
) {
  return Object.entries(properties).reduce(
    (transformed, [key, value]) => ({
      ...transformed,
      [toCssCustomPropertySyntax(key)]: value,
    }),
    {},
  );
}

function toCssCustomPropertySyntax(camelCase: string) {
  return `--p-${camelCase.replace(/([A-Z0-9])/g, '-$1').toLowerCase()}`;
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
