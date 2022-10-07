/* eslint-disable line-comment-position */

import type {FileInfo, API, Options} from 'jscodeshift';
import postcss, {Plugin, Declaration} from 'postcss';
import valueParser from 'postcss-value-parser';
import {toPx} from '@shopify/polaris-tokens';

import {POLARIS_MIGRATOR_COMMENT} from '../../constants';
import {
  getFunctionArgs,
  hasNumericOperator,
  hasSassFunction,
  isNumericOperator,
  isSassFunction,
  isTransformableLength,
  isUnitlessZero,
  namespace,
  NamespaceOptions,
  replaceDecl,
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
  return {
    postcssPlugin: 'replace-typography-declarations',
    Declaration(decl) {
      // @ts-expect-error - Skip if processed so we don't process it again
      if (decl[processed]) return;

      replaceDecl(decl, {
        'font-family': handleFontFamily(options),
        'font-size': handleFontSize(options),
        'font-weight': handleFontWeight(options),
        'line-height': handleFontLineHeight(options),
      });

      // @ts-expect-error - Mark the declaration as processed
      decl[processed] = true;
    },
  };
};

const fontFamilyMap = {
  '': '--p-font-family-sans',
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
    base: '1.6875rem',
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

function handleFontFamily(options: NamespaceOptions) {
  const namespacedFontFamily = namespace('font-family', options);

  return (decl: Declaration): void => {
    const parsedValue = valueParser(decl.value);

    if (!hasSassFunction(namespacedFontFamily, parsedValue)) return;

    parsedValue.walk((node) => {
      if (!isSassFunction(namespacedFontFamily, node)) return;

      const fontFamily = node.nodes[0]?.value ?? '';

      if (!isKeyOf(fontFamilyMap, fontFamily)) return;

      const fontFamilyCustomProperty = fontFamilyMap[fontFamily];

      node.value = 'var';
      node.nodes = [
        {
          type: 'word',
          value: fontFamilyCustomProperty,
          sourceIndex: node.nodes[0]?.sourceIndex ?? 0,
          sourceEndIndex: fontFamilyCustomProperty.length,
        },
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
  };
}

interface FileState {
  hasNumericOperator: boolean;
  targets: {
    type: 'length' | 'rem' | 'font-size';
    replaced: boolean;
    invalid: boolean;
  }[];
}

function handleFontSize(options: NamespaceOptions) {
  const namespacedRem = namespace('rem', options);
  const namespacedFontSize = namespace('font-size', options);

  return (decl: Declaration): void => {
    const fileState: FileState = {
      hasNumericOperator: false,
      targets: [],
    };

    const parsedValue = valueParser(decl.value);

    parsedValue.walk((node) => {
      if (node.type === 'function') {
        if (isSassFunction(namespacedFontSize, node)) {
          fileState.targets.push({
            type: 'font-size',
            replaced: false,
            invalid: false,
          });

          const args = getFunctionArgs(node);

          if (!(args.length === 1 || args.length === 2)) {
            fileState.targets.at(-1)!.invalid = true;
            return;
          }

          // Reference of the `font-size()` args
          // https://github.com/Shopify/polaris/blob/1738f17c739e06dcde4653a9783ca367e38b4e32/documentation/guides/legacy-polaris-v8-public-api.scss#L977
          const styleArg = args[0];
          const variantArg = args[1] ?? 'base';

          if (!isKeyOf(fontSizeFunctionMap, styleArg)) return;

          const fontSizeStyle = fontSizeFunctionMap[styleArg];

          if (!isKeyOf(fontSizeStyle, variantArg)) return;

          const fontSizeVariant = fontSizeStyle[variantArg];

          fileState.targets.at(-1)!.replaced = true;

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
          fileState.targets.push({
            type: 'rem',
            replaced: false,
            invalid: false,
          });

          const args = getFunctionArgs(node);

          if (args.length !== 1) {
            fileState.targets.at(-1)!.invalid = true;
            return;
          }

          const fontSizeInPx = toTransformablePx(args[0]);

          if (!isKeyOf(fontSizeMap, fontSizeInPx)) return;

          fileState.targets.at(-1)!.replaced = true;
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

        // Stop walking child nodes of the function
        return false;
      } else if (node.type === 'word') {
        if (isNumericOperator(node)) {
          fileState.hasNumericOperator = true;
          return;
        }

        const dimension = valueParser.unit(node.value);

        if (!isTransformableLength(dimension)) return;

        fileState.targets.push({
          type: 'length',
          replaced: false,
          invalid: false,
        });

        const fontSizeInPx = isUnitlessZero(dimension)
          ? `${dimension.number}px`
          : toPx(`${dimension.number}${dimension.unit}`);

        if (!isKeyOf(fontSizeMap, fontSizeInPx)) return;

        fileState.targets.at(-1)!.replaced = true;
        node.value = `var(${fontSizeMap[fontSizeInPx]})`;
      }
    });

    if (
      fileState.targets.some(
        (value) =>
          !value.replaced || value.invalid || fileState.hasNumericOperator,
      )
    ) {
      decl.before(postcss.comment({text: POLARIS_MIGRATOR_COMMENT}));
      decl.before(
        postcss.comment({text: `${decl.prop}: ${parsedValue.toString()};`}),
      );
    } else {
      decl.value = parsedValue.toString();
    }
  };
}

function handleFontWeight(_options: NamespaceOptions) {
  return (decl: Declaration): void => {
    const parsedValue = valueParser(decl.value);
    const fontWeight = parsedValue.nodes[0];

    if (parsedValue.nodes.length !== 1 || fontWeight.type !== 'word') {
      return;
    }

    if (!isKeyOf(fontWeightMap, fontWeight.value)) return;

    const fontWeightVar = `var(${fontWeightMap[fontWeight.value]})`;

    if (hasNumericOperator(parsedValue)) {
      // Insert comment if the declaration value contains calculations
      decl.before(postcss.comment({text: POLARIS_MIGRATOR_COMMENT}));
      decl.before(postcss.comment({text: `${decl.prop}: ${fontWeightVar};`}));
    } else {
      decl.value = fontWeightVar;
    }
  };
}

function handleFontLineHeight(_options: NamespaceOptions) {
  return (decl: Declaration): void => {
    const parsedValue = valueParser(decl.value);
    const lineHeight = parsedValue.nodes[0];

    if (parsedValue.nodes.length !== 1 || lineHeight.type !== 'word') {
      return;
    }

    const lineHeighInPx = toTransformablePx(lineHeight.value);

    if (!isKeyOf(fontLineHeightMap, lineHeighInPx)) return;

    const fontLineHeightVar = `var(${fontLineHeightMap[lineHeighInPx]})`;

    if (hasNumericOperator(parsedValue)) {
      // Insert comment if the declaration value contains calculations
      decl.before(postcss.comment({text: POLARIS_MIGRATOR_COMMENT}));
      decl.before(
        postcss.comment({text: `${decl.prop}: ${fontLineHeightVar};`}),
      );
    } else {
      decl.value = fontLineHeightVar;
    }
  };
}
