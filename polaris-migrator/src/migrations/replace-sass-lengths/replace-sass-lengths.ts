import type {FileInfo, API, Options} from 'jscodeshift';
import postcss, {Plugin} from 'postcss';
import valueParser from 'postcss-value-parser';

import {POLARIS_MIGRATOR_COMMENT} from '../../constants';
import {
  hasNumericOperator,
  hasTransformableLength,
  toPx,
} from '../../utilities/sass';
import {isKeyOf, isValueOf} from '../../utilities/type-guards';

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

// Mapping of spacing tokens and their corresponding px values
const spacingTokensMap = {
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

      if (!isValueOf(targetProps, prop)) return;

      const parsedValue = valueParser(decl.value);

      if (!hasTransformableLength(parsedValue)) return;

      parsedValue.walk((node) => {
        if (node.type === 'function') {
          return StopWalkingFunctionNodes;
        } else if (node.type === 'word') {
          const valueInPx = toPx(node.value);

          if (!isKeyOf(spacingTokensMap, valueInPx)) return;

          node.value = `var(${spacingTokensMap[valueInPx]})`;
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
