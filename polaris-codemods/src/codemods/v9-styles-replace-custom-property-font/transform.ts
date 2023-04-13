import type {FileInfo, API} from 'jscodeshift';

import stylesReplaceCustomProperty from '../styles-replace-custom-property/transform';
import {scss} from '../../utilities/constants';

export const extensions = scss.extensions;

export default function transformer(fileInfo: FileInfo, _: API) {
  return stylesReplaceCustomProperty(fileInfo, _, {replacementMaps});
}

const replacementMaps = {
  '/.+/': {
    '--p-badge-font-weight': '--p-font-weight-regular',
    '--p-button-font-weight': '--p-font-weight-medium',
  },
};
