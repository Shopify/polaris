import type {Experimental} from '../../types';
import type {MetaTokenProperties} from '../types';
import * as colors from '../../colors';
import * as colorsExperimental from '../../colors-experimental';

export type ColorBackgroundAlias =
  | 'bg'
  | 'bg-active'
  | 'bg-app'
  | 'bg-app-active'
  | 'bg-app-hover'
  | 'bg-app-selected'
  | 'bg-caution'
  | 'bg-caution-strong'
  | 'bg-caution-subdued'
  | 'bg-caution-subdued-active'
  | 'bg-caution-subdued-hover'
  | 'bg-critical'
  | 'bg-critical-strong'
  | 'bg-critical-strong-active'
  | 'bg-critical-strong-hover'
  | 'bg-critical-subdued'
  | 'bg-critical-subdued-active'
  | 'bg-critical-subdued-hover'
  | 'bg-disabled'
  | 'bg-hover'
  | 'bg-info'
  | 'bg-info-strong'
  | 'bg-info-subdued'
  | 'bg-info-subdued-active'
  | 'bg-info-subdued-hover'
  | 'bg-input'
  | 'bg-inset'
  | 'bg-inset-strong'
  | 'bg-interactive'
  | 'bg-interactive-active'
  | 'bg-interactive-disabled'
  | 'bg-interactive-hover'
  | 'bg-interactive-selected'
  | 'bg-interactive-subdued'
  | 'bg-interactive-subdued-active'
  | 'bg-interactive-subdued-hover'
  | 'bg-inverse'
  | 'bg-inverse-active'
  | 'bg-inverse-hover'
  | 'bg-magic'
  | 'bg-magic-hover'
  | 'bg-magic-active'
  | 'bg-magic-strong'
  | 'bg-magic-subdued'
  | 'bg-magic-subdued-hover'
  | 'bg-magic-subdued-active'
  | 'bg-primary'
  | 'bg-primary-active'
  | 'bg-primary-hover'
  | 'bg-primary-subdued'
  | 'bg-primary-subdued-active'
  | 'bg-primary-subdued-hover'
  | 'bg-primary-subdued-selected'
  | 'bg-strong'
  | 'bg-strong-active'
  | 'bg-strong-hover'
  | 'bg-subdued'
  | 'bg-subdued-active'
  | 'bg-subdued-hover'
  | 'bg-success'
  | 'bg-success-strong'
  | 'bg-success-subdued'
  | 'bg-success-subdued-active'
  | 'bg-success-subdued-hover'
  | 'bg-warning'
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
  | ColorBackgroundAliasExperimental
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
  | 'border-caution-subdued'
  | 'border-critical'
  | 'border-critical-active'
  | 'border-critical-hover'
  | 'border-critical-subdued'
  | 'border-critical-secondary'
  | 'border-disabled'
  | 'border-hover'
  | 'border-focus'
  | 'border-info'
  | 'border-info-subdued'
  | 'border-input'
  | 'border-input-hover'
  | 'border-interactive'
  | 'border-interactive-active'
  | 'border-interactive-disabled'
  | 'border-interactive-focus'
  | 'border-interactive-hover'
  | 'border-interactive-subdued'
  | 'border-inverse'
  | 'border-inverse-hover'
  | 'border-inverse-active'
  | 'border-magic'
  | 'border-magic-strong'
  | 'border-magic-secondary'
  | 'border-primary'
  | 'border-strong'
  | 'border-strong-hover'
  | 'border-subdued'
  | 'border-success'
  | 'border-success-subdued'
  | 'border-secondary'
  | 'border-tertiary'
  | 'border-brand'
  | 'border-warning'
  | 'border-emphasis'
  | 'border-emphasis-hover'
  | 'border-emphasis-active'
  | ColorBorderAliasExperimental
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
  | 'icon-interactive'
  | 'icon-interactive-active'
  | 'icon-interactive-disabled'
  | 'icon-interactive-hover'
  | 'icon-interactive-inverse'
  | 'icon-inverse'
  | 'icon-magic'
  | 'icon-on-color'
  | 'icon-primary'
  | 'icon-subdued'
  | 'icon-success'
  | 'icon-warning'
  | 'icon-secondary'
  | 'icon-secondary-hover'
  | 'icon-secondary-active'
  | 'icon-brand'
  | 'icon-emphasis'
  | 'icon-emphasis-hover'
  | 'icon-emphasis-active'
  | ColorIconAliasExperimental
  /** Specialty and component icon colors. */
  | 'radio-button-icon-disabled'
  | 'checkbox-icon-disabled';

export type ColorTextAlias =
  | 'text'
  | 'text-caution'
  | 'text-caution-hover'
  | 'text-caution-active'
  | 'text-caution-on-bg-fill'
  | 'text-caution-strong'
  | 'text-critical'
  | 'text-critical-hover'
  | 'text-critical-active'
  | 'text-critical-on-bg-fill'
  | 'text-critical-strong'
  | 'text-disabled'
  | 'text-info'
  | 'text-info-hover'
  | 'text-info-active'
  | 'text-info-on-bg-fill'
  | 'text-info-strong'
  | 'text-interactive'
  | 'text-interactive-active'
  | 'text-interactive-disabled'
  | 'text-interactive-hover'
  | 'text-interactive-inverse'
  | 'text-inverse'
  | 'text-inverse-secondary'
  | 'text-inverse-subdued'
  | 'text-magic'
  | 'text-magic-on-bg-fill'
  | 'text-magic-strong'
  | 'text-on-color'
  | 'text-primary'
  | 'text-primary-hover'
  | 'text-subdued'
  | 'text-success'
  | 'text-success-hover'
  | 'text-success-active'
  | 'text-success-on-bg-fill'
  | 'text-success-strong'
  | 'text-warning-strong'
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
  | ColorTextAliasExperimental
  /** Specialty and component text colors. */
  | 'avatar-text-on-bg-fill'
  | 'avatar-one-text-on-bg-fill'
  | 'avatar-two-text-on-bg-fill'
  | 'avatar-three-text-on-bg-fill'
  | 'avatar-four-text-on-bg-fill'
  | 'avatar-five-text-on-bg-fill'
  | 'video-thumbnail-play-button-text-on-bg-fill';

type ColorBackgroundAliasExperimental = Experimental<
  | 'bg-backdrop'
  | 'bg-input-active'
  | 'bg-input-hover'
  | 'bg-primary-disabled'
  | 'bg-secondary'
  | 'bg-success-strong-active'
  | 'bg-success-strong-hover'
  | 'bg-transparent'
  | 'bg-transparent-active'
  | 'bg-transparent-disabled'
  | 'bg-transparent-hover'
  | 'bg-transparent-primary'
  | 'bg-transparent-primary-disabled'
  | 'bg-transparent-secondary-disabled'
  | 'bg-transparent-subdued'
  | 'bg-warning-strong'
  | 'bg-warning-subdued'
>;

type ColorTextAliasExperimental = Experimental<
  'text-warning' | 'text-critical-hover'
>;

type ColorIconAliasExperimental = Experimental<
  | 'icon-critical-strong-active'
  | 'icon-critical-strong-hover'
  | 'icon-critical-strong'
  | 'icon-info-strong'
  | 'icon-success-strong'
  | 'icon-warning-strong'
>;

type ColorBorderAliasExperimental = Experimental<
  'border-input-active' | 'border-critical-strong'
>;

type ColorAvatarAliasExperimental = Experimental<
  | 'avatar-background'
  | 'avatar-color'
  | 'avatar-style-one-background'
  | 'avatar-style-one-color'
  | 'avatar-style-two-background'
  | 'avatar-style-two-color'
  | 'avatar-style-three-background'
  | 'avatar-style-three-color'
  | 'avatar-style-four-background'
  | 'avatar-style-four-color'
  | 'avatar-style-five-background'
  | 'avatar-style-five-color'
>;

export type ColorTokenName =
  | `color-${ColorBackgroundAlias}`
  | `color-${ColorBorderAlias}`
  | `color-${ColorIconAlias}`
  | `color-${ColorTextAlias}`
  | `color-${ColorAvatarAliasExperimental}`;

export type ColorTokenGroup = {
  [TokenName in ColorTokenName]: string;
};

export const color: {
  [TokenName in ColorTokenName]: MetaTokenProperties;
} = {
  'color-bg-surface': {
    value: colorsExperimental.gray[1],
  },
  'color-bg-surface-secondary': {
    value: colorsExperimental.gray[4],
  },
  'color-bg-surface-secondary-hover': {
    value: colorsExperimental.gray[6],
  },
  'color-bg-surface-secondary-active': {
    value: colorsExperimental.gray[7],
  },
  'color-bg-surface-tertiary': {
    value: colorsExperimental.gray[5],
  },
  'color-bg-fill-tertiary': {
    value: colorsExperimental.gray[8],
  },
  'color-bg-fill-tertiary-hover': {
    value: colorsExperimental.gray[9],
  },
  'color-bg-fill-tertiary-active': {
    value: colorsExperimental.gray[10],
  },
  'color-input-bg-surface': {
    value: colorsExperimental.gray[2],
  },
  'color-input-bg-surface-hover': {
    value: colorsExperimental.gray[3],
  },
  'color-input-bg-surface-active': {
    value: colorsExperimental.gray[4],
  },
  'color-bg-surface-selected': {
    value: colorsExperimental.gray[3],
  },
  'color-bg-fill-success': {
    value: colorsExperimental.green[12],
  },
  'color-bg-fill-success-hover': {
    value: colorsExperimental.green[13],
  },
  'color-bg-fill-success-active': {
    value: colorsExperimental.green[14],
  },
  'color-bg-fill-success-secondary': {
    value: colorsExperimental.green[3],
  },
  'color-bg-surface-success': {
    value: colorsExperimental.green[3],
  },
  'color-bg-surface-success-hover': {
    value: colorsExperimental.green[4],
  },
  'color-bg-surface-success-active': {
    value: colorsExperimental.green[5],
  },
  'color-bg-fill-critical': {
    value: colorsExperimental.red[12],
  },
  'color-bg-fill-critical-hover': {
    value: colorsExperimental.red[13],
  },
  'color-bg-fill-critical-active': {
    value: colorsExperimental.red[14],
  },
  'color-bg-fill-critical-secondary': {
    value: colorsExperimental.red[6],
  },
  'color-bg-surface-critical': {
    value: colorsExperimental.red[4],
  },
  'color-bg-surface-critical-hover': {
    value: colorsExperimental.red[5],
  },
  'color-bg-surface-critical-active': {
    value: colorsExperimental.red[6],
  },
  'color-bg-fill-caution': {
    value: colorsExperimental.yellow[6],
  },
  'color-bg-fill-caution-secondary': {
    value: colorsExperimental.yellow[4],
  },
  'color-bg-surface-caution': {
    value: colorsExperimental.yellow[2],
  },
  'color-bg-surface-caution-hover': {
    value: colorsExperimental.yellow[3],
  },
  'color-bg-surface-caution-active': {
    value: colorsExperimental.yellow[4],
  },
  'color-bg-fill-info': {
    value: colorsExperimental.azure[9],
  },
  'color-bg-fill-info-secondary': {
    value: colorsExperimental.azure[4],
  },
  'color-bg-surface-info': {
    value: colorsExperimental.azure[3],
  },
  'color-bg-surface-info-hover': {
    value: colorsExperimental.azure[4],
  },
  'color-bg-surface-info-active': {
    value: colorsExperimental.azure[6],
  },
  'color-bg-fill-warning': {
    value: colorsExperimental.orange[9],
  },
  'color-bg-fill-warning-secondary': {
    value: colorsExperimental.orange[7],
  },
  'color-bg-surface-warning': {
    value: colorsExperimental.orange[3],
  },
  'color-bg-fill-magic': {
    value: colorsExperimental.purple[12],
  },
  'color-bg-fill-magic-secondary': {
    value: colorsExperimental.purple[6],
  },
  'color-bg-fill-magic-secondary-hover': {
    value: colorsExperimental.purple[7],
  },
  'color-bg-fill-magic-secondary-active': {
    value: colorsExperimental.purple[8],
  },
  'color-bg-surface-magic-hover': {
    value: colorsExperimental.purple[4],
  },
  'color-bg-fill-secondary': {
    value: colorsExperimental.gray[6],
  },
  'color-bg-fill-inverse': {
    value: colorsExperimental.gray[15],
  },
  'color-bg-fill-inverse-hover': {
    value: colorsExperimental.gray[14],
  },
  'color-bg-fill-inverse-active': {
    value: colorsExperimental.gray[13],
  },
  'color-bg-surface-transparent': {
    value: colorsExperimental.blackAlpha[1],
  },
  'color-bg-fill-transparent-hover': {
    value: colorsExperimental.blackAlpha[5],
  },
  'color-bg-fill-transparent-active': {
    value: colorsExperimental.blackAlpha[6],
  },
  'color-bg-fill-disabled': {
    value: colorsExperimental.blackAlpha[5],
  },
  'color-bg-fill-transparent-secondary': {
    value: colorsExperimental.blackAlpha[6],
  },
  'color-bg-fill-brand-disabled': {
    value: colorsExperimental.blackAlpha[9],
  },
  'color-backdrop-bg': {
    value: colorsExperimental.blackAlpha[14],
  },
  'color-avatar-bg-fill': {
    value: colorsExperimental.gray[11],
  },
  'color-avatar-one-bg-fill': {
    value: colorsExperimental.magenta[7],
  },
  'color-avatar-two-bg-fill': {
    value: colorsExperimental.green[7],
  },
  'color-avatar-three-bg-fill': {
    value: colorsExperimental.cyan[7],
  },
  'color-avatar-four-bg-fill': {
    value: colorsExperimental.azure[7],
  },
  'color-avatar-five-bg-fill': {
    value: colorsExperimental.rose[7],
  },
  'color-text-secondary': {
    value: colorsExperimental.gray[13],
  },
  'color-text-emphasis': {
    value: colorsExperimental.blue[13],
  },
  'color-text-emphasis-hover': {
    value: colorsExperimental.blue[14],
  },
  'color-text-emphasis-active': {
    value: colorsExperimental.blue[15],
  },
  'color-text-brand': {
    value: colorsExperimental.gray[14],
  },
  'color-text-brand-hover': {
    value: colorsExperimental.gray[15],
  },
  'color-text-info-on-bg-fill': {
    value: colorsExperimental.azure[16],
  },
  'color-text-inverse-secondary': {
    value: colorsExperimental.gray[11],
  },
  'color-avatar-text-on-bg-fill': {
    value: colorsExperimental.gray[1],
  },
  'color-avatar-one-text-on-bg-fill': {
    value: colorsExperimental.magenta[14],
  },
  'color-avatar-two-text-on-bg-fill': {
    value: colorsExperimental.green[14],
  },
  'color-avatar-three-text-on-bg-fill': {
    value: colorsExperimental.cyan[14],
  },
  'color-avatar-four-text-on-bg-fill': {
    value: colorsExperimental.azure[14],
  },
  'color-avatar-five-text-on-bg-fill': {
    value: colorsExperimental.rose[14],
  },
  'color-icon-secondary': {
    value: colorsExperimental.gray[12],
  },
  'color-icon-emphasis': {
    value: colorsExperimental.blue[13],
  },
  'color-icon-emphasis-hover': {
    value: colorsExperimental.blue[14],
  },
  'color-icon-emphasis-active': {
    value: colorsExperimental.blue[15],
  },
  'color-icon-brand': {
    value: colorsExperimental.gray[16],
  },
  'color-border-secondary': {
    value: colorsExperimental.gray[7],
  },
  'color-input-border': {
    value: colorsExperimental.gray[12],
  },
  'color-input-border-hover': {
    value: colorsExperimental.gray[13],
  },
  'color-input-border-active': {
    value: colorsExperimental.gray[16],
  },
  'color-border-emphasis-hover': {
    value: colorsExperimental.blue[14],
  },
  'color-border-emphasis-active': {
    value: colorsExperimental.blue[15],
  },
  'color-border-focus': {
    value: colorsExperimental.blue[13],
  },
  'color-border-brand': {
    value: colorsExperimental.gray[8],
  },
  'color-border-critical-secondary': {
    value: colorsExperimental.red[14],
  },
  'color-border-magic-secondary': {
    value: colorsExperimental.purple[12],
  },
  'color-bg-inverse': {
    value: colorsExperimental.gray[16],
  },
  'color-bg-inset-strong': {
    value: colorsExperimental.gray[15],
  },
  'color-bg-inverse-hover': {
    value: colorsExperimental.gray[14],
  },
  'color-bg-inverse-active': {
    value: colorsExperimental.gray[13],
  },
  'color-bg-strong-hover': {
    value: colorsExperimental.gray[9],
  },
  'color-bg-strong-active': {
    value: colorsExperimental.gray[10],
  },
  'color-bg-strong': {
    value: colorsExperimental.gray[8],
  },
  'color-bg-subdued-active': {
    value: colorsExperimental.gray[7],
  },
  'color-bg-disabled': {
    value: colorsExperimental.gray[7],
  },
  'color-bg-interactive-disabled': {
    value: colorsExperimental.gray[7],
  },
  'color-bg-app': {
    value: colorsExperimental.gray[6],
  },
  'color-bg-app-hover': {
    value: colorsExperimental.gray[2],
  },
  'color-bg-app-selected': {
    value: colorsExperimental.gray[3],
  },
  'color-bg-active': {
    value: colorsExperimental.gray[4],
  },
  'color-bg-subdued-hover': {
    value: colorsExperimental.gray[6],
  },
  'color-bg-inset': {
    value: colorsExperimental.gray[6],
  },
  'color-bg-hover': {
    value: colorsExperimental.gray[3],
  },
  'color-bg-subdued': {
    value: colorsExperimental.gray[4],
  },
  'color-bg-input': {
    value: colorsExperimental.gray[1],
  },
  'color-bg': {
    value: colorsExperimental.gray[1],
  },
  'color-bg-primary-active': {
    value: colorsExperimental.gray[16],
  },
  'color-bg-primary-hover': {
    value: colorsExperimental.gray[16],
  },
  'color-bg-primary': {
    value: colorsExperimental.gray[15],
  },
  'color-bg-success-strong': {
    value: colorsExperimental.green[12],
  },
  'color-bg-success': {
    value: colorsExperimental.green[3],
  },
  'color-bg-primary-subdued-active': {
    value: colorsExperimental.gray[6],
  },
  'color-bg-success-subdued': {
    value: colorsExperimental.green[3],
  },
  'color-bg-primary-subdued-hover': {
    value: colorsExperimental.gray[7],
  },
  'color-bg-success-subdued-hover': {
    value: colorsExperimental.green[5],
  },
  'color-bg-primary-subdued': {
    value: colorsExperimental.gray[8],
  },
  'color-bg-primary-subdued-selected': {
    value: colorsExperimental.gray[6],
  },
  'color-bg-critical-strong-active': {
    value: colorsExperimental.red[14],
  },
  'color-bg-critical-strong-hover': {
    value: colorsExperimental.red[13],
  },
  'color-bg-critical-strong': {
    value: colorsExperimental.red[12],
  },
  'color-bg-critical-subdued-active': {
    value: colorsExperimental.red[6],
  },
  'color-bg-critical': {
    value: colorsExperimental.red[6],
  },
  'color-bg-critical-subdued': {
    value: colorsExperimental.red[4],
  },
  'color-bg-critical-subdued-hover': {
    value: colorsExperimental.red[5],
  },
  'color-bg-caution-strong': {
    value: colorsExperimental.yellow[6],
  },
  'color-bg-caution': {
    value: colorsExperimental.yellow[4],
  },
  'color-bg-caution-subdued-active': {
    value: colorsExperimental.yellow[4],
  },
  'color-bg-caution-subdued': {
    value: colorsExperimental.yellow[2],
  },
  'color-bg-caution-subdued-hover': {
    value: colorsExperimental.yellow[3],
  },
  'color-bg-info-strong': {
    value: colorsExperimental.azure[9],
  },
  'color-bg-info-subdued-active': {
    value: colorsExperimental.azure[6],
  },
  'color-bg-info': {
    value: colorsExperimental.azure[4],
  },
  'color-bg-info-subdued': {
    value: colorsExperimental.azure[3],
  },
  'color-bg-info-subdued-hover': {
    value: colorsExperimental.azure[4],
  },
  'color-bg-interactive-active': {
    value: colorsExperimental.gray[14],
  },
  'color-bg-interactive-hover': {
    value: colorsExperimental.gray[15],
  },
  'color-bg-interactive': {
    value: colorsExperimental.gray[16],
  },
  'color-bg-interactive-subdued-active': {
    value: colorsExperimental.gray[6],
  },
  'color-bg-interactive-subdued-hover': {
    value: colorsExperimental.gray[7],
  },
  'color-bg-interactive-subdued': {
    value: colorsExperimental.gray[8],
  },
  'color-bg-interactive-selected': {
    value: colorsExperimental.gray[6],
  },
  'color-bg-warning': {
    value: colorsExperimental.orange[7],
  },
  'color-bg-magic-strong': {
    value: colorsExperimental.purple[12],
  },
  'color-bg-magic-hover': {
    value: colorsExperimental.purple[7],
  },
  'color-bg-magic-active': {
    value: colorsExperimental.purple[8],
  },
  'color-bg-magic': {
    value: colorsExperimental.purple[6],
  },
  'color-bg-magic-subdued-hover': {
    value: colorsExperimental.purple[4],
  },
  'color-bg-magic-subdued-active': {
    value: colorsExperimental.purple[6],
  },
  'color-bg-magic-subdued': {
    value: colorsExperimental.purple[3],
  },
  'color-border-input-hover': {
    value: colorsExperimental.gray[13],
  },
  'color-border-inverse': {
    value: colorsExperimental.gray[13],
  },
  'color-border-strong-hover': {
    value: colorsExperimental.gray[11],
  },
  'color-border-input': {
    value: colorsExperimental.gray[12],
  },
  'color-border-hover': {
    value: colorsExperimental.gray[10],
  },
  'color-border-strong': {
    value: colorsExperimental.gray[10],
  },
  'color-border': {
    value: colorsExperimental.gray[8],
  },
  'color-border-disabled': {
    value: colorsExperimental.gray[7],
  },
  'color-border-subdued': {
    value: colorsExperimental.gray[7],
  },
  'color-border-interactive-disabled': {
    value: colorsExperimental.gray[7],
  },
  'color-border-primary': {
    value: colorsExperimental.gray[8],
  },
  'color-border-success': {
    value: colorsExperimental.green[5],
  },
  'color-border-success-subdued': {
    value: colorsExperimental.green[5],
  },
  'color-border-critical-active': {
    value: colorsExperimental.red[11],
  },
  'color-border-critical-hover': {
    value: colorsExperimental.red[10],
  },
  'color-border-critical': {
    value: colorsExperimental.red[9],
  },
  'color-border-critical-subdued': {
    value: colorsExperimental.red[9],
  },
  'color-border-caution': {
    value: colorsExperimental.yellow[5],
  },
  'color-border-caution-subdued': {
    value: colorsExperimental.yellow[5],
  },
  'color-border-info': {
    value: colorsExperimental.azure[9],
  },
  'color-border-info-subdued': {
    value: colorsExperimental.azure[9],
  },
  'color-border-interactive-active': {
    value: colorsExperimental.blue[15],
  },
  'color-border-interactive-hover': {
    value: colorsExperimental.blue[14],
  },
  'color-border-interactive': {
    value: colorsExperimental.blue[13],
  },
  'color-border-interactive-focus': {
    value: colorsExperimental.blue[13],
  },
  'color-border-interactive-subdued': {
    value: colorsExperimental.blue[13],
  },
  'color-border-magic-strong': {
    value: colorsExperimental.purple[12],
  },
  'color-border-magic': {
    value: colorsExperimental.purple[10],
  },
  'color-icon-hover': {
    value: colorsExperimental.gray[15],
  },
  'color-icon': {
    value: colorsExperimental.gray[14],
  },
  'color-icon-subdued': {
    value: colorsExperimental.gray[12],
  },
  'color-icon-disabled': {
    value: colorsExperimental.gray[10],
  },
  'color-icon-interactive-disabled': {
    value: colorsExperimental.gray[10],
  },
  'color-icon-inverse': {
    value: colorsExperimental.gray[8],
  },
  'color-icon-on-color': {
    value: colorsExperimental.gray[1],
  },
  'color-icon-primary': {
    value: colorsExperimental.gray[16],
  },
  'color-icon-success': {
    value: colorsExperimental.green[12],
  },
  'color-icon-critical': {
    value: colorsExperimental.red[11],
  },
  'color-icon-caution': {
    value: colorsExperimental.yellow[11],
  },
  'color-icon-info': {
    value: colorsExperimental.azure[11],
  },
  'color-icon-warning': {
    value: colorsExperimental.orange[11],
  },
  'color-icon-interactive-active': {
    value: colorsExperimental.blue[15],
  },
  'color-icon-interactive-hover': {
    value: colorsExperimental.blue[14],
  },
  'color-icon-interactive': {
    value: colorsExperimental.blue[13],
  },
  'color-icon-interactive-inverse': {
    value: colorsExperimental.blue[8],
  },
  'color-icon-magic': {
    value: colorsExperimental.purple[13],
  },
  'color-text': {
    value: colorsExperimental.gray[15],
  },
  'color-text-subdued': {
    value: colorsExperimental.gray[13],
  },
  'color-text-disabled': {
    value: colorsExperimental.gray[11],
  },
  'color-text-interactive-disabled': {
    value: colorsExperimental.gray[10],
  },
  'color-text-inverse-subdued': {
    value: colorsExperimental.gray[10],
  },
  'color-text-inverse': {
    value: colorsExperimental.gray[8],
  },
  'color-text-on-color': {
    value: colorsExperimental.gray[1],
  },
  'color-text-success-strong': {
    value: colorsExperimental.green[15],
  },
  'color-text-success': {
    value: colorsExperimental.green[15],
  },
  'color-text-primary': {
    value: colorsExperimental.gray[14],
  },
  'color-text-primary-hover': {
    value: colorsExperimental.gray[14],
  },
  'color-text-critical-strong': {
    value: colorsExperimental.red[14],
  },
  'color-text-critical-active': {
    value: colorsExperimental.red[16],
  },
  'color-text-critical': {
    value: colorsExperimental.red[14],
  },
  'color-text-caution-strong': {
    value: colorsExperimental.yellow[15],
  },
  'color-text-caution': {
    value: colorsExperimental.yellow[15],
  },
  'color-text-info-strong': {
    value: colorsExperimental.azure[16],
  },
  'color-text-info': {
    value: colorsExperimental.azure[14],
  },
  'color-text-warning-strong': {
    value: colorsExperimental.orange[16],
  },
  'color-text-interactive-active': {
    value: colorsExperimental.blue[15],
  },
  'color-text-interactive-hover': {
    value: colorsExperimental.blue[14],
  },
  'color-text-interactive': {
    value: colorsExperimental.blue[13],
  },
  'color-text-interactive-inverse': {
    value: colorsExperimental.blue[8],
  },
  'color-text-magic-strong': {
    value: colorsExperimental.purple[15],
  },
  'color-text-magic': {
    value: colorsExperimental.purple[14],
  },
  // ------------------------------
  // Net new tokens
  // ------------------------------
  'color-border-inverse-active': {
    value: colorsExperimental.gray[8],
  },
  'color-border-inverse-hover': {
    value: colorsExperimental.gray[10],
  },
  'color-border-warning': {
    value: colorsExperimental.orange[8],
  },
  'color-checkbox-icon-disabled': {
    value: colorsExperimental.gray[1],
  },
  'color-checkbox-bg-surface-disabled': {
    value: colorsExperimental.blackAlpha[7],
  },
  'color-bg-fill-active': {
    value: colorsExperimental.gray[4],
  },
  'color-bg-fill-brand-selected': {
    value: colorsExperimental.gray[15],
  },
  'color-bg-fill-caution-active': {
    value: colorsExperimental.yellow[9],
  },
  'color-bg-fill-caution-hover': {
    value: colorsExperimental.yellow[8],
  },
  'color-bg-fill-critical-selected': {
    value: colorsExperimental.red[14],
  },
  'color-bg-fill-emphasis-active': {
    value: colorsExperimental.blue[15],
  },
  'color-bg-fill-emphasis-hover': {
    value: colorsExperimental.blue[14],
  },
  'color-bg-fill-emphasis': {
    value: colorsExperimental.blue[13],
  },
  'color-bg-fill-hover': {
    value: colorsExperimental.gray[3],
  },
  'color-bg-fill-info-active': {
    value: colorsExperimental.azure[11],
  },
  'color-bg-fill-info-hover': {
    value: colorsExperimental.azure[10],
  },
  'color-bg-fill-secondary-active': {
    value: colorsExperimental.gray[8],
  },
  'color-bg-fill-secondary-hover': {
    value: colorsExperimental.gray[7],
  },
  'color-bg-fill-selected': {
    value: colorsExperimental.gray[10],
  },
  'color-bg-fill-transparent-secondary-active': {
    value: colorsExperimental.blackAlpha[8],
  },
  'color-bg-fill-transparent-secondary-hover': {
    value: colorsExperimental.blackAlpha[7],
  },
  'color-bg-fill-transparent-selected': {
    value: colorsExperimental.blackAlpha[6],
  },
  'color-bg-fill-transparent': {
    value: colorsExperimental.blackAlpha[1],
  },
  'color-bg-fill-warning-active': {
    value: colorsExperimental.orange[11],
  },
  'color-bg-fill-warning-hover': {
    value: colorsExperimental.orange[10],
  },
  'color-bg-fill': {
    value: colorsExperimental.gray[1],
  },
  'color-icon-secondary-active': {
    value: colorsExperimental.gray[14],
  },
  'color-icon-secondary-hover': {
    value: colorsExperimental.gray[13],
  },
  'color-text-link-active': {
    value: colorsExperimental.blue[15],
  },
  'color-text-link-hover': {
    value: colorsExperimental.blue[14],
  },
  'color-text-link': {
    value: colorsExperimental.blue[13],
  },
  'color-nav-bg': {
    value: colorsExperimental.gray[7],
  },
  'color-nav-bg-surface-active': {
    value: colorsExperimental.gray[3],
  },
  'color-nav-bg-surface-hover': {
    value: colorsExperimental.gray[6],
  },
  'color-nav-bg-surface-selected': {
    value: colorsExperimental.gray[3],
  },
  'color-nav-bg-surface': {
    value: colorsExperimental.blackAlpha[3],
  },
  'color-radio-button-icon-disabled': {
    value: colorsExperimental.gray[1],
  },
  'color-radio-button-bg-surface-disabled': {
    value: colorsExperimental.blackAlpha[7],
  },
  'color-bg-surface-emphasis-active': {
    value: colorsExperimental.blue[5],
  },
  'color-bg-surface-emphasis-hover': {
    value: colorsExperimental.blue[4],
  },
  'color-bg-surface-emphasis': {
    value: colorsExperimental.blue[3],
  },
  'color-bg-surface-inverse': {
    value: colorsExperimental.gray[15],
  },
  'color-bg-surface-magic-active': {
    value: colorsExperimental.purple[6],
  },
  'color-bg-surface-secondary-selected': {
    value: colorsExperimental.gray[7],
  },
  'color-bg-surface-tertiary-active': {
    value: colorsExperimental.gray[8],
  },
  'color-bg-surface-tertiary-hover': {
    value: colorsExperimental.gray[7],
  },
  'color-bg-surface-warning-active': {
    value: colorsExperimental.orange[5],
  },
  'color-bg-surface-warning-hover': {
    value: colorsExperimental.orange[4],
  },
  'color-text-brand-on-bg-fill-active': {
    value: colorsExperimental.gray[10],
  },
  'color-text-brand-on-bg-fill-disabled': {
    value: colorsExperimental.gray[1],
  },
  'color-text-brand-on-bg-fill-hover': {
    value: colorsExperimental.gray[8],
  },
  'color-text-brand-on-bg-fill': {
    value: colorsExperimental.gray[1],
  },
  'color-text-caution-active': {
    value: colorsExperimental.yellow[16],
  },
  'color-text-caution-hover': {
    value: colorsExperimental.yellow[15],
  },
  'color-text-caution-on-bg-fill': {
    value: colorsExperimental.yellow[15],
  },
  'color-text-critical-on-bg-fill': {
    value: colorsExperimental.red[1],
  },
  'color-text-emphasis-on-bg-fill-active': {
    value: colorsExperimental.blue[7],
  },
  'color-text-emphasis-on-bg-fill-hover': {
    value: colorsExperimental.blue[5],
  },
  'color-text-emphasis-on-bg-fill': {
    value: colorsExperimental.blue[1],
  },
  'color-text-info-active': {
    value: colorsExperimental.azure[16],
  },
  'color-text-info-hover': {
    value: colorsExperimental.azure[15],
  },
  'color-text-magic-on-bg-fill': {
    value: colorsExperimental.purple[1],
  },
  'color-text-success-active': {
    value: colorsExperimental.green[16],
  },
  'color-text-success-hover': {
    value: colorsExperimental.green[15],
  },
  'color-text-success-on-bg-fill': {
    value: colorsExperimental.green[1],
  },
  'color-text-warning-active': {
    value: colorsExperimental.orange[16],
  },
  'color-text-warning-hover': {
    value: colorsExperimental.orange[15],
  },
  'color-text-warning-on-bg-fill': {
    value: colorsExperimental.orange[16],
  },
  'color-video-thumbnail-play-button-bg-fill-hover': {
    value: colorsExperimental.blackAlpha[15],
  },
  'color-video-thumbnail-play-button-bg-fill': {
    value: colorsExperimental.blackAlpha[14],
  },
  'color-video-thumbnail-play-button-text-on-bg-fill': {
    value: colorsExperimental.gray[1],
  },
  'color-bg-surface-hover': {
    value: colorsExperimental.gray[4],
  },
  'color-bg-surface-active': {
    value: colorsExperimental.gray[5],
  },
  'color-bg-surface-disabled': {
    value: colorsExperimental.blackAlpha[5],
  },
  'color-bg-fill-brand': {
    value: colorsExperimental.gray[15],
  },
  'color-bg-fill-brand-hover': {
    value: colorsExperimental.gray[16],
  },
  'color-bg-fill-brand-active': {
    value: colorsExperimental.gray[16],
  },
  'color-bg-surface-brand': {
    value: colorsExperimental.gray[8],
  },
  'color-bg-surface-brand-hover': {
    value: colorsExperimental.gray[7],
  },
  'color-bg-surface-brand-active': {
    value: colorsExperimental.gray[6],
  },
  'color-bg-surface-brand-selected': {
    value: colorsExperimental.gray[6],
  },
  'color-bg-surface-magic': {
    value: colorsExperimental.purple[3],
  },
  'color-text-critical-hover': {
    value: colorsExperimental.red[15],
  },
  'color-text-warning': {
    value: colorsExperimental.orange[14],
  },
  'color-text-link-inverse': {
    value: colorsExperimental.blue[8],
  },
  'color-border-tertiary': {
    value: colorsExperimental.gray[10],
  },
  'color-border-emphasis': {
    value: colorsExperimental.blue[13],
  },
  'color-bg-app-active': {
    value: colors.gray[400],
    description: '',
  },
  'color-bg-success-subdued-active': {
    value: colors.green[200],
    description: '',
  },
  'color-icon-active': {
    value: colors.gray[900],
    description: '',
  },
  // Experimental tokens
  'color-bg-backdrop-experimental': {
    value: colorsExperimental.blackAlpha[14],
    description: '',
  },
  'color-bg-primary-disabled-experimental': {
    value: colorsExperimental.gray[9],
    description: '',
  },
  'color-bg-secondary-experimental': {
    value: colorsExperimental.gray[5],
    description: '',
  },
  'color-bg-input-hover-experimental': {
    value: colorsExperimental.gray[3],
    description: '',
  },
  'color-border-input-active-experimental': {
    value: colorsExperimental.gray[16],
  },
  'color-border-critical-strong-experimental': {
    value: colorsExperimental.red[14],
  },
  'color-bg-input-active-experimental': {
    value: colorsExperimental.gray[4],
    description: '',
  },
  'color-bg-transparent-experimental': {
    value: colorsExperimental.blackAlpha[1],
    description: '',
  },
  'color-bg-transparent-subdued-experimental': {
    value: colorsExperimental.blackAlpha[6],
    description: '',
  },
  'color-bg-transparent-hover-experimental': {
    value: colorsExperimental.blackAlpha[5],
    description: '',
  },
  'color-bg-transparent-active-experimental': {
    value: colorsExperimental.blackAlpha[6],
    description: '',
  },
  'color-bg-transparent-disabled-experimental': {
    value: colorsExperimental.blackAlpha[5],
    description: '',
  },
  'color-bg-transparent-secondary-disabled-experimental': {
    value: colorsExperimental.blackAlpha[7],
    description: '',
  },
  'color-bg-transparent-primary-disabled-experimental': {
    value: colorsExperimental.blackAlpha[9],
    description: '',
  },
  'color-bg-transparent-primary-experimental': {
    value: colorsExperimental.blackAlpha[13],
    description: '',
  },
  'color-bg-success-strong-hover-experimental': {
    value: colorsExperimental.green[13],
    description: '',
  },
  'color-bg-success-strong-active-experimental': {
    value: colorsExperimental.green[14],
    description: '',
  },
  'color-bg-warning-subdued-experimental': {
    value: colorsExperimental.orange[3],
    description: '',
  },
  'color-bg-warning-strong-experimental': {
    value: colorsExperimental.orange[9],
    description: '',
  },
  'color-text-warning-experimental': {
    value: colorsExperimental.orange[15],
    description: '',
  },
  'color-text-critical-hover-experimental': {
    value: colorsExperimental.red[15],
    description: '',
  },
  'color-icon-info-strong-experimental': {
    value: colorsExperimental.azure[14],
    description: '',
  },
  'color-icon-warning-strong-experimental': {
    value: colorsExperimental.orange[13],
    description: '',
  },
  'color-icon-success-strong-experimental': {
    value: colorsExperimental.green[14],
    description: '',
  },
  'color-icon-critical-strong-experimental': {
    value: colorsExperimental.red[14],
    description: '',
  },
  'color-icon-critical-strong-hover-experimental': {
    value: colorsExperimental.red[15],
    description: '',
  },
  'color-icon-critical-strong-active-experimental': {
    value: colorsExperimental.red[16],
    description: '',
  },
  'color-avatar-background-experimental': {
    value: colorsExperimental.gray[11],
    description: '',
  },
  'color-avatar-color-experimental': {
    value: colorsExperimental.gray[1],
    description: '',
  },
  'color-avatar-style-one-background-experimental': {
    value: colorsExperimental.magenta[7],
    description: '',
  },
  'color-avatar-style-one-color-experimental': {
    value: colorsExperimental.magenta[14],
    description: '',
  },
  'color-avatar-style-two-background-experimental': {
    value: colorsExperimental.green[7],
    description: '',
  },
  'color-avatar-style-two-color-experimental': {
    value: colorsExperimental.green[14],
    description: '',
  },
  'color-avatar-style-three-background-experimental': {
    value: colorsExperimental.cyan[7],
    description: '',
  },
  'color-avatar-style-three-color-experimental': {
    value: colorsExperimental.cyan[14],
    description: '',
  },
  'color-avatar-style-four-background-experimental': {
    value: colorsExperimental.azure[7],
    description: '',
  },
  'color-avatar-style-four-color-experimental': {
    value: colorsExperimental.azure[14],
    description: '',
  },
  'color-avatar-style-five-background-experimental': {
    value: colorsExperimental.rose[7],
    description: '',
  },
  'color-avatar-style-five-color-experimental': {
    value: colorsExperimental.rose[14],
    description: '',
  },
};
