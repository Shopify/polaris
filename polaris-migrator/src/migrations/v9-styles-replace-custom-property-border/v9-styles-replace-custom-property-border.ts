/* eslint-disable line-comment-position */
import type {FileInfo, API} from 'jscodeshift';

import stylesReplaceCustomProperty from '../styles-replace-custom-property/styles-replace-custom-property';

const replacementMaps = {
  '/.+/': {
    '--p-border-radius-base': '--p-border-radius-1',
    '--p-border-radius-full': '--p-border-radius-half',
    '--p-border-radius-slim': '--p-border-radius-05',
    '--p-border-radius-wide': '--p-border-radius-2',
    '--p-text-field-focus-ring-border-radius': '0.4375rem', // 7px
  },
};

export default function v9StylesReplaceCustomPropertyBorder(
  fileInfo: FileInfo,
  _: API,
) {
  return stylesReplaceCustomProperty(fileInfo, _, {replacementMaps});
}
