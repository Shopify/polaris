import type {FileInfo} from 'jscodeshift';
import postcss, {Plugin} from 'postcss';
import valueParser, {Node} from 'postcss-value-parser';
import {toPx} from '@shopify/polaris-tokens';

import {POLARIS_MIGRATOR_COMMENT} from '../../constants';

// List of the props we want to run this migration on
const targetProps = [
  'padding',
  'padding-top',
  'padding-right',
  'padding-bottom',
  'padding-left',
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

/**
 * All supported dimension units. These values are used to determine
 * if a decl.value can be converted to pixels and mapped to a Polaris custom property.
 * Note: The empty string is used to match the `0` value
 */
const supportedDimensionUnits = ['px', 'rem', ''];

const processed = Symbol('processed');

/**
 * Exit early and stop traversing descendant nodes:
 * https://www.npmjs.com/package/postcss-value-parser:~:text=Returning%20false%20in%20the%20callback%20will%20prevent%20traversal%20of%20descendent%20nodes
 */
const ExitAndStopTraversing = false;

const plugin = (): Plugin => ({
  postcssPlugin: 'replace-sass-padding',
  Declaration(decl) {
    // @ts-expect-error - Skip if processed so we don't process it again
    if (decl[processed]) return;

    const prop = decl.prop;
    const parsedValue = valueParser(decl.value);

    if (!isTargetProp(prop)) return;

    parsedValue.walk((node) => {
      if (node.type === 'function' && node.value === 'rem') {
        const argDimension = valueParser.unit(node.nodes[0]?.value ?? '');

        if (
          argDimension &&
          supportedDimensionUnits.includes(argDimension.unit)
        ) {
          const argInPx = toPx(`${argDimension.number}${argDimension.unit}`);

          if (!isSpacingTokenValue(argInPx)) return ExitAndStopTraversing;

          const spacingToken = spacingTokensMap[argInPx];

          node.value = 'var';
          node.nodes = [
            {
              type: 'word',
              value: spacingToken,
              sourceIndex: node.nodes[0]?.sourceIndex ?? 0,
              sourceEndIndex: spacingToken.length,
            },
            ...node.nodes.slice(1),
          ];
        }

        return ExitAndStopTraversing;
      } else if (node.type === 'word') {
        const dimension = valueParser.unit(node.value);

        if (dimension && supportedDimensionUnits.includes(dimension.unit)) {
          const dimensionInPx = toPx(`${dimension.number}${dimension.unit}`);

          if (!isSpacingTokenValue(dimensionInPx)) return;

          node.value = `var(${spacingTokensMap[dimensionInPx]})`;
        }
      }
    });

    if (hasCalculation(parsedValue)) {
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
});

export default function replaceSassPadding(fileInfo: FileInfo) {
  return postcss(plugin()).process(fileInfo.source, {
    syntax: require('postcss-scss'),
  }).css;
}

function hasCalculation(parsedValue: valueParser.ParsedValue): boolean {
  let hasCalc = false;

  parsedValue.walk((node) => {
    if (isNumericOperator(node)) hasCalc = true;
  });

  return hasCalc;
}

function isNumericOperator(node: Node): boolean {
  return (
    node.value === '+' ||
    node.value === '-' ||
    node.value === '*' ||
    node.value === '/' ||
    node.value === '%'
  );
}
