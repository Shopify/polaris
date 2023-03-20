import type {FileInfo, API} from 'jscodeshift';

import stylesReplaceCustomProperty from '../styles-replace-custom-property/transform';
import {scss} from '../../utilities/constants';

export const extensions = scss.extensions;

export default function transformer(fileInfo: FileInfo, _: API) {
  return stylesReplaceCustomProperty(fileInfo, _, {replacementMaps});
}

const replacementMaps = {
  '/.+/': {
    '--p-button-drop-shadow': '--p-shadow-button',
    '--p-button-inner-shadow': '--p-shadows-inset-button',
    '--p-button-pressed-inner-shadow': '--p-shadows-inset-button-pressed',
    '--p-card-shadow': '--p-shadow-card',
    '--p-modal-shadow': '--p-shadow-modal',
    '--p-popover-shadow': '--p-shadow-popover',
    '--p-top-bar-shadow': '--p-shadow-top-bar',
    '--p-shadow-from-ambient-light': 'rgba(23, 24, 24, 0.05)',
    '--p-shadow-from-dim-light': 'rgba(0, 0, 0, 0.2)',
    '--p-shadow-from-direct-light': 'rgba(0, 0, 0, 0.15)',
  },
};
