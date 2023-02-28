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
  decls: {
    [propertyName: string]: ReplacementMap;
  };
  atRules: {
    [atRuleName: string]: {
      [atRuleParam: string]: ReplacementMap;
    };
  };
}

interface PluginOptions extends Options {
  atRule?: string;
  atRuleParam?: string;
  decl?: string;
  from?: string;
  to?: string;
  maps?: string;
  replacementMaps?: ReplacementMaps;
}

export default function stylesReplaceCustomProperty(
  file: FileInfo,
  _: API,
  options: PluginOptions,
) {
  return postcss(plugin(options)).process(file.source, {
    syntax: require('postcss-scss'),
  }).css;
}

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
      decls: {
        [options.decl || '/.+/']: {
          [options.from]: options.to,
        },
      },
      atRules: {
        [options.atRule || '/.+/']: {
          [options.atRuleParam || '/.+/']: {
            [options.from]: options.to,
          },
        },
      },
    };
  } else if (options.replacementMaps) {
    replacementMaps = options.replacementMaps;
  }

  if (!replacementMaps) {
    throw new Error('Unable to resolve the replacement maps');
  }

  replacementMaps.atRules ||= {};
  replacementMaps.decls ||= {};

  const replacementAtRuleNames = Object.keys(replacementMaps.atRules);
  const replacementDeclPropertyNames = Object.keys(replacementMaps.decls);

  return {
    postcssPlugin: 'styles-replace-custom-property',
    Root(root) {
      root.walkAtRules((atRule) => {
        if (!replacementMaps) return;

        const matchedAtRuleName = matchesStringOrRegExp(
          atRule.name,
          replacementAtRuleNames,
        );

        if (!matchedAtRuleName) return;

        const atRuleNameReplacementMap =
          replacementMaps.atRules[matchedAtRuleName.pattern.toString()];

        const atRuleNameParams = Object.keys(atRuleNameReplacementMap);

        const matchedAtRuleParam = matchesStringOrRegExp(
          atRule.params,
          atRuleNameParams,
        );

        if (!matchedAtRuleParam) return;

        const replacementMap =
          atRuleNameReplacementMap[matchedAtRuleParam.pattern.toString()];

        const parsedValue = valueParser(atRule.params);

        parsedValue.walk(processParsedValue(replacementMap));

        atRule.params = parsedValue.toString();
      });

      root.walkDecls((decl) => {
        if (!replacementMaps) return;

        const matchedDecl = matchesStringOrRegExp(
          decl.prop,
          replacementDeclPropertyNames,
        );

        if (!matchedDecl) return;

        const replacementMap =
          replacementMaps.decls[matchedDecl.pattern.toString()];

        const parsedValue = valueParser(decl.value);

        parsedValue.walk(processParsedValue(replacementMap));

        decl.value = parsedValue.toString();
      });
    },
  };
}

function processParsedValue(replacementMap: ReplacementMap) {
  return (node: valueParser.Node) => {
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

      // @ts-expect-error - We intentionally replace the var(--p-*) function with a value
      node.type = 'word';
      node.value = replacement;
      break;
    }
  };
}
