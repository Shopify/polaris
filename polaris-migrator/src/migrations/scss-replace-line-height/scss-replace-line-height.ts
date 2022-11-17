/* eslint-disable line-comment-position */

import type {FileInfo, API, Options} from 'jscodeshift';
import postcss, {Plugin} from 'postcss';
import valueParser from 'postcss-value-parser';

import {POLARIS_MIGRATOR_COMMENT} from '../../constants';
import {
  createInlineComment,
  getFunctionArgs,
  isSassFunction,
  namespace,
  NamespaceOptions,
  StopWalkingFunctionNodes,
} from '../../utilities/sass';
import {isKeyOf} from '../../utilities/type-guards';

export default function scssReplaceLineHeight(
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
  const namespacedLineHeight = namespace('line-height', options);

  return {
    postcssPlugin: 'scss-replace-line-height',
    Declaration(decl) {
      // @ts-expect-error - Skip if processed so we don't process it again
      if (decl[processed]) return;

      let needsFix = false;
      let needsComment = false;
      const parsedValue = valueParser(decl.value);

      parsedValue.walk((node) => {
        if (isSassFunction(namespacedLineHeight, node)) {
          const args = getFunctionArgs(node);

          // `line-height()` args reference:
          // https://github.com/shopify/polaris/blob/2b14c0b60097f75d21df7eaa744dfaf84f8f53f7/documentation/guides/legacy-polaris-v8-public-api.scss#L961
          const styleArg = args[0];
          const variantArg = args[1] ?? 'base';

          if (
            !(
              isKeyOf(lineHeightMap, styleArg) &&
              isKeyOf(lineHeightMap[styleArg], variantArg)
            )
          ) {
            needsComment = true;
            return StopWalkingFunctionNodes;
          }

          needsFix = true;
          const lineHeightVariant = lineHeightMap[styleArg][variantArg];

          if (lineHeightVariant.startsWith('--')) {
            node.value = 'var';
            node.nodes = [
              {
                type: 'word',
                value: lineHeightVariant,
                sourceIndex: node.nodes[0]?.sourceIndex ?? 0,
                sourceEndIndex: lineHeightVariant.length,
              },
            ];
          } else {
            // @ts-expect-error: We are intentionally changing the node type
            node.type = 'word';
            node.value = lineHeightVariant;
          }

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

const lineHeightMap = {
  caption: {
    base: '--p-font-line-height-2',
    'large-screen': '--p-font-line-height-1',
  },
  heading: {
    base: '--p-font-line-height-3',
  },
  subheading: {
    base: '--p-font-line-height-1',
  },
  input: {
    base: '--p-font-line-height-3',
  },
  body: {
    base: '--p-font-line-height-2',
  },
  button: {
    base: '--p-font-line-height-1',
  },
  'button-large': {
    base: '--p-font-line-height-2',
  },
  'display-x-large': {
    base: '2.25rem', // 36px
    'large-screen': '2.75rem', // 44px
  },
  'display-large': {
    base: '--p-font-line-height-4',
    'large-screen': '--p-font-line-height-5',
  },
  'display-medium': {
    base: '--p-font-line-height-4',
    'large-screen': '--p-font-line-height-5',
  },
  'display-small': {
    base: '--p-font-line-height-3',
    'large-screen': '--p-font-line-height-4',
  },
};
