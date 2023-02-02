import type {FileInfo, API, Options} from 'jscodeshift';
import postcss, {Plugin} from 'postcss';
import valueParser from 'postcss-value-parser';

import {getFunctionArgs, isSassFunction} from '../../utilities/sass';
import {isKeyOf} from '../../utilities/type-guards';

export default function scssReplaceColorTokens(
  file: FileInfo,
  _: API,
  options: Options,
) {
  return postcss(plugin(options)).process(file.source, {
    syntax: require('postcss-scss'),
  }).css;
}

const processed = Symbol('processed');

interface PluginOptions extends Options {}

function plugin(_options: PluginOptions = {}): Plugin {
  return {
    postcssPlugin: 'scss-replace-color-tokens',
    Declaration(decl) {
      // @ts-expect-error - Skip if processed so we don't process it again
      if (decl[processed]) return;

      if (!isKeyOf(propertyMaps, decl.prop)) return;

      const replacementMap = propertyMaps[decl.prop];
      const parsed = valueParser(decl.value);

      parsed.walk((node) => {
        if (!isSassFunction('var', node)) return;

        for (const argNode of node.nodes) {
          if (
            argNode.type !== 'word' ||
            !argNode.value.startsWith('--p-') ||
            !isKeyOf(replacementMap, argNode.value)
          ) {
            continue;
          }

          argNode.value = replacementMap[argNode.value];
        }
      });

      decl.value = parsed.toString();

      // @ts-expect-error - Mark the declaration as processed
      decl[processed] = true;
    },
  };
}

const colorMap = {
  '--p-text': '--p-color-text',
};

// const backgroundColorMap = {};

// const borderColorMap = {};

// const fillColorMap = {};

const propertyMaps = {
  color: colorMap,
  // background: backgroundColorMap,
  // 'background-color': backgroundColorMap,
  // border: borderColorMap,
  // 'border-color': borderColorMap,
  // fill: fillColorMap,
};
