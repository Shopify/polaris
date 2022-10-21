/* eslint-disable line-comment-position */

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
} from '../../utilities/sass';
import {isKeyOf} from '../../utilities/type-guards';

export default function replaceTypographyDeclarations(
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
  const namespacedFontFamily = namespace('font-family', options);
  const namespacedFontSize = namespace('font-size', options);
  const namespacedLineHeight = namespace('line-height', options);
  const namespacedRem = namespace('rem', options);

  return {
    postcssPlugin: 'replace-typography-declarations',
    Declaration(decl) {
      // @ts-expect-error - Skip if processed so we don't process it again
      if (decl[processed]) return;

      const handlers = {
        'font-family': handleFontFamily,
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

      function handleFontFamily() {
        parsedValue.walk((node) => {
          if (node.type === 'word') {
            if (isNumericOperator(node)) {
              hasNumericOperator = true;
              // eslint-disable-next-line no-useless-return
              return;
            }
          } else if (node.type === 'function') {
            if (isSassFunction(namespacedFontFamily, node)) {
              targets.push({replaced: false});

              const args = getFunctionArgs(node);

              if (!(args.length === 0 || args.length === 1)) return;

              // `font-family()` args reference:
              // https://github.com/shopify/polaris/blob/2b14c0b60097f75d21df7eaa744dfaf84f8f53f7/documentation/guides/legacy-polaris-v8-public-api.scss#L945
              const family = args[0] ?? 'base';

              if (!isKeyOf(fontFamilyMap, family)) return;

              const fontFamilyCustomProperty = fontFamilyMap[family];

              targets.pop()!.replaced = true;

              node.value = 'var';
              node.nodes = [
                {
                  type: 'word',
                  value: fontFamilyCustomProperty,
                  sourceIndex: node.nodes[0]?.sourceIndex ?? 0,
                  sourceEndIndex: fontFamilyCustomProperty.length,
                },
              ];
            }

            return StopWalkingFunctionNodes;
          }
        });
      }

      function handleFontSize() {
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

            const fontSizeInPx = isUnitlessZero(dimension)
              ? `${dimension.number}px`
              : toPx(`${dimension.number}${dimension.unit}`);

            if (!isKeyOf(fontSizeMap, fontSizeInPx)) return;

            targets.pop()!.replaced = true;

            node.value = `var(${fontSizeMap[fontSizeInPx]})`;
            return;
          }

          if (node.type === 'function') {
            if (isSassFunction(namespacedFontSize, node)) {
              targets.push({replaced: false});

              const args = getFunctionArgs(node);

              if (!(args.length === 1 || args.length === 2)) return;

              // `font-size()` args reference:
              // https://github.com/Shopify/polaris/blob/1738f17c739e06dcde4653a9783ca367e38b4e32/documentation/guides/legacy-polaris-v8-public-api.scss#L977
              const styleArg = args[0];
              const variantArg = args[1] ?? 'base';

              if (!isKeyOf(fontSizeFunctionMap, styleArg)) return;

              const fontSizeStyle = fontSizeFunctionMap[styleArg];

              if (!isKeyOf(fontSizeStyle, variantArg)) return;

              const fontSizeVariant = fontSizeStyle[variantArg];

              targets.pop()!.replaced = true;

              if (fontSizeVariant.startsWith('--')) {
                node.value = 'var';
                node.nodes = [
                  {
                    type: 'word',
                    value: fontSizeVariant,
                    sourceIndex: node.nodes[0]?.sourceIndex ?? 0,
                    sourceEndIndex: fontSizeVariant.length,
                  },
                ];
              } else {
                // @ts-expect-error: We are intentionally changing the node type
                node.type = 'word';
                node.value = fontSizeVariant;
              }
            }

            if (isSassFunction(namespacedRem, node)) {
              targets.push({replaced: false});

              const args = getFunctionArgs(node);

              if (args.length !== 1) return;

              const fontSizeInPx = toTransformablePx(args[0]);

              if (!isKeyOf(fontSizeMap, fontSizeInPx)) return;

              targets.pop()!.replaced = true;

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

          if (node.type === 'word') {
            if (globalValues.has(node.value)) return;

            if (isNumericOperator(node)) {
              hasNumericOperator = true;
              return;
            }

            targets.push({replaced: false});

            const fontWeight = node.value;

            if (!isKeyOf(fontWeightMap, fontWeight)) return;

            targets.pop()!.replaced = true;

            node.value = `var(${fontWeightMap[fontWeight]})`;
          }
        });
      }

      function handleFontLineHeight() {
        parsedValue.walk((node) => {
          if (node.type === 'word') {
            if (globalValues.has(node.value)) return;

            if (isNumericOperator(node)) {
              hasNumericOperator = true;
              return;
            }

            targets.push({replaced: false});

            const lineHeighInPx = toTransformablePx(node.value);

            if (!isKeyOf(fontLineHeightMap, lineHeighInPx)) return;

            targets.pop()!.replaced = true;

            node.value = `var(${fontLineHeightMap[lineHeighInPx]})`;

            return;
          }

          if (node.type === 'function') {
            if (isSassFunction(namespacedLineHeight, node)) {
              targets.push({replaced: false});

              const args = getFunctionArgs(node);

              if (!(args.length === 1 || args.length === 2)) return;

              // `line-height()` args reference:
              // https://github.com/shopify/polaris/blob/2b14c0b60097f75d21df7eaa744dfaf84f8f53f7/documentation/guides/legacy-polaris-v8-public-api.scss#L961
              const styleArg = args[0];
              const variantArg = args[1] ?? 'base';

              if (!isKeyOf(lineHeightFunctionMap, styleArg)) return;

              const lineHeightStyle = lineHeightFunctionMap[styleArg];

              if (!isKeyOf(lineHeightStyle, variantArg)) return;

              const lineHeightVariant = lineHeightStyle[variantArg];

              targets.pop()!.replaced = true;

              if (lineHeightVariant.startsWith('--')) {
                node.value = 'var';
                node.nodes = [
                  {
                    type: 'word',
                    value: lineHeightVariant,
                    sourceIndex: node.nodes[0]?.sourceIndex ?? 0,
                    sourceEndIndex: lineHeightVariant.length,
                  },
                ];
              } else {
                // @ts-expect-error: We are intentionally changing the node type
                node.type = 'word';
                node.value = lineHeightVariant;
              }
            }

            if (isSassFunction(namespacedRem, node)) {
              targets.push({replaced: false});

              const args = getFunctionArgs(node);

              if (args.length !== 1) return;

              const lineHeightInPx = toTransformablePx(args[0]);

              if (!isKeyOf(fontLineHeightMap, lineHeightInPx)) return;

              targets.pop()!.replaced = true;

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

const fontFamilyMap = {
  base: '--p-font-family-sans',
  monospace: '--p-font-family-mono',
};

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

const fontSizeFunctionMap = {
  caption: {
    base: '0.8125rem', // 13px
    'large-screen': '--p-font-size-75',
  },
  heading: {
    base: '1.0625rem', // 17px
    'large-screen': '--p-font-size-200',
  },
  subheading: {
    base: '0.8125rem', // 13px
    'large-screen': '--p-font-size-75',
  },
  input: {
    base: '--p-font-size-200',
    'large-screen': '--p-font-size-100',
  },
  body: {
    base: '0.9375rem', // 15px
    'large-screen': '--p-font-size-100',
  },
  button: {
    base: '0.9375rem', // 15px
    'large-screen': '--p-font-size-100',
  },
  'button-large': {
    base: '1.0625rem', // 17px
    'large-screen': '--p-font-size-200',
  },
  'display-x-large': {
    base: '1.6875rem', // 27px
    'large-screen': '2.625rem', // 42px
  },
  'display-large': {
    base: '--p-font-size-400',
    'large-screen': '--p-font-size-500',
  },
  'display-medium': {
    base: '1.3125rem', // 21px
    'large-screen': '1.625rem', // 26px
  },
  'display-small': {
    base: '--p-font-size-200',
    'large-screen': '--p-font-size-300',
  },
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

const lineHeightFunctionMap = {
  caption: {
    base: '--p-font-line-height-2',
    'large-screen': '--p-font-line-height-1',
  },
  heading: {
    base: '--p-font-line-height-3',
  },
  subheading: {
    base: '--p-font-line-height-1',
  },
  input: {
    base: '--p-font-line-height-3',
  },
  body: {
    base: '--p-font-line-height-2',
  },
  button: {
    base: '--p-font-line-height-1',
  },
  'button-large': {
    base: '--p-font-line-height-2',
  },
  'display-x-large': {
    base: '2.25rem', // 36px
    'large-screen': '2.75rem', // 44px
  },
  'display-large': {
    base: '--p-font-line-height-4',
    'large-screen': '--p-font-line-height-5',
  },
  'display-medium': {
    base: '--p-font-line-height-4',
    'large-screen': '--p-font-line-height-5',
  },
  'display-small': {
    base: '--p-font-line-height-3',
    'large-screen': '--p-font-line-height-4',
  },
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

/**
 * Exit early and stop traversing descendant nodes:
 * https://www.npmjs.com/package/postcss-value-parser:~:text=Returning%20false%20in%20the%20callback%20will%20prevent%20traversal%20of%20descendent%20nodes
 */
const StopWalkingFunctionNodes = false;
