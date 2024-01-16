import invariant from 'tiny-invariant';
import decamelize from 'decamelize';
import endent from 'endent';
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
  stylePropAliasFallbacks,
  disallowedCSSPropertyValues,
  stylePropAliasNames as allAliases,
  cssCustomPropertyNamespace,
  modifiers,
  pseudoElements,
  breakpoints,
} from './generated-data';

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

const pseudoElementProps = Object.keys(pseudoElements) as PseudoElementProp[];
const modifierProps = Object.keys(modifiers) as ModifierProp[];

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
  const [baseStyleProps, pseudoElementStyleProps] =
    extractPseudoStyles(styleProps);

  return {
    style: convert(baseStyleProps, defaults, valueMapper),
    ...mapObjectValues<
      ReponsiveStylePseudoElementProps,
      {style: Properties} | undefined
    >(pseudoElementStyleProps, (pseudoElementStyleProps, pseudoElement) =>
      pseudoElementStyleProps
        ? {
            style: convert(pseudoElementStyleProps, defaults, valueMapper),
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
  return endent`
    .${className}${pseudoElement ? pseudoElements[pseudoElement] : ''} {
      ${Object.entries(styles)
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
        .join('\n')}
    }`;
}

/**
 * Convert this
 * ```
 * {
 *   color: 'blue',
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
 * to
 * ```
 * [
 *   {
 *     color: 'blue',
 *     _hover: {
 *       color: {xs: 'red', lg: 'green'},
 *     }
 *   },
 *   {
 *     _before: {
 *       content: '">"',
 *       display: 'block',
 *       _hover: {
 *         content: '"<"',
 *       },
 *     }
 *   }
 * ]
 * ```
 */
function extractPseudoStyles(
  styleProps: ResponsiveStylePropsWithModifiers,
): [ResponsiveStylePropsWithModifiers, ReponsiveStylePseudoElementProps] {
  // Don't mutate the original object
  const baseStyleProps = {...styleProps};
  const pseudoElementStyleProps: ReponsiveStylePseudoElementProps = {};

  pseudoElementProps.forEach((pseudoElement) => {
    if (baseStyleProps[pseudoElement]) {
      pseudoElementStyleProps[pseudoElement] = baseStyleProps[pseudoElement];
      delete baseStyleProps[pseudoElement];
    }
  });

  modifierProps.forEach((modifier) => {
    if (baseStyleProps[modifier]) {
      pseudoElementProps.forEach((pseudoElement) => {
        if (baseStyleProps[modifier]![pseudoElement]) {
          // Don't mutate the original object
          baseStyleProps[modifier] = {...styleProps[modifier]};

          // Ensure this pseudo element exists on the object
          pseudoElementStyleProps[pseudoElement] ??= {};

          // Set the modifier values for this pseudo element
          pseudoElementStyleProps[pseudoElement]![modifier] =
            baseStyleProps[modifier]![pseudoElement];

          // Delete the pseudo element styles now that we don't need them
          delete baseStyleProps[modifier]![pseudoElement];
        }
      });
    }
  });

  return [baseStyleProps, pseudoElementStyleProps];
}

// Create unique values that's good readable code, but which minifies well
const [rootParent, modifierParent, declarationParent, pseudoElementParent] =
  Array.from(Array(4), Symbol);

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
  styleProps: ResponsiveStyleProps,
  defaults: PropDefaults,
  valueMapper: ValueMapper,
  parent:
    | typeof rootParent
    | typeof modifierParent
    | typeof declarationParent
    | typeof pseudoElementParent = rootParent,
  parentPath: PropPath = [],
): Properties {
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
  //        properties[whichElement][declartion][cascadeOrder[cascadePath]] = {prop: parentPath.at(-1), value: mappedValue };
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
  //          values.forEach(({ prop, value }) => {
  //            acc[declaration] = `var(${prop}-on, ${value})${acc[declaration] ? ` var(${prop}-off, ${acc[declaration]})` : ''}`;
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
      const propPath: PropPath = [...parentPath, prop];

      // NOTE; We do the property checks early like this because it minifies
      // really well in production mode:
      // https://esbuild.github.io/try/#dAAwLjE5LjExAHsgbWluaWZ5OiB0cnVlIH0AZnVuY3Rpb24gZnVuYygpIHsKICBjb25zdCB3aG9hID0gZm9vLmJhcjsKCiAgaWYgKGZvbyAmJiB6aXApIHsKICAgIC8vIElnbm9yZQogICAgcmV0dXJuOwogIH0KCiAgaWYgKGJhciAmJiB6aXAgfHwgd2hvYSkgewogICAgLy8gSWdub3JlCiAgICByZXR1cm47CiAgfQoKICBjb25zb2xlLmxvZygnZG9uZScpOwp9CgpleHBvcnQgeyBmdW5jIH07
      // Ignore null & undefined values
      if (value == null) {
        return;
      }

      if (parent !== declarationParent && propIsBreakpoint) {
        process.env.NODE_ENV === 'development' &&
          warnOnInvalidProperty(
            propPath,
            `Breakpoint props can only be specified directly on a declaration property. For example: { color: { sm: 'red', lg: 'blue' } }.`,
          );

        // ignore this invalid property
        return;
      }

      if (parent === declarationParent && !propIsBreakpoint) {
        process.env.NODE_ENV === 'development' &&
          warnOnInvalidProperty(
            propPath,
            `When specified as an object, \`${parentPath.at(
              -1,
            )}\` can only contain the keys ${joinEnglish!(
              Object.keys(breakpoints),
              'or',
            )}.`,
          );

        // ignore this invalid property
        return;
      }

      if (parent === declarationParent && propIsBreakpoint && valueIsObject) {
        process.env.NODE_ENV === 'development' &&
          warnOnInvalidProperty(
            propPath,
            `Breakpoint values cannot be an object.`,
          );

        // ignore this invalid property
        return;
      }

      if (parent === pseudoElementParent && propIsModifier) {
        process.env.NODE_ENV === 'development' &&
          warnOnInvalidProperty(
            propPath,
            `Pseudo elements cannot contain modifiers. Try {${parentPath.at(
              -1,
            )}: {..}, ${prop}: { ${parentPath.at(-1)}: {..}}`,
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

      if (!valueIsObject) {
        // If it's a breakpoint value, the declaration is actually the parent
        // object, so we grab that from the path (eg; { color: { sm: 'red' } }).
        // Otherwise, it's the current prop (eg; { color: 'blue' })
        const declaration = (
          propIsBreakpoint ? parentPath.at(-1) : prop
        ) as keyof ResponsiveStyleProps;

        const mappedValue = valueMapper(value, declaration, parentPath);

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

        // TODO...

        return;
      }

      if (valueIsObject) {
        // recursion
        return convert(
          value,
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
        );
      }

      // ....
    },
  );
}
