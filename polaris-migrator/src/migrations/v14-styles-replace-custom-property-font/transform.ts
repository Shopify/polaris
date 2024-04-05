import type {FileInfo, API} from 'jscodeshift';

import stylesReplaceCustomProperty from '../styles-replace-custom-property/transform';

export default function transformer(fileInfo: FileInfo, _: API) {
  return stylesReplaceCustomProperty(fileInfo, _, {replacementMaps});
}

const replacementMaps = {
  '/.+/': {
    '--p-font-size-800': '--p-font-size-750',
    '--p-font-size-900': '--p-font-size-750',
    '--p-font-size-1000': '--p-font-size-750',
    '--p-font-letter-spacing-densest': '--p-font-letter-spacing-denser',
    '--p-font-line-height-1200': '--p-font-line-height-1000',
  },
};
