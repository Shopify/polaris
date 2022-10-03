import type {Node, ParsedValue, FunctionNode} from 'postcss-value-parser';

/**
 * Non-exhaustive CSS ident token RegExp:
 * - https://drafts.csswg.org/css-syntax-3/#ident-token-diagram
 * - https://www.w3.org/TR/CSS21/syndata.html#:~:text=%5B%2D%5D%3F%7Bnmstart%7D%7Bnmchar%7D*
 */
export const identTokenRegExp = /-?[_a-zA-Z][_a-zA-Z0-9-]*/;

/**
 * Non-exhaustive Sass module public identifier RegExp:
 * - https://github.com/sass/sass/blob/main/spec/modules.md#syntax
 */
export const publicIdentifierRegExp = /[a-zA-Z][_a-zA-Z0-9-]*/;

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
