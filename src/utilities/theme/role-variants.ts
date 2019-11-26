import {RoleVariants} from './types';

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
}

export const roleVariants: RoleVariants = {
  surface: [
    {
      name: 'surface',
      description:
        'While use directly in our components is discouraged, the base variant is unmodified from the original role input color.',
      light: {},
      dark: {},
    },
    {
      name: 'surfaceBackground',
      description:
        'For use in the background of our UIs as a background color, in components such as Page and Frame backgrounds.',
      light: {lightness: 97.9},
      dark: {lightness: 3.3},
    },
    {
      name: 'surfaceForeground',
      description:
        'For use in the foreground of our UIs as a background color, in components such as Card, Modal, and Popover.',
      light: {lightness: 100},
      dark: {lightness: 8.8},
    },
    {
      name: 'surfaceForegroundSubdued',
      description:
        'For use in the foreground of our UIs as a subdued background color, in components such as Card, Modal, and Popover.',
      light: {lightness: 95},
      dark: {lightness: 10},
    },
    {
      name: 'surfaceHovered',
      description:
        'For use as a surface color on interactive elements such as resource list items and action list items when in a hovered state.',
      light: {lightness: 95},
      dark: {lightness: 20},
    },
    {
      name: 'surfacePressed',
      description:
        'For use as a surface color on interactive elements such as resource list items and action list items when in a pressed state.',
      light: {lightness: 90},
      dark: {lightness: 27},
    },
    {
      name: 'backdrop',
      description:
        'For use as the background color of the backdrop component for navigation and modal.',
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
    {
      name: 'shadowFromAmbientLight',
      description:
        'For use in building shadows for popovers, cards, and modals.',
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
    {
      name: 'shadowFromDirectLight',
      description:
        'For use in building shadows for popovers, cards, and modals.',
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
  ],
  onSurface: [
    {
      name: 'onSurface',
      description:
        'While use directly in our components is discouraged, the base variant is unmodified from the original role input color.',
      light: {},
      dark: {},
    },
    {
      name: 'borderOnSurface',
      description: 'For use as a border (border or interactive outline).',
      light: {lightness: 75},
      dark: {lightness: 35},
    },
    {
      name: 'borderDisabledOnSurface',
      description: 'For use as a an interactive outline on disabled elements.',
      light: {lightness: 95},
      dark: {lightness: 70},
    },
    {
      name: 'borderSubduedOnSurface',
      description:
        'For use as a subdued border (border or interactive outline).',
      light: {lightness: 85},
      dark: {lightness: 15},
    },
    {
      name: 'iconOnSurface',
      description: 'For use as the fill color of neutral icons.',
      light: {lightness: 29.9},
      dark: {lightness: 98},
    },
    {
      name: 'iconDisabledOnSurface',
      light: {lightness: 68},
      dark: {lightness: 75},
    },
    {
      name: 'iconSubduedOnSurface',
      light: {lightness: 59.8},
      dark: {lightness: 62},
    },
    {
      name: 'textOnSurface',
      light: {lightness: 13},
      dark: {lightness: 100},
    },
    {
      name: 'textDisabledOnSurface',
      light: {lightness: 61.3},
      dark: {lightness: 50},
    },
    {
      name: 'textSubduedOnSurface',
      light: {lightness: 38},
      dark: {lightness: 62},
    },
  ],
  interactive: [
    {
      name: 'interactiveAction',
      light: {lightness: 44},
      dark: {lightness: 65},
    },
    {
      name: 'interactiveActionDisabled',
      light: {lightness: 58},
      dark: {lightness: 42},
    },
    {
      name: 'interactiveActionHovered',
      light: {lightness: 37},
      dark: {lightness: 70},
    },
    {
      name: 'interactiveActionSubdued',
      light: {lightness: 51},
      dark: {lightness: 49},
    },
    {
      name: 'interactiveActionPressed',
      light: {lightness: 31},
      dark: {lightness: 75},
    },
    {
      name: 'interactiveFocus',
      light: {lightness: 58},
      dark: {lightness: 42},
    },
    {
      name: 'interactiveSelected',
      light: {lightness: 96},
      dark: {lightness: 4},
    },
    {
      name: 'interactiveSelectedHovered',
      light: {lightness: 89},
      dark: {lightness: 11},
    },
    {
      name: 'interactiveSelectedPressed',
      light: {lightness: 82},
      dark: {lightness: 18},
    },
  ],
  neutral: [
    {
      name: 'neutralActionDisabled',
      light: {lightness: 94},
      dark: {lightness: 13},
    },
    {
      name: 'neutralAction',
      light: {lightness: 93},
      dark: {lightness: 22},
    },
    {
      name: 'neutralActionHovered',
      light: {lightness: 90},
      dark: {lightness: 25},
    },
    {
      name: 'neutralActionPressed',
      light: {lightness: 87},
      dark: {lightness: 39},
    },
  ],
  branded: [
    {
      name: 'brandedAction',
      light: {lightness: 47.3},
      dark: {lightness: 47.3},
    },
    {
      name: 'brandedActionDisabled',
      light: {lightness: 32},
      dark: {lightness: 32},
    },
    {
      name: 'brandedActionHovered',
      light: {lightness: 42.3},
      dark: {lightness: 55},
    },
    {
      name: 'brandedActionPressed',
      light: {lightness: 37.3},
      dark: {lightness: 60},
    },
    {
      name: 'iconOnBranded',
      light: {lightness: 98},
      dark: {lightness: 98},
    },
    {
      name: 'iconSubduedOnBranded',
      light: {lightness: 88},
      dark: {lightness: 88},
    },
    {
      name: 'textOnBranded',
      light: {lightness: 100},
      dark: {lightness: 100},
    },
    {
      name: 'textSubduedOnBranded',
      light: {lightness: 90},
      dark: {lightness: 90},
    },
    {
      name: 'brandedSelected',
      light: {lightness: 95, saturation: 30},
      dark: {lightness: 5, saturation: 30},
    },
    {
      name: 'brandedSelectedHovered',
      light: {lightness: 81, saturation: 22},
      dark: {lightness: 19, saturation: 22},
    },
    {
      name: 'brandedSelectedPressed',
      light: {lightness: 74, saturation: 22},
      dark: {lightness: 26, saturation: 22},
    },
  ],
  critical: [
    {
      name: 'criticalBorder',
      light: {lightness: 50},
      dark: {lightness: 50},
    },
    {
      name: 'criticalBorderDisabled',
      light: {lightness: 82},
      dark: {lightness: 28},
    },
    {
      name: 'criticalIcon',
      light: {lightness: 52},
      dark: {lightness: 48},
    },
    {
      name: 'criticalSurface',
      light: {lightness: 98.6},
      dark: {lightness: 12},
    },
    {
      name: 'criticalSurfaceSubdued',
      light: {lightness: 98},
      dark: {lightness: 12},
    },
    {
      name: 'criticalSurfaceSubduedHovered',
      light: {lightness: 93},
      dark: {lightness: 15, saturation: 60},
    },
    {
      name: 'criticalSurfaceSubduedPressed',
      light: {lightness: 88},
      dark: {lightness: 22},
    },
    {
      name: 'criticalText',
      light: {lightness: 40},
      dark: {lightness: 60},
    },
    {
      name: 'criticalActionDisabled',
      light: {lightness: 59},
      dark: {lightness: 41},
    },
    {
      name: 'criticalAction',
      light: {lightness: 47.5},
      dark: {lightness: 45},
    },
    {
      name: 'criticalActionHovered',
      light: {lightness: 42.5},
      dark: {lightness: 50},
    },
    {
      name: 'criticalActionPressed',
      light: {lightness: 37.5},
      dark: {lightness: 60},
    },
    {
      name: 'criticalLink',
      light: {lightness: 48.5},
      dark: {lightness: 65},
    },
    {
      name: 'criticalLinkDisabled',
      light: {lightness: 72},
      dark: {lightness: 78},
    },
    {
      name: 'criticalLinkHovered',
      light: {lightness: 45},
      dark: {lightness: 70},
    },
    {
      name: 'criticalLinkPressed',
      light: {lightness: 21},
      dark: {lightness: 75},
    },
  ],
  warning: [
    {
      name: 'warningBorder',
      light: {lightness: 76.6},
      dark: {lightness: 50},
    },
    {
      name: 'warningIcon',
      light: {lightness: 66},
      dark: {lightness: 34},
    },
    {
      name: 'warningSurface',
      light: {lightness: 84.5},
      dark: {lightness: 50},
    },
    {
      name: 'warningSurfaceSubdued',
      light: {lightness: 99.1},
      dark: {lightness: 15},
    },
    {
      name: 'warningText',
      light: {lightness: 30},
      dark: {lightness: 70},
    },
  ],
  highlight: [
    {
      name: 'highlightBorder',
      light: {lightness: 60},
      dark: {lightness: 60},
    },
    {
      name: 'highlightIcon',
      light: {lightness: 58},
      dark: {lightness: 42},
    },
    {
      name: 'highlightSurface',
      light: {lightness: 84.5, saturation: 60},
      dark: {lightness: 50, saturation: 100},
    },
    {
      name: 'highlightSurfaceSubdued',
      light: {lightness: 98.6},
      dark: {lightness: 20},
    },
    {
      name: 'highlightText',
      light: {lightness: 98},
      dark: {lightness: 2},
    },
  ],
  success: [
    {
      name: 'successBorder',
      light: {lightness: 50},
      dark: {lightness: 50},
    },
    {
      name: 'successIcon',
      light: {lightness: 25},
      dark: {lightness: 35},
    },
    {
      name: 'successSurface',
      light: {lightness: 84.5, saturation: 60},
      dark: {lightness: 40},
    },
    {
      name: 'successSurfaceSubdued',
      light: {lightness: 99, saturation: 60},
      dark: {lightness: 20, saturation: 60},
    },
    {
      name: 'successText',
      light: {lightness: 40},
      dark: {lightness: 60},
    },
  ],
};
