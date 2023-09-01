import type {FileInfo, API} from 'jscodeshift';

import stylesReplaceCustomProperty from '../styles-replace-custom-property/transform';

export default function transformer(fileInfo: FileInfo, _: API) {
  return stylesReplaceCustomProperty(fileInfo, _, {replacementMaps});
}

const allMap = {
  '--p-color-X': '--p-color-XX',

  // Color
  '--p-color-XX': '--p-color-XX',

  // Background
  '--p-color-XXX': '--p-color-XX',

  // Border
  '--p-color-XXXX': '--p-color-XX',

  // Fill
  '--p-color-XXXXX': '--p-color-XX',
};

const colorMap = {
  ...allMap,
  '--p-color-XX': '--p-color-XX',
};

const backgroundColorMap = {
  ...allMap,
  '--p-color-XX': '--p-color-XX',
};

const borderColorMap = {
  ...allMap,
  '--p-color-XX': '--p-color-XX',
};

const fillColorMap = {
  ...allMap,
  '--p-color-XX': '--p-color-XX',
};

const replacementMaps = {
  color: colorMap,
  '/^background/': backgroundColorMap,
  '/^border/': borderColorMap,
  '/^outline/': borderColorMap,
  fill: fillColorMap,
  '/.+/': allMap,
};
