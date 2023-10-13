import type {FileInfo, API, Options} from 'jscodeshift';

import type {
  ReplacementMaps,
  ReplacementOptions,
} from '../react-update-component-prop/transform';
import reactUpdateComponentProp from '../react-update-component-prop/transform';
import {
  replacementMap1,
  replacementMap2,
} from '../v12-styles-replace-custom-property-color/transform';

export interface MigrationOptions extends Options {
  step: number;
}

export default function transformer(
  fileInfo: FileInfo,
  _: API,
  options: MigrationOptions,
) {
  if (options.step === 1) {
    return reactUpdateComponentProp(fileInfo, _, {
      replacementMaps: generateMigrationReplacementMap(replacementMap1),
    });
  } else if (options.step === 2) {
    return reactUpdateComponentProp(fileInfo, _, {
      replacementMaps: generateMigrationReplacementMap(replacementMap2),
    });
  }
  throw new Error('Invalid step');
}

function generateMigrationReplacementMap(replacementMap: {
  [key: string]: string;
}) {
  const componentPropReplacements = {
    Box: ['background', 'borderColor', 'outlineColor', 'color'],
    Card: ['background'],
    Divider: ['borderColor'],
    Banner: ['textColor'],
  };

  const componentMigrations: ReplacementMaps = {};

  Object.entries(componentPropReplacements).forEach(
    ([componentName, fromProps]) => {
      const replacementOptions: ReplacementOptions[] = [];
      fromProps.forEach((fromProp) => {
        Object.entries(replacementMap).forEach(([key, value]) => {
          const fromValue = key.replace('--p-color-', '');
          const toValue = value.replace('--p-color-', '');

          replacementOptions.push({
            fromProp,
            toProp: fromProp,
            fromValue,
            toValue,
          });
        });
        componentMigrations[componentName] = replacementOptions;
      });
    },
  );

  return componentMigrations;
}
