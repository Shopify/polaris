import type {API, FileInfo, Options} from 'jscodeshift';
import postcss, {Plugin} from 'postcss';
import valueParser, {FunctionNode, Node} from 'postcss-value-parser';

import {POLARIS_MIGRATOR_COMMENT} from '../../constants';

interface PluginOptions extends Options {
  namespace?: string;
}

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

const zIndexMap = {
  content: '--p-z-1',
  overlay: '--p-z-2',
};

const isValidElement = (
  element: unknown,
): element is keyof typeof zIndexMap => {
  return Object.keys(zIndexMap).includes(element as string);
};

const hasMoreThanOneArgument = (node: FunctionNode) => {
  if (!node.nodes || !Array.isArray(node.nodes)) return false;
  return node.nodes && node.nodes.length > 1;
};

const plugin = (options: PluginOptions = {}): Plugin => {
  const namespace = options?.namespace || '';
  // This migration could be run over sass with
  // proper legacy-polaris namespacing
  // or some other pre-processed / post-processed css
  // in which case we'll still want to transform a non-namespaced z-index fn.
  const functionName = namespace ? `${namespace}.z-index` : 'z-index';
  const isZIndexFn = (node: Node): node is FunctionNode => {
    return node.type === 'function' && node.value === functionName;
  };
  return {
    postcssPlugin: 'replace-sass-z-index',
    Declaration(decl) {
      // @ts-expect-error - Skip if processed so we don't process it again
      if (decl[processed]) return;

      const parsed = valueParser(decl.value);

      let containsZIndexFn = false;
      let containsCalculation = false;
      let containsSecondArgument = false;

      parsed.walk((node) => {
        if (isZIndexFn(node)) containsZIndexFn = true;
        if (isNumericOperator(node)) containsCalculation = true;

        if (!isZIndexFn(node)) return;

        if (hasMoreThanOneArgument(node)) {
          // If there's more than one argument to the zIndex fn
          // We assume they're passing in a custom map
          // In this case its unlikely this will resolve to a polaris token value
          // transform legacy zIndex usage to map-get and move on.
          containsSecondArgument = true;
          node.value = 'map-get';
        } else {
          const element = node.nodes[0]?.value ?? '';
          if (!isValidElement(element)) return;
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

      if (containsZIndexFn && (containsCalculation || containsSecondArgument)) {
        // Insert comment if the declaration value contains calculations
        // or if the invocation of zIndex has more than one argument
        decl.before(postcss.comment({text: POLARIS_MIGRATOR_COMMENT}));
        decl.before(
          postcss.comment({text: `${decl.prop}: ${parsed.toString()};`}),
        );
      } else {
        decl.value = parsed.toString();
      }

      // @ts-expect-error - Mark the declaration as processed
      decl[processed] = true;
    },
  };
};

export default function replaceSassZIndex(
  fileInfo: FileInfo,
  _: API,
  options: Options,
) {
  return postcss(plugin(options)).process(fileInfo.source, {
    syntax: require('postcss-scss'),
  }).css;
}
