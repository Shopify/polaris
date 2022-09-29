import type {FileInfo, API, Options} from 'jscodeshift';
import postcss, {Plugin} from 'postcss';
import valueParser from 'postcss-value-parser';
import {toPx} from '@shopify/polaris-tokens';

import {POLARIS_MIGRATOR_COMMENT} from '../../constants';
import {hasNumericOperator} from '../../utilities/sass';

// List of the props we want to run this migration on
const targetProps = [
  'padding',
  'padding-top',
  'padding-right',
  'padding-bottom',
  'padding-left',
  'padding-inline',
  'padding-inline-start',
  'padding-inline-end',
  'padding-block',
  'padding-block-start',
  'padding-block-end',
  'margin',
  'margin-top',
  'margin-right',
  'margin-bottom',
  'margin-left',
  'margin-inline',
  'margin-inline-start',
  'margin-inline-end',
  'margin-block',
  'margin-block-start',
  'margin-block-end',
] as const;

type TargetProp = typeof targetProps[number];

const isTargetProp = (propName: unknown): propName is TargetProp =>
  targetProps.includes(propName as TargetProp);

// Mapping of spacing tokens and their corresponding px values
const spacingTokensMap = {
  '0': '--p-space-0',
  '0px': '--p-space-0',
  '1px': '--p-space-025',
  '2px': '--p-space-05',
  '4px': '--p-space-1',
  '8px': '--p-space-2',
  '12px': '--p-space-3',
  '16px': '--p-space-4',
  '20px': '--p-space-5',
  '24px': '--p-space-6',
  '32px': '--p-space-8',
  '40px': '--p-space-10',
  '48px': '--p-space-12',
  '64px': '--p-space-16',
  '80px': '--p-space-20',
  '96px': '--p-space-24',
  '112px': '--p-space-28',
  '128px': '--p-space-32',
} as const;

type SpacingToken = keyof typeof spacingTokensMap;

const isSpacingTokenValue = (value: unknown): value is SpacingToken =>
  Object.keys(spacingTokensMap).includes(value as SpacingToken);

const processed = Symbol('processed');

/**
 * Exit early and stop traversing descendant nodes:
 * https://www.npmjs.com/package/postcss-value-parser:~:text=Returning%20false%20in%20the%20callback%20will%20prevent%20traversal%20of%20descendent%20nodes
 */
const StopWalkingFunctionNodes = false;

interface PluginOptions extends Options {}

const plugin = (_options: PluginOptions = {}): Plugin => {
  return {
    postcssPlugin: 'replace-sass-lengths',
    Declaration(decl) {
      // @ts-expect-error - Skip if processed so we don't process it again
      if (decl[processed]) return;

      const prop = decl.prop;

      if (!isTargetProp(prop)) return;

      const parsedValue = valueParser(decl.value);

      if (!hasTransformableLength(parsedValue)) return;

      parsedValue.walk((node) => {
        if (node.type === 'function') {
          return StopWalkingFunctionNodes;
        } else if (node.type === 'word') {
          const dimension = valueParser.unit(node.value);

          if (isTransformableLength(dimension)) {
            const dimensionInPx = toPx(`${dimension.number}${dimension.unit}`);

            if (!isSpacingTokenValue(dimensionInPx)) return;

            node.value = `var(${spacingTokensMap[dimensionInPx]})`;
          }
        }
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

export default function replaceSassLengths(
  fileInfo: FileInfo,
  _: API,
  options: Options,
) {
  return postcss(plugin(options)).process(fileInfo.source, {
    syntax: require('postcss-scss'),
  }).css;
}

/**
 * All supported dimension units. These values are used to determine
 * if a decl.value can be converted to pixels and mapped to a Polaris custom property.
 * Note: The empty string is used to match the `0` value
 */
const transformableLengthUnits = ['px', 'rem'];

function isTransformableLength(
  dimension: false | valueParser.Dimension,
): dimension is valueParser.Dimension {
  if (!dimension) return false;

  // Zero is the only unitless length we can transform
  if (dimension.unit === '' && dimension.number === '0') return true;

  return transformableLengthUnits.includes(dimension.unit);
}

function hasTransformableLength(parsedValue: valueParser.ParsedValue): boolean {
  let transformableLength = false;

  parsedValue.walk((node) => {
    if (
      node.type === 'word' &&
      isTransformableLength(valueParser.unit(node.value))
    ) {
      transformableLength = true;
    }
  });

  return transformableLength;
}
