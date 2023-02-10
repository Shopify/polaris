import type {FileInfo, API} from 'jscodeshift';

import stylesReplaceCustomProperty from '../styles-replace-custom-property/styles-replace-custom-property';

const replacementMaps = {
  '/.+/': {
    '--p-badge-font-weight': '--p-font-weight-regular',
    '--p-button-font-weight': '--p-font-weight-medium',
  },
};

export default function stylesReplaceCustomPropertyFont(
  fileInfo: FileInfo,
  _: API,
) {
  return stylesReplaceCustomProperty(fileInfo, _, {replacementMaps});
}
