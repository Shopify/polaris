import type {FileInfo, API} from 'jscodeshift';

import stylesReplaceCustomProperty from '../styles-replace-custom-property/styles-replace-custom-property';

const replacementMaps = {
  '/.+/': {
    '--p-duration-1-0-0': '--p-duration-100',
    '--p-duration-1-5-0': '--p-duration-150',
    '--p-duration-0': '0ms',
  },
};

export default function v11StylesReplaceCustomPropertyMotion(
  fileInfo: FileInfo,
  _: API,
) {
  return stylesReplaceCustomProperty(fileInfo, _, {replacementMaps});
}
