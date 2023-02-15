import path from 'path';

import type {FileInfo, API, Options} from 'jscodeshift';
import postcss, {Plugin} from 'postcss';
import valueParser from 'postcss-value-parser';

import {isSassFunction} from '../../utilities/sass';
import {isKeyOf} from '../../utilities/type-guards';
import {matchesStringOrRegExp} from '../../utilities/matchesStringOrRegExp';

interface ReplacementMap {
  [tokenName: string]: string;
}

interface ReplacementMaps {
  [propertyName: string]: ReplacementMap;
}

interface PluginOptions extends Options {
  decl?: string;
  from?: string;
  to?: string;
  maps?: string;
  replacementMaps?: ReplacementMaps;
}

export default function v11StylesReplaceCustomProperty(
  file: FileInfo,
  _: API,
  options: PluginOptions,
) {
  return postcss(plugin(options)).process(file.source, {
    syntax: require('postcss-scss'),
  }).css;
}

const processed = Symbol('processed');

function plugin(options: PluginOptions = {}): Plugin {
  let replacementMaps: ReplacementMaps | undefined;

  if (options.maps && (options.from || options.to || options.decl)) {
    throw new Error('--maps is not permitted with --from or --to');
  }

  if (options.maps) {
    const mapsPath = path.resolve(process.cwd(), options.maps);

    replacementMaps = require(mapsPath)!.default;
  } else if (options.from && options.to) {
    replacementMaps = {
      [options.decl || '/.+/']: {
        [options.from]: options.to,
      },
    };
  } else if (options.replacementMaps) {
    replacementMaps = options.replacementMaps;
  }

  if (!replacementMaps) {
    throw new Error('Unable to resolve the replacement maps');
  }

  const replacementMapsKeys = Object.keys(replacementMaps);

  return {
    postcssPlugin: 'v11-styles-replace-custom-property',
    Declaration(decl) {
      // @ts-expect-error - Skip if processed so we don't process it again
      if (decl[processed] || !replacementMaps) return;

      const matchedDecl = matchesStringOrRegExp(decl.prop, replacementMapsKeys);

      if (!matchedDecl) return;

      const replacementMap = replacementMaps[matchedDecl.pattern.toString()];
      const parsedValue = valueParser(decl.value);

      parsedValue.walk((node) => {
        if (!isSassFunction('var', node)) return;

        for (const argNode of node.nodes) {
          if (
            argNode.type !== 'word' ||
            !argNode.value.startsWith('--p-') ||
            !isKeyOf(replacementMap, argNode.value)
          ) {
            continue;
          }

          const replacement = replacementMap[argNode.value];

          if (replacement.startsWith('--')) {
            argNode.value = replacement;
            continue;
          }

          // @ts-expect-error - Reassign the type to word
          node.type = 'word';
          node.value = replacement;
          break;
        }
      });

      decl.value = parsedValue.toString();

      // @ts-expect-error - Mark the declaration as processed
      decl[processed] = true;
    },
  };
}
