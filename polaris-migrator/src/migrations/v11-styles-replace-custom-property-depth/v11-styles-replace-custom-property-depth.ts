import type {FileInfo, API} from 'jscodeshift';

import stylesReplaceCustomProperty from '../styles-replace-custom-property/styles-replace-custom-property';

const replacementMaps = {
  '/.+/': {
    '--p-shadow-transparent': '--p-shadow-none',
    '--p-shadow-faint': '--p-shadow-sm',
    '--p-shadow-base': '--p-shadow-md',
    '--p-shadow-deep': '--p-shadow-md',
    '--p-shadow-button': '--p-shadow-sm',
    '--p-shadow-top-bar': '--p-shadow-sm',
    '--p-shadow-card': '--p-shadow-md',
    '--p-shadow-popover': '--p-shadow-xl',
    '--p-shadow-layer': '--p-shadow-2xl',
    '--p-shadow-modal': '--p-shadow-2xl',
    '--p-shadows-inset-button': '--p-shadow-none',
    '--p-shadows-inset-button-pressed': '--p-shadow-inset-md',
  },
};

export default function v11StylesReplaceCustomPropertyDepth(
  fileInfo: FileInfo,
  _: API,
) {
  return stylesReplaceCustomProperty(fileInfo, _, {replacementMaps});
}
