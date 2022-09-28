import type {Node, FunctionNode} from 'postcss-value-parser';

function getNamespace(options?: NamespaceOptions) {
  return options?.namespace || '';
}

export interface NamespaceOptions {
  namespace?: string;
}

export function namespace(name: string, options?: NamespaceOptions) {
  const namespace = getNamespace(options);
  return namespace ? `${namespace}.${name}` : name;
}

/**
 * @example
 * const spacingFunction = namespace('spacing', options);
 * const remFunction = namespace('rem', options);
 *
 * const isSpacingFunction = createIsSassFunction(spacingFunction);
 * const isRemFunction = createIsSassFunction(remFunction);
 * const isCalcFunction = createIsSassFunction('calc');
 *
 * if (isSpacingFunction(node)) node // FunctionNode
 */
export function createIsSassFunction(name: string) {
  return (node: Node): node is FunctionNode => {
    return node.type === 'function' && node.value === name;
  };
}

export function isNumericOperator(node: Node): boolean {
  return (
    node.value === '+' ||
    node.value === '-' ||
    node.value === '*' ||
    node.value === '/' ||
    node.value === '%'
  );
}
