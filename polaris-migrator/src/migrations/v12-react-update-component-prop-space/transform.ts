import type {FileInfo, API} from 'jscodeshift';

import {replacementMaps} from '../v12-styles-replace-custom-property-space/transform';
import reactUpdateComponentProp from '../react-update-component-prop/transform';
import type {ComponentFromPropsMap} from '../react-update-component-prop/utils';
import {getReplacementMaps} from '../react-update-component-prop/utils';

const normalizedReplacementMap = Object.fromEntries(
  Object.entries(replacementMaps['/.+/']).map(([fromValue, toValue]) => [
    fromValue.replace('--p-space-', ''),
    toValue.replace('--p-space-', ''),
  ]),
);

const componentFromPropsMap: ComponentFromPropsMap = {
  Bleed: [
    'marginInline',
    'marginBlock',
    'marginBlockStart',
    'marginBlockEnd',
    'marginInlineStart',
    'marginInlineEnd',
  ],
  BlockStack: ['gap'],
  Box: [
    'padding',
    'paddingBlockStart',
    'paddingBlockEnd',
    'paddingInlineStart',
    'paddingInlineEnd',
    'insetBlockStart',
    'insetBlockEnd',
    'insetInlineStart',
    'insetInlineEnd',
  ],
  Card: ['padding'],
  Checkbox: [
    'bleed',
    'bleedBlockStart',
    'bleedBlockEnd',
    'bleedInlineStart',
    'bleedInlineEnd',
  ],
  Choice: [
    'bleed',
    'bleedBlockStart',
    'bleedBlockEnd',
    'bleedInlineStart',
    'bleedInlineEnd',
  ],
  Grid: ['gap', 'gapX', 'gapY'],
  HorizontalGrid: ['gap'],
  HorizontalStack: ['gap'],
  InlineGrid: ['gap'],
  InlineStack: ['gap'],
  RadioButton: [
    'bleed',
    'bleedBlockStart',
    'bleedBlockEnd',
    'bleedInlineStart',
    'bleedInlineEnd',
  ],
  Stack: ['gap'],
  Tooltip: ['padding'],
  VerticalStack: ['gap'],
};

export default function transformer(fileInfo: FileInfo, _: API) {
  return reactUpdateComponentProp(fileInfo, _, {
    replacementMaps: getReplacementMaps(
      componentFromPropsMap,
      normalizedReplacementMap,
    ),
  });
}
