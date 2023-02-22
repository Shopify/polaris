import type {FileInfo, API} from 'jscodeshift';

import stylesReplaceCustomProperty from '../styles-replace-custom-property/styles-replace-custom-property';

const replacementMaps = {
  '/.+/': {
    '--p-override-loading-z-index': '--p-z-index-6',
    '--p-choice-size': '20px',
    '--p-icon-size-small': '8px',
    '--p-icon-size-medium': '20px',
    '--p-choice-margin': '--p-space-025',
    '--p-control-border-width': '--p-border-radius-05',
    '--p-banner-border-default':
      'inset 0 (--p-border-width-1) 0 0 var(--p-border-strong), inset 0 0 0 (--p-border-width-1) var(--p-border-strong)',
    '--p-banner-border-success':
      'inset 0 (--p-border-width-1) 0 0 var(--p-border-success-subdued), inset 0 0 0 (--p-border-width-1) var(--p-border-success-subdued)',
    '--p-banner-border-highlight':
      'inset 0 (--p-border-width-1) 0 0 var(--p-border-info-subdued), inset 0 0 0 (--p-border-width-1) var(--p-border-info-subdued)',
    '--p-banner-border-warning':
      'inset 0 (--p-border-width-1) 0 0 var(--p-border-caution-subdued), inset 0 0 0 (--p-border-width-1) var(--p-border-caution-subdued)',
    '--p-banner-border-critical':
      'inset 0 (--p-border-width-1) 0 0 var(--p-border-critical-subdued), inset 0 0 0 (--p-border-width-1) var(--p-border-critical-subdued)',
    '--p-thin-border-subdued': '--p-border-base',
    '--p-text-field-spinner-offset': '2px',
    '--p-text-field-focus-ring-offset': '-4px',
    '--p-button-group-item-spacing': 'calc(-1 * var(--p-space-025))',
    '--p-range-slider-thumb-size-base': '16px',
    '--p-range-slider-thumb-size-active': '24px',
    '--p-frame-offset': '0',
  },
};

export default function v11StylesReplaceCustomPropertyLegacy(
  fileInfo: FileInfo,
  _: API,
) {
  return stylesReplaceCustomProperty(fileInfo, _, {replacementMaps});
}
