import type {FileInfo, API} from 'jscodeshift';

import {replacementMaps} from '../v12-styles-replace-custom-property-border/transform';
import reactUpdateComponentProp from '../react-update-component-prop/transform';
import type {ComponentFromPropsMap} from '../react-update-component-prop/utils';
import {getReplacementMaps} from '../react-update-component-prop/utils';

const radiusReplacementMap = Object.fromEntries(
  Object.entries(replacementMaps['/.+/']).filter(
    ([key]) => !key.includes('border-width'),
  ),
);

const normalizedReplacementMap = Object.fromEntries(
  Object.entries(radiusReplacementMap).map(([fromValue, toValue]) => [
    fromValue.replace('--p-border-radius-', ''),
    toValue.replace('--p-border-radius-', ''),
  ]),
);

const componentFromPropsMap: ComponentFromPropsMap = {
  Box: [
    'borderRadius',
    'borderEndStartRadius',
    'borderEndEndRadius',
    'borderStartStartRadius',
    'borderStartEndRadius',
  ],
  Tooltip: ['borderRadius'],
};

export default function transformer(fileInfo: FileInfo, _: API) {
  return reactUpdateComponentProp(fileInfo, _, {
    replacementMaps: getReplacementMaps(
      componentFromPropsMap,
      normalizedReplacementMap,
    ),
  });
}
