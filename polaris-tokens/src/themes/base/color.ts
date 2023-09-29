import type {MetaTokenProperties} from '../types';
import * as colors from '../../colors';

export type ColorBackgroundAlias =
  | 'bg'
  | 'bg-inverse'
  | 'bg-surface'
  | 'bg-surface-hover'
  | 'bg-surface-active'
  | 'bg-surface-selected'
  | 'bg-surface-disabled'
  | 'bg-surface-secondary'
  | 'bg-surface-secondary-hover'
  | 'bg-surface-secondary-active'
  | 'bg-surface-secondary-selected'
  | 'bg-surface-tertiary'
  | 'bg-surface-tertiary-hover'
  | 'bg-surface-tertiary-active'
  | 'bg-surface-transparent'
  | 'bg-surface-brand'
  | 'bg-surface-brand-hover'
  | 'bg-surface-brand-active'
  | 'bg-surface-brand-selected'
  | 'bg-surface-info'
  | 'bg-surface-info-hover'
  | 'bg-surface-info-active'
  | 'bg-surface-success'
  | 'bg-surface-success-hover'
  | 'bg-surface-success-active'
  | 'bg-surface-caution'
  | 'bg-surface-caution-hover'
  | 'bg-surface-caution-active'
  | 'bg-surface-warning'
  | 'bg-surface-warning-hover'
  | 'bg-surface-warning-active'
  | 'bg-surface-critical'
  | 'bg-surface-critical-hover'
  | 'bg-surface-critical-active'
  | 'bg-surface-magic'
  | 'bg-surface-magic-hover'
  | 'bg-surface-magic-active'
  | 'bg-surface-emphasis'
  | 'bg-surface-emphasis-hover'
  | 'bg-surface-emphasis-active'
  | 'bg-surface-inverse'
  | 'bg-fill'
  | 'bg-fill-hover'
  | 'bg-fill-active'
  | 'bg-fill-selected'
  | 'bg-fill-disabled'
  | 'bg-fill-secondary'
  | 'bg-fill-secondary-hover'
  | 'bg-fill-secondary-active'
  | 'bg-fill-tertiary'
  | 'bg-fill-tertiary-hover'
  | 'bg-fill-tertiary-active'
  | 'bg-fill-brand'
  | 'bg-fill-brand-hover'
  | 'bg-fill-brand-active'
  | 'bg-fill-brand-selected'
  | 'bg-fill-brand-disabled'
  | 'bg-fill-emphasis'
  | 'bg-fill-emphasis-hover'
  | 'bg-fill-emphasis-active'
  | 'bg-fill-success'
  | 'bg-fill-success-hover'
  | 'bg-fill-success-active'
  | 'bg-fill-success-secondary'
  | 'bg-fill-critical'
  | 'bg-fill-critical-hover'
  | 'bg-fill-critical-active'
  | 'bg-fill-critical-selected'
  | 'bg-fill-critical-secondary'
  | 'bg-fill-caution'
  | 'bg-fill-caution-hover'
  | 'bg-fill-caution-active'
  | 'bg-fill-caution-secondary'
  | 'bg-fill-info'
  | 'bg-fill-info-hover'
  | 'bg-fill-info-active'
  | 'bg-fill-info-secondary'
  | 'bg-fill-warning'
  | 'bg-fill-warning-hover'
  | 'bg-fill-warning-active'
  | 'bg-fill-warning-secondary'
  | 'bg-fill-magic'
  | 'bg-fill-magic-secondary'
  | 'bg-fill-magic-secondary-hover'
  | 'bg-fill-magic-secondary-active'
  | 'bg-fill-inverse'
  | 'bg-fill-inverse-hover'
  | 'bg-fill-inverse-active'
  | 'bg-fill-transparent'
  | 'bg-fill-transparent-hover'
  | 'bg-fill-transparent-active'
  | 'bg-fill-transparent-selected'
  | 'bg-fill-transparent-secondary'
  | 'bg-fill-transparent-secondary-hover'
  | 'bg-fill-transparent-secondary-active'
  /** Specialty and component background colors. */
  | 'nav-bg'
  | 'backdrop-bg'
  | 'input-bg-surface'
  | 'input-bg-surface-hover'
  | 'input-bg-surface-active'
  | 'nav-bg-surface'
  | 'nav-bg-surface-hover'
  | 'nav-bg-surface-active'
  | 'nav-bg-surface-selected'
  | 'radio-button-bg-surface-disabled'
  | 'checkbox-bg-surface-disabled'
  | 'avatar-bg-fill'
  | 'avatar-one-bg-fill'
  | 'avatar-two-bg-fill'
  | 'avatar-three-bg-fill'
  | 'avatar-four-bg-fill'
  | 'avatar-five-bg-fill'
  | 'video-thumbnail-play-button-bg-fill'
  | 'video-thumbnail-play-button-bg-fill-hover';

export type ColorBorderAlias =
  | 'border'
  | 'border-caution'
  | 'border-critical'
  | 'border-critical-secondary'
  | 'border-disabled'
  | 'border-hover'
  | 'border-focus'
  | 'border-info'
  | 'border-inverse'
  | 'border-inverse-hover'
  | 'border-inverse-active'
  | 'border-magic'
  | 'border-magic-secondary'
  | 'border-success'
  | 'border-secondary'
  | 'border-tertiary'
  | 'border-brand'
  | 'border-warning'
  | 'border-emphasis'
  | 'border-emphasis-hover'
  | 'border-emphasis-active'
  /** Specialty and component border colors. */
  | 'input-border'
  | 'input-border-hover'
  | 'input-border-active';

export type ColorIconAlias =
  | 'icon'
  | 'icon-active'
  | 'icon-caution'
  | 'icon-critical'
  | 'icon-disabled'
  | 'icon-hover'
  | 'icon-info'
  | 'icon-inverse'
  | 'icon-magic'
  | 'icon-success'
  | 'icon-warning'
  | 'icon-secondary'
  | 'icon-secondary-hover'
  | 'icon-secondary-active'
  | 'icon-brand'
  | 'icon-emphasis'
  | 'icon-emphasis-hover'
  | 'icon-emphasis-active'
  /** Specialty and component icon colors. */
  | 'radio-button-icon-disabled'
  | 'checkbox-icon-disabled';

export type ColorTextAlias =
  | 'text'
  | 'text-caution'
  | 'text-caution-hover'
  | 'text-caution-active'
  | 'text-caution-on-bg-fill'
  | 'text-critical'
  | 'text-critical-hover'
  | 'text-critical-active'
  | 'text-critical-on-bg-fill'
  | 'text-disabled'
  | 'text-info'
  | 'text-info-hover'
  | 'text-info-active'
  | 'text-info-on-bg-fill'
  | 'text-inverse'
  | 'text-inverse-secondary'
  | 'text-magic'
  | 'text-magic-on-bg-fill'
  | 'text-success'
  | 'text-success-hover'
  | 'text-success-active'
  | 'text-success-on-bg-fill'
  | 'text-warning'
  | 'text-warning-hover'
  | 'text-warning-active'
  | 'text-warning-on-bg-fill'
  | 'text-secondary'
  | 'text-brand'
  | 'text-brand-hover'
  | 'text-brand-on-bg-fill'
  | 'text-brand-on-bg-fill-hover'
  | 'text-brand-on-bg-fill-active'
  | 'text-brand-on-bg-fill-disabled'
  | 'text-emphasis'
  | 'text-emphasis-hover'
  | 'text-emphasis-active'
  | 'text-emphasis-on-bg-fill'
  | 'text-emphasis-on-bg-fill-hover'
  | 'text-emphasis-on-bg-fill-active'
  | 'text-link'
  | 'text-link-hover'
  | 'text-link-active'
  | 'text-link-inverse'
  /** Specialty and component text colors. */
  | 'avatar-text-on-bg-fill'
  | 'avatar-one-text-on-bg-fill'
  | 'avatar-two-text-on-bg-fill'
  | 'avatar-three-text-on-bg-fill'
  | 'avatar-four-text-on-bg-fill'
  | 'avatar-five-text-on-bg-fill'
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
  'color-bg-surface': {
    value: colors.gray[1],
  },
  'color-bg-surface-secondary': {
    value: colors.gray[4],
  },
  'color-bg-surface-secondary-hover': {
    value: colors.gray[6],
  },
  'color-bg-surface-secondary-active': {
    value: colors.gray[7],
  },
  'color-bg-surface-tertiary': {
    value: colors.gray[5],
  },
  'color-bg-fill-tertiary': {
    value: colors.gray[8],
  },
  'color-bg-fill-tertiary-hover': {
    value: colors.gray[9],
  },
  'color-bg-fill-tertiary-active': {
    value: colors.gray[10],
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
  'color-bg-surface-selected': {
    value: colors.gray[6],
  },
  'color-bg-fill-success': {
    value: colors.green[12],
  },
  'color-bg-fill-success-hover': {
    value: colors.green[13],
  },
  'color-bg-fill-success-active': {
    value: colors.green[14],
  },
  'color-bg-fill-success-secondary': {
    value: colors.green[3],
  },
  'color-bg-surface-success': {
    value: colors.green[3],
  },
  'color-bg-surface-success-hover': {
    value: colors.green[4],
  },
  'color-bg-surface-success-active': {
    value: colors.green[5],
  },
  'color-bg-fill-critical': {
    value: colors.red[12],
  },
  'color-bg-fill-critical-hover': {
    value: colors.red[13],
  },
  'color-bg-fill-critical-active': {
    value: colors.red[14],
  },
  'color-bg-fill-critical-secondary': {
    value: colors.red[6],
  },
  'color-bg-surface-critical': {
    value: colors.red[4],
  },
  'color-bg-surface-critical-hover': {
    value: colors.red[5],
  },
  'color-bg-surface-critical-active': {
    value: colors.red[6],
  },
  'color-bg-fill-caution': {
    value: colors.yellow[6],
  },
  'color-bg-fill-caution-secondary': {
    value: colors.yellow[4],
  },
  'color-bg-surface-caution': {
    value: colors.yellow[2],
  },
  'color-bg-surface-caution-hover': {
    value: colors.yellow[3],
  },
  'color-bg-surface-caution-active': {
    value: colors.yellow[4],
  },
  'color-bg-fill-info': {
    value: colors.azure[9],
  },
  'color-bg-fill-info-secondary': {
    value: colors.azure[4],
  },
  'color-bg-surface-info': {
    value: colors.azure[3],
  },
  'color-bg-surface-info-hover': {
    value: colors.azure[4],
  },
  'color-bg-surface-info-active': {
    value: colors.azure[6],
  },
  'color-bg-fill-warning': {
    value: colors.orange[9],
  },
  'color-bg-fill-warning-secondary': {
    value: colors.orange[7],
  },
  'color-bg-surface-warning': {
    value: colors.orange[3],
  },
  'color-bg-fill-magic': {
    value: colors.purple[12],
  },
  'color-bg-fill-magic-secondary': {
    value: colors.purple[6],
  },
  'color-bg-fill-magic-secondary-hover': {
    value: colors.purple[7],
  },
  'color-bg-fill-magic-secondary-active': {
    value: colors.purple[8],
  },
  'color-bg-surface-magic-hover': {
    value: colors.purple[4],
  },
  'color-bg-fill-secondary': {
    value: colors.gray[6],
  },
  'color-bg-fill-inverse': {
    value: colors.gray[15],
  },
  'color-bg-fill-inverse-hover': {
    value: colors.gray[14],
  },
  'color-bg-fill-inverse-active': {
    value: colors.gray[13],
  },
  'color-bg-surface-transparent': {
    value: colors.blackAlpha[1],
  },
  'color-bg-fill-transparent-hover': {
    value: colors.blackAlpha[5],
  },
  'color-bg-fill-transparent-active': {
    value: colors.blackAlpha[6],
  },
  'color-bg-fill-disabled': {
    value: colors.blackAlpha[5],
  },
  'color-bg-fill-transparent-secondary': {
    value: colors.blackAlpha[6],
  },
  'color-bg-fill-brand-disabled': {
    value: colors.blackAlpha[9],
  },
  'color-backdrop-bg': {
    value: colors.blackAlpha[14],
  },
  'color-avatar-bg-fill': {
    value: colors.gray[11],
  },
  'color-avatar-one-bg-fill': {
    value: colors.magenta[7],
  },
  'color-avatar-two-bg-fill': {
    value: colors.green[7],
  },
  'color-avatar-three-bg-fill': {
    value: colors.cyan[7],
  },
  'color-avatar-four-bg-fill': {
    value: colors.azure[7],
  },
  'color-avatar-five-bg-fill': {
    value: colors.rose[7],
  },
  'color-text-secondary': {
    value: colors.gray[13],
  },
  'color-text-emphasis': {
    value: colors.blue[13],
  },
  'color-text-emphasis-hover': {
    value: colors.blue[14],
  },
  'color-text-emphasis-active': {
    value: colors.blue[15],
  },
  'color-text-brand': {
    value: colors.gray[14],
  },
  'color-text-brand-hover': {
    value: colors.gray[15],
  },
  'color-text-info-on-bg-fill': {
    value: colors.azure[16],
  },
  'color-text-inverse-secondary': {
    value: colors.gray[11],
  },
  'color-avatar-text-on-bg-fill': {
    value: colors.gray[1],
  },
  'color-avatar-one-text-on-bg-fill': {
    value: colors.magenta[14],
  },
  'color-avatar-two-text-on-bg-fill': {
    value: colors.green[14],
  },
  'color-avatar-three-text-on-bg-fill': {
    value: colors.cyan[14],
  },
  'color-avatar-four-text-on-bg-fill': {
    value: colors.azure[14],
  },
  'color-avatar-five-text-on-bg-fill': {
    value: colors.rose[14],
  },
  'color-icon-secondary': {
    value: colors.gray[12],
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
  'color-icon-brand': {
    value: colors.gray[16],
  },
  'color-border-secondary': {
    value: colors.gray[7],
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
  'color-border-emphasis-hover': {
    value: colors.blue[14],
  },
  'color-border-emphasis-active': {
    value: colors.blue[15],
  },
  'color-border-focus': {
    value: colors.blue[13],
  },
  'color-border-brand': {
    value: colors.gray[8],
  },
  'color-border-critical-secondary': {
    value: colors.red[14],
  },
  'color-border-magic-secondary': {
    value: colors.purple[12],
  },
  'color-bg-inverse': {
    value: colors.gray[16],
  },
  'color-bg': {
    value: colors.gray[1],
  },
  'color-border-inverse': {
    value: colors.gray[13],
  },
  'color-border-hover': {
    value: colors.gray[10],
  },
  'color-border': {
    value: colors.gray[8],
  },
  'color-border-disabled': {
    value: colors.gray[7],
  },
  'color-border-success': {
    value: colors.green[5],
  },
  'color-border-critical': {
    value: colors.red[8],
  },
  'color-border-caution': {
    value: colors.yellow[5],
  },
  'color-border-info': {
    value: colors.azure[8],
  },
  'color-border-magic': {
    value: colors.purple[10],
  },
  'color-icon-hover': {
    value: colors.gray[15],
  },
  'color-icon': {
    value: colors.gray[14],
  },
  'color-icon-disabled': {
    value: colors.gray[10],
  },
  'color-icon-inverse': {
    value: colors.gray[8],
  },
  'color-icon-success': {
    value: colors.green[12],
  },
  'color-icon-critical': {
    value: colors.red[11],
  },
  'color-icon-caution': {
    value: colors.yellow[11],
  },
  'color-icon-info': {
    value: colors.azure[11],
  },
  'color-icon-warning': {
    value: colors.orange[11],
  },
  'color-icon-magic': {
    value: colors.purple[13],
  },
  'color-text': {
    value: colors.gray[15],
  },
  'color-text-disabled': {
    value: colors.gray[11],
  },
  'color-text-inverse': {
    value: colors.gray[8],
  },
  'color-text-success': {
    value: colors.green[14],
  },
  'color-text-critical-active': {
    value: colors.red[16],
  },
  'color-text-critical': {
    value: colors.red[14],
  },
  'color-text-caution': {
    value: colors.yellow[14],
  },
  'color-text-info': {
    value: colors.azure[14],
  },
  'color-text-magic': {
    value: colors.purple[14],
  },
  // ------------------------------
  // Net new tokens
  // ------------------------------
  'color-border-inverse-active': {
    value: colors.gray[8],
  },
  'color-border-inverse-hover': {
    value: colors.gray[10],
  },
  'color-border-warning': {
    value: colors.orange[8],
  },
  'color-checkbox-icon-disabled': {
    value: colors.gray[1],
  },
  'color-checkbox-bg-surface-disabled': {
    value: colors.blackAlpha[7],
  },
  'color-bg-fill-active': {
    value: colors.gray[4],
  },
  'color-bg-fill-brand-selected': {
    value: colors.gray[15],
  },
  'color-bg-fill-caution-active': {
    value: colors.yellow[9],
  },
  'color-bg-fill-caution-hover': {
    value: colors.yellow[8],
  },
  'color-bg-fill-critical-selected': {
    value: colors.red[14],
  },
  'color-bg-fill-emphasis-active': {
    value: colors.blue[15],
  },
  'color-bg-fill-emphasis-hover': {
    value: colors.blue[14],
  },
  'color-bg-fill-emphasis': {
    value: colors.blue[13],
  },
  'color-bg-fill-hover': {
    value: colors.gray[3],
  },
  'color-bg-fill-info-active': {
    value: colors.azure[11],
  },
  'color-bg-fill-info-hover': {
    value: colors.azure[10],
  },
  'color-bg-fill-secondary-active': {
    value: colors.gray[8],
  },
  'color-bg-fill-secondary-hover': {
    value: colors.gray[7],
  },
  'color-bg-fill-selected': {
    value: colors.gray[10],
  },
  'color-bg-fill-transparent-secondary-active': {
    value: colors.blackAlpha[8],
  },
  'color-bg-fill-transparent-secondary-hover': {
    value: colors.blackAlpha[7],
  },
  'color-bg-fill-transparent-selected': {
    value: colors.blackAlpha[6],
  },
  'color-bg-fill-transparent': {
    value: colors.blackAlpha[1],
  },
  'color-bg-fill-warning-active': {
    value: colors.orange[11],
  },
  'color-bg-fill-warning-hover': {
    value: colors.orange[10],
  },
  'color-bg-fill': {
    value: colors.gray[1],
  },
  'color-icon-secondary-active': {
    value: colors.gray[14],
  },
  'color-icon-secondary-hover': {
    value: colors.gray[13],
  },
  'color-text-link-active': {
    value: colors.blue[15],
  },
  'color-text-link-hover': {
    value: colors.blue[14],
  },
  'color-text-link': {
    value: colors.blue[13],
  },
  'color-nav-bg': {
    value: colors.gray[7],
  },
  'color-nav-bg-surface-active': {
    value: colors.gray[3],
  },
  'color-nav-bg-surface-hover': {
    value: colors.gray[6],
  },
  'color-nav-bg-surface-selected': {
    value: colors.gray[3],
  },
  'color-nav-bg-surface': {
    value: colors.blackAlpha[3],
  },
  'color-radio-button-icon-disabled': {
    value: colors.gray[1],
  },
  'color-radio-button-bg-surface-disabled': {
    value: colors.blackAlpha[7],
  },
  'color-bg-surface-emphasis-active': {
    value: colors.blue[5],
  },
  'color-bg-surface-emphasis-hover': {
    value: colors.blue[4],
  },
  'color-bg-surface-emphasis': {
    value: colors.blue[3],
  },
  'color-bg-surface-inverse': {
    value: colors.gray[15],
  },
  'color-bg-surface-magic-active': {
    value: colors.purple[6],
  },
  'color-bg-surface-secondary-selected': {
    value: colors.gray[7],
  },
  'color-bg-surface-tertiary-active': {
    value: colors.gray[8],
  },
  'color-bg-surface-tertiary-hover': {
    value: colors.gray[7],
  },
  'color-bg-surface-warning-active': {
    value: colors.orange[5],
  },
  'color-bg-surface-warning-hover': {
    value: colors.orange[4],
  },
  'color-text-brand-on-bg-fill-active': {
    value: colors.gray[10],
  },
  'color-text-brand-on-bg-fill-disabled': {
    value: colors.gray[1],
  },
  'color-text-brand-on-bg-fill-hover': {
    value: colors.gray[8],
  },
  'color-text-brand-on-bg-fill': {
    value: colors.gray[1],
  },
  'color-text-caution-active': {
    value: colors.yellow[16],
  },
  'color-text-caution-hover': {
    value: colors.yellow[15],
  },
  'color-text-caution-on-bg-fill': {
    value: colors.yellow[15],
  },
  'color-text-critical-on-bg-fill': {
    value: colors.red[1],
  },
  'color-text-emphasis-on-bg-fill-active': {
    value: colors.blue[7],
  },
  'color-text-emphasis-on-bg-fill-hover': {
    value: colors.blue[5],
  },
  'color-text-emphasis-on-bg-fill': {
    value: colors.blue[1],
  },
  'color-text-info-active': {
    value: colors.azure[16],
  },
  'color-text-info-hover': {
    value: colors.azure[15],
  },
  'color-text-magic-on-bg-fill': {
    value: colors.purple[1],
  },
  'color-text-success-active': {
    value: colors.green[16],
  },
  'color-text-success-hover': {
    value: colors.green[15],
  },
  'color-text-success-on-bg-fill': {
    value: colors.green[1],
  },
  'color-text-warning-active': {
    value: colors.orange[16],
  },
  'color-text-warning-hover': {
    value: colors.orange[15],
  },
  'color-text-warning-on-bg-fill': {
    value: colors.orange[16],
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
  'color-bg-surface-hover': {
    value: colors.gray[4],
  },
  'color-bg-surface-active': {
    value: colors.gray[5],
  },
  'color-bg-surface-disabled': {
    value: colors.blackAlpha[5],
  },
  'color-bg-fill-brand': {
    value: colors.gray[15],
  },
  'color-bg-fill-brand-hover': {
    value: colors.gray[16],
  },
  'color-bg-fill-brand-active': {
    value: colors.gray[16],
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
  'color-bg-surface-magic': {
    value: colors.purple[3],
  },
  'color-text-critical-hover': {
    value: colors.red[15],
  },
  'color-text-warning': {
    value: colors.orange[14],
  },
  'color-text-link-inverse': {
    value: colors.blue[8],
  },
  'color-border-tertiary': {
    value: colors.gray[10],
  },
  'color-border-emphasis': {
    value: colors.blue[13],
  },
  'color-icon-active': {
    value: colors.gray[16],
    description: '',
  },
};
