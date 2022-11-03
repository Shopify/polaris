import type {FileInfo, API, Options} from 'jscodeshift';
import postcss, {
  Root,
  Result,
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
import {toPx, getCustomPropertyNames, tokens} from '@shopify/polaris-tokens';
import prettier from 'prettier';

import {POLARIS_MIGRATOR_COMMENT} from '../constants';

const defaultNamespace = '';

const polarisCustomPropertyRegEx = new RegExp(
  getCustomPropertyNames(tokens).join('|'),
);

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
export function hasNumericOperator(
  parsedValue: ParsedValue,
  deep = true,
): boolean {
  let containsNumericOperator = false;

  parsedValue.walk((node) => {
    if (isNumericOperator(node)) {
      containsNumericOperator = true;
      return StopWalkingFunctionNodes;
    }

    if (!deep) {
      return StopWalkingFunctionNodes;
    }
  });

  return containsNumericOperator;
}

/**
 * Checks if a `valueParser` node is a [SASS variable](https://sass-lang.com/documentation/variables)
 */
export function isSassVariable(node: Node): boolean {
  return node.type === 'word' && node.value.startsWith('$');
}

/**
 * Checks if any descendant `valueParser` node is a SASS variable
 */
export function hasSassVariable(
  parsedValue: ParsedValue,
  deep = true,
): boolean {
  let containsSassVariable = false;

  parsedValue.walk((node) => {
    if (isSassVariable(node)) {
      containsSassVariable = true;
      return StopWalkingFunctionNodes;
    }

    if (!deep) {
      return StopWalkingFunctionNodes;
    }
  });

  return containsSassVariable;
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
  deep = true,
): boolean {
  let containsSassFunction = false;

  parsedValue.walk((node) => {
    if (isSassFunction(name, node)) {
      containsSassFunction = true;
      return StopWalkingFunctionNodes;
    }

    if (!deep) {
      return StopWalkingFunctionNodes;
    }
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

/**
 * All transformable duration units. These values are used to determine
 * if a decl.value can be mapped to a Polaris custom property.
 *
 * Note: <time> is a dimension with 's' or 'ms' as the unit:
 * https://w3c.github.io/csswg-drafts/css-values-3/#time-value
 */
export const transformableDurationUnits = ['s', 'ms'];

export function isTransformableDuration(
  dimension: false | Dimension,
): dimension is Dimension {
  if (!dimension) return false;

  // Zero is the only unitless dimension our duration transforms support
  if (isUnitlessZero(dimension)) return true;

  return transformableDurationUnits.includes(dimension.unit);
}

export function isPolarisVar(node: Node): boolean {
  return (
    isSassFunction('var', node) &&
    polarisCustomPropertyRegEx.test(node.nodes?.[0]?.value ?? '')
  );
}

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

interface PluginOptions extends Options, NamespaceOptions {}

interface Report {
  node: PostCSSNode;
  severity: 'warning' | 'error';
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
) => (root: Root, result: Result) => void;

interface StylelintRuleMeta {
  url: string;
  deprecated?: boolean;
  fixable?: boolean;
}

type StylelintRule<P = any, S = any> = StylelintRuleBase<P, S> & {
  ruleName: string;
  meta?: StylelintRuleMeta;
};
// End: Extracted from stylelint

type Walker<N extends PostCSSNode> = (node: N) => false | void;

export type PolarisMigrator = (
  primaryOption: true,
  secondaryOptions: {
    options: {[key: string]: any};
    methods: {
      report: (report: Report) => void;
      each: <T extends Container>(root: T, walker: Walker<PostCSSNode>) => void;
      walk: <T extends Container>(root: T, walker: Walker<PostCSSNode>) => void;
      walkComments: <T extends Container>(
        root: T,
        walker: Walker<PostCSSComment>,
      ) => void;
      walkAtRules: <T extends Container>(
        root: T,
        atRuleWalker: Walker<AtRule>,
      ) => void;
      walkDecls: <T extends Container>(
        root: T,
        declWalker: Walker<Declaration>,
      ) => void;
      walkRules: <T extends Container>(
        root: T,
        ruleWalker: Walker<PostCSSRule>,
      ) => void;
    };
  },
  context: PluginContext,
) => (root: Root, result: Result) => void;

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
      Once(root, {result}) {
        // NOTE: For fullest compatibility with stylelint, we initialise the
        // rule here _inside_ the postcss Once function just like stylelint
        // does. This means multiple passes can be performed without rules
        // accidentally retaining scoped variables, etc.
        ruleFn(
          // Normally, this comes from stylelint config, but for this shim we
          // just hard-code it, and instead rely on the "seconary" options
          // object for passing through the jscodeshift options.
          true,
          options,
          // Also normally comes from styelint via the cli `--fix` flag.
          {fix: true},
        )(root, result);
      },
    };

    return postcss(plugin).process(fileInfo.source, {
      syntax: require('postcss-scss'),
    }).css;
  };
}

export function createSassMigrator(name: string, ruleFn: PolarisMigrator) {
  const wrappedRule: StylelintRule = ((
    primary,
    secondaryOptions: PluginOptions,
    context,
  ) => {
    const reports = new Map<PostCSSNode, Report[]>();

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
    };

    function createWalker<T extends PostCSSNode>(args: {
      walker: (node: T) => false | void;
      serialiseSuggestion: (node: T) => string;
    }): (node: T) => false | void {
      const {walker, serialiseSuggestion} = args;

      return (node: T) => {
        let oldNode: T;
        if (context.fix) {
          oldNode = node.clone();
        }

        const result = walker(node);

        const isPartialFix =
          context.fix &&
          reports.has(node) &&
          node.toString() !== oldNode!.toString();

        flushReportsAsComments();

        // Our migrations have an opinion on partial fixes (when multiple
        // issues are found in a single node, and some but not all can be
        // fixed): We dump out the partial fix result as a comment
        // immediately above the node.
        if (isPartialFix) {
          node.before(createInlineComment(serialiseSuggestion(node)));
          // Undo changes
          node.replaceWith(oldNode!);
        }

        return result;
      };
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
          each(root, walker) {
            root.each(
              createWalker({
                walker,
                serialiseSuggestion: (node) => node.toString(),
              }),
            );
          },
          walk(root, walker) {
            root.walk(
              createWalker({
                walker,
                serialiseSuggestion: (node) => node.toString(),
              }),
            );
          },
          walkAtRules(root, walker) {
            root.walkAtRules(
              createWalker({
                walker,
                serialiseSuggestion: (node) => `@${node.name} ${node.params}`,
              }),
            );
          },
          walkComments(root, walker) {
            root.walkComments(
              createWalker({
                walker,
                serialiseSuggestion: (node) => node.text,
              }),
            );
          },
          walkDecls(root, walker) {
            root.walkDecls(
              createWalker({
                walker,
                serialiseSuggestion: (node) => `${node.prop}: ${node.value}`,
              }),
            );
          },
          walkRules(root, walker) {
            root.walkRules(
              createWalker({
                walker,
                serialiseSuggestion: (node) => node.selector,
              }),
            );
          },
        },
      },
      context,
    );
  }) as StylelintRule;

  wrappedRule.ruleName = name;
  wrappedRule.meta = {
    // TODO: link directly to the specific rule
    url: 'https://www.npmjs.com/package/@shopify/stylelint-polaris',
    fixable: true,
  };

  return convertStylelintRuleToPostcssProcessor(wrappedRule);
}

export function setNodeValue(node: Node, value: string): void {
  const {sourceIndex} = node;
  const parsedValue = valueParser(value).nodes[0];
  Object.assign(node, parsedValue);
  // The node we're replacing might be mid-way through a higher-level value
  // string. Eg; 'border: 1px solid', the 'solid' node is 5 characters into the
  // higher-level value, so we need to correct the index here.
  node.sourceIndex += sourceIndex;
  node.sourceEndIndex += sourceIndex;
}
