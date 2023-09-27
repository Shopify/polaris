import type {FileInfo, API} from 'jscodeshift';

import stylesReplaceCustomProperty from '../styles-replace-custom-property/transform';

export default function transformer(fileInfo: FileInfo, _: API) {
  return stylesReplaceCustomProperty(fileInfo, _, {replacementMaps});
}

const replacementMaps = {
  '/.+/': {
    '--p-font-size-70-experimental': '--p-font-size-275',
    '--p-font-size-75': '--p-font-size-300',
    '--p-font-size-80-experimental': '--p-font-size-325',
    '--p-font-size-100': '--p-font-size-350',
    '--p-font-size-200': '--p-font-size-400',
    '--p-font-size-300': '--p-font-size-500',
    '--p-font-size-400': '--p-font-size-600',
    '--p-font-size-500': '--p-font-size-750',
    '--p-font-size-600': '--p-font-size-900',
    '--p-font-size-700': '--p-font-size-1000',
    '--p-font-line-height-075-experimental': '--p-font-line-height-300',
    '--p-font-line-height-1': '--p-font-line-height-400',
    '--p-font-line-height-2': '--p-font-line-height-500',
    '--p-font-line-height-3': '--p-font-line-height-600',
    '--p-font-line-height-4': '--p-font-line-height-700',
    '--p-font-line-height-5': '--p-font-line-height-800',
    '--p-font-line-height-6': '--p-font-line-height-1000',
    '--p-font-line-height-7': '--p-font-line-height-1200',
  },
};
