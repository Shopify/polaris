/*
 * See the legacy Sass API file for the original color palette
 * documentation/guides/legacy-polaris-v8-public-api.scss
 */

export interface ColorHue {
  [hue: string]: ColorValue;
}

export interface ColorValue {
  [value: string]: string;
}

export const colorMap = {
  blue: {
    dark: '--p-interactive-hovered',
    base: '--p-interactive',
  },
  green: {
    dark: '--p-text-success',
    base: '--p-text-success',
  },
  yellow: {
    dark: '--p-text-warning',
    base: '--p-text-warning',
  },
  red: {
    dark: '--p-text-critical',
    base: '--p-text-critical',
  },
  ink: {
    base: '--p-text',
    light: '--p-text-subdued',
    lighter: '--p-text-subdued',
    lightest: '--p-text-subdued',
  },
  sky: {
    dark: '--p-text-subdued-on-dark',
    base: '--p-text-on-dark',
    light: '--p-text-on-dark',
    lighter: '--p-text-on-dark',
  },
  black: {
    base: '--p-text',
  },
  white: {
    base: '--p-text-on-dark',
  },
};

export const backgroundColorMap = {
  green: {
    light: '--p-surface-success',
    lighter: '--p-surface-success-subdued',
  },
  yellow: {
    light: '--p-surface-warning',
    lighter: '--p-surface-warning-subdued',
  },
  red: {
    light: '--p-surface-critical',
    lighter: '--p-surface-critical-subdued',
  },
  ink: {
    dark: '--p-surface-dark',
    base: '--p-surface-neutral-subdued-dark',
  },
  sky: {
    base: '--p-surface-neutral',
    light: '--p-surface-neutral-subdued',
    lighter: '--p-surface-subdued',
  },
  black: {
    base: '--p-surface-dark',
  },
  white: {
    base: '--p-surface',
  },
};

export const borderColorMap = {
  green: {
    dark: '--p-border-success',
    base: '--p-border-success',
    light: '--p-border-success-subdued',
    lighter: '--p-border-success-subdued',
  },
  yellow: {
    dark: '--p-border-warning',
    base: '--p-border-warning',
    light: '--p-border-warning-disabled',
    lighter: '--p-border-warning-subdued',
  },
  red: {
    dark: '--p-border-critical',
    base: '--p-border-critical',
    light: '--p-border-critical-subdued',
    lighter: '--p-border-critical-subdued',
  },
  ink: {
    lightest: '--p-border',
  },
  sky: {
    light: '--p-border-subdued',
  },
};

export const fillColorMap = {
  green: {
    dark: '--p-icon-success',
    base: '--p-icon-success',
  },
  yellow: {
    dark: '--p-icon-warning',
    base: '--p-icon-warning',
  },
  red: {
    dark: '--p-icon-critical',
    base: '--p-icon-critical',
  },
  ink: {
    base: '--p-icon',
    light: '--p-icon',
    lighter: '--p-icon-subdued',
    lightest: '--p-icon-disabled',
  },
  black: {
    base: '--p-icon',
  },
  white: {
    base: '--p-icon-on-dark',
  },
};
