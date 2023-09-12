import type {MetadataProperties, Experimental} from '../types';
import * as colors from '../colors';
import * as colorsExperimental from '../colors-experimental';

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
  | ColorBackgroundAliasExperimental;

export type ColorBorderAlias =
  | 'border'
  | 'border-caution'
  | 'border-caution-subdued'
  | 'border-critical'
  | 'border-critical-active'
  | 'border-critical-hover'
  | 'border-critical-subdued'
  | 'border-disabled'
  | 'border-hover'
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
  | 'border-magic'
  | 'border-magic-strong'
  | 'border-primary'
  | 'border-strong'
  | 'border-strong-hover'
  | 'border-subdued'
  | 'border-success'
  | 'border-success-subdued'
  | ColorBorderAliasExperimental;

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
  | ColorIconAliasExperimental;

export type ColorTextAlias =
  | 'text'
  | 'text-caution'
  | 'text-caution-strong'
  | 'text-critical'
  | 'text-critical-active'
  | 'text-critical-strong'
  | 'text-disabled'
  | 'text-info'
  | 'text-info-strong'
  | 'text-interactive'
  | 'text-interactive-active'
  | 'text-interactive-disabled'
  | 'text-interactive-hover'
  | 'text-interactive-inverse'
  | 'text-inverse'
  | 'text-inverse-subdued'
  | 'text-magic'
  | 'text-magic-strong'
  | 'text-on-color'
  | 'text-primary'
  | 'text-primary-hover'
  | 'text-subdued'
  | 'text-success'
  | 'text-success-strong'
  | 'text-warning-strong'
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
  | `color-${ColorIconAlias}`
  | `color-${ColorTextAlias}`
  | `color-${ColorAvatarAliasExperimental}`;

export type ColorTokenGroup = {
  [TokenName in ColorTokenName]: string;
};

export const color: {
  [TokenName in ColorTokenName]: MetadataProperties;
} = {
  'color-bg-active': {
    value: colorsExperimental.gray[4](),
  },
  'color-bg-app-active': {
    value: colors.gray[400],
  },
  'color-bg-app-hover': {
    value: colorsExperimental.gray[2](),
  },
  'color-bg-app-selected': {
    value: colorsExperimental.gray[3](),
  },
  'color-bg-app': {
    value: colorsExperimental.gray[6](),
  },
  'color-bg-caution-strong': {
    value: colorsExperimental.yellow[6],
  },
  'color-bg-caution-subdued-active': {
    value: colorsExperimental.yellow[4],
  },
  'color-bg-caution-subdued-hover': {
    value: colorsExperimental.yellow[3],
  },
  'color-bg-caution-subdued': {
    value: colorsExperimental.yellow[2],
  },
  'color-bg-caution': {
    value: colorsExperimental.yellow[4],
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
  'color-bg-critical-subdued-hover': {
    value: colorsExperimental.red[5],
  },
  'color-bg-critical-subdued': {
    value: colorsExperimental.red[4],
  },
  'color-bg-critical': {
    value: colorsExperimental.red[6],
  },
  'color-bg-disabled': {
    value: colorsExperimental.gray[7](),
  },
  'color-bg-hover': {
    value: colorsExperimental.gray[3](),
  },
  'color-bg-info-strong': {
    value: colorsExperimental.azure[9],
  },
  'color-bg-info-subdued-active': {
    value: colorsExperimental.azure[6],
  },
  'color-bg-info-subdued-hover': {
    value: colorsExperimental.azure[4],
  },
  'color-bg-info-subdued': {
    value: colorsExperimental.azure[3],
  },
  'color-bg-info': {
    value: colorsExperimental.azure[4],
  },
  'color-bg-input': {
    value: colorsExperimental.gray[1](),
  },
  'color-bg-inset-strong': {
    value: colorsExperimental.gray[15](),
  },
  'color-bg-inset': {
    value: colorsExperimental.gray[6](),
  },
  'color-bg-interactive-active': {
    value: colorsExperimental.gray[14](),
  },
  'color-bg-interactive-disabled': {
    value: colorsExperimental.gray[7](),
  },
  'color-bg-interactive-hover': {
    value: colorsExperimental.gray[15](),
  },
  'color-bg-interactive-selected': {
    value: colorsExperimental.gray[6](),
  },
  'color-bg-interactive-subdued-active': {
    value: colorsExperimental.gray[6](),
  },
  'color-bg-interactive-subdued-hover': {
    value: colorsExperimental.gray[7](),
  },
  'color-bg-interactive-subdued': {
    value: colorsExperimental.gray[8](),
  },
  'color-bg-interactive': {
    value: colorsExperimental.gray[16](),
  },
  'color-bg-inverse-active': {
    value: colorsExperimental.gray[13](),
  },
  'color-bg-inverse-hover': {
    value: colorsExperimental.gray[14](),
  },
  'color-bg-inverse': {
    value: colorsExperimental.gray[16](),
  },
  'color-bg-magic-active': {
    value: colorsExperimental.purple[8],
  },
  'color-bg-magic-hover': {
    value: colorsExperimental.purple[7],
  },
  'color-bg-magic-strong': {
    value: colorsExperimental.purple[12],
  },
  'color-bg-magic-subdued-active': {
    value: colorsExperimental.purple[6],
  },
  'color-bg-magic-subdued-hover': {
    value: colorsExperimental.purple[4],
  },
  'color-bg-magic-subdued': {
    value: colorsExperimental.purple[3],
  },
  'color-bg-magic': {
    value: colorsExperimental.purple[6],
  },
  'color-bg-primary-active': {
    value: colorsExperimental.gray[16](),
  },
  'color-bg-primary-hover': {
    value: colorsExperimental.gray[16](),
  },
  'color-bg-primary-subdued-active': {
    value: colorsExperimental.gray[6](),
  },
  'color-bg-primary-subdued-hover': {
    value: colorsExperimental.gray[7](),
  },
  'color-bg-primary-subdued-selected': {
    value: colorsExperimental.gray[6](),
  },
  'color-bg-primary-subdued': {
    value: colorsExperimental.gray[8](),
  },
  'color-bg-primary': {
    value: colorsExperimental.gray[15](),
  },
  'color-bg-strong-active': {
    value: colorsExperimental.gray[10](),
  },
  'color-bg-strong-hover': {
    value: colorsExperimental.gray[9](),
  },
  'color-bg-strong': {
    value: colorsExperimental.gray[8](),
  },
  'color-bg-subdued-active': {
    value: colorsExperimental.gray[7](),
  },
  'color-bg-subdued-hover': {
    value: colorsExperimental.gray[6](),
  },
  'color-bg-subdued': {
    value: colorsExperimental.gray[4](),
  },
  'color-bg-success-strong': {
    value: colorsExperimental.green[12],
  },
  'color-bg-success-subdued-active': {
    value: colors.green[200],
  },
  'color-bg-success-subdued-hover': {
    value: colorsExperimental.green[5],
  },
  'color-bg-success-subdued': {
    value: colorsExperimental.green[3],
  },
  'color-bg-success': {
    value: colorsExperimental.green[3],
  },
  'color-bg-warning': {
    value: colorsExperimental.orange[7],
  },
  'color-bg': {
    value: colorsExperimental.gray[1](),
  },
  'color-border-caution-subdued': {
    value: colorsExperimental.yellow[5],
  },
  'color-border-caution': {
    value: colorsExperimental.yellow[5],
  },
  'color-border-critical-active': {
    value: colorsExperimental.red[11],
  },
  'color-border-critical-hover': {
    value: colorsExperimental.red[10],
  },
  'color-border-critical-subdued': {
    value: colorsExperimental.red[9],
  },
  'color-border-critical': {
    value: colorsExperimental.red[9],
  },
  'color-border-disabled': {
    value: colorsExperimental.gray[7](),
  },
  'color-border-hover': {
    value: colorsExperimental.gray[10](),
  },
  'color-border-info-subdued': {
    value: colorsExperimental.azure[9],
  },
  'color-border-info': {
    value: colorsExperimental.azure[9],
  },
  'color-border-input-hover': {
    value: colorsExperimental.gray[13](),
  },
  'color-border-input': {
    value: colorsExperimental.gray[12](),
  },
  'color-border-interactive-active': {
    value: colorsExperimental.blue[15],
  },
  'color-border-interactive-disabled': {
    value: colorsExperimental.gray[7](),
  },
  'color-border-interactive-focus': {
    value: colorsExperimental.blue[13],
  },
  'color-border-interactive-hover': {
    value: colorsExperimental.blue[14],
  },
  'color-border-interactive-subdued': {
    value: colorsExperimental.blue[13],
  },
  'color-border-interactive': {
    value: colorsExperimental.blue[13],
  },
  'color-border-inverse': {
    value: colorsExperimental.gray[13](),
  },
  'color-border-magic-strong': {
    value: colorsExperimental.purple[12],
  },
  'color-border-magic': {
    value: colorsExperimental.purple[10],
  },
  'color-border-primary': {
    value: colorsExperimental.gray[8](),
  },
  'color-border-strong-hover': {
    value: colorsExperimental.gray[11](),
  },
  'color-border-strong': {
    value: colorsExperimental.gray[10](),
  },
  'color-border-subdued': {
    value: colorsExperimental.gray[7](),
  },
  'color-border-success-subdued': {
    value: colorsExperimental.green[5],
  },
  'color-border-success': {
    value: colorsExperimental.green[5],
  },
  'color-border': {
    value: colorsExperimental.gray[8](),
  },
  'color-icon-active': {
    value: colors.gray[900],
  },
  'color-icon-caution': {
    value: colorsExperimental.yellow[11],
  },
  'color-icon-critical': {
    value: colorsExperimental.red[11],
  },
  'color-icon-disabled': {
    value: colorsExperimental.gray[10](),
  },
  'color-icon-hover': {
    value: colorsExperimental.gray[15](),
  },
  'color-icon-info': {
    value: colorsExperimental.azure[11],
  },
  'color-icon-interactive-active': {
    value: colorsExperimental.blue[15],
  },
  'color-icon-interactive-disabled': {
    value: colorsExperimental.gray[10](),
  },
  'color-icon-interactive-hover': {
    value: colorsExperimental.blue[14],
  },
  'color-icon-interactive-inverse': {
    value: colorsExperimental.blue[8],
  },
  'color-icon-interactive': {
    value: colorsExperimental.blue[13],
  },
  'color-icon-inverse': {
    value: colorsExperimental.gray[8](),
  },
  'color-icon-magic': {
    value: colorsExperimental.purple[13],
  },
  'color-icon-on-color': {
    value: colorsExperimental.gray[1](),
  },
  'color-icon-primary': {
    value: colorsExperimental.gray[16](),
  },
  'color-icon-subdued': {
    value: colorsExperimental.gray[12](),
  },
  'color-icon-success': {
    value: colorsExperimental.green[12],
  },
  'color-icon-warning': {
    value: colorsExperimental.orange[11],
  },
  'color-icon': {
    value: colorsExperimental.gray[14](),
  },
  'color-text-caution-strong': {
    value: colorsExperimental.yellow[15],
  },
  'color-text-caution': {
    value: colorsExperimental.yellow[15],
  },
  'color-text-critical-active': {
    value: colorsExperimental.red[16],
  },
  'color-text-critical-strong': {
    value: colorsExperimental.red[14],
  },
  'color-text-critical': {
    value: colorsExperimental.red[14],
  },
  'color-text-disabled': {
    value: colorsExperimental.gray[11](),
  },
  'color-text-info-strong': {
    value: colorsExperimental.azure[16],
  },
  'color-text-info': {
    value: colorsExperimental.azure[14],
  },
  'color-text-interactive-active': {
    value: colorsExperimental.blue[15],
  },
  'color-text-interactive-disabled': {
    value: colorsExperimental.gray[10](),
  },
  'color-text-interactive-hover': {
    value: colorsExperimental.blue[14],
  },
  'color-text-interactive-inverse': {
    value: colorsExperimental.blue[8],
  },
  'color-text-interactive': {
    value: colorsExperimental.blue[13],
  },
  'color-text-inverse-subdued': {
    value: colorsExperimental.gray[10](),
  },
  'color-text-inverse': {
    value: colorsExperimental.gray[8](),
  },
  'color-text-magic-strong': {
    value: colorsExperimental.purple[15],
  },
  'color-text-magic': {
    value: colorsExperimental.purple[14],
  },
  'color-text-on-color': {
    value: colorsExperimental.gray[1](),
  },
  'color-text-primary-hover': {
    value: colorsExperimental.gray[14](),
  },
  'color-text-primary': {
    value: colorsExperimental.gray[14](),
  },
  'color-text-subdued': {
    value: colorsExperimental.gray[13](),
  },
  'color-text-success-strong': {
    value: colorsExperimental.green[15],
  },
  'color-text-success': {
    value: colorsExperimental.green[15],
  },
  'color-text-warning-strong': {
    value: colorsExperimental.orange[16],
  },
  'color-text': {
    value: colorsExperimental.gray[15](),
  },
  // Experimental tokens
  'color-avatar-background-experimental': {
    value: colorsExperimental.gray[11](),
  },
  'color-avatar-color-experimental': {
    value: colorsExperimental.gray[1](),
  },
  'color-avatar-style-five-background-experimental': {
    value: colorsExperimental.rose[7],
  },
  'color-avatar-style-five-color-experimental': {
    value: colorsExperimental.rose[14],
  },
  'color-avatar-style-four-background-experimental': {
    value: colorsExperimental.azure[7],
  },
  'color-avatar-style-four-color-experimental': {
    value: colorsExperimental.azure[14],
  },
  'color-avatar-style-one-background-experimental': {
    value: colorsExperimental.magenta[7],
  },
  'color-avatar-style-one-color-experimental': {
    value: colorsExperimental.magenta[14],
  },
  'color-avatar-style-three-background-experimental': {
    value: colorsExperimental.cyan[7],
  },
  'color-avatar-style-three-color-experimental': {
    value: colorsExperimental.cyan[14],
  },
  'color-avatar-style-two-background-experimental': {
    value: colorsExperimental.green[7],
  },
  'color-avatar-style-two-color-experimental': {
    value: colorsExperimental.green[14],
  },
  'color-bg-backdrop-experimental': {
    value: colorsExperimental.gray[16]('0.75'),
  },
  'color-bg-input-active-experimental': {
    value: colorsExperimental.gray[4](),
  },
  'color-bg-input-hover-experimental': {
    value: colorsExperimental.gray[3](),
  },
  'color-bg-primary-disabled-experimental': {
    value: colorsExperimental.gray[9](),
  },
  'color-bg-secondary-experimental': {
    value: colorsExperimental.gray[5](),
  },
  'color-bg-success-strong-active-experimental': {
    value: colorsExperimental.green[14],
  },
  'color-bg-success-strong-hover-experimental': {
    value: colorsExperimental.green[13],
  },
  'color-bg-transparent-active-experimental': {
    value: colorsExperimental.gray[16]('0.07'),
  },
  'color-bg-transparent-disabled-experimental': {
    value: colorsExperimental.gray[16]('0.04'),
  },
  'color-bg-transparent-experimental': {
    value: colorsExperimental.gray[16]('0'),
  },
  'color-bg-transparent-hover-experimental': {
    value: colorsExperimental.gray[16]('0.05'),
  },
  'color-bg-transparent-primary-disabled-experimental': {
    value: colorsExperimental.gray[16]('0.18'),
  },
  'color-bg-transparent-primary-experimental': {
    value: colorsExperimental.gray[16]('0.60'),
  },
  'color-bg-transparent-secondary-disabled-experimental': {
    value: colorsExperimental.gray[16]('0.08'),
  },
  'color-bg-transparent-subdued-experimental': {
    value: colorsExperimental.gray[16]('0.07'),
  },
  'color-bg-warning-strong-experimental': {
    value: colorsExperimental.orange[9],
  },
  'color-bg-warning-subdued-experimental': {
    value: colorsExperimental.orange[3],
  },
  'color-border-critical-strong-experimental': {
    value: colorsExperimental.red[14],
  },
  'color-border-input-active-experimental': {
    value: colorsExperimental.gray[16](),
  },
  'color-icon-critical-strong-active-experimental': {
    value: colorsExperimental.red[16],
  },
  'color-icon-critical-strong-experimental': {
    value: colorsExperimental.red[14],
  },
  'color-icon-critical-strong-hover-experimental': {
    value: colorsExperimental.red[15],
  },
  'color-icon-info-strong-experimental': {
    value: colorsExperimental.azure[14],
  },
  'color-icon-success-strong-experimental': {
    value: colorsExperimental.green[14],
  },
  'color-icon-warning-strong-experimental': {
    value: colorsExperimental.orange[13],
  },
  'color-text-critical-hover-experimental': {
    value: colorsExperimental.red[15],
  },
  'color-text-warning-experimental': {
    value: colorsExperimental.orange[15],
  },
};
