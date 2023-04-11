import type {FileInfo, API} from 'jscodeshift';

import stylesReplaceCustomProperty from '../styles-replace-custom-property/transform';
import {scss} from '../../utilities/constants';

export const extensions = scss.extensions;

export default function transformer(fileInfo: FileInfo, _: API) {
  return stylesReplaceCustomProperty(fileInfo, _, {replacementMaps});
}

const replacementMaps = {
  '/.+/': {
    '--p-duration-1-0-0': '--p-duration-100',
    '--p-duration-1-5-0': '--p-duration-150',
  },
};
