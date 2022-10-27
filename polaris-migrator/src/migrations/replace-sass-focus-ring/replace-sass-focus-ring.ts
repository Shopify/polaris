import type {API, FileInfo, Options} from 'jscodeshift';
import postcss, {Declaration, Plugin} from 'postcss';
import valueParser, {Node, FunctionNode, stringify} from 'postcss-value-parser';

import {
  createInlineComment,
  NamespaceOptions,
  namespace,
  isSassFunction,
  isNumericOperator,
} from '../../utilities/sass';
import {POLARIS_MIGRATOR_COMMENT} from '../../constants';

/*
  Sass AST doesn't have the concept of values or arguments
  This function parses the children of a function node, groups them into nodes that represent values,
  and removes delimiters.
*/
const extractArguments = (args: Node[]): Node[][] => {
  const extractedArguments: Node[][] = [];
  let argumentSet: Node[] = [];
  args.forEach((arg, i) => {
    argumentSet.push(arg);
    if (arg.type === 'div' && arg.value === ',') {
      // pop out the last element
      // we don't want the comma
      argumentSet.pop();
      extractedArguments.push([...argumentSet]);
      argumentSet = [];
    } else if (i === args.length - 1) {
      extractedArguments.push([...argumentSet]);
      argumentSet = [];
    }
  });

  return extractedArguments;
};

/*
  This function expects to be passed grouped argument nodes from the invocation of
  extractArguments.

  Because Sass allows for the intermingling of
  ordered arguments and named arguments
  fn(1, 2, 3) or fn(1, c: 3). resolveArguments resolves
  the passed in arguments and removes the non determinism
  by constructing and returning a keyed object
*/

function isSpreadOperator(node: Node) {
  return node.value.endsWith('...');
}
const resolveArguments = (
  args: Node[][],
  declOrder: string[],
  processArgs: (args: Node[], key: string) => unknown = (args, _) => args,
): {[key: string]: Node[]} => {
  return args.reduce((acc: {[key: string]: Node[]}, arg, i) => {
    if (arg.some((node) => isSpreadOperator(node))) {
      throw new Error('Spread operation not supported by this migration');
    }
    let key: string = declOrder[i];
    let value = arg;
    if (arg.some((token) => token.type === 'div' && token.value === ':')) {
      key = arg[0].value.replace('$', '');
      value = [arg[2]];
    }

    acc[key] = processArgs ? (processArgs(value, key) as Node[]) : value;
    return acc;
  }, {} as {[key: string]: Node[]});
};

function getFunctionArgs(
  node: FunctionNode,
  {
    declOrder,
    processArgs = (args, _) => args,
  }: {
    // We make this optional for compatibility with older usages of getFunctionArgs
    declOrder: string[];
    processArgs: (args: Node[], key: string) => unknown;
  },
): {[key: string]: Node[]} {
  // This does not presently handle spread arguments i.e. borderSize($sizes...)
  const unProcessedArgs: Node[] = node.nodes.slice();
  return resolveArguments(
    extractArguments(unProcessedArgs),
    declOrder,
    processArgs,
  );
}

interface PluginOptions extends Options, NamespaceOptions {}

const plugin = (options: PluginOptions): Plugin => {
  const namespacedFocusRing = namespace('focus-ring', options);
  function declResolver({
    size = 'base',
    'border-width': borderWidth = 0,
    style = 'base',
  }) {
    const offset =
      borderWidth === 0 ? `rem(1px)` : `(${borderWidth} + rem(1px))`;

    if (style === 'base') {
      return [
        {
          prop: 'box-shadow',
          value: `0 0 0 calc(-1 * ${offset}) var(--p-focused)`,
        },
      ];
    } else {
      return [
        {prop: 'box-shadow', value: '0 0 0 rem(2px) var(--p-focused)'},
        {prop: 'outline', value: 'rem(1px) solid transparent'},
      ];
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

        const parsedValue = valueParser(atRule.params);
        let declVal: PostCssDeclArgs[] = [];

        parsedValue.walk((node) => {
          if (!isSassFunction(namespacedFocusRing, node)) return;
          try {
            const args = getFunctionArgs(node, {
              declOrder: ['size', 'border-width', 'style'],
              processArgs: (args: Node[], key) => {
                const stringArgs: string[] = [];

                args.forEach((arg) => {
                  if (isNumericOperator(arg) || arg.type === 'function') {
                    reports.push({
                      message: `Argument ${key} is not of type word or string`,
                    });
                  }
                  stringArgs.push(stringify(arg));
                });
                return stringArgs.join('');
              },
            });
            declVal = declResolver(args);
          } catch (err: any) {
            reports.push({
              message: err.message as string,
            });
          }
        });

        const parent = atRule.parent;
        const invalidParent = !parent || parent.type === 'root';
        let postCSSdeclNodes: Declaration[] = [];

        if (declVal.length) {
          postCSSdeclNodes = declVal.map((val) => {
            return postcss.decl({
              prop: val.prop,
              value: val.value,
            });
          });
        }

        if (invalidParent) {
          reports.push({
            message: '@include should not be called on the root node',
          });
        }

        if (reports.length) {
          console.log(reports, postCSSdeclNodes);
          atRule.before([
            createInlineComment(POLARIS_MIGRATOR_COMMENT, {prose: true}),
            ...reports.map((report) => {
              return createInlineComment(report.message, {prose: true});
            }),
            ...(postCSSdeclNodes.length
              ? postCSSdeclNodes.map((decl) =>
                  createInlineComment(decl.toString()),
                )
              : []),
          ]);
          // if (postCSSdeclNodes.length) {
          //   atRule.before(
          //     postCSSdeclNodes.map((decl) =>
          //       createInlineComment(decl.toString()),
          //     ),
          //   );
          // }
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
