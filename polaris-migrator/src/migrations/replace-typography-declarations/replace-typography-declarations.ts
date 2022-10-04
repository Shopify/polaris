import type {FileInfo, API, Options} from 'jscodeshift';
import postcss, {Declaration, Plugin} from 'postcss';
import valueParser from 'postcss-value-parser';
import {toPx} from '@shopify/polaris-tokens';

import {
  NamespaceOptions,
  namespace,
  isTransformableLength,
  hasSassFunction,
  isSassFunction,
} from '../../utilities/sass';
import {isKeyof} from '../../utilities/type-guards';

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

  return {
    postcssPlugin: 'replace-typography-declarations',
    Declaration: {
      'font-family': createHandleFontFamily(namespacedFontFamily),
      'font-size': handleFontSize,
      'font-weight': handleFontWeight,
      'line-height': handleFontLineHeight,
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

function createHandleFontFamily(namespacedFontFamily: string) {
  return (decl: Declaration): void => {
    // @ts-expect-error - Skip if processed so we don't process it again
    if (decl[processed]) return;

    const parsedValue = valueParser(decl.value);

    if (!hasSassFunction(namespacedFontFamily, parsedValue)) return;

    parsedValue.walk((node) => {
      if (!isSassFunction(namespacedFontFamily, node)) return;

      const fontFamily = node.nodes[0]?.value ?? '';

      if (!isKeyof(fontFamilyMap, fontFamily)) return;

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

    decl.value = parsedValue.toString();

    // @ts-expect-error - Mark the declaration as processed
    decl[processed] = true;
  };
}

function handleFontSize(decl: Declaration): void {
  // @ts-expect-error - Skip if processed so we don't process it again
  if (decl[processed]) return;

  const parsedValue = valueParser(decl.value);
  const fontSize = parsedValue.nodes[0];

  if (parsedValue.nodes.length !== 1 || fontSize.type !== 'word') {
    return;
  }

  const dimension = valueParser.unit(fontSize.value);

  if (!isTransformableLength(dimension)) return;

  const dimensionInPx = toPx(`${dimension.number}${dimension.unit}`);

  if (!isKeyof(fontSizeMap, dimensionInPx)) return;

  decl.value = `var(${fontSizeMap[dimensionInPx]})`;

  // @ts-expect-error - Mark the declaration as processed
  decl[processed] = true;
}

function handleFontWeight(decl: Declaration): void {
  // @ts-expect-error - Skip if processed so we don't process it again
  if (decl[processed]) return;

  const parsedValue = valueParser(decl.value);
  const fontWeight = parsedValue.nodes[0];

  if (parsedValue.nodes.length !== 1 || fontWeight.type !== 'word') {
    return;
  }

  if (!isKeyof(fontWeightMap, fontWeight.value)) return;

  decl.value = `var(${fontWeightMap[fontWeight.value]})`;

  // @ts-expect-error - Mark the declaration as processed
  decl[processed] = true;
}

function handleFontLineHeight(decl: Declaration): void {
  // @ts-expect-error - Skip if processed so we don't process it again
  if (decl[processed]) return;

  const parsedValue = valueParser(decl.value);
  const lineHeight = parsedValue.nodes[0];

  if (parsedValue.nodes.length !== 1 || lineHeight.type !== 'word') {
    return;
  }

  const dimension = valueParser.unit(lineHeight.value);

  if (!isTransformableLength(dimension)) return;

  const dimensionInPx = toPx(`${dimension.number}${dimension.unit}`);

  if (!isKeyof(fontLineHeightMap, dimensionInPx)) return;

  decl.value = `var(${fontLineHeightMap[dimensionInPx]})`;

  // @ts-expect-error - Mark the declaration as processed
  decl[processed] = true;
}
