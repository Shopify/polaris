import type {MetadataProperties} from '../types';
import * as palettes from '../palettes';

export type ColorBackgroundTokenAlias =
  typeof colorBackgroundTokenAlias[number];

export const colorBackgroundTokenAlias = [
  'bg',
  'bg-active',
  'bg-app',
  'bg-app-hover',
  'bg-app-selected',
  'bg-backdrop',
  'bg-caution',
  'bg-caution-strong',
  'bg-caution-subdued',
  'bg-caution-subdued-active',
  'bg-caution-subdued-hover',
  'bg-critical-strong',
  'bg-critical-strong-active',
  'bg-critical-strong-hover',
  'bg-critical-subdued',
  'bg-critical-subdued-active',
  'bg-critical-subdued-hover',
  'bg-critical',
  'bg-disabled',
  'bg-hover',
  'bg-info',
  'bg-info-strong',
  'bg-info-subdued',
  'bg-info-subdued-active',
  'bg-info-subdued-hover',
  'bg-input',
  'bg-inset',
  'bg-inset-strong',
  'bg-interactive',
  'bg-interactive-active',
  'bg-interactive-disabled',
  'bg-interactive-hover',
  'bg-interactive-selected',
  'bg-interactive-subdued',
  'bg-interactive-subdued-active',
  'bg-interactive-subdued-hover',
  'bg-inverse',
  'bg-inverse-active',
  'bg-inverse-hover',
  'bg-overlay',
  'bg-primary',
  'bg-primary-active',
  'bg-primary-hover',
  'bg-primary-subdued',
  'bg-primary-subdued-active',
  'bg-primary-subdued-hover',
  'bg-primary-subdued-selected',
  'bg-strong',
  'bg-strong-active',
  'bg-strong-hover',
  'bg-subdued',
  'bg-subdued-active',
  'bg-subdued-hover',
  'bg-success',
  'bg-success-strong',
  'bg-success-subdued',
  'bg-success-subdued-active',
  'bg-success-subdued-hover',
  'bg-warning',
] as const;

export type ColorBorderTokenAlias = typeof ColorBorderTokenAlias[number];

export const ColorBorderTokenAlias = [
  'border',
  'border-caution',
  'border-caution-subdued',
  'border-critical',
  'border-critical-active',
  'border-critical-hover',
  'border-critical-subdued',
  'border-disabled',
  'border-hover',
  'border-info',
  'border-info-subdued',
  'border-input',
  'border-input-hover',
  'border-interactive',
  'border-interactive-active',
  'border-interactive-disabled',
  'border-interactive-focus',
  'border-interactive-hover',
  'border-interactive-subdued',
  'border-inverse',
  'border-primary',
  'border-strong',
  'border-strong-hover',
  'border-subdued',
  'border-success',
  'border-success-subdued',
] as const;

export type ColorIconTokenAlias = typeof colorIconTokenAlias[number];

export const colorIconTokenAlias = [
  'icon',
  'icon-caution',
  'icon-critical',
  'icon-disabled',
  'icon-hover',
  'icon-info',
  'icon-interactive',
  'icon-interactive-active',
  'icon-interactive-disabled',
  'icon-interactive-hover',
  'icon-interactive-inverse',
  'icon-inverse',
  'icon-on-color',
  'icon-primary',
  'icon-subdued',
  'icon-success',
  'icon-warning',
] as const;

export type ColorTextTokenAlias = typeof colorTextTokenAlias[number];

export const colorTextTokenAlias = [
  'text',
  'text-caution',
  'text-caution-strong',
  'text-critical',
  'text-critical-active',
  'text-critical-strong',
  'text-disabled',
  'text-info',
  'text-info-strong',
  'text-interactive',
  'text-interactive-active',
  'text-interactive-disabled',
  'text-interactive-hover',
  'text-interactive-inverse',
  'text-inverse',
  'text-inverse-subdued',
  'text-on-color',
  'text-primary',
  'text-subdued',
  'text-success',
  'text-success-strong',
  'text-warning-strong',
] as const;

export type ColorTokenName =
  | ColorBackgroundTokenAlias
  | ColorBorderTokenAlias
  | ColorIconTokenAlias
  | ColorTextTokenAlias;

export type ColorTokenGroup = {
  [TokenName in ColorTokenName as `color-${TokenName}`]: string;
};

export const color: {
  [TokenName in ColorTokenName as `color-${TokenName}`]: MetadataProperties;
} = {
  'color-bg-backdrop': {
    value: 'rgba(0, 0, 0, 0.5)',
    description: '',
  },
  'color-bg-inverse': {
    value: palettes.gray[900],
    description: '',
  },
  'color-bg-inset-strong': {
    value: palettes.gray[800],
    description: '',
  },
  'color-bg-inverse-hover': {
    value: palettes.gray[800],
    description: '',
  },
  'color-bg-inverse-active': {
    value: palettes.gray[700],
    description: '',
  },
  'color-bg-strong-hover': {
    value: palettes.gray[500],
    description: '',
  },
  'color-bg-strong-active': {
    value: palettes.gray[500],
    description: '',
  },
  'color-bg-strong': {
    value: palettes.gray[400],
    description: '',
  },
  'color-bg-subdued-active': {
    value: palettes.gray[400],
    description: '',
  },
  'color-bg-disabled': {
    value: palettes.gray[300],
    description: '',
  },
  'color-bg-interactive-disabled': {
    value: palettes.gray[300],
    description: '',
  },
  'color-bg-app-hover': {
    value: palettes.gray[300],
    description: '',
  },
  'color-bg-app-selected': {
    value: palettes.gray[300],
    description: '',
  },
  'color-bg-active': {
    value: palettes.gray[300],
    description: '',
  },
  'color-bg-subdued-hover': {
    value: palettes.gray[300],
    description: '',
  },
  'color-bg-app': {
    value: palettes.gray[200],
    description: '',
  },
  'color-bg-inset': {
    value: palettes.gray[200],
    description: '',
  },
  'color-bg-hover': {
    value: palettes.gray[200],
    description: '',
  },
  'color-bg-subdued': {
    value: palettes.gray[100],
    description: '',
  },
  'color-bg-input': {
    value: palettes.gray[50],
    description: '',
  },
  'color-bg': {
    value: palettes.gray[50],
    description: '',
  },
  'color-bg-overlay': {
    value: 'rgba(255, 255, 255, 0.5)',
    description: '',
  },
  'color-bg-primary-active': {
    value: palettes.green[900],
    description: '',
  },
  'color-bg-primary-hover': {
    value: palettes.green[800],
    description: '',
  },
  'color-bg-primary': {
    value: palettes.green[700],
    description: '',
  },
  'color-bg-success-strong': {
    value: palettes.green[600],
    description: '',
  },
  'color-bg-success': {
    value: palettes.green[300],
    description: '',
  },
  'color-bg-primary-subdued-active': {
    value: palettes.green[200],
    description: '',
  },
  'color-bg-success-subdued-active': {
    value: palettes.green[200],
    description: '',
  },
  'color-bg-success-subdued': {
    value: palettes.green[100],
    description: '',
  },
  'color-bg-primary-subdued-hover': {
    value: palettes.green[100],
    description: '',
  },
  'color-bg-success-subdued-hover': {
    value: palettes.green[50],
    description: '',
  },
  'color-bg-primary-subdued': {
    value: palettes.green[50],
    description: '',
  },
  'color-bg-primary-subdued-selected': {
    value: palettes.green[50],
    description: '',
  },
  'color-bg-critical-strong-active': {
    value: palettes.red[800],
    description: '',
  },
  'color-bg-critical-strong-hover': {
    value: palettes.red[700],
    description: '',
  },
  'color-bg-critical-strong': {
    value: palettes.red[600],
    description: '',
  },
  'color-bg-critical-subdued-active': {
    value: palettes.red[200],
    description: '',
  },
  'color-bg-critical': {
    value: palettes.red[200],
    description: '',
  },
  'color-bg-critical-subdued': {
    value: palettes.red[100],
    description: '',
  },
  'color-bg-critical-subdued-hover': {
    value: palettes.red[50],
    description: '',
  },
  'color-bg-caution-strong': {
    value: palettes.yellow[600],
    description: '',
  },
  'color-bg-caution': {
    value: palettes.yellow[300],
    description: '',
  },
  'color-bg-caution-subdued-active': {
    value: palettes.yellow[200],
    description: '',
  },
  'color-bg-caution-subdued': {
    value: palettes.yellow[100],
    description: '',
  },
  'color-bg-caution-subdued-hover': {
    value: palettes.yellow[50],
    description: '',
  },
  'color-bg-info-strong': {
    value: palettes.teal[600],
    description: '',
  },
  'color-bg-info-subdued-active': {
    value: palettes.teal[200],
    description: '',
  },
  'color-bg-info': {
    value: palettes.teal[200],
    description: '',
  },
  'color-bg-info-subdued': {
    value: palettes.teal[100],
    description: '',
  },
  'color-bg-info-subdued-hover': {
    value: palettes.teal[50],
    description: '',
  },
  'color-bg-interactive-active': {
    value: palettes.blue[800],
    description: '',
  },
  'color-bg-interactive-hover': {
    value: palettes.blue[700],
    description: '',
  },
  'color-bg-interactive': {
    value: palettes.blue[600],
    description: '',
  },
  'color-bg-interactive-subdued-active': {
    value: palettes.blue[200],
    description: '',
  },
  'color-bg-interactive-subdued-hover': {
    value: palettes.blue[100],
    description: '',
  },
  'color-bg-interactive-subdued': {
    value: palettes.blue[50],
    description: '',
  },
  'color-bg-interactive-selected': {
    value: palettes.blue[50],
    description: '',
  },
  'color-bg-warning': {
    value: palettes.orange[200],
    description: '',
  },
  'color-border-input-hover': {
    value: palettes.gray[800],
    description: '',
  },
  'color-border-inverse': {
    value: palettes.gray[800],
    description: '',
  },
  'color-border-strong-hover': {
    value: palettes.gray[700],
    description: '',
  },
  'color-border-input': {
    value: palettes.gray[600],
    description: '',
  },
  'color-border-hover': {
    value: palettes.gray[600],
    description: '',
  },
  'color-border-strong': {
    value: palettes.gray[600],
    description: '',
  },
  'color-border': {
    value: palettes.gray[500],
    description: '',
  },
  'color-border-disabled': {
    value: palettes.gray[400],
    description: '',
  },
  'color-border-subdued': {
    value: palettes.gray[400],
    description: '',
  },
  'color-border-interactive-disabled': {
    value: palettes.gray[400],
    description: '',
  },
  'color-border-primary': {
    value: palettes.green[700],
    description: '',
  },
  'color-border-success': {
    value: palettes.green[600],
    description: '',
  },
  'color-border-success-subdued': {
    value: palettes.green[200],
    description: '',
  },
  'color-border-critical-active': {
    value: palettes.red[900],
    description: '',
  },
  'color-border-critical-hover': {
    value: palettes.red[800],
    description: '',
  },
  'color-border-critical': {
    value: palettes.red[600],
    description: '',
  },
  'color-border-critical-subdued': {
    value: palettes.red[200],
    description: '',
  },
  'color-border-caution': {
    value: palettes.yellow[600],
    description: '',
  },
  'color-border-caution-subdued': {
    value: palettes.yellow[200],
    description: '',
  },
  'color-border-info': {
    value: palettes.teal[500],
    description: '',
  },
  'color-border-info-subdued': {
    value: palettes.teal[200],
    description: '',
  },
  'color-border-interactive-active': {
    value: palettes.blue[800],
    description: '',
  },
  'color-border-interactive-hover': {
    value: palettes.blue[700],
    description: '',
  },
  'color-border-interactive': {
    value: palettes.blue[500],
    description: '',
  },
  'color-border-interactive-focus': {
    value: palettes.blue[500],
    description: '',
  },
  'color-border-interactive-subdued': {
    value: palettes.blue[200],
    description: '',
  },
  'color-icon-hover': {
    value: palettes.gray[900],
    description: '',
  },
  'color-icon': {
    value: palettes.gray[800],
    description: '',
  },
  'color-icon-subdued': {
    value: palettes.gray[700],
    description: '',
  },
  'color-icon-disabled': {
    value: palettes.gray[600],
    description: '',
  },
  'color-icon-interactive-disabled': {
    value: palettes.gray[600],
    description: '',
  },
  'color-icon-inverse': {
    value: palettes.gray[400],
    description: '',
  },
  'color-icon-on-color': {
    value: palettes.gray[50],
    description: '',
  },
  'color-icon-primary': {
    value: palettes.green[700],
    description: '',
  },
  'color-icon-success': {
    value: palettes.green[600],
    description: '',
  },
  'color-icon-critical': {
    value: palettes.red[600],
    description: '',
  },
  'color-icon-caution': {
    value: palettes.yellow[700],
    description: '',
  },
  'color-icon-info': {
    value: palettes.green[600],
    description: '',
  },
  'color-icon-warning': {
    value: palettes.orange[500],
    description: '',
  },
  'color-icon-interactive-active': {
    value: palettes.blue[800],
    description: '',
  },
  'color-icon-interactive-hover': {
    value: palettes.blue[700],
    description: '',
  },
  'color-icon-interactive': {
    value: palettes.blue[600],
    description: '',
  },
  'color-icon-interactive-inverse': {
    value: palettes.blue[400],
    description: '',
  },
  'color-text': {
    value: palettes.gray[900],
    description: '',
  },
  'color-text-subdued': {
    value: palettes.gray[800],
    description: '',
  },
  'color-text-disabled': {
    value: palettes.gray[700],
    description: '',
  },
  'color-text-interactive-disabled': {
    value: palettes.gray[700],
    description: '',
  },
  'color-text-inverse-subdued': {
    value: palettes.gray[600],
    description: '',
  },
  'color-text-inverse': {
    value: palettes.gray[200],
    description: '',
  },
  'color-text-on-color': {
    value: palettes.gray[50],
    description: '',
  },
  'color-text-success-strong': {
    value: palettes.green[900],
    description: '',
  },

  'color-text-success': {
    value: palettes.green[700],
    description: '',
  },
  'color-text-primary': {
    value: palettes.green[700],
    description: '',
  },
  'color-text-critical-strong': {
    value: palettes.red[900],
    description: '',
  },
  'color-text-critical-active': {
    value: palettes.red[800],
    description: '',
  },
  'color-text-critical': {
    value: palettes.red[600],
    description: '',
  },
  'color-text-caution-strong': {
    value: palettes.yellow[900],
    description: '',
  },
  'color-text-caution': {
    value: palettes.yellow[800],
    description: '',
  },
  'color-text-info-strong': {
    value: palettes.teal[900],
    description: '',
  },
  'color-text-info': {
    value: palettes.teal[700],
    description: '',
  },
  'color-text-warning-strong': {
    value: palettes.orange[900],
    description: '',
  },
  'color-text-interactive-active': {
    value: palettes.blue[800],
    description: '',
  },
  'color-text-interactive-hover': {
    value: palettes.blue[700],
    description: '',
  },
  'color-text-interactive': {
    value: palettes.blue[600],
    description: '',
  },
  'color-text-interactive-inverse': {
    value: palettes.blue[400],
    description: '',
  },
};
