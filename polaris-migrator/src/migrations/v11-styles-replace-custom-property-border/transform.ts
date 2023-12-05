import type {FileInfo, API} from 'jscodeshift';

import stylesReplaceCustomProperty from '../styles-replace-custom-property/transform';

export default function transformer(fileInfo: FileInfo, _: API) {
  return stylesReplaceCustomProperty(fileInfo, _, {replacementMaps});
}

const replacementMaps = {
  '/.+/': {
    '--p-border-radius-base': '--p-border-radius-1',
    '--p-border-radius-large': '--p-border-radius-2',
    '--p-border-radius-half': '--p-border-radius-full',
    '--p-border-base':
      'var(--p-border-width-1) solid var(--p-color-border-subdued)',
    '--p-border-dark': 'var(--p-border-width-1) solid var(--p-color-border)',
    '--p-border-transparent': 'var(--p-border-width-1) solid transparent',
    '--p-border-divider':
      'var(--p-border-width-1) solid var(--p-color-border-subdued)',
    '--p-border-divider-on-dark':
      'var(--p-border-width-1) solid var(--p-color-border-inverse)',
  },
};
