import type {TokenGroup} from '../types';

export const colors = {
  background: {
    value: 'rgba(246, 246, 247, 1)',
    description:
      'For use as a background color, in components such as Page and Frame backgrounds.',
  },
  'background-hovered': {
    value: 'rgba(241, 242, 243, 1)',
    description:
      'For use when an action or navigation is used on a background.',
  },
  'background-pressed': {
    value: 'rgba(237, 238, 239, 1)',
    description:
      'For use when an action or navigation is used on a background.',
  },
  'background-selected': {
    value: 'rgba(237, 238, 239, 1)',
    description: 'For use in the selected item in navigation',
  },
  surface: {
    value: 'rgba(255, 255, 255, 1)',
    description:
      'For use as a background color, in components such as Card, Modal, and Popover.',
  },
  'surface-dark': {
    value: 'rgba(32, 33, 35, 1)',
    description:
      'For use as a dark background color, in components such as Card, Modal, and Popover.',
  },
  'surface-neutral': {
    value: 'rgba(228, 229, 231, 1)',
    description: 'For use as a background color in neutral badges.',
  },
  'surface-neutral-hovered': {
    value: 'rgba(219, 221, 223, 1)',
    description: 'For use as a hovered background color in neutral badges.',
  },
  'surface-neutral-pressed': {
    value: 'rgba(201, 204, 208, 1)',
    description: 'For use as a pressed background color in neutral badges.',
  },
  'surface-neutral-disabled': {
    value: 'rgba(241, 242, 243, 1)',
    description: 'For use as a disabled background color in neutral badges.',
  },
  'surface-neutral-subdued': {
    value: 'rgba(246, 246, 247, 1)',
    description: 'For use as a background color in neutral banners.',
  },
  'surface-neutral-subdued-dark': {
    value: 'rgba(68, 71, 74, 1)',
    description: 'For use as a dark background color in neutral banners.',
  },
  'surface-subdued': {
    value: 'rgba(250, 251, 251, 1)',
    description:
      'For use as a subdued background color, in components such as Card, Modal, and Popover.',
  },
  'surface-disabled': {
    value: 'rgba(250, 251, 251, 1)',
    description:
      'For use as a surface color on disabled interactive elements such as option list items and action list items when in a disabled state.',
  },
  'surface-hovered': {
    value: 'rgba(246, 246, 247, 1)',
    description:
      'For use as a surface color on interactive elements such as resource list items and action list items when in a hovered state.',
  },
  'surface-hovered-dark': {
    value: 'rgba(47, 49, 51, 1)',
    description:
      'For use as a dark surface color on interactive elements such as resource list items and action list items when in a hovered state.',
  },
  'surface-pressed': {
    value: 'rgba(241, 242, 243, 1)',
    description:
      'For use as a surface color on interactive elements such as resource list items and action list items when in a pressed state.',
  },
  'surface-pressed-dark': {
    value: 'rgba(62, 64, 67, 1)',
    description:
      'For use as a dark surface color on interactive elements such as resource list items and action list items when in a pressed state.',
  },
  'surface-depressed': {
    value: 'rgba(237, 238, 239, 1)',
    description:
      'For use as a surface color on interactive elements such as resource list items and action list items when in a depressed state.',
  },
  'surface-search-field': {
    value: 'rgba(241, 242, 243, 1)',
    description:
      'For use as a background color, in components on surface elements such as SearchField',
  },
  'surface-search-field-dark': {
    value: 'rgba(47, 49, 51, 1)',
    description:
      'For use as a dark background color, in components on surface elements such as SearchField',
  },
  backdrop: {
    value: 'rgba(0, 0, 0, 0.5)',
    description:
      'For use as the background color of the backdrop component for navigation and modal. This color has an alpha of `0.5`.',
  },
  overlay: {
    value: 'rgba(255, 255, 255, 0.5)',
    description:
      'For use as the background color of elements which lay on top of surfaces to obscure their contents. This color has an alpha of `0.5`.',
  },
  'shadow-color-picker': {
    value: 'rgba(0, 0, 0, 0.5)',
  },
  'shadow-color-picker-dragger': {
    value: 'rgba(33, 43, 54, 0.32)',
  },
  'hint-from-direct-light': {
    value: 'rgba(0, 0, 0, 0.15)',
    description: 'For use in building shadows scrollables.',
  },
  border: {
    value: 'rgba(140, 145, 150, 1)',
    description: 'For use as the default border on elements.',
  },
  'border-on-dark': {
    value: 'rgba(80, 83, 86, 1)',
    description: 'For use as the default border on dark elements.',
  },
  'border-neutral-subdued': {
    value: 'rgba(186, 191, 195, 1)',
    description: 'For use as the border on banners.',
  },
  'border-hovered': {
    value: 'rgba(153, 158, 164, 1)',
    description: 'Used for borders on hovered interactive elements',
  },
  'border-disabled': {
    value: 'rgba(210, 213, 216, 1)',
    description: 'Used for disabled borders on interactive elements',
  },
  'border-subdued': {
    value: 'rgba(201, 204, 207, 1)',
    description: 'For use as a subdued border on elements.',
  },
  'border-depressed': {
    value: 'rgba(87, 89, 89, 1)',
    description: 'For use as a border on depressed elements.',
  },
  'border-shadow': {
    value: 'rgba(174, 180, 185, 1)',
    description: 'For use as an additional bottom border on elements.',
  },
  'border-shadow-subdued': {
    value: 'rgba(186, 191, 196, 1)',
    description: 'For use as an additional, subdued bottom border on elements.',
  },
  divider: {
    value: 'rgba(225, 227, 229, 1)',
    description: 'For use as a divider between elements.',
  },
  'divider-dark': {
    value: 'rgba(69, 71, 73, 1)',
    description: 'For use as a dark divider between elements.',
  },
  icon: {
    value: 'rgba(92, 95, 98, 1)',
    description: 'For use as the fill color of icons.',
  },
  'icon-on-dark': {
    value: 'rgba(166, 172, 178, 1)',
    description: 'For use as the fill color of dark icons.',
  },
  'icon-hovered': {
    value: 'rgba(26, 28, 29, 1)',
    description: 'For use as the fill color of hovered icons.',
  },
  'icon-pressed': {
    value: 'rgba(68, 71, 74, 1)',
    description: 'For use as the fill color of pressed icons.',
  },
  'icon-disabled': {
    value: 'rgba(186, 190, 195, 1)',
    description: 'For use as the fill color of disabled icons.',
  },
  'icon-subdued': {
    value: 'rgba(140, 145, 150, 1)',
    description: 'For use as the fill color of subdued icons.',
  },
  text: {
    value: 'rgba(32, 34, 35, 1)',
    description: 'For use as a text color.',
  },
  'text-on-dark': {
    value: 'rgba(227, 229, 231, 1)',
    description: 'For use as a text color on dark elements.',
  },
  'text-disabled': {
    value: 'rgba(140, 145, 150, 1)',
    description:
      'For use as a disabled text color and as a placeholder text color.',
  },
  'text-subdued': {
    value: 'rgba(109, 113, 117, 1)',
    description: 'For use as a subdued text color.',
  },
  'text-subdued-on-dark': {
    value: 'rgba(153, 159, 164, 1)',
    description: 'For use as a subdued text color on dark elements.',
  },
  interactive: {
    value: 'rgba(44, 110, 203, 1)',
    description:
      'Used for links, plain buttons, and as the fill color for selected checkboxes and radio buttons.',
  },
  'interactive-on-dark': {
    value: 'rgba(54, 163, 255, 1)',
    description:
      'Used for links, plain buttons, and as the fill color for selected checkboxes and radio buttons when on a dark element.',
  },
  'interactive-disabled': {
    value: 'rgba(189, 193, 204, 1)',
    description: 'Used for disabled links and plain buttons.',
  },
  'interactive-hovered': {
    value: 'rgba(31, 81, 153, 1)',
    description: 'Used for hovered links and plain buttons.',
  },
  'interactive-pressed': {
    value: 'rgba(16, 50, 98, 1)',
    description: 'Used for pressed links and plain buttons.',
  },
  'interactive-pressed-on-dark': {
    value: 'rgba(136, 188, 255, 1)',
    description: 'Used for pressed links and plain buttons on dark elements.',
  },
  focused: {
    value: 'rgba(69, 143, 255, 1)',
    description: 'For use in the focus ring on interactive elements.',
  },
  'surface-selected': {
    value: 'rgba(242, 247, 254, 1)',
    description:
      'For use as a surface color in selected interactive elements, in components such as action list and resource list.',
  },
  'surface-selected-hovered': {
    value: 'rgba(237, 244, 254, 1)',
    description:
      'For use as a surface color in selected interactive elements that are hovered, in components such as action list and resource list.',
  },
  'surface-selected-pressed': {
    value: 'rgba(229, 239, 253, 1)',
    description:
      'For use as a surface color in selected interactive elements that are pressed, in components such as action list and resource list.',
  },
  'icon-on-interactive': {
    value: 'rgba(255, 255, 255, 1)',
    description: 'For use as a fill color for icons on interactive elements.',
  },
  'text-on-interactive': {
    value: 'rgba(255, 255, 255, 1)',
    description: 'For use as a text color on interactive elements.',
  },
  'action-secondary': {
    value: 'rgba(255, 255, 255, 1)',
    description:
      'Used for secondary buttons and tertiary buttons, as well as in form elements as a background color and pontentially other secondary surfaces.',
  },
  'action-secondary-disabled': {
    value: 'rgba(255, 255, 255, 1)',
    description: 'Used as a disabled state for secondary buttons',
  },
  'action-secondary-hovered': {
    value: 'rgba(246, 246, 247, 1)',
    description: 'Used as a hovered state for secondary buttons',
  },
  'action-secondary-hovered-dark': {
    value: 'rgba(84, 87, 91, 1)',
    description: 'Used as a dark hovered state for secondary buttons',
  },
  'action-secondary-pressed': {
    value: 'rgba(241, 242, 243, 1)',
    description: 'Used as a pressed state for secondary buttons',
  },
  'action-secondary-pressed-dark': {
    value: 'rgba(96, 100, 103, 1)',
    description: 'Used as a dark pressed state for secondary buttons',
  },
  'action-secondary-depressed': {
    value: 'rgba(109, 113, 117, 1)',
    description: 'Used as a depressed state for secondary buttons',
  },
  'action-primary': {
    value: 'rgba(0, 128, 96, 1)',
    description:
      'Used as the background color for primary actions, and as the fill color for icons and the text color in navigation and tabs to communicate interaction states.',
  },
  'action-primary-disabled': {
    value: 'rgba(241, 241, 241, 1)',
    description:
      'Used as the background color for disabled primary actions, and as the fill color for icons and the text color in navigation and tabs to communicate interaction states.',
  },
  'action-primary-hovered': {
    value: 'rgba(0, 110, 82, 1)',
    description:
      'Used as the background color for hovered primary actions, and as the fill color for icons and the text color in navigation and tabs to communicate interaction states.',
  },
  'action-primary-pressed': {
    value: 'rgba(0, 94, 70, 1)',
    description:
      'Used as the background color for pressed primary actions, and as the fill color for icons and the text color in navigation and tabs to communicate interaction states.',
  },
  'action-primary-depressed': {
    value: 'rgba(0, 61, 44, 1)',
    description:
      'Used as the background color for pressed primary actions, and as the fill color for icons and the text color in navigation and tabs to communicate interaction states.',
  },
  'icon-on-primary': {
    value: 'rgba(255, 255, 255, 1)',
    description:
      'For use as a fill color for icons on primary actions. Not for use in icons on navigation and tabs.',
  },
  'text-on-primary': {
    value: 'rgba(255, 255, 255, 1)',
    description:
      'For use as a text color on primary actions. Not for use in text on navigation and tabs.',
  },
  'text-primary': {
    value: 'rgba(0, 123, 92, 1)',
    description:
      'For use as primary text color on background. For use in text in components such as Navigation.',
  },
  'text-primary-hovered': {
    value: 'rgba(0, 108, 80, 1)',
    description:
      'For use as primary hovered text color on background. For use in text in components such as Navigation.',
  },
  'text-primary-pressed': {
    value: 'rgba(0, 92, 68, 1)',
    description:
      'For use as primary pressed text color on background. For use in text in components such as Navigation.',
  },
  'surface-primary-selected': {
    value: 'rgba(241, 248, 245, 1)',
    description:
      'Used as a surface color to indicate selected interactive states in navigation and tabs.',
  },
  'surface-primary-selected-hovered': {
    value: 'rgba(179, 208, 195, 1)',
    description:
      'Used as a surface color to indicate selected interactive states that are hovered in navigation and tabs.',
  },
  'surface-primary-selected-pressed': {
    value: 'rgba(162, 188, 176, 1)',
    description:
      'Used as a surface color to indicate selected interactive states that are pressed in navigation and tabs.',
  },
  'border-critical': {
    value: 'rgba(253, 87, 73, 1)',
    description:
      'For use as a border on critical components such as an outline on interactive elements in an error state.',
  },
  'border-critical-subdued': {
    value: 'rgba(224, 179, 178, 1)',
    description: 'For use as a border on critical components such as banners.',
  },
  'border-critical-disabled': {
    value: 'rgba(255, 167, 163, 1)',
    description:
      'For use as a disabled border on critical components such as banners, and as an outline on interactive elements in an error state.',
  },
  'icon-critical': {
    value: 'rgba(215, 44, 13, 1)',
    description: 'For use as an icon fill color on top of critical elements.',
  },
  'surface-critical': {
    value: 'rgba(254, 211, 209, 1)',
    description:
      'For use as a surface color on critical elements including badges.',
  },
  'surface-critical-subdued': {
    value: 'rgba(255, 244, 244, 1)',
    description:
      'For use as a subdued surface color on critical elements including banners.',
  },
  'surface-critical-subdued-hovered': {
    value: 'rgba(255, 240, 240, 1)',
    description:
      'For use as a surface color on critical interactive elements including action list items in a hovered state.',
  },
  'surface-critical-subdued-pressed': {
    value: 'rgba(255, 233, 232, 1)',
    description:
      'For use as a surface color on critical interactive elements including action list items in a pressed state.',
  },
  'surface-critical-subdued-depressed': {
    value: 'rgba(254, 188, 185, 1)',
    description:
      'For use as a surface color on critical interactive elements including action list items in a depressed state.',
  },
  'text-critical': {
    value: 'rgba(215, 44, 13, 1)',
    description:
      'For use as a text color in inert critical elements such as exception list. Not for use as a text color on banners and badges.',
  },
  'action-critical': {
    value: 'rgba(216, 44, 13, 1)',
    description:
      'For use as the background color for destructive buttons, and as the background color for error toast messages.',
  },
  'action-critical-disabled': {
    value: 'rgba(241, 241, 241, 1)',
    description:
      'For use as the background color for disabled destructive buttons, and as the background color for error toast messages.',
  },
  'action-critical-hovered': {
    value: 'rgba(188, 34, 0, 1)',
    description:
      'For use as the background color for hovered destructive buttons, and as the background color for error toast messages.',
  },
  'action-critical-pressed': {
    value: 'rgba(162, 27, 0, 1)',
    description:
      'For use as the background color for pressed destructive buttons, and as the background color for error toast messages.',
  },
  'action-critical-depressed': {
    value: 'rgba(108, 15, 0, 1)',
    description:
      'For use as the background color for depressed destructive buttons, and as the background color for error toast messages.',
  },
  'icon-on-critical': {
    value: 'rgba(255, 255, 255, 1)',
    description: 'For use as a fill color for icons on critical actions.',
  },
  'text-on-critical': {
    value: 'rgba(255, 255, 255, 1)',
    description: 'For use as a text color on critical actions.',
  },
  'interactive-critical': {
    value: 'rgba(216, 44, 13, 1)',
    description:
      'For use as the text color for destructive interactive elements: links, plain buttons, error state of selected checkboxes and radio buttons, as well as a text color on destructive action list items. Not for use on critical banners and badges.',
  },
  'interactive-critical-disabled': {
    value: 'rgba(253, 147, 141, 1)',
    description:
      'For use as a text color in disabled destructive plain buttons, as well as a text color on destructive action list items. Not for use on critical banners and badges.',
  },
  'interactive-critical-hovered': {
    value: 'rgba(205, 41, 12, 1)',
    description:
      'For use as a text color in hovered destructive plain buttons, as well as a text color on destructive action list items. Not for use on critical banners and badges.',
  },
  'interactive-critical-pressed': {
    value: 'rgba(103, 15, 3, 1)',
    description:
      'For use as a text color in pressed destructive plain buttons, as well as a text color on destructive action list items. Not for use on critical banners and badges.',
  },
  'border-warning': {
    value: 'rgba(185, 137, 0, 1)',
    description: 'For use as a border on warning components such as...',
  },
  'border-warning-subdued': {
    value: 'rgba(225, 184, 120, 1)',
    description: 'For use as a border on warning components such as banners.',
  },
  'icon-warning': {
    value: 'rgba(185, 137, 0, 1)',
    description: 'For use as an icon fill color on top of warning elements.',
  },
  'surface-warning': {
    value: 'rgba(255, 215, 157, 1)',
    description:
      'For use as a surface color on warning elements including badges.',
  },
  'surface-warning-subdued': {
    value: 'rgba(255, 245, 234, 1)',
    description:
      'For use as a subdued surface color on warning elements including banners.',
  },
  'surface-warning-subdued-hovered': {
    value: 'rgba(255, 242, 226, 1)',
    description:
      'For use as a subdued surface color on warning elements including banners.',
  },
  'surface-warning-subdued-pressed': {
    value: 'rgba(255, 235, 211, 1)',
    description:
      'For use as a subdued surface color on warning elements including banners.',
  },
  'text-warning': {
    value: 'rgba(145, 106, 0, 1)',
    description:
      'For use as a text color in inert critical elements such as exception list. Not for use as a text color on banners and badges.',
  },
  'border-highlight': {
    value: 'rgba(68, 157, 167, 1)',
    description: 'For use as a border on informational components such as...',
  },
  'border-highlight-subdued': {
    value: 'rgba(152, 198, 205, 1)',
    description:
      'For use as a border on informational components such as banners.',
  },
  'icon-highlight': {
    value: 'rgba(0, 160, 172, 1)',
    description:
      'For use as an icon fill color on top of informational elements.',
  },
  'surface-highlight': {
    value: 'rgba(164, 232, 242, 1)',
    description:
      'For use as a surface color on information elements including badges.',
  },
  'surface-highlight-subdued': {
    value: 'rgba(235, 249, 252, 1)',
    description:
      'For use as a surface color on information elements including banners.',
  },
  'surface-highlight-subdued-hovered': {
    value: 'rgba(228, 247, 250, 1)',
    description:
      'For use as a surface color on information elements including banners.',
  },
  'surface-highlight-subdued-pressed': {
    value: 'rgba(213, 243, 248, 1)',
    description:
      'For use as a surface color on information elements including banners.',
  },
  'text-highlight': {
    value: 'rgba(52, 124, 132, 1)',
    description:
      'For use as a text color in inert informational elements. Not for use as a text color on banners and badges.',
  },
  'border-success': {
    value: 'rgba(0, 164, 124, 1)',
    description:
      'For use as a border on success components such as text inputs.',
  },
  'border-success-subdued': {
    value: 'rgba(149, 201, 180, 1)',
    description: 'For use as a border on success components such as banners.',
  },
  'icon-success': {
    value: 'rgba(0, 127, 95, 1)',
    description: 'For use as an icon fill color on top of success elements.',
  },
  'surface-success': {
    value: 'rgba(174, 233, 209, 1)',
    description:
      'For use as a surface color on success elements including badges.',
  },
  'surface-success-subdued': {
    value: 'rgba(241, 248, 245, 1)',
    description:
      'For use as a surface color on information elements including banners.',
  },
  'surface-success-subdued-hovered': {
    value: 'rgba(236, 246, 241, 1)',
    description:
      'For use as a surface color on information elements including banners.',
  },
  'surface-success-subdued-pressed': {
    value: 'rgba(226, 241, 234, 1)',
    description:
      'For use as a surface color on information elements including banners.',
  },
  'text-success': {
    value: 'rgba(0, 128, 96, 1)',
    description:
      'For use as a text color in inert success elements. Not for use as a text color on banners and badges.',
  },
  'icon-attention': {
    value: 'rgba(138, 97, 22, 1)',
  },
  'surface-attention': {
    value: 'rgba(255, 234, 138, 1)',
  },
  'decorative-one-icon': {
    value: 'rgba(126, 87, 0, 1)',
    description:
      'For use as a decorative icon color that is applied on a decorative surface.',
  },
  'decorative-one-surface': {
    value: 'rgba(255, 201, 107, 1)',
    description: 'For use as a decorative surface color.',
  },
  'decorative-one-text': {
    value: 'rgba(61, 40, 0, 1)',
    description:
      'For use as a decorative text color that is applied on a decorative surface.',
  },
  'decorative-two-icon': {
    value: 'rgba(175, 41, 78, 1)',
    description:
      'For use as a decorative icon color that is applied on a decorative surface.',
  },
  'decorative-two-surface': {
    value: 'rgba(255, 196, 176, 1)',
    description: 'For use as a decorative surface color.',
  },
  'decorative-two-text': {
    value: 'rgba(73, 11, 28, 1)',
    description:
      'For use as a decorative text color that is applied on a decorative surface.',
  },
  'decorative-three-icon': {
    value: 'rgba(0, 109, 65, 1)',
    description:
      'For use as a decorative icon color that is applied on a decorative surface.',
  },
  'decorative-three-surface': {
    value: 'rgba(146, 230, 181, 1)',
    description: 'For use as a decorative surface color.',
  },
  'decorative-three-text': {
    value: 'rgba(0, 47, 25, 1)',
    description:
      'For use as a decorative text color that is applied on a decorative surface.',
  },
  'decorative-four-icon': {
    value: 'rgba(0, 106, 104, 1)',
    description:
      'For use as a decorative icon color that is applied on a decorative surface.',
  },
  'decorative-four-surface': {
    value: 'rgba(145, 224, 214, 1)',
    description: 'For use as a decorative surface color.',
  },
  'decorative-four-text': {
    value: 'rgba(0, 45, 45, 1)',
    description:
      'For use as a decorative text color that is applied on a decorative surface.',
  },
  'decorative-five-icon': {
    value: 'rgba(174, 43, 76, 1)',
    description:
      'For use as a decorative icon color that is applied on a decorative surface.',
  },
  'decorative-five-surface': {
    value: 'rgba(253, 201, 208, 1)',
    description: 'For use as a decorative surface color.',
  },
  'decorative-five-text': {
    value: 'rgba(79, 14, 31, 1)',
    description:
      'For use as a decorative text color that is applied on a decorative surface.',
  },
};

export type ColorsTokenGroup = TokenGroup<typeof colors>;
export type ColorsTokenName = keyof ColorsTokenGroup;

export const colorsBackgroundTokenAlias = [
  'background',
  'background-hovered',
  'background-pressed',
  'background-selected',
] as const;
export type ColorsBackgroundTokenAlias =
  typeof colorsBackgroundTokenAlias[number];

export const colorsActionTokenAlias = [
  'action-critical',
  'action-critical-depressed',
  'action-critical-disabled',
  'action-critical-hovered',
  'action-critical-pressed',
  'action-primary',
  'action-primary-depressed',
  'action-primary-disabled',
  'action-primary-hovered',
  'action-primary-pressed',
  'action-secondary',
  'action-secondary-depressed',
  'action-secondary-disabled',
  'action-secondary-hovered',
  'action-secondary-hovered-dark',
  'action-secondary-pressed',
  'action-secondary-pressed-dark',
] as const;
export type ColorsActionTokenAlias = typeof colorsActionTokenAlias[number];

export const colorsSurfaceTokenAlias = [
  'surface',
  'surface-attention',
  'surface-critical',
  'surface-critical-subdued',
  'surface-critical-subdued-depressed',
  'surface-critical-subdued-hovered',
  'surface-critical-subdued-pressed',
  'surface-dark',
  'surface-depressed',
  'surface-disabled',
  'surface-highlight',
  'surface-highlight-subdued',
  'surface-highlight-subdued-hovered',
  'surface-highlight-subdued-pressed',
  'surface-hovered',
  'surface-hovered-dark',
  'surface-neutral',
  'surface-neutral-disabled',
  'surface-neutral-hovered',
  'surface-neutral-pressed',
  'surface-neutral-subdued',
  'surface-neutral-subdued-dark',
  'surface-pressed',
  'surface-pressed-dark',
  'surface-primary-selected',
  'surface-primary-selected-hovered',
  'surface-primary-selected-pressed',
  'surface-search-field',
  'surface-search-field-dark',
  'surface-selected',
  'surface-selected-hovered',
  'surface-selected-pressed',
  'surface-subdued',
  'surface-success',
  'surface-success-subdued',
  'surface-success-subdued-hovered',
  'surface-success-subdued-pressed',
  'surface-warning',
  'surface-warning-subdued',
  'surface-warning-subdued-hovered',
  'surface-warning-subdued-pressed',
] as const;
export type ColorsSurfaceTokenAlias = typeof colorsSurfaceTokenAlias[number];

export const colorsBackdropTokenAlias = ['backdrop'] as const;
export type ColorsBackdropTokenAlias = typeof colorsBackdropTokenAlias[number];

export const colorsOverlayTokenAlias = ['overlay'] as const;
export type ColorsOverlayTokenAlias = typeof colorsOverlayTokenAlias[number];

export const colorsBorderTokenAlias = [
  'border',
  'border-on-dark',
  'border-neutral-subdued',
  'border-hovered',
  'border-disabled',
  'border-subdued',
  'border-depressed',
  'border-shadow',
  'border-shadow-subdued',
  'border-critical',
  'border-critical-subdued',
  'border-critical-disabled',
  'border-warning',
  'border-warning-subdued',
  'border-highlight',
  'border-highlight-subdued',
  'border-success',
  'border-success-subdued',
] as const;
export type ColorsBorderTokenAlias = typeof colorsBorderTokenAlias[number];
