import type {FileInfo, API} from 'jscodeshift';

import stylesReplaceCustomProperty from '../styles-replace-custom-property/styles-replace-custom-property';

const replacementMaps = {
  '/.+/': {
    '--p-z-1': '--p-z-index-1',
    '--p-z-2': '--p-z-index-2',
    '--p-z-3': '--p-z-index-3',
    '--p-z-4': '--p-z-index-4',
    '--p-z-5': '--p-z-index-5',
    '--p-z-6': '--p-z-index-6',
    '--p-z-7': '--p-z-index-7',
    '--p-z-8': '--p-z-index-8',
    '--p-z-9': '--p-z-index-9',
    '--p-z-10': '--p-z-index-10',
    '--p-z-11': '--p-z-index-11',
    '--p-z-12': '--p-z-index-12',
  },
};

export default function stylesReplaceCustomPropertyZindex(
  fileInfo: FileInfo,
  _: API,
) {
  return stylesReplaceCustomProperty(fileInfo, _, {replacementMaps});
}
