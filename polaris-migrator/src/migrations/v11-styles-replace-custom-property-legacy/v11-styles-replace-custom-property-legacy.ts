import type {FileInfo, API} from 'jscodeshift';

import stylesReplaceCustomProperty from '../styles-replace-custom-property/styles-replace-custom-property';

const replacementMaps = {
  '/.+/': {
    '--p-override-loading-z-index': '--p-z-index-6',
    '--p-choice-size': '1.25rem',
    '--p-icon-size-small': '0.5rem',
    '--p-icon-size-medium': '1.25rem',
    '--p-choice-margin': '--p-space-025',
    '--p-control-border-width': '--p-border-width-2',
    '--p-banner-border-default':
      'inset 0 (--p-border-width-1) 0 0 var(--p-color-border-strong), inset 0 0 0 (--p-border-width-1) var(--p-color-border-strong)',
    '--p-banner-border-success':
      'inset 0 (--p-border-width-1) 0 0 var(--p-color-border-success-subdued), inset 0 0 0 (--p-border-width-1) var(--p-color-border-success-subdued)',
    '--p-banner-border-highlight':
      'inset 0 (--p-border-width-1) 0 0 var(--p-color-border-info-subdued), inset 0 0 0 (--p-border-width-1) var(--p-color-border-info-subdued)',
    '--p-banner-border-warning':
      'inset 0 (--p-border-width-1) 0 0 var(--p-color-border-caution-subdued), inset 0 0 0 (--p-border-width-1) var(--p-color-border-caution-subdued)',
    '--p-banner-border-critical':
      'inset 0 (--p-border-width-1) 0 0 var(--p-color-border-critical-subdued), inset 0 0 0 (--p-border-width-1) var(--p-color-border-critical-subdued)',
    '--p-thin-border-subdued': '--p-border-base',
    '--p-text-field-spinner-offset': '0.125rem',
    '--p-text-field-focus-ring-offset': '-0.25rem',
    '--p-button-group-item-spacing': 'calc(-1 * var(--p-space-025))',
    '--p-range-slider-thumb-size-base': '1rem',
    '--p-range-slider-thumb-size-active': '1.5rem',
    '--p-frame-offset': '0',
  },
};

export default function v11StylesReplaceCustomPropertyLegacy(
  fileInfo: FileInfo,
  _: API,
) {
  return stylesReplaceCustomProperty(fileInfo, _, {replacementMaps});
}
