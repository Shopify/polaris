import invariant from 'tiny-invariant';
import decamelize from 'decamelize';
import type {Entries} from 'type-fest';

import {isObject} from '../../utilities/is-object';

import type {
  ResponsiveStyleProps,
  ResponsiveStylePropsWithModifiers,
  PropDefaults,
  ValueMapper,
  Properties,
  PropPath,
} from './generated-data';
import {
  disallowedCSSPropertyValues,
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

// type RecursiveKeys<T> = T extends object
//   ?
//       | keyof T
//       | {
//           // eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
//           [Prop in keyof T]: T[Prop] extends Record<any, any>
//             ? RecursiveKeys<T[Prop]>
//             : never;
//         }[keyof T]
//   : never;

type PseudoElementProp = keyof typeof pseudoElements;
type ModifierProp = keyof typeof modifiers;
type BreakpointProp = keyof typeof breakpoints;

type PropPathValues = PropPath extends (infer T)[] ? T : never;

export type ConversionResult = {
  style: Properties;
} & {
  [K in PseudoElementProp]?: {
    style: Properties;
  };
};

type AccumulatorCondition = Exclude<
  ModifierProp | BreakpointProp,
  typeof defaultBreakpointKey
>;

interface DeclarationCondition {
  condition?: AccumulatorCondition;
  value: unknown;
}

type ConditionalDeclarations = {
  [K in keyof Properties]?: DeclarationCondition[];
};

type DeclarationAccumulator = {
  [Key in
    | PseudoElementProp
    // eslint-disable-next-line prettier/prettier
    | (typeof Constant)['RootElement']]?: ConditionalDeclarations;
};

type Elements = keyof DeclarationAccumulator;

type ConvertResult = {
  [Key in keyof DeclarationAccumulator]: {
    // eslint-disable-next-line @typescript-eslint/ban-types
    [K in keyof Properties]?: Properties[K] | (string & {});
  };
};

// Defining these at the top level scope should allow them to be inlined by
// esbuild (https://github.com/evanw/esbuild/releases/tag/v0.14.9) and tsc
// (https://www.typescriptlang.org/docs/handbook/enums.html#const-enums).
const enum Constant {
  // NOTE: Constant.RootElement is used as an object key
  RootElement,
  ModifierParent,
  DeclarationParent,
  PseudoElementParent,
}

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

function insertIntoProperties(
  properties: DeclarationAccumulator,
  whichElement: Elements,
  declaration: keyof Properties,
  condition: CascadeOrderKeys,
  valueToInsert: unknown,
) {
  // Have to do this chained assignment to workaround TS: "Type narrowing
  // does not occur for indexed access forms e[k] where k is not a
  // literal."
  // See: https://github.com/microsoft/TypeScript/issues/49613#issuecomment-1160324092
  // eslint-disable-next-line no-multi-assign
  const element = (properties[whichElement] ??= {});

  // Initialize as an array (not an object) to retain numerical key
  // ordering, and NOT insertion order
  // eslint-disable-next-line no-multi-assign
  const conditionalDeclarations = (element[declaration] ??= []);

  conditionalDeclarations[cascadeOrder[condition]] = {
    // Given {color: {xs: 'green', sm: 'red', lg: 'blue'}}
    // and defaultBreakpointKey = 'xs'
    // When `prop` is 'sm' or 'lg', we set it as the 'condition'.
    // When `prop` is 'xs', there's no 'condition'.
    //
    // Given {color: 'red'}
    // Then there is no condition.
    condition: condition !== defaultBreakpointKey ? condition : undefined,
    value: valueToInsert,
  };
}

export function convertStylePropsToCSSProperties(
  styleProps: ResponsiveStylePropsWithModifiers,
  defaults: PropDefaults = {},
  valueMapper: ValueMapper = identity,
): ConversionResult {
  debugger;
  const converted = convert(
    styleProps,
    defaults,
    valueMapper,
    undefined,
    [],
    Constant.RootElement,
  );
  debugger;

  // Inject defaults for properties that don't have them
  // if (parentIsRoot) {
  //   // TODO iterate over properties
  //   const defaultValue = getDefault(declaration);

  //   if (defaultValue != null) {
  //     declarationAcc[whichElement]![declaration]![defaultValueCascadeOrder] =
  //       defaultValue;
  //   }
  // }
  const {[Constant.RootElement]: baseStyleProps, ...pseudoElementsStyleProps} =
    converted;

  return {
    // Our generated styles can be random strings (`var(...)` etc), but the
    // `Properties` from `csstype` doesn't always union strings. We want to play
    // nicely with the `csstype` ecosystem (React et al), so we down-cast the
    // type to pretend it's compatible with Properties (which in practicality it
    // _is_, it's just TS which doesn't know that).
    style: (baseStyleProps ?? {}) as Properties,
    ...mapObjectValues(pseudoElementsStyleProps, (pseudoElementStyleProps) =>
      pseudoElementStyleProps
        ? {
            style: pseudoElementStyleProps as Properties,
          }
        : undefined,
    ),
  };
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

let cascadeOrderNumber = 0;

// Least specific first
const cascadeOrder = {
  ...mapObjectValues(breakpoints, () => cascadeOrderNumber++),
  ...mapObjectValues(modifiers, () => cascadeOrderNumber++),
} as const;

type CascadeOrderKeys = keyof typeof cascadeOrder;

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
function convert(
  // TODO: Does this recursive type cause TS to be slow?
  styleProps: RecursiveValues<ResponsiveStylePropsWithModifiers>,
  defaults: PropDefaults,
  valueMapper: ValueMapper,
  parent:
    | Constant.ModifierParent
    | Constant.DeclarationParent
    | Constant.PseudoElementParent
    | undefined,
  parentPropPath: PropPath,
  whichElement: Elements,
): ConvertResult {
  const parentIsResponsiveDeclaration = parent === Constant.DeclarationParent;
  const parentIsPseudoElement = parent === Constant.PseudoElementParent;

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
      // TODO: How to narrow 'prop' here?
      const propPath: PropPath = [...parentPropPath, prop as PropPathValues];

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
          !disallowedCSSPropertyValues.includes(
            // eslint-disable-next-line prettier/prettier
            mappedValue as (typeof disallowedCSSPropertyValues)[number],
          ),
          `${
            propPath?.length ? `[${propPath.join('.')}] ` : ''
          }${mappedValue} is a reserved value. Please use a different value.`,
        );

        insertIntoProperties(
          properties,
          whichElement,
          declaration as keyof Properties,
          // TODO Not sure why TS isn't narrowing prop down correctly here. it could
          // only possibly be one of the responsive object keys at this point.
          parentIsResponsiveDeclaration
            ? (prop as CascadeOrderKeys)
            : defaultBreakpointKey,
          mappedValue,
        );
        return;
      }

      if (valueIsObject) {
        const nestedProperties = convert(
          // TODO: How do I fix this?
          value as typeof styleProps,
          defaults,
          valueMapper,
          /* eslint-disable no-nested-ternary -- It's terse & readable */
          propIsModifier
            ? Constant.ModifierParent
            : propIsBreakpoint
            ? Constant.DeclarationParent
            : propIsPseudoElement
            ? Constant.PseudoElementParent
            : Constant.DeclarationParent,
          /* eslint-enable no-nested-ternary */
          propPath,
          // Switch to the relevant pseudo element if encountered
          // TODO: How to narrow the type of `prop` here?
          propIsPseudoElement ? (prop as Elements) : whichElement,
        );

        // Now that we've got the result of recursing, we need to inject these
        // values into the individual properties we know about so far.
        // For the root element, and the pseudo elements
        (
          Object.entries(nestedProperties) as Entries<typeof nestedProperties>
        ).forEach(([nestedElement, values]) => {
          // Merge each delcaration into the property object for this iteration
          // Later, these values will get turned into strings
          values &&
            (Object.entries(values) as Entries<typeof values>).forEach(
              ([declaration, value]) => {
                value != null &&
                  insertIntoProperties(
                    properties,
                    nestedElement,
                    declaration as keyof Properties,
                    // TODO: How do we narrow `prop`'s type here?
                    propIsModifier
                      ? (prop as CascadeOrderKeys)
                      : defaultBreakpointKey,
                    value,
                  );
              },
            );
        });
      }
    },
  );

  // Convert array of { value, condition } to the Space Hack CSS
  return mapObjectValues(properties, (elements) =>
    elements
      ? mapObjectValues(elements, (values) =>
          (values ?? []).reduce(
            (output, {value, condition}) =>
              condition
                ? `var(--${cssCustomPropertyNamespace}${condition}-on,${value})${
                    output
                      ? ` var(--${cssCustomPropertyNamespace}${condition}-off,${output})`
                      : ''
                  }`
                : `${value}`,
            '',
          ),
        )
      : undefined,
  );
}
