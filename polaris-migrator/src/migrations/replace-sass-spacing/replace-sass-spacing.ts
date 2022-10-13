import type {FileInfo, API, Options} from 'jscodeshift';
import postcss, {Plugin} from 'postcss';
import valueParser from 'postcss-value-parser';

import {POLARIS_MIGRATOR_COMMENT} from '../../constants';
import {
  NamespaceOptions,
  namespace,
  isSassFunction,
  hasSassFunction,
  hasNumericOperator,
} from '../../utilities/sass';
import {isKeyOf} from '../../utilities/type-guards';

const spacingMap = {
  none: '--p-space-0',
  'extra-tight': '--p-space-1',
  tight: '--p-space-2',
  'base-tight': '--p-space-3',
  '': '--p-space-4',
  base: '--p-space-4',
  loose: '--p-space-5',
  'extra-loose': '--p-space-8',
};

const processed = Symbol('processed');

interface PluginOptions extends Options, NamespaceOptions {}

const plugin = (options: PluginOptions = {}): Plugin => {
  const namespacedSpacing = namespace('spacing', options);

  return {
    postcssPlugin: 'ReplaceSassSpacing',
    Declaration(decl) {
      // @ts-expect-error - Skip if processed so we don't process it again
      if (decl[processed]) return;

      const parsedValue = valueParser(decl.value);

      if (!hasSassFunction(namespacedSpacing, parsedValue)) return;

      parsedValue.walk((node) => {
        if (!isSassFunction(namespacedSpacing, node)) return;

        const spacing = node.nodes[0]?.value ?? '';

        if (!isKeyOf(spacingMap, spacing)) return;
        const spacingCustomProperty = spacingMap[spacing];

        node.value = 'var';
        node.nodes = [
          {
            type: 'word',
            value: spacingCustomProperty,
            sourceIndex: node.nodes[0]?.sourceIndex ?? 0,
            sourceEndIndex: spacingCustomProperty.length,
          },
          ...node.nodes.slice(1),
        ];
      });

      if (hasNumericOperator(parsedValue)) {
        // Insert comment if the declaration value contains calculations
        decl.before(postcss.comment({text: POLARIS_MIGRATOR_COMMENT}));
        decl.before(
          postcss.comment({text: `${decl.prop}: ${parsedValue.toString()};`}),
        );
      } else {
        decl.value = parsedValue.toString();
      }

      // @ts-expect-error - Mark the declaration as processed
      decl[processed] = true;
    },
  };
};

export default function replaceSassSpacing(
  file: FileInfo,
  _: API,
  options: Options,
) {
  return postcss(plugin(options)).process(file.source, {
    syntax: require('postcss-scss'),
  }).css;
}
