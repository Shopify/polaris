import {Node, FunctionNode} from 'postcss-value-parser';

export function isSpreadOperator(node: Node) {
  return node.value.endsWith('...');
}

export function getFunctionArgs(
  node: FunctionNode,
  {
    declOrder,
  }: {
    declOrder: string[];
  },
): {[key: string]: Node[]} {
  // This does not presently handle spread arguments i.e. borderSize($sizes...)
  const unProcessedArgs: Node[] = node.nodes.slice();
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

  const resolveArguments = (
    args: Node[][],
    declOrder: string[],
    processArgs: (args: Node[], key: string) => unknown = (args, _) => args,
  ): {[key: string]: Node[]} => {
    return args.reduce((acc: {[key: string]: Node[]}, arg, i) => {
      // Presently resolving spread arguments is not supported
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
  return resolveArguments(extractArguments(unProcessedArgs), declOrder);
}
