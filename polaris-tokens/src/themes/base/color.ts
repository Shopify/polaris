import type {MetaTokenProperties} from '../types';
import * as colors from '../../colors';

export type ColorBackgroundAlias =
  | 'bg-fill-active'
  | 'bg-fill-brand-active'
  | 'bg-fill-brand-disabled'
  | 'bg-fill-brand-hover'
  | 'bg-fill-brand-selected'
  | 'bg-fill-brand'
  | 'bg-fill-caution-active'
  | 'bg-fill-caution-hover'
  | 'bg-fill-caution-secondary'
  | 'bg-fill-caution'
  | 'bg-fill-critical-active'
  | 'bg-fill-critical-hover'
  | 'bg-fill-critical-secondary'
  | 'bg-fill-critical-selected'
  | 'bg-fill-critical'
  | 'bg-fill-disabled'
  | 'bg-fill-emphasis-active'
  | 'bg-fill-emphasis-hover'
  | 'bg-fill-emphasis'
  | 'bg-fill-hover'
  | 'bg-fill-info-active'
  | 'bg-fill-info-hover'
  | 'bg-fill-info-secondary'
  | 'bg-fill-info'
  | 'bg-fill-inverse-active'
  | 'bg-fill-inverse-hover'
  | 'bg-fill-inverse'
  | 'bg-fill-magic-secondary-active'
  | 'bg-fill-magic-secondary-hover'
  | 'bg-fill-magic-secondary'
  | 'bg-fill-magic'
  | 'bg-fill-secondary-active'
  | 'bg-fill-secondary-hover'
  | 'bg-fill-secondary'
  | 'bg-fill-selected'
  | 'bg-fill-success-active'
  | 'bg-fill-success-hover'
  | 'bg-fill-success-secondary'
  | 'bg-fill-success'
  | 'bg-fill-tertiary-active'
  | 'bg-fill-tertiary-hover'
  | 'bg-fill-tertiary'
  | 'bg-fill-transparent-active'
  | 'bg-fill-transparent-hover'
  | 'bg-fill-transparent-secondary-active'
  | 'bg-fill-transparent-secondary-hover'
  | 'bg-fill-transparent-secondary'
  | 'bg-fill-transparent-selected'
  | 'bg-fill-transparent'
  | 'bg-fill-warning-active'
  | 'bg-fill-warning-hover'
  | 'bg-fill-warning-secondary'
  | 'bg-fill-warning'
  | 'bg-fill'
  | 'bg-inverse'
  | 'bg-surface-active'
  | 'bg-surface-brand-active'
  | 'bg-surface-brand-hover'
  | 'bg-surface-brand-selected'
  | 'bg-surface-brand'
  | 'bg-surface-caution-active'
  | 'bg-surface-caution-hover'
  | 'bg-surface-caution'
  | 'bg-surface-critical-active'
  | 'bg-surface-critical-hover'
  | 'bg-surface-critical'
  | 'bg-surface-disabled'
  | 'bg-surface-emphasis-active'
  | 'bg-surface-emphasis-hover'
  | 'bg-surface-emphasis'
  | 'bg-surface-hover'
  | 'bg-surface-info-active'
  | 'bg-surface-info-hover'
  | 'bg-surface-info'
  | 'bg-surface-inverse'
  | 'bg-surface-magic-active'
  | 'bg-surface-magic-hover'
  | 'bg-surface-magic'
  | 'bg-surface-secondary-active'
  | 'bg-surface-secondary-hover'
  | 'bg-surface-secondary-selected'
  | 'bg-surface-secondary'
  | 'bg-surface-selected'
  | 'bg-surface-success-active'
  | 'bg-surface-success-hover'
  | 'bg-surface-success'
  | 'bg-surface-tertiary-active'
  | 'bg-surface-tertiary-hover'
  | 'bg-surface-tertiary'
  | 'bg-surface-transparent'
  | 'bg-surface-warning-active'
  | 'bg-surface-warning-hover'
  | 'bg-surface-warning'
  | 'bg-surface'
  | 'bg'
  /** Specialty and component background colors. */
  | 'avatar-bg-fill'
  | 'avatar-five-bg-fill'
  | 'avatar-four-bg-fill'
  | 'avatar-one-bg-fill'
  | 'avatar-three-bg-fill'
  | 'avatar-two-bg-fill'
  | 'backdrop-bg'
  | 'checkbox-bg-surface-disabled'
  | 'input-bg-surface-active'
  | 'input-bg-surface-hover'
  | 'input-bg-surface'
  | 'nav-bg-surface-active'
  | 'nav-bg-surface-hover'
  | 'nav-bg-surface-selected'
  | 'nav-bg-surface'
  | 'nav-bg'
  | 'radio-button-bg-surface-disabled'
  | 'video-thumbnail-play-button-bg-fill-hover'
  | 'video-thumbnail-play-button-bg-fill';

export type ColorBorderAlias =
  | 'border-brand'
  | 'border-caution'
  | 'border-critical-secondary'
  | 'border-critical'
  | 'border-disabled'
  | 'border-emphasis-active'
  | 'border-emphasis-hover'
  | 'border-emphasis'
  | 'border-focus'
  | 'border-hover'
  | 'border-info'
  | 'border-inverse-active'
  | 'border-inverse-hover'
  | 'border-inverse'
  | 'border-magic-secondary'
  | 'border-magic'
  | 'border-secondary'
  | 'border-success'
  | 'border-tertiary'
  | 'border-warning'
  | 'border'
  /** Specialty and component border colors. */
  | 'input-border-active'
  | 'input-border-hover'
  | 'input-border';

export type ColorIconAlias =
  | 'icon-active'
  | 'icon-brand'
  | 'icon-caution'
  | 'icon-critical'
  | 'icon-disabled'
  | 'icon-emphasis-active'
  | 'icon-emphasis-hover'
  | 'icon-emphasis'
  | 'icon-hover'
  | 'icon-info'
  | 'icon-inverse'
  | 'icon-magic'
  | 'icon-secondary-active'
  | 'icon-secondary-hover'
  | 'icon-secondary'
  | 'icon-success'
  | 'icon-warning'
  | 'icon'
  /** Specialty and component icon colors. */
  | 'checkbox-icon-disabled'
  | 'radio-button-icon-disabled';

export type ColorTextAlias =
  | 'text-brand-hover'
  | 'text-brand-on-bg-fill-active'
  | 'text-brand-on-bg-fill-disabled'
  | 'text-brand-on-bg-fill-hover'
  | 'text-brand-on-bg-fill'
  | 'text-brand'
  | 'text-caution-active'
  | 'text-caution-hover'
  | 'text-caution-on-bg-fill'
  | 'text-caution'
  | 'text-critical-active'
  | 'text-critical-hover'
  | 'text-critical-on-bg-fill'
  | 'text-critical'
  | 'text-disabled'
  | 'text-emphasis-active'
  | 'text-emphasis-hover'
  | 'text-emphasis-on-bg-fill-active'
  | 'text-emphasis-on-bg-fill-hover'
  | 'text-emphasis-on-bg-fill'
  | 'text-emphasis'
  | 'text-info-active'
  | 'text-info-hover'
  | 'text-info-on-bg-fill'
  | 'text-info'
  | 'text-inverse-secondary'
  | 'text-inverse'
  | 'text-link-active'
  | 'text-link-hover'
  | 'text-link-inverse'
  | 'text-link'
  | 'text-magic-on-bg-fill'
  | 'text-magic'
  | 'text-secondary'
  | 'text-success-active'
  | 'text-success-hover'
  | 'text-success-on-bg-fill'
  | 'text-success'
  | 'text-warning-active'
  | 'text-warning-hover'
  | 'text-warning-on-bg-fill'
  | 'text-warning'
  | 'text'
  /** Specialty and component text colors. */
  | 'avatar-five-text-on-bg-fill'
  | 'avatar-four-text-on-bg-fill'
  | 'avatar-one-text-on-bg-fill'
  | 'avatar-text-on-bg-fill'
  | 'avatar-three-text-on-bg-fill'
  | 'avatar-two-text-on-bg-fill'
  | 'video-thumbnail-play-button-text-on-bg-fill';

export type ColorTokenName =
  | `color-${ColorBackgroundAlias}`
  | `color-${ColorBorderAlias}`
  | `color-${ColorIconAlias}`
  | `color-${ColorTextAlias}`;

export type ColorTokenGroup = {
  [TokenName in ColorTokenName]: string;
};

export const color: {
  [TokenName in ColorTokenName]: MetaTokenProperties;
} = {
  'color-bg': {
    value: colors.gray[6],
    description: 'The default background color of the admin.',
  },
  'color-bg-inverse': {
    value: colors.gray[16],
    description:
      'Use for the background of components that appear on a dark background.',
  },
  'color-bg-surface': {
    value: colors.gray[1],
    description:
      'The background color for elements with the highest level of prominence, like a card or a banner. .',
  },
  'color-bg-surface-hover': {
    value: colors.gray[4],
    description:
      'The background color for elements with the highest level of prominence, like a card or a banner, when hovered.',
  },
  'color-bg-surface-active': {
    value: colors.gray[5],
    description:
      'The background color for elements with the highest level of prominence, like a card or a banner, when pressed.',
  },
  'color-bg-surface-selected': {
    value: colors.gray[6],
    description:
      'The background color for elements with the highest level of prominence, like a card or a banner, when selected.',
  },
  'color-bg-surface-disabled': {
    value: colors.blackAlpha[5],
    description: 'Use for backgrounds of elements in a disabled state.',
  },
  'color-bg-surface-secondary': {
    value: colors.gray[4],
    description:
      'The background color for elements with a medium level of prominence.',
  },
  'color-bg-surface-secondary-hover': {
    value: colors.gray[6],
    description:
      'The background color for elements with a medium level of prominence, when hovered.',
  },
  'color-bg-surface-secondary-active': {
    value: colors.gray[7],
    description:
      'The background color for elements with a medium level of prominence, when pressed.',
  },
  'color-bg-surface-secondary-selected': {
    value: colors.gray[7],
    description:
      'The background color for elements with a medium level of prominence, when selected.',
  },
  'color-bg-surface-tertiary': {
    value: colors.gray[5],
    description:
      'The background color for elements with a low level of prominence.',
  },
  'color-bg-surface-tertiary-hover': {
    value: colors.gray[7],
    description:
      'The background color for elements with a low level of prominence, when hovered.',
  },
  'color-bg-surface-tertiary-active': {
    value: colors.gray[8],
    description:
      'The background color for elements with a low level of prominence, when pressed.',
  },
  'color-bg-surface-brand': {
    value: colors.gray[8],
  },
  'color-bg-surface-brand-hover': {
    value: colors.gray[7],
  },
  'color-bg-surface-brand-active': {
    value: colors.gray[6],
  },
  'color-bg-surface-brand-selected': {
    value: colors.gray[6],
  },
  'color-bg-surface-info': {
    value: colors.azure[3],
    description:
      'Use for backgrounds communicating important information, like banners.',
  },
  'color-bg-surface-info-hover': {
    value: colors.azure[4],
    description:
      'Use for backgrounds communicating important information, when hovered.',
  },
  'color-bg-surface-info-active': {
    value: colors.azure[6],
    description:
      'Use for backgrounds communicating important information, when pressed.',
  },
  'color-bg-surface-success': {
    value: colors.green[3],
    description: 'Use for backgrounds communicating success, like banners.',
  },
  'color-bg-surface-success-hover': {
    value: colors.green[4],
    description: 'Use for backgrounds communicating success, when hovered.',
  },
  'color-bg-surface-success-active': {
    value: colors.green[5],
    description: 'Use for backgrounds communicating success, when pressed.',
  },
  'color-bg-surface-caution': {
    value: colors.yellow[2],
    description: 'Use for backgrounds communicating caution, like banners.',
  },
  'color-bg-surface-caution-hover': {
    value: colors.yellow[3],
    description: 'Use for backgrounds communicating caution, when hovered.',
  },
  'color-bg-surface-caution-active': {
    value: colors.yellow[4],
    description: 'Use for backgrounds communicating caution, when pressed.',
  },
  'color-bg-surface-warning': {
    value: colors.orange[3],
    description: 'Use for backgrounds communicating warning, like banners.',
  },
  'color-bg-surface-warning-hover': {
    value: colors.orange[4],
    description: 'Use for backgrounds communicating warning, when hovered.',
  },
  'color-bg-surface-warning-active': {
    value: colors.orange[5],
    description: 'Use for backgrounds communicating warning, when pressed.',
  },
  'color-bg-surface-critical': {
    value: colors.red[4],
    description:
      'Use for backgrounds communicating critical information, like banners or input errors.',
  },
  'color-bg-surface-critical-hover': {
    value: colors.red[5],
    description:
      'Use for backgrounds communicating critical information, when hovered.',
  },
  'color-bg-surface-critical-active': {
    value: colors.red[6],
    description:
      'Use for backgrounds communicating critical information, when pressed.',
  },
  'color-bg-surface-emphasis': {
    value: colors.blue[3],
  },
  'color-bg-surface-emphasis-hover': {
    value: colors.blue[4],
  },
  'color-bg-surface-emphasis-active': {
    value: colors.blue[5],
  },
  'color-bg-surface-magic': {
    value: colors.purple[3],
  },
  'color-bg-surface-magic-hover': {
    value: colors.purple[4],
  },
  'color-bg-surface-magic-active': {
    value: colors.purple[6],
  },
  'color-bg-surface-inverse': {
    value: colors.gray[15],
  },
  'color-bg-surface-transparent': {
    value: colors.blackAlpha[1],
  },
  'color-bg-fill': {
    value: colors.gray[1],
    description:
      'Use for the background color of contained elements with a smaller surface area, like a button.',
  },
  'color-bg-fill-hover': {
    value: colors.gray[3],
    description:
      'Use for the background color of contained elements with a smaller surface area, like a button, when hovered.',
  },
  'color-bg-fill-active': {
    value: colors.gray[4],
    description:
      'Use for the background color of contained elements with a smaller surface area, like a button, when pressed.',
  },
  'color-bg-fill-selected': {
    value: colors.gray[10],
    description:
      'Use for the background color of contained elements with a smaller surface area, like a button, when selected.',
  },
  'color-bg-fill-disabled': {
    value: colors.blackAlpha[5],
    description:
      'Use for backgrounds of contained elements in a disabled state, like a button or tag.',
  },
  'color-bg-fill-secondary': {
    value: colors.gray[6],
    description:
      'Use for the background color of elements with a smaller surface area and a medium level of prominence.',
  },
  'color-bg-fill-secondary-hover': {
    value: colors.gray[7],
    description:
      'Use for the background color of elements with a smaller surface area and a medium level of prominence, when hovered.',
  },
  'color-bg-fill-secondary-active': {
    value: colors.gray[8],
    description:
      'Use for the background color of elements with a smaller surface area and a medium level of prominence, when pressed.',
  },
  'color-bg-fill-tertiary': {
    value: colors.gray[8],
    description:
      'Use for the background color of elements with a smaller surface area and a low level of prominence.',
  },
  'color-bg-fill-tertiary-hover': {
    value: colors.gray[9],
    description:
      'Use for the background color of elements with a smaller surface area and a low level of prominence, when hovered.',
  },
  'color-bg-fill-tertiary-active': {
    value: colors.gray[10],
    description:
      'Use for the background color of elements with a smaller surface area and a low level of prominence, when pressed.',
  },
  'color-bg-fill-brand': {
    value: colors.gray[15],
    description: 'Use to pull focus to main actions, like primary buttons.',
  },
  'color-bg-fill-brand-hover': {
    value: colors.gray[16],
    description:
      'Use to pull focus to main actions, like primary buttons, when hovered.',
  },
  'color-bg-fill-brand-active': {
    value: colors.gray[16],
    description:
      'Use to pull focus to main actions, like primary buttons, when pressed.',
  },
  'color-bg-fill-brand-selected': {
    value: colors.gray[15],
    description:
      'Use to pull focus to main actions, like primary buttons or checkboxes, when selected.',
  },
  'color-bg-fill-brand-disabled': {
    value: colors.blackAlpha[9],
    description:
      'Use for backgrounds of main actions in a disabled state, like primary buttosn.',
  },
  'color-bg-fill-info': {
    value: colors.azure[9],
    description:
      'Use for the background color of elements with a smaller surface area communicating important information, like a badge or button.',
  },
  'color-bg-fill-info-hover': {
    value: colors.azure[10],
    description:
      'Use for the background color of elements with a smaller surface area communicating important information, when hovered.',
  },
  'color-bg-fill-info-active': {
    value: colors.azure[11],
    description:
      'Use for the background color of elements with a smaller surface area communicating important information, when pressed.',
  },
  'color-bg-fill-info-secondary': {
    value: colors.azure[4],
    description:
      'Use for the background color of elements with a smaller surface area communicating important information, with a medium level of prominence.',
  },
  'color-bg-fill-success': {
    value: colors.green[12],
    description: `Use for the background color of elements with a smaller surface area communicating success, like a badge or a banner.`,
  },
  'color-bg-fill-success-hover': {
    value: colors.green[13],
    description:
      'Use for the background color of elements with a smaller surface area communicating success, when hovered.',
  },
  'color-bg-fill-success-active': {
    value: colors.green[14],
    description:
      'Use for the background color of elements with a smaller surface area communicating success, when pressed.',
  },
  'color-bg-fill-success-secondary': {
    value: colors.green[3],
    description:
      'Use for the background color of elements with a smaller surface area communicating success, with a medium level of prominence.',
  },
  'color-bg-fill-warning': {
    value: colors.orange[9],
    description:
      'Use for the background color of elements with a smaller surface area communicating warning, like a badge or a banner.',
  },
  'color-bg-fill-warning-hover': {
    value: colors.orange[10],
    description:
      'Use for the background color of elements with a smaller surface area communicating warning, when hovered.',
  },
  'color-bg-fill-warning-active': {
    value: colors.orange[11],
    description:
      'Use for the background color of elements with a smaller surface area communicating warning, when pressed.',
  },
  'color-bg-fill-warning-secondary': {
    value: colors.orange[7],
    description:
      'Use for the background color of elements with a smaller surface area communicating warning, with a medium level of prominence.',
  },
  'color-bg-fill-caution': {
    value: colors.yellow[6],
    description:
      'Use for the background color of elements with a smaller surface area communicating caution, like a badge or a banner.',
  },
  'color-bg-fill-caution-hover': {
    value: colors.yellow[8],
    description:
      'Use for the background color of elements with a smaller surface area communicating caution, when hovered.',
  },
  'color-bg-fill-caution-active': {
    value: colors.yellow[9],
    description: `Use for the background color of elements with a smaller surface area communicating caution, when pressed.`,
  },
  'color-bg-fill-caution-secondary': {
    value: colors.yellow[4],
    description:
      'Use for the background color of elements with a smaller surface area communicating caution, with a medium level of prominence.',
  },
  'color-bg-fill-critical': {
    value: colors.red[12],
    description:
      'Use for the background color of elements with a smaller surface area communicating critical information, like a button or a badge.',
  },
  'color-bg-fill-critical-hover': {
    value: colors.red[13],
    description:
      'Use for the background color of elements with a smaller surface area communicating critical information, when hovered.',
  },
  'color-bg-fill-critical-active': {
    value: colors.red[14],
    description:
      'Use for the background color of elements with a smaller surface area communicating critical information, when pressed.',
  },
  'color-bg-fill-critical-selected': {
    value: colors.red[14],
    description:
      'Use for the background color of elements with a smaller surface area communicating critical information, when selected.',
  },
  'color-bg-fill-critical-secondary': {
    value: colors.red[6],
    description:
      'Use for the background color of elements with a smaller surface area communicating critical information, with a medium level of prominence.',
  },
  'color-bg-fill-emphasis': {
    value: colors.blue[13],
    description:
      'Use for the background color of elements with a smaller surface area with a high level of prominence, like a button or a badge.',
  },
  'color-bg-fill-emphasis-hover': {
    value: colors.blue[14],
    description:
      'Use for the background color of elements with a smaller surface area with a high level of prominence, when hovered.',
  },
  'color-bg-fill-emphasis-active': {
    value: colors.blue[15],
    description:
      'Use for the background color of elements with a smaller surface area with a high level of prominence, when pressed.',
  },
  'color-bg-fill-magic': {
    value: colors.purple[12],
    description:
      'Use for the background color of elements suggested by magic AI, like a suggested product tag.',
  },
  'color-bg-fill-magic-secondary': {
    value: colors.purple[6],
    description:
      'Use for the background color of elements suggested by magic AI, with a medium level of prominence.',
  },
  'color-bg-fill-magic-secondary-hover': {
    value: colors.purple[7],
    description:
      'Use for the background color of elements suggested by magic AI, with a medium level of prominence, when hovered.',
  },
  'color-bg-fill-magic-secondary-active': {
    value: colors.purple[8],
    description:
      'Use for the background color of elements suggested by magic AI, with a medium level of prominence, when pressed.',
  },
  'color-bg-fill-inverse': {
    value: colors.gray[15],
    description:
      'Use for the background color of elements with a smaller surface area on a dark background.',
  },
  'color-bg-fill-inverse-hover': {
    value: colors.gray[14],
    description:
      'Use for the background color of elements with a smaller surface area on a dark background, when hovered.',
  },
  'color-bg-fill-inverse-active': {
    value: colors.gray[13],
    description:
      'Use for the background color of elements with a smaller surface area on a dark background, when pressed.',
  },
  'color-bg-fill-transparent': {
    value: colors.blackAlpha[3],
    description:
      'Use for the background color of elements that need to sit on different background colors, like tabs.',
  },
  'color-bg-fill-transparent-hover': {
    value: colors.blackAlpha[5],
    description:
      'Use for the background color of elements that need to sit on different background colors, like tabs, when hovered.',
  },
  'color-bg-fill-transparent-active': {
    value: colors.blackAlpha[7],
    description:
      'Use for the background color of elements that need to sit on different background colors, like tabs, when pressed.',
  },
  'color-bg-fill-transparent-selected': {
    value: colors.blackAlpha[7],
    description:
      'Use for the background color of elements that need to sit on different background colors, like tabs, when selected.',
  },
  'color-bg-fill-transparent-secondary': {
    value: colors.blackAlpha[6],
    description:
      'Use for the background color of elements that need to sit on different background colors, like tabs, with a medium level of prominence.',
  },
  'color-bg-fill-transparent-secondary-hover': {
    value: colors.blackAlpha[7],
    description:
      'Use for the background color of elements that need to sit on different background colors, like tabs, with a medium level of prominence, when hovered.',
  },
  'color-bg-fill-transparent-secondary-active': {
    value: colors.blackAlpha[8],
    description:
      'Use for the background color of elements that need to sit on different background colors, like tabs, with a medium level of prominence, when pressed.',
  },
  'color-text': {
    value: colors.gray[15],
    description: 'Use for the default text color.',
  },
  'color-text-secondary': {
    value: colors.gray[13],
    description: 'Use for text with lower prominence.',
  },
  'color-text-disabled': {
    value: colors.gray[11],
    description: 'Use for text in a disabled state.',
  },
  'color-text-link': {
    value: colors.blue[13],
    description: 'Use for text links.',
  },
  'color-text-link-hover': {
    value: colors.blue[14],
    description: 'Use for text links when hovered.',
  },
  'color-text-link-active': {
    value: colors.blue[15],
    description: 'Use for text links when pressed.',
  },
  'color-text-brand': {
    value: colors.gray[14],
    description: 'Use for text that needs to pull attention.',
  },
  'color-text-brand-hover': {
    value: colors.gray[15],
    description: 'Use for text that needs to pull attention, when hovered.',
  },
  'color-text-brand-on-bg-fill': {
    value: colors.gray[1],
    description: 'Use for text on bg-fill-brand, like primary buttons.',
  },
  'color-text-brand-on-bg-fill-hover': {
    value: colors.gray[8],
    description: 'Use for text on bg-fill-brand-hover, when hovered.',
  },
  'color-text-brand-on-bg-fill-active': {
    value: colors.gray[10],
    description: 'Use for text on bg-fill-brand-active, when pressed.',
  },
  'color-text-brand-on-bg-fill-disabled': {
    value: colors.gray[1],
    description: 'Use for disabled text on bg-fill-brand-disabled.',
  },
  'color-text-info': {
    value: colors.azure[14],
    description: 'Use for text communicating important information.',
  },
  'color-text-info-hover': {
    value: colors.azure[15],
    description:
      'Use for text communicating important information, when hovered.',
  },
  'color-text-info-active': {
    value: colors.azure[16],
    description:
      'Use for text communicating important information, when pressed.',
  },
  'color-text-info-on-bg-fill': {
    value: colors.azure[16],
    description: 'Use for text and icons on bg-fill-info.',
  },
  'color-text-success': {
    value: colors.green[14],
    description: 'Use for text communicating success.',
  },
  'color-text-success-hover': {
    value: colors.green[15],
    description: 'Use for text communicating success, when hovered.',
  },
  'color-text-success-active': {
    value: colors.green[16],
    description: 'Use for text communicating success, when pressed.',
  },
  'color-text-success-on-bg-fill': {
    value: colors.green[1],
    description: 'Use for text and icons on bg-fill-success.',
  },
  'color-text-caution': {
    value: colors.yellow[14],
    description: 'Use for text communicating caution.',
  },
  'color-text-caution-hover': {
    value: colors.yellow[15],
    description: 'Use for text communicating caution, when hovered.',
  },
  'color-text-caution-active': {
    value: colors.yellow[16],
    description: 'Use for text communicating caution, when pressed.',
  },
  'color-text-caution-on-bg-fill': {
    value: colors.yellow[15],
    description: 'Use for text and icons on bg-fill-caution.',
  },
  'color-text-warning': {
    value: colors.orange[14],
    description: 'Use for text communicating warning.',
  },
  'color-text-warning-hover': {
    value: colors.orange[15],
    description: 'Use for text communicating warning, when hovered.',
  },
  'color-text-warning-active': {
    value: colors.orange[16],
    description: 'Use for text communicating warning, when pressed.',
  },
  'color-text-warning-on-bg-fill': {
    value: colors.orange[16],
    description: 'Use for text and icons on bg-fill-warning.',
  },
  'color-text-critical': {
    value: colors.red[14],
    description: 'Use for text communicating critical information.',
  },
  'color-text-critical-hover': {
    value: colors.red[15],
    description:
      'Use for text communicating critical information, when hovered.',
  },
  'color-text-critical-active': {
    value: colors.red[16],
    description:
      'Use for text communicating critical information, when pressed.',
  },
  'color-text-critical-on-bg-fill': {
    value: colors.red[1],
    description: 'Use for text and icons on bg-fill-critical.',
  },
  'color-text-emphasis': {
    value: colors.blue[13],
    description: 'Use for text with the highest level of prominence.',
  },
  'color-text-emphasis-hover': {
    value: colors.blue[14],
    description:
      'Use for text with the highest level of prominence, when hovered.',
  },
  'color-text-emphasis-active': {
    value: colors.blue[15],
    description:
      'Use for text with the highest level of prominence, when pressed.',
  },
  'color-text-emphasis-on-bg-fill': {
    value: colors.blue[1],
    description: 'Use for text and icons on bg-fill-emphasis.',
  },
  'color-text-emphasis-on-bg-fill-hover': {
    value: colors.blue[5],
    description: 'Use for text and icons on bg-fill-emphasis-hover.',
  },
  'color-text-emphasis-on-bg-fill-active': {
    value: colors.blue[7],
    description: 'Use for text and icons on bg-fill-emphasis-active.',
  },
  'color-text-magic': {
    value: colors.purple[14],
    description: 'Use for text suggested by magic AI.',
  },
  'color-text-magic-on-bg-fill': {
    value: colors.purple[1],
    description: 'Use for text and icons on bg-fill-magic.',
  },
  'color-text-inverse': {
    value: colors.gray[8],
    description: 'Use for text on a dark background.',
  },
  'color-text-inverse-secondary': {
    value: colors.gray[11],
    description: 'Use for secondary text on a dark background.',
  },
  'color-text-link-inverse': {
    value: colors.blue[8],
    description: 'Use for text links on a dark background.',
  },
  'color-border': {
    value: colors.gray[8],
    description: 'Use as the default color for borders on any element.',
  },
  'color-border-hover': {
    value: colors.gray[10],
    description: 'Use as the hover color for borders on any element.',
  },
  'color-border-disabled': {
    value: colors.gray[7],
    description: 'Use as the disabled color for borders on any element.',
  },
  'color-border-secondary': {
    value: colors.gray[7],
    description:
      'Used as the default color for hr elements or any visual dividers.',
  },
  'color-border-tertiary': {
    value: colors.gray[10],
  },
  'color-border-focus': {
    value: colors.blue[13],
    description: 'Use as the focus color for any interactive element.',
  },
  'color-border-brand': {
    value: colors.gray[8],
  },
  'color-border-info': {
    value: colors.azure[8],
  },
  'color-border-success': {
    value: colors.green[5],
  },
  'color-border-caution': {
    value: colors.yellow[5],
  },
  'color-border-warning': {
    value: colors.orange[8],
  },
  'color-border-critical': {
    value: colors.red[8],
  },
  'color-border-critical-secondary': {
    value: colors.red[14],
  },
  'color-border-emphasis': {
    value: colors.blue[13],
  },
  'color-border-emphasis-hover': {
    value: colors.blue[14],
  },
  'color-border-emphasis-active': {
    value: colors.blue[15],
  },
  'color-border-magic': {
    value: colors.purple[10],
  },
  'color-border-magic-secondary': {
    value: colors.purple[12],
  },
  'color-border-inverse': {
    value: colors.gray[13],
  },
  'color-border-inverse-hover': {
    value: colors.gray[10],
  },
  'color-border-inverse-active': {
    value: colors.gray[8],
  },
  'color-icon': {
    value: colors.gray[14],
  },
  'color-icon-hover': {
    value: colors.gray[15],
  },
  'color-icon-active': {
    value: colors.gray[16],
  },
  'color-icon-disabled': {
    value: colors.gray[10],
  },
  'color-icon-secondary': {
    value: colors.gray[12],
  },
  'color-icon-secondary-hover': {
    value: colors.gray[13],
  },
  'color-icon-secondary-active': {
    value: colors.gray[14],
  },
  'color-icon-brand': {
    value: colors.gray[16],
  },
  'color-icon-info': {
    value: colors.azure[11],
  },
  'color-icon-success': {
    value: colors.green[12],
  },
  'color-icon-caution': {
    value: colors.yellow[11],
  },
  'color-icon-warning': {
    value: colors.orange[11],
  },
  'color-icon-critical': {
    value: colors.red[11],
  },
  'color-icon-emphasis': {
    value: colors.blue[13],
  },
  'color-icon-emphasis-hover': {
    value: colors.blue[14],
  },
  'color-icon-emphasis-active': {
    value: colors.blue[15],
  },
  'color-icon-magic': {
    value: colors.purple[12],
  },
  'color-icon-inverse': {
    value: colors.gray[8],
  },
  'color-avatar-bg-fill': {
    value: colors.gray[11],
  },
  'color-avatar-five-bg-fill': {
    value: colors.rose[7],
  },
  'color-avatar-five-text-on-bg-fill': {
    value: colors.rose[14],
  },
  'color-avatar-four-bg-fill': {
    value: colors.azure[7],
  },
  'color-avatar-four-text-on-bg-fill': {
    value: colors.azure[14],
  },
  'color-avatar-one-bg-fill': {
    value: colors.magenta[7],
  },
  'color-avatar-one-text-on-bg-fill': {
    value: colors.magenta[14],
  },
  'color-avatar-text-on-bg-fill': {
    value: colors.gray[1],
  },
  'color-avatar-three-bg-fill': {
    value: colors.cyan[7],
  },
  'color-avatar-three-text-on-bg-fill': {
    value: colors.cyan[14],
  },
  'color-avatar-two-bg-fill': {
    value: colors.green[7],
  },
  'color-avatar-two-text-on-bg-fill': {
    value: colors.green[14],
  },
  'color-backdrop-bg': {
    value: colors.blackAlpha[14],
  },
  'color-checkbox-bg-surface-disabled': {
    value: colors.blackAlpha[7],
  },
  'color-checkbox-icon-disabled': {
    value: colors.gray[1],
  },
  'color-input-bg-surface': {
    value: colors.gray[2],
  },
  'color-input-bg-surface-hover': {
    value: colors.gray[3],
  },
  'color-input-bg-surface-active': {
    value: colors.gray[4],
  },
  'color-input-border': {
    value: colors.gray[12],
  },
  'color-input-border-hover': {
    value: colors.gray[13],
  },
  'color-input-border-active': {
    value: colors.gray[16],
  },
  'color-nav-bg': {
    value: colors.gray[7],
  },
  'color-nav-bg-surface': {
    value: colors.blackAlpha[3],
  },
  'color-nav-bg-surface-hover': {
    value: colors.gray[6],
  },
  'color-nav-bg-surface-active': {
    value: colors.gray[3],
  },
  'color-nav-bg-surface-selected': {
    value: colors.gray[3],
  },
  'color-radio-button-bg-surface-disabled': {
    value: colors.blackAlpha[7],
  },
  'color-radio-button-icon-disabled': {
    value: colors.gray[1],
  },
  'color-video-thumbnail-play-button-bg-fill-hover': {
    value: colors.blackAlpha[15],
  },
  'color-video-thumbnail-play-button-bg-fill': {
    value: colors.blackAlpha[14],
  },
  'color-video-thumbnail-play-button-text-on-bg-fill': {
    value: colors.gray[1],
  },
};
