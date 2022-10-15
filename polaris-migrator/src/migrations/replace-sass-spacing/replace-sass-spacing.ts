import type {FileInfo, API, Options} from 'jscodeshift';
import postcss, {Plugin} from 'postcss';
import valueParser, {FunctionNode} from 'postcss-value-parser';

import {POLARIS_MIGRATOR_COMMENT} from '../../constants';
import {
  NamespaceOptions,
  namespace,
  isSassFunction,
  isNumericOperator,
  getFunctionArgs,
  hasNegativeSassInterpolation,
  replaceNegativeSassInterpolation,
} from '../../utilities/sass';
import {isKeyOf} from '../../utilities/type-guards';

const spacingMap = {
  none: '--p-space-0',
  'extra-tight': '--p-space-1',
  tight: '--p-space-2',
  'base-tight': '--p-space-3',
  '': '--p-space-4',
  base: '--p-space-4',
  loose: '--p-space-5',
  'extra-loose': '--p-space-8',
};

const processed = Symbol('processed');

interface PluginOptions extends Options, NamespaceOptions {}

const plugin = (options: PluginOptions = {}): Plugin => {
  const namespacedSpacing = namespace('spacing', options);

  return {
    postcssPlugin: 'ReplaceSassSpacing',
    Declaration(decl) {
      // @ts-expect-error - Skip if processed so we don't process it again
      if (decl[processed]) return;

      /**
       * A collection of transformable values to migrate (e.g. decl lengths, functions, etc.)
       *
       * Note: This is evaluated at the end of each visitor execution to determine whether
       * or not to replace the declaration or insert a comment.
       */
      const targets: {replaced: boolean}[] = [];
      let hasNumericOperator = false;
      let isTargetInCalcFunction = false;
      let isTargetInterpolated = false;

      const parsedValue = valueParser(decl.value);

      handleDeclaration();

      if (
        isTargetInterpolated ||
        isTargetInCalcFunction ||
        targets.some(({replaced}) => !replaced || hasNumericOperator)
      ) {
        // Insert comment if the declaration value contains calculations
        decl.before(postcss.comment({text: POLARIS_MIGRATOR_COMMENT}));
        decl.before(
          postcss.comment({text: `${decl.prop}: ${parsedValue.toString()};`}),
        );
      } else {
        decl.value = parsedValue.toString();
      }

      //
      // Handlers
      //

      function handleDeclaration() {
        if (hasNegativeSassInterpolation(decl.value)) {
          replaceNegativeSassInterpolation(parsedValue);
        }

        parsedValue.walk((node) => {
          if (node.type === 'word') {
            if (isNumericOperator(node)) hasNumericOperator = true;

            return;
          }

          if (node.type === 'function') {
            if (
              isSassFunction(namespacedSpacing, node) ||
              isSassFunction(`#{${namespacedSpacing}`, node)
            ) {
              if (node.value.startsWith('#{')) {
                isTargetInterpolated = true;
                node.value = node.value.replace('#{', '');
              }
              handleSpacingFunction(node);
            }

            if (isSassFunction('calc', node)) {
              let hasSpacingFunction = false;

              const parsedCalc = valueParser(valueParser.stringify(node))
                .nodes[0] as FunctionNode;

              valueParser.walk(parsedCalc.nodes, (calcNode) => {
                if (calcNode.type !== 'function') return;

                if (
                  isSassFunction(namespacedSpacing, calcNode) ||
                  isSassFunction(`#{${namespacedSpacing}`, calcNode)
                ) {
                  if (calcNode.value.startsWith('#{')) {
                    isTargetInterpolated = true;
                    calcNode.value = calcNode.value.replace('#{', '');
                  }
                  hasSpacingFunction = true;
                  isTargetInCalcFunction = true;
                  handleSpacingFunction(calcNode);
                }

                return StopWalkingFunctionNodes;
              });

              if (hasSpacingFunction) node.nodes = parsedCalc.nodes;
            }

            return StopWalkingFunctionNodes;
          }
        });
      }

      function handleSpacingFunction(node: valueParser.FunctionNode) {
        targets.push({replaced: false});

        const args = getFunctionArgs(node);

        if (!(args.length === 0 || args.length === 1)) return;

        // `spacing()` args reference:
        // https://github.com/Shopify/polaris/blob/2b14c0b60097f75d21df7eaa744dfaf84f8f53f7/documentation/guides/legacy-polaris-v8-public-api.scss#L592
        const variant = args[0] ?? 'base';

        if (!isKeyOf(spacingMap, variant)) return;

        const spaceCustomProperty = spacingMap[variant];

        targets.at(-1)!.replaced = true;

        node.value = 'var';
        node.nodes = [
          {
            type: 'word',
            value: spaceCustomProperty,
            sourceIndex: node.nodes[0]?.sourceIndex ?? 0,
            sourceEndIndex: spaceCustomProperty.length,
          },
        ];
      }

      // @ts-expect-error - Mark the declaration as processed
      decl[processed] = true;
    },
  };
};

export default function replaceSassSpacing(
  file: FileInfo,
  _: API,
  options: Options,
) {
  return postcss(plugin(options)).process(file.source, {
    syntax: require('postcss-scss'),
  }).css;
}

/**
 * Exit early and stop traversing descendant nodes:
 * https://www.npmjs.com/package/postcss-value-parser:~:text=Returning%20false%20in%20the%20callback%20will%20prevent%20traversal%20of%20descendent%20nodes
 */
const StopWalkingFunctionNodes = false;
