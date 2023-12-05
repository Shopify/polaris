/* eslint-disable line-comment-position */
import type {FileInfo, API} from 'jscodeshift';

import stylesReplaceCustomProperty from '../styles-replace-custom-property/transform';

export default function transformer(fileInfo: FileInfo, _: API) {
  return stylesReplaceCustomProperty(fileInfo, _, {replacementMaps});
}

const allMap = {
  '--p-override-loading-z-index': '--p-z-index-6',
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
  '--p-thin-border-subdued':
    'var(--p-border-width-1) solid var(--p-color-border-subdued)',
  // The following custom properties are overridden in the spaceMap
  '--p-frame-offset': '0',
  '--p-choice-size': '1.25rem', // 20px
  '--p-icon-size-small': '0.5rem', // 8px
  '--p-icon-size-medium': '1.25rem', // 20px
  '--p-text-field-spinner-offset': '0.125rem', // 2px
  '--p-text-field-focus-ring-offset': '-0.25rem', // -4px
  '--p-range-slider-thumb-size-base': '1rem', // 16px
  '--p-range-slider-thumb-size-active': '1.5rem', // 24px
  '--p-button-group-item-spacing': 'calc(-1 * var(--p-space-025))',
};

const spaceMap = {
  ...allMap,
  '--p-choice-size': 'var(--p-space-5)', // 20px
  '--p-icon-size-small': 'var(--p-space-2)', // 8px
  '--p-icon-size-medium': 'var(--p-space-5)', // 20px
  '--p-text-field-spinner-offset': 'var(--p-space-05)', // 2px
  '--p-text-field-focus-ring-offset': 'calc(-1 * var(--p-space-1))', // -4px
  '--p-range-slider-thumb-size-base': 'var(--p-space-4)', // 16px
  '--p-range-slider-thumb-size-active': 'var(--p-space-6)', // 24px
};

const replacementMaps = {
  '/^padding/': spaceMap,
  '/^margin/': spaceMap,
  '/.+/': allMap,
};
