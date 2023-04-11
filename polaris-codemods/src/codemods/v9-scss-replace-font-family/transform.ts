import type {FileInfo, API, Options} from 'jscodeshift';
import type {Plugin} from 'postcss';
import postcss from 'postcss';
import valueParser from 'postcss-value-parser';

import {POLARIS_MIGRATOR_COMMENT, scss} from '../../utilities/constants';
import type {NamespaceOptions} from '../../utilities/sass';
import {
  createInlineComment,
  getFunctionArgs,
  isSassFunction,
  namespace,
  StopWalkingFunctionNodes,
} from '../../utilities/sass';
import {isKeyOf} from '../../utilities/types';

export const extensions = scss.extensions;
export const options = {
  ...scss.options,
};

export default function transformer(
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
  const namespacedFontFamily = namespace('font-family', options);

  return {
    postcssPlugin: 'v9-scss-replace-font-family',
    Declaration(decl) {
      // @ts-expect-error - Skip if processed so we don't process it again
      if (decl[processed]) return;

      let needsComment = false;
      let needsFix = false;
      const parsedValue = valueParser(decl.value);

      parsedValue.walk((node) => {
        if (isSassFunction(namespacedFontFamily, node)) {
          const args = getFunctionArgs(node);

          // `font-family()` args reference:
          // https://github.com/shopify/polaris/blob/2b14c0b60097f75d21df7eaa744dfaf84f8f53f7/documentation/guides/legacy-polaris-v8-public-api.scss#L945
          const family = args[0] ?? 'base';

          if (!isKeyOf(fontFamilyMap, family)) {
            needsComment = true;
            return StopWalkingFunctionNodes;
          }

          const fontFamilyCustomProperty = fontFamilyMap[family];

          needsFix = true;
          node.value = 'var';
          node.nodes = [
            {
              type: 'word',
              value: fontFamilyCustomProperty,
              sourceIndex: node.nodes[0]?.sourceIndex ?? 0,
              sourceEndIndex: fontFamilyCustomProperty.length,
            },
          ];

          return StopWalkingFunctionNodes;
        }
      });

      if (needsComment) {
        decl.before(createInlineComment(POLARIS_MIGRATOR_COMMENT));
        decl.before(
          createInlineComment(`${decl.prop}: ${parsedValue.toString()};`),
        );
      }

      if (needsFix) {
        decl.value = parsedValue.toString();
      }

      // @ts-expect-error - Mark the declaration as processed
      decl[processed] = true;
    },
  };
};

const fontFamilyMap = {
  base: '--p-font-family-sans',
  monospace: '--p-font-family-mono',
};
