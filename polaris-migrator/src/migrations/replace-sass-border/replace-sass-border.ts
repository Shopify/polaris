import type {FileInfo, API, Options} from 'jscodeshift';
import postcss, {Plugin} from 'postcss';
import valueParser from 'postcss-value-parser';

import {POLARIS_MIGRATOR_COMMENT} from '../../constants';
import {
  getFunctionArgs,
  isNumericOperator,
  isSassFunction,
  namespace,
  NamespaceOptions,
} from '../../utilities/sass';
import {isKeyOf} from '../../utilities/type-guards';

export default function replaceSassBorder(
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
  const namespacedBorder = namespace('border', options);

  return {
    postcssPlugin: 'replace-sass-lengths',
    Declaration(decl) {
      // @ts-expect-error - Skip if processed so we don't process it again
      if (decl[processed]) return;

      let handler;

      if (borderProps.includes(decl.prop)) handler = handleBorder;
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
        decl.before(postcss.comment({text: POLARIS_MIGRATOR_COMMENT}));
        decl.before(
          postcss.comment({
            text: `${decl.prop}: ${parsedValue.toString()};`,
          }),
        );
      } else {
        decl.value = parsedValue.toString();
      }

      //
      // Handlers
      //

      function handleBorder() {
        parsedValue.walk((node) => {
          if (node.type === 'word') {
            if (globalValues.has(node.value)) return;
            if (isNumericOperator(node)) {
              hasNumericOperator = true;
              return;
            }
          }

          if (node.type === 'function') {
            if (isSassFunction(namespacedBorder, node)) {
              targets.push({replaced: false});

              const args = getFunctionArgs(node);

              if (!(args.length === 0 || args.length === 1)) return;

              // `border()` args reference:
              // https://github.com/shopify/polaris/blob/2b14c0b60097f75d21df7eaa744dfaf84f8f53f7/documentation/guides/legacy-polaris-v8-public-api.scss#L641
              const value = args[0] ?? 'base';

              if (!isKeyOf(borderMap, value)) return;

              targets.at(-1)!.replaced = true;

              node.value = 'var';
              node.nodes = [
                {
                  type: 'word',
                  value: borderMap[value],
                  sourceIndex: node.nodes[0]?.sourceIndex ?? 0,
                  sourceEndIndex: borderMap[value].length,
                },
              ];
            }

            return StopWalkingFunctionNodes;
          }
        });
      }

      function handleBorderWidth() {
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

            if (!isKeyOf(borderWidthMap, valueInPx)) return;

            targets.at(-1)!.replaced = true;

            node.value = `var(${borderWidthMap[valueInPx]})`;
            return;
          }

          if (node.type === 'function') {
            if (isSassFunction(namespacedRem, node)) {
              targets.push({replaced: false});

              const args = getFunctionArgs(node);

              if (args.length !== 1) return;

              const valueInPx = toTransformablePx(args[0]);

              if (!isKeyOf(borderWidthMap, valueInPx)) return;

              targets.at(-1)!.replaced = true;

              node.value = 'var';
              node.nodes = [
                {
                  type: 'word',
                  value: borderWidthMap[valueInPx],
                  sourceIndex: node.nodes[0]?.sourceIndex ?? 0,
                  sourceEndIndex: borderWidthMap[valueInPx].length,
                },
              ];
            }

            return StopWalkingFunctionNodes;
          }
        });
      }
    },
  };
};

const globalValues = new Set(['inherit', 'initial', 'unset']);

const borderTokenMap = {
  '1px': '--p-border-1',
  '2px': '--p-border-2',
  '3px': '--p-border-3',
  '4px': '--p-border-4',
  '5px': '--p-border-5',
};

const borderProps = [
  'border',
  'border-top',
  'border-right',
  'border-bottom',
  'border-left',
];

const borderWidthProps = [
  'border-width',
  'border-width-top',
  'border-width-right',
  'border-width-bottom',
  'border-width-left',
];

const borderMap = {
  base: '--p-border-base',
  dark: '--p-border-dark',
  transparent: '--p-border-transparent',
  divider: '	--p-border-divider',
} as const;

const borderWidthMap = {
  '1px': '--p-border-1',
  '2px': '--p-border-2',
  '3px': '--p-border-3',
  '4px': '--p-border-4',
  '5px': '--p-border-5',
  base: '--p-border-1',
  thick: '--p-border-2',
  thicker: '--p-border-3',
};

/**
 * Exit early and stop traversing descendant nodes:
 * https://www.npmjs.com/package/postcss-value-parser:~:text=Returning%20false%20in%20the%20callback%20will%20prevent%20traversal%20of%20descendent%20nodes
 */
const StopWalkingFunctionNodes = false;
