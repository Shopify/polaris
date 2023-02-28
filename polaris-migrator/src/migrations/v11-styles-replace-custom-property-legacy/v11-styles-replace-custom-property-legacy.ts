/* eslint-disable line-comment-position */
import type {FileInfo, API} from 'jscodeshift';

import stylesReplaceCustomProperty from '../styles-replace-custom-property/styles-replace-custom-property';

const allMap = {
  '--p-override-loading-z-index': '--p-z-index-6',
  '--p-choice-margin': '--p-space-025',
  '--p-control-border-width': '--p-border-width-2',
  // '--p-banner-border-default':
  //   'inset 0 (--p-border-width-1) 0 0 var(--p-color-border-strong), inset 0 0 0 (--p-border-width-1) var(--p-color-border-strong)',
  // '--p-banner-border-success':
  //   'inset 0 (--p-border-width-1) 0 0 var(--p-color-border-success-subdued), inset 0 0 0 (--p-border-width-1) var(--p-color-border-success-subdued)',
  // '--p-banner-border-highlight':
  //   'inset 0 (--p-border-width-1) 0 0 var(--p-color-border-info-subdued), inset 0 0 0 (--p-border-width-1) var(--p-color-border-info-subdued)',
  // '--p-banner-border-warning':
  //   'inset 0 (--p-border-width-1) 0 0 var(--p-color-border-caution-subdued), inset 0 0 0 (--p-border-width-1) var(--p-color-border-caution-subdued)',
  // '--p-banner-border-critical':
  //   'inset 0 (--p-border-width-1) 0 0 var(--p-color-border-critical-subdued), inset 0 0 0 (--p-border-width-1) var(--p-color-border-critical-subdued)',
  // '--p-thin-border-subdued':
  //   'var(--p-border-width-1) solid var(--p-color-border-subdued)',
  // The following custom properties are overridden in the spaceMap
  '--p-frame-offset': '0',
  '--p-choice-size': '20px', // 20px/1.25rem
  '--p-icon-size-small': '8px', // 8px/0.5rem
  '--p-icon-size-medium': '20px', // 20px/1.25rem
  '--p-text-field-spinner-offset': '2px', // 2px/0.125rem
  '--p-text-field-focus-ring-offset': '-4px', // -4px/-0.25rem
  '--p-range-slider-thumb-size-base': '16px', // 16px/1rem
  '--p-range-slider-thumb-size-active': '24px', // 24px/1.5rem
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

export default function v11StylesReplaceCustomPropertyLegacy(
  fileInfo: FileInfo,
  _: API,
) {
  return stylesReplaceCustomProperty(fileInfo, _, {replacementMaps});
}
