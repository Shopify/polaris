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
export function hasCalculation(parsedValue: ParsedValue): boolean {
  let hasCalc = false;

  parsedValue.walk((node) => {
    if (isNumericOperator(node)) hasCalc = true;
  });

  return hasCalc;
}

/**
 * Creates a function to check if a `valueParser` node is a given Sass function
 *
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
  return function isSassFunction(node: Node): node is FunctionNode {
    return node.type === 'function' && node.value === name;
  };
}

/**
 * Creates a function to check if any descendant `valueParser` node is a given Sass function
 * Important: Use before mutating `parsedValue`
 */
export function createHasSassFunction(name: string) {
  const isSassFunction = createIsSassFunction(name);

  return function hasSassFunction(parsedValue: ParsedValue) {
    let hasFn = false;

    parsedValue.walk((node) => {
      if (isSassFunction(node)) hasFn = true;
    });

    return hasFn;
  };
}
