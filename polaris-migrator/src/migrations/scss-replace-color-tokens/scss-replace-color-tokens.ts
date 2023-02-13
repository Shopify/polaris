import type {FileInfo, API} from 'jscodeshift';

import stylesReplaceCustomProperty from '../styles-replace-custom-property/styles-replace-custom-property';

const ColorMap = {
  '--p-text': '--p-color-text',
  '--p-text-on-dark': '--p-color-text-inverse',
  '--p-text-disabled': '--p-color-text-disabled',
  '--p-text-subdued': '--p-color-text-subdued',
  '--p-text-subdued-on-dark': '--p-color-text-inverse-subdued',
  '--p-interactive': '--p-color-text-interactive',
  '--p-interactive-on-dark': '--p-color-text-interactive-inverse',
  '--p-interactive-disabled': '--p-color-text-interactive-disabled',
  '--p-interactive-hovered': '--p-color-text-interactive-hover',
  '--p-interactive-pressed': '--p-color-text-interactive-active',
  '--p-text-on-interactive': '--p-color-text-on-color',
  '--p-action-primary': '--p-color-text-primary',
  '--p-text-on-primary': '--p-color-text-on-color',
  '--p-text-primary': '--p-color-text-primary',
  '--p-text-primary-hovered': '--p-color-text-primary-hover',
  '--p-text-primary-pressed': '--p-color-text-primary',
  '--p-text-critical': '--p-color-text-critical',
  '--p-text-on-critical': '--p-color-text-on-color',
  '--p-interactive-critical': '--p-color-text-critical',
  '--p-interactive-critical-disabled': '--p-color-text-disabled',
  '--p-interactive-critical-pressed': '--p-color-text-critical-active',
  '--p-text-warning': '--p-color-text-caution',
  '--p-text-highlight': '--p-color-text-info',
  '--p-text-success': '--p-color-text-success',
  '--p-interactive-pressed-on-dark': '--p-color-text-interactive-inverse',
};

const backgroundColorMap = {
  '--p-background': '--p-color-bg-app',
  '--p-background-hovered': '--p-color-bg-app-hover',
  '--p-background-pressed': '--p-color-bg-app-active',
  '--p-background-selected': '--p-color-bg-app-selected',
  '--p-surface': '--p-color-bg',
  '--p-surface-dark': '--p-color-bg-inverse',
  '--p-surface-neutral': '--p-color-bg-strong',
  '--p-surface-neutral-hovered': '--p-color-bg-strong-hover',
  '--p-surface-neutral-pressed': '--p-color-bg-strong-active',
  '--p-surface-neutral-disabled': '--p-color-bg-disabled',
  '--p-surface-neutral-subdued': '--p-color-bg-subdued',
  '--p-surface-neutral-subdued-dark': '--p-color-bg-inverse',
  '--p-surface-subdued': '--p-color-bg-subdued',
  '--p-surface-disabled': '--p-color-bg-disabled',
  '--p-surface-hovered': '--p-color-bg-hover',
  '--p-surface-hovered-dark': '--p-color-bg-inverse-hover',
  '--p-surface-pressed': '--p-color-bg-active',
  '--p-surface-pressed-dark': '--p-color-bg-inverse-active',
  '--p-surface-depressed': '--p-color-bg-inset',
  '--p-surface-search-field': '--p-color-bg-inset',
  '--p-surface-search-field-dark': '--p-color-bg-inverse',
  '--p-interactive': '--p-color-bg-interactive',
  '--p-interactive-disabled': '--p-color-bg-interactive-disabled',
  '--p-interactive-hovered': '--p-color-bg-interactive-hover',
  '--p-interactive-pressed': '--p-color-bg-interactive-active',
  '--p-surface-selected': '--p-color-bg-interactive-selected',
  '--p-surface-selected-hovered': '--p-color-bg-interactive-subdued-hover',
  '--p-surface-selected-pressed': '--p-color-bg-interactive-subdued-active',
  '--p-action-secondary': '--p-color-bg-subdued',
  '--p-action-secondary-disabled': '--p-color-bg-disabled',
  '--p-action-secondary-hovered': '--p-color-bg-hover',
  '--p-action-secondary-hovered-dark': '--p-color-bg-inverse-hover',
  '--p-action-secondary-pressed': '--p-color-bg-subdued-active',
  '--p-action-secondary-pressed-dark': '--p-color-bg-inverse-active',
  '--p-action-secondary-depressed': '--p-color-bg-inset-strong',
  '--p-action-primary': '--p-color-bg-primary',
  '--p-action-primary-disabled': '--p-color-bg-disabled',
  '--p-action-primary-hovered': '--p-color-bg-primary-hover',
  '--p-action-primary-pressed': '--p-color-bg-primary-active',
  '--p-action-primary-depressed': '--p-color-bg-primary-active',
  '--p-surface-primary-selected': '--p-color-bg-primary-subdued-selected',
  '--p-surface-primary-selected-hovered': '--p-color-bg-primary-subdued-hover',
  '--p-surface-primary-selected-pressed': '--p-color-bg-primary-subdued-active',
  '--p-surface-critical': '--p-color-bg-critical',
  '--p-surface-critical-subdued': '--p-color-bg-critical-subdued',
  '--p-surface-critical-subdued-hovered': '--p-color-bg-critical-subdued-hover',
  '--p-surface-critical-subdued-pressed':
    '--p-color-bg-critical-subdued-active',
  '--p-surface-critical-subdued-depressed': '--p-color-bg-critical',
  '--p-action-critical': '--p-color-bg-critical-strong',
  '--p-action-critical-hovered': '--p-color-bg-critical-strong-hover',
  '--p-action-critical-pressed': '--p-color-bg-critical-strong-active',
  '--p-action-critical-depressed': '--p-color-bg-critical-strong-active',
  '--p-interactive-critical': '--p-color-bg-critical',
  '--p-surface-warning': '--p-color-bg-caution',
  '--p-surface-warning-subdued': '--p-color-bg-caution-subdued',
  '--p-surface-warning-subdued-hovered': '--p-color-bg-caution-subdued-hover',
  '--p-surface-warning-subdued-pressed': '--p-color-bg-caution-subdued-active',
  '--p-surface-highlight': '--p-color-bg-info',
  '--p-surface-highlight-subdued': '--p-color-bg-info-subdued',
  '--p-surface-highlight-subdued-hovered': '--p-color-bg-info-subdued-hover',
  '--p-surface-highlight-subdued-pressed': '--p-color-bg-info-subdued-active',
  '--p-surface-success': '--p-color-bg-success',
  '--p-surface-success-subdued': '--p-color-bg-success-subdued',
  '--p-surface-success-subdued-hovered': '--p-color-bg-success-subdued-hovered',
  '--p-surface-success-subdued-pressed': '--p-color-bg-success-subdued-pressed',
  '--p-surface-attention': '--p-color-bg-caution',
  '--p-action-critical-disabled': '--p-color-bg-disabled',
  '--p-interactive-critical-hovered': '--p-color-bg-critical-strong-hover',
};

const borderColorMap = {
  '--p-border': '--p-color-border',
  '--p-border-on-dark': '--p-color-border-inverse',
  '--p-border-neutral-subdued': '--p-color-border-strong',
  '--p-border-hovered': '--p-color-border-hover',
  '--p-border-disabled': '--p-color-border-disabled',
  '--p-border-subdued': '--p-color-border-subdued',
  '--p-border-depressed': '--p-color-border-inverse',
  '--p-border-shadow': '--p-color-border-input',
  '--p-border-shadow-subdued': '--p-color-border-input',
  '--p-divider': '--p-color-border-subdued',
  '--p-divider-dark': '--p-color-border-inverse',
  '--p-interactive': '--p-color-border-interactive',
  '--p-interactive-disabled': '--p-color-border-interactive-disabled',
  '--p-interactive-hovered': '--p-color-border-interactive-hover',
  '--p-interactive-pressed': '--p-color-border-interactive-active',
  '--p-focused': '--p-color-border-interactive-focus',
  '--p-action-primary': '--p-color-border-primary',
  '--p-border-critical': '--p-color-border-critical',
  '--p-border-critical-subdued': '--p-color-border-critical-subdued',
  '--p-border-critical-disabled': '--p-color-border-disabled',
  '--p-border-warning': '--p-color-border-caution',
  '--p-border-warning-subdued': '--p-color-border-caution-subdued',
  '--p-border-highlight': '--p-color-border-info',
  '--p-border-highlight-subdued': '--p-color-border-info-subdued',
  '--p-border-success': '--p-color-border-success',
  '--p-border-success-subdued': '--p-color-border-success-subdued',
};

const fillColorMap = {
  '--p-icon': '--p-color-icon',
  '--p-icon-on-dark': '--p-color-icon-inverse',
  '--p-icon-hovered': '--p-color-icon-hover',
  '--p-icon-disabled': '--p-color-icon-disabled',
  '--p-icon-subdued': '--p-color-icon-subdued',
  '--p-interactive': '--p-color-icon-interactive',
  '--p-interactive-disabled': '--p-color-icon-interactive-disabled',
  '--p-interactive-hovered': '--p-color-icon-interactive-hover',
  '--p-interactive-pressed': '--p-color-icon-interactive-active',
  '--p-icon-on-interactive': '--p-color-icon-on-color',
  '--p-action-primary': '--p-color-icon-primary',
  '--p-icon-on-primary': '--p-color-icon-on-color',
  '--p-icon-critical': '--p-color-icon-critical',
  '--p-icon-on-critical': '--p-color-icon-on-color',
  '--p-interactive-critical': '--p-color-icon-critical',
  '--p-icon-warning': '--p-color-icon-caution',
  '--p-icon-highlight': '--p-color-icon-info',
  '--p-icon-success': '--p-color-icon-success',
  '--p-icon-attention': '--p-color-icon-caution',
  '--p-icon-pressed': '--p-color-icon-active',
};

const replacementMaps = {
  color: ColorMap,
  background: backgroundColorMap,
  'background-color': backgroundColorMap,
  border: borderColorMap,
  'border-color': borderColorMap,
  fill: fillColorMap,
};

export default function scssReplaceColorTokens(fileInfo: FileInfo, _: API) {
  return stylesReplaceCustomProperty(fileInfo, _, {replacementMaps});
}

export const unCategorizedMaps = {
  '--p-backdrop': '--p-color-bg-backdrop', // I think we removed this token all together. Alex had brought it up in a previoius PR
  '--p-overlay': '--p-color-bg-overlay', // I think we removed this token all together. Alex had brought it up in a previoius PR
  '--p-shadow-color-picker': '--p-color-shadow-color-picker', // shadow-inset-sm
  '--p-shadow-color-picker-dragger': '--p-color-shadow-color-picker-dragger', // shadow-sm
  '--p-hint-from-direct-light': '--p-color-hint-from-direct-light', // rgba(0, 0, 0, 0.15)

  // Decorative colors are being converted to hard-coded values since they are only used for Avatar
  '--p-decorative-one-icon': '--p-color-decorative-one-icon', // rgba(126, 87, 0, 1)
  '--p-decorative-one-surface': '--p-color-decorative-one-surface', // rgba(255, 201, 107, 1)
  '--p-decorative-one-text': '--p-color-decorative-one-text', // rgba(61, 40, 0, 1)
  '--p-decorative-two-icon': '--p-color-decorative-two-icon', // rgba(175, 41, 78, 1)
  '--p-decorative-two-surface': '--p-color-decorative-two-surface', // rgba(255, 196, 176, 1)
  '--p-decorative-two-text': '--p-color-decorative-two-text', // rgba(73, 11, 28, 1)
  '--p-decorative-three-icon': '--p-color-decorative-three-icon', // rgba(0, 109, 65, 1)
  '--p-decorative-three-surface': '--p-color-decorative-three-surface', // rgba(146, 230, 181, 1)
  '--p-decorative-three-text': '--p-color-decorative-three-text', // rgba(0, 47, 25, 1)
  '--p-decorative-four-icon': '--p-color-decorative-four-icon', // rgba(0, 106, 104, 1)
  '--p-decorative-four-surface': '--p-color-decorative-four-surface', // rgba(145, 224, 214, 1)
  '--p-decorative-four-text': '--p-color-decorative-four-text', // rgba(0, 45, 45, 1)
  '--p-decorative-five-icon': '--p-color-decorative-five-icon', // rgba(174, 43, 76, 1)
  '--p-decorative-five-surface': '--p-color-decorative-five-surface', // rgba(253, 201, 208, 1)
  '--p-decorative-five-text': '--p-color-decorative-five-text', // rgba(79, 14, 31, 1)
};
