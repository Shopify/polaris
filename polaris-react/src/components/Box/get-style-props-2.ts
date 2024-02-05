'use strict';

/*
 * PERFORMANCE
 *
 *
 * Use `Object.keys()` over `Object.entries()`
 * -------------------------------------------
 *
 * Object.keys() appears to be slightly faster
 * (possibly because Object.keys returns an iterable that the JS engine has to
 * construct on every call wheras Object.keys returns a pre-calculated array
 * of the keys due to the way the data is represented within the JS engine.
 *
 * Test: https://www.measurethat.net/Benchmarks/Show/3685/0/objectentries-vs-objectkeys-vs-objectkeys-with-extra-ar#latest_results_block
 *
 * Mutate over copy
 * ----------------
 *
 * Mutating existing objects/arrays is much faster (2x) than creating new ones
 * wherever possible.
 *
 * Test: https://jsbench.me/i1ls861rj9/1
 *
 * Iterate with `for` loops not `for..of` or `.forEach()`
 * ------------------------------------------------------
 *
 * `for..of` uses iterators which internally perform a function call, do
 * internal "done" checks, return the value + done, then do another "done" check
 * before continuing.
 *
 * `.forEach()` Requires creating a function + closure + everything that goes
 * with that, then function execution overhead.
 *
 * `for` requires no iterators, does simple property access, and has no function
 * creation/execution requirements.
 */

import invariant from 'tiny-invariant';
import decamelize from 'decamelize';

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
  stylePropAliasFallbacks,
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
    | typeof Constant['RootElement']]?: ConditionalDeclarations;
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

type CascadeOrderKeys = keyof typeof breakpoints | keyof typeof modifiers;

let cascadeOrderNumber = 0;

const cascadeOrder = {} as {
  [Key in CascadeOrderKeys]: number;
};

// Least specific first
for (
  let cascadeKeys = Object.keys(breakpoints).concat(
      Object.keys(modifiers),
    ) as CascadeOrderKeys[],
    i = 0;
  i < cascadeKeys.length;
  i++
) {
  cascadeOrder[cascadeKeys[i]] = cascadeOrderNumber++;
}

type ExtractArrayValues<T extends object> = T[keyof T] extends (infer A)[]
  ? A
  : never;

type Aliases = ExtractArrayValues<typeof stylePropAliasFallbacks>;

type InvertedAliases = {
  [key in Aliases]: (keyof typeof stylePropAliasFallbacks | Aliases)[];
};

/**
 * Leverage the ordered array of stylePropAliasFallbacks to generate a
 * linked-list style data structure suitable for generating a tree-like data
 * structure.
 *
 * Concretely, we're converting this:
 * {
 *   paddingInlineStart: ["paddingLeft","paddingInline","padding"],
 *   paddingInlineEnd: ["paddingRight","paddingInline","padding"],
 *   paddingBlockStart: ["paddingTop","paddingBlock","padding"],
 *   paddingBlockEnd: ["paddingBottom","paddingBlock","padding"],
 * }
 *
 * into this:
 *
 * {
 *  padding: ["paddingInline", "paddingBlock"],
 *  paddingInline: ["paddingLeft", "paddingRight"],
 *  paddingBlock: ["paddingTop", "paddingBottom"],
 *  paddingLeft: ["paddingInlineStart"],
 *  paddingRight: ["paddingInlineEnd"],
 *  paddingTop: ["paddingBlockStart"],
 *  paddingBottom: ["paddingBlockEnd"],
 * }
 */
// TODO: move this into the generation script
const inverseAliases = (
  Object.keys(
    stylePropAliasFallbacks,
  ) as (keyof typeof stylePropAliasFallbacks)[]
).reduce((memo, property) => {
  const aliases = stylePropAliasFallbacks[property];
  aliases.forEach((alias, index) => {
    // Checking if a value exists // for `memo[alias]`, and if not it'll
    // assign it a new value of `[]`. // Either way, it'll set the variable
    // `targets` equal to the either // existing array, or newly created
    // array.
    // eslint-disable-next-line no-multi-assign
    const targets = (memo[alias] ??= []);

    // The aliases array is ordered, so this alias points to the alias
    // immediately before it. If this is the first alias, it points at the
    // property itself.
    const target = index === 0 ? property : aliases[index - 1];
    if (!targets.includes(target)) {
      targets.push(target);
    }
  });

  return memo;
}, {} as InvertedAliases);

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

// Used in places where an object may be undefined so we can do things like
// `Object.keys` without extra checks.
const identityObject = Object.freeze({});

function identity<T>(arg: T): T {
  return arg;
}

function hasOwn(obj: object, key: any): boolean {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

function mutateObjectValues<T extends object, R = T[keyof T]>(
  obj: T,
  map: (val: T[keyof T], key: keyof T) => R,
): {[K in keyof T]: R} {
  // Doing this as a mutating for loop is the most performant:
  // https://jsbench.me/i1ls861rj9/1
  for (
    let keys = Object.keys(obj) as (keyof T)[], i = 0;
    i < keys.length;
    i++
  ) {
    const key = keys[i];
    (obj as {[K in keyof T]: R})[key] = map(obj[key], key);
  }
  return obj as {[K in keyof T]: R};
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
    condition: condition === defaultBreakpointKey ? undefined : condition,
    value: valueToInsert,
  };
}

export function convertStylePropsToCSSProperties(
  /**
   * A value of `null` will remove any default for that property without having to
   * apply your own value. Roughly equivalent to CSS `unset`.
   */
  styleProps: ResponsiveStylePropsWithModifiers,
  runtimeDefaults?: PropDefaults,
  valueMapper: ValueMapper = identity,
): ConversionResult {
  const styles = [styleProps];
  let lastIsWeakMerged = false;
  if (runtimeDefaults) {
    styles.push(runtimeDefaults);
  }
  if (globalDefaults) {
    styles.push(globalDefaults);
    lastIsWeakMerged = true;
  }
  // NOTE: purposely ignore any un-merged global defaults as they've already
  // been added to the generated .css file during setup.
  const [converted] = convert(
    styles,
    lastIsWeakMerged,
    valueMapper,
    undefined,
    [],
    Constant.RootElement,
  );

  // TODO: De-dupe keys
  //
  // 1. store the value in a cache as long as no values are
  //    `unset`/`initial`/`inherit`/etc
  // 2. For every cache value with more than one hit
  //    a) create a new CSS Custom Property for it
  //    b) replace each property's final value with a var() of the cached custom
  //    property

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

  // Our generated styles can be random strings (`var(...)` etc), but the
  // `Properties` from `csstype` doesn't always union strings. We want to play
  // nicely with the `csstype` ecosystem (React et al), so we down-cast the
  // type to pretend it's compatible with Properties (which in practicality it
  // _is_, it's just TS which doesn't know that).
  const rootStyles = (converted[Constant.RootElement] ?? {}) as Properties;
  delete converted[Constant.RootElement];

  // Avoid creating another new object by re-using the result of the function
  // call above
  const result = mutateObjectValues(converted, (pseudoElementStyleProps) =>
    pseudoElementStyleProps
      ? {
          style: pseudoElementStyleProps as Properties,
        }
      : undefined,
  ) as ConversionResult;

  result.style = rootStyles;

  return result;
}

export function convertCSSPropertiesToStyleSheet(
  styles: Properties,
  selector: string,
  prettyIndent?: number,
) {
  return `${selector}{${(Object.keys(styles) as (keyof Properties)[])
    .reduce((acc, cssProperty) => {
      acc.push(
        `${
          // Leave Custom Properties alone but all other CSS Properties need
          // to be converted to valid CSS
          cssProperty.startsWith('--')
            ? cssProperty
            : decamelize(cssProperty, {separator: '-'})
        }: ${styles[cssProperty]};`,
      );
      return acc;
    }, [] as string[])
    .join(
      typeof prettyIndent !== 'undefined'
        ? `\n${' '.repeat(prettyIndent)}`
        : '',
    )}}`;
}

function propertyIterator(
  whichProperties: DeclarationAccumulator,
  nestedElement: keyof ConvertResult,
  values: ConvertResult[keyof ConvertResult],
  condition: CascadeOrderKeys,
) {
  // Merge each delcaration into the property object for this iteration.
  // Later, these values will get turned into strings
  values &&
    (Object.keys(values) as (keyof typeof values)[]).forEach((declaration) => {
      values[declaration] != null &&
        insertIntoProperties(
          whichProperties,
          nestedElement,
          declaration as keyof Properties,
          condition,
          values[declaration],
        );
    });
}

// TODO: Can I represent this as nested tuples?
// [
//   border,
//   [
//     hover,
//     [
//       xs,
//       green
//     ]
//   ]

// Convert array of { value, condition } to the Space Hack CSS
function spaceHackStringifier(
  elements: DeclarationAccumulator[keyof DeclarationAccumulator],
) {
  return elements
    ? mutateObjectValues(elements, (values) =>
        values == null
          ? ''
          : values.reduce(
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
    : undefined;
}

function convert(
  /**
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
  // TODO: Does this recursive type cause TS to be slow?
  stylePropsObjs: RecursiveValues<ResponsiveStylePropsWithModifiers>[],

  /**
   * Only merge the last style prop object if and preceding objects contain a
   * matching key. In this way, the last prop object is "weak merged".
   *
   * Used because global defaults have been set in the .css file, but the
   * specificity of the style="" attribute is higher, so if a matching prop is
   * passed in we need to ensure the default value is set again on the style=""
   * attribute, otherwise we don't merge it and instead let the .css style catch
   * it.
   */
  lastIsWeakMerged: boolean,
  valueMapper: ValueMapper,
  parent:
    | Constant.ModifierParent
    | Constant.DeclarationParent
    | Constant.PseudoElementParent
    | undefined,
  parentPropPath: PropPath,
  whichElement: Elements,
): [ConvertResult, ConvertResult] {
  const parentIsResponsiveDeclaration = parent === Constant.DeclarationParent;
  const parentIsPseudoElement = parent === Constant.PseudoElementParent;

  const mergedProperties: DeclarationAccumulator = {};
  const weakProperties: DeclarationAccumulator = {};
  const lastStyleObjIndex = stylePropsObjs.length - 1;

  // An O(n) recursive algorithm converting the given set of style prop objects
  // into a valid CSS style object.
  // It:
  // 1. Merges the objects.
  //    - Earlier objects overwrite values of later ones.
  //    - Primitive values are expanded to {xs: <value>} to ensure deep merge
  //      works as expected
  // 2. Expands aliases to their concrete properties.
  //    - Earlier aliases overwrite values of later ones (as per config order)
  for (
    let whichStyleObj = 0;
    whichStyleObj < stylePropsObjs.length;
    whichStyleObj++
  ) {
    const styleObj = stylePropsObjs[whichStyleObj];
    const styleProps = Object.keys(styleObj) as (keyof typeof styleObj)[];
    // Can't use a for..of here because we're modifying the array mid-loop, but
    // the iterator returned by for..of will not include items pushed onto the
    // array.
    // eslint-disable-next-line @typescript-eslint/prefer-for-of, no-labels
    stylePropLoop: for (let i = 0; i < styleProps.length; i++) {
      const prop = styleProps[i];
      const value = styleObj[prop];

      // Ignore null/undefined values
      if (value == null) {
        continue;
      }

      // This is an alias
      const aliases = inverseAliases[prop as Aliases];
      if (aliases) {
        // It expands into one or more properties, so iterate over each of them
        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for (let alias = 0; alias < aliases.length; alias++) {
          const target = aliases[alias];
          // If the target property doesn't have a value set, set it now.
          // Otherwise if it has a value already, skip it since existing values
          // are more specific and take precedence over aliases.
          if (styleObj[target] == null) {
            // TODO: This mutates the input object, should we clone it?
            styleObj[target] = value;
            // Inject the key into the object keys array ready to be iterated next
            styleProps.push(target);
          }
        }

        // Ignore this property, but continue to process the now-resolved
        // properties
        // NOTE: The alias is now unused, but we don't bother deleting it - the
        // garbage collector will handle it later, and since we're doing a
        // single O(n) iteration of the object, we won't accidentally revisit
        // that value in the future.
        continue;
      }

      // Values from here are guaranteed to be a non-alias

      // Ensure the property doesn't exist in an earlier object (ie; don't try to
      // overwrite).
      for (let prevStyleObj = 0; prevStyleObj < whichStyleObj; prevStyleObj++) {
        if (stylePropsObjs[prevStyleObj][prop] != null) {
          // Continue the outer loop by jumping to the label
          // eslint-disable-next-line no-labels
          continue stylePropLoop;
        }
      }

      // Now we can process this value
      const propIsBreakpoint = hasOwn(breakpoints, prop);
      const propIsModifier = !propIsBreakpoint && hasOwn(modifiers, prop);
      const propIsPseudoElement =
        !propIsBreakpoint && !propIsModifier && hasOwn(pseudoElements, prop);
      const propIsDeclaration =
        !propIsBreakpoint && !propIsModifier && !propIsPseudoElement;
      const valueIsObject = typeof value === 'object';
      // TODO: How to narrow 'prop' here?
      const propPath: PropPath = [...parentPropPath, prop as PropPathValues];

      // NOTE; We do the property checks early like this because it minifies
      // really well in production mode:
      // https://esbuild.github.io/try/#dAAwLjE5LjExAHsgbWluaWZ5OiB0cnVlIH0AZnVuY3Rpb24gZnVuYygpIHsKICBjb25zdCB3aG9hID0gZm9vLmJhcjsKCiAgaWYgKGZvbyAmJiB6aXApIHsKICAgIC8vIElnbm9yZQogICAgcmV0dXJuOwogIH0KCiAgaWYgKGJhciAmJiB6aXAgfHwgd2hvYSkgewogICAgLy8gSWdub3JlCiAgICByZXR1cm47CiAgfQoKICBjb25zb2xlLmxvZygnZG9uZScpOwp9CgpleHBvcnQgeyBmdW5jIH07
      // Ignore null & undefined values
      // Optimisation: When an explicit 'unset' is passed in, we might be able
      // to simply not return anything ('unset' is the browser's default). Except
      // when there's a matching weak value set; we don't yet know if the value
      // can merged further up the tree.
      if (
        value === 'unset' &&
        (!lastIsWeakMerged || stylePropsObjs[lastStyleObjIndex][prop] == null)
      ) {
        continue;
      }

      if (!parentIsResponsiveDeclaration && propIsBreakpoint) {
        process.env.NODE_ENV === 'development' &&
          warnOnInvalidProperty(
            propPath,
            `Breakpoint props can only be specified directly on a declaration property. For example: { color: { sm: 'red', lg: 'blue' } }.`,
          );

        // ignore this invalid property
        continue;
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
        continue;
      }

      if (parentIsResponsiveDeclaration && propIsBreakpoint && valueIsObject) {
        process.env.NODE_ENV === 'development' &&
          warnOnInvalidProperty(
            propPath,
            `Breakpoint values cannot be an object.`,
          );

        // ignore this invalid property
        continue;
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
        continue;
      }

      // Modifiers must be objects
      if (!valueIsObject && propIsModifier) {
        process.env.NODE_ENV === 'development' &&
          warnOnInvalidProperty(
            propPath,
            `Modifier \`${prop}\` must be an object.`,
          );

        // ignore this invalid property
        continue;
      }

      // Pseudo elements must be objects
      if (!valueIsObject && propIsPseudoElement) {
        process.env.NODE_ENV === 'development' &&
          warnOnInvalidProperty(
            propPath,
            `Pseudo element \`${prop}\` must be an object.`,
          );

        // ignore this invalid property
        continue;
      }

      // Weak style props are only merged in if there's an equivalent strong
      // property somewhere in the style props, so we need to keep them seperate
      // while we're recursing and only merge them as the style prop is detected
      const properties =
        lastIsWeakMerged && whichStyleObj === lastStyleObjIndex
          ? weakProperties
          : mergedProperties;

      // Process a non-object concrete value.
      // Eg; {color: 'red'}
      // or
      // {sm: 'blue'}
      if (parentIsResponsiveDeclaration) {
        // The declaration is actually the parent object, so we grab that from the
        // path (eg; { color: { sm: 'red' } }).
        // TODO: What about aliases?
        const declaration = parentPropPath.at(-1) as keyof ResponsiveStyleProps;

        // Global defaults get mapped earlier in the process
        const mappedValue =
          lastIsWeakMerged && whichStyleObj === lastStyleObjIndex
            ? value
            : valueMapper(value, declaration, propPath);

        // Since Typescript doesn't have negation types (`string & not 'inherit'`),
        // we need to do a runtime check for invalid values because some of the
        // csstype types have a `| string` union which then allows some values to
        // sneak through at runtime.
        invariant(
          !disallowedCSSPropertyValues.includes(
            // eslint-disable-next-line prettier/prettier
            mappedValue as typeof disallowedCSSPropertyValues[number],
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
          prop as CascadeOrderKeys,
          mappedValue,
        );
      } else {
        // For this and following style objects, gather up the ones that have
        // values so we can recurse with them.
        // key
        let lastIsWeakMergedForRecursion = lastIsWeakMerged;
        const stylePropObjsForRecursion: typeof stylePropsObjs = [];
        for (
          let otherStyleObj = whichStyleObj;
          otherStyleObj < stylePropsObjs.length;
          otherStyleObj++
        ) {
          const otherObjsValue = stylePropsObjs[otherStyleObj][prop];
          if (otherObjsValue != null) {
            stylePropObjsForRecursion.push(
              // Normalize declarations to responsive object format
              // eg; `{color: 'red'}` becomes `{color: {xs: 'red'}}`
              propIsDeclaration && typeof otherObjsValue !== 'object'
                ? {[defaultBreakpointKey]: otherObjsValue}
                : otherObjsValue,
            );
          } else if (otherStyleObj === lastStyleObjIndex) {
            lastIsWeakMergedForRecursion = false;
          }
        }

        const [nestedMergedProperties, nestedWeakProperties] = convert(
          stylePropObjsForRecursion,
          lastIsWeakMergedForRecursion,
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
          Object.keys(
            nestedMergedProperties,
          ) as (keyof typeof nestedMergedProperties)[]
        ).forEach((nestedElement) => {
          propertyIterator(
            mergedProperties,
            nestedElement,
            nestedMergedProperties[nestedElement],
            // TODO: How do we narrow `prop`'s type here?
            // Ie; it's _hover, _active, etc
            propIsModifier ? (prop as CascadeOrderKeys) : defaultBreakpointKey,
          );
        });

        (
          Object.keys(
            nestedWeakProperties,
          ) as (keyof typeof nestedWeakProperties)[]
        ).forEach((nestedElement) => {
          propertyIterator(
            weakProperties,
            nestedElement,
            nestedWeakProperties[nestedElement],
            // TODO: How do we narrow `prop`'s type here?
            // Ie; it's _hover, _active, etc
            propIsModifier ? (prop as CascadeOrderKeys) : defaultBreakpointKey,
          );
        });
      }
    }
  }

  // When a global default is set, and a corresponding style prop is set, they
  // must be merged together before they're stringified to ensure the cascade
  // order is preserved.
  // TODO: Is there a more efficient way of doing this without having to loop
  // over the entire globalDefaultProperties object every time? Maybe move it
  // into the above loop which is already going over the objects?
  (Object.keys(weakProperties) as (keyof typeof weakProperties)[]).forEach(
    (whichGlobalDefaultElement) => {
      const declarations = weakProperties[whichGlobalDefaultElement];
      declarations &&
        (Object.keys(declarations) as (keyof typeof declarations)[]).forEach(
          (key) => {
            const declarationConditions = declarations[key];
            const runtimeDeclaration =
              mergedProperties[whichGlobalDefaultElement]?.[key];
            if (runtimeDeclaration) {
              // merge the cascade-ordered declarations of the global default back
              // into the runtime declaration
              declarationConditions &&
                declarationConditions.forEach((condition, cascadeIndex) => {
                  // Only set the runtime value if it's not already set (ie;
                  // runtime values override global defaults)
                  runtimeDeclaration[cascadeIndex] ??= condition;
                });

              // Now that it's merged, delete it so it doesn't get merged again
              // later
              delete declarations[key];
            }
          },
        );
    },
  );

  return [
    mutateObjectValues(mergedProperties, spaceHackStringifier),
    mutateObjectValues(weakProperties, spaceHackStringifier),
  ];
}
