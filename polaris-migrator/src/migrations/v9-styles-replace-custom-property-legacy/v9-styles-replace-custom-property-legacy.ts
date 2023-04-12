import type {FileInfo, API} from 'jscodeshift';

import stylesReplaceCustomProperty from '../styles-replace-custom-property/styles-replace-custom-property';

const replacementMaps = {
  '/.+/': {
    '--p-override-none': 'none',
    '--p-override-one': '1',
    '--p-override-visible': 'visible',
    '--p-override-zero': '0',
    '--p-override-transparent': 'transparent',
    '--p-non-null-content': '""',
    '--p-icon-size': '--p-icon-size-small',
    '--p-range-slider-thumb-scale': '1.5',
    '--p-badge-mix-blend-mode': 'luminosity',
  },
};

export default function v9StylesReplaceCustomPropertyLegacy(
  fileInfo: FileInfo,
  _: API,
) {
  return stylesReplaceCustomProperty(fileInfo, _, {replacementMaps});
}
