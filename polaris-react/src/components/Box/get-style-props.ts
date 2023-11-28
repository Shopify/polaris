import invariant from 'tiny-invariant';
import {breakpointsAliases} from '@shopify/polaris-tokens';
import type {BreakpointsAlias} from '@shopify/polaris-tokens';
import type {Entries} from 'type-fest';

import type {ResponsiveProp, ResponsivePropObject} from '../../utilities/css';
import {isObject} from '../../utilities/is-object';

import type {
  ResponsiveStyleProps,
  ResponsiveStylePropsWithModifiers,
  PropDefaults,
} from './generated-data';
import {
  stylePropAliasFallbacks,
  disallowedCSSPropertyValues,
  stylePropAliasNames as allAliases,
  cssCustomPropertyNamespace,
  modifiers,
} from './generated-data';

const baseStylePropsModifierKey = '' as const;
type BaseStylePropsModifierKey = typeof baseStylePropsModifierKey;

const baseStylePropsBreakpointKey = '' as const;
type BaseStylePropsBreakpointKey = typeof baseStylePropsBreakpointKey;

type BreakpointsAliasesWithBaseKey =
  | BaseStylePropsBreakpointKey
  | Exclude<BreakpointsAlias, typeof breakpointsAliases[0]>;

// The "base" styles always come last after other modifiers
const allModifiers: (typeof modifiers[number] | BaseStylePropsModifierKey)[] = [
  ...modifiers,
  baseStylePropsModifierKey,
];

type ResponsiveStylePropObjects = {
  [T in keyof ResponsiveStyleProps]?: ResponsiveStyleProps[T] extends ResponsiveProp<
    infer V
  >
    ? ResponsivePropObject<V>
    : never;
};

type ModifierStyleProps = {
  [K in typeof allModifiers[number]]?: ResponsiveStyleProps;
};

interface StyleValue {
  modifier?: typeof allModifiers[number];
  breakpoint?: BreakpointsAliasesWithBaseKey;
  value: unknown;
}

const reversedBreakpointsAliases = [...breakpointsAliases].reverse();

// Performs 3 main functions:
// 1. Converts all values to object syntax
// 2. Removes `undefined` and `null` values
// 3. Removes `{}` values
function normalizeStyleProps(
  responsiveProps: ResponsiveStyleProps,
): ResponsiveStylePropObjects {
  return Object.fromEntries(
    Object.entries(responsiveProps)
      .map(([stylePropName, stylePropValue]) => {
        // "falsey" values are valid except `null` or `undefined`.
        // Set to empty object so it's removed by the following filter().
        if (stylePropValue == null) {
          return [stylePropName, {}];
        }

        if (isObject(stylePropValue)) {
          return [
            stylePropName,
            // Skip undefined values (can happen when explicit 'undefined' is
            // passed in, or from resolving aliases above).
            // May result in an empty object, which will be cause by the
            // following filter().
            filterObject(
              stylePropValue,
              (value) => typeof value !== 'undefined',
            ),
          ];
        }

        return [
          stylePropName,
          {
            [breakpointsAliases[0]]: stylePropValue,
          },
        ];
      })
      // No concrete value at any breakpoints? Just ignore this style prop and
      // move on
      .filter(([, stylePropValue]) => Object.keys(stylePropValue).length),
  );
}

function filterObject<T extends object>(
  obj: T,
  filter: (
    val: T[Extract<keyof T, string>],
    key: Extract<keyof T, string>,
  ) => boolean,
): T {
  const result: T = {...obj};
  for (const key in obj) {
    if (!filter(obj[key], key)) {
      delete result[key];
    }
  }
  return result;
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

function resolveAliasFallbacks(
  styleProps: ResponsiveStyleProps,
): ResponsiveStyleProps {
  const stylePropsWithResolvedAliases: ResponsiveStyleProps = {...styleProps};

  (
    Object.entries(stylePropAliasFallbacks) as Entries<
      Required<typeof stylePropAliasFallbacks>
    >
  ).forEach(([styleProp, aliases]) => {
    for (const aliasStyleProp of aliases) {
      // if a value is already set (either passed in, or from an earlier
      // fallback), stop iterating
      if (typeof stylePropsWithResolvedAliases[styleProp] !== 'undefined') {
        break;
      }

      // Skip fallbacks that have no value set
      if (typeof styleProps[aliasStyleProp] === 'undefined') {
        continue;
      }

      // TODO: How might we remove the 'as any' here (used to fix the
      // 'Expression produces a union type that is too complex to represent.'
      // TS error)?
      (stylePropsWithResolvedAliases[styleProp] as any) =
        styleProps[aliasStyleProp];
    }
  });

  // Delete the aliases as they're no longer needed.
  for (const alias of allAliases) {
    delete stylePropsWithResolvedAliases[alias];
  }

  return stylePropsWithResolvedAliases;
}

function identity<T>(arg: T): T {
  return arg;
}

function keyByModifiers(styleProps: ResponsiveStylePropsWithModifiers) {
  const modifierStyleProps: ModifierStyleProps = {};
  for (const modifier of modifiers) {
    if (typeof styleProps[modifier] !== 'undefined') {
      modifierStyleProps[modifier] = styleProps[modifier]!;
    }
  }

  const stylePropsWithoutModifiers: ResponsiveStyleProps = {...styleProps};
  modifiers.forEach((modifier) => {
    delete stylePropsWithoutModifiers[modifier as keyof ResponsiveStyleProps];
  });

  // Always set base style props, regardless if there are any values.
  // This enables the defaults resolution to work.
  modifierStyleProps[baseStylePropsModifierKey] = stylePropsWithoutModifiers;

  return modifierStyleProps;
}

function resolveConcreteLonghandValues(
  styleProps: ResponsiveStyleProps,
  defaults: PropDefaults,
): ResponsiveStyleProps {
  // Ensure constituent styles are given fallback values even when they're not
  // passed in as an explicit style prop.
  let longhandStyleProps: ResponsiveStyleProps =
    resolveAliasFallbacks(styleProps);

  // Mix in the default values. We can't do this before resolving aliases as it
  // can interfere with the expected fallbacks being applied.
  // For example, given a fallback:
  // "paddingInlineStart": ['paddingInline', 'padding']
  // And a default of { paddingInline: '400' },
  // If the user passes in { padding: '600' }, we want the final value of
  // `paddingInlineStart` to fallback to `padding`'s '600'. But if we mixin the
  // defaults before resolving the fallbacks, `paddingInlineStart` would
  // fallback to `paddingInline: '400'` which is NOT what we want.
  longhandStyleProps = {
    ...Object.fromEntries(
      Object.entries(defaults).map(([prop, getDefault]) => [
        prop,
        typeof getDefault === 'function'
          ? getDefault(longhandStyleProps)
          : getDefault,
      ]),
    ),
    ...longhandStyleProps,
  };

  // Defaults may have contained aliases, so we have to resolve those again.
  return resolveAliasFallbacks(longhandStyleProps);
}

const getCustomPropertyValueForStyleProp = ({
  value,
  breakpoint,
  modifier,
}: StyleValue): string => {
  /**
   * Use the space hack to have the value parsed as 'initial' or the value after
   * two spaces. Think of it like an `if` where `initial === false`, and `' ' ===
   * true`:
   *
   * ```
   * --pc-box-display-sm: var(--_if-sm) grid;
   * --pc-box-display-xl: var(--_if-xl) flex;
   * ```
   *
   * NOTE: The CSS custom property name must match what's in the generated
   * `.css` file.
   * */
  return `var(--${cssCustomPropertyNamespace}${breakpoint}${modifier}) ${value}`;
};

interface CustomPropertyCache {
  properties: Partial<{[x in keyof ResponsiveStyleProps]: number}>;
  propertyCount: number;
  values: {[x: string]: string};
}

const createCustomPropertyCache = (): CustomPropertyCache => ({
  properties: {},
  propertyCount: 0,
  values: {},
});

// Cache values to re-use prop names in production builds
const getCustomPropertyNameForStyleProp = (
  cache: CustomPropertyCache,
  name: keyof ResponsiveStyleProps,
  value: unknown,
  {breakpoint, modifier}: Partial<StyleValue> = {},
): string => {
  const valueString = String(value);

  if (typeof cache.values[valueString] !== 'undefined') {
    return cache.values[valueString];
  }

  let index = cache.properties[name];

  if (typeof index === 'undefined') {
    index = ++cache.propertyCount;
    cache.properties[name] = index;
  }

  // This format is specially constructed to aid in gzipping.
  // The final `style` attribute will end up with something like:
  // ```
  // --_0sm: var(--_sm) double;
  // --_1sm: var(--_sm) flex;
  // --_2sm: var(--_sm) var(--p-space-400);
  // --_3sm: var(--_sm) 2;
  // ```
  // The string `sm: var(--_sm) ` appears multiple times, which is
  // great for the gzip algo to eat up!
  const newCustomProperty = `--${cssCustomPropertyNamespace}${index}${
    typeof modifier !== 'undefined' ? `${modifier}` : ''
  }${typeof breakpoint !== 'undefined' ? `${breakpoint}` : ''}`;

  cache.values[valueString] = newCustomProperty;

  return newCustomProperty;
};

const getCustomPropertyForStyleProp = (
  cache: CustomPropertyCache,
  name: keyof ResponsiveStyleProps,
  style: StyleValue,
): [string, string] => {
  const customPropertyValue = getCustomPropertyValueForStyleProp(style);
  const customPropertyName = getCustomPropertyNameForStyleProp(
    cache,
    name,
    customPropertyValue,
    style,
  );
  return [customPropertyName, customPropertyValue];
};

/*
 * NOTES:
 * - Works because we do mobile first with (min-width) queries
 * - Alias fallbacks are applied _before_ default values
 *
 * QUESTIONS:
 * - What about aliases / shorthands? How do they behave when there are
 *   mismatched gaps like `paddingInline={{ sm: '10', lg: '50' }}
 *   paddingInlineStart={{ md: '40', xl: '100' }}`?
 *
 * Examples:
 *
 * // A non-responsive value, or only 'xs':
 * `display={{ xs: 'flex' }}` / `display="flex"`
 * ```
 * display: flex;
 * ```
 *
 * // A single responsive value
 * `display={{ sm: 'flex' }}`
 * ```
 * --pc-box-display-sm: var(--_sm) flex;
 * display: var(--pc-box-display-sm);
 * ```
 *
 * // `xs` and another responsive value
 * `display={{ xs: `gird`, sm: 'flex' }}`
 * ```
 * --pc-box-display-sm: var(--_sm) flex;
 * display: var(--pc-box-display-sm, grid);
 * ```
 *
 * // Multiple adjacent resopnsive values
 * `display={{ md: 'grid', lg: 'flex' }}`
 * ```
 * --pc-box-display-md: var(--_md) grid;
 * --pc-box-display-lg: var(--_lg) flex;
 * display: var(--pc-box-display-lg, var(--pc-box-display-md));
 * ```
 *
 * // Multiple resopnsive values with gaps
 * `display={{ sm: 'grid', xl: 'flex' }}`
 * ```
 * --pc-box-display-sm: var(--_sm) grid;
 * --pc-box-display-xl: var(--_xl) flex;
 * display: var(--pc-box-display-xl, var(--pc-box-display-sm));
 * ```
 */
export function convertStylePropsToCSSProperties(
  styleProps: ResponsiveStyleProps,
  defaults: PropDefaults = {},
  valueMapper: (
    value: ResponsiveStyleProps[typeof prop],
    prop: keyof ResponsiveStyleProps,
    breakpoint: BreakpointsAlias,
    modifier: typeof allModifiers[number],
  ) => unknown = identity,
) {
  const stylePropsByModifier = mapObjectValues(
    // Split out things like `_hover` into their own objects:
    // {
    //   '<base>': ResponsiveStyleProps,
    //   '_hover': ResponsiveStyleProps,
    //   '_visited': ResponsiveStyleProps,
    //   ... etc
    // }
    keyByModifiers(styleProps),
    (value) =>
      normalizeStyleProps(
        // Expand all the aliases and apply defaults.
        resolveConcreteLonghandValues(value!, defaults),
      ),
  );

  // Get a list of all the properties that are set across the normal styleProps
  // AND the modifiers.
  const allStylePropNames = Array.from(
    new Set(
      Object.values(stylePropsByModifier)
        .map((modifierStyleProps) => Object.keys(modifierStyleProps))
        .flat(),
    ),
  ) as (keyof ResponsiveStyleProps)[];

  // Phase 3: Iterate over each of the style props set, converting them to the
  // appropriate CSS for a `style` attribute.
  const customPropertyCache = createCustomPropertyCache();

  // Iterate over a union of all the keys of nonmodifier and all modifiers
  // so we catch styles that are only applied on hover, but not normally, etc.
  return allStylePropNames.reduce((acc, stylePropName) => {
    // Gather all the values, and ensure they're ordered correctly:
    // Modifiers are ordered based on config (with non-modified values always
    // coming last).
    // Within each modifier, breakpoints are ordered from largest to smallest.
    const valuesByPriority: StyleValue[] = [];

    for (const _modifier of allModifiers) {
      const modifier = _modifier as typeof allModifiers[number];
      if (typeof stylePropsByModifier[modifier] === 'undefined') {
        continue;
      }

      const stylePropObject = stylePropsByModifier[modifier]![stylePropName];

      // Style prop has no values set for this modifier
      if (typeof stylePropObject === 'undefined') {
        continue;
      }

      for (const _breakpoint of reversedBreakpointsAliases) {
        const breakpoint = _breakpoint as typeof breakpointsAliases[number];

        // Style prop has no value set for this breakpoint on the the given
        // modifier
        if (typeof stylePropObject[breakpoint] !== 'undefined') {
          valuesByPriority.push({
            modifier,
            breakpoint:
              breakpoint === breakpointsAliases[0]
                ? baseStylePropsBreakpointKey
                : breakpoint,
            // Allow the library consumer to map values. For example; converting
            // tokens into concrete CSS values or variables.
            value: valueMapper(
              stylePropObject[breakpoint],
              stylePropName,
              breakpoint,
              modifier,
            ),
          });
        }
      }
    }

    // Nothing to do.
    if (valuesByPriority.length === 0) {
      return acc;
    }

    // Since Typescript doesn't have negation types (`string & not 'inherit'`),
    // we need to do a runtime check for invalid values because some of the
    // csstype types have a `| string` union which then allows some values to
    // sneak through at runtime.
    invariant(
      !valuesByPriority.some(({value}) =>
        disallowedCSSPropertyValues.includes(
          value as typeof disallowedCSSPropertyValues[number],
        ),
      ),
      `${disallowedCSSPropertyValues.join(
        ',',
      )} are reserved values, but were passed into the ${String(
        stylePropName,
      )} prop. Please use a different value.`,
    );

    let leastSpecificValue: unknown;

    const lastValue = valuesByPriority[valuesByPriority.length - 1];

    // Is the least specific / final fallback value set (ie; smallest
    // breakpoint with no modifiers)? If so, it can be set directly without
    // needing to be processed like other CSS custom properties which leverage
    // the space hack.
    if (
      lastValue.breakpoint === baseStylePropsBreakpointKey &&
      lastValue.modifier === baseStylePropsModifierKey
    ) {
      // Capture the value of the last item
      leastSpecificValue = lastValue.value;
      // Then remove it so it doesn't get processed like other CSS variables.
      valuesByPriority.pop();
    }

    // We need to ensure CSS declarations are scoped to the current DOM node
    // only.
    //
    // Since there's no official "scoping" in CSS (yet), we can apply a
    // functionally equivalent "scope" to the CSS custom properties we're using
    // in the declarations (to power the "space hack").
    //
    // We'll enforce scoping by combining 3 facts from the spec plus 1 from the
    // CSS "space hack" we use:
    //
    // 1. All CSS custom properties resolve to the ["Guaranteed-invalid
    //    value"](https://www.w3.org/TR/css-variables/#guaranteed-invalid-value)
    //    until they're processed at the time of applying styles to a DOM node.
    //    The value is resolved by walking up the DOM tree to look for
    //    definitions of the custom property, starting at the current node.
    // 2. When processing a `var(<cutom-property>, <fallback>)`, if the
    //    `<custom-property>` resolves to the "Guaranteed-invalid value" and a
    //    `<fallback>` is provided, the browser will recursively process that
    //    `<fallback>` (which itself could be another `var()`, or a concrete
    //    value). See: https://www.w3.org/TR/css-variables/#using-variables
    // 3. A value of `initial` acts as a concrete value to stop the browser
    //    walking up the DOM tree, but is also equal to the "Guaranteed-invalid
    //    value" when assigned to a custom property.
    // 4. The CSS "space hack" specifies custom properties with a format of
    //    `--name: var(--if-cond) <value>` where `--if-cond` can be either
    //    `initial` or a space (` `). Given there's always a `<value>` set,
    //    `--name` will always resolve to a concrete value of either `initial`
    //    or `  <value>` (which the browser trims to remove leading whitespace).
    //
    // Therefore, given every CSS custom property we reference has a concrete
    // value or `initial`, or references another custom property which resolves
    // to a concrete value or `initial`, we stop the browser walking up the DOM
    // tree to find other definitions of our custom property, and hence have
    // scopped that property to this DOM node.
    switch (valuesByPriority.length) {
      case 0:
        // No concrete value? Just return; there's nothing to do.
        if (!leastSpecificValue) {
          return acc;
        }

        // Only a single value set and it's for the smallest breakpoint without
        // a modifier?
        // Set the CSS property directly as there's no need for
        // responsiveness.
        return {
          ...acc,
          [stylePropName]: leastSpecificValue,
        };

      case 1: {
        const [customPropertyName, customPropertyValue] =
          getCustomPropertyForStyleProp(
            customPropertyCache,
            stylePropName,
            valuesByPriority[0],
          );
        return {
          ...acc,
          [customPropertyName]: customPropertyValue,
          // When the least specific value is set we use it directly here as the
          // fallback. When it's _not_ set, we don't have to do anything because
          // our CSS "space hack" will guarantee the custom property will
          // resolve to either a concrete value or the "Guaranteed-invalid
          // value" / `initial`. In that case, the CSS declaration will act as
          // if the custom property's value was `unset`, letting the browser
          // decide to set the declartion to either `initial` (whatever the
          // base-line value of the document is) or `inherit`.
          [stylePropName]: `var(${customPropertyName}${
            typeof leastSpecificValue !== 'undefined'
              ? `,${leastSpecificValue}`
              : ''
          })`,
        };
      }

      // Optimization: When there are more than 2 fallbacks, we create a separate CSS
      // custom property to hold them. This can then be re-used across many
      // similar properties that have the same value.
      //
      // For example, instead of:
      // ```
      // paddingInlineStart: var(--_0xl, var(--_0lg, var(--_0md, var(--_0sm, 10px))));
      // paddingInlineEnd:   var(--_0xl, var(--_0lg, var(--_0md, var(--_0sm, 10px))));
      // paddingBlockStart:  var(--_0xl, var(--_0lg, var(--_0md, var(--_0sm, 10px))));
      // paddingBlockEnd:    var(--_0xl, var(--_0lg, var(--_0md, var(--_0sm, 10px))));
      // ```
      //
      // We can move those into a re-usable variable to save some bytes & help
      // readability:
      // ```
      // --_0: var(--_0xl, var(--_0lg, var(--_0md, var(--_0sm, 10px))));
      // paddingInlineStart: var(--_0);
      // paddingInlineEnd:   var(--_0);
      // paddingBlockStart:  var(--_0);
      // paddingBlockEnd:    var(--_0);
      // ```
      default: {
        const cssCustomProperties = Object.fromEntries(
          valuesByPriority.map((styleValue) =>
            getCustomPropertyForStyleProp(
              customPropertyCache,
              stylePropName,
              styleValue,
            ),
          ),
        );

        // Accumulate the first half of the fallback var statements. Eg;
        // ```
        // var(--pc-box-gap-xl, var(--pc-box-gap-lg, var(--pc-box-gap-md
        // ```
        const fallbackValueStart = Object.keys(cssCustomProperties)
          .map((propertyName) => `var(${propertyName}`)
          .join(',');

        // If there's a concrete value for the least specific (smallest
        // breakpoing & no modifier), then we can insert that as the final
        // fallback in the custom property.
        const fallbackValueMiddle = leastSpecificValue
          ? `,${leastSpecificValue}`
          : '';

        // Prepare the second half of the fallback. Eg;
        // ```
        // )))
        // ```
        const fallbackValueEnd = ')'.repeat(valuesByPriority.length);

        const fallbackValue = `${fallbackValueStart}${fallbackValueMiddle}${fallbackValueEnd}`;
        const fallbackPropertyName = getCustomPropertyNameForStyleProp(
          customPropertyCache,
          stylePropName,
          fallbackValue,
        );

        return {
          ...acc,
          ...cssCustomProperties,
          [fallbackPropertyName]: fallbackValue,
          // Since the least specific value (smallest breakpoint / no modifier) was
          // used above, there's no need for a fallback on the CSS property itself.
          //
          // When the least specific value isn't set we don't have to do
          // anything because our CSS "space hack" will guarantee the custom
          // property will resolve to either a concrete value or the
          // "Guaranteed-invalid value" / `initial`. In that case, the CSS
          // declaration will act as if the custom property's value was `unset`,
          // letting the browser decide to set the declartion to either `initial`
          // (whatever the base-line value of the document is) or `inherit`.
          [stylePropName]: `var(${fallbackPropertyName})`,
        };
      }
    }
  }, {});
}
