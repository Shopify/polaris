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
      description: 'For use as the fill color of disabled neutral icons.',
      light: {lightness: 68},
      dark: {lightness: 75},
    },
    {
      name: 'iconSubduedOnSurface',
      description: 'For use as the fill color of subdued neutral icons.',
      light: {lightness: 59.8},
      dark: {lightness: 62},
    },
    {
      name: 'textOnSurface',
      description: 'For use as a neutral text color.',
      light: {lightness: 13},
      dark: {lightness: 100},
    },
    {
      name: 'textDisabledOnSurface',
      description: 'For use as a disabled neutral text color.',
      light: {lightness: 61.3},
      dark: {lightness: 50},
    },
    {
      name: 'textSubduedOnSurface',
      description: 'For use as a subdued neutral text color.',
      light: {lightness: 38},
      dark: {lightness: 62},
    },
  ],
  interactive: [
    {
      name: 'interactive',
      description:
        'While use directly in our components is discouraged, the base variant is unmodified from the original role input color.',
      light: {},
      dark: {},
    },
    {
      name: 'interactiveAction',
      description: 'Used for links and plain buttons.',
      light: {lightness: 44},
      dark: {lightness: 65},
    },
    {
      name: 'interactiveActionDisabled',
      description: 'Used for disabled links and plain buttons.',
      light: {lightness: 58},
      dark: {lightness: 42},
    },
    {
      name: 'interactiveActionHovered',
      description: 'Used for hovered links and plain buttons.',
      light: {lightness: 37},
      dark: {lightness: 70},
    },
    {
      name: 'interactiveActionSubdued',
      description: 'Used for subdued links and plain buttons.',
      light: {lightness: 51},
      dark: {lightness: 49},
    },
    {
      name: 'interactiveActionPressed',
      description: 'Used for pressed links and plain buttons.',
      light: {lightness: 31},
      dark: {lightness: 75},
    },
    {
      name: 'interactiveFocus',
      description: 'For use in the focus ring on interactive elements.',
      light: {lightness: 58},
      dark: {lightness: 42},
    },
    {
      name: 'interactiveSelected',
      description:
        'For use as a surface color in selected interactive elements, in components such as option list and resource list.',
      light: {lightness: 96},
      dark: {lightness: 4},
    },
    {
      name: 'interactiveSelectedHovered',
      description:
        'For use as a surface color in selected interactive elements that are hovered, in components such as option list and resource list.',
      light: {lightness: 89},
      dark: {lightness: 11},
    },
    {
      name: 'interactiveSelectedPressed',
      description:
        'For use as a surface color in selected interactive elements that are pressed, in components such as option list and resource list.',
      light: {lightness: 82},
      dark: {lightness: 18},
    },
  ],
  neutral: [
    {
      name: 'neutral',
      description:
        'While use directly in our components is discouraged, the base variant is unmodified from the original role input color.',
      light: {},
      dark: {},
    },
    {
      name: 'neutralAction',
      description:
        'Used for secondary buttons and tertiary buttons, as well as in form elements as a background color and pontentially other neutral surfaces.',
      light: {lightness: 93},
      dark: {lightness: 22},
    },
    {
      name: 'neutralActionDisabled',
      description: 'Used as a disabled state for secondary buttons',
      light: {lightness: 94},
      dark: {lightness: 13},
    },
    {
      name: 'neutralActionHovered',
      description: 'Used as a hovered state for secondary buttons',
      light: {lightness: 90},
      dark: {lightness: 25},
    },
    {
      name: 'neutralActionPressed',
      description: 'Used as a pressed state for secondary buttons',
      light: {lightness: 87},
      dark: {lightness: 39},
    },
  ],
  branded: [
    {
      name: 'branded',
      description:
        'While use directly in our components is discouraged, the base variant is unmodified from the original role input color.',
      light: {},
      dark: {},
    },
    {
      name: 'brandedAction',
      description:
        'Used as the background color for primary actions, and as the fill color for icons and the text color in navigation and tabs to communicate interaction states.',
      light: {lightness: 47.3},
      dark: {lightness: 47.3},
    },
    {
      name: 'brandedActionDisabled',
      description:
        'Used as the background color for disabled primary actions, and as the fill color for icons and the text color in navigation and tabs to communicate interaction states.',
      light: {lightness: 32},
      dark: {lightness: 32},
    },
    {
      name: 'brandedActionHovered',
      description:
        'Used as the background color for hovered primary actions, and as the fill color for icons and the text color in navigation and tabs to communicate interaction states.',
      light: {lightness: 42.3},
      dark: {lightness: 55},
    },
    {
      name: 'brandedActionPressed',
      description:
        'Used as the background color for pressed primary actions, and as the fill color for icons and the text color in navigation and tabs to communicate interaction states.',
      light: {lightness: 37.3},
      dark: {lightness: 60},
    },
    {
      name: 'iconOnBranded',
      description:
        'For use as a fill color for icons on primary actions. Not for use in icons on navigation and tabs.',
      light: {lightness: 98},
      dark: {lightness: 98},
    },
    {
      name: 'iconSubduedOnBranded',
      description:
        'For use as a fill color for icons on subdued primary actions. Not for use in icons on navigation and tabs.',
      light: {lightness: 88},
      dark: {lightness: 88},
    },
    {
      name: 'iconDisabledOnBranded',
      description:
        'For use as a fill color for icons on disabled primary actions. Not for use in icons on navigation and tabs.',
      light: {lightness: 78},
      dark: {lightness: 78},
    },
    {
      name: 'textOnBranded',
      description:
        'For use as a text color on primary actions. Not for use in text on navigation and tabs.',
      light: {lightness: 100},
      dark: {lightness: 100},
    },
    {
      name: 'textSubduedOnBranded',
      description:
        'For use as a text color on subdued primary actions. Not for use in text on navigation and tabs.',
      light: {lightness: 90},
      dark: {lightness: 90},
    },
    {
      name: 'textDisabledOnBranded',
      description:
        'For use as a text color on disabled primary actions. Not for use in text on navigation and tabs.',
      light: {lightness: 90},
      dark: {lightness: 90},
    },
    {
      name: 'brandedSelected',
      description:
        'Used as a surface color to indicate selected interactive states in navigation and tabs.',
      light: {lightness: 95, saturation: 30},
      dark: {lightness: 5, saturation: 30},
    },
    {
      name: 'brandedSelectedHovered',
      description:
        'Used as a surface color to indicate selected interactive states that are hovered in navigation and tabs.',
      light: {lightness: 81, saturation: 22},
      dark: {lightness: 19, saturation: 22},
    },
    {
      name: 'brandedSelectedPressed',
      description:
        'Used as a surface color to indicate selected interactive states that are pressed in navigation and tabs.',
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
