import type {FileInfo, API} from 'jscodeshift';

import stylesReplaceCustomProperty from '../styles-replace-custom-property/transform';

export default function transformer(fileInfo: FileInfo, _: API) {
  return stylesReplaceCustomProperty(fileInfo, _, {replacementMaps});
}

const replacementMaps = {
  '/.+/': {
    '--p-font-size-750': '--p-font-size-600',
    '--p-font-size-800': '--p-font-size-600',
    '--p-font-size-900': '--p-font-size-600',
    '--p-font-size-1000': '--p-font-size-600',
    '--p-font-letter-spacing-denser': '--p-font-letter-spacing-dense',
    '--p-font-letter-spacing-densest': '--p-font-letter-spacing-dense',
    '--p-font-line-height-1000': '--p-font-line-height-800',
    '--p-font-line-height-1200': '--p-font-line-height-800',
    '--p-text-heading-3xl-font-family': '--p-text-heading-xl-font-family',
    '--p-text-heading-3xl-font-size': '--p-text-heading-xl-font-size',
    '--p-text-heading-3xl-font-weight': '--p-text-heading-xl-font-weight',
    '--p-text-heading-3xl-font-letter-spacing':
      '--p-text-heading-xl-font-letter-spacing',
    '--p-text-heading-3xl-font-line-height':
      '--p-text-heading-xl-font-line-height',
    '--p-text-heading-2xl-font-family': '--p-text-heading-xl-font-family',
    '--p-text-heading-2xl-font-size': '--p-text-heading-xl-font-size',
    '--p-text-heading-2xl-font-weight': '--p-text-heading-xl-font-weight',
    '--p-text-heading-2xl-font-letter-spacing':
      '--p-text-heading-xl-font-letter-spacing',
    '--p-text-heading-2xl-font-line-height':
      '--p-text-heading-xl-font-line-height',
  },
};
