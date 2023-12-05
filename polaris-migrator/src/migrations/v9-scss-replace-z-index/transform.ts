import type {Plugin} from 'postcss';
import postcss from 'postcss';
import type {API, FileInfo, Options} from 'jscodeshift';
import type {FunctionNode, Node} from 'postcss-value-parser';
import valueParser from 'postcss-value-parser';

import type {NamespaceOptions} from '../../utilities/sass';
import {
  namespace,
  hasSassFunction,
  isSassFunction,
  hasNumericOperator,
} from '../../utilities/sass';
import {POLARIS_MIGRATOR_COMMENT} from '../../utilities/constants';

export default function transformer(
  fileInfo: FileInfo,
  _: API,
  options: Options,
) {
  return postcss(plugin(options)).process(fileInfo.source, {
    syntax: require('postcss-scss'),
  }).css;
}

interface PluginOptions extends Options, NamespaceOptions {}

const processed = Symbol('processed');

const plugin = (options: PluginOptions = {}): Plugin => {
  const namespacedZIndex = namespace('z-index', options);
  const namespacedFixedElementStackingOrder = namespace(
    '$fixed-element-stacking-order',
    options,
  );
  return {
    postcssPlugin: 'v9-scss-replace-z-index',
    Declaration(decl) {
      // @ts-expect-error - Skip if processed so we don't process it again
      if (decl[processed]) return;

      const parsedValue = valueParser(decl.value);

      if (!hasSassFunction(namespacedZIndex, parsedValue)) return;

      let containsUnknownSecondArgument = false;

      parsedValue.walk((node: Node) => {
        if (!isSassFunction(namespacedZIndex, node)) return;
        if (hasMoreThanOneArgument(node)) {
          // If there's more than one argument to the zIndex fn
          // We assume they're passing in a custom map
          // In this case its unlikely this will resolve to a polaris token value
          // transform legacy zIndex usage to map-get and move on.

          const [key, _, map] = node.nodes;
          if (
            map.value === namespacedFixedElementStackingOrder &&
            isValidElement(key.value, fixedElementStackingOrder)
          ) {
            const fixedElementStackingOrderToken =
              fixedElementStackingOrder[key.value];
            node.value = 'var';
            node.nodes = [
              {
                type: 'word',
                value: fixedElementStackingOrderToken,
                sourceIndex: node.nodes[0]?.sourceIndex ?? 0,
                sourceEndIndex: fixedElementStackingOrderToken.length,
              },
            ];
          } else {
            // map.get arguments are in the reverse order to z-index arguments.
            // map.get expects the map object first, and the key second.
            containsUnknownSecondArgument = true;
            node.value = 'map.get';
            node.nodes.reverse();
          }
        } else {
          const element = node.nodes[0]?.value ?? '';
          if (!isValidElement<typeof zIndexMap>(element, zIndexMap)) return;
          const zIndexCustomProperty = zIndexMap[element];

          node.value = 'var';
          node.nodes = [
            {
              type: 'word',
              value: zIndexCustomProperty,
              sourceIndex: node.nodes[0]?.sourceIndex ?? 0,
              sourceEndIndex: zIndexCustomProperty.length,
            },
          ];
        }
      });

      if (hasNumericOperator(parsedValue) || containsUnknownSecondArgument) {
        // Insert comment if the declaration value contains calculations
        // or if the invocation of zIndex has more than one argument
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

const zIndexMap = {
  content: '--p-z-1',
  overlay: '--p-z-2',
};

const fixedElementStackingOrder = {
  'global-ribbon': '--p-z-3',
  'top-bar': '--p-z-4',
  'context-bar': '--p-z-5',
  'small-screen-loading-bar': '--p-z-6',
  'nav-backdrop': '--p-z-7',
  nav: '--p-z-8',
  'skip-to-content': '--p-z-9',
  backdrop: '--p-z-10',
  modal: '--p-z-11',
  toast: '--p-z-12',
};

function isValidElement<
  MapType extends typeof zIndexMap | typeof fixedElementStackingOrder,
>(element: unknown, mapObj: MapType): element is keyof typeof mapObj {
  return Object.keys(mapObj).includes(element as string);
}

const hasMoreThanOneArgument = (node: FunctionNode) => node.nodes.length > 1;
