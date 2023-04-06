import type {FileInfo, API, Options} from 'jscodeshift';
import type {Plugin} from 'postcss';
import postcss from 'postcss';
import valueParser from 'postcss-value-parser';

import {scss, POLARIS_MIGRATOR_COMMENT} from '../../utilities/constants';
import type {NamespaceOptions} from '../../utilities/sass';
import {
  getFunctionArgs,
  isSassFunction,
  namespace,
  createInlineComment,
} from '../../utilities/sass';
import {isKeyOf} from '../../utilities/types';

export default function transformer(
  fileInfo: FileInfo,
  _: API,
  options: Options,
) {
  return postcss(plugin(options)).process(fileInfo.source, {
    syntax: require('postcss-scss'),
  }).css;
}

export const extensions = scss.extensions;
export const options = {
  ...scss.options,
};

const processed = Symbol('processed');

interface PluginOptions extends Options, NamespaceOptions {}

const plugin = (options: PluginOptions = {}): Plugin => {
  const namespacedBorder = namespace('border', options);

  return {
    postcssPlugin: 'v9-scss-replace-border',
    Declaration(decl) {
      // @ts-expect-error - Skip if processed so we don't process it again
      if (decl[processed]) return;

      if (!borderProps.has(decl.prop)) return;

      /**
       * A collection of transformable values to migrate (e.g. decl lengths, functions, etc.)
       *
       * Note: This is evaluated at the end of each visitor execution to determine whether
       * or not to replace the declaration or insert a comment.
       */
      const targets: {replaced: boolean}[] = [];
      const parsedValue = valueParser(decl.value);

      handleBorderProps();

      if (targets.some(({replaced}) => !replaced)) {
        // Insert comment if the declaration value contains calculations
        decl.before(createInlineComment(POLARIS_MIGRATOR_COMMENT));
        decl.before(
          createInlineComment(`${decl.prop}: ${parsedValue.toString()};`),
        );
      } else {
        decl.value = parsedValue.toString();
      }

      //
      // Handlers
      //

      function handleBorderProps() {
        parsedValue.walk((node) => {
          if (
            node.type === 'function' &&
            isSassFunction(namespacedBorder, node)
          ) {
            targets.push({replaced: false});

            const args = getFunctionArgs(node);

            if (!(args.length === 0 || args.length === 1)) return;

            // `border()` args reference:
            // https://github.com/shopify/polaris/blob/2b14c0b60097f75d21df7eaa744dfaf84f8f53f7/documentation/guides/legacy-polaris-v8-public-api.scss#L641
            const value = args[0] ?? 'base';

            if (!isKeyOf(borderFunctionMap, value)) return;

            node.value = 'var';
            node.nodes = [
              {
                type: 'word',
                value: borderFunctionMap[value],
                sourceIndex: node.nodes[0]?.sourceIndex ?? 0,
                sourceEndIndex: borderFunctionMap[value].length,
              },
            ];

            targets[targets.length - 1]!.replaced = true;
          }
        });
      }
    },
  };
};

const borderProps = new Set([
  'border',
  'border-top',
  'border-right',
  'border-bottom',
  'border-left',
]);

const borderFunctionMap = {
  '': '--p-border-base',
  base: '--p-border-base',
  "'base'": '--p-border-base',
  dark: '--p-border-dark',
  "'dark'": '--p-border-dark',
  transparent: '--p-border-transparent',
  "'transparent'": '--p-border-transparent',
  divider: '	--p-border-divider',
  "'divider'": '	--p-border-divider',
} as const;
