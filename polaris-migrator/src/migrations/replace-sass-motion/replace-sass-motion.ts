import type {FileInfo, API, Options} from 'jscodeshift';
import postcss, {Plugin} from 'postcss';
import valueParser from 'postcss-value-parser';

import {POLARIS_MIGRATOR_COMMENT} from '../../constants';
import {
  NamespaceOptions,
  namespace,
  isSassFunction,
  isNumericOperator,
  getFunctionArgs,
  isTransformableDuration,
} from '../../utilities/sass';
import {isKeyOf} from '../../utilities/type-guards';

export default function replaceSassMotion(
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
  const namespacedDuration = namespace('duration', options);

  return {
    postcssPlugin: 'replace-sass-motion',
    Declaration(decl) {
      // @ts-expect-error - Skip if processed so we don't process it again
      if (decl[processed]) return;

      const handlers = {
        transition: handleTransitionProps,
        'transition-duration': handleTransitionProps,
        'transition-delay': handleTransitionProps,
      };

      if (!isKeyOf(handlers, decl.prop)) return;

      /**
       * A collection of transformable values to migrate (e.g. `decl` lengths, functions, etc.)
       *
       * Note: This is evaluated at the end of each visitor execution to determine whether
       * or not to replace the declaration or insert a comment.
       */
      const targets: {replaced: boolean}[] = [];
      let hasNumericOperator = false;

      const parsedValue = valueParser(decl.value);

      handlers[decl.prop]();

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

      function handleTransitionProps() {
        parsedValue.walk((node) => {
          if (node.type === 'word') {
            if (globalValues.has(node.value)) return;

            if (isNumericOperator(node)) {
              hasNumericOperator = true;
              return;
            }

            const dimension = valueParser.unit(node.value);

            if (!isTransformableDuration(dimension)) return;

            targets.push({replaced: false});

            const duration = `${dimension.number}${dimension.unit}`;

            if (!isKeyOf(durationMap, duration)) return;

            targets.at(-1)!.replaced = true;

            node.value = `var(${durationMap[duration]})`;

            return;
          }

          if (node.type === 'function') {
            if (isSassFunction(namespacedDuration, node)) {
              targets.push({replaced: false});

              const args = getFunctionArgs(node);

              if (!(args.length === 0 || args.length === 1)) return;

              // `duration()` args reference:
              // https://github.com/Shopify/polaris/blob/2b14c0b60097f75d21df7eaa744dfaf84f8f53f7/documentation/guides/legacy-polaris-v8-public-api.scss#L679
              const variant = args[0]?.replace(/['"]/g, '') ?? 'base';

              if (!isKeyOf(durationFunctionMap, variant)) return;

              const durationCustomProperty = durationFunctionMap[variant];

              targets.at(-1)!.replaced = true;

              node.value = 'var';
              node.nodes = [
                {
                  type: 'word',
                  value: durationCustomProperty,
                  sourceIndex: node.nodes[0]?.sourceIndex ?? 0,
                  sourceEndIndex: durationCustomProperty.length,
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

const durationMap = {
  '0': '--p-duration-0',
  '0s': '--p-duration-0',
  '0ms': '--p-duration-0',
  '50ms': '--p-duration-50',
  '0.05s': '--p-duration-50',
  '100ms': '--p-duration-100',
  '0.1s': '--p-duration-100',
  '150ms': '--p-duration-150',
  '0.15s': '--p-duration-150',
  '200ms': '--p-duration-200',
  '0.2s': '--p-duration-200',
  '250ms': '--p-duration-250',
  '0.25s': '--p-duration-250',
  '300ms': '--p-duration-300',
  '0.3s': '--p-duration-300',
  '350ms': '--p-duration-350',
  '0.35s': '--p-duration-350',
  '400ms': '--p-duration-400',
  '0.4s': '--p-duration-400',
  '450ms': '--p-duration-450',
  '0.45s': '--p-duration-450',
  '500ms': '--p-duration-500',
  '0.5s': '--p-duration-500',
  '5s': '--p-duration-5000',
};

const durationFunctionMap = {
  none: '--p-duration-0',
  fast: '--p-duration-100',
  base: '--p-duration-200',
  slow: '--p-duration-300',
  slower: '--p-duration-400',
  slowest: '--p-duration-500',
};

/**
 * Exit early and stop traversing descendant nodes:
 * https://www.npmjs.com/package/postcss-value-parser:~:text=Returning%20false%20in%20the%20callback%20will%20prevent%20traversal%20of%20descendent%20nodes
 */
const StopWalkingFunctionNodes = false;
