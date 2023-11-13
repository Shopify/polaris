import style from './style.module.scss';
import {forwardRef} from 'react';
import invariant from 'tiny-invariant';
import decamelize from 'decamelize';
import {breakpointsAliases, tokenizedStyleProps} from '@shopify/polaris-tokens';
import type * as Polymorphic from '@radix-ui/react-polymorphic';
import type {Entries} from 'type-fest';
import {
  type ResponsiveProp,
  type ResponsivePropObject,
  isObject,
  createPolarisCSSVar,
} from '../../utils/various';
import {
  type ResponsiveStyleProps,
  stylePropAliasFallbacks,
  disallowedCSSPropertyValues,
} from './generated-data';

type CubeProps = ResponsiveStyleProps;

// Extract a unique set of just the alias names
const allAliases = Array.from(
  new Set(Object.values(stylePropAliasFallbacks).flat()),
);

const aliasFallbackEntries = Object.entries(stylePropAliasFallbacks) as Entries<
  Required<typeof stylePropAliasFallbacks>
>;

function coerceToObjectSyntax<T extends string | number | undefined = string>(
  responsiveProp: ResponsiveProp<T>,
): ResponsivePropObject<T> {
  // "falsey" values are valid except `null` or `undefined`
  if (responsiveProp == null) {
    return {};
  }

  if (isObject(responsiveProp)) {
    return responsiveProp;
  }

  return {
    [breakpointsAliases[0]]: responsiveProp,
  };
}

function filterObject<T extends object>(
  obj: T,
  filter: (
    val: T[Extract<keyof T, string>],
    key: Extract<keyof T, string>,
  ) => boolean,
): T {
  const result: T = {...obj};
  for (let key in obj) {
    if (!filter(obj[key], key)) {
      delete result[key];
    }
  }
  return result;
}

function mapObjectValues<T extends object>(
  obj: T,
  map: (
    val: T[Extract<keyof T, string>],
    key: Extract<keyof T, string>,
  ) => T[Extract<keyof T, string>],
): T {
  const result: T = {...obj};
  for (let key in obj) {
    result[key] = map(obj[key], key);
  }
  return result;
}

/*
 * NOTES:
 * - Works because we do mobile first with (min-width) queries
 * - The final value in the var fallbacks is always the `xs` size
 * - `xs` default value is `unset`
 * - No special cases needed for 'inherit' values (color et al) because the
 *   default of `xs = unset` applied directly to the property means the browser
 *   can decide if it's inherit or not.
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
 * --pc-box-display-sm: var(--_p-media-sm) flex;
 * display: var(--pc-box-display-sm, unset);
 * ```
 *
 * // `xs` and another responsive value
 * `display={{ xs: `gird`, sm: 'flex' }}`
 * ```
 * --pc-box-display-sm: var(--_p-media-sm) flex;
 * display: var(--pc-box-display-sm, grid);
 * ```
 *
 * // Multiple adjacent resopnsive values
 * `display={{ md: 'grid', lg: 'flex' }}`
 * ```
 * --pc-box-display-md: var(--_p-media-md) grid;
 * --pc-box-display-lg: var(--_p-media-lg) flex;
 * display: var(--pc-box-display-lg, var(--pc-box-display-md, unset));
 * ```
 *
 * // Multiple resopnsive values with gaps
 * `display={{ sm: 'grid', xl: 'flex' }}`
 * ```
 * --pc-box-display-sm: var(--_p-media-sm) grid;
 * --pc-box-display-xl: var(--_p-media-xl) flex;
 * display: var(--pc-box-display-xl, var(--pc-box-display-sm, unset));
 * ```
 */
function convertStylePropsToCSSProperties(styleProps: ResponsiveStyleProps) {
  const stylePropsWithExpandedAliases: ResponsiveStyleProps = {...styleProps};

  // Ensure constituent styles are given fallback values even when they're not
  // passed in as an explicit style prop.
  aliasFallbackEntries.forEach(([styleProp, aliases]) => {
    for (
      let index = 0;
      // Stop looping if there are no more fallbacks
      index < aliases.length &&
      // or if a value is already set (either passed in, or from an earlier
      // fallback)
      typeof stylePropsWithExpandedAliases[styleProp] === 'undefined';
      index++
    ) {
      // TODO: How might we remove the 'as any' here (used to fix the
      // 'Expression produces a union type that is too complex to represent.'
      // TS error)?
      (stylePropsWithExpandedAliases[styleProp] as any) =
        styleProps[aliases[index]];
    }
  });

  // Then delete the aliases as they're no longer needed.
  for (let alias of allAliases) {
    delete stylePropsWithExpandedAliases[alias];
  }

  return (
    Object.entries(stylePropsWithExpandedAliases) as Entries<
      typeof stylePropsWithExpandedAliases
    >
  ).reduce((acc, [key, stylePropValue]) => {
    // Always work with the object syntax to reduce conditionals below
    let responsiveValues = coerceToObjectSyntax(stylePropValue);

    // Skip undefined or null values (can happen when explicit 'undefined' is
    // passed in, or from expanding aliases above)
    responsiveValues = filterObject(responsiveValues, (value) => value != null);

    // No concrete value at any breakpoints? Just ignore this style prop and
    // move on
    const numberOfKeysWithValues = Object.keys(responsiveValues).length;
    if (numberOfKeysWithValues === 0) {
      return acc;
    }

    // Since Typescript doesn't have negation types (`string & not 'inherit'`),
    // we need to do a runtime check for invalid values
    invariant(
      !Object.values(responsiveValues).some((responsiveValue) =>
        disallowedCSSPropertyValues.includes(responsiveValue as any),
      ),
      `${disallowedCSSPropertyValues.join(
        ',',
      )} are reserved values, but were passed into the ${String(
        key,
      )} prop. Please use a different value.`,
    );

    // If this is a tokenized styleprop, we must convert the "values" into CSS
    // `var()` calls
    if (tokenizedStyleProps.includes(key as any)) {
      responsiveValues = mapObjectValues(responsiveValues, (value) =>
        createPolarisCSSVar(null, value),
      );
    }

    const cssProp = decamelize(key, {separator: '-'});

    // Special case: Only a single value set and it's for the 'xs' breakpoint.
    // Just set the CSS property directly as there's no need for
    // responsiveness.
    if (
      numberOfKeysWithValues === 1 &&
      typeof responsiveValues['xs'] !== 'undefined'
    ) {
      return {
        ...acc,
        [cssProp]: responsiveValues['xs'],
      };
    }

    // The final fallback value (mobile first) is handle d slighly diff.
    // We use 'unset' here to have the browser decide if a value should be
    // inherited or not.
    const xsValue = responsiveValues.xs ?? 'unset';

    // Now that we've captured the value, remove it from the object we're
    // about to process
    delete responsiveValues.xs;

    /**
     * Use the space hack to have the value parsed as 'initial' or the value
     * after two spaces
     * --pc-box-display-sm: var(--_p-media-sm) grid;
     * --pc-box-display-xl: var(--_p-media-xl) flex;
     * */
    const cssCustomProperties = Object.entries(responsiveValues).reduce(
      (memo, [breakpointAlias, value]) => ({
        ...memo,
        [`--pc-box-${cssProp}-${breakpointAlias}`]: `var(--_p-media-${breakpointAlias}) ${value}`,
      }),
      {},
    );

    /*
     const properyValue = display: var(--pc-box-display-xl, var(--pc-box-display-sm, unset));
      */

    let cssVar = xsValue;
    // Nest the fallbacks from smallest on the inside to largest on the outside.
    // Order is important, so we iterate over the breakpointsAliases which has
    // a known order rather than the style prop's keys which have an unknown
    // order.
    for (let breakpointAlias of breakpointsAliases) {
      if (typeof responsiveValues[breakpointAlias] !== 'undefined') {
        cssVar = `var(--pc-box-${cssProp}-${breakpointAlias}, ${cssVar})`;
      }
    }

    return {
      ...acc,
      ...cssCustomProperties,
      [key]: cssVar,
    };
  }, {});
}

type PolymorphicCube = Polymorphic.ForwardRefComponent<any, CubeProps>;

export const Cube = forwardRef(function Cube(
  {as: Tag = 'div', children, ...styleProps},
  forwardedRef,
) {
  const styles = convertStylePropsToCSSProperties(styleProps);
  return (
    <Tag ref={forwardedRef} style={styles} className={style.Box}>
      {children}
    </Tag>
  );
}) as PolymorphicCube;
