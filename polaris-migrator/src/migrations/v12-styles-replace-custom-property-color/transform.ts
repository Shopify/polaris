import type {FileInfo, API, Options} from 'jscodeshift';

export interface MigrationOptions extends Options {
  step: number;
}

export default function transformer(
  fileInfo: FileInfo,
  _: API,
  options: MigrationOptions,
) {
  if (options.step === 1) {
    return stylesReplaceCustomPropertyRegExp(fileInfo, _, {
      replacementMap: replacementMap1,
    });
  } else if (options.step === 2) {
    return stylesReplaceCustomPropertyRegExp(fileInfo, _, {
      replacementMap: replacementMap2,
    });
  }
  throw new Error('Invalid step');
}

const replacementMap1 = {
  '--p-color-avatar-background-experimental': '--p-color-avatar-bg-fill',
  '--p-color-avatar-color-experimental': '--p-color-avatar-text-on-bg-fill',
  '--p-color-avatar-style-five-background-experimental':
    '--p-color-avatar-five-bg-fill',
  '--p-color-avatar-style-five-color-experimental':
    '--p-color-avatar-five-text-on-bg-fill',
  '--p-color-avatar-style-four-background-experimental':
    '--p-color-avatar-four-bg-fill',
  '--p-color-avatar-style-four-color-experimental':
    '--p-color-avatar-four-text-on-bg-fill',
  '--p-color-avatar-style-one-background-experimental':
    '--p-color-avatar-one-bg-fill',
  '--p-color-avatar-style-one-color-experimental':
    '--p-color-avatar-one-text-on-bg-fill',
  '--p-color-avatar-style-three-background-experimental':
    '--p-color-avatar-three-bg-fill',
  '--p-color-avatar-style-three-color-experimental':
    '--p-color-avatar-three-text-on-bg-fill',
  '--p-color-avatar-style-two-background-experimental':
    '--p-color-avatar-two-bg-fill',
  '--p-color-avatar-style-two-color-experimental':
    '--p-color-avatar-two-text-on-bg-fill',
  '--p-color-bg-active': '--p-color-bg-surface-active',
  '--p-color-bg-app-active': '--p-color-bg-surface-active',
  '--p-color-bg-app-hover': '--p-color-bg-surface-hover',
  '--p-color-bg-app-selected': '--p-color-bg-surface-selected',
  '--p-color-bg-backdrop-experimental': '--p-color-backdrop-bg',
  '--p-color-bg-caution-strong': '--p-color-bg-fill-caution',
  '--p-color-bg-caution-subdued-active': '--p-color-bg-surface-caution-active',
  '--p-color-bg-caution-subdued-hover': '--p-color-bg-surface-caution-hover',
  '--p-color-bg-caution-subdued': '--p-color-bg-surface-caution',
  '--p-color-bg-caution': '--p-color-bg-fill-caution-secondary',
  '--p-color-bg-critical-strong-active': '--p-color-bg-fill-critical-active',
  '--p-color-bg-critical-strong-hover': '--p-color-bg-fill-critical-hover',
  '--p-color-bg-critical-strong': '--p-color-bg-fill-critical',
  '--p-color-bg-critical-subdued-active':
    '--p-color-bg-surface-critical-active',
  '--p-color-bg-critical-subdued-hover': '--p-color-bg-surface-critical-hover',
  '--p-color-bg-critical-subdued': '--p-color-bg-surface-critical',
  '--p-color-bg-critical': '--p-color-bg-fill-critical-secondary',
  '--p-color-bg-disabled': '--p-color-bg-surface-disabled',
  '--p-color-bg-hover': '--p-color-bg-surface-hover',
  '--p-color-bg-info-strong': '--p-color-bg-fill-info',
  '--p-color-bg-info-subdued-active': '--p-color-bg-surface-info-active',
  '--p-color-bg-info-subdued-hover': '--p-color-bg-surface-info-hover',
  '--p-color-bg-info-subdued': '--p-color-bg-surface-info',
  '--p-color-bg-info': '--p-color-bg-fill-info-secondary',
  '--p-color-bg-input-active-experimental': '--p-color-input-bg-surface-active',
  '--p-color-bg-input-hover-experimental': '--p-color-input-bg-surface-hover',
  '--p-color-bg-input': '--p-color-input-bg-surface',
  '--p-color-bg-inset-strong': '--p-color-bg-fill-inverse',
  '--p-color-bg-inset': '--p-color-bg-fill-secondary',
  '--p-color-bg-interactive': '--p-color-bg-fill-brand',
  '--p-color-bg-interactive-active': '--p-color-bg-fill-brand-active',
  '--p-color-bg-interactive-disabled': '--p-color-bg-surface-disabled',
  '--p-color-bg-interactive-hover': '--p-color-bg-fill-brand-hover',
  '--p-color-bg-interactive-selected': '--p-color-bg-surface-brand-selected',
  '--p-color-bg-interactive-subdued': '--p-color-bg-surface-brand',
  '--p-color-bg-interactive-subdued-active':
    '--p-color-bg-surface-brand-active',
  '--p-color-bg-interactive-subdued-hover': '--p-color-bg-surface-brand-hover',
  '--p-color-bg-inverse-active': '--p-color-bg-fill-inverse-active',
  '--p-color-bg-inverse-hover': '--p-color-bg-fill-inverse-hover',
  '--p-color-bg-magic-active': '--p-color-bg-fill-magic-secondary-active',
  '--p-color-bg-magic-hover': '--p-color-bg-fill-magic-secondary-hover',
  '--p-color-bg-magic-strong': '--p-color-bg-fill-magic',
  '--p-color-bg-magic-subdued-hover': '--p-color-bg-surface-magic-hover',
  '--p-color-bg-magic-subdued': '--p-color-bg-surface-magic',
  '--p-color-bg-magic': '--p-color-bg-fill-magic-secondary',
  '--p-color-bg-primary-active': '--p-color-bg-fill-brand-active',
  '--p-color-bg-primary-disabled-experimental':
    '--p-color-bg-fill-brand-disabled',
  '--p-color-bg-primary-hover': '--p-color-bg-fill-brand-hover',
  '--p-color-bg-primary-subdued-active': '--p-color-bg-surface-brand-active',
  '--p-color-bg-primary-subdued-hover': '--p-color-bg-surface-brand-hover',
  '--p-color-bg-primary-subdued-selected':
    '--p-color-bg-surface-brand-selected',
  '--p-color-bg-primary-subdued': '--p-color-bg-surface-brand',
  '--p-color-bg-primary': '--p-color-bg-fill-brand',
  '--p-color-bg-secondary-experimental': '--p-color-bg-surface-tertiary',
  '--p-color-bg-strong-active': '--p-color-bg-fill-tertiary-active',
  '--p-color-bg-strong-hover': '--p-color-bg-fill-tertiary-hover',
  '--p-color-bg-strong': '--p-color-bg-fill-tertiary',
  '--p-color-bg-subdued-active': '--p-color-bg-surface-secondary-active',
  '--p-color-bg-subdued-hover': '--p-color-bg-surface-secondary-hover',
  '--p-color-bg-subdued': '--p-color-bg-surface-secondary',
  '--p-color-bg-success-strong-active-experimental':
    '--p-color-bg-fill-success-active',
  '--p-color-bg-success-strong-hover-experimental':
    '--p-color-bg-fill-success-hover',
  '--p-color-bg-success-strong': '--p-color-bg-fill-success',
  '--p-color-bg-success-subdued-active': '--p-color-bg-surface-success-active',
  '--p-color-bg-success-subdued-hover': '--p-color-bg-surface-success-hover',
  '--p-color-bg-success-subdued': '--p-color-bg-surface-success',
  '--p-color-bg-success': '--p-color-bg-fill-success-secondary',
  '--p-color-bg-transparent-active-experimental':
    '--p-color-bg-fill-transparent-active',
  '--p-color-bg-transparent-disabled-experimental':
    '--p-color-bg-fill-disabled',
  '--p-color-bg-transparent-experimental': '--p-color-bg-surface-transparent',
  '--p-color-bg-transparent-hover-experimental':
    '--p-color-bg-fill-transparent-hover',
  '--p-color-bg-transparent-primary-disabled-experimental':
    '--p-color-bg-fill-brand-disabled',
  '--p-color-bg-transparent-subdued-experimental':
    '--p-color-bg-fill-transparent-secondary',
  '--p-color-bg-warning-strong-experimental': '--p-color-bg-fill-warning',
  '--p-color-bg-warning-subdued-experimental': '--p-color-bg-surface-warning',
  '--p-color-bg-warning': '--p-color-bg-fill-warning-secondary',
  '--p-color-bg': '--p-color-bg-surface',
  '--p-color-border-caution-subdued': '--p-color-border-caution',
  '--p-color-border-critical-active': '--p-color-border-critical',
  '--p-color-border-critical-hover': '--p-color-border-critical',
  '--p-color-border-critical-strong-experimental':
    '--p-color-border-critical-secondary',
  '--p-color-border-critical-subdued': '--p-color-border-critical',
  '--p-color-border-info-subdued': '--p-color-border-info',
  '--p-color-border-input-active-experimental': '--p-color-input-border-active',
  '--p-color-border-input-hover': '--p-color-input-border-hover',
  '--p-color-border-input': '--p-color-input-border',
  '--p-color-border-interactive-active': '--p-color-border-emphasis-active',
  '--p-color-border-interactive-disabled': '--p-color-border-disabled',
  '--p-color-border-interactive-focus': '--p-color-border-focus',
  '--p-color-border-interactive-hover': '--p-color-border-emphasis-hover',
  '--p-color-border-interactive': '--p-color-border-emphasis',
  '--p-color-border-magic-strong': '--p-color-border-magic-secondary',
  '--p-color-border-primary': '--p-color-border-brand',
  '--p-color-border-strong': '--p-color-border-tertiary',
  '--p-color-border-strong-hover': '--p-color-border-tertiary',
  '--p-color-border-subdued': '--p-color-border-secondary',
  '--p-color-border-success-subdued': '--p-color-border-success',
  '--p-color-icon-critical-strong-active-experimental':
    '--p-color-text-critical-active',
  '--p-color-icon-critical-strong-experimental': '--p-color-text-critical',
  '--p-color-icon-critical-strong-hover-experimental':
    '--p-color-text-critical-hover',
  '--p-color-icon-info-strong-experimental': '--p-color-text-info',
  '--p-color-icon-interactive-active': '--p-color-icon-emphasis-active',
  '--p-color-icon-interactive-disabled': '--p-color-icon-disabled',
  '--p-color-icon-interactive-hover': '--p-color-icon-emphasis-hover',
  '--p-color-icon-interactive': '--p-color-icon-emphasis',
  '--p-color-icon-primary': '--p-color-icon-brand',
  '--p-color-icon-subdued': '--p-color-icon-secondary',
  '--p-color-icon-success-strong-experimental': '--p-color-text-success',
  '--p-color-icon-warning-strong-experimental': '--p-color-text-warning',
  '--p-color-text-caution-strong': '--p-color-text-caution',
  '--p-color-text-critical-hover-experimental': '--p-color-text-critical-hover',
  '--p-color-text-critical-strong': '--p-color-text-critical',
  '--p-color-text-info-strong': '--p-color-text-info-on-bg-fill',
  '--p-color-text-interactive-active': '--p-color-text-emphasis-active',
  '--p-color-text-interactive-disabled': '--p-color-text-disabled',
  '--p-color-text-interactive-hover': '--p-color-text-emphasis-hover',
  '--p-color-text-interactive-inverse': '--p-color-text-link-inverse',
  '--p-color-text-interactive': '--p-color-text-emphasis',
  '--p-color-text-inverse-subdued': '--p-color-text-inverse-secondary',
  '--p-color-text-magic-strong': '--p-color-text-magic',
  '--p-color-text-primary-hover': '--p-color-text-brand-hover',
  '--p-color-text-primary': '--p-color-text-brand',
  '--p-color-text-subdued': '--p-color-text-secondary',
  '--p-color-text-success-strong': '--p-color-text-success',
  '--p-color-text-warning-experimental': '--p-color-text-warning',
};

const replacementMap2 = {
  '--p-color-bg-app': '--p-color-bg',
};

function stylesReplaceCustomPropertyRegExp(
  fileInfo: FileInfo,
  _: API,
  options: {replacementMap: {[varName: string]: string}},
) {
  return Object.entries(options.replacementMap).reduce(
    (fileInfoSource, [fromToken, toToken]) =>
      fileInfoSource.replace(
        new RegExp(String.raw`${fromToken}(?![\w-])`, 'g'),
        toToken,
      ),
    fileInfo.source,
  );
}
