import type {FileInfo, API, Options} from 'jscodeshift';
import postcss from 'postcss';
import type {Plugin} from 'postcss';
import valueParser from 'postcss-value-parser';

import {POLARIS_MIGRATOR_COMMENT} from '../../constants';
import {
  getFunctionArgs,
  isNumericOperator,
  isSassFunction,
  isTransformableLength,
  namespace,
  toTransformablePx,
  StopWalkingFunctionNodes,
  createInlineComment,
} from '../../utilities/sass';
import type {NamespaceOptions} from '../../utilities/sass';
import {isKeyOf} from '../../utilities/type-guards';

export default function v9StylesTokenizeShape(
  fileInfo: FileInfo,
  _: API,
  options: Options,
) {
  return postcss(plugin(options)).process(fileInfo.source, {
    syntax: require('postcss-scss'),
  }).css;
}

const processed = Symbol('processed');

interface PluginOptions extends Options, NamespaceOptions {}

const plugin = (options: PluginOptions = {}): Plugin => {
  const namespacedRem = namespace('rem', options);

  return {
    postcssPlugin: 'v9-styles-tokenize-shape',
    Declaration(decl) {
      // @ts-expect-error - Skip if processed so we don't process it again
      if (decl[processed]) return;

      let handler;

      if (borderProps.has(decl.prop)) handler = handleBorderProps;
      else if (borderRadiusProps.has(decl.prop))
        handler = handleBorderRadiusProps;
      else return;

      /**
       * A collection of transformable values to migrate (e.g. decl lengths, functions, etc.)
       *
       * Note: This is evaluated at the end of each visitor execution to determine whether
       * or not to replace the declaration or insert a comment.
       */
      const targets: {replaced: boolean}[] = [];
      let hasNumericOperator = false;
      const parsedValue = valueParser(decl.value);

      handler();

      if (targets.some(({replaced}) => !replaced || hasNumericOperator)) {
        // Insert comment if the declaration value contains calculations
        decl.before(createInlineComment(POLARIS_MIGRATOR_COMMENT));
        decl.before(
          createInlineComment(`${decl.prop}: ${parsedValue.toString()};`),
        );
      } else {
        decl.value = parsedValue.toString();
      }

      //
      // Handlers
      //

      function handleBorderProps() {
        parsedValue.walk((node) => {
          if (isNumericOperator(node)) {
            hasNumericOperator = true;
            return;
          }

          if (node.type === 'word') {
            if (globalValues.has(node.value)) return;

            const dimension = valueParser.unit(node.value);

            if (!isTransformableLength(dimension)) return;

            targets.push({replaced: false});

            const valueInPx = toTransformablePx(node.value);

            if (!isKeyOf(borderWidthLengthMap, valueInPx)) return;

            node.value = `var(${borderWidthLengthMap[valueInPx]})`;

            targets[targets.length - 1]!.replaced = true;

            return;
          }

          if (node.type === 'function') {
            if (isSassFunction(namespacedRem, node)) {
              targets.push({replaced: false});

              const args = getFunctionArgs(node);

              if (args.length !== 1) return;

              const valueInPx = toTransformablePx(args[0]);

              if (!isKeyOf(borderWidthLengthMap, valueInPx)) return;

              node.value = 'var';
              node.nodes = [
                {
                  type: 'word',
                  value: borderWidthLengthMap[valueInPx],
                  sourceIndex: node.nodes[0]?.sourceIndex ?? 0,
                  sourceEndIndex: borderWidthLengthMap[valueInPx].length,
                },
              ];

              targets[targets.length - 1]!.replaced = true;
            }

            return StopWalkingFunctionNodes;
          }
        });
      }

      function handleBorderRadiusProps() {
        parsedValue.walk((node) => {
          if (isNumericOperator(node)) {
            hasNumericOperator = true;
            return;
          }

          if (node.type === 'word') {
            if (globalValues.has(node.value)) return;

            const dimension = valueParser.unit(node.value);

            if (!isTransformableLength(dimension)) return;

            targets.push({replaced: false});

            const valueInPx = toTransformablePx(node.value);

            if (!isKeyOf(borderRadiusLengthMap, valueInPx)) return;

            node.value = `var(${borderRadiusLengthMap[valueInPx]})`;

            targets[targets.length - 1]!.replaced = true;

            return;
          }

          if (node.type === 'function') {
            if (isSassFunction(namespacedRem, node)) {
              targets.push({replaced: false});

              const args = getFunctionArgs(node);

              if (args.length !== 1) return;

              const valueInPx = toTransformablePx(args[0]);

              if (!isKeyOf(borderRadiusLengthMap, valueInPx)) return;

              node.value = 'var';
              node.nodes = [
                {
                  type: 'word',
                  value: borderRadiusLengthMap[valueInPx],
                  sourceIndex: node.nodes[0]?.sourceIndex ?? 0,
                  sourceEndIndex: borderRadiusLengthMap[valueInPx].length,
                },
              ];

              targets[targets.length - 1]!.replaced = true;
            }

            return StopWalkingFunctionNodes;
          }
        });
      }
    },
  };
};

const globalValues = new Set(['inherit', 'initial', 'unset']);

const borderProps = new Set([
  'border',
  'border-top',
  'border-right',
  'border-bottom',
  'border-left',
  'border-width',
  'border-top-width',
  'border-right-width',
  'border-bottom-width',
  'border-left-width',
]);

const borderRadiusProps = new Set([
  'border-radius',
  'border-top-left-radius',
  'border-top-right-radius',
  'border-bottom-left-radius',
  'border-bottom-right-radius',
]);

const borderWidthLengthMap = {
  '1px': '--p-border-width-1',
  '2px': '--p-border-width-2',
  '3px': '--p-border-width-3',
  '4px': '--p-border-width-4',
  '5px': '--p-border-width-5',
} as const;

const borderRadiusLengthMap = {
  '2px': '--p-border-radius-05',
  '4px': '--p-border-radius-1',
  '8px': '--p-border-radius-2',
  '12px': '--p-border-radius-3',
  '16px': '--p-border-radius-4',
  '20px': '--p-border-radius-5',
  '30px': '--p-border-radius-6',
  '3px': '--p-border-radius-base',
  '6px': '--p-border-radius-large',
} as const;
