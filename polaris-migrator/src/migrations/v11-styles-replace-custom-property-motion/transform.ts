import type {FileInfo, API} from 'jscodeshift';

import stylesReplaceCustomProperty from '../styles-replace-custom-property/transform';

export default function transformer(fileInfo: FileInfo, _: API) {
  return stylesReplaceCustomProperty(fileInfo, _, {replacementMaps});
}

const replacementMaps = {
  '/.+/': {
    '--p-linear': '--p-motion-linear',
    '--p-ease-in-out': '--p-motion-ease-in-out',
    '--p-ease-out': '--p-motion-ease-out',
    '--p-ease-in': '--p-motion-ease-in',
    '--p-ease': '--p-motion-ease',
    '--p-duration-0': '--p-motion-duration-0',
    '--p-duration-50': '--p-motion-duration-50',
    '--p-duration-100': '--p-motion-duration-100',
    '--p-duration-150': '--p-motion-duration-150',
    '--p-duration-200': '--p-motion-duration-200',
    '--p-duration-250': '--p-motion-duration-250',
    '--p-duration-300': '--p-motion-duration-300',
    '--p-duration-350': '--p-motion-duration-350',
    '--p-duration-400': '--p-motion-duration-400',
    '--p-duration-450': '--p-motion-duration-450',
    '--p-duration-500': '--p-motion-duration-500',
    '--p-duration-5000': '--p-motion-duration-5000',
    '--p-keyframes-bounce': '--p-motion-keyframes-bounce',
    '--p-keyframes-fade-in': '--p-motion-keyframes-fade-in',
    '--p-keyframes-pulse': '--p-motion-keyframes-pulse',
    '--p-keyframes-spin': '--p-motion-keyframes-spin',
    '--p-keyframes-appear-above': '--p-motion-keyframes-appear-above',
    '--p-keyframes-appear-below': '--p-motion-keyframes-appear-below',
  },
};
