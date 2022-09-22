import type {FileInfo, API, Options} from 'jscodeshift';
import postcss, {Plugin} from 'postcss';
import valueParser, {Node, FunctionNode} from 'postcss-value-parser';

import {POLARIS_MIGRATOR_COMMENT} from '../../constants';

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

const isSpacing = (spacing: unknown): spacing is keyof typeof spacingMap =>
  Object.keys(spacingMap).includes(spacing as string);

function isNumericOperator(node: Node): boolean {
  return (
    node.value === '+' ||
    node.value === '-' ||
    node.value === '*' ||
    node.value === '/' ||
    node.value === '%'
  );
}

const processed = Symbol('processed');

interface PluginOptions extends Options {
  namespace?: string;
}

const plugin = (options: PluginOptions = {}): Plugin => {
  const namespace = options?.namespace || '';
  const functionName = namespace ? `${namespace}.spacing` : 'spacing';
  const isSpacingFn = (node: Node): node is FunctionNode => {
    return node.type === 'function' && node.value === functionName;
  };

  return {
    postcssPlugin: 'ReplaceSassSpacing',
    Declaration(decl) {
      // @ts-expect-error - Skip if processed so we don't process it again
      if (decl[processed]) return;

      const parsed = valueParser(decl.value);

      let containsSpacingFn = false;
      let containsCalculation = false;

      parsed.walk((node) => {
        if (isSpacingFn(node)) containsSpacingFn = true;
        if (isNumericOperator(node)) containsCalculation = true;

        if (!isSpacingFn(node)) return;

        const spacing = node.nodes[0]?.value ?? '';

        if (!isSpacing(spacing)) return;
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

      if (containsSpacingFn && containsCalculation) {
        // Insert comment if the declaration value contains calculations
        decl.before(postcss.comment({text: POLARIS_MIGRATOR_COMMENT}));
        decl.before(
          postcss.comment({text: `${decl.prop}: ${parsed.toString()};`}),
        );
      } else {
        decl.value = parsed.toString();
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
