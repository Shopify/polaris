import type {FileInfo, API} from 'jscodeshift';

import stylesReplaceCustomProperty from '../styles-replace-custom-property/styles-replace-custom-property';

const replacementMaps = {
  '/.+/': {
    '--p-shadow-transparent': '0 0 0 0 transparent',
  },
};

export default function v11StylesReplaceCustomPropertyDepth(
  fileInfo: FileInfo,
  _: API,
) {
  return stylesReplaceCustomProperty(fileInfo, _, {replacementMaps});
}
