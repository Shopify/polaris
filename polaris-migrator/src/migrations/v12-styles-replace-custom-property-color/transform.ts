import type {FileInfo, API} from 'jscodeshift';

import stylesReplaceCustomProperty from '../styles-replace-custom-property/transform';

export default function transformer(fileInfo: FileInfo, _: API) {
  return stylesReplaceCustomProperty(fileInfo, _, {replacementMaps});
}

const replacementMaps = {
  '/.+/': {
    '--p-color-bg': '--p-color-surface',
    // '--p-color-bg-hover': '--p-color-surface-hover',
    // '--p-color-bg-active': '--p-color-surface-active',
    // '--p-color-bg-disabled': '--p-color-surface-disabled',
    '--p-color-bg-subdued': '--p-color-surface-secondary',
    '--p-color-bg-subdued-hover': '--p-color-surface-secondary-hover',
    '--p-color-bg-subdued-active': '--p-color-surface-secondary-active',
    '--p-color-bg-secondary-experimental': '--p-color-surface-tertiary',
    '--p-color-bg-strong': '--p-color-fill-tertiary',
    '--p-color-bg-strong-hover': '--p-color-fill-tertiary-hover',
    '--p-color-bg-strong-active': '--p-color-fill-tertiary-active',
    '--p-color-bg-input': '--p-color-input-surface',
    '--p-color-bg-input-hover-experimental': '--p-color-input-surface-hover',
    '--p-color-bg-input-active-experimental': '--p-color-input-surface-active',
    // '--p-color-bg-primary': '--p-color-fill-brand',
    // '--p-color-bg-primary-hover': '--p-color-fill-brand-hover',
    // '--p-color-bg-primary-active': '--p-color-fill-brand-active',
    // '--p-color-bg-primary-subdued': '--p-color-surface-brand',
    // '--p-color-bg-primary-subdued-hover': '--p-color-surface-brand-hover',
    // '--p-color-bg-primary-subdued-active': '--p-color-surface-brand-active',
    // '--p-color-bg-primary-subdued-selected': '--p-color-surface-brand-selected',
    '--p-color-bg-app-selected': '--p-color-surface-selected',
    '--p-color-bg-success-strong': '--p-color-fill-success',
    '--p-color-bg-success-strong-hover-experimental':
      '--p-color-fill-success-hover',
    '--p-color-bg-success-strong-active-experimental':
      '--p-color-fill-success-active',
    '--p-color-bg-success': '--p-color-fill-success-secondary',
    '--p-color-bg-success-subdued': '--p-color-surface-success',
    '--p-color-bg-success-subdued-hover': '--p-color-surface-success-hover',
    '--p-color-bg-success-subdued-active': '--p-color-surface-success-active',
    '--p-color-bg-critical-strong': '--p-color-fill-critical',
    '--p-color-bg-critical-strong-hover': '--p-color-fill-critical-hover',
    '--p-color-bg-critical-strong-active': '--p-color-fill-critical-active',
    '--p-color-bg-critical': '--p-color-fill-critical-secondary',
    '--p-color-bg-critical-subdued': '--p-color-surface-critical',
    '--p-color-bg-critical-subdued-hover': '--p-color-surface-critical-hover',
    '--p-color-bg-critical-subdued-active': '--p-color-surface-critical-active',
    '--p-color-bg-caution-strong': '--p-color-fill-caution',
    '--p-color-bg-caution': '--p-color-fill-caution-secondary',
    '--p-color-bg-caution-subdued': '--p-color-surface-caution',
    '--p-color-bg-caution-subdued-hover': '--p-color-surface-caution-hover',
    '--p-color-bg-caution-subdued-active': '--p-color-surface-caution-active',
    '--p-color-bg-info-strong': '--p-color-fill-info',
    '--p-color-bg-info': '--p-color-fill-info-secondary',
    '--p-color-bg-info-subdued': '--p-color-surface-info',
    '--p-color-bg-info-subdued-hover': '--p-color-surface-info-hover',
    '--p-color-bg-info-subdued-active': '--p-color-surface-info-active',
    '--p-color-bg-warning-strong-experimental': '--p-color-fill-warning',
    '--p-color-bg-warning': '--p-color-fill-warning-secondary',
    '--p-color-bg-warning-subdued-experimental': '--p-color-surface-warning',
    '--p-color-bg-magic-strong': '--p-color-fill-magic',
    '--p-color-bg-magic': '--p-color-fill-magic-secondary',
    '--p-color-bg-magic-hover': '--p-color-fill-magic-secondary-hover',
    '--p-color-bg-magic-active': '--p-color-fill-magic-secondary-active',
    // '--p-color-bg-magic-subdued': '--p-color-surface-magic',
    '--p-color-bg-magic-subdued-hover': '--p-color-surface-magic-hover',
    '--p-color-bg-inset': '--p-color-fill-secondary',
    '--p-color-bg-inset-strong': '--p-color-fill-inverse',
    '--p-color-bg-inverse-hover': '--p-color-fill-inverse-hover',
    '--p-color-bg-inverse-active': '--p-color-fill-inverse-active',
    '--p-color-bg-transparent-experimental': '--p-color-surface-transparent',
    '--p-color-bg-transparent-hover-experimental':
      '--p-color-fill-transparent-hover',
    '--p-color-bg-transparent-active-experimental':
      '--p-color-fill-transparent-active',
    '--p-color-bg-transparent-disabled-experimental': '--p-color-fill-disabled',
    '--p-color-bg-transparent-subdued-experimental':
      '--p-color-fill-transparent-secondary',
    '--p-color-bg-transparent-primary-disabled-experimental':
      '--p-color-fill-brand-disabled',
    '--p-color-bg-backdrop-experimental': '--p-color-backdrop-bg',
    '--p-color-avatar-background-experimental': '--p-color-avatar-fill',
    '--p-color-avatar-style-one-background-experimental':
      '--p-color-avatar-one-fill',
    '--p-color-avatar-style-two-background-experimental':
      '--p-color-avatar-two-fill',
    '--p-color-avatar-style-three-background-experimental':
      '--p-color-avatar-three-fill',
    '--p-color-avatar-style-four-background-experimental':
      '--p-color-avatar-four-fill',
    '--p-color-avatar-style-five-background-experimental':
      '--p-color-avatar-five-fill',
    '--p-color-text-subdued': '--p-color-text-secondary',
    '--p-color-text-interactive': '--p-color-text-emphasis',
    '--p-color-text-interactive-hover': '--p-color-text-emphasis-hover',
    '--p-color-text-interactive-active': '--p-color-text-emphasis-active',
    '--p-color-text-primary': '--p-color-text-brand',
    '--p-color-text-primary-hover': '--p-color-text-brand-hover',
    // '--p-color-text-critical-hover-experimental': '--p-color-text-critical-hover',
    '--p-color-text-info-strong': '--p-color-text-info-on-fill',
    // '--p-color-text-warning-experimental': '--p-color-text-warning',
    '--p-color-text-inverse-subdued': '--p-color-text-inverse-secondary',
    // '--p-color-text-interactive-inverse': '--p-color-link-inverse',
    '--p-color-avatar-color-experimental': '--p-color-avatar-text-on-fill',
    '--p-color-avatar-style-one-color-experimental':
      '--p-color-avatar-one-text-on-fill',
    '--p-color-avatar-style-two-color-experimental':
      '--p-color-avatar-two-text-on-fill',
    '--p-color-avatar-style-three-color-experimental':
      '--p-color-avatar-three-text-on-fill',
    '--p-color-avatar-style-four-color-experimental':
      '--p-color-avatar-four-text-on-fill',
    '--p-color-avatar-style-five-color-experimental':
      '--p-color-avatar-five-text-on-fill',
    '--p-color-icon-subdued': '--p-color-icon-secondary',
    '--p-color-icon-interactive': '--p-color-icon-emphasis',
    '--p-color-icon-interactive-hover': '--p-color-icon-emphasis-hover',
    '--p-color-icon-interactive-active': '--p-color-icon-emphasis-active',
    '--p-color-icon-primary': '--p-color-icon-brand',
    '--p-color-border-subdued': '--p-color-border-secondary',
    // '--p-color-border-strong': '--p-color-border-tertiary',
    '--p-color-border-input': '--p-color-input-border',
    '--p-color-border-input-hover': '--p-color-input-border-hover',
    '--p-color-border-input-active-experimental':
      '--p-color-input-border-active',
    // '--p-color-border-interactive': '--p-color-border-emphasis',
    '--p-color-border-interactive-hover': '--p-color-border-emphasis-hover',
    '--p-color-border-interactive-active': '--p-color-border-emphasis-active',
    '--p-color-border-interactive-focus': '--p-color-border-focus',
    '--p-color-border-primary': '--p-color-border-brand',
    '--p-color-border-critical-strong-experimental':
      '--p-color-border-critical-secondary',
    '--p-color-border-magic-strong': '--p-color-border-magic-secondary',
  },
};
