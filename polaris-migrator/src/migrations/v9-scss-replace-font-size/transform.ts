/* eslint-disable line-comment-position */

import type {FileInfo, API, Options} from 'jscodeshift';
import type {Plugin} from 'postcss';
import postcss from 'postcss';
import valueParser from 'postcss-value-parser';

import {POLARIS_MIGRATOR_COMMENT} from '../../utilities/constants';
import type {NamespaceOptions} from '../../utilities/sass';
import {
  createInlineComment,
  getFunctionArgs,
  isSassFunction,
  namespace,
  StopWalkingFunctionNodes,
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

const processed = Symbol('processed');

interface PluginOptions extends Options, NamespaceOptions {}

const plugin = (options: PluginOptions = {}): Plugin => {
  const namespacedFontSize = namespace('font-size', options);

  return {
    postcssPlugin: 'v9-scss-replace-font',
    Declaration(decl) {
      // @ts-expect-error - Skip if processed so we don't process it again
      if (decl[processed]) return;

      let needsFix = false;
      let needsComment = false;
      const parsedValue = valueParser(decl.value);

      parsedValue.walk((node) => {
        if (isSassFunction(namespacedFontSize, node)) {
          const args = getFunctionArgs(node);

          // `font-size()` args reference:
          // https://github.com/Shopify/polaris/blob/1738f17c739e06dcde4653a9783ca367e38b4e32/documentation/guides/legacy-polaris-v8-public-api.scss#L977
          const styleArg = args[0];
          const variantArg = args[1] ?? 'base';

          if (
            !(
              isKeyOf(fontSizeMap, styleArg) &&
              isKeyOf(fontSizeMap[styleArg], variantArg)
            )
          ) {
            needsComment = true;
            return StopWalkingFunctionNodes;
          }

          needsFix = true;
          const fontSizeVariant = fontSizeMap[styleArg][variantArg];

          if (fontSizeVariant.startsWith('--')) {
            node.value = 'var';
            node.nodes = [
              {
                type: 'word',
                value: fontSizeVariant,
                sourceIndex: node.nodes[0]?.sourceIndex ?? 0,
                sourceEndIndex: fontSizeVariant.length,
              },
            ];
          } else {
            // @ts-expect-error: We are intentionally changing the node type
            node.type = 'word';
            node.value = fontSizeVariant;
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

const fontSizeMap = {
  caption: {
    base: '0.8125rem', // 13px
    'large-screen': '--p-font-size-75',
  },
  heading: {
    base: '1.0625rem', // 17px
    'large-screen': '--p-font-size-200',
  },
  subheading: {
    base: '0.8125rem', // 13px
    'large-screen': '--p-font-size-75',
  },
  input: {
    base: '--p-font-size-200',
    'large-screen': '--p-font-size-100',
  },
  body: {
    base: '0.9375rem', // 15px
    'large-screen': '--p-font-size-100',
  },
  button: {
    base: '0.9375rem', // 15px
    'large-screen': '--p-font-size-100',
  },
  'button-large': {
    base: '1.0625rem', // 17px
    'large-screen': '--p-font-size-200',
  },
  'display-x-large': {
    base: '1.6875rem', // 27px
    'large-screen': '2.625rem', // 42px
  },
  'display-large': {
    base: '--p-font-size-400',
    'large-screen': '--p-font-size-500',
  },
  'display-medium': {
    base: '1.3125rem', // 21px
    'large-screen': '1.625rem', // 26px
  },
  'display-small': {
    base: '--p-font-size-200',
    'large-screen': '--p-font-size-300',
  },
};
