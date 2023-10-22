import type {FileInfo, API} from 'jscodeshift';

import stylesReplaceCustomProperty from '../styles-replace-custom-property/transform';

export default function transformer(fileInfo: FileInfo, _: API) {
  return stylesReplaceCustomProperty(fileInfo, _, {replacementMaps});
}

const replacementMaps = {
  '/.+/': {
    '--p-space-05': '--p-space-050',
    '--p-space-1': '--p-space-100',
    '--p-space-1_5-experimental': '--p-space-150',
    '--p-space-2': '--p-space-200',
    '--p-space-3': '--p-space-300',
    '--p-space-4': '--p-space-400',
    '--p-space-5': '--p-space-500',
    '--p-space-6': '--p-space-600',
    '--p-space-8': '--p-space-800',
    '--p-space-10': '--p-space-1000',
    '--p-space-12': '--p-space-1200',
    '--p-space-16': '--p-space-1600',
    '--p-space-20': '--p-space-2000',
    '--p-space-24': '--p-space-2400',
    '--p-space-28': '--p-space-2800',
    '--p-space-32': '--p-space-3200',
  },
};
