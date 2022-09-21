import type {FileInfo} from 'jscodeshift';
import postcss, {Plugin} from 'postcss';
import valueParser, {Node} from 'postcss-value-parser';

import {POLARIS_MIGRATOR_COMMENT} from '../../constants';

// List of the props we want to run this migration on
const targetProps = [
  'padding',
  'padding-top',
  'padding-right',
  'padding-bottom',
  'padding-left',
];

const isTargetProp = (propName: string): boolean =>
  targetProps.includes(propName);

// Mapping of spacing tokens and their corresponding px values
const spacingTokensMap = {
  '0': '--p-space-0',
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
};

const isSpacingTokenValue = (
  value: string,
): value is keyof typeof spacingTokensMap =>
  Object.keys(spacingTokensMap).includes(value);

const processed = Symbol('processed');

function isNumericOperator(node: Node): boolean {
  return (
    node.value === '+' ||
    node.value === '-' ||
    node.value === '*' ||
    node.value === '/' ||
    node.value === '%'
  );
}

const plugin = (): Plugin => ({
  postcssPlugin: 'replace-sass-padding',
  Declaration(decl) {
    // @ts-expect-error - Skip if processed so we don't process it again
    if (decl[processed]) return;

    const prop = decl.prop;
    const parsedValue = valueParser(decl.value);

    if (!isTargetProp(prop)) return;

    let containsCalculation = false;

    parsedValue.walk((node) => {
      const dimension = valueParser.unit(node.value);

      if (isNumericOperator(node)) containsCalculation = true;

      if (node.type === 'word' && dimension && !containsCalculation) {
        switch (dimension.unit) {
          case '': {
            if (!isSpacingTokenValue(node.value)) return;
            // Does this correctly reassign the value or do we need to use decl.assign?
            node.value = `var(${spacingTokensMap[node.value]})`;
            break;
          }
          case 'px': {
            if (!isSpacingTokenValue(node.value)) return;
            node.value = `var(${spacingTokensMap[node.value]})`;
            break;
          }
          case 'rem':
          case 'em': {
            const pxNumber = parseFloat(dimension.number) * 16;
            const pxDimension = `${pxNumber}px`;
            if (!isSpacingTokenValue(pxDimension)) return;
            node.value = `var(${spacingTokensMap[pxDimension]})`;
            break;
          }
          default: {
            console.log(`Unit ${dimension.unit} is not supported`);
          }
        }
      }
      if (node.type === 'function') {
        const funcType = node.value;
        const funcValue = node.nodes[0]?.value ?? '';

        switch (funcType) {
          case 'calc': {
            containsCalculation = true;
            break;
          }
          case 'var': {
            break;
          }
          case 'rem': {
            // TODO: create logic to prevent innards from being converted
            break;
          }
          default: {
            console.log(`Function ${funcType} is not supported`);
          }
        }
      }
    });

    if (containsCalculation) {
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
