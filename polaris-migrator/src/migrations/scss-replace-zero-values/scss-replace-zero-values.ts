import type {FileInfo, API} from 'jscodeshift';
import postcss, {Plugin} from 'postcss';
import valueParser, {Node} from 'postcss-value-parser';

import {isKeyOf} from '../../utilities/type-guards';
import {isPolarisVar, isSassFunction} from '../../utilities/sass';

export default function scssReplaceZeroValues(fileInfo: FileInfo, _: API) {
  return postcss(plugin()).process(fileInfo.source, {
    syntax: require('postcss-scss'),
  }).css;
}

const processed = Symbol('processed');

const plugin = (): Plugin => {
  return {
    postcssPlugin: 'scss-replace-zero-values',
    Declaration(decl) {
      // @ts-expect-error - Skip if processed so we don't process it again
      if (decl[processed]) return;

      let needsFix = false;
      const parsedValue = valueParser(decl.value);

      parsedValue.walk((node: Node) => {
        if (
          isSassFunction('var', node) &&
          isPolarisVar(node) &&
          isKeyOf(zeroValuesMap, node.nodes?.[0]?.value)
        ) {
          needsFix = true;

          // @ts-expect-error - Reassign the type to word
          node.type = 'word';
          node.value = zeroValuesMap[node.nodes?.[0]?.value];
        }
      });

      if (needsFix) {
        decl.value = parsedValue.toString();
      }

      // @ts-expect-error - Mark the declaration as processed
      decl[processed] = true;
    },
  };
};

const zeroValuesMap = {
  '--p-shadow-transparent': '0 0 0 0 transparent',
  '--p-duration-0': '0',
  '--p-space-0': '0',
};
