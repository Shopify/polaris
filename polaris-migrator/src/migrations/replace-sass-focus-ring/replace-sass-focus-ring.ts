import type {API, FileInfo, Options} from 'jscodeshift';
import postcss, {Plugin} from 'postcss';
import valueParser, {Node, FunctionNode} from 'postcss-value-parser';

import {
  createInlineComment,
  NamespaceOptions,
  namespace,
  isSassFunction,
} from '../../utilities/sass';
// I also don't think we need this
import {POLARIS_MIGRATOR_COMMENT} from '../../constants';
// I don't think we need this
const processed = Symbol('processed');

export type Argument = OrderedArgument | NamedArgument;

export interface NamedArgument {
  value: string;
  type: 'named';
  name: string;
}
export interface OrderedArgument {
  value: string;
  order: number;
  type: 'ordered';
}

type ArgumentBuffer = Node[];

export function getFunctionArgs(node: FunctionNode) {
  const args: Argument[] = [];
  const unProcessedArgs: Node[] = node.nodes.slice();
  let buffer: Node[] | Node[][] = [];

  function resolveArgBuffer(buffer: ArgumentBuffer): Argument {
    if (!buffer.length) throw Error('Argument buffer must not be empty');
    const bufferValue = buffer.pop();
    if (!bufferValue) throw Error('Argument buffer may not contain null value');
    if (Array.isArray(bufferValue)) {
      const value = bufferValue.pop();
      const name = bufferValue.pop();
      return {
        type: 'named',
        value: value.value,
        name: name.value,
      } as NamedArgument;
    } else {
      return {
        type: 'ordered',
        value: bufferValue.value,
      } as OrderedArgument;
    }
  }

  while (unProcessedArgs.length) {
    const argument = unProcessedArgs.shift() as Node;
    const isSeparator = argument.type === 'div' && argument.value === ',';
    const isAssignment = argument.type === 'div' && argument.value === ':';
    buffer.push(argument as Node);
    if (isAssignment && unProcessedArgs.length) {
      // This signifies the middle of a named argument declaration
      // pop out the next argument as well
      const key = buffer.shift() as Node;
      // We empty the buffer here to remove the operator argument
      // that was previously pushed in
      buffer = [];
      const value = unProcessedArgs.shift() as Node;
      buffer.push([key, value]);
    }

    if (isSeparator) {
      // This signifies the end of an argument set
      // check if the buffer has any arguments in it
      // if it is an array, convert it into a named argument
      // and push it into the args array
      buffer.pop();
      args.push(resolveArgBuffer(buffer));
    } else if (!unProcessedArgs.length && buffer.length) {
      // This is the end of the line,
      args.push(resolveArgBuffer(buffer));
    }
  }

  return args;
}

interface PluginOptions extends Options, NamespaceOptions {}

const plugin = (options: PluginOptions): Plugin => {
  const namespacedFocusRing = namespace('focus-ring', options);
  // TODO FILL IN
  function declResolver({size = 'base', borderWidth = 0, style = 'base'}) {
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
  function orderArgs(args: Argument[]) {
    // Separate the ordered and named arguments
    // In the ordered category
    // 0 is size, 1 is borderWidth, 2 is style
    // If there are remaining named arguments,
    // remove the $ from the key and merge the objects together.
    const ordered: OrderedArgument[] = [];
    const named: NamedArgument[] = [];
    const declOrder = ['size', 'borderWidth', 'style'];
    let reconstructedArgs = {};
    args.forEach((arg) => {
      if (arg.type === 'named') {
        named.push(arg);
      } else {
        ordered.push(arg);
      }
    });
    if (ordered.length) {
      const entries = ordered.map((order, i) => [declOrder[i], order.value]);
      reconstructedArgs = Object.fromEntries(entries);
    }

    if (named.length) {
      const entries = named.reduce(
        (acc: {[key: string]: any}, curr: NamedArgument) => {
          const key =
            curr.name === '$border-width'
              ? 'borderWidth'
              : curr.name.substring(1);
          acc[key] = curr.value;
          return acc;
        },
        {},
      );
      reconstructedArgs = Object.assign(reconstructedArgs, entries);
    }

    return reconstructedArgs;
  }
  return {
    postcssPlugin: 'replace-sass-focus-ring',
    AtRule: {
      include: (atRule) => {
        const parsedValue = valueParser(atRule.params);
        let declVal: PostCssDeclArgs[] = [];
        parsedValue.walk((node) => {
          if (!isSassFunction(namespacedFocusRing, node)) return;
          const args = getFunctionArgs(node);
          declVal = declResolver(orderArgs(args));
        });

        const parent = atRule.parent;
        if (declVal.length && parent && parent.type !== 'root') {
          const newDecls = declVal.map((val) => {
            return postcss.decl({
              prop: val.prop,
              value: val.value,
            });
          });
          newDecls.forEach((decl) => {
            atRule.before(decl);
          });
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
