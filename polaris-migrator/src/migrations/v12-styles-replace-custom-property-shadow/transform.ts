import type {FileInfo, API} from 'jscodeshift';

import stylesReplaceCustomProperty from '../styles-replace-custom-property/transform';

export default function transformer(fileInfo: FileInfo, _: API) {
  return stylesReplaceCustomProperty(fileInfo, _, {replacementMaps});
}

const replacementMaps = {
  '/.+/': {
    '--p-shadow-inset-lg': '--p-shadow-inset-200',
    '--p-shadow-inset-md': '--p-shadow-inset-200',
    '--p-shadow-inset-sm': '--p-shadow-inset-100',
    '--p-shadow-none': '--p-shadow-0',
    '--p-shadow-xs': '--p-shadow-100',
    '--p-shadow-sm': '--p-shadow-200',
    '--p-shadow-md': '--p-shadow-300',
    '--p-shadow-lg': '--p-shadow-400',
    '--p-shadow-xl': '--p-shadow-500',
    '--p-shadow-2xl': '--p-shadow-600',
    '--p-shadow-bevel-experimental': '--p-shadow-bevel-100',
    '--p-shadow-card-sm-experimental': '--p-shadow-100',
    '--p-shadow-card-md-experimental': '--p-shadow-200',
    '--p-shadow-card-lg-experimental': '--p-shadow-300',
    '--p-shadow-button-experimental': '--p-shadow-button',
    '--p-shadow-button-hover-experimental': '--p-shadow-button-hover',
    '--p-shadow-button-disabled-experimental':
      'inset 0 0 0 1px rgba(227, 227, 227, 1)',
    '--p-shadow-button-primary-strong-experimental':
      '--p-shadow-button-primary',
    '--p-shadow-button-primary-strong-inset-experimental':
      '--p-shadow-button-primary-inset',
    '--p-shadow-button-primary-strong-hover-experimental':
      '--p-shadow-button-primary-hover',
    '--p-shadow-border-inset-experimental': '--p-shadow-border-inset',
  },
};
