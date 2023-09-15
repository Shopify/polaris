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
  | ColorBackgroundAliasExperimental
  /**
   * Conceptual and component specific backgrounds.
   * TODO: Determine if we should create a separate
   * type alias (e.g. `ColorComponentBackgroundAlias`) and
   * union it here in `ColorBackgroundAlias`.
   */
  | 'nav-bg'
  | 'backdrop-bg';

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
  /**
   * Conceptual and component specific borders.
   * TODO: Determine if we should create a separate
   * type alias (e.g. `ColorComponentBorderAlias`) and
   * union it here in `ColorBorderAlias`.
   */
  | 'input-border'
  | 'input-border-hover'
  | 'input-border-active';

export type ColorFillAlias =
  | 'fill'
  | 'fill-hover'
  | 'fill-active'
  | 'fill-selected'
  | 'fill-disabled'
  | 'fill-secondary'
  | 'fill-secondary-hover'
  | 'fill-secondary-active'
  | 'fill-tertiary'
  | 'fill-tertiary-hover'
  | 'fill-tertiary-active'
  | 'fill-brand'
  | 'fill-brand-hover'
  | 'fill-brand-active'
  | 'fill-brand-selected'
  | 'fill-brand-disabled'
  | 'fill-emphasis'
  | 'fill-emphasis-hover'
  | 'fill-emphasis-active'
  | 'fill-success'
  | 'fill-success-hover'
  | 'fill-success-active'
  | 'fill-success-secondary'
  | 'fill-critical'
  | 'fill-critical-hover'
  | 'fill-critical-active'
  | 'fill-critical-selected'
  | 'fill-critical-secondary'
  | 'fill-caution'
  | 'fill-caution-hover'
  | 'fill-caution-active'
  | 'fill-caution-secondary'
  | 'fill-info'
  | 'fill-info-hover'
  | 'fill-info-active'
  | 'fill-info-secondary'
  | 'fill-warning'
  | 'fill-warning-hover'
  | 'fill-warning-active'
  | 'fill-warning-secondary'
  | 'fill-magic'
  | 'fill-magic-secondary'
  | 'fill-magic-secondary-hover'
  | 'fill-magic-secondary-active'
  | 'fill-inverse'
  | 'fill-inverse-hover'
  | 'fill-inverse-active'
  | 'fill-transparent'
  | 'fill-transparent-hover'
  | 'fill-transparent-active'
  | 'fill-transparent-selected'
  | 'fill-transparent-secondary'
  | 'fill-transparent-secondary-hover'
  | 'fill-transparent-secondary-active'
  /**
   * Conceptual and component specific fills.
   * TODO: Determine if we should create a separate
   * type alias (e.g. `ColorComponentFillAlias`) and
   * union it here in `ColorFillAlias`.
   */
  | 'avatar-fill'
  | 'avatar-one-fill'
  | 'avatar-two-fill'
  | 'avatar-three-fill'
  | 'avatar-four-fill'
  | 'avatar-five-fill'
  | 'video-thumbnail-play-button-fill'
  | 'video-thumbnail-play-button-fill-hover';

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
  /**
   * check on emphasis state icons
   */
  | 'icon-emphasis-hover'
  | 'icon-emphasis-active'
  | ColorIconAliasExperimental
  /**
   * Conceptual and component specific icons.
   * TODO: Determine if we should create a separate
   * type alias (e.g. `ColorComponentIconAlias`) and
   * union it here in `ColorIconAlias`.
   */
  | 'radio-button-icon-disabled'
  | 'checkbox-icon-disabled';

export type ColorLinkAlias =
  | 'link'
  | 'link-hover'
  | 'link-active'
  | 'link-inverse';

export type ColorSurfaceAlias =
  | 'surface'
  | 'surface-hover'
  | 'surface-active'
  | 'surface-selected'
  | 'surface-disabled'
  | 'surface-secondary'
  | 'surface-secondary-hover'
  | 'surface-secondary-active'
  | 'surface-secondary-selected'
  | 'surface-tertiary'
  | 'surface-tertiary-hover'
  | 'surface-tertiary-active'
  | 'surface-transparent'
  | 'surface-brand'
  | 'surface-brand-hover'
  | 'surface-brand-active'
  | 'surface-brand-selected'
  | 'surface-info'
  | 'surface-info-hover'
  | 'surface-info-active'
  | 'surface-success'
  | 'surface-success-hover'
  | 'surface-success-active'
  | 'surface-caution'
  | 'surface-caution-hover'
  | 'surface-caution-active'
  | 'surface-warning'
  | 'surface-warning-hover'
  | 'surface-warning-active'
  | 'surface-critical'
  | 'surface-critical-hover'
  | 'surface-critical-active'
  | 'surface-magic'
  | 'surface-magic-hover'
  | 'surface-magic-active'
  | 'surface-emphasis'
  | 'surface-emphasis-hover'
  | 'surface-emphasis-active'
  | 'surface-inverse'
  /**
   * Conceptual and component specific surfaces.
   * TODO: Determine if we should create a separate
   * type alias (e.g. `ColorComponentIconAlias`) and
   * union it here in `ColorSurfaceAlias`.
   */
  | 'input-surface'
  | 'input-surface-hover'
  | 'input-surface-active'
  | 'nav-surface'
  | 'nav-surface-hover'
  | 'nav-surface-active'
  | 'nav-surface-selected'
  | 'radio-button-surface-disabled'
  | 'checkbox-surface-disabled';

export type ColorTextAlias =
  | 'text'
  | 'text-caution'
  | 'text-caution-hover'
  | 'text-caution-active'
  | 'text-caution-on-fill'
  | 'text-caution-strong'
  | 'text-critical'
  | 'text-critical-hover'
  | 'text-critical-active'
  | 'text-critical-on-fill'
  | 'text-critical-strong'
  | 'text-disabled'
  | 'text-info'
  | 'text-info-hover'
  | 'text-info-active'
  | 'text-info-on-fill'
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
  | 'text-magic-on-fill'
  | 'text-magic-strong'
  | 'text-on-color'
  | 'text-primary'
  | 'text-primary-hover'
  | 'text-subdued'
  | 'text-success'
  | 'text-success-hover'
  | 'text-success-active'
  | 'text-success-on-fill'
  | 'text-success-strong'
  | 'text-warning-strong'
  | 'text-warning'
  | 'text-warning-hover'
  | 'text-warning-active'
  | 'text-warning-on-fill'
  | 'text-secondary'
  | 'text-brand'
  | 'text-brand-hover'
  | 'text-brand-on-fill'
  | 'text-brand-on-fill-hover'
  | 'text-brand-on-fill-active'
  | 'text-brand-on-fill-disabled'
  | 'text-emphasis'
  | 'text-emphasis-hover'
  | 'text-emphasis-active'
  | 'text-emphasis-on-fill'
  | 'text-emphasis-on-fill-hover'
  | 'text-emphasis-on-fill-active'
  /**
   * Conceptual and component specific surfaces.
   * TODO: Determine if we should create a separate
   * type alias (e.g. `ColorComponentIconAlias`) and
   * union it here in `ColorSurfaceAlias`.
   */
  | 'avatar-text-on-fill'
  | 'avatar-one-text-on-fill'
  | 'avatar-two-text-on-fill'
  | 'avatar-three-text-on-fill'
  | 'avatar-four-text-on-fill'
  | 'avatar-five-text-on-fill'
  | 'video-thumbnail-play-button-text-on-fill'
  | ColorTextAliasExperimental;

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
  | `color-${ColorFillAlias}`
  | `color-${ColorIconAlias}`
  | `color-${ColorLinkAlias}`
  | `color-${ColorSurfaceAlias}`
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
  'color-checkbox-surface-disabled': {value: colorsExperimental.blackAlpha[7]},
  'color-fill-active': {value: colorsExperimental.gray[4]},
  'color-fill-brand-selected': {value: colorsExperimental.gray[15]},
  'color-fill-caution-active': {value: colorsExperimental.yellow[9]},
  'color-fill-caution-hover': {value: colorsExperimental.yellow[8]},
  'color-fill-critical-selected': {value: colorsExperimental.red[14]},
  'color-fill-emphasis-active': {value: colorsExperimental.blue[15]},
  'color-fill-emphasis-hover': {value: colorsExperimental.blue[14]},
  'color-fill-emphasis': {value: colorsExperimental.blue[13]},
  'color-fill-hover': {value: colorsExperimental.gray[3]},
  'color-fill-info-active': {value: colorsExperimental.azure[11]},
  'color-fill-info-hover': {value: colorsExperimental.azure[10]},
  'color-fill-secondary-active': {value: colorsExperimental.gray[8]},
  'color-fill-secondary-hover': {value: colorsExperimental.gray[7]},
  'color-fill-selected': {value: colorsExperimental.gray[10]},
  'color-fill-transparent-secondary-active': {
    value: colorsExperimental.blackAlpha[8],
  },
  'color-fill-transparent-secondary-hover': {
    value: colorsExperimental.blackAlpha[7],
  },
  'color-fill-transparent-selected': {value: colorsExperimental.blackAlpha[6]},
  'color-fill-transparent': {value: colorsExperimental.blackAlpha[1]},
  'color-fill-warning-active': {value: colorsExperimental.orange[11]},
  'color-fill-warning-hover': {value: colorsExperimental.orange[10]},
  'color-fill': {value: colorsExperimental.gray[1]},
  'color-icon-secondary-active': {value: colorsExperimental.gray[14]},
  'color-icon-secondary-hover': {value: colorsExperimental.gray[13]},
  'color-link-active': {value: colorsExperimental.blue[15]},
  'color-link-hover': {value: colorsExperimental.blue[14]},
  'color-link': {value: colorsExperimental.blue[13]},
  'color-nav-bg': {value: colorsExperimental.gray[7]},
  'color-nav-surface-active': {value: colorsExperimental.gray[3]},
  'color-nav-surface-hover': {value: colorsExperimental.gray[6]},
  'color-nav-surface-selected': {value: colorsExperimental.gray[3]},
  'color-nav-surface': {value: colorsExperimental.blackAlpha[3]},
  'color-radio-button-icon-disabled': {value: colorsExperimental.gray[1]},
  'color-radio-button-surface-disabled': {
    value: colorsExperimental.blackAlpha[7],
  },
  'color-surface-emphasis-active': {value: colorsExperimental.blue[5]},
  'color-surface-emphasis-hover': {value: colorsExperimental.blue[4]},
  'color-surface-emphasis': {value: colorsExperimental.blue[3]},
  'color-surface-inverse': {value: colorsExperimental.gray[15]},
  'color-surface-magic-active': {value: colorsExperimental.purple[6]},
  'color-surface-secondary-selected': {value: colorsExperimental.gray[7]},
  'color-surface-tertiary-active': {value: colorsExperimental.gray[8]},
  'color-surface-tertiary-hover': {value: colorsExperimental.gray[7]},
  'color-surface-warning-active': {value: colorsExperimental.orange[5]},
  'color-surface-warning-hover': {value: colorsExperimental.orange[4]},
  'color-text-brand-on-fill-active': {value: colorsExperimental.gray[10]},
  'color-text-brand-on-fill-disabled': {value: colorsExperimental.gray[1]},
  'color-text-brand-on-fill-hover': {value: colorsExperimental.gray[8]},
  'color-text-brand-on-fill': {value: colorsExperimental.gray[1]},
  'color-text-caution-active': {value: colorsExperimental.yellow[16]},
  'color-text-caution-hover': {value: colorsExperimental.yellow[15]},
  'color-text-caution-on-fill': {value: colorsExperimental.yellow[15]},
  'color-text-critical-on-fill': {value: colorsExperimental.red[1]},
  'color-text-emphasis-on-fill-active': {value: colorsExperimental.blue[7]},
  'color-text-emphasis-on-fill-hover': {value: colorsExperimental.blue[5]},
  'color-text-emphasis-on-fill': {value: colorsExperimental.blue[1]},
  'color-text-info-active': {value: colorsExperimental.azure[16]},
  'color-text-info-hover': {value: colorsExperimental.azure[15]},
  'color-text-magic-on-fill': {value: colorsExperimental.purple[1]},
  'color-text-success-active': {value: colorsExperimental.green[16]},
  'color-text-success-hover': {value: colorsExperimental.green[15]},
  'color-text-success-on-fill': {value: colorsExperimental.green[1]},
  'color-text-warning-active': {value: colorsExperimental.orange[16]},
  'color-text-warning-hover': {value: colorsExperimental.orange[15]},
  'color-text-warning-on-fill': {value: colorsExperimental.orange[16]},
  'color-video-thumbnail-play-button-fill-hover': {
    value: colorsExperimental.blackAlpha[15],
  },
  'color-video-thumbnail-play-button-fill': {
    value: colorsExperimental.blackAlpha[14],
  },
  'color-video-thumbnail-play-button-text-on-fill': {
    value: colorsExperimental.gray[1],
  },
  // ------------------------------
  // Net new tokens (overridden in light-uplift)
  // ------------------------------
  'color-surface': {value: createVar('color-bg')},
  'color-surface-hover': {value: colorsExperimental.gray[4]},
  'color-surface-active': {value: colorsExperimental.gray[5]},
  'color-surface-disabled': {value: colorsExperimental.blackAlpha[5]},
  'color-surface-secondary': {value: createVar('color-bg-subdued')},
  'color-surface-secondary-hover': {
    value: createVar('color-bg-subdued-hover'),
  },
  'color-surface-secondary-active': {
    value: createVar('color-bg-subdued-active'),
  },
  'color-surface-tertiary': {
    value: createVar('color-bg-secondary-experimental'),
  },
  'color-fill-tertiary': {value: createVar('color-bg-strong')},
  'color-fill-tertiary-hover': {value: createVar('color-bg-strong-hover')},
  'color-fill-tertiary-active': {value: createVar('color-bg-strong-active')},
  'color-input-surface': {value: createVar('color-bg-input')},
  'color-input-surface-hover': {
    value: createVar('color-bg-input-hover-experimental'),
  },
  'color-input-surface-active': {
    value: createVar('color-bg-input-active-experimental'),
  },
  'color-fill-brand': {value: colorsExperimental.gray[15]},
  'color-fill-brand-hover': {value: colorsExperimental.gray[16]},
  'color-fill-brand-active': {value: colorsExperimental.gray[16]},
  'color-surface-brand': {value: colorsExperimental.gray[8]},
  'color-surface-brand-hover': {value: colorsExperimental.gray[7]},
  'color-surface-brand-active': {value: colorsExperimental.gray[6]},
  'color-surface-brand-selected': {value: colorsExperimental.gray[6]},
  'color-surface-selected': {value: createVar('color-bg-app-selected')},
  'color-fill-success': {value: createVar('color-bg-success-strong')},
  'color-fill-success-hover': {
    value: createVar('color-bg-success-strong-hover-experimental'),
  },
  'color-fill-success-active': {
    value: createVar('color-bg-success-strong-active-experimental'),
  },
  'color-fill-success-secondary': {value: createVar('color-bg-success')},
  'color-surface-success': {value: createVar('color-bg-success-subdued')},
  'color-surface-success-hover': {
    value: createVar('color-bg-success-subdued-hover'),
  },
  'color-surface-success-active': {
    value: createVar('color-bg-success-subdued-active'),
  },
  'color-fill-critical': {value: createVar('color-bg-critical-strong')},
  'color-fill-critical-hover': {
    value: createVar('color-bg-critical-strong-hover'),
  },
  'color-fill-critical-active': {
    value: createVar('color-bg-critical-strong-active'),
  },
  'color-fill-critical-secondary': {value: createVar('color-bg-critical')},
  'color-surface-critical': {value: createVar('color-bg-critical-subdued')},
  'color-surface-critical-hover': {
    value: createVar('color-bg-critical-subdued-hover'),
  },
  'color-surface-critical-active': {
    value: createVar('color-bg-critical-subdued-active'),
  },
  'color-fill-caution': {value: createVar('color-bg-caution-strong')},
  'color-fill-caution-secondary': {value: createVar('color-bg-caution')},
  'color-surface-caution': {value: createVar('color-bg-caution-subdued')},
  'color-surface-caution-hover': {
    value: createVar('color-bg-caution-subdued-hover'),
  },
  'color-surface-caution-active': {
    value: createVar('color-bg-caution-subdued-active'),
  },
  'color-fill-info': {value: createVar('color-bg-info-strong')},
  'color-fill-info-secondary': {value: createVar('color-bg-info')},
  'color-surface-info': {value: createVar('color-bg-info-subdued')},
  'color-surface-info-hover': {
    value: createVar('color-bg-info-subdued-hover'),
  },
  'color-surface-info-active': {
    value: createVar('color-bg-info-subdued-active'),
  },
  'color-fill-warning': {
    value: createVar('color-bg-warning-strong-experimental'),
  },
  'color-fill-warning-secondary': {value: createVar('color-bg-warning')},
  'color-surface-warning': {
    value: createVar('color-bg-warning-subdued-experimental'),
  },
  'color-fill-magic': {value: createVar('color-bg-magic-strong')},
  'color-fill-magic-secondary': {value: createVar('color-bg-magic')},
  'color-fill-magic-secondary-hover': {
    value: createVar('color-bg-magic-hover'),
  },
  'color-fill-magic-secondary-active': {
    value: createVar('color-bg-magic-active'),
  },
  'color-surface-magic': {value: colorsExperimental.purple[3]},
  'color-surface-magic-hover': {
    value: createVar('color-bg-magic-subdued-hover'),
  },
  'color-fill-secondary': {value: createVar('color-bg-inset')},
  'color-fill-inverse': {value: createVar('color-bg-inset-strong')},
  'color-fill-inverse-hover': {value: createVar('color-bg-inverse-hover')},
  'color-fill-inverse-active': {value: createVar('color-bg-inverse-active')},
  'color-surface-transparent': {
    value: createVar('color-bg-transparent-experimental'),
  },
  'color-fill-transparent-hover': {
    value: createVar('color-bg-transparent-hover-experimental'),
  },
  'color-fill-transparent-active': {
    value: createVar('color-bg-transparent-active-experimental'),
  },
  'color-fill-disabled': {
    value: createVar('color-bg-transparent-disabled-experimental'),
  },
  'color-fill-transparent-secondary': {
    value: createVar('color-bg-transparent-subdued-experimental'),
  },
  'color-fill-brand-disabled': {
    value: createVar('color-bg-transparent-primary-disabled-experimental'),
  },
  'color-backdrop-bg': {value: createVar('color-bg-backdrop-experimental')},
  'color-avatar-fill': {
    value: createVar('color-avatar-background-experimental'),
  },
  'color-avatar-one-fill': {
    value: createVar('color-avatar-style-one-background-experimental'),
  },
  'color-avatar-two-fill': {
    value: createVar('color-avatar-style-two-background-experimental'),
  },
  'color-avatar-three-fill': {
    value: createVar('color-avatar-style-three-background-experimental'),
  },
  'color-avatar-four-fill': {
    value: createVar('color-avatar-style-four-background-experimental'),
  },
  'color-avatar-five-fill': {
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
  'color-text-info-on-fill': {value: createVar('color-text-info-strong')},
  'color-text-warning': {value: colorsExperimental.orange[14]},
  'color-text-inverse-secondary': {
    value: createVar('color-text-inverse-subdued'),
  },
  'color-link-inverse': {value: colorsExperimental.blue[8]},
  'color-avatar-text-on-fill': {
    value: createVar('color-avatar-color-experimental'),
  },
  'color-avatar-one-text-on-fill': {
    value: createVar('color-avatar-style-one-color-experimental'),
  },
  'color-avatar-two-text-on-fill': {
    value: createVar('color-avatar-style-two-color-experimental'),
  },
  'color-avatar-three-text-on-fill': {
    value: createVar('color-avatar-style-three-color-experimental'),
  },
  'color-avatar-four-text-on-fill': {
    value: createVar('color-avatar-style-four-color-experimental'),
  },
  'color-avatar-five-text-on-fill': {
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
