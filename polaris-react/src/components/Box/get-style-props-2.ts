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
  stylePropDefaults as globalDefaults,
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

type CascadeOrderKeys = keyof typeof cascadeOrder;

let cascadeOrderNumber = 0;

// Least specific first
const cascadeOrder = {
  ...mapObjectValues(breakpoints, () => cascadeOrderNumber++),
  ...mapObjectValues(modifiers, () => cascadeOrderNumber++),
} as const;

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

function filterObjectValues<T extends object>(
  obj: T,
  filter: (val: T[keyof T], key: keyof T) => boolean,
): Partial<T> {
  const result: Partial<T> = {};
  for (const key in obj) {
    if (
      Object.prototype.hasOwnProperty.call(obj, key) &&
      filter(obj[key], key)
    ) {
      result[key] = obj[key];
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
  runtimeDefaults: PropDefaults = {},
  valueMapper: ValueMapper = identity,
): ConversionResult {
  debugger;

  const converted = convert(
    styleProps,
    // Global defaults have been set in the .css file, but the specificity of
    // the style="" attribute is higher, so if a prop with that value is passed
    // in for, say, `_hover`, we need to ensure we set the default again here,
    // otherwise the browser will never see the value in the .css file.
    // TODO: Globals are treated differently to runtime:
    // - Globals only need to be applied if that property exists, ie; because
    // we'd inadvertently overridden the values in the .css file.
    // - Runtime defaults need to be injected into the style object every time.
    {
      ...globalDefaults,
      ...filterObjectValues(runtimeDefaults, (value) => value != null),
    },
    valueMapper,
    undefined,
    [],
    Constant.RootElement,
  );
  debugger;

  // TODO: Make defaults static only:
  // 1. Some passed in to the .css file creation which get set as global
  //    fallbacks for unset properties. Also used as fallbacks when a property
  //    (or an alias) _is_ passed in.
  // 2. Allow partial overriding of defaults passed into the `convert()` method
  //    which gets merged with the global defaults before being applied. This
  //    allows dynamically setting some defaults before calling `convert()`
  //    based on other prop values, and avoids the callsite having to know to
  //    check all aliases.
  //
  //    Wait, no that doesn't work because what if the
  //    callsite only wants to set a default / fallback if another specific
  //    property is set to a specific value?
  //
  // Maybe we stick with the current approach of dynamic + static?

  const staticDefaults;
  (Object.entries(runtimeDefaults) as Entries<typeof runtimeDefaults>).forEach(
    ([key, value]) => {},
  );

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
  selector: string,
  prettyIndent?: number,
) {
  return `${selector}{${Object.entries(styles)
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
    .join(
      typeof prettyIndent !== 'undefined'
        ? `\n${' '.repeat(prettyIndent)}`
        : '',
    )}}`;
}

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
  /**
   * Global defaults have been set in the .css file, but the specificity of the
   * style="" attribute is higher, so if a matching prop is passed in we need to
   * ensure the default value is set again on the style="" attribute.
   *
   * TODO: Globals are treated differently to runtime:
   * - Globals only need to be applied if that property exists, ie; because
   * we'd inadvertently overridden the values in the .css file.
   */
  globalDefaults: PropDefaults,
  /**
   * Runtime defaults act as fallbacks for when a prop isn't passed in. NOTE:
   * defaults are ignored if a value is passed for any pseudo element or
   * modifier or responsive value.
  */
  // TODO: Follow a deep-merge strategy with one exception: Responsive values are
  // NOT deep merged; they will be replaced with the passed-in prop's value.
  //
  // @example
  // const props = {
  //   borderInlineStartColor: 'red',
  // }
  // 
  // // runtime default of 1px border when a border color is set
  // if (props.borderInlineStartColor) {
  //   defaults.borderInlineStartWidth = 1
  // }
  // 
  // convertStylePropsToCSSProperties(props, defaults)
  // // {
  // //   borderInlineStartColor: 'red',
  // //   borderInlineStartWidth: '1',
  // // }
  // 
  // @example
  // const props = {
  //   borderInlineStartColor: 'red',
  //   borderInlineStartWidth: {sm: 3}
  // }
  // 
  // // runtime default of 1px border when a border color is set
  // if (props.borderInlineStartColor) {
  //   defaults.borderInlineStartWidth = {xs: 1, md: 2};
  // }
  // 
  // convertStylePropsToCSSProperties(props, defaults)
  // // {
  // //   borderInlineStartColor: 'red',
  // //   // Default value is NOT merged in
  // //   borderInlineStartWidth: 'var(--_md-on, 2) (--_md-off, 1)',
  // // }
  // 
  // @example
  // const props = {
  //   borderInlineStartColor: 'red',
  //   _hover: {
  //     borderInlineStartWidth: {sm: 3}
  //   }
  // }
  // 
  // // runtime default of 1px border when a border color is set
  // if (props.borderInlineStartColor) {
  //   defaults.borderInlineStartWidth = {xs: 1, md: 2};
  // }
  // 
  // convertStylePropsToCSSProperties(props, defaults)
  // // {
  // //   borderInlineStartColor: 'red',
  // //   // Hover value is merged in, but concrete value is not
  // //   borderInlineStartWidth: 'var(--__hover-on, var(--_sm-on, 3)) var(--__hover-off, var(--_md-on, 2) (--_md-off, 1))',
  // // }
  //
  // TODO: Use `null` values to mean "Don't use the default value if it's set"
  // the user can stop the `_hover` default from applying / doesn't have to.
  runtimeDefaults: PropDefaults,
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

        const mappedValue = valueMapper(value, declaration, propPath);

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
          }${mappedValue} is a disallowed value. Please use a different value.`,
        );

        insertIntoProperties(
          properties,
          whichElement,
          declaration as keyof Properties,
          // TODO Not sure why TS isn't narrowing prop down correctly here. it could
          // only possibly be one of the responsive object keys at this point.
          parentIsResponsiveDeclaration
            // Ie; it's xs, sm, md, etc
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
          // Also recurse into the default values object (if it's set)
          globalDefaults &&
            (propIsModifier || propIsBreakpoint || propIsPseudoElement)
            ? globalDefaults[prop]
            : globalDefaults,
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
          // Merge each delcaration into the property object for this iteration.
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
                      // Ie; it's _hover, _active, etc
                      ? (prop as CascadeOrderKeys)
                      : defaultBreakpointKey,
                    value,
                  );
              },
            );

          if (globalDefaults && Object.prototype.hasOwnProperty(globalDefaults, 
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
