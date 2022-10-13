import postcss, {Declaration} from 'postcss';
import valueParser, {
  Node,
  ParsedValue,
  FunctionNode,
  Dimension,
} from 'postcss-value-parser';
import {toPx} from '@shopify/polaris-tokens';
import prettier from 'prettier';

import {isKeyOf} from './type-guards';

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

/**
 * Check whether a string has Sass interpolation
 */
export function hasSassInterpolation(string: string) {
  return /#\{.+?\}/.test(string);
}

/**
 * Check whether a string has negative Sass interpolation
 */
export function hasNegativeSassInterpolation(string: string) {
  return /-#\{.+?\}/.test(string);
}

/**
 * Replace negative Sass interpolations with a multiplication operator and a negative number
 *
 * @example
 * // Before
 * -#{spacing()};
 *
 * // After
 * -1 * ${spacing()};
 */
export function replaceNegativeSassInterpolation(parsedValue: ParsedValue) {
  let newNodes: Node[] = [];
  parsedValue.walk((node, index, nodes) => {
    const containsInterpolation = /-#\{.+?/.test(node.value);
    if (!containsInterpolation) return;

    node.value = node.value.replace('-#{', '#{');

    const left = index > 0 ? nodes.slice(0, index) : [];
    const right = nodes.length - 1 > index ? nodes.slice(index + 1) : [];

    newNodes = [
      ...left,
      {type: 'word', value: '-1'},
      {type: 'space', value: ' '},
      {type: 'word', value: '*'},
      {type: 'space', value: ' '},
      node,
      ...right,
    ] as Node[];
  });
  parsedValue.nodes = newNodes;
}

/**
 * Remove the Sass interpolation from parsedValue
 */
export function removeSassInterpolation(
  namespace: string,
  parsedValue: ParsedValue,
) {
  parsedValue.walk((node, index, nodes) => {
    const regexp = new RegExp(`#{${namespace}`);
    const containsInterpolation = regexp.test(node.value);
    if (containsInterpolation) {
      node.value = node.value.replace(/#\{/, '');
      nodes[index + 1].value = nodes[index + 1].value.replace(/}/, '');
    }
  });

  parsedValue.nodes = parsedValue.nodes.filter(
    (node) => !(node.type === 'word' && node.value === ''),
  );
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

  return isUnitlessZero(dimension)
    ? `${dimension.number}px`
    : toPx(`${dimension.number}${dimension.unit}`);
}

/**
 * Exit early and stop traversing descendant nodes:
 * https://www.npmjs.com/package/postcss-value-parser:~:text=Returning%20false%20in%20the%20callback%20will%20prevent%20traversal%20of%20descendent%20nodes
 */
export const StopWalkingFunctionNodes = false;

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

export function createInlineComment(text: string, options?: {prose?: boolean}) {
  const formatted = prettier
    .format(text, {
      parser: options?.prose ? 'markdown' : 'scss',
      proseWrap: 'never',
      printWidth: 9999,
    })
    .trim();
  const comment = postcss.comment({text: formatted});

  comment.raws.left = ' ';
  comment.raws.inline = true;

  return comment;
}
