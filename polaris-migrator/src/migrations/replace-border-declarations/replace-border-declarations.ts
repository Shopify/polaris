import type {FileInfo, API, Options} from 'jscodeshift';
import postcss, {Plugin} from 'postcss';
import valueParser from 'postcss-value-parser';

import {POLARIS_MIGRATOR_COMMENT} from '../../constants';
import {
  getFunctionArgs,
  isNumericOperator,
  isSassFunction,
  isTransformableLength,
  namespace,
  NamespaceOptions,
  toTransformablePx,
  StopWalkingFunctionNodes,
  createInlineComment,
} from '../../utilities/sass';
import {isKeyOf} from '../../utilities/type-guards';

export default function replaceBorderDeclarations(
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
  const namespacedBorder = namespace('border', options);
  const namespacedBorderWidth = namespace('border-width', options);
  const namespacedBorderRadius = namespace('border-radius', options);

  return {
    postcssPlugin: 'replace-border-declarations',
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
        decl.before(
          createInlineComment(POLARIS_MIGRATOR_COMMENT, {prose: true}),
        );
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
          if (node.type === 'word') {
            if (globalValues.has(node.value)) return;
            if (isNumericOperator(node)) {
              hasNumericOperator = true;
              return;
            }

            const dimension = valueParser.unit(node.value);

            if (!isTransformableLength(dimension)) return;

            targets.push({replaced: false});

            const valueInPx = toTransformablePx(node.value);

            if (!isKeyOf(borderWidthLengthMap, valueInPx)) return;

            node.value = `var(${borderWidthLengthMap[valueInPx]})`;

            targets.at(-1)!.replaced = true;

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

              targets.at(-1)!.replaced = true;
            }

            if (isSassFunction(namespacedBorder, node)) {
              targets.push({replaced: false});

              const args = getFunctionArgs(node);

              if (!(args.length === 0 || args.length === 1)) return;

              // `border()` args reference:
              // https://github.com/shopify/polaris/blob/2b14c0b60097f75d21df7eaa744dfaf84f8f53f7/documentation/guides/legacy-polaris-v8-public-api.scss#L641
              const value = args[0] ?? 'base';

              if (!isKeyOf(borderFunctionMap, value)) return;

              node.value = 'var';
              node.nodes = [
                {
                  type: 'word',
                  value: borderFunctionMap[value],
                  sourceIndex: node.nodes[0]?.sourceIndex ?? 0,
                  sourceEndIndex: borderFunctionMap[value].length,
                },
              ];

              targets.at(-1)!.replaced = true;
            }

            if (isSassFunction(namespacedBorderWidth, node)) {
              targets.push({replaced: false});

              const args = getFunctionArgs(node);

              if (!(args.length === 0 || args.length === 1)) return;

              // `border-width()` args reference:
              // https://github.com/shopify/polaris/blob/2b14c0b60097f75d21df7eaa744dfaf84f8f53f7/documentation/guides/legacy-polaris-v8-public-api.scss#L616
              const value = args[0] ?? 'base';

              if (!isKeyOf(borderWidthFunctionMap, value)) return;

              node.value = 'var';
              node.nodes = [
                {
                  type: 'word',
                  value: borderWidthFunctionMap[value],
                  sourceIndex: node.nodes[0]?.sourceIndex ?? 0,
                  sourceEndIndex: borderWidthFunctionMap[value].length,
                },
              ];

              targets.at(-1)!.replaced = true;
            }

            return StopWalkingFunctionNodes;
          }
        });
      }

      function handleBorderRadiusProps() {
        parsedValue.walk((node) => {
          if (node.type === 'word') {
            if (globalValues.has(node.value)) return;
            if (isNumericOperator(node)) {
              hasNumericOperator = true;
              return;
            }

            const dimension = valueParser.unit(node.value);

            if (!isTransformableLength(dimension)) return;

            targets.push({replaced: false});

            const valueInPx = toTransformablePx(node.value);

            if (!isKeyOf(borderRadiusLengthMap, valueInPx)) return;

            node.value = `var(${borderRadiusLengthMap[valueInPx]})`;

            targets.at(-1)!.replaced = true;

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

              targets.at(-1)!.replaced = true;
            }

            if (isSassFunction(namespacedBorderRadius, node)) {
              targets.push({replaced: false});

              const args = getFunctionArgs(node);

              if (!(args.length === 0 || args.length === 1)) return;

              // `border-radius()` args reference:
              // https://github.com/shopify/polaris/blob/2b14c0b60097f75d21df7eaa744dfaf84f8f53f7/documentation/guides/legacy-polaris-v8-public-api.scss#L655
              const value = args[0] ?? 'base';

              if (!isKeyOf(borderRadiusFunctionMap, value)) return;

              node.value = 'var';
              node.nodes = [
                {
                  type: 'word',
                  value: borderRadiusFunctionMap[value],
                  sourceIndex: node.nodes[0]?.sourceIndex ?? 0,
                  sourceEndIndex: borderRadiusFunctionMap[value].length,
                },
              ];

              targets.at(-1)!.replaced = true;
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
  '50%': '--p- border-radius-half',
} as const;

const borderFunctionMap = {
  '': '--p-border-base',
  base: '--p-border-base',
  "'base'": '--p-border-base',
  dark: '--p-border-dark',
  "'dark'": '--p-border-dark',
  transparent: '--p-border-transparent',
  "'transparent'": '--p-border-transparent',
  divider: '	--p-border-divider',
  "'divider'": '	--p-border-divider',
} as const;

const borderWidthFunctionMap = {
  '': '--p-border-width-1',
  base: '--p-border-width-1',
  "'base'": '--p-border-width-1',
  thick: '--p-border-width-2',
  "'thick'": '--p-border-width-2',
  thicker: '--p-border-width-3',
  "'thicker'": '--p-border-width-3',
} as const;

const borderRadiusFunctionMap = {
  '': '--p-border-radius-base',
  base: '--p-border-radius-base',
  "'base'": '--p-border-radius-base',
  large: '--p-border-radius-large',
  "'large'": '--p-border-radius-large',
} as const;
