import type {Declaration} from 'postcss';
import valueParser, {
  Node,
  ParsedValue,
  FunctionNode,
  Dimension,
} from 'postcss-value-parser';
import {toPx} from '@shopify/polaris-tokens';

import {isKeyOf} from './type-guards';

const defaultNamespace = '';

export function getNamespace(options?: NamespaceOptions) {
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

/**
 * All transformable dimension units. These values are used to determine
 * if a decl.value can be converted to pixels and mapped to a Polaris custom property.
 */
export const transformableLengthUnits = ['px', 'rem'];

function isUnitlessZero(dimension: false | Dimension) {
  return dimension && dimension.unit === '' && dimension.number === '0';
}

export function isTransformableLength(
  dimension: false | Dimension,
): dimension is Dimension {
  if (!dimension) return false;

  // Zero is the only unitless dimension our length transforms support
  if (isUnitlessZero(dimension)) return true;

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

  return isUnitlessZero(dimension)
    ? `${dimension.number}px`
    : toPx(`${dimension.number}${dimension.unit}`);
}

/**
 * A mapping of evaluated `rem` values (in pixels) and their replacement `decl.value`
 */
interface ReplaceRemFunctionMap {
  [remValueInPx: string]: string;
}

/**
 * Replaces a basic `rem` function with a value from the provided map.
 *
 * Note: If a `map` value starts with `--`, it is assumed to be a CSS
 * custom property and wrapped in `var()`.
 *
 * @example
 * const decl = { value: 'rem(4px)' };
 * const namespacedDecl = { value: 'my-namespace.rem(4px)' };
 * const map = { '4px': '--p-size-1' };
 *
 * replaceRemFunction(decl, map)
 * //=> decl === { value: 'var(--p-size-1)' }
 *
 * replaceRemFunction(namespacedDecl, map, 'my-namespace')
 * //=> namespaceDecl === { value: 'var(--p-size-1)' }
 */
export function replaceRemFunction(
  decl: Declaration,
  map: ReplaceRemFunctionMap,
  options?: NamespaceOptions,
): void {
  const namespacePattern = getNamespacePattern(options);

  const namespacedRemFunctionRegExp = new RegExp(
    String.raw`^${namespacePattern}rem\(\s*([\d.]+)(px)?\s*\)\s*$`,
    'g',
  );

  decl.value = decl.value.replace(
    namespacedRemFunctionRegExp,
    (match, number, unit) => {
      if (!unit && number !== '0') return match;

      const remValueInPx = `${number}${unit ?? 'px'}`;

      if (!isKeyOf(map, remValueInPx)) return match;

      const newValue = map[remValueInPx];

      return newValue.startsWith('--') ? `var(${newValue})` : newValue;
    },
  );
}
