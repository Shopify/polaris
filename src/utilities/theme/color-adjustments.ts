import {ColorAdjustments} from './types';

// eslint-disable-next-line shopify/typescript/prefer-pascal-case-enums
export enum UNSTABLE_Color {
  Surface = '#FAFAFA',
  DarkSurface = '#111213',
  OnSurface = '#1F2225',
  Interactive = '#0870D9',
  Neutral = '#EAEAEB',
  Branded = '#008060',
  Critical = '#D82C0D',
  Warning = '#FFC453',
  Highlight = '#59D0C2',
  Success = '#008060',
  Decorative = '#FDC7CE',
}

export const colorAdjustments: ColorAdjustments = {
  surface: {baseColor: 'surface', light: {}, dark: {}},
  surfaceBackground: {
    baseColor: 'surface',
    light: {lightness: 97.9},
    dark: {lightness: 3.3},
  },
  surfaceInverseBackground: {
    baseColor: 'surface',
    light: {lightness: 3.3},
    dark: {lightness: 97.9},
  },
  surfaceDarkBackground: {
    baseColor: 'surface',
    light: {lightness: 3.3},
    dark: {lightness: 3.3},
  },
  surfaceLightBackground: {
    baseColor: 'surface',
    light: {lightness: 97.9},
    dark: {lightness: 97.9},
  },
  surfaceForeground: {
    baseColor: 'surface',
    light: {lightness: 100},
    dark: {lightness: 8.8},
  },
  surfaceInverseForeground: {
    baseColor: 'surface',
    light: {lightness: 8.8},
    dark: {lightness: 100},
  },
  surfaceDarkForeground: {
    baseColor: 'surface',
    light: {lightness: 8.8},
    dark: {lightness: 8.8},
  },
  surfaceLightForeground: {
    baseColor: 'surface',
    light: {lightness: 100},
    dark: {lightness: 100},
  },
  surfaceForegroundSubdued: {
    baseColor: 'surface',
    light: {lightness: 95},
    dark: {lightness: 10},
  },
  surfaceInverseForegroundSubdued: {
    baseColor: 'surface',
    light: {lightness: 10},
    dark: {lightness: 95},
  },
  surfaceDarkForegroundSubdued: {
    baseColor: 'surface',
    light: {lightness: 10},
    dark: {lightness: 10},
  },
  surfaceLightForegroundSubdued: {
    baseColor: 'surface',
    light: {lightness: 95},
    dark: {lightness: 95},
  },
  surfaceHovered: {
    baseColor: 'surface',
    light: {lightness: 95},
    dark: {lightness: 20},
  },
  surfaceInverseHovered: {
    baseColor: 'surface',
    light: {lightness: 20},
    dark: {lightness: 95},
  },
  surfaceDarkHovered: {
    baseColor: 'surface',
    light: {lightness: 20},
    dark: {lightness: 20},
  },
  surfaceLightHovered: {
    baseColor: 'surface',
    light: {lightness: 95},
    dark: {lightness: 95},
  },
  surfacePressed: {
    baseColor: 'surface',
    light: {lightness: 90},
    dark: {lightness: 27},
  },
  surfaceInversePressed: {
    baseColor: 'surface',
    light: {lightness: 27},
    dark: {lightness: 90},
  },
  surfaceDarkPressed: {
    baseColor: 'surface',
    light: {lightness: 27},
    dark: {lightness: 27},
  },
  surfaceLightPressed: {
    baseColor: 'surface',
    light: {lightness: 90},
    dark: {lightness: 90},
  },
  onSurface: {baseColor: 'onSurface', light: {}, dark: {}},
  borderOnInverse: {
    baseColor: 'onSurface',
    light: {lightness: 80},
    dark: {lightness: 75},
  },
  borderOnSurface: {
    baseColor: 'onSurface',
    light: {lightness: 75},
    dark: {lightness: 35},
  },
  borderDisabledOnInverse: {
    baseColor: 'onSurface',
    light: {lightness: 70},
    dark: {lightness: 95},
  },
  borderDisabledOnSurface: {
    baseColor: 'onSurface',
    light: {lightness: 95},
    dark: {lightness: 70},
  },
  borderSubduedOnInverse: {
    baseColor: 'onSurface',
    light: {lightness: 75},
    dark: {lightness: 85},
  },
  borderSubduedOnSurface: {
    baseColor: 'onSurface',
    light: {lightness: 85},
    dark: {lightness: 15},
  },
  iconOnInverse: {
    baseColor: 'onSurface',
    light: {lightness: 98},
    dark: {lightness: 18},
  },
  iconOnSurface: {
    baseColor: 'onSurface',
    light: {lightness: 29.9},
    dark: {lightness: 98},
  },
  iconDisabledOnInverse: {
    baseColor: 'onSurface',
    light: {lightness: 75},
    dark: {lightness: 68},
  },
  iconDisabledOnSurface: {
    baseColor: 'onSurface',
    light: {lightness: 68},
    dark: {lightness: 75},
  },
  iconSubduedOnInverse: {
    baseColor: 'onSurface',
    light: {lightness: 88},
    dark: {lightness: 43},
  },
  iconSubduedOnSurface: {
    baseColor: 'onSurface',
    light: {lightness: 59.8},
    dark: {lightness: 62},
  },
  textOnInverse: {
    baseColor: 'onSurface',
    light: {lightness: 100},
    dark: {lightness: 13},
  },
  textOnSurface: {
    baseColor: 'onSurface',
    light: {lightness: 13},
    dark: {lightness: 100},
  },
  textDisabledOnInverse: {
    baseColor: 'onSurface',
    light: {lightness: 80},
    dark: {lightness: 63},
  },
  textDisabledOnSurface: {
    baseColor: 'onSurface',
    light: {lightness: 61.3},
    dark: {lightness: 50},
  },
  textSubduedOnInverse: {
    baseColor: 'onSurface',
    light: {lightness: 90},
    dark: {lightness: 38},
  },
  textSubduedOnSurface: {
    baseColor: 'onSurface',
    light: {lightness: 38},
    dark: {lightness: 62},
  },
  actionOnDark: {
    baseColor: 'onSurface',
    light: {lightness: 76},
    dark: {lightness: 76},
  },
  actionOnLight: {
    baseColor: 'onSurface',
    light: {lightness: 36},
    dark: {lightness: 36},
  },
  actionDisabledOnDark: {
    baseColor: 'onSurface',
    light: {lightness: 66},
    dark: {lightness: 66},
  },
  actionDisabledOnLight: {
    baseColor: 'onSurface',
    light: {lightness: 46},
    dark: {lightness: 46},
  },
  actionHoveredOnDark: {
    baseColor: 'onSurface',
    light: {lightness: 86},
    dark: {lightness: 86},
  },
  actionHoveredOnLight: {
    baseColor: 'onSurface',
    light: {lightness: 26},
    dark: {lightness: 26},
  },
  actionPressedOnDark: {
    baseColor: 'onSurface',
    light: {lightness: 96},
    dark: {lightness: 96},
  },
  actionPressedOnLight: {
    baseColor: 'onSurface',
    light: {lightness: 16},
    dark: {lightness: 16},
  },
  borderOnDark: {
    baseColor: 'onSurface',
    light: {lightness: 80},
    dark: {lightness: 80},
  },
  borderOnLight: {
    baseColor: 'onSurface',
    light: {lightness: 75},
    dark: {lightness: 75},
  },
  borderDisabledOnDark: {
    baseColor: 'onSurface',
    light: {lightness: 70},
    dark: {lightness: 70},
  },
  borderDisabledOnLight: {
    baseColor: 'onSurface',
    light: {lightness: 95},
    dark: {lightness: 95},
  },
  borderSubduedOnDark: {
    baseColor: 'onSurface',
    light: {lightness: 75},
    dark: {lightness: 75},
  },
  borderSubduedOnLight: {
    baseColor: 'onSurface',
    light: {lightness: 85},
    dark: {lightness: 85},
  },
  iconOnDark: {
    baseColor: 'onSurface',
    light: {lightness: 98},
    dark: {lightness: 98},
  },
  iconOnLight: {
    baseColor: 'onSurface',
    light: {lightness: 18},
    dark: {lightness: 18},
  },
  iconDisabledOnDark: {
    baseColor: 'onSurface',
    light: {lightness: 75},
    dark: {lightness: 75},
  },
  iconDisabledOnLight: {
    baseColor: 'onSurface',
    light: {lightness: 68},
    dark: {lightness: 68},
  },
  iconSubduedOnDark: {
    baseColor: 'onSurface',
    light: {lightness: 88},
    dark: {lightness: 88},
  },
  iconSubduedOnLight: {
    baseColor: 'onSurface',
    light: {lightness: 39.5},
    dark: {lightness: 39.5},
  },
  textOnDark: {
    baseColor: 'onSurface',
    light: {lightness: 100},
    dark: {lightness: 100},
  },
  textOnLight: {
    baseColor: 'onSurface',
    light: {lightness: 8.8},
    dark: {lightness: 8.8},
  },
  textDisabledOnDark: {
    baseColor: 'onSurface',
    light: {lightness: 80},
    dark: {lightness: 80},
  },
  textDisabledOnLight: {
    baseColor: 'onSurface',
    light: {lightness: 63},
    dark: {lightness: 63},
  },
  textSubduedOnDark: {
    baseColor: 'onSurface',
    light: {lightness: 90},
    dark: {lightness: 90},
  },
  textSubduedOnLight: {
    baseColor: 'onSurface',
    light: {lightness: 38},
    dark: {lightness: 38},
  },
  interactive: {baseColor: 'interactive', light: {}, dark: {}},
  interactiveAction: {
    baseColor: 'interactive',
    light: {lightness: 44},
    dark: {lightness: 65},
  },
  interactiveActionDisabled: {
    baseColor: 'interactive',
    light: {lightness: 58},
    dark: {lightness: 42},
  },
  interactiveActionHovered: {
    baseColor: 'interactive',
    light: {lightness: 37},
    dark: {lightness: 70},
  },
  interactiveActionSubdued: {
    baseColor: 'interactive',
    light: {lightness: 51},
    dark: {lightness: 49},
  },
  interactiveActionPressed: {
    baseColor: 'interactive',
    light: {lightness: 31},
    dark: {lightness: 75},
  },
  interactiveFocus: {
    baseColor: 'interactive',
    light: {lightness: 58},
    dark: {lightness: 42},
  },
  interactiveSelected: {
    baseColor: 'interactive',
    light: {lightness: 96},
    dark: {lightness: 4},
  },
  interactiveSelectedHovered: {
    baseColor: 'interactive',
    light: {lightness: 89},
    dark: {lightness: 11},
  },
  interactiveSelectedPressed: {
    baseColor: 'interactive',
    light: {lightness: 82},
    dark: {lightness: 18},
  },
  neutral: {baseColor: 'neutral', light: {}, dark: {}},
  neutralActionDisabled: {
    baseColor: 'neutral',
    light: {lightness: 94},
    dark: {lightness: 13},
  },
  neutralAction: {
    baseColor: 'neutral',
    light: {lightness: 93},
    dark: {lightness: 22},
  },
  neutralActionHovered: {
    baseColor: 'neutral',
    light: {lightness: 90},
    dark: {lightness: 25},
  },
  neutralActionPressed: {
    baseColor: 'neutral',
    light: {lightness: 87},
    dark: {lightness: 39},
  },
  branded: {baseColor: 'branded', light: {}, dark: {}},
  brandedAction: {
    baseColor: 'branded',
    light: {lightness: 47.3},
    dark: {lightness: 47.3},
  },
  brandedActionDisabled: {
    baseColor: 'branded',
    light: {lightness: 32},
    dark: {lightness: 32},
  },
  brandedActionHovered: {
    baseColor: 'branded',
    light: {lightness: 42.3},
    dark: {lightness: 55},
  },
  brandedActionPressed: {
    baseColor: 'branded',
    light: {lightness: 37.3},
    dark: {lightness: 60},
  },
  iconOnBranded: {
    baseColor: 'branded',
    light: {lightness: 98},
    dark: {lightness: 98},
  },
  iconSubduedOnBranded: {
    baseColor: 'branded',
    light: {lightness: 88},
    dark: {lightness: 88},
  },
  textOnBranded: {
    baseColor: 'branded',
    light: {lightness: 100},
    dark: {lightness: 100},
  },
  textSubduedOnBranded: {
    baseColor: 'branded',
    light: {lightness: 90},
    dark: {lightness: 90},
  },
  brandedSelected: {
    baseColor: 'branded',
    light: {lightness: 95, saturation: 30},
    dark: {lightness: 5, saturation: 30},
  },
  brandedSelectedHovered: {
    baseColor: 'branded',
    light: {lightness: 81, saturation: 22},
    dark: {lightness: 19, saturation: 22},
  },
  brandedSelectedPressed: {
    baseColor: 'branded',
    light: {lightness: 74, saturation: 22},
    dark: {lightness: 26, saturation: 22},
  },
  critical: {baseColor: 'critical', light: {}, dark: {}},
  criticalBorder: {
    baseColor: 'critical',
    light: {lightness: 50},
    dark: {lightness: 50},
  },
  criticalBorderDisabled: {
    baseColor: 'critical',
    light: {lightness: 82},
    dark: {lightness: 28},
  },
  criticalIcon: {
    baseColor: 'critical',
    light: {lightness: 52},
    dark: {lightness: 48},
  },
  criticalSurface: {
    baseColor: 'critical',
    light: {lightness: 98.6},
    dark: {lightness: 12},
  },
  criticalSurfaceSubdued: {
    baseColor: 'critical',
    light: {lightness: 98},
    dark: {lightness: 12},
  },
  criticalSurfaceSubduedHovered: {
    baseColor: 'critical',
    light: {lightness: 93},
    dark: {lightness: 15, saturation: 60},
  },
  criticalSurfaceSubduedPressed: {
    baseColor: 'critical',
    light: {lightness: 88},
    dark: {lightness: 22},
  },
  criticalText: {
    baseColor: 'critical',
    light: {lightness: 40},
    dark: {lightness: 60},
  },
  criticalActionDisabled: {
    baseColor: 'critical',
    light: {lightness: 59},
    dark: {lightness: 41},
  },
  criticalAction: {
    baseColor: 'critical',
    light: {lightness: 47.5},
    dark: {lightness: 45},
  },
  criticalActionHovered: {
    baseColor: 'critical',
    light: {lightness: 42.5},
    dark: {lightness: 50},
  },
  criticalActionPressed: {
    baseColor: 'critical',
    light: {lightness: 37.5},
    dark: {lightness: 60},
  },
  criticalLink: {
    baseColor: 'critical',
    light: {lightness: 48.5},
    dark: {lightness: 65},
  },
  criticalLinkDisabled: {
    baseColor: 'critical',
    light: {lightness: 72},
    dark: {lightness: 78},
  },
  criticalLinkHovered: {
    baseColor: 'critical',
    light: {lightness: 45},
    dark: {lightness: 70},
  },
  criticalLinkPressed: {
    baseColor: 'critical',
    light: {lightness: 21},
    dark: {lightness: 75},
  },
  warning: {baseColor: 'warning', light: {}, dark: {}},
  warningBorder: {
    baseColor: 'warning',
    light: {lightness: 76.6},
    dark: {lightness: 50},
  },
  warningIcon: {
    baseColor: 'warning',
    light: {lightness: 66},
    dark: {lightness: 34},
  },
  warningSurface: {
    baseColor: 'warning',
    light: {lightness: 84.5},
    dark: {lightness: 50},
  },
  warningSurfaceSubdued: {
    baseColor: 'warning',
    light: {lightness: 99.1},
    dark: {lightness: 15},
  },
  warningText: {
    baseColor: 'warning',
    light: {lightness: 30},
    dark: {lightness: 70},
  },
  highlight: {baseColor: 'highlight', light: {}, dark: {}},
  highlightBorder: {
    baseColor: 'highlight',
    light: {lightness: 60},
    dark: {lightness: 60},
  },
  highlightIcon: {
    baseColor: 'highlight',
    light: {lightness: 58},
    dark: {lightness: 42},
  },
  highlightSurface: {
    baseColor: 'highlight',
    light: {lightness: 84.5, saturation: 60},
    dark: {lightness: 50, saturation: 100},
  },
  highlightSurfaceSubdued: {
    baseColor: 'highlight',
    light: {lightness: 98.6},
    dark: {lightness: 20},
  },
  highlightText: {
    baseColor: 'highlight',
    light: {lightness: 10},
    dark: {lightness: 90},
  },
  success: {baseColor: 'success', light: {}, dark: {}},
  successBorder: {
    baseColor: 'success',
    light: {lightness: 50},
    dark: {lightness: 50},
  },
  successIcon: {
    baseColor: 'success',
    light: {lightness: 25},
    dark: {lightness: 35},
  },
  successSurface: {
    baseColor: 'success',
    light: {lightness: 84.5, saturation: 60},
    dark: {lightness: 40},
  },
  successSurfaceSubdued: {
    baseColor: 'success',
    light: {lightness: 99, saturation: 60},
    dark: {lightness: 20, saturation: 60},
  },
  successText: {
    baseColor: 'success',
    light: {lightness: 40},
    dark: {lightness: 60},
  },
  backdrop: {
    baseColor: 'surface',
    light: {
      hue: 0,
      saturation: 0,
      lightness: 0,
      alpha: 0.5,
    },
    dark: {
      hue: 0,
      saturation: 0,
      lightness: 0,
      alpha: 0.5,
    },
  },
  backdropLight: {
    baseColor: 'surface',
    light: {
      hue: 0,
      saturation: 0,
      lightness: 100,
      alpha: 0.5,
    },
    dark: {
      hue: 0,
      saturation: 0,
      lightness: 100,
      alpha: 0.5,
    },
  },
  shadowFromAmbientLight: {
    baseColor: 'surface',
    light: {
      hue: 180,
      saturation: 5,
      lightness: 8,
      alpha: 0.05,
    },
    dark: {
      hue: 180,
      saturation: 5,
      lightness: 8,
      alpha: 0.05,
    },
  },
  shadowFromDirectLight: {
    baseColor: 'surface',
    light: {
      hue: 0,
      saturation: 0,
      lightness: 0,
      alpha: 0.15,
    },
    dark: {
      hue: 0,
      saturation: 0,
      lightness: 0,
      alpha: 0.15,
    },
  },
  decorativeOneSurface: {
    baseColor: 'decorative',
    light: {
      hue: 56,
      saturation: 100,
      lightness: 84,
    },
    dark: {
      hue: 54,
      saturation: 98,
      lightness: 46,
    },
  },
  decorativeOneText: {
    baseColor: 'decorative',
    light: {
      hue: 52,
      saturation: 100,
      lightness: 18,
    },
    dark: {lightness: 100},
  },
  decorativeTwoSurface: {
    baseColor: 'decorative',
    light: {
      hue: 30,
      saturation: 100,
      lightness: 84,
    },
    dark: {
      hue: 24,
      saturation: 96,
      lightness: 52,
    },
  },
  decorativeTwoText: {
    baseColor: 'decorative',
    light: {
      hue: 362,
      saturation: 80,
      lightness: 14,
    },
    dark: {lightness: 100},
  },
  decorativeThreeSurface: {
    baseColor: 'decorative',
    light: {
      hue: 144,
      saturation: 54,
      lightness: 84,
    },
    dark: {
      hue: 154,
      saturation: 100,
      lightness: 46,
    },
  },
  decorativeThreeText: {
    baseColor: 'decorative',
    light: {
      hue: 144,
      saturation: 100,
      lightness: 16,
    },
    dark: {lightness: 100},
  },
  decorativeFourSurface: {
    baseColor: 'decorative',
    light: {
      hue: 180,
      saturation: 56,
      lightness: 84,
    },
    dark: {
      hue: 188,
      saturation: 95,
      lightness: 47,
    },
  },
  decorativeFourText: {
    baseColor: 'decorative',
    light: {
      hue: 190,
      saturation: 100,
      lightness: 16,
    },
    dark: {lightness: 100},
  },
  decorativeFiveSurface: {
    baseColor: 'decorative',
    light: {},
    dark: {
      hue: 363,
      saturation: 77,
      lightness: 45,
    },
  },
  decorativeFiveText: {
    baseColor: 'decorative',
    light: {
      hue: 363,
      saturation: 78,
      lightness: 16,
    },
    dark: {lightness: 100},
  },
};
