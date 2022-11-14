import type {API, FileInfo, Options} from 'jscodeshift';
import postcss, {Declaration, Plugin} from 'postcss';
import valueParser, {Node, stringify} from 'postcss-value-parser';

import {
  createInlineComment,
  NamespaceOptions,
  namespace,
  isSassFunction,
  isNumericOperator,
} from '../../utilities/sass';
import {POLARIS_MIGRATOR_COMMENT} from '../../constants';

import {getFunctionArgs} from './utilities';

interface PluginOptions extends Options, NamespaceOptions {}

const plugin = (options: PluginOptions): Plugin => {
  const namespacedFocusRing = namespace('focus-ring', options);

  // This is a reconstruction of the focus-ring mixin
  // as a javascript function, such that the API remains the same
  // but the output is an array of arguments to pass into
  // `postcss.decl`
  function focusRing({
    style,
    'border-width': borderWidth,
  }: {
    [key: string]: Node[];
  }) {
    const styleValue = style?.length ? stringify(style).trim() : 'base';
    const borderWidthValue = borderWidth?.length
      ? `calc(var(--p-focusRing-offset-1) + ${stringify(borderWidth).trim()})`
      : 'var(--p-focusRing-offset-1)';

    if (styleValue === 'base') {
      return [
        {
          prop: 'outline-offset',
          value: borderWidthValue,
        },
        {
          prop: 'outline',
          value: 'var(--p-focusRing-base)',
        },
      ];
    } else {
      return [{prop: 'outline', value: 'var(--p-focusRing-focused)'}];
    }
  }
  interface PostCssDeclArgs {
    prop: string;
    value: string;
  }

  return {
    postcssPlugin: 'replace-sass-focus-ring',
    AtRule: {
      include: (atRule) => {
        const reports: {message: string}[] = [];
        // Checking for the edge case where
        // mixin is invoked without parens
        // @include legacy-polaris-v8.focus-ring;
        if (atRule.params === namespacedFocusRing) {
          atRule.params += '()';
        }
        const parsedValue = valueParser(atRule.params);
        let declVal: PostCssDeclArgs[] = [];
        function nodesHaveSassFunctions(nodes: Node[]) {
          return nodes.some((node) => node.type === 'function');
        }
        function nodesHaveNumericOperators(nodes: Node[]) {
          return nodes.some((node) => isNumericOperator(node));
        }
        const parent = atRule.parent;
        const invalidParent = !parent || parent.type === 'root';

        parsedValue.walk((node) => {
          if (!isSassFunction(namespacedFocusRing, node)) {
            return;
          }
          if (invalidParent) {
            reports.push({
              message: '@include should not be called on the root node',
            });
          }
          try {
            const declOrder = ['size', 'border-width', 'style'];
            const args = getFunctionArgs(node, {
              declOrder,
            });
            declOrder.forEach((key) => {
              if (!args[key]) return;
              if (
                nodesHaveNumericOperators(args[key]) ||
                nodesHaveSassFunctions(args[key])
              ) {
                reports.push({
                  message: `Argument ${key} is not of type word or string`,
                });
              }
            });
            if (args['border-width'] && args['border-width'].length) {
              reports.push({
                message: `Custom border-width value detected, please ensure this is using the correct token value where appropriate.`,
              });
            }
            declVal = focusRing(args);
          } catch (err: any) {
            reports.push({
              message: err.message as string,
            });
          }
        });

        let postCSSdeclNodes: Declaration[] = [];

        if (declVal.length) {
          postCSSdeclNodes = declVal.map((val) => {
            return postcss.decl({
              prop: val.prop,
              value: val.value,
            });
          });
        }

        if (reports.length) {
          atRule.before([
            createInlineComment(POLARIS_MIGRATOR_COMMENT),
            ...reports.map((report) => {
              return createInlineComment(report.message);
            }),
            ...(postCSSdeclNodes.length
              ? postCSSdeclNodes.map((decl) =>
                  createInlineComment(`${decl.toString()};`),
                )
              : []),
          ]);
        } else if (postCSSdeclNodes.length) {
          atRule.before(postCSSdeclNodes);
          atRule.remove();
        }
      },
    },
  };
};

export default function replaceSassFocusRing(
  fileInfo: FileInfo,
  _: API,
  options: Options,
) {
  return postcss(plugin(options)).process(fileInfo.source, {
    syntax: require('postcss-scss'),
  }).css;
}
