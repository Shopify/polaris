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
    [propertyNamePattern: string]: ReplacementMap;
  };
  atRules: {
    [atRuleNamePattern: string]: {
      [atRuleIdentifier: string]: ReplacementMap;
    };
  };
}

interface PluginOptions extends Options {
  namespace?: string;
  atRule?: string;
  atRuleIdentifier?: string;
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
  const exactNamePattern = getExactNamePattern(options);

  let replacementMaps: ReplacementMaps | undefined;

  if (options.maps && (options.from || options.to || options.decl)) {
    throw new Error('--maps is not permitted with --from or --to');
  }

  if (options.maps) {
    const mapsPath = path.resolve(process.cwd(), options.maps);

    replacementMaps = require(mapsPath)!.default;
  } else if (options.from && options.to) {
    const fromTo = {[options.from]: options.to};
    replacementMaps = {
      decls: {
        [options.decl || '/.+/']: fromTo,
      },
      atRules: {
        [options.atRule || '/.+/']: options.atRuleIdentifier
          ? Object.fromEntries(
              options.atRuleIdentifier
                .split(',')
                .map((identifier) => [identifier, fromTo]),
            )
          : {'.+': fromTo},
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

        const atRuleNameReplacementMap = Object.fromEntries(
          Object.entries(
            replacementMaps.atRules[matchedAtRuleName.pattern.toString()],
          ).map(([key, value]) => [exactNamePattern(key), value]),
        );

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

function getExactNamePattern(options: PluginOptions) {
  const namespacePattern = options?.namespace
    ? String.raw`(${options.namespace}\.)`
    : String.raw`(?:[\w-]+\.)?`;

  return function exactNamePattern(name: string) {
    // Using `^` to match the start of a string since postcss normalizes the input
    // https://regex101.com/r/3tzvIW/1
    return new RegExp(
      String.raw`^${namespacePattern}(?<![\w-])${name}(?![\w-])`,
    );
  };
}
