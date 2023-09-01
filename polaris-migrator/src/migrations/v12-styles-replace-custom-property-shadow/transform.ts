import type {FileInfo, API} from 'jscodeshift';

import stylesReplaceCustomProperty from '../styles-replace-custom-property/transform';

export default function transformer(fileInfo: FileInfo, _: API) {
  return stylesReplaceCustomProperty(fileInfo, _, {replacementMaps});
}

const replacementMaps = {
  '/.+/': {
    '--p-shadow-XX': '--p-shadow-XX',
  },
};
