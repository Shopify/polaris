import invariant from 'tiny-invariant';
import decamelize from 'decamelize';
import type {Entries, Simplify} from 'type-fest';

import {isObject} from '../../utilities/is-object';

import type {
  ResponsiveStyleProps,
  ResponsiveStylePropsWithModifiers,
  ResponsiveStylePropsWithPseudoElements,
  PropDefaults,
  ValueMapper,
  Properties,
  PropPath,
} from './generated-data';
import {
  stylePropAliasFallbacks,
  disallowedCSSPropertyValues,
  stylePropAliasNames as allAliases,
  cssCustomPropertyNamespace,
  modifiers,
  pseudoElements,
  breakpoints,
  defaultBreakpointKey,
} from './generated-data';

// eslint-disable-next-line @typescript-eslint/ban-types
type PropertyValue<TValue> = TValue extends infer TUnpacked & {}
  ? TUnpacked
  : TValue;

type RecursiveValues<T> = Exclude<
  // csstype uses the (string & {}) trick to stop TS from simplifying a type
  // like `'red' | string` down to just `string`.
  // However, `(string & {}) extends Record<any, any>` now returns 'true'
  // whereas `string extends Record<any, any>` returns false. So we "unpack"
  // those values here to ensure we're dealing with the actual type.
  // eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
  PropertyValue<T> extends Record<any, any>
    ?
        | T
        | {
            [Prop in keyof T]: Extract<
              // `extends any` distributes the types over every item in a possible union
              T[Prop] extends any ? RecursiveValues<T[Prop]> : never,
              // Only interested in Records in the union
              // eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
              Record<any, any>
            >;
          }[keyof T]
    : never,
  undefined
>;

type RecursiveKeys<T> = T extends object
  ?
      | keyof T
      | {
          // eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
          [Prop in keyof T]: T[Prop] extends Record<any, any>
            ? RecursiveKeys<T[Prop]>
            : never;
        }[keyof T]
  : never;

type PseudoElementProp = keyof typeof pseudoElements;
type ModifierProp = keyof typeof modifiers;
type BreakpointProp = keyof typeof breakpoints;

export type ConversionResult = {
  style: Properties;
} & {
  [K in PseudoElementProp]?: {
    style: Properties;
  };
};

type ReponsiveStylePseudoElementProps = {
  [K in PseudoElementProp]?: ResponsiveStyleProps & {
    [K in ModifierProp]?: ResponsiveStyleProps;
  };
};

type AccumulatorCondition = Exclude<
  ModifierProp | BreakpointProp,
  typeof defaultBreakpointKey
>;

type DeclarationAccumulator = {
  [K in keyof Properties]?: {
    condition?: AccumulatorCondition;
    value: unknown;
  }[];
};

const joinEnglish =
  process.env.NODE_ENV === 'development'
    ? (arr: string[], joiner = 'and') => {
        if (arr.length === 1) {
          return arr[0];
        }
        const joined = arr.slice(0, -1).join(', ');
        if (arr.length < 2) {
          return joined;
        }

        return `${joined} ${joiner} ${arr[arr.length - 1]}`;
      }
    : null;

function hasOwn(obj: object, key: any): boolean {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

function identity<T>(arg: T): T {
  return arg;
}

function mapObjectValues<T extends object, R = T[keyof T]>(
  obj: T,
  map: (val: T[keyof T], key: keyof T) => R,
): {[K in keyof T]: R} {
  const result: {[K in keyof T]: R} = {} as {[K in keyof T]: R};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[key] = map(obj[key], key);
    }
  }
  return result;
}

function warnOnInvalidProperty(path: PropPath = [], message?: string) {
  // eslint-disable-next-line no-console
  console.warn(
    `${
      path?.length ? `[${path.join('.')}] ` : ''
    }Ignoring invalid property declaration.${message ? ` ${message}` : ''}`,
  );
}

export function convertStylePropsToCSSProperties(
  styleProps: ResponsiveStylePropsWithModifiers,
  defaults: PropDefaults = {},
  valueMapper: ValueMapper = identity,
): ConversionResult {
  // TODO Process out into pseudo elements
  return convert(
    styleProps,
    defaults,
    valueMapper,
    rootParent,
    [],
    cascadeOrderRoot,
    rootElement,
  );
}

export function convertCSSPropertiesToStyleSheet(
  styles: Properties,
  className: string,
  pseudoElement?: PseudoElementProp,
) {
  return `.${className}${
    pseudoElement ? pseudoElements[pseudoElement] : ''
  }{${Object.entries(styles)
    .reduce((acc, [cssProperty, val]) => {
      acc.push(
        `${
          // Leave Custom Properties alone but all other CSS Properties need
          // to be converted to valid CSS
          cssProperty.startsWith('--')
            ? cssProperty
            : decamelize(cssProperty, {separator: '-'})
        }: ${val};`,
      );
      return acc;
    }, [] as string[])
    .join('')}}`;
}

// Create unique values that's good readable code, but which minifies well
const [
  rootParent,
  modifierParent,
  declarationParent,
  pseudoElementParent,
  rootElement,
] = Array.from(Array(5), Symbol);

let cascadeOrderNumber = 0;

// Least specific first
const cascadeOrderRoot = {
  ...mapObjectValues(breakpoints, () => cascadeOrderNumber++),
  ...mapObjectValues(modifiers, () =>
    mapObjectValues(breakpoints, () => cascadeOrderNumber++),
  ),
} as const;

type CascadeOrder = RecursiveKeys<typeof cascadeOrderRoot>;

/**
*
* {
*   color: 'red',
*   _active: {
*     color: { lg: 'blue', sm: 'green' }
*   }
*   _hover: {
*     color: 'yellow'
*   },
* }
* goal: var(--_active-on, var(--_lg-on, blue) var(--_lg-off, var(--_sm-on, green))) var(--_active-off, var(--_hover-on, yellow))
* 1. (path: ''): properties['color'] = [{value: 'red'}];
* 2. (path: '_active'): properties_active['color'] = [{value: 'green', condition: 'sm'}, {value: 'blue', condition: 'lg'}]
* 3. (path: '_hover'): properties_hover['color'] = [{value: 'yellow'}]
*
*
* 2. (path: '_hover'): properties['color'] = `var(--_hover-on, blue)${properties['color'] ? ` var(--_hover-off, red)` : ''}`
*
* {
*   color: 'red',
*   _hover: {
*     color: { lg: 'blue', sm: 'green' }
*   }
* }
* 1. (path: ''): properties['color'] = [{value: 'red'}]
* 2. (path: '_hover.lg'): properties['color'] = [{values: [{value: 'red'}]}, {condition: '_hover', values: [{condition: 'lg', values: [{value: 'blue'}]}]}]
* 3. (path: '_hover.lg'): properties['color'] = [{values: [{value: 'red'}]}, {condition: '_hover', values: [{condition: 'sm', values: [{value: 'green'}]}, {condition: 'lg', values: [{value: 'blue'}]}]}]
* 3. (path: '_hover.sm'): properties['color'] = [{value: 'red'}, {value: 'green', condition: '_sm'}, {value: 'blue', condition: '_lg'}]
*
* {
*   _hover: {
*     color: { lg: 'blue', sm: 'green' }
*   }
*   color: { md: 'yellow' }
* }
* 2. (path: '_hover.lg'): properties['color'] = [{value: 'blue', condition: '_lg'}]
* 3. (path: '_hover.sm'): properties['color'] = [{value: 'red'}, {value: 'green', condition: '_sm'}, {value: 'blue', condition: '_lg'}]
* 1. (path: ''): properties['color'] = [{ value: 'red' }]
*
*
* mapObjectValues(properties, (values) => {
*   values.reduce(
*     (output, {value, condition}, index) =>
*       condition
*         ? `var(--${condition}-on, ${value})${output ? ` var(--${condition}-off, ${output})` : ''}`
*         : value,
*     ''
*   )
* });
*
*
* 1. (path: ''): properties1['color'] = { value: 'red' }
* 2. (path: '_hover.lg'): properties3['color'] = { value: `var(--_lg-on, blue)`, condition: '_lg' }
* 3. (path: '_hover.sm'): properties3['color'] = `var(--_sm-on, blue)`
* 4. (path: '_hover'): properties2['color'] = `var(--_hover-on, var(--_sm-on, blue) var(--_sm-off, var(--_lg-on, green)))`
*
*
* 1. ('color'): properties['color'] = 'red';
* 2. ('_hover'): properties['color'] = 'var(--_hover-on, ) var(--_hover-off, 'red')'
* 3. ('_hover.color): properties['color'] = 'var(--_hover-on, blue)'
* *

/**
 * @param styleProps
 *
 * Valid:
 * ```
 * {
 *   color: 'blue',
 *   padding: {xs: '100', md: '400'},
 *   _before: {
 *     content: '">"',
 *     display: 'block',
 *   }
 *   _hover: {
 *     color: {xs: 'red', lg: 'green'},
 *     _before: {
 *       content: '"<"',
 *     }
 *   },
 * }
 * ```
 *
 * Invalid:
 * ```
 * {
 *   color: {
 *     _hover: any, // INVALID, only breakpoint aliases allowed
 *     _after: any, // INVALID, only breakpoint aliases allowed
 *     sm: !object, // INVALID, breakpoint values must be concrete
 *   },
 *   _after: {
 *     _hover: any, // INVALID, modifiers cannot be nested in pseudo elements
 *     sm: any,     // INVALID, breakpoints can only be children of properties
 *   },
 *   _hover: {
 *     sm: any,     // INVALID, breakpoints can only be children of properties
 *   },
 *   _hover: '400', // INVALID, modifiers must be objects
 *   _after: '400', // INVALID, pseudo elements must be objects
 *   sm: any,       // INVALID, breakpoints can only be children of properties
 * }
 */
function convert<
  CascadeOrderArg = RecursiveValues<typeof cascadeOrderRoot>,
  WhichElement = typeof rootElement | PseudoElementProp,
>(
  // TODO: Does this recursive type cause TS to be slow?
  styleProps: RecursiveValues<ResponsiveStylePropsWithModifiers>,
  defaults: PropDefaults,
  valueMapper: ValueMapper,
  parent:
    | typeof rootParent
    | typeof modifierParent
    | typeof declarationParent
    | typeof pseudoElementParent,
  parentPropPath: PropPath,
  cascadeOrder: CascadeOrderArg,
  whichElement: WhichElement,
): Properties {
  // The parent is an object that's a declaration
  // eg; { color: { sm: 'red', lg: 'blue' } }
  const parentIsResponsiveDeclaration = parent === declarationParent;
  const parentIsPseudoElement = parent === pseudoElementParent;
  const parentIsRoot = parent === rootParent;

  const properties: DeclarationAccumulator = {};
  // TODO
  // 0. Create a sort index in the script / at init time with least-specific first:
  // const cascadeOrder = {
  //   [Symbol("default")]: 0,
  //   xs: 1, // Base, setup in data as {xs: '&'}
  //   sm: 2,
  //   md: 3,
  //   lg: 4,
  //   xl: 5,
  //   '_hover.xs': 6,
  //   '_hover.sm': 7,
  //   '_hover.md': 8,
  //   '_hover.lg': 9,
  //   '_hover.xl': 10,
  //   '_active.xs': 11,
  //   '_active.sm': 12,
  //   '_active.md': 13,
  //   '_active.lg': 14,
  //   '_active.xl': 15,
  // }
  // 1. Do a single walkthrough of the object (this forEach loop)
  //    a) Insert into a sparse array for each concrete property value:
  //        ```
  //        const whichElement = isBefore ? '_before' : isAfter ? '_after' : 'base';
  //        // TODO: Construct this as we go & pass it to the recursive call
  //        // if (willRecurse && !propIsPseudo && !propIsDeclaration) {
  //        //   cascadePath = cascadePath + '.' + prop;
  //        // }
  //        // Initialize as an array (not an object) to retain numerical key
  //        // ordering, and NOT insertion order
  //        properties[whichElement][declartion] ??= [];
  //        properties[whichElement][declartion][cascadeOrder[cascadePath]] = {condition: parentPath.at(-1), value: mappedValue };
  //        const default = getDefault(declaration);
  //        if (default != null) {
  //          properties[whichElement][declartion].default = default
  //        }
  //        ```
  // 2. Do a single walkthrough of the collected data
  //    a) turn it into the space hack value
  //        ```
  //        Object.entries(properties.base).reduce((acc, values, declaration) => {
  //          acc[declaration] = values.default != null ? values.default : '';
  //          // TODO: confirm iterating over a sparse array retains numeric
  //          // order, not insertion order in older browsers
  //          values.forEach(({ condition, value }) => {
  //            acc[declaration] = `var(${condition}-on, ${value})${acc[declaration] ? ` var(${condition}-off, ${acc[declaration]})` : ''}`;
  //          })
  //          return acc;
  //        }, {})
  //        ```
  //    b) store the value in a cache as long as no values are
  //    `unset`/`initial`/`inherit`/etc
  // 3. For every cache value with more than one hit
  //    a) create a new CSS Custom Property for it
  //    b) replace each property's final value with a var() of the cached custom
  //    property
  // 4. Return the results
  (Object.entries(styleProps) as Entries<Required<typeof styleProps>>).forEach(
    ([prop, value]) => {
      const propIsBreakpoint = hasOwn(breakpoints, prop);
      const propIsModifier = !propIsBreakpoint && hasOwn(modifiers, prop);
      const propIsPseudoElement =
        !propIsBreakpoint && !propIsModifier && hasOwn(pseudoElements, prop);
      const valueIsObject = isObject(value);
      const propPath: PropPath = [...parentPropPath, prop];

      // NOTE; We do the property checks early like this because it minifies
      // really well in production mode:
      // https://esbuild.github.io/try/#dAAwLjE5LjExAHsgbWluaWZ5OiB0cnVlIH0AZnVuY3Rpb24gZnVuYygpIHsKICBjb25zdCB3aG9hID0gZm9vLmJhcjsKCiAgaWYgKGZvbyAmJiB6aXApIHsKICAgIC8vIElnbm9yZQogICAgcmV0dXJuOwogIH0KCiAgaWYgKGJhciAmJiB6aXAgfHwgd2hvYSkgewogICAgLy8gSWdub3JlCiAgICByZXR1cm47CiAgfQoKICBjb25zb2xlLmxvZygnZG9uZScpOwp9CgpleHBvcnQgeyBmdW5jIH07
      // Ignore null & undefined values
      if (value == null) {
        return;
      }

      if (!parentIsResponsiveDeclaration && propIsBreakpoint) {
        process.env.NODE_ENV === 'development' &&
          warnOnInvalidProperty(
            propPath,
            `Breakpoint props can only be specified directly on a declaration property. For example: { color: { sm: 'red', lg: 'blue' } }.`,
          );

        // ignore this invalid property
        return;
      }

      if (parentIsResponsiveDeclaration && !propIsBreakpoint) {
        process.env.NODE_ENV === 'development' &&
          warnOnInvalidProperty(
            propPath,
            `When specified as an object, \`${parentPropPath.at(
              -1,
            )}\` can only contain the keys ${joinEnglish!(
              Object.keys(breakpoints),
              'or',
            )}.`,
          );

        // ignore this invalid property
        return;
      }

      if (parentIsResponsiveDeclaration && propIsBreakpoint && valueIsObject) {
        process.env.NODE_ENV === 'development' &&
          warnOnInvalidProperty(
            propPath,
            `Breakpoint values cannot be an object.`,
          );

        // ignore this invalid property
        return;
      }

      if (parentIsPseudoElement && propIsModifier) {
        process.env.NODE_ENV === 'development' &&
          warnOnInvalidProperty(
            propPath,
            `Pseudo elements cannot contain modifiers. Try {${parentPropPath.at(
              -1,
            )}: {..}, ${prop}: { ${parentPropPath.at(-1)}: {..}}}`,
          );

        // ignore this invalid property
        return;
      }

      // Modifiers must be objects
      if (!valueIsObject && propIsModifier) {
        process.env.NODE_ENV === 'development' &&
          warnOnInvalidProperty(
            propPath,
            `Modifier \`${prop}\` must be an object.`,
          );

        // ignore this invalid property
        return;
      }

      // Pseudo elements must be objects
      if (!valueIsObject && propIsPseudoElement) {
        process.env.NODE_ENV === 'development' &&
          warnOnInvalidProperty(
            propPath,
            `Pseudo element \`${prop}\` must be an object.`,
          );

        // ignore this invalid property
        return;
      }

      // Process a non-object concrete value.
      // Eg; {color: 'red'}
      // or
      // {color: {sm: 'blue'}}
      if (!valueIsObject) {
        // If it's a breakpoint value, the declaration is actually the parent
        // object, so we grab that from the path (eg; { color: { sm: 'red' } }).
        // Otherwise, it's the current prop (eg; { color: 'blue' })
        // TODO: What about aliases?
        const declaration = (
          propIsBreakpoint ? parentPropPath.at(-1) : prop
        ) as keyof ResponsiveStyleProps;

        const mappedValue = valueMapper(value, declaration, parentPropPath);

        // Since Typescript doesn't have negation types (`string & not 'inherit'`),
        // we need to do a runtime check for invalid values because some of the
        // csstype types have a `| string` union which then allows some values to
        // sneak through at runtime.
        invariant(
          disallowedCSSPropertyValues.includes(
            mappedValue as (typeof disallowedCSSPropertyValues)[number],
          ),
          `${
            propPath?.length ? `[${propPath.join('.')}] ` : ''
          }${mappedValue} is a reserved value. Please use a different value.`,
        );

        // Initialize as an array (not an object) to retain numerical key
        // ordering, and NOT insertion order
        properties[declaration as keyof Properties] ??= [];

        const cascadeCondition: CascadeOrder = parentIsResponsiveDeclaration
          ? (prop as CascadeOrder)
          : defaultBreakpointKey;

        // Given {color: {xs: 'green', sm: 'red', lg: 'blue'}}
        // and defaultBreakpointKey = 'xs'
        // When `prop` is 'sm' or 'lg', we set it as the 'condition'.
        // When `prop` is 'xs', there's no 'condition'.
        //
        // Given {color: 'red'}
        // Then there is no condition.
        const condition: AccumulatorCondition | undefined =
          cascadeCondition !== defaultBreakpointKey
            ? cascadeCondition
            : undefined;

        properties[declaration as keyof Properties]![
          cascadeOrder[cascadeCondition as keyof typeof cascadeOrder]
        ] = {
          condition,
          value: mappedValue,
        };

        return;
      }

      if (valueIsObject) {
        // recursion. The result gets merged deeply into the
        Object.assign(
          declarationAcc,
          convert(
            // TODO: How do I fix this?
            value as typeof styleProps,
            defaults,
            valueMapper,
            /* eslint-disable no-nested-ternary -- It's terse & readable */
            propIsModifier
              ? modifierParent
              : propIsBreakpoint
              ? declarationParent
              : propIsPseudoElement
              ? pseudoElementParent
              : declarationParent,
            /* eslint-enable no-nested-ternary */
            propPath,
            // Ignore declarations and pseudoelements in the cascade path
            propIsBreakpoint || propIsModifier
              ? cascadeOrder[prop as keyof CascadeOrderArg]
              : cascadeOrder,
            // Switch to the relevant pseudo element if encountered
            propIsPseudoElement ? prop : whichElement,
          ),
        );
      }
    },
  );

  // Inject defaults for properties that don't have them
  if (parentIsRoot) {
    // TODO iterate over properties
    const defaultValue = getDefault(declaration);

    if (defaultValue != null) {
      declarationAcc[whichElement]![declaration]![defaultValueCascadeOrder] =
        defaultValue;
    }
  }

  // Convert array of { value, condition } to the Space Hack CSS
  mapObjectValues(properties, (values) => {
    values!.reduce(
      (output, {value, condition}) =>
        condition
          ? `var(--${condition}-on, ${value})${
              output ? ` var(--${condition}-off, ${output})` : ''
            }`
          : value,
      '',
    );
  });

  return declarationAcc;
}
