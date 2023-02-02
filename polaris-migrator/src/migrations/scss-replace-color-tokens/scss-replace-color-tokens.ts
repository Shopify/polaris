import type {FileInfo, API, Options} from 'jscodeshift';
import postcss, {Plugin} from 'postcss';
import valueParser from 'postcss-value-parser';

import {getFunctionArgs} from '../../utilities/sass';
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
        if (node.type !== 'function' || node.value !== 'var') return;

        const args = getFunctionArgs(node);

        const polarisCustomPropertyIndex = args.findIndex((arg) =>
          arg.startsWith('--p-'),
        );

        const polarisCustomProperty = args[polarisCustomPropertyIndex];

        if (!isKeyOf(replacementMap, polarisCustomProperty)) return;

        args[polarisCustomPropertyIndex] =
          replacementMap[polarisCustomProperty];

        node.nodes = [
          {
            ...node.nodes[0],
            type: 'word',
            value: args.join(', '),
          },
        ];
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
