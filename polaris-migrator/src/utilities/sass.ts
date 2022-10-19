import type {FileInfo, API, Options} from 'jscodeshift';
import postcss, {
  Root,
  Plugin,
  Container,
  Declaration,
  Node as PostCSSNode,
  Rule as PostCSSRule,
  Comment as PostCSSComment,
  AtRule,
} from 'postcss';
import valueParser, {
  Node,
  ParsedValue,
  FunctionNode,
  Dimension,
} from 'postcss-value-parser';
import {toPx} from '@shopify/polaris-tokens';
import prettier from 'prettier';

import {POLARIS_MIGRATOR_COMMENT} from '../constants';

const defaultNamespace = '';

function getNamespace(options?: NamespaceOptions) {
  return options?.namespace || defaultNamespace;
}

export function getNamespacePattern(options?: NamespaceOptions) {
  const namespace = getNamespace(options);

  return namespace ? String.raw`${namespace}\.` : defaultNamespace;
}

export interface NamespaceOptions {
  namespace?: string;
}

export function namespace(name: string, options?: NamespaceOptions) {
  const namespace = getNamespace(options);
  return namespace ? `${namespace}.${name}` : name;
}

/**
 * Checks if a `valueParser` node is a [Sass numeric operator](https://sass-lang.com/documentation/operators/numeric)
 */
export function isNumericOperator(node: Node): boolean {
  return (
    node.value === '+' ||
    node.value === '-' ||
    node.value === '*' ||
    node.value === '/' ||
    node.value === '%'
  );
}

/**
 * Checks if any descendant `valueParser` node is a numeric operator
 */
export function hasNumericOperator(parsedValue: ParsedValue): boolean {
  let containsNumericOperator = false;

  parsedValue.walk((node) => {
    if (isNumericOperator(node)) containsNumericOperator = true;
  });

  return containsNumericOperator;
}

/**
 * Checks if a `valueParser` node is a given Sass function
 *
 * @example
 * const namespacedRem = namespace('rem', options);
 *
 * if (isSassFunction(namespacedRem, node)) node // FunctionNode
 */
export function isSassFunction(name: string, node: Node): node is FunctionNode {
  return node.type === 'function' && node.value === name;
}

/**
 * Checks if any descendant `valueParser` node is a given Sass function
 *
 * @example
 * const namespacedRem = namespace('rem', options);
 *
 * if (!hasSassFunction(namespacedRem, parsedValue)) return;
 */
export function hasSassFunction(
  name: string,
  parsedValue: ParsedValue,
): boolean {
  let containsSassFunction = false;

  parsedValue.walk((node) => {
    if (isSassFunction(name, node)) containsSassFunction = true;
  });

  return containsSassFunction;
}

/**
 * Check whether a string has Sass interpolation
 */
export function hasSassInterpolation(string: string) {
  return /#\{.+?\}/.test(string);
}

/**
 * Check whether a string has negative Sass interpolation
 */
export function hasNegativeSassInterpolation(string: string) {
  return /-#\{.+?\}/.test(string);
}

/**
 * Replace negative Sass interpolations with a multiplication operator and a negative number
 *
 * @example
 * // Before
 * -#{spacing()};
 *
 * // After
 * -1 * ${spacing()};
 */
export function replaceNegativeSassInterpolation(parsedValue: ParsedValue) {
  let newNodes: Node[] = [];
  parsedValue.walk((node, index, nodes) => {
    const containsInterpolation = /-#\{.+?/.test(node.value);
    if (!containsInterpolation) return;

    node.value = node.value.replace('-#{', '#{');

    const left = index > 0 ? nodes.slice(0, index) : [];
    const right = nodes.length - 1 > index ? nodes.slice(index + 1) : [];

    newNodes = [
      ...left,
      {type: 'word', value: '-1'},
      {type: 'space', value: ' '},
      {type: 'word', value: '*'},
      {type: 'space', value: ' '},
      node,
      ...right,
    ] as Node[];
  });
  parsedValue.nodes = newNodes;
}

/**
 * Remove the Sass interpolation from parsedValue
 */
export function removeSassInterpolation(
  namespace: string,
  parsedValue: ParsedValue,
) {
  parsedValue.walk((node, index, nodes) => {
    const regexp = new RegExp(`#{${namespace}`);
    const containsInterpolation = regexp.test(node.value);
    if (containsInterpolation) {
      node.value = node.value.replace(/#\{/, '');
      nodes[index + 1].value = nodes[index + 1].value.replace(/}/, '');
    }
  });

  parsedValue.nodes = parsedValue.nodes.filter(
    (node) => !(node.type === 'word' && node.value === ''),
  );
}

export function getFunctionArgs(node: FunctionNode): string[] {
  const args: string[] = [];

  let arg = '';

  node.nodes.forEach((node) => {
    if (node.type === 'div' && node.value === ',') {
      args.push(arg);
      arg = '';
      return;
    }

    arg += valueParser.stringify(node);
  });

  if (arg) {
    args.push(arg);
  }

  return args;
}

/**
 * Removes surrounding quotes from a string
 * @example
 * const string = '"hello"';
 * stripQuotes(string); // hello
 */
export function stripQuotes(string: string) {
  return string.replace(/^['"]|['"]$/g, '');
}

/**
 * All transformable dimension units. These values are used to determine
 * if a decl.value can be converted to pixels and mapped to a Polaris custom property.
 */
export const transformableLengthUnits = ['px', 'rem'];

export function isUnitlessZero(dimension: false | Dimension) {
  return dimension && dimension.unit === '' && dimension.number === '0';
}

export function isTransformableLength(
  dimension: false | Dimension,
): dimension is Dimension {
  if (!dimension) return false;

  return transformableLengthUnits.includes(dimension.unit);
}

export function hasTransformableLength(parsedValue: ParsedValue): boolean {
  let transformableLength = false;

  parsedValue.walk((node) => {
    if (
      node.type === 'word' &&
      isTransformableLength(valueParser.unit(node.value))
    ) {
      transformableLength = true;
    }
  });

  return transformableLength;
}

export function toTransformablePx(value: string) {
  const dimension = valueParser.unit(value);

  if (!isTransformableLength(dimension)) return;

  return toPx(`${dimension.number}${dimension.unit}`);
}

/**
 * Exit early and stop traversing descendant nodes:
 * https://www.npmjs.com/package/postcss-value-parser:~:text=Returning%20false%20in%20the%20callback%20will%20prevent%20traversal%20of%20descendent%20nodes
 */
export const StopWalkingFunctionNodes = false;

export function createInlineComment(text: string, options?: {prose?: boolean}) {
  const formatted = prettier
    .format(text, {
      parser: options?.prose ? 'markdown' : 'scss',
      proseWrap: 'never',
      printWidth: 9999,
    })
    .trim();
  const comment = postcss.comment({text: formatted});

  comment.raws.left = ' ';
  comment.raws.inline = true;

  return comment;
}

interface PluginOptions extends Options, NamespaceOptions {
  partialFixStrategy: 'fix' | 'report' | undefined | false;
  // Only applies when fixing
  __injectReportsAsComments: boolean;
}

interface Report {
  node: PostCSSNode;
  severity: 'warning' | 'error' | 'suggestion';
  message: string;
}

interface PluginContext {
  fix: boolean;
}

// Extracted from stylelint
type StylelintRuleBase<P = any, S = any> = (
  primaryOption: P,
  secondaryOptions: {[key: string]: S},
  context: PluginContext,
) => (root: Root) => void;

interface StylelintRuleMeta {
  url: string;
  deprecated?: boolean;
  fixable?: boolean;
}

type StylelintRule<P = any, S = any> = StylelintRuleBase<P, S> & {
  ruleName: string;
  meta?: StylelintRuleMeta;
};

export type PolarisMigrator<P = any, S = any> = (
  primaryOption: P,
  secondaryOptions: {
    options: {[key: string]: S};
    methods: {
      report: (report: Report) => void;
      each: <T extends Container>(
        root: T,
        walker: (decl: PostCSSNode) => false | void,
      ) => void;
      walk: <T extends Container>(
        root: T,
        walker: (decl: PostCSSNode) => false | void,
      ) => void;
      walkComments: <T extends Container>(
        root: T,
        walker: (comment: PostCSSComment) => false | void,
      ) => void;
      walkAtRules: <T extends Container>(
        root: T,
        atRuleWalker: (
          atRule: AtRule,
          parsedValue: ParsedValue,
        ) => false | void,
      ) => void;
      walkDecls: <T extends Container>(
        root: T,
        declWalker: (
          decl: Declaration,
          parsedValue: ParsedValue,
        ) => false | void,
      ) => void;
      walkRules: <T extends Container>(
        root: T,
        ruleWalker: (decl: PostCSSRule) => false | void,
      ) => void;
    };
  },
  context: PluginContext,
) => (root: Root) => void;

// Expose a stylelint-like API for creating sass migrators so we can easily
// migrate to that tool in the future.
function convertStylelintRuleToPostcssProcessor(ruleFn: StylelintRule) {
  return (fileInfo: FileInfo, _: API, options: Options) => {
    const plugin: Plugin = {
      postcssPlugin: ruleFn.ruleName,
      // PostCSS will rewalk the AST every time a declaration/rule/etc is
      // mutated by a plugin. This can be useful in some cases, but in ours we
      // only want single-pass behaviour.
      //
      // This can be avoided in 2 ways:
      //
      // 1) Flagging each declaration as we pass it, then skipping it on
      //    subsequent passes.
      // 2) Using postcss's Once() plugin callback.
      //
      // stylelint also uses `Once()`, so we're able to remove this once we've
      // migrated:
      // https://github.com/stylelint/stylelint/blob/cb425cb/lib/postcssPlugin.js#L22
      Once(root: Root) {
        // NOTE: For fullest compatibility with stylelint, we initialise the
        // rule here _inside_ the postcss Once function just like stylelint
        // does. I _think_ this means multiple passes can be performed without
        // rules accidentally retaining scoped variables, etc.
        const ruleProcessor = ruleFn(
          // Normally, this comes from stylelint config, but for this shim we
          // just hard-code it, and instead rely on the "seconary" options
          // object for passing through the jscodeshift options.
          true,
          {
            ...options,
            partialFixStrategy: 'report',
            __injectReportsAsComments: true,
          },
          {fix: true},
        );

        ruleProcessor(root);
      },
    };

    return postcss(plugin).process(fileInfo.source, {
      syntax: require('postcss-scss'),
    }).css;
  };
}

export function createStylelintRule(ruleName: string, ruleFn: PolarisMigrator) {
  const wrappedRule: StylelintRule = ((
    primary,
    {
      partialFixStrategy = 'fix',
      __injectReportsAsComments = false,
      ...secondaryOptions
    }: PluginOptions,
    context,
  ) => {
    const reports = new Map<PostCSSNode, Report[]>();
    const suggestions = new Map<PostCSSNode, string>();

    const addDedupedReport = (newReport: Report) => {
      if (!reports.has(newReport.node)) {
        reports.set(newReport.node, []);
      }

      const reportsForNode = reports.get(newReport.node)!;

      if (
        reportsForNode.findIndex(
          (existingReport) =>
            existingReport.severity === newReport.severity &&
            existingReport.message === newReport.message,
        ) === -1
      ) {
        reportsForNode.push(newReport);
      }
    };

    const flushReportsAsComments = () => {
      // @ts-expect-error No idea why TS is complaining here
      for (const [node, reportsForNode] of reports) {
        node.before(
          createInlineComment(POLARIS_MIGRATOR_COMMENT, {prose: true}),
        );

        for (const report of reportsForNode) {
          node.before(
            createInlineComment(`${report.severity}: ${report.message}`, {
              prose: true,
            }),
          );
        }
      }
      reports.clear();

      // @ts-expect-error No idea why TS is complaining here
      for (const [node, suggestion] of suggestions) {
        node.before(createInlineComment(suggestion));
      }
      suggestions.clear();
    };

    // TODO: When moving to style-lint, migrate this to call style-lint's
    // stylelint.utils.report()
    const flushReportsToStylelint = flushReportsAsComments;

    // PostCSS is missing functionality: It doesn't parse `value`s (declaration
    // values / @-rule params), so we have to do that ourselves. This form of
    // `createWalker` handles that with a `valueParserKey`.
    function createWalker<T extends PostCSSNode>(args: {
      valueParserKey: keyof T;
      walker: (node: T, parsedValue: ParsedValue) => false | void;
      mutableKeys?: (keyof T)[];
      serialiseSuggestion: (node: T) => string;
    }): (node: T) => false | void;

    // When there's no `value` key, we don't parse or supply that value to the
    // walker.
    function createWalker<T extends PostCSSNode>(args: {
      walker: (node: T) => false | void;
      mutableKeys?: (keyof T)[];
      serialiseSuggestion: (node: T) => string;
    }): (node: T) => false | void;

    function createWalker<T extends PostCSSNode>(args: {
      valueParserKey?: keyof T;
      walker:
        | ((node: T) => false | void)
        | ((node: T, parsedValue: ParsedValue) => false | void);
      mutableKeys?: (keyof T)[];
      serialiseSuggestion: (node: T) => string;
    }): (node: T) => false | void {
      const {
        valueParserKey,
        walker,
        mutableKeys: incomingMutableKeys = [],
        serialiseSuggestion,
      } = args;

      const mutableKeys = [...incomingMutableKeys];

      if (
        typeof valueParserKey !== 'undefined' &&
        !mutableKeys.includes(valueParserKey)
      ) {
        mutableKeys.push(valueParserKey);
      }

      return (node: T) => {
        const oldValues = mutableKeys.reduce<Partial<T>>((memo, key) => {
          memo[key] = node[key];
          return memo;
        }, {});

        let result: false | void;
        if (typeof valueParserKey !== 'undefined') {
          const parsedValue = valueParser(
            node[valueParserKey] as unknown as string,
          );
          result = walker(node, parsedValue);

          if (context.fix && parsedValue) {
            (node[valueParserKey] as unknown as string) =
              parsedValue.toString();
          }
        } else {
          result = (walker as (node: T) => false | void)(node);
        }

        if (context.fix) {
          const newValues = mutableKeys.reduce<Partial<T>>((memo, key) => {
            memo[key] = node[key];
            return memo;
          }, {});

          const isDirty = mutableKeys.some(
            (key) => oldValues[key] !== newValues[key],
          );

          const isPartialFix = isDirty && reports.has(node);

          if (isPartialFix) {
            if (partialFixStrategy === 'report') {
              // Insert the changes as a suggestion
              suggestions.set(node, serialiseSuggestion(node));
            }

            if (partialFixStrategy !== 'fix') {
              // Undo changes
              mutableKeys.forEach((key) => (node[key] = oldValues[key]!));
            }
          } else {
            mutableKeys.forEach((key) => (node[key] = newValues[key]!));
          }
        }

        if (__injectReportsAsComments) {
          flushReportsAsComments();
        } else {
          flushReportsToStylelint();
        }

        return result;
      };
    }

    function each<T extends Container>(
      root: T,
      walker: (node: PostCSSNode) => false | void,
    ) {
      root.each(
        createWalker({
          walker,
          serialiseSuggestion: (node) => node.toString(),
        }),
      );
    }

    function walk<T extends Container>(
      root: T,
      walker: (node: PostCSSNode) => false | void,
    ) {
      root.walk(
        createWalker({
          walker,
          serialiseSuggestion: (node) => node.toString(),
        }),
      );
    }

    function walkAtRules<T extends Container>(
      root: T,
      walker: (node: AtRule, parsedValue: ParsedValue) => false | void,
    ) {
      root.walkAtRules(
        createWalker({
          walker,
          valueParserKey: 'params',
          mutableKeys: ['name', 'params'],
          serialiseSuggestion: (node) => `@${node.name} ${node.params}`,
        }),
      );
    }

    function walkComments<T extends Container>(
      root: T,
      walker: (node: PostCSSComment) => false | void,
    ) {
      root.walkComments(
        createWalker({
          walker,
          mutableKeys: ['text'],
          serialiseSuggestion: (node) => node.text,
        }),
      );
    }

    function walkDecls<T extends Container>(
      root: T,
      walker: (node: Declaration, parsedValue: ParsedValue) => false | void,
    ) {
      root.walkDecls(
        createWalker({
          walker,
          valueParserKey: 'value',
          mutableKeys: ['value', 'prop'],
          serialiseSuggestion: (node) => `${node.prop}: ${node.value}`,
        }),
      );
    }

    function walkRules<T extends Container>(
      root: T,
      walker: (node: PostCSSRule) => false | void,
    ) {
      root.walkRules(
        createWalker({
          walker,
          mutableKeys: ['selector', 'selectors'],
          serialiseSuggestion: (node) => node.selector,
        }),
      );
    }

    return ruleFn(
      primary,
      // We're kind of abusing stylelint's types here since the
      // SecondaryOptions param can take an arbitrary object. But we need a
      // way to pass the methods into the rule function somehow, and this way
      // means less Typescript hackery.
      {
        options: secondaryOptions,
        methods: {
          report: addDedupedReport,
          each,
          walk,
          walkAtRules,
          walkComments,
          walkDecls,
          walkRules,
        },
      },
      context,
    );
  }) as StylelintRule;

  wrappedRule.ruleName = ruleName;
  wrappedRule.meta = {
    // TODO: link directly to the specific rule
    url: 'https://www.npmjs.com/package/@shopify/stylelint-polaris',
    fixable: true,
  };

  return convertStylelintRuleToPostcssProcessor(wrappedRule);
}
