import tokens from '@shopify/polaris-tokens';
import {HSLColor, HSLAColor} from '../color-types';
import {colorToHsla, hslToString, hslToRgb} from '../color-transformers';
import {isLight} from '../color-validation';
import {constructColorName} from '../color-names';
import {createLightColor} from '../color-manipulation';
import {compose} from '../compose';
import {needsVariantList} from './config';
import {ThemeConfig, Theme, CustomPropertiesLike} from './types';

export enum ColorName {
  Surface = 'surface',
  OnSurface = 'onSurface',
  Interactive = 'interactive',
  Neutral = 'neutral',
  Branded = 'branded',
  Critical = 'critical',
  Warning = 'warning',
  Highlight = 'highlight',
  Success = 'success',
}

export interface ColorAdjustments {
  [key: string]: {
    baseColor: ColorName;
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

const colorAdjustments: ColorAdjustments = {
  surface: {baseColor: ColorName.Surface, light: {}, dark: {}},
  surfaceBackground: {
    baseColor: ColorName.Surface,
    light: {lightness: 98},
    dark: {lightness: 7},
  },
  surfaceForeground: {
    baseColor: ColorName.Surface,
    light: {lightness: 100},
    dark: {lightness: 13},
  },
  surfaceForegroundSubdued: {
    baseColor: ColorName.Surface,
    light: {lightness: 90},
    dark: {lightness: 10},
  },
  surfaceInverse: {
    baseColor: ColorName.Surface,
    light: {lightness: 0},
    dark: {lightness: 100},
  },
  surfaceHovered: {
    baseColor: ColorName.Surface,
    light: {lightness: 93},
    dark: {lightness: 20},
  },
  surfacePressed: {
    baseColor: ColorName.Surface,
    light: {lightness: 86},
    dark: {lightness: 27},
  },
  onSurface: {baseColor: ColorName.OnSurface, light: {}, dark: {}},
  actionOnInverse: {
    baseColor: ColorName.OnSurface,
    light: {lightness: 76},
    dark: {lightness: 36},
  },
  actionOnSurface: {
    baseColor: ColorName.OnSurface,
    light: {lightness: 36},
    dark: {lightness: 76},
  },
  actionDisabledOnInverse: {
    baseColor: ColorName.OnSurface,
    light: {lightness: 66},
    dark: {lightness: 46},
  },
  actionDisabledOnSurface: {
    baseColor: ColorName.OnSurface,
    light: {lightness: 46},
    dark: {lightness: 66},
  },
  actionHoveredOnInverse: {
    baseColor: ColorName.OnSurface,
    light: {lightness: 86},
    dark: {lightness: 26},
  },
  actionHoveredOnSurface: {
    baseColor: ColorName.OnSurface,
    light: {lightness: 26},
    dark: {lightness: 86},
  },
  actionPressedOnInverse: {
    baseColor: ColorName.OnSurface,
    light: {lightness: 96},
    dark: {lightness: 16},
  },
  actionPressedOnSurface: {
    baseColor: ColorName.OnSurface,
    light: {lightness: 16},
    dark: {lightness: 96},
  },
  dividerOnInverse: {
    baseColor: ColorName.OnSurface,
    light: {lightness: 80},
    dark: {lightness: 75},
  },
  dividerOnSurface: {
    baseColor: ColorName.OnSurface,
    light: {lightness: 75},
    dark: {lightness: 80},
  },
  dividerDisabledOnInverse: {
    baseColor: ColorName.OnSurface,
    light: {lightness: 70},
    dark: {lightness: 95},
  },
  dividerDisabledOnSurface: {
    baseColor: ColorName.OnSurface,
    light: {lightness: 95},
    dark: {lightness: 70},
  },
  dividerSubduedOnInverse: {
    baseColor: ColorName.OnSurface,
    light: {lightness: 75},
    dark: {lightness: 85},
  },
  dividerSubduedOnSurface: {
    baseColor: ColorName.OnSurface,
    light: {lightness: 85},
    dark: {lightness: 75},
  },
  iconOnInverse: {
    baseColor: ColorName.OnSurface,
    light: {lightness: 98},
    dark: {lightness: 18},
  },
  iconOnSurface: {
    baseColor: ColorName.OnSurface,
    light: {lightness: 18},
    dark: {lightness: 98},
  },
  iconDisabledOnInverse: {
    baseColor: ColorName.OnSurface,
    light: {lightness: 75},
    dark: {lightness: 68},
  },
  iconDisabledOnSurface: {
    baseColor: ColorName.OnSurface,
    light: {lightness: 68},
    dark: {lightness: 75},
  },
  iconSubduedOnInverse: {
    baseColor: ColorName.OnSurface,
    light: {lightness: 88},
    dark: {lightness: 43},
  },
  iconSubduedOnSurface: {
    baseColor: ColorName.OnSurface,
    light: {lightness: 43},
    dark: {lightness: 88},
  },
  textOnInverse: {
    baseColor: ColorName.OnSurface,
    light: {lightness: 100},
    dark: {lightness: 13},
  },
  textOnSurface: {
    baseColor: ColorName.OnSurface,
    light: {lightness: 13},
    dark: {lightness: 100},
  },
  textDisabledOnInverse: {
    baseColor: ColorName.OnSurface,
    light: {lightness: 80},
    dark: {lightness: 63},
  },
  textDisabledOnSurface: {
    baseColor: ColorName.OnSurface,
    light: {lightness: 63},
    dark: {lightness: 80},
  },
  textSubduedOnInverse: {
    baseColor: ColorName.OnSurface,
    light: {lightness: 90},
    dark: {lightness: 38},
  },
  textSubduedOnSurface: {
    baseColor: ColorName.OnSurface,
    light: {lightness: 38},
    dark: {lightness: 90},
  },
  actionOnDark: {
    baseColor: ColorName.OnSurface,
    light: {lightness: 76},
    dark: {lightness: 76},
  },
  actionOnLight: {
    baseColor: ColorName.OnSurface,
    light: {lightness: 36},
    dark: {lightness: 36},
  },
  actionDisabledOnDark: {
    baseColor: ColorName.OnSurface,
    light: {lightness: 66},
    dark: {lightness: 66},
  },
  actionDisabledOnLight: {
    baseColor: ColorName.OnSurface,
    light: {lightness: 46},
    dark: {lightness: 46},
  },
  actionHoveredOnDark: {
    baseColor: ColorName.OnSurface,
    light: {lightness: 86},
    dark: {lightness: 86},
  },
  actionHoveredOnLight: {
    baseColor: ColorName.OnSurface,
    light: {lightness: 26},
    dark: {lightness: 26},
  },
  actionPressedOnDark: {
    baseColor: ColorName.OnSurface,
    light: {lightness: 96},
    dark: {lightness: 96},
  },
  actionPressedOnLight: {
    baseColor: ColorName.OnSurface,
    light: {lightness: 16},
    dark: {lightness: 16},
  },
  dividerOnDark: {
    baseColor: ColorName.OnSurface,
    light: {lightness: 80},
    dark: {lightness: 80},
  },
  dividerOnLight: {
    baseColor: ColorName.OnSurface,
    light: {lightness: 75},
    dark: {lightness: 75},
  },
  dividerDisabledOnDark: {
    baseColor: ColorName.OnSurface,
    light: {lightness: 70},
    dark: {lightness: 70},
  },
  dividerDisabledOnLight: {
    baseColor: ColorName.OnSurface,
    light: {lightness: 95},
    dark: {lightness: 95},
  },
  dividerSubduedOnDark: {
    baseColor: ColorName.OnSurface,
    light: {lightness: 75},
    dark: {lightness: 75},
  },
  dividerSubduedOnLight: {
    baseColor: ColorName.OnSurface,
    light: {lightness: 85},
    dark: {lightness: 85},
  },
  iconOnDark: {
    baseColor: ColorName.OnSurface,
    light: {lightness: 98},
    dark: {lightness: 98},
  },
  iconOnLight: {
    baseColor: ColorName.OnSurface,
    light: {lightness: 18},
    dark: {lightness: 18},
  },
  iconDisabledOnDark: {
    baseColor: ColorName.OnSurface,
    light: {lightness: 75},
    dark: {lightness: 75},
  },
  iconDisabledOnLight: {
    baseColor: ColorName.OnSurface,
    light: {lightness: 68},
    dark: {lightness: 68},
  },
  iconSubduedOnDark: {
    baseColor: ColorName.OnSurface,
    light: {lightness: 88},
    dark: {lightness: 88},
  },
  iconSubduedOnLight: {
    baseColor: ColorName.OnSurface,
    light: {lightness: 43},
    dark: {lightness: 43},
  },
  textOnDark: {
    baseColor: ColorName.OnSurface,
    light: {lightness: 100},
    dark: {lightness: 100},
  },
  textOnLight: {
    baseColor: ColorName.OnSurface,
    light: {lightness: 13},
    dark: {lightness: 13},
  },
  textDisabledOnDark: {
    baseColor: ColorName.OnSurface,
    light: {lightness: 80},
    dark: {lightness: 80},
  },
  textDisabledOnLight: {
    baseColor: ColorName.OnSurface,
    light: {lightness: 63},
    dark: {lightness: 63},
  },
  textSubduedOnDark: {
    baseColor: ColorName.OnSurface,
    light: {lightness: 90},
    dark: {lightness: 90},
  },
  textSubduedOnLight: {
    baseColor: ColorName.OnSurface,
    light: {lightness: 38},
    dark: {lightness: 38},
  },
  interactive: {baseColor: ColorName.Interactive, light: {}, dark: {}},
  interactiveAction: {
    baseColor: ColorName.Interactive,
    light: {lightness: 44},
    dark: {lightness: 56},
  },
  interactiveActionDisabled: {
    baseColor: ColorName.Interactive,
    light: {lightness: 58},
    dark: {lightness: 42},
  },
  interactiveActionHovered: {
    baseColor: ColorName.Interactive,
    light: {lightness: 37},
    dark: {lightness: 63},
  },
  interactiveActionSubdued: {
    baseColor: ColorName.Interactive,
    light: {lightness: 51},
    dark: {lightness: 49},
  },
  interactiveActionPressed: {
    baseColor: ColorName.Interactive,
    light: {lightness: 31},
    dark: {lightness: 69},
  },
  interactiveFocus: {
    baseColor: ColorName.Interactive,
    light: {lightness: 58},
    dark: {lightness: 42},
  },
  interactiveSelected: {
    baseColor: ColorName.Interactive,
    light: {lightness: 96},
    dark: {lightness: 4},
  },
  interactiveSelectedHovered: {
    baseColor: ColorName.Interactive,
    light: {lightness: 89},
    dark: {lightness: 11},
  },
  interactiveSelectedPressed: {
    baseColor: ColorName.Interactive,
    light: {lightness: 82},
    dark: {lightness: 18},
  },
  neutral: {baseColor: ColorName.Neutral, light: {}, dark: {}},
  neutralActionDisabled: {
    baseColor: ColorName.Neutral,
    light: {lightness: 94},
    dark: {lightness: 13},
  },
  neutralAction: {
    baseColor: ColorName.Neutral,
    light: {lightness: 92},
    dark: {lightness: 22},
  },
  neutralActionHovered: {
    baseColor: ColorName.Neutral,
    light: {lightness: 86},
    dark: {lightness: 29},
  },
  neutralActionPressed: {
    baseColor: ColorName.Neutral,
    light: {lightness: 76},
    dark: {lightness: 39},
  },
  branded: {baseColor: ColorName.Branded, light: {}, dark: {}},
  brandedAction: {
    baseColor: ColorName.Branded,
    light: {lightness: 25},
    dark: {lightness: 25},
  },
  brandedActionDisabled: {
    baseColor: ColorName.Branded,
    light: {lightness: 32},
    dark: {lightness: 32},
  },
  brandedActionHovered: {
    baseColor: ColorName.Branded,
    light: {lightness: 22},
    dark: {lightness: 22},
  },
  brandedActionPressed: {
    baseColor: ColorName.Branded,
    light: {lightness: 15},
    dark: {lightness: 15},
  },
  iconOnBranded: {
    baseColor: ColorName.Branded,
    light: {lightness: 98},
    dark: {lightness: 98},
  },
  iconSubduedOnBranded: {
    baseColor: ColorName.Branded,
    light: {lightness: 88},
    dark: {lightness: 88},
  },
  textOnBranded: {
    baseColor: ColorName.Branded,
    light: {lightness: 100},
    dark: {lightness: 100},
  },
  textSubduedOnBranded: {
    baseColor: ColorName.Branded,
    light: {lightness: 90},
    dark: {lightness: 90},
  },
  brandedSelected: {
    baseColor: ColorName.Branded,
    light: {lightness: 95, saturation: 30},
    dark: {lightness: 5, saturation: 30},
  },
  brandedSelectedHovered: {
    baseColor: ColorName.Branded,
    light: {lightness: 81, saturation: 22},
    dark: {lightness: 19, saturation: 22},
  },
  brandedSelectedPressed: {
    baseColor: ColorName.Branded,
    light: {lightness: 74, saturation: 22},
    dark: {lightness: 26, saturation: 22},
  },
  critical: {baseColor: ColorName.Critical, light: {}, dark: {}},
  criticalDivider: {
    baseColor: ColorName.Critical,
    light: {lightness: 52},
    dark: {lightness: 48},
  },
  criticalIcon: {
    baseColor: ColorName.Critical,
    light: {lightness: 52},
    dark: {lightness: 48},
  },
  criticalSurface: {
    baseColor: ColorName.Critical,
    light: {lightness: 88},
    dark: {lightness: 12},
  },
  criticalSurfaceSubdued: {
    baseColor: ColorName.Critical,
    light: {lightness: 98},
    dark: {lightness: 12},
  },
  criticalText: {
    baseColor: ColorName.Critical,
    light: {lightness: 30},
    dark: {lightness: 70},
  },
  criticalActionDisabled: {
    baseColor: ColorName.Critical,
    light: {lightness: 59},
    dark: {lightness: 41},
  },
  criticalAction: {
    baseColor: ColorName.Critical,
    light: {lightness: 52},
    dark: {lightness: 48},
  },
  criticalActionHovered: {
    baseColor: ColorName.Critical,
    light: {lightness: 45},
    dark: {lightness: 55},
  },
  criticalActionSubdued: {
    baseColor: ColorName.Critical,
    light: {lightness: 38},
    dark: {lightness: 62},
  },
  criticalActionPressed: {
    baseColor: ColorName.Critical,
    light: {lightness: 31},
    dark: {lightness: 69},
  },
  warning: {baseColor: ColorName.Warning, light: {}, dark: {}},
  warningDivider: {
    baseColor: ColorName.Warning,
    light: {lightness: 66},
    dark: {lightness: 34},
  },
  warningIcon: {
    baseColor: ColorName.Warning,
    light: {lightness: 66},
    dark: {lightness: 34},
  },
  warningSurface: {
    baseColor: ColorName.Warning,
    light: {lightness: 88},
    dark: {lightness: 12},
  },
  warningSurfaceSubdued: {
    baseColor: ColorName.Warning,
    light: {lightness: 98},
    dark: {lightness: 12},
  },
  warningText: {
    baseColor: ColorName.Warning,
    light: {lightness: 30},
    dark: {lightness: 70},
  },
  highlight: {baseColor: ColorName.Highlight, light: {}, dark: {}},
  highlightDivider: {
    baseColor: ColorName.Highlight,
    light: {lightness: 58},
    dark: {lightness: 42},
  },
  highlightIcon: {
    baseColor: ColorName.Highlight,
    light: {lightness: 58},
    dark: {lightness: 42},
  },
  highlightSurface: {
    baseColor: ColorName.Highlight,
    light: {lightness: 88},
    dark: {lightness: 12},
  },
  highlightSurfaceSubdued: {
    baseColor: ColorName.Highlight,
    light: {lightness: 98},
    dark: {lightness: 12},
  },
  highlightText: {
    baseColor: ColorName.Highlight,
    light: {lightness: 98},
    dark: {lightness: 2},
  },
  success: {baseColor: ColorName.Success, light: {}, dark: {}},
  successDivider: {
    baseColor: ColorName.Success,
    light: {lightness: 25},
    dark: {lightness: 35},
  },
  successIcon: {
    baseColor: ColorName.Success,
    light: {lightness: 25},
    dark: {lightness: 35},
  },
  successSurface: {
    baseColor: ColorName.Success,
    light: {lightness: 88},
    dark: {lightness: 12},
  },
  successSurfaceSubdued: {
    baseColor: ColorName.Success,
    light: {lightness: 98},
    dark: {lightness: 12},
  },
  successText: {
    baseColor: ColorName.Success,
    light: {lightness: 15},
    dark: {lightness: 85},
  },
};

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

export function buildColors(theme: ThemeConfig) {
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

  const allColors: Record<string, HSLAColor> = {};

  Object.entries(colorAdjustments).forEach(([colorName, colorSettings]) => {
    const adjustments = colorSettings[lightSurface ? 'light' : 'dark'];
    const baseColor = colorToHsla(UNSTABLE_colors[colorSettings.baseColor]);

    allColors[colorName] = {
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
/* eslint-enable babel/camelcase */

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
