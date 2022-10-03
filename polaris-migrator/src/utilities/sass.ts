import type {Node, ParsedValue, FunctionNode} from 'postcss-value-parser';

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

/**
 * Check whether a string has Sass interpolation
 */
export function hasSassInterpolation(string: string) {
  return /#\{.+?\}/.test(string);
}

/**
 * Check whether a function is a standard CSS function
 */
export function isStandardSyntaxFunction(node: Node) {
  // Function nodes without names are things in parentheses like Sass lists
  if (!node.value) {
    return false;
  }

  if (node.value.startsWith('#{')) {
    return false;
  }

  return true;
}
/**
 * Check whether a math function is standard
 */
export function isStandardSyntaxMathFunction(mathFunction: string) {
  // SCSS variable
  if (mathFunction.includes('$')) {
    return false;
  }

  return true;
}
