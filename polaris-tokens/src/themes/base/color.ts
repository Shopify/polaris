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
  [TokenName in ColorTokenName]: MetaTokenProperties;
} = {
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
    value: colorsExperimental.gray[16]('0.75'),
    description: '',
  },
  'color-bg-primary-disabled-experimental': {
    value: colorsExperimental.gray[9](),
    description: '',
  },
  'color-bg-secondary-experimental': {
    value: colorsExperimental.gray[5](),
    description: '',
  },
  'color-bg-input-hover-experimental': {
    value: colorsExperimental.gray[3](),
    description: '',
  },
  'color-border-input-active-experimental': {
    value: colorsExperimental.gray[16](),
  },
  'color-border-critical-strong-experimental': {
    value: colorsExperimental.red[14],
  },
  'color-bg-input-active-experimental': {
    value: colorsExperimental.gray[4](),
    description: '',
  },
  'color-bg-transparent-experimental': {
    value: colorsExperimental.gray[16]('0'),
    description: '',
  },
  'color-bg-transparent-subdued-experimental': {
    value: colorsExperimental.gray[16]('0.07'),
    description: '',
  },
  'color-bg-transparent-hover-experimental': {
    value: colorsExperimental.gray[16]('0.05'),
    description: '',
  },
  'color-bg-transparent-active-experimental': {
    value: colorsExperimental.gray[16]('0.07'),
    description: '',
  },
  'color-bg-transparent-disabled-experimental': {
    value: colorsExperimental.gray[16]('0.04'),
    description: '',
  },
  'color-bg-transparent-secondary-disabled-experimental': {
    value: colorsExperimental.gray[16]('0.08'),
    description: '',
  },
  'color-bg-transparent-primary-disabled-experimental': {
    value: colorsExperimental.gray[16]('0.18'),
    description: '',
  },
  'color-bg-transparent-primary-experimental': {
    value: colorsExperimental.gray[16]('0.60'),
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
    value: colorsExperimental.gray[11](),
    description: '',
  },
  'color-avatar-color-experimental': {
    value: colorsExperimental.gray[1](),
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
