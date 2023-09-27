import type {FileInfo, API} from 'jscodeshift';

import stylesReplaceCustomProperty from '../styles-replace-custom-property/transform';

export default function transformer(fileInfo: FileInfo, _: API) {
  return stylesReplaceCustomProperty(fileInfo, _, {replacementMaps});
}

const replacementMaps = {
  '/.+/': {
    '--p-border-radius-0-experimental': '--p-border-radius-0',
    '--p-border-radius-05': '--p-border-radius-050',
    '--p-border-radius-1': '--p-border-radius-100',
    '--p-border-radius-1_5-experimental': '--p-border-radius-150',
    '--p-border-radius-2': '--p-border-radius-200',
    '--p-border-radius-3': '--p-border-radius-300',
    '--p-border-radius-4': '--p-border-radius-400',
    '--p-border-radius-5': '--p-border-radius-500',
    '--p-border-radius-6': '--p-border-radius-750',
    '--p-border-width-1': '--p-border-width-025',
    '--p-border-width-1-experimental': '--p-border-width-0165',
    '--p-border-width-2': '--p-border-width-050',
    '--p-border-width-2-experimental': '--p-border-width-025',
    '--p-border-width-3': '--p-border-width-050',
    '--p-border-width-4': '--p-border-width-100',
    '--p-border-width-5': '--p-border-width-100',
  },
};
