import type {FileInfo, API} from 'jscodeshift';

import {replacementMaps} from '../v12-styles-replace-custom-property-border/transform';
import reactUpdateComponentProp from '../react-update-component-prop/transform';
import type {ComponentReplacementOptions} from '../react-update-component-prop/utils';
import {getReplacementMaps} from '../react-update-component-prop/utils';

const widthReplacementMap = Object.fromEntries(
  Object.entries(replacementMaps['/.+/']).filter(
    ([key]) => !key.includes('border-radius'),
  ),
);

const normalizedReplacementMap = Object.fromEntries(
  Object.entries(widthReplacementMap).map(([fromValue, toValue]) => [
    fromValue.replace('--p-border-width-', ''),
    toValue.replace('--p-border-width-', ''),
  ]),
);

const componentReplacementOptions: ComponentReplacementOptions = {
  Box: [
    'borderWidth',
    'borderBlockStartWidth',
    'borderBlockEndWidth',
    'borderInlineStartWidth',
    'borderInlineEndWidth',
    'outlineWidth',
  ],
  Divider: ['borderWidth'],
};

export default function transformer(fileInfo: FileInfo, _: API) {
  return reactUpdateComponentProp(fileInfo, _, {
    replacementMaps: getReplacementMaps(
      componentReplacementOptions,
      normalizedReplacementMap,
    ),
  });
}
