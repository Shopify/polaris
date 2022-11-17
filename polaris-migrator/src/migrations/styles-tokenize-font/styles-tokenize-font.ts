import type {FileInfo, API, Options} from 'jscodeshift';
import postcss, {Plugin} from 'postcss';
import valueParser from 'postcss-value-parser';
import {toPx} from '@shopify/polaris-tokens';

import {POLARIS_MIGRATOR_COMMENT} from '../../constants';
import {
  createInlineComment,
  getFunctionArgs,
  isNumericOperator,
  isSassFunction,
  isTransformableLength,
  isUnitlessZero,
  namespace,
  NamespaceOptions,
  toTransformablePx,
  StopWalkingFunctionNodes,
} from '../../utilities/sass';
import {isKeyOf} from '../../utilities/type-guards';

export default function stylesTokenizeFont(
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
    postcssPlugin: 'styles-tokenize-font',
    Declaration(decl) {
      // @ts-expect-error - Skip if processed so we don't process it again
      if (decl[processed]) return;

      const handlers = {
        'font-size': handleFontSize,
        'font-weight': handleFontWeight,
        'line-height': handleFontLineHeight,
      };

      if (!isKeyOf(handlers, decl.prop)) return;

      /**
       * A collection of transformable values to migrate (e.g. decl lengths, functions, etc.)
       *
       * Note: This is evaluated at the end of each visitor execution to determine whether
       * or not to replace the declaration or insert a comment.
       */
      const targets: {replaced: boolean}[] = [];
      let hasNumericOperator = false;

      const parsedValue = valueParser(decl.value);

      handlers[decl.prop]();

      if (targets.some(({replaced}) => !replaced || hasNumericOperator)) {
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

      function handleFontSize() {
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

            const fontSizeInPx = isUnitlessZero(dimension)
              ? `${dimension.number}px`
              : toPx(`${dimension.number}${dimension.unit}`);

            if (!isKeyOf(fontSizeMap, fontSizeInPx)) return;

            targets[targets.length - 1]!.replaced = true;

            node.value = `var(${fontSizeMap[fontSizeInPx]})`;
            return;
          }

          if (node.type === 'function') {
            if (isSassFunction(namespacedRem, node)) {
              targets.push({replaced: false});

              const args = getFunctionArgs(node);

              if (args.length !== 1) return;

              const fontSizeInPx = toTransformablePx(args[0]);

              if (!isKeyOf(fontSizeMap, fontSizeInPx)) return;

              targets[targets.length - 1]!.replaced = true;

              node.value = 'var';
              node.nodes = [
                {
                  type: 'word',
                  value: fontSizeMap[fontSizeInPx],
                  sourceIndex: node.nodes[0]?.sourceIndex ?? 0,
                  sourceEndIndex: fontSizeMap[fontSizeInPx].length,
                },
              ];
            }

            return StopWalkingFunctionNodes;
          }
        });
      }

      function handleFontWeight() {
        parsedValue.walk((node) => {
          if (node.type === 'function') return StopWalkingFunctionNodes;

          if (isNumericOperator(node)) {
            hasNumericOperator = true;
            return;
          }

          if (node.type === 'word') {
            if (globalValues.has(node.value)) return;

            targets.push({replaced: false});

            const fontWeight = node.value;

            if (!isKeyOf(fontWeightMap, fontWeight)) return;

            targets[targets.length - 1]!.replaced = true;

            node.value = `var(${fontWeightMap[fontWeight]})`;
          }
        });
      }

      function handleFontLineHeight() {
        parsedValue.walk((node) => {
          if (isNumericOperator(node)) {
            hasNumericOperator = true;
            return;
          }

          if (node.type === 'word') {
            if (globalValues.has(node.value)) return;

            targets.push({replaced: false});

            const lineHeighInPx = toTransformablePx(node.value);

            if (!isKeyOf(fontLineHeightMap, lineHeighInPx)) return;

            targets[targets.length - 1]!.replaced = true;

            node.value = `var(${fontLineHeightMap[lineHeighInPx]})`;

            return;
          }

          if (node.type === 'function') {
            if (isSassFunction(namespacedRem, node)) {
              targets.push({replaced: false});

              const args = getFunctionArgs(node);

              if (args.length !== 1) return;

              const lineHeightInPx = toTransformablePx(args[0]);

              if (!isKeyOf(fontLineHeightMap, lineHeightInPx)) return;

              targets[targets.length - 1]!.replaced = true;

              node.value = 'var';
              node.nodes = [
                {
                  type: 'word',
                  value: fontLineHeightMap[lineHeightInPx],
                  sourceIndex: node.nodes[0]?.sourceIndex ?? 0,
                  sourceEndIndex: fontLineHeightMap[lineHeightInPx].length,
                },
              ];
            }

            return StopWalkingFunctionNodes;
          }
        });
      }

      // @ts-expect-error - Mark the declaration as processed
      decl[processed] = true;
    },
  };
};

const globalValues = new Set(['inherit', 'initial', 'unset']);

const fontSizeMap = {
  '12px': '--p-font-size-75',
  '14px': '--p-font-size-100',
  '16px': '--p-font-size-200',
  '20px': '--p-font-size-300',
  '24px': '--p-font-size-400',
  '28px': '--p-font-size-500',
  '32px': '--p-font-size-600',
  '40px': '--p-font-size-700',
};

const fontLineHeightMap = {
  '16px': '--p-font-line-height-1',
  '20px': '--p-font-line-height-2',
  '24px': '--p-font-line-height-3',
  '28px': '--p-font-line-height-4',
  '32px': '--p-font-line-height-5',
  '40px': '--p-font-line-height-6',
  '48px': '--p-font-line-height-7',
};

const fontWeightMap = {
  400: '--p-font-weight-regular',
  500: '--p-font-weight-medium',
  600: '--p-font-weight-semibold',
  700: '--p-font-weight-bold',
  // https://drafts.csswg.org/css-fonts-3/#propdef-font-weight
  // 100 - Thin
  // 200 - Extra Light (Ultra Light)
  // 300 - Light
  // 400 - Normal
  normal: '--p-font-weight-regular',
  // 500 - Medium
  // 600 - Semi Bold (Demi Bold)
  // 700 - Bold
  bold: '--p-font-weight-bold',
  // 800 - Extra Bold (Ultra Bold)
  // 900 - Black (Heavy)
};
