import style from './style.module.scss';
import React, {forwardRef} from 'react';
import invariant from 'tiny-invariant';
import {breakpointsAliases} from '@shopify/polaris-tokens';
import type * as Polymorphic from '@radix-ui/react-polymorphic';
import type {
  Entries,
  LiteralToPrimitive,
  OmitIndexSignature,
  Simplify,
} from 'type-fest';
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
  stylePropAliasNames as allAliases,
  stylePropTokenGroupMap,
} from './generated-data';

type CubeProps = React.PropsWithChildren<ResponsiveStyleProps>;

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

function resolveAliasFallbacks(
  styleProps: ResponsiveStyleProps,
): ResponsiveStyleProps {
  const stylePropsWithResolvedAliases: ResponsiveStyleProps = {...styleProps};

  (
    Object.entries(stylePropAliasFallbacks) as Entries<
      Required<typeof stylePropAliasFallbacks>
    >
  ).forEach(([styleProp, aliases]) => {
    for (let aliasStyleProp of aliases) {
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
  for (let alias of allAliases) {
    delete stylePropsWithResolvedAliases[alias];
  }

  return stylePropsWithResolvedAliases;
}

/*
 * NOTES:
 * - Works because we do mobile first with (min-width) queries
 * - The final value in the var fallbacks is always the `xs` size
 * - `xs` default value is `unset`
 * - No special cases needed for 'inherit' values (color et al) because the
 *   default of `xs = unset` applied directly to the property means the browser
 *   can decide if it's inherit or not.
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
function convertStylePropsToCSSProperties(
  styleProps: ResponsiveStyleProps,
  defaults: ResponsiveStyleProps,
) {
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
    ...defaults,
    ...longhandStyleProps,
  };

  // Defaults may have contained aliases, so we have to resolve those again.
  longhandStyleProps = resolveAliasFallbacks(longhandStyleProps);

  // Now that we have a complete object with all fallbacks and defaults applied,
  // we can convert it to a style object
  return (
    Object.entries(longhandStyleProps) as Entries<typeof longhandStyleProps>
  ).reduce((acc, [key, stylePropValue]) => {
    // Always work with the object syntax to reduce conditionals below
    let responsiveValues = coerceToObjectSyntax(stylePropValue);

    // Skip undefined values (can happen when explicit 'undefined' is passed in,
    // or from resolving aliases above)
    responsiveValues = filterObject(
      responsiveValues,
      (value) => typeof value !== 'undefined',
    );

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
    if (Object.hasOwn(stylePropTokenGroupMap, key)) {
      responsiveValues = mapObjectValues(responsiveValues, (value) =>
        createPolarisCSSVar(
          stylePropTokenGroupMap[key as keyof typeof stylePropTokenGroupMap],
          value,
        ),
      );
    }

    // Now we begin converting the style props into CSS style values
    // Special case: Only a single value set and it's for the 'xs' breakpoint.
    // Just set the CSS property directly as there's no need for
    // responsiveness.
    if (
      numberOfKeysWithValues === 1 &&
      typeof responsiveValues['xs'] !== 'undefined'
    ) {
      return {
        ...acc,
        [key]: responsiveValues['xs'],
      };
    }

    // The final fallback value (mobile first) is handled slighly diff.
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
        [`--pc-box-${key}-${breakpointAlias}`]: `var(--_p-media-${breakpointAlias}) ${value}`,
      }),
      {},
    );

    /*
     const properyValue = display: var(--pc-box-display-xl, var(--pc-box-display-sm, unset));
      */

    let cssVar: LiteralToPrimitive<typeof xsValue> = xsValue;
    // Nest the fallbacks from smallest on the inside to largest on the outside.
    // Order is important, so we iterate over the breakpointsAliases which has
    // a known order rather than the style prop's keys which have an unknown
    // order.
    for (let breakpointAlias of breakpointsAliases) {
      if (typeof responsiveValues[breakpointAlias] !== 'undefined') {
        cssVar = `var(--pc-box-${key}-${breakpointAlias}, ${cssVar})`;
      }
    }

    return {
      ...acc,
      ...cssCustomProperties,
      [key]: cssVar,
    };
  }, {});
}

// Ensure no index signatures are accidentally introduced into the props list by
// omitting `[x: string]: unknown` keys (but keep literal keys `foo: string`,
// etc).
// Polymorphic.ForwardRefComponent suffers from this occasionally.
type StrictProps<F> = F extends (props: infer Props) => infer Return
  ? (props: OmitIndexSignature<Props>) => Return
  : unknown;

// Flatten the props object for better IDE integration
type SimplifyProps<F> = F extends (props: infer Props) => infer Return
  ? (props: Simplify<Props>) => Return
  : unknown;

type PolymorphicCube = SimplifyProps<
  StrictProps<Polymorphic.ForwardRefComponent<any, CubeProps>>
>;

const stylePropDefaults: ResponsiveStyleProps = {
  borderStyle: 'solid',
  borderWidth: '0',
};

/**
The lowest level Polaris primitive from which everything in the system is built.

@example
```
// Standard CSS properties
<Cube display="flex" />

// Will pass through directly to the underlaying element
<div style={`display: flex`} />
```

@example
```
// Tokenized CSS properties
<Cube paddingInlineStart="400" />

// Converted to Polaris tokens then passed to the underlaying element
<div style={`padding-inline-start: var(--p-space-400)`} />
```

@example
```
// Alias properties
<Cube padding="400" />

// Expanded to constituent properties and converted to Polaris tokens then pased
// to the underlaying element
<div style={`
  padding-inline-start: var(--p-space-400);
  padding-inline-end:   var(--p-space-400);
  padding-block-start:  var(--p-space-400);
  padding-block-end:    var(--p-space-400);
`} />
```

@example
```
// All standard CSS properties, tokenized properties, and aliases can accept a
// reponsive set of values
<Cube
  display={{
    sm: 'grid',
    xl: 'flex',
  }}
  paddingInline={{
    xs: '200',
    lg: '400',
  }}
/>

// Aliases are expanded, tokenized values are converted to Polaris tokens, then
// converted to responsive CSS variables and passed to the underlaying element
<div style={`
  --pc-box-display-sm: var(--_p-media-sm) grid;
  --pc-box-display-xl: var(--_p-media-xl) flex;
  display: var(--pc-box-display-xl, var(--pc-box-display-sm, unset));

  --pc-box-padding-inline-start-xs: var(--_p-media-xs) var(--p-space-200);
  --pc-box-padding-inline-start-lg: var(--_p-media-lg) var(--p-space-400);
  padding-inline-start: var(--pc-box-padding-inline-start-lg, var(--pc-box-padding-inline-start-xs, unset));

  --pc-box-padding-inline-end-xs: var(--_p-media-xs) var(--p-space-200);
  --pc-box-padding-inline-end-lg: var(--_p-media-lg) var(--p-space-400);
  padding-inline-end: var(--pc-box-padding-inline-end-lg, var(--pc-box-padding-inline-end-xs, unset));
`} />
```

@example
```
// Order doesn't matter
<Cube paddingInlineStart="200" padding="400" paddingBlock="600" />

// Most specific always wins (`paddingInlineStart` then `paddingBlock` then
// `padding`)
<div style={`
  padding-inline-start: var(--p-space-200);
  padding-inline-end:   var(--p-space-400);
  padding-block-start:  var(--p-space-600);
  padding-block-end:    var(--p-space-600);
`} />
```
*/
export const Cube = forwardRef(function Cube(
  {as: Tag = 'div', children, ...styleProps},
  forwardedRef,
) {
  const styles = convertStylePropsToCSSProperties(
    styleProps,
    stylePropDefaults,
  );

  return (
    <Tag ref={forwardedRef} style={styles} className={style.Box}>
      {children}
    </Tag>
  );
}) as PolymorphicCube;
