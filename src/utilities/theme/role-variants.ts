import {RoleVariants, ColorScheme} from './types';

export const DefaultThemeColors = {
  surface: '#111213',
  onSurface: '#111213',
  interactive: '#2E72D2',
  secondary: '#111213',
  primary: '#008060',
  critical: '#D82C0D',
  warning: '#FFC453',
  highlight: '#5BCDDA',
  success: '#008060',
  decorative: '#FFC96B',
};

export const DefaultColorScheme: ColorScheme = 'light';

function hueRotationFn(rotation: number) {
  return (hue: number) => (360 + hue + rotation) % 360;
}

function saturationAdjustmentFn(adjustment: number) {
  return (saturation: number) =>
    Math.min(Math.max(saturation + adjustment, 0), 100);
}

export const roleVariants: RoleVariants = {
  surface: [
    {
      name: 'background',
      description:
        'For use as a background color, in components such as Page and Frame backgrounds.',
      light: {lightness: 98.3},
      dark: {lightness: 3.3},
    },
    {
      name: 'surface',
      description:
        'For use as a background color, in components such as Card, Modal, and Popover.',
      light: {lightness: 100},
      dark: {lightness: 12.7},
    },
    {
      name: 'surfaceSubdued',
      description:
        'For use as a subdued background color, in components such as Card, Modal, and Popover.',
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
        'For use as the background color of the backdrop component for navigation and modal. This color has an alpha of `0.5`.',
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
      name: 'overlay',
      description:
        'For use as the background color of elements which lay on top of surfaces to obscure their contents. This color has an alpha of `0.5`.',
      light: {
        hue: 0,
        saturation: 0,
        lightness: 100,
        alpha: 0.5,
      },
      dark: {
        hue: 0,
        saturation: 0,
        lightness: 12.7,
        alpha: 0.5,
      },
    },
    {
      name: 'shadowFromAmbientLight',
      description:
        'For use in building shadows for popovers, cards, and modals. This color has an alpha of `0.05`.',
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
        'For use in building shadows for popovers, cards, and modals. This color has an alpha of `0.15`.',
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
    {
      name: 'hintFromDirectLight',
      description: 'For use in building shadows scrollables.',
      light: {
        hue: 0,
        saturation: 0,
        lightness: 0,
        alpha: 0.15,
      },
      dark: {
        hue: 0,
        saturation: 0,
        lightness: 75,
        alpha: 0.2,
      },
    },
  ],
  onSurface: [
    {
      name: 'border',
      description: 'For use as a border (border or interactive outline).',
      light: {lightness: 75},
      dark: {lightness: 35},
    },
    {
      name: 'borderDisabled',
      description: 'For use as a an interactive outline on disabled elements.',
      light: {lightness: 95},
      dark: {lightness: 70},
    },
    {
      name: 'borderSubdued',
      description:
        'For use as a subdued border (border or interactive outline).',
      light: {lightness: 85},
      dark: {lightness: 32},
    },
    {
      name: 'icon',
      description: 'For use as the fill color of secondary icons.',
      light: {lightness: 40.1},
      dark: {lightness: 70.1},
    },
    {
      name: 'iconDisabled',
      description: 'For use as the fill color of disabled secondary icons.',
      light: {lightness: 76.9},
      dark: {lightness: 36.8},
    },
    {
      name: 'iconSubdued',
      description: 'For use as the fill color of subdued secondary icons.',
      light: {lightness: 59.8},
      dark: {lightness: 52.1},
    },
    {
      name: 'text',
      description: 'For use as a secondary text color.',
      light: {lightness: 13.1},
      dark: {lightness: 90.8},
    },
    {
      name: 'textDisabled',
      description: 'For use as a disabled secondary text color.',
      light: {lightness: 61.3},
      dark: {lightness: 48.2},
    },
    {
      name: 'textSubdued',
      description: 'For use as a subdued secondary text color.',
      light: {lightness: 47.4},
      dark: {lightness: 65.1},
    },
  ],
  interactive: [
    {
      name: 'actionInteractive',
      description: 'Used for links and plain buttons.',
      light: {lightness: 48.6},
      dark: {
        lightness: 65,
        saturation: saturationAdjustmentFn(11.2),
        hue: hueRotationFn(-7.1),
      },
    },
    {
      name: 'actionInteractiveDisabled',
      description: 'Used for disabled links and plain buttons.',
      light: {lightness: 58},
      dark: {
        lightness: 42,
      },
    },
    {
      name: 'actionInteractiveHovered',
      description: 'Used for hovered links and plain buttons.',
      light: {lightness: 37},
      dark: {
        lightness: 70,
        saturation: saturationAdjustmentFn(11.2),
        hue: hueRotationFn(-7.1),
      },
    },
    {
      name: 'actionInteractiveSubdued',
      description: 'Used for subdued links and plain buttons.',
      light: {lightness: 51},
      dark: {lightness: 49},
    },
    {
      name: 'actionInteractivePressed',
      description: 'Used for pressed links and plain buttons.',
      light: {lightness: 31},
      dark: {
        lightness: 75,
        saturation: saturationAdjustmentFn(11.2),
        hue: hueRotationFn(-7.1),
      },
    },
    {
      name: 'focused',
      description: 'For use in the focus ring on interactive elements.',
      light: {lightness: 58},
      dark: {lightness: 42},
    },
    {
      name: 'surfaceSelected',
      description:
        'For use as a surface color in selected interactive elements, in components such as option list and resource list.',
      light: {lightness: 96},
      dark: {lightness: 4},
    },
    {
      name: 'surfaceSelectedHovered',
      description:
        'For use as a surface color in selected interactive elements that are hovered, in components such as option list and resource list.',
      light: {lightness: 89},
      dark: {lightness: 11},
    },
    {
      name: 'surfaceSelectedPressed',
      description:
        'For use as a surface color in selected interactive elements that are pressed, in components such as option list and resource list.',
      light: {lightness: 82},
      dark: {lightness: 18},
    },
    {
      name: 'iconOnInteractive',
      description: 'For use as a fill color for icons on interactive elements.',
      light: {lightness: 100},
      dark: {lightness: 100},
    },
  ],
  secondary: [
    {
      name: 'actionSecondary',
      description:
        'Used for secondary buttons and tertiary buttons, as well as in form elements as a background color and pontentially other secondary surfaces.',
      light: {lightness: 93},
      dark: {lightness: 22},
    },
    {
      name: 'actionSecondaryDisabled',
      description: 'Used as a disabled state for secondary buttons',
      light: {lightness: 94},
      dark: {lightness: 13},
    },
    {
      name: 'actionSecondaryHovered',
      description: 'Used as a hovered state for secondary buttons',
      light: {lightness: 90},
      dark: {lightness: 37},
    },
    {
      name: 'actionSecondaryPressed',
      description: 'Used as a pressed state for secondary buttons',
      light: {lightness: 87},
      dark: {lightness: 42},
    },
    {
      name: 'borderSecondary',
      description: 'Used for borders on form elements',
      light: {lightness: 75},
      dark: {lightness: 35},
    },
    {
      name: 'borderSecondaryHovered',
      description: 'Used for borders on hovered form elements',
      light: {lightness: 65},
      dark: {lightness: 35},
    },
    {
      name: 'borderSecondaryDisabled',
      description: 'Used for disabled borders on form elements',
      light: {lightness: 85},
      dark: {lightness: 45},
    },
  ],
  primary: [
    {
      name: 'actionPrimary',
      description:
        'Used as the background color for primary actions, and as the fill color for icons and the text color in navigation and tabs to communicate interaction states.',
      light: {lightness: 47.3},
      dark: {lightness: 47.3},
    },
    {
      name: 'actionPrimaryDisabled',
      description:
        'Used as the background color for disabled primary actions, and as the fill color for icons and the text color in navigation and tabs to communicate interaction states.',
      light: {lightness: 32},
      dark: {lightness: 32},
    },
    {
      name: 'actionPrimaryHovered',
      description:
        'Used as the background color for hovered primary actions, and as the fill color for icons and the text color in navigation and tabs to communicate interaction states.',
      light: {lightness: 42.3},
      dark: {lightness: 55},
    },
    {
      name: 'actionPrimaryPressed',
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
      name: 'textOnPrimary',
      description:
        'For use as a text color on primary actions. Not for use in text on navigation and tabs.',
      light: {lightness: 100},
      dark: {lightness: 100},
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
      name: 'borderCritical',
      description:
        'For use as a border on critical components such as banners, and as an outline on interactive elements in an error state.',
      light: {lightness: 50},
      dark: {lightness: 50},
    },
    {
      name: 'borderCriticalDisabled',
      description:
        'For use as a disabled border on critical components such as banners, and as an outline on interactive elements in an error state.',
      light: {lightness: 82},
      dark: {lightness: 28},
    },
    {
      name: 'iconCritical',
      description: 'For use as an icon fill color on top of critical elements.',
      light: {lightness: 52},
      dark: {lightness: 48},
    },
    {
      name: 'surfaceCritical',
      description:
        'For use as a surface color on critical elements including badges.',
      light: {lightness: 98.6},
      dark: {lightness: 12},
    },
    {
      name: 'surfaceCriticalSubdued',
      description:
        'For use as a subdued surface color on critical elements including banners.',
      light: {lightness: 98},
      dark: {lightness: 12},
    },
    {
      name: 'surfaceCriticalSubduedHovered',
      description:
        'For use as a surface color on critical interactive elements including action list items in a hovered state.',
      light: {lightness: 96},
      dark: {lightness: 15, saturation: 60},
    },
    {
      name: 'surfaceCriticalSubduedPressed',
      description:
        'For use as a surface color on critical interactive elements including action list items in a pressed state.',
      light: {lightness: 88},
      dark: {lightness: 22},
    },
    {
      name: 'textCritical',
      description:
        'For use as a text color in inert critical elements such as exception list. Not for use as a text color on banners and badges.',
      light: {lightness: 47.3},
      dark: {lightness: 65, saturation: 70},
    },
    {
      name: 'actionCritical',
      description:
        'For use as the background color for destructive buttons, and as the background color for error toast messages.',
      light: {lightness: 47.5},
      dark: {lightness: 45},
    },
    {
      name: 'actionCriticalDisabled',
      description:
        'For use as the background color for disabled destructive buttons, and as the background color for error toast messages.',
      light: {lightness: 59},
      dark: {lightness: 41},
    },
    {
      name: 'actionCriticalHovered',
      description:
        'For use as the background color for hovered destructive buttons, and as the background color for error toast messages.',
      light: {lightness: 42.5},
      dark: {lightness: 50},
    },
    {
      name: 'actionCriticalPressed',
      description:
        'For use as the background color for pressed destructive buttons, and as the background color for error toast messages.',
      light: {lightness: 37.5},
      dark: {lightness: 55},
    },
    {
      name: 'iconOnCritical',
      description: 'For use as a fill color for icons on critical actions.',
      light: {lightness: 98},
      dark: {lightness: 98},
    },
    {
      name: 'textOnCritical',
      description: 'For use as a text color on critical actions.',
      light: {lightness: 100},
      dark: {lightness: 100},
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
      name: 'borderWarning',
      description: 'For use as a border on warning components such as banners.',
      light: {lightness: 76.6},
      dark: {lightness: 50},
    },
    {
      name: 'iconWarning',
      description: 'For use as an icon fill color on top of warning elements.',
      light: {lightness: 66},
      dark: {lightness: 34},
    },
    {
      name: 'surfaceWarning',
      description:
        'For use as a surface color on warning elements including badges.',
      light: {lightness: 84.5},
      dark: {lightness: 50},
    },
    {
      name: 'surfaceWarningSubdued',
      description:
        'For use as a subdued surface color on warning elements including banners.',
      light: {lightness: 96},
      dark: {lightness: 26, saturation: 71},
    },
    {
      name: 'textWarning',
      description:
        'For use as a text color in inert critical elements such as exception list. Not for use as a text color on banners and badges.',
      light: {lightness: 47.4},
      dark: {lightness: 64.9},
    },
  ],
  highlight: [
    {
      name: 'borderHighlight',
      description:
        'For use as a border on informational components such as banners.',
      light: {lightness: 60},
      dark: {lightness: 60},
    },
    {
      name: 'iconHighlight',
      description:
        'For use as an icon fill color on top of informational elements.',
      light: {lightness: 58},
      dark: {lightness: 42},
    },
    {
      name: 'surfaceHighlight',
      description:
        'For use as a surface color on information elements including badges.',
      light: {lightness: 84.5, saturation: 60},
      dark: {lightness: 40, saturation: 100},
    },
    {
      name: 'surfaceHighlightSubdued',
      description:
        'For use as a surface color on information elements including banners.',
      light: {lightness: 98.6},
      dark: {lightness: 20},
    },
    {
      name: 'textHighlight',
      description:
        'For use as a text color in inert informational elements. Not for use as a text color on banners and badges.',
      light: {lightness: 10},
      dark: {lightness: 90},
    },
  ],
  success: [
    {
      name: 'borderSuccess',
      description: 'For use as a border on success components such as banners.',
      light: {lightness: 50},
      dark: {lightness: 50},
    },
    {
      name: 'iconSuccess',
      description: 'For use as an icon fill color on top of success elements.',
      light: {lightness: 25},
      dark: {lightness: 35},
    },
    {
      name: 'surfaceSuccess',
      description:
        'For use as a surface color on success elements including badges.',
      light: {lightness: 84.5, saturation: 60},
      dark: {lightness: 35},
    },
    {
      name: 'surfaceSuccessSubdued',
      description:
        'For use as a surface color on information elements including banners.',
      light: {lightness: 99, saturation: 60},
      dark: {lightness: 20, saturation: 60},
    },
    {
      name: 'textSuccess',
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
        lightness: 84,
      },
      dark: {
        hue: hueRotationFn(-2.5),
        saturation: saturationAdjustmentFn(-2),
        lightness: 46,
      },
    },
    {
      name: 'decorativeOneText',
      description:
        'For use as a decorative text color that is applied on a decorative surface.',
      light: {
        hue: hueRotationFn(-4.5),
        lightness: 18,
      },
      dark: {lightness: 100},
    },
    {
      name: 'decorativeTwoSurface',
      description: 'For use as a decorative surface color.',
      light: {
        hue: hueRotationFn(-26.5),
        lightness: 84,
      },
      dark: {
        hue: hueRotationFn(-32.5),
        saturation: saturationAdjustmentFn(-4),
        lightness: 52,
      },
    },
    {
      name: 'decorativeTwoText',
      description:
        'For use as a decorative text color that is applied on a decorative surface.',
      light: {
        hue: hueRotationFn(305.5),
        saturation: saturationAdjustmentFn(-20),
        lightness: 14,
      },
      dark: {lightness: 100},
    },
    {
      name: 'decorativeThreeSurface',
      description: 'For use as a decorative surface color.',
      light: {
        hue: hueRotationFn(87.5),
        saturation: saturationAdjustmentFn(-46),
        lightness: 84,
      },
      dark: {
        hue: hueRotationFn(97.5),
        lightness: 46,
      },
    },
    {
      name: 'decorativeThreeText',
      description:
        'For use as a decorative text color that is applied on a decorative surface.',
      light: {
        hue: hueRotationFn(87.5),
        lightness: 16,
      },
      dark: {lightness: 100},
    },
    {
      name: 'decorativeFourSurface',
      description: 'For use as a decorative surface color.',
      light: {
        hue: hueRotationFn(123.5),
        saturation: saturationAdjustmentFn(-44),
        lightness: 84,
      },
      dark: {
        hue: hueRotationFn(131.5),
        saturation: saturationAdjustmentFn(-5),
        lightness: 47,
      },
    },
    {
      name: 'decorativeFourText',
      description:
        'For use as a decorative text color that is applied on a decorative surface.',
      light: {
        hue: hueRotationFn(133.5),
        lightness: 16,
      },
      dark: {lightness: 100},
    },
    {
      name: 'decorativeFiveSurface',
      description: 'For use as a decorative surface color.',
      light: {
        hue: hueRotationFn(-53.4),
        saturation: saturationAdjustmentFn(-5.4),
        lightness: 85.6,
      },
      dark: {
        hue: hueRotationFn(306.5),
        saturation: saturationAdjustmentFn(-23),
        lightness: 45,
      },
    },
    {
      name: 'decorativeFiveText',
      description:
        'For use as a decorative text color that is applied on a decorative surface.',
      light: {
        hue: hueRotationFn(306.5),
        saturation: saturationAdjustmentFn(-22),
        lightness: 16,
      },
      dark: {lightness: 100},
    },
  ],
};
