import valueParser, {
  Node,
  ParsedValue,
  FunctionNode,
  Dimension,
} from 'postcss-value-parser';
import {toPx} from '@shopify/polaris-tokens';

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
