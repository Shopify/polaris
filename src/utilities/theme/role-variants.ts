import {RoleVariants} from './types';

// eslint-disable-next-line shopify/typescript/prefer-pascal-case-enums
export enum UNSTABLE_Color {
  Surface = '#FAFAFA',
  DarkSurface = '#111213',
  OnSurface = '#111213',
  Interactive = '#2E72D2',
  Neutral = '#111213',
  Primary = '#008060',
  Critical = '#D82C0D',
  Warning = '#FFC453',
  Highlight = '#5BCDDA',
  Success = '#008060',
  Decorative = '#FDC7CE',
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
      light: {lightness: 98.3},
      dark: {lightness: 3.3},
    },
    {
      name: 'surfaceForeground',
      description:
        'For use in the foreground of our UIs as a background color, in components such as Card, Modal, and Popover.',
      light: {lightness: 100},
      dark: {lightness: 12.7},
    },
    {
      name: 'surfaceForegroundSubdued',
      description:
        'For use in the foreground of our UIs as a subdued background color, in components such as Card, Modal, and Popover.',
      light: {lightness: 98.3},
      dark: {lightness: 10},
    },
    {
      name: 'surfaceHovered',
      description:
        'For use as a surface color on interactive elements such as resource list items and action list items when in a hovered state.',
      light: {lightness: 96},
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
      dark: {lightness: 32},
    },
    {
      name: 'iconOnSurface',
      description: 'For use as the fill color of neutral icons.',
      light: {lightness: 40.1},
      dark: {lightness: 70.1},
    },
    {
      name: 'iconDisabledOnSurface',
      description: 'For use as the fill color of disabled neutral icons.',
      light: {lightness: 76.9},
      dark: {lightness: 36.8},
    },
    {
      name: 'iconSubduedOnSurface',
      description: 'For use as the fill color of subdued neutral icons.',
      light: {lightness: 59.8},
      dark: {lightness: 52.1},
    },
    {
      name: 'textOnSurface',
      description: 'For use as a neutral text color.',
      light: {lightness: 13.1},
      dark: {lightness: 90.8},
    },
    {
      name: 'textDisabledOnSurface',
      description: 'For use as a disabled neutral text color.',
      light: {lightness: 61.3},
      dark: {lightness: 48.2},
    },
    {
      name: 'textSubduedOnSurface',
      description: 'For use as a subdued neutral text color.',
      light: {lightness: 47.4},
      dark: {lightness: 65.1},
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
      light: {lightness: 48.6},
      dark: {lightness: 65, saturation: 100, hue: 247.6},
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
      dark: {lightness: 70, saturation: 100, hue: 247.6},
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
      dark: {lightness: 75, saturation: 100, hue: 247.6},
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
      dark: {lightness: 37},
    },
    {
      name: 'neutralActionPressed',
      description: 'Used as a pressed state for secondary buttons',
      light: {lightness: 87},
      dark: {lightness: 42},
    },
  ],
  primary: [
    {
      name: 'primary',
      description:
        'While use directly in our components is discouraged, the base variant is unmodified from the original role input color.',
      light: {},
      dark: {},
    },
    {
      name: 'primaryAction',
      description:
        'Used as the background color for primary actions, and as the fill color for icons and the text color in navigation and tabs to communicate interaction states.',
      light: {lightness: 47.3},
      dark: {lightness: 47.3},
    },
    {
      name: 'primaryActionDisabled',
      description:
        'Used as the background color for disabled primary actions, and as the fill color for icons and the text color in navigation and tabs to communicate interaction states.',
      light: {lightness: 32},
      dark: {lightness: 32},
    },
    {
      name: 'primaryActionHovered',
      description:
        'Used as the background color for hovered primary actions, and as the fill color for icons and the text color in navigation and tabs to communicate interaction states.',
      light: {lightness: 42.3},
      dark: {lightness: 55},
    },
    {
      name: 'primaryActionPressed',
      description:
        'Used as the background color for pressed primary actions, and as the fill color for icons and the text color in navigation and tabs to communicate interaction states.',
      light: {lightness: 37.3},
      dark: {lightness: 60},
    },
    {
      name: 'iconOnPrimary',
      description:
        'For use as a fill color for icons on primary actions. Not for use in icons on navigation and tabs.',
      light: {lightness: 98},
      dark: {lightness: 98},
    },
    {
      name: 'iconSubduedOnPrimary',
      description:
        'For use as a fill color for icons on subdued primary actions. Not for use in icons on navigation and tabs.',
      light: {lightness: 88},
      dark: {lightness: 88},
    },
    {
      name: 'iconDisabledOnPrimary',
      description:
        'For use as a fill color for icons on disabled primary actions. Not for use in icons on navigation and tabs.',
      light: {lightness: 78},
      dark: {lightness: 78},
    },
    {
      name: 'textOnPrimary',
      description:
        'For use as a text color on primary actions. Not for use in text on navigation and tabs.',
      light: {lightness: 100},
      dark: {lightness: 100},
    },
    {
      name: 'textSubduedOnPrimary',
      description:
        'For use as a text color on subdued primary actions. Not for use in text on navigation and tabs.',
      light: {lightness: 90},
      dark: {lightness: 90},
    },
    {
      name: 'textDisabledOnPrimary',
      description:
        'For use as a text color on disabled primary actions. Not for use in text on navigation and tabs.',
      light: {lightness: 90},
      dark: {lightness: 90},
    },
    {
      name: 'primarySelected',
      description:
        'Used as a surface color to indicate selected interactive states in navigation and tabs.',
      light: {lightness: 95, saturation: 30},
      dark: {lightness: 5, saturation: 30},
    },
    {
      name: 'primarySelectedHovered',
      description:
        'Used as a surface color to indicate selected interactive states that are hovered in navigation and tabs.',
      light: {lightness: 81, saturation: 22},
      dark: {lightness: 19, saturation: 22},
    },
    {
      name: 'primarySelectedPressed',
      description:
        'Used as a surface color to indicate selected interactive states that are pressed in navigation and tabs.',
      light: {lightness: 74, saturation: 22},
      dark: {lightness: 26, saturation: 22},
    },
  ],
  critical: [
    {
      name: 'critical',
      description:
        'While use directly in our components is discouraged, the base variant is unmodified from the original role input color.',
      light: {},
      dark: {},
    },
    {
      name: 'criticalBorder',
      description:
        'For use as a border on critical components such as banners, and as an outline on interactive elements in an error state.',
      light: {lightness: 50},
      dark: {lightness: 50},
    },
    {
      name: 'criticalBorderDisabled',
      description:
        'For use as a disabled border on critical components such as banners, and as an outline on interactive elements in an error state.',
      light: {lightness: 82},
      dark: {lightness: 28},
    },
    {
      name: 'criticalIcon',
      description: 'For use as an icon fill color on top of critical elements.',
      light: {lightness: 52},
      dark: {lightness: 48},
    },
    {
      name: 'criticalSurface',
      description:
        'For use as a surface color on critical elements including badges.',
      light: {lightness: 98.6},
      dark: {lightness: 12},
    },
    {
      name: 'criticalSurfaceSubdued',
      description:
        'For use as a subdued surface color on critical elements including banners.',
      light: {lightness: 98},
      dark: {lightness: 12},
    },
    {
      name: 'criticalSurfaceSubduedHovered',
      description:
        'For use as a surface color on critical interactive elements including action list items in a hovered state.',
      light: {lightness: 96},
      dark: {lightness: 15, saturation: 60},
    },
    {
      name: 'criticalSurfaceSubduedPressed',
      description:
        'For use as a surface color on critical interactive elements including action list items in a pressed state.',
      light: {lightness: 88},
      dark: {lightness: 22},
    },
    {
      name: 'criticalText',
      description:
        'For use as a text color in inert critical elements such as exception list. Not for use as a text color on banners and badges.',
      light: {lightness: 47.3},
      dark: {lightness: 65, saturation: 70},
    },
    {
      name: 'criticalAction',
      description:
        'For use as the background color for destructive buttons, and as the background color for error toast messages.',
      light: {lightness: 47.5},
      dark: {lightness: 45},
    },
    {
      name: 'criticalActionDisabled',
      description:
        'For use as the background color for disabled destructive buttons, and as the background color for error toast messages.',
      light: {lightness: 59},
      dark: {lightness: 41},
    },
    {
      name: 'criticalActionHovered',
      description:
        'For use as the background color for hovered destructive buttons, and as the background color for error toast messages.',
      light: {lightness: 42.5},
      dark: {lightness: 50},
    },
    {
      name: 'criticalActionPressed',
      description:
        'For use as the background color for pressed destructive buttons, and as the background color for error toast messages.',
      light: {lightness: 37.5},
      dark: {lightness: 55},
    },
    {
      name: 'criticalLink',
      description:
        'For use as a text color in destructive plain buttons, as well as a text color on destructive action list items. Not for use on critical banners and badges.',
      light: {lightness: 48.5},
      dark: {lightness: 65},
    },
    {
      name: 'criticalLinkDisabled',
      description:
        'For use as a text color in disabled destructive plain buttons, as well as a text color on destructive action list items. Not for use on critical banners and badges.',
      light: {lightness: 72},
      dark: {lightness: 78},
    },
    {
      name: 'criticalLinkHovered',
      description:
        'For use as a text color in hovered destructive plain buttons, as well as a text color on destructive action list items. Not for use on critical banners and badges.',
      light: {lightness: 45},
      dark: {lightness: 70},
    },
    {
      name: 'criticalLinkPressed',
      description:
        'For use as a text color in pressed destructive plain buttons, as well as a text color on destructive action list items. Not for use on critical banners and badges.',
      light: {lightness: 21},
      dark: {lightness: 75},
    },
  ],
  warning: [
    {
      name: 'warning',
      description:
        'While use directly in our components is discouraged, the base variant is unmodified from the original role input color.',
      light: {},
      dark: {},
    },
    {
      name: 'warningBorder',
      description: 'For use as a border on warning components such as banners.',
      light: {lightness: 76.6},
      dark: {lightness: 50},
    },
    {
      name: 'warningIcon',
      description: 'For use as an icon fill color on top of warning elements.',
      light: {lightness: 66},
      dark: {lightness: 34},
    },
    {
      name: 'warningSurface',
      description:
        'For use as a surface color on warning elements including badges.',
      light: {lightness: 84.5},
      dark: {lightness: 50},
    },
    {
      name: 'warningSurfaceSubdued',
      description:
        'For use as a subdued surface color on warning elements including banners.',
      light: {lightness: 96},
      dark: {lightness: 26, saturation: 71},
    },
    {
      name: 'warningText',
      description:
        'For use as a text color in inert critical elements such as exception list. Not for use as a text color on banners and badges.',
      light: {lightness: 47.4},
      dark: {lightness: 64.9},
    },
  ],
  highlight: [
    {
      name: 'highlight',
      description:
        'While use directly in our components is discouraged, the base variant is unmodified from the original role input color.',
      light: {},
      dark: {},
    },
    {
      name: 'highlightBorder',
      description:
        'For use as a border on informational components such as banners.',
      light: {lightness: 60},
      dark: {lightness: 60},
    },
    {
      name: 'highlightIcon',
      description:
        'For use as an icon fill color on top of informational elements.',
      light: {lightness: 58},
      dark: {lightness: 42},
    },
    {
      name: 'highlightSurface',
      description:
        'For use as a surface color on information elements including badges.',
      light: {lightness: 84.5, saturation: 60},
      dark: {lightness: 40, saturation: 100},
    },
    {
      name: 'highlightSurfaceSubdued',
      description:
        'For use as a surface color on information elements including banners.',
      light: {lightness: 98.6},
      dark: {lightness: 20},
    },
    {
      name: 'highlightext',
      description:
        'For use as a text color in inert informational elements. Not for use as a text color on banners and badges.',
      light: {lightness: 10},
      dark: {lightness: 90},
    },
  ],
  success: [
    {
      name: 'success',
      description:
        'While use directly in our components is discouraged, the base variant is unmodified from the original role input color.',
      light: {},
      dark: {},
    },
    {
      name: 'successBorder',
      description: 'For use as a border on success components such as banners.',
      light: {lightness: 50},
      dark: {lightness: 50},
    },
    {
      name: 'successIcon',
      description: 'For use as an icon fill color on top of success elements.',
      light: {lightness: 25},
      dark: {lightness: 35},
    },
    {
      name: 'successSurface',
      description:
        'For use as a surface color on success elements including badges.',
      light: {lightness: 84.5, saturation: 60},
      dark: {lightness: 35},
    },
    {
      name: 'successSurfaceSubdued',
      description:
        'For use as a surface color on information elements including banners.',
      light: {lightness: 99, saturation: 60},
      dark: {lightness: 20, saturation: 60},
    },
    {
      name: 'successText',
      description:
        'For use as a text color in inert success elements. Not for use as a text color on banners and badges.',
      light: {lightness: 47.3},
      dark: {lightness: 65, saturation: 70},
    },
  ],
  decorative: [
    {
      name: 'decorativeOneSurface',
      description: 'For use as a decorative surface color.',
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
    {
      name: 'decorativeOneText',
      description:
        'For use as a decorative text color that is applied on a decorative surface.',
      light: {
        hue: 52,
        saturation: 100,
        lightness: 18,
      },
      dark: {lightness: 100},
    },
    {
      name: 'decorativeTwoSurface',
      description: 'For use as a decorative surface color.',
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
    {
      name: 'decorativeTwoText',
      description:
        'For use as a decorative text color that is applied on a decorative surface.',
      light: {
        hue: 362,
        saturation: 80,
        lightness: 14,
      },
      dark: {lightness: 100},
    },
    {
      name: 'decorativeThreeSurface',
      description: 'For use as a decorative surface color.',
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
    {
      name: 'decorativeThreeText',
      description:
        'For use as a decorative text color that is applied on a decorative surface.',
      light: {
        hue: 144,
        saturation: 100,
        lightness: 16,
      },
      dark: {lightness: 100},
    },
    {
      name: 'decorativeFourSurface',
      description: 'For use as a decorative surface color.',
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
    {
      name: 'decorativeFourText',
      description:
        'For use as a decorative text color that is applied on a decorative surface.',
      light: {
        hue: 190,
        saturation: 100,
        lightness: 16,
      },
      dark: {lightness: 100},
    },
    {
      name: 'decorativeFiveSurface',
      description: 'For use as a decorative surface color.',
      light: {},
      dark: {
        hue: 363,
        saturation: 77,
        lightness: 45,
      },
    },
    {
      name: 'decorativeFiveText',
      description:
        'For use as a decorative text color that is applied on a decorative surface.',
      light: {
        hue: 363,
        saturation: 78,
        lightness: 16,
      },
      dark: {lightness: 100},
    },
  ],
};
