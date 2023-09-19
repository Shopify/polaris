import type {Experimental} from '../../types';
import type {MetaTokenProperties} from '../types';
import * as colors from '../../colors';
import * as colorsExperimental from '../../colors-experimental';
import {createVar as createVarName} from '../../utilities';

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
  /** Specialty and component backgrounds. */
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
  /** Specialty and component borders. */
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
  /** Check on emphasis state icons. */
  | 'icon-emphasis-hover'
  | 'icon-emphasis-active'
  /** Specialty and component icons. */
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
  // ------------------------------
  // Net new tokens
  // ------------------------------
  'color-border-inverse-active': {value: colorsExperimental.gray[8]},
  'color-border-inverse-hover': {value: colorsExperimental.gray[10]},
  'color-border-warning': {value: colorsExperimental.orange[8]},
  'color-checkbox-icon-disabled': {value: colorsExperimental.gray[1]},
  'color-checkbox-bg-surface-disabled': {
    value: colorsExperimental.blackAlpha[7],
  },
  'color-bg-fill-active': {value: colorsExperimental.gray[4]},
  'color-bg-fill-brand-selected': {value: colorsExperimental.gray[15]},
  'color-bg-fill-caution-active': {value: colorsExperimental.yellow[9]},
  'color-bg-fill-caution-hover': {value: colorsExperimental.yellow[8]},
  'color-bg-fill-critical-selected': {value: colorsExperimental.red[14]},
  'color-bg-fill-emphasis-active': {value: colorsExperimental.blue[15]},
  'color-bg-fill-emphasis-hover': {value: colorsExperimental.blue[14]},
  'color-bg-fill-emphasis': {value: colorsExperimental.blue[13]},
  'color-bg-fill-hover': {value: colorsExperimental.gray[3]},
  'color-bg-fill-info-active': {value: colorsExperimental.azure[11]},
  'color-bg-fill-info-hover': {value: colorsExperimental.azure[10]},
  'color-bg-fill-secondary-active': {value: colorsExperimental.gray[8]},
  'color-bg-fill-secondary-hover': {value: colorsExperimental.gray[7]},
  'color-bg-fill-selected': {value: colorsExperimental.gray[10]},
  'color-bg-fill-transparent-secondary-active': {
    value: colorsExperimental.blackAlpha[8],
  },
  'color-bg-fill-transparent-secondary-hover': {
    value: colorsExperimental.blackAlpha[7],
  },
  'color-bg-fill-transparent-selected': {
    value: colorsExperimental.blackAlpha[6],
  },
  'color-bg-fill-transparent': {value: colorsExperimental.blackAlpha[1]},
  'color-bg-fill-warning-active': {value: colorsExperimental.orange[11]},
  'color-bg-fill-warning-hover': {value: colorsExperimental.orange[10]},
  'color-bg-fill': {value: colorsExperimental.gray[1]},
  'color-icon-secondary-active': {value: colorsExperimental.gray[14]},
  'color-icon-secondary-hover': {value: colorsExperimental.gray[13]},
  'color-text-link-active': {value: colorsExperimental.blue[15]},
  'color-text-link-hover': {value: colorsExperimental.blue[14]},
  'color-text-link': {value: colorsExperimental.blue[13]},
  'color-nav-bg': {value: colorsExperimental.gray[7]},
  'color-nav-bg-surface-active': {value: colorsExperimental.gray[3]},
  'color-nav-bg-surface-hover': {value: colorsExperimental.gray[6]},
  'color-nav-bg-surface-selected': {value: colorsExperimental.gray[3]},
  'color-nav-bg-surface': {value: colorsExperimental.blackAlpha[3]},
  'color-radio-button-icon-disabled': {value: colorsExperimental.gray[1]},
  'color-radio-button-bg-surface-disabled': {
    value: colorsExperimental.blackAlpha[7],
  },
  'color-bg-surface-emphasis-active': {value: colorsExperimental.blue[5]},
  'color-bg-surface-emphasis-hover': {value: colorsExperimental.blue[4]},
  'color-bg-surface-emphasis': {value: colorsExperimental.blue[3]},
  'color-bg-surface-inverse': {value: colorsExperimental.gray[15]},
  'color-bg-surface-magic-active': {value: colorsExperimental.purple[6]},
  'color-bg-surface-secondary-selected': {value: colorsExperimental.gray[7]},
  'color-bg-surface-tertiary-active': {value: colorsExperimental.gray[8]},
  'color-bg-surface-tertiary-hover': {value: colorsExperimental.gray[7]},
  'color-bg-surface-warning-active': {value: colorsExperimental.orange[5]},
  'color-bg-surface-warning-hover': {value: colorsExperimental.orange[4]},
  'color-text-brand-on-bg-fill-active': {value: colorsExperimental.gray[10]},
  'color-text-brand-on-bg-fill-disabled': {value: colorsExperimental.gray[1]},
  'color-text-brand-on-bg-fill-hover': {value: colorsExperimental.gray[8]},
  'color-text-brand-on-bg-fill': {value: colorsExperimental.gray[1]},
  'color-text-caution-active': {value: colorsExperimental.yellow[16]},
  'color-text-caution-hover': {value: colorsExperimental.yellow[15]},
  'color-text-caution-on-bg-fill': {value: colorsExperimental.yellow[15]},
  'color-text-critical-on-bg-fill': {value: colorsExperimental.red[1]},
  'color-text-emphasis-on-bg-fill-active': {value: colorsExperimental.blue[7]},
  'color-text-emphasis-on-bg-fill-hover': {value: colorsExperimental.blue[5]},
  'color-text-emphasis-on-bg-fill': {value: colorsExperimental.blue[1]},
  'color-text-info-active': {value: colorsExperimental.azure[16]},
  'color-text-info-hover': {value: colorsExperimental.azure[15]},
  'color-text-magic-on-bg-fill': {value: colorsExperimental.purple[1]},
  'color-text-success-active': {value: colorsExperimental.green[16]},
  'color-text-success-hover': {value: colorsExperimental.green[15]},
  'color-text-success-on-bg-fill': {value: colorsExperimental.green[1]},
  'color-text-warning-active': {value: colorsExperimental.orange[16]},
  'color-text-warning-hover': {value: colorsExperimental.orange[15]},
  'color-text-warning-on-bg-fill': {value: colorsExperimental.orange[16]},
  'color-video-thumbnail-play-button-bg-fill-hover': {
    value: colorsExperimental.blackAlpha[15],
  },
  'color-video-thumbnail-play-button-bg-fill': {
    value: colorsExperimental.blackAlpha[14],
  },
  'color-video-thumbnail-play-button-text-on-bg-fill': {
    value: colorsExperimental.gray[1],
  },
  // ------------------------------
  // Net new tokens (overridden in light-uplift)
  // ------------------------------
  'color-bg-surface': {value: createVar('color-bg')},
  'color-bg-surface-hover': {value: colorsExperimental.gray[4]},
  'color-bg-surface-active': {value: colorsExperimental.gray[5]},
  'color-bg-surface-disabled': {value: colorsExperimental.blackAlpha[5]},
  'color-bg-surface-secondary': {value: createVar('color-bg-subdued')},
  'color-bg-surface-secondary-hover': {
    value: createVar('color-bg-subdued-hover'),
  },
  'color-bg-surface-secondary-active': {
    value: createVar('color-bg-subdued-active'),
  },
  'color-bg-surface-tertiary': {
    value: createVar('color-bg-secondary-experimental'),
  },
  'color-bg-fill-tertiary': {value: createVar('color-bg-strong')},
  'color-bg-fill-tertiary-hover': {value: createVar('color-bg-strong-hover')},
  'color-bg-fill-tertiary-active': {value: createVar('color-bg-strong-active')},
  'color-input-bg-surface': {value: createVar('color-bg-input')},
  'color-input-bg-surface-hover': {
    value: createVar('color-bg-input-hover-experimental'),
  },
  'color-input-bg-surface-active': {
    value: createVar('color-bg-input-active-experimental'),
  },
  'color-bg-fill-brand': {value: colorsExperimental.gray[15]},
  'color-bg-fill-brand-hover': {value: colorsExperimental.gray[16]},
  'color-bg-fill-brand-active': {value: colorsExperimental.gray[16]},
  'color-bg-surface-brand': {value: colorsExperimental.gray[8]},
  'color-bg-surface-brand-hover': {value: colorsExperimental.gray[7]},
  'color-bg-surface-brand-active': {value: colorsExperimental.gray[6]},
  'color-bg-surface-brand-selected': {value: colorsExperimental.gray[6]},
  'color-bg-surface-selected': {value: createVar('color-bg-app-selected')},
  'color-bg-fill-success': {value: createVar('color-bg-success-strong')},
  'color-bg-fill-success-hover': {
    value: createVar('color-bg-success-strong-hover-experimental'),
  },
  'color-bg-fill-success-active': {
    value: createVar('color-bg-success-strong-active-experimental'),
  },
  'color-bg-fill-success-secondary': {value: createVar('color-bg-success')},
  'color-bg-surface-success': {value: createVar('color-bg-success-subdued')},
  'color-bg-surface-success-hover': {
    value: createVar('color-bg-success-subdued-hover'),
  },
  'color-bg-surface-success-active': {
    value: createVar('color-bg-success-subdued-active'),
  },
  'color-bg-fill-critical': {value: createVar('color-bg-critical-strong')},
  'color-bg-fill-critical-hover': {
    value: createVar('color-bg-critical-strong-hover'),
  },
  'color-bg-fill-critical-active': {
    value: createVar('color-bg-critical-strong-active'),
  },
  'color-bg-fill-critical-secondary': {value: createVar('color-bg-critical')},
  'color-bg-surface-critical': {value: createVar('color-bg-critical-subdued')},
  'color-bg-surface-critical-hover': {
    value: createVar('color-bg-critical-subdued-hover'),
  },
  'color-bg-surface-critical-active': {
    value: createVar('color-bg-critical-subdued-active'),
  },
  'color-bg-fill-caution': {value: createVar('color-bg-caution-strong')},
  'color-bg-fill-caution-secondary': {value: createVar('color-bg-caution')},
  'color-bg-surface-caution': {value: createVar('color-bg-caution-subdued')},
  'color-bg-surface-caution-hover': {
    value: createVar('color-bg-caution-subdued-hover'),
  },
  'color-bg-surface-caution-active': {
    value: createVar('color-bg-caution-subdued-active'),
  },
  'color-bg-fill-info': {value: createVar('color-bg-info-strong')},
  'color-bg-fill-info-secondary': {value: createVar('color-bg-info')},
  'color-bg-surface-info': {value: createVar('color-bg-info-subdued')},
  'color-bg-surface-info-hover': {
    value: createVar('color-bg-info-subdued-hover'),
  },
  'color-bg-surface-info-active': {
    value: createVar('color-bg-info-subdued-active'),
  },
  'color-bg-fill-warning': {
    value: createVar('color-bg-warning-strong-experimental'),
  },
  'color-bg-fill-warning-secondary': {value: createVar('color-bg-warning')},
  'color-bg-surface-warning': {
    value: createVar('color-bg-warning-subdued-experimental'),
  },
  'color-bg-fill-magic': {value: createVar('color-bg-magic-strong')},
  'color-bg-fill-magic-secondary': {value: createVar('color-bg-magic')},
  'color-bg-fill-magic-secondary-hover': {
    value: createVar('color-bg-magic-hover'),
  },
  'color-bg-fill-magic-secondary-active': {
    value: createVar('color-bg-magic-active'),
  },
  'color-bg-surface-magic': {value: colorsExperimental.purple[3]},
  'color-bg-surface-magic-hover': {
    value: createVar('color-bg-magic-subdued-hover'),
  },
  'color-bg-fill-secondary': {value: createVar('color-bg-inset')},
  'color-bg-fill-inverse': {value: createVar('color-bg-inset-strong')},
  'color-bg-fill-inverse-hover': {value: createVar('color-bg-inverse-hover')},
  'color-bg-fill-inverse-active': {value: createVar('color-bg-inverse-active')},
  'color-bg-surface-transparent': {
    value: createVar('color-bg-transparent-experimental'),
  },
  'color-bg-fill-transparent-hover': {
    value: createVar('color-bg-transparent-hover-experimental'),
  },
  'color-bg-fill-transparent-active': {
    value: createVar('color-bg-transparent-active-experimental'),
  },
  'color-bg-fill-disabled': {
    value: createVar('color-bg-transparent-disabled-experimental'),
  },
  'color-bg-fill-transparent-secondary': {
    value: createVar('color-bg-transparent-subdued-experimental'),
  },
  'color-bg-fill-brand-disabled': {
    value: createVar('color-bg-transparent-primary-disabled-experimental'),
  },
  'color-backdrop-bg': {value: createVar('color-bg-backdrop-experimental')},
  'color-avatar-bg-fill': {
    value: createVar('color-avatar-background-experimental'),
  },
  'color-avatar-one-bg-fill': {
    value: createVar('color-avatar-style-one-background-experimental'),
  },
  'color-avatar-two-bg-fill': {
    value: createVar('color-avatar-style-two-background-experimental'),
  },
  'color-avatar-three-bg-fill': {
    value: createVar('color-avatar-style-three-background-experimental'),
  },
  'color-avatar-four-bg-fill': {
    value: createVar('color-avatar-style-four-background-experimental'),
  },
  'color-avatar-five-bg-fill': {
    value: createVar('color-avatar-style-five-background-experimental'),
  },
  'color-text-secondary': {value: createVar('color-text-subdued')},
  'color-text-emphasis': {value: createVar('color-text-interactive')},
  'color-text-emphasis-hover': {
    value: createVar('color-text-interactive-hover'),
  },
  'color-text-emphasis-active': {
    value: createVar('color-text-interactive-active'),
  },
  'color-text-brand': {value: createVar('color-text-primary')},
  'color-text-brand-hover': {value: createVar('color-text-primary-hover')},
  'color-text-critical-hover': {value: colorsExperimental.red[15]},
  'color-text-info-on-bg-fill': {value: createVar('color-text-info-strong')},
  'color-text-warning': {value: colorsExperimental.orange[14]},
  'color-text-inverse-secondary': {
    value: createVar('color-text-inverse-subdued'),
  },
  'color-text-link-inverse': {value: colorsExperimental.blue[8]},
  'color-avatar-text-on-bg-fill': {
    value: createVar('color-avatar-color-experimental'),
  },
  'color-avatar-one-text-on-bg-fill': {
    value: createVar('color-avatar-style-one-color-experimental'),
  },
  'color-avatar-two-text-on-bg-fill': {
    value: createVar('color-avatar-style-two-color-experimental'),
  },
  'color-avatar-three-text-on-bg-fill': {
    value: createVar('color-avatar-style-three-color-experimental'),
  },
  'color-avatar-four-text-on-bg-fill': {
    value: createVar('color-avatar-style-four-color-experimental'),
  },
  'color-avatar-five-text-on-bg-fill': {
    value: createVar('color-avatar-style-five-color-experimental'),
  },
  'color-icon-secondary': {value: createVar('color-icon-subdued')},
  'color-icon-emphasis': {value: createVar('color-icon-interactive')},
  'color-icon-emphasis-hover': {
    value: createVar('color-icon-interactive-hover'),
  },
  'color-icon-emphasis-active': {
    value: createVar('color-icon-interactive-active'),
  },
  'color-icon-brand': {value: createVar('color-icon-primary')},
  'color-border-secondary': {value: createVar('color-border-subdued')},
  'color-border-tertiary': {value: colorsExperimental.gray[10]},
  'color-input-border': {value: createVar('color-border-input')},
  'color-input-border-hover': {value: createVar('color-border-input-hover')},
  'color-input-border-active': {
    value: createVar('color-border-input-active-experimental'),
  },
  'color-border-emphasis': {value: colorsExperimental.blue[13]},
  'color-border-emphasis-hover': {
    value: createVar('color-border-interactive-hover'),
  },
  'color-border-emphasis-active': {
    value: createVar('color-border-interactive-active'),
  },
  'color-border-focus': {value: createVar('color-border-interactive-focus')},
  'color-border-brand': {value: createVar('color-border-primary')},
  'color-border-critical-secondary': {
    value: createVar('color-border-critical-strong-experimental'),
  },
  'color-border-magic-secondary': {
    value: createVar('color-border-magic-strong'),
  },
  // ------------------------------
  // Existing tokens
  // ------------------------------
  'color-bg-inverse': {
    value: colors.gray[900],
    description: '',
  },
  'color-bg-inset-strong': {
    value: colors.gray[800],
    description: '',
  },
  'color-bg-inverse-hover': {
    value: colors.gray[800],
    description: '',
  },
  'color-bg-inverse-active': {
    value: colors.gray[700],
    description: '',
  },
  'color-bg-strong-hover': {
    value: colors.gray[500],
    description: '',
  },
  'color-bg-strong-active': {
    value: colors.gray[500],
    description: '',
  },
  'color-bg-strong': {
    value: colors.gray[400],
    description: '',
  },
  'color-bg-subdued-active': {
    value: colors.gray[300],
    description: '',
  },
  'color-bg-disabled': {
    value: colors.gray[300],
    description: '',
  },
  'color-bg-interactive-disabled': {
    value: colors.gray[300],
    description: '',
  },
  'color-bg-app': {
    value: colors.gray[200],
    description: '',
  },
  'color-bg-app-active': {
    value: colors.gray[400],
    description: '',
  },
  'color-bg-app-hover': {
    value: colors.gray[300],
    description: '',
  },
  'color-bg-app-selected': {
    value: colors.gray[300],
    description: '',
  },
  'color-bg-active': {
    value: colors.gray[300],
    description: '',
  },
  'color-bg-subdued-hover': {
    value: colors.gray[200],
    description: '',
  },
  'color-bg-inset': {
    value: colors.gray[200],
    description: '',
  },
  'color-bg-hover': {
    value: colors.gray[200],
    description: '',
  },
  'color-bg-subdued': {
    value: colors.gray[100],
    description: '',
  },
  'color-bg-input': {
    value: colors.gray[50],
    description: '',
  },
  'color-bg': {
    value: colors.gray[50],
    description: '',
  },
  'color-bg-primary-active': {
    value: colors.green[900],
    description: '',
  },
  'color-bg-primary-hover': {
    value: colors.green[800],
    description: '',
  },
  'color-bg-primary': {
    value: colors.green[700],
    description: '',
  },
  'color-bg-success-strong': {
    value: colors.green[600],
    description: '',
  },
  'color-bg-success': {
    value: colors.green[300],
    description: '',
  },
  'color-bg-primary-subdued-active': {
    value: colors.green[200],
    description: '',
  },
  'color-bg-success-subdued-active': {
    value: colors.green[200],
    description: '',
  },
  'color-bg-success-subdued': {
    value: colors.green[100],
    description: '',
  },
  'color-bg-primary-subdued-hover': {
    value: colors.green[100],
    description: '',
  },
  'color-bg-success-subdued-hover': {
    value: colors.green[50],
    description: '',
  },
  'color-bg-primary-subdued': {
    value: colors.green[50],
    description: '',
  },
  'color-bg-primary-subdued-selected': {
    value: colors.green[50],
    description: '',
  },
  'color-bg-critical-strong-active': {
    value: colors.red[800],
    description: '',
  },
  'color-bg-critical-strong-hover': {
    value: colors.red[700],
    description: '',
  },
  'color-bg-critical-strong': {
    value: colors.red[600],
    description: '',
  },
  'color-bg-critical-subdued-active': {
    value: colors.red[200],
    description: '',
  },
  'color-bg-critical': {
    value: colors.red[200],
    description: '',
  },
  'color-bg-critical-subdued': {
    value: colors.red[100],
    description: '',
  },
  'color-bg-critical-subdued-hover': {
    value: colors.red[50],
    description: '',
  },
  'color-bg-caution-strong': {
    value: colors.yellow[600],
    description: '',
  },
  'color-bg-caution': {
    value: colors.yellow[300],
    description: '',
  },
  'color-bg-caution-subdued-active': {
    value: colors.yellow[200],
    description: '',
  },
  'color-bg-caution-subdued': {
    value: colors.yellow[100],
    description: '',
  },
  'color-bg-caution-subdued-hover': {
    value: colors.yellow[50],
    description: '',
  },
  'color-bg-info-strong': {
    value: colors.teal[600],
    description: '',
  },
  'color-bg-info-subdued-active': {
    value: colors.teal[200],
    description: '',
  },
  'color-bg-info': {
    value: colors.teal[200],
    description: '',
  },
  'color-bg-info-subdued': {
    value: colors.teal[100],
    description: '',
  },
  'color-bg-info-subdued-hover': {
    value: colors.teal[50],
    description: '',
  },
  'color-bg-interactive-active': {
    value: colors.blue[800],
    description: '',
  },
  'color-bg-interactive-hover': {
    value: colors.blue[700],
    description: '',
  },
  'color-bg-interactive': {
    value: colors.blue[600],
    description: '',
  },
  'color-bg-interactive-subdued-active': {
    value: colors.blue[200],
    description: '',
  },
  'color-bg-interactive-subdued-hover': {
    value: colors.blue[100],
    description: '',
  },
  'color-bg-interactive-subdued': {
    value: colors.blue[50],
    description: '',
  },
  'color-bg-interactive-selected': {
    value: colors.blue[50],
    description: '',
  },
  'color-bg-warning': {
    value: colors.orange[200],
    description: '',
  },
  'color-bg-magic-strong': {
    value: colors.purple[500],
    description: '',
  },
  'color-bg-magic-hover': {
    value: colors.purple[200],
    description: '',
  },
  'color-bg-magic-active': {
    value: colors.purple[300],
    description: '',
  },
  'color-bg-magic': {
    value: colors.purple[100],
    description: '',
  },
  'color-bg-magic-subdued-hover': {
    value: colors.purple[100],
    description: '',
  },
  'color-bg-magic-subdued-active': {
    value: colors.purple[200],
    description: '',
  },
  'color-bg-magic-subdued': {
    value: colors.purple[50],
    description: '',
  },
  'color-border-input-hover': {
    value: colors.gray[800],
    description: '',
  },
  'color-border-inverse': {
    value: colors.gray[800],
    description: '',
  },
  'color-border-strong-hover': {
    value: colors.gray[700],
    description: '',
  },
  'color-border-input': {
    value: colors.gray[600],
    description: '',
  },
  'color-border-hover': {
    value: colors.gray[600],
    description: '',
  },
  'color-border-strong': {
    value: colors.gray[600],
    description: '',
  },
  'color-border': {
    value: colors.gray[500],
    description: '',
  },
  'color-border-disabled': {
    value: colors.gray[400],
    description: '',
  },
  'color-border-subdued': {
    value: colors.gray[400],
    description: '',
  },
  'color-border-interactive-disabled': {
    value: colors.gray[400],
    description: '',
  },
  'color-border-primary': {
    value: colors.green[700],
    description: '',
  },
  'color-border-success': {
    value: colors.green[600],
    description: '',
  },
  'color-border-success-subdued': {
    value: colors.green[400],
    description: '',
  },
  'color-border-critical-active': {
    value: colors.red[900],
    description: '',
  },
  'color-border-critical-hover': {
    value: colors.red[800],
    description: '',
  },
  'color-border-critical': {
    value: colors.red[600],
    description: '',
  },
  'color-border-critical-subdued': {
    value: colors.red[400],
    description: '',
  },
  'color-border-caution': {
    value: colors.yellow[600],
    description: '',
  },
  'color-border-caution-subdued': {
    value: colors.yellow[400],
    description: '',
  },
  'color-border-info': {
    value: colors.teal[500],
    description: '',
  },
  'color-border-info-subdued': {
    value: colors.teal[400],
    description: '',
  },
  'color-border-interactive-active': {
    value: colors.blue[800],
    description: '',
  },
  'color-border-interactive-hover': {
    value: colors.blue[700],
    description: '',
  },
  'color-border-interactive': {
    value: colors.blue[500],
    description: '',
  },
  'color-border-interactive-focus': {
    value: colors.blue[500],
    description: '',
  },
  'color-border-interactive-subdued': {
    value: colors.blue[200],
    description: '',
  },
  'color-border-magic-strong': {
    value: colors.purple[500],
    description: '',
  },
  'color-border-magic': {
    value: colors.purple[400],
    description: '',
  },
  'color-icon-hover': {
    value: colors.gray[900],
    description: '',
  },
  'color-icon': {
    value: colors.gray[800],
    description: '',
  },
  'color-icon-active': {
    value: colors.gray[900],
    description: '',
  },
  'color-icon-subdued': {
    value: colors.gray[700],
    description: '',
  },
  'color-icon-disabled': {
    value: colors.gray[600],
    description: '',
  },
  'color-icon-interactive-disabled': {
    value: colors.gray[600],
    description: '',
  },
  'color-icon-inverse': {
    value: colors.gray[400],
    description: '',
  },
  'color-icon-on-color': {
    value: colors.gray[50],
    description: '',
  },
  'color-icon-primary': {
    value: colors.green[700],
    description: '',
  },
  'color-icon-success': {
    value: colors.green[600],
    description: '',
  },
  'color-icon-critical': {
    value: colors.red[600],
    description: '',
  },
  'color-icon-caution': {
    value: colors.yellow[700],
    description: '',
  },
  'color-icon-info': {
    value: colors.teal[600],
    description: '',
  },
  'color-icon-warning': {
    value: colors.orange[500],
    description: '',
  },
  'color-icon-interactive-active': {
    value: colors.blue[800],
    description: '',
  },
  'color-icon-interactive-hover': {
    value: colors.blue[700],
    description: '',
  },
  'color-icon-interactive': {
    value: colors.blue[600],
    description: '',
  },
  'color-icon-interactive-inverse': {
    value: colors.blue[400],
    description: '',
  },
  'color-icon-magic': {
    value: colors.purple[500],
    description: '',
  },
  'color-text': {
    value: colors.gray[900],
    description: '',
  },
  'color-text-subdued': {
    value: colors.gray[800],
    description: '',
  },
  'color-text-disabled': {
    value: colors.gray[700],
    description: '',
  },
  'color-text-interactive-disabled': {
    value: colors.gray[700],
    description: '',
  },
  'color-text-inverse-subdued': {
    value: colors.gray[600],
    description: '',
  },
  'color-text-inverse': {
    value: colors.gray[200],
    description: '',
  },
  'color-text-on-color': {
    value: colors.gray[50],
    description: '',
  },
  'color-text-success-strong': {
    value: colors.green[900],
    description: '',
  },
  'color-text-success': {
    value: colors.green[700],
    description: '',
  },
  'color-text-primary': {
    value: colors.green[700],
    description: '',
  },
  'color-text-primary-hover': {
    value: colors.green[800],
    description: '',
  },
  'color-text-critical-strong': {
    value: colors.red[900],
    description: '',
  },
  'color-text-critical-active': {
    value: colors.red[800],
    description: '',
  },
  'color-text-critical': {
    value: colors.red[600],
    description: '',
  },
  'color-text-caution-strong': {
    value: colors.yellow[900],
    description: '',
  },
  'color-text-caution': {
    value: colors.yellow[800],
    description: '',
  },
  'color-text-info-strong': {
    value: colors.teal[900],
    description: '',
  },
  'color-text-info': {
    value: colors.teal[700],
    description: '',
  },
  'color-text-warning-strong': {
    value: colors.orange[900],
    description: '',
  },
  'color-text-interactive-active': {
    value: colors.blue[800],
    description: '',
  },
  'color-text-interactive-hover': {
    value: colors.blue[700],
    description: '',
  },
  'color-text-interactive': {
    value: colors.blue[600],
    description: '',
  },
  'color-text-interactive-inverse': {
    value: colors.blue[400],
    description: '',
  },
  'color-text-magic-strong': {
    value: colors.purple[800],
    description: '',
  },
  'color-text-magic': {
    value: colors.purple[600],
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

function createVar(colorTokenName: ColorTokenName) {
  return `var(${createVarName(colorTokenName)})`;
}
