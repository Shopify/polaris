/* THIS FILE IS AUTO GENERATED, DO NOT TOUCH */
import type {StandardLonghandProperties, Globals} from 'csstype';
import type {TokenizedStyleProps} from '@shopify/polaris-tokens';
import type {OverrideProperties, Simplify}  from 'type-fest';

import type {ResponsiveProp} from '../../utilities/css';

/**
 * Pick only the keys in `PickFrom` which are also in `IntersectWith`.
 */
type PickIntersection<PickFrom, IntersectWith> = Pick<
  PickFrom,
  keyof IntersectWith & keyof PickFrom
>;

// Force Typescript to flatten out a union type to its concrete values
type WrapInObject<T> = T extends unknown ? { key: T } : never;
type Unwrap<T> = T extends { key: unknown } ? T["key"] : never;

/**
 * The subset of all CSS that we support in Polaris (does not include aliases).
 */
type SupportedCSSStyleProps = Omit<
  // Why Longhand properties and not ALL properties?
  // Shorthand properties need to come before longhand properties so
  // the most specific (longhand) applies based on CSS order.
  // For example, `flex-flow` is a shorthand of `<flex-direction> <flex-wrap>`,
  // and so must come before both of those.
  //
  // Challenges with supporting shorthand properties:
  // a. Cannot use alphabetical sorting (`flex-direction` would end up before
  // `flex-flow` which is invalid).
  // b. Cannot use `property.logicalProperyGroup` from `@webref/css` as that's
  // not reliable (doesn't even exist for the `flex` family of properties).
  // c. Cannot rely on the order of properties in an @webref/css specification
  // containing both long and shorthand variants since later "Delta" specs might
  // introduce new shorthands (and so would come after the longhand when
  // iterating and therefore are invalid).
  // d. mdn data appears to have an incomplete list of shorthand properties.
  //
  // Possible solutions:
  // 1. Use data like { 'flex-flow': ['flex-direction', 'flex-wrap'] } to sort
  //    longhands after shorthands
  // 2. Rely on csstype to filter out all the shorthand properties completely.
  //
  // We're chosing solution #2 here; filtering out shorthand CSS Properties.
  // Note that in a later step where we create "aliases" to enable a builder to
  // pass a single value which acts as a fallback for the props specified as
  // fallbacks. Some of these aliases may have identical names to the shorthand
  // properties, but shouldn't be confused as being the same.
  StandardLonghandProperties,
  DisallowedStandardLonghandProperties
>;

/**
 * Some of our supported CSS properties must have a value from
 * `@shopify/polaris-tokens`, so we override those properties here
 *
 * @example
 * `padding-inline-start` can only accept the `space-*` tokens.
 */
type LonghandStyleProps = OverrideProperties<
  SupportedCSSStyleProps,
  // `@shopify/polaris-tokens` may type more CSS properties than we want to
  // support here, so ensure we're only picking the ones we explicityly support
  PickIntersection<TokenizedStyleProps, SupportedCSSStyleProps>
>;

type StyleProps = LonghandStyleProps & StylePropAliases;

/**
 * A combination of raw CSS style props, tokenized style props (derived from
 * `@shopify/polaris-tokens`), and helpful aliases for frequently used props.
 */
export type ResponsiveStyleProps = {
  [K in keyof StyleProps]?: ResponsiveProp<
    // Excluding globally disallowed values as the last thing we do ensures none
    // slip through the cracks in the above type definitions.
    Unwrap<WrapInObject<Exclude<StyleProps[K], (typeof disallowedCSSPropertyValues)[number]>>>
  >;
};

/**
 * A combination of raw CSS style props, tokenized style props (derived from
 * `@shopify/polaris-tokens`), helpful aliases for frequently used props, and
* the modifiers _hover and _visited.
 */
export type ResponsiveStylePropsWithModifiers = Simplify<
  ResponsiveStyleProps & {
    [K in typeof modifiers[number]]?: ResponsiveStyleProps;
  }
>;

/**
* Polaris specifies some aliases which are used as fallback values when an
* explicit style prop isn't set. Aliases may themselves fallback to other
* aliases. Some aliases may be tokenized values or CSS values, but never both.
*
 * @example
 * `justify` is an alias to `justifyItems` when `justifyItems` isn't set.
*
* <Box justify="center" />
* =>
* style={{ justifyItems: 'center' }}
*
* <Box justifyItems="left" justify="center" />
* =>
* style={{ justifyItems: 'left' }}
*
* @example
* `paddingInline` is an alias to `paddingInlineStart` and
* `paddingInlineEnd` when they aren't set.
*
* <Box paddingInline="space-400" />
* =>
* style={{
*   paddingInlineStart: '400',
*   paddingInlineEnd: '400',
* }}
*
* <Box paddingInline="space-400" paddingInlineEnd="space-600" />
* =>
* style={{
*   paddingInlineStart: '400',
*   paddingInlineEnd: '600',
* }}
*
* @example
* `padding` is an alias to `paddingInline` and `paddingBlock` which themselves
* are aliases to `paddingInlineStart`, `paddingInlineEnd` and
* `paddingBlockStart`, `paddingBlockEnd` respectively.
*
* <Box padding="space-400" />
* => style={{
*   paddingInlineStart: '400',
*   paddingInlineEnd: '400',
*   paddingBlockStart: '400',
*   paddingBlockEnd: '400',
* }}
*
* <Box paddingBlock="space-800" padding="space-400" paddingInlineEnd="space-600" />
* => style={{
*   paddingInlineStart: '400',
*   paddingInlineEnd: '600',
*   paddingBlockStart: '800',
*   paddingBlockEnd: '800',
* }}
*/
interface StylePropAliases {
  /**
   * Alias for setting `rowGap` and `columnGap`:
   *
   * ```
   * rowGap = props.rowGap ?? props.gap;
   * columnGap = props.columnGap ?? props.gap;
   * ```
   *
   * @see {@link LonghandStyleProps.rowGap}
   * @see {@link LonghandStyleProps.columnGap}
   */
  gap?: LonghandStyleProps['rowGap'];

  /**
   * Alias for setting `paddingInlineStart`:
   *
   * ```
   * paddingInlineStart = props.paddingInlineStart ?? props.paddingLeft ?? props.paddingInline ?? props.padding;
   * ```
   *
   * @see {@link LonghandStyleProps.paddingInlineStart}
   */
  paddingLeft?: LonghandStyleProps['paddingInlineStart'];

  /**
   * Alias for setting `paddingInlineStart` and `paddingInlineEnd`:
   *
   * ```
   * paddingInlineStart = props.paddingInlineStart ?? props.paddingLeft ?? props.paddingInline ?? props.padding;
   * paddingInlineEnd = props.paddingInlineEnd ?? props.paddingRight ?? props.paddingInline ?? props.padding;
   * ```
   *
   * @see {@link LonghandStyleProps.paddingInlineStart}
   * @see {@link LonghandStyleProps.paddingInlineEnd}
   */
  paddingInline?: LonghandStyleProps['paddingInlineStart'];

  /**
   * Alias for setting `paddingInlineStart`, `paddingInlineEnd`, `paddingBlockStart` and `paddingBlockEnd`:
   *
   * ```
   * paddingInlineStart = props.paddingInlineStart ?? props.paddingLeft ?? props.paddingInline ?? props.padding;
   * paddingInlineEnd = props.paddingInlineEnd ?? props.paddingRight ?? props.paddingInline ?? props.padding;
   * paddingBlockStart = props.paddingBlockStart ?? props.paddingTop ?? props.paddingBlock ?? props.padding;
   * paddingBlockEnd = props.paddingBlockEnd ?? props.paddingBottom ?? props.paddingBlock ?? props.padding;
   * ```
   *
   * @see {@link LonghandStyleProps.paddingInlineStart}
   * @see {@link LonghandStyleProps.paddingInlineEnd}
   * @see {@link LonghandStyleProps.paddingBlockStart}
   * @see {@link LonghandStyleProps.paddingBlockEnd}
   */
  padding?: LonghandStyleProps['paddingInlineStart'];

  /**
   * Alias for setting `paddingInlineEnd`:
   *
   * ```
   * paddingInlineEnd = props.paddingInlineEnd ?? props.paddingRight ?? props.paddingInline ?? props.padding;
   * ```
   *
   * @see {@link LonghandStyleProps.paddingInlineEnd}
   */
  paddingRight?: LonghandStyleProps['paddingInlineEnd'];

  /**
   * Alias for setting `paddingBlockStart`:
   *
   * ```
   * paddingBlockStart = props.paddingBlockStart ?? props.paddingTop ?? props.paddingBlock ?? props.padding;
   * ```
   *
   * @see {@link LonghandStyleProps.paddingBlockStart}
   */
  paddingTop?: LonghandStyleProps['paddingBlockStart'];

  /**
   * Alias for setting `paddingBlockStart` and `paddingBlockEnd`:
   *
   * ```
   * paddingBlockStart = props.paddingBlockStart ?? props.paddingTop ?? props.paddingBlock ?? props.padding;
   * paddingBlockEnd = props.paddingBlockEnd ?? props.paddingBottom ?? props.paddingBlock ?? props.padding;
   * ```
   *
   * @see {@link LonghandStyleProps.paddingBlockStart}
   * @see {@link LonghandStyleProps.paddingBlockEnd}
   */
  paddingBlock?: LonghandStyleProps['paddingBlockStart'];

  /**
   * Alias for setting `paddingBlockEnd`:
   *
   * ```
   * paddingBlockEnd = props.paddingBlockEnd ?? props.paddingBottom ?? props.paddingBlock ?? props.padding;
   * ```
   *
   * @see {@link LonghandStyleProps.paddingBlockEnd}
   */
  paddingBottom?: LonghandStyleProps['paddingBlockEnd'];

  /**
   * Alias for setting `marginInlineStart`:
   *
   * ```
   * marginInlineStart = props.marginInlineStart ?? props.marginLeft ?? props.marginInline ?? props.margin;
   * ```
   *
   * @see {@link LonghandStyleProps.marginInlineStart}
   */
  marginLeft?: LonghandStyleProps['marginInlineStart'];

  /**
   * Alias for setting `marginInlineStart` and `marginInlineEnd`:
   *
   * ```
   * marginInlineStart = props.marginInlineStart ?? props.marginLeft ?? props.marginInline ?? props.margin;
   * marginInlineEnd = props.marginInlineEnd ?? props.marginRight ?? props.marginInline ?? props.margin;
   * ```
   *
   * @see {@link LonghandStyleProps.marginInlineStart}
   * @see {@link LonghandStyleProps.marginInlineEnd}
   */
  marginInline?: LonghandStyleProps['marginInlineStart'];

  /**
   * Alias for setting `marginInlineStart`, `marginInlineEnd`, `marginBlockStart` and `marginBlockEnd`:
   *
   * ```
   * marginInlineStart = props.marginInlineStart ?? props.marginLeft ?? props.marginInline ?? props.margin;
   * marginInlineEnd = props.marginInlineEnd ?? props.marginRight ?? props.marginInline ?? props.margin;
   * marginBlockStart = props.marginBlockStart ?? props.marginTop ?? props.marginBlock ?? props.margin;
   * marginBlockEnd = props.marginBlockEnd ?? props.marginBottom ?? props.marginBlock ?? props.margin;
   * ```
   *
   * @see {@link LonghandStyleProps.marginInlineStart}
   * @see {@link LonghandStyleProps.marginInlineEnd}
   * @see {@link LonghandStyleProps.marginBlockStart}
   * @see {@link LonghandStyleProps.marginBlockEnd}
   */
  margin?: LonghandStyleProps['marginInlineStart'];

  /**
   * Alias for setting `marginInlineEnd`:
   *
   * ```
   * marginInlineEnd = props.marginInlineEnd ?? props.marginRight ?? props.marginInline ?? props.margin;
   * ```
   *
   * @see {@link LonghandStyleProps.marginInlineEnd}
   */
  marginRight?: LonghandStyleProps['marginInlineEnd'];

  /**
   * Alias for setting `marginBlockStart`:
   *
   * ```
   * marginBlockStart = props.marginBlockStart ?? props.marginTop ?? props.marginBlock ?? props.margin;
   * ```
   *
   * @see {@link LonghandStyleProps.marginBlockStart}
   */
  marginTop?: LonghandStyleProps['marginBlockStart'];

  /**
   * Alias for setting `marginBlockStart` and `marginBlockEnd`:
   *
   * ```
   * marginBlockStart = props.marginBlockStart ?? props.marginTop ?? props.marginBlock ?? props.margin;
   * marginBlockEnd = props.marginBlockEnd ?? props.marginBottom ?? props.marginBlock ?? props.margin;
   * ```
   *
   * @see {@link LonghandStyleProps.marginBlockStart}
   * @see {@link LonghandStyleProps.marginBlockEnd}
   */
  marginBlock?: LonghandStyleProps['marginBlockStart'];

  /**
   * Alias for setting `marginBlockEnd`:
   *
   * ```
   * marginBlockEnd = props.marginBlockEnd ?? props.marginBottom ?? props.marginBlock ?? props.margin;
   * ```
   *
   * @see {@link LonghandStyleProps.marginBlockEnd}
   */
  marginBottom?: LonghandStyleProps['marginBlockEnd'];

  /**
   * Alias for setting `inlineSize`:
   *
   * ```
   * inlineSize = props.inlineSize ?? props.width ?? props.size;
   * ```
   *
   * @see {@link LonghandStyleProps.inlineSize}
   */
  width?: LonghandStyleProps['inlineSize'];

  /**
   * Alias for setting `inlineSize` and `blockSize`:
   *
   * ```
   * inlineSize = props.inlineSize ?? props.width ?? props.size;
   * blockSize = props.blockSize ?? props.height ?? props.size;
   * ```
   *
   * @see {@link LonghandStyleProps.inlineSize}
   * @see {@link LonghandStyleProps.blockSize}
   */
  size?: Exclude<
    LonghandStyleProps['inlineSize'],
    '-webkit-fill-available'
  >;

  /**
   * Alias for setting `blockSize`:
   *
   * ```
   * blockSize = props.blockSize ?? props.height ?? props.size;
   * ```
   *
   * @see {@link LonghandStyleProps.blockSize}
   */
  height?: LonghandStyleProps['blockSize'];

  /**
   * Alias for setting `minInlineSize`:
   *
   * ```
   * minInlineSize = props.minInlineSize ?? props.minWidth ?? props.minSize;
   * ```
   *
   * @see {@link LonghandStyleProps.minInlineSize}
   */
  minWidth?: LonghandStyleProps['minInlineSize'];

  /**
   * Alias for setting `minInlineSize` and `minBlockSize`:
   *
   * ```
   * minInlineSize = props.minInlineSize ?? props.minWidth ?? props.minSize;
   * minBlockSize = props.minBlockSize ?? props.minHeight ?? props.minSize;
   * ```
   *
   * @see {@link LonghandStyleProps.minInlineSize}
   * @see {@link LonghandStyleProps.minBlockSize}
   */
  minSize?: Exclude<
    LonghandStyleProps['minInlineSize'],
    '-moz-fit-content'
  >;

  /**
   * Alias for setting `minBlockSize`:
   *
   * ```
   * minBlockSize = props.minBlockSize ?? props.minHeight ?? props.minSize;
   * ```
   *
   * @see {@link LonghandStyleProps.minBlockSize}
   */
  minHeight?: LonghandStyleProps['minBlockSize'];

  /**
   * Alias for setting `maxInlineSize`:
   *
   * ```
   * maxInlineSize = props.maxInlineSize ?? props.maxWidth ?? props.maxSize;
   * ```
   *
   * @see {@link LonghandStyleProps.maxInlineSize}
   */
  maxWidth?: LonghandStyleProps['maxInlineSize'];

  /**
   * Alias for setting `maxInlineSize` and `maxBlockSize`:
   *
   * ```
   * maxInlineSize = props.maxInlineSize ?? props.maxWidth ?? props.maxSize;
   * maxBlockSize = props.maxBlockSize ?? props.maxHeight ?? props.maxSize;
   * ```
   *
   * @see {@link LonghandStyleProps.maxInlineSize}
   * @see {@link LonghandStyleProps.maxBlockSize}
   */
  maxSize?: Exclude<
    LonghandStyleProps['maxInlineSize'],
    '-moz-fit-content'
  >;

  /**
   * Alias for setting `maxBlockSize`:
   *
   * ```
   * maxBlockSize = props.maxBlockSize ?? props.maxHeight ?? props.maxSize;
   * ```
   *
   * @see {@link LonghandStyleProps.maxBlockSize}
   */
  maxHeight?: LonghandStyleProps['maxBlockSize'];

  /**
   * Alias for setting `containIntrinsicInlineSize`:
   *
   * ```
   * containIntrinsicInlineSize = props.containIntrinsicInlineSize ?? props.containIntrinsicWidth ?? props.containIntrinsicSize;
   * ```
   *
   * @see {@link LonghandStyleProps.containIntrinsicInlineSize}
   */
  containIntrinsicWidth?: LonghandStyleProps['containIntrinsicInlineSize'];

  /**
   * Alias for setting `containIntrinsicInlineSize` and `containIntrinsicBlockSize`:
   *
   * ```
   * containIntrinsicInlineSize = props.containIntrinsicInlineSize ?? props.containIntrinsicWidth ?? props.containIntrinsicSize;
   * containIntrinsicBlockSize = props.containIntrinsicBlockSize ?? props.containIntrinsicHeight ?? props.containIntrinsicSize;
   * ```
   *
   * @see {@link LonghandStyleProps.containIntrinsicInlineSize}
   * @see {@link LonghandStyleProps.containIntrinsicBlockSize}
   */
  containIntrinsicSize?: LonghandStyleProps['containIntrinsicInlineSize'];

  /**
   * Alias for setting `containIntrinsicBlockSize`:
   *
   * ```
   * containIntrinsicBlockSize = props.containIntrinsicBlockSize ?? props.containIntrinsicHeight ?? props.containIntrinsicSize;
   * ```
   *
   * @see {@link LonghandStyleProps.containIntrinsicBlockSize}
   */
  containIntrinsicHeight?: LonghandStyleProps['containIntrinsicBlockSize'];

  /**
   * Alias for setting `overflowX`:
   *
   * ```
   * overflowX = props.overflowX ?? props.overflowInline ?? props.overflow;
   * ```
   *
   * @see {@link LonghandStyleProps.overflowX}
   */
  overflowInline?: LonghandStyleProps['overflowX'];

  /**
   * Alias for setting `overflowX` and `overflowY`:
   *
   * ```
   * overflowX = props.overflowX ?? props.overflowInline ?? props.overflow;
   * overflowY = props.overflowY ?? props.overflowBlock ?? props.overflow;
   * ```
   *
   * @see {@link LonghandStyleProps.overflowX}
   * @see {@link LonghandStyleProps.overflowY}
   */
  overflow?: LonghandStyleProps['overflowX'];

  /**
   * Alias for setting `overflowY`:
   *
   * ```
   * overflowY = props.overflowY ?? props.overflowBlock ?? props.overflow;
   * ```
   *
   * @see {@link LonghandStyleProps.overflowY}
   */
  overflowBlock?: LonghandStyleProps['overflowY'];

  /**
   * Alias for setting `overscrollBehaviorInline`:
   *
   * ```
   * overscrollBehaviorInline = props.overscrollBehaviorInline ?? props.overscrollBehaviorX ?? props.overscrollBehavior;
   * ```
   *
   * @see {@link LonghandStyleProps.overscrollBehaviorInline}
   */
  overscrollBehaviorX?: LonghandStyleProps['overscrollBehaviorInline'];

  /**
   * Alias for setting `overscrollBehaviorInline` and `overscrollBehaviorBlock`:
   *
   * ```
   * overscrollBehaviorInline = props.overscrollBehaviorInline ?? props.overscrollBehaviorX ?? props.overscrollBehavior;
   * overscrollBehaviorBlock = props.overscrollBehaviorBlock ?? props.overscrollBehaviorY ?? props.overscrollBehavior;
   * ```
   *
   * @see {@link LonghandStyleProps.overscrollBehaviorInline}
   * @see {@link LonghandStyleProps.overscrollBehaviorBlock}
   */
  overscrollBehavior?: LonghandStyleProps['overscrollBehaviorInline'];

  /**
   * Alias for setting `overscrollBehaviorBlock`:
   *
   * ```
   * overscrollBehaviorBlock = props.overscrollBehaviorBlock ?? props.overscrollBehaviorY ?? props.overscrollBehavior;
   * ```
   *
   * @see {@link LonghandStyleProps.overscrollBehaviorBlock}
   */
  overscrollBehaviorY?: LonghandStyleProps['overscrollBehaviorBlock'];

  /**
   * Alias for setting `backgroundColor`:
   *
   * ```
   * backgroundColor = props.backgroundColor ?? props.background;
   * ```
   *
   * @see {@link LonghandStyleProps.backgroundColor}
   */
  background?: LonghandStyleProps['backgroundColor'];

  /**
   * Alias for setting `backgroundPositionX` and `backgroundPositionY`:
   *
   * ```
   * backgroundPositionX = props.backgroundPositionX ?? props.backgroundPosition;
   * backgroundPositionY = props.backgroundPositionY ?? props.backgroundPosition;
   * ```
   *
   * @see {@link LonghandStyleProps.backgroundPositionX}
   * @see {@link LonghandStyleProps.backgroundPositionY}
   */
  backgroundPosition?: Exclude<
    LonghandStyleProps['backgroundPositionX'],
    'left'
    | 'right'
    | 'x-end'
    | 'x-start'
  >;

  /**
   * Alias for setting `borderStartStartRadius`:
   *
   * ```
   * borderStartStartRadius = props.borderStartStartRadius ?? props.borderTopLeftRadius ?? props.borderRadius;
   * ```
   *
   * @see {@link LonghandStyleProps.borderStartStartRadius}
   */
  borderTopLeftRadius?: LonghandStyleProps['borderStartStartRadius'];

  /**
   * Alias for setting `borderStartStartRadius`, `borderStartEndRadius`, `borderEndStartRadius` and `borderEndEndRadius`:
   *
   * ```
   * borderStartStartRadius = props.borderStartStartRadius ?? props.borderTopLeftRadius ?? props.borderRadius;
   * borderStartEndRadius = props.borderStartEndRadius ?? props.borderTopRightRadius ?? props.borderRadius;
   * borderEndStartRadius = props.borderEndStartRadius ?? props.borderBottomLeftRadius ?? props.borderRadius;
   * borderEndEndRadius = props.borderEndEndRadius ?? props.borderBottomRightRadius ?? props.borderRadius;
   * ```
   *
   * @see {@link LonghandStyleProps.borderStartStartRadius}
   * @see {@link LonghandStyleProps.borderStartEndRadius}
   * @see {@link LonghandStyleProps.borderEndStartRadius}
   * @see {@link LonghandStyleProps.borderEndEndRadius}
   */
  borderRadius?: LonghandStyleProps['borderStartStartRadius'];

  /**
   * Alias for setting `borderStartEndRadius`:
   *
   * ```
   * borderStartEndRadius = props.borderStartEndRadius ?? props.borderTopRightRadius ?? props.borderRadius;
   * ```
   *
   * @see {@link LonghandStyleProps.borderStartEndRadius}
   */
  borderTopRightRadius?: LonghandStyleProps['borderStartEndRadius'];

  /**
   * Alias for setting `borderEndStartRadius`:
   *
   * ```
   * borderEndStartRadius = props.borderEndStartRadius ?? props.borderBottomLeftRadius ?? props.borderRadius;
   * ```
   *
   * @see {@link LonghandStyleProps.borderEndStartRadius}
   */
  borderBottomLeftRadius?: LonghandStyleProps['borderEndStartRadius'];

  /**
   * Alias for setting `borderEndEndRadius`:
   *
   * ```
   * borderEndEndRadius = props.borderEndEndRadius ?? props.borderBottomRightRadius ?? props.borderRadius;
   * ```
   *
   * @see {@link LonghandStyleProps.borderEndEndRadius}
   */
  borderBottomRightRadius?: LonghandStyleProps['borderEndEndRadius'];

  /**
   * Alias for setting `borderInlineStartColor`:
   *
   * ```
   * borderInlineStartColor = props.borderInlineStartColor ?? props.borderLeftColor ?? props.borderInlineColor ?? props.borderColor;
   * ```
   *
   * @see {@link LonghandStyleProps.borderInlineStartColor}
   */
  borderLeftColor?: LonghandStyleProps['borderInlineStartColor'];

  /**
   * Alias for setting `borderInlineStartColor` and `borderInlineEndColor`:
   *
   * ```
   * borderInlineStartColor = props.borderInlineStartColor ?? props.borderLeftColor ?? props.borderInlineColor ?? props.borderColor;
   * borderInlineEndColor = props.borderInlineEndColor ?? props.borderRightColor ?? props.borderInlineColor ?? props.borderColor;
   * ```
   *
   * @see {@link LonghandStyleProps.borderInlineStartColor}
   * @see {@link LonghandStyleProps.borderInlineEndColor}
   */
  borderInlineColor?: LonghandStyleProps['borderInlineStartColor'];

  /**
   * Alias for setting `borderInlineStartColor`, `borderInlineEndColor`, `borderBlockStartColor` and `borderBlockEndColor`:
   *
   * ```
   * borderInlineStartColor = props.borderInlineStartColor ?? props.borderLeftColor ?? props.borderInlineColor ?? props.borderColor;
   * borderInlineEndColor = props.borderInlineEndColor ?? props.borderRightColor ?? props.borderInlineColor ?? props.borderColor;
   * borderBlockStartColor = props.borderBlockStartColor ?? props.borderTopColor ?? props.borderBlockColor ?? props.borderColor;
   * borderBlockEndColor = props.borderBlockEndColor ?? props.borderBottomColor ?? props.borderBlockColor ?? props.borderColor;
   * ```
   *
   * @see {@link LonghandStyleProps.borderInlineStartColor}
   * @see {@link LonghandStyleProps.borderInlineEndColor}
   * @see {@link LonghandStyleProps.borderBlockStartColor}
   * @see {@link LonghandStyleProps.borderBlockEndColor}
   */
  borderColor?: LonghandStyleProps['borderInlineStartColor'];

  /**
   * Alias for setting `borderInlineEndColor`:
   *
   * ```
   * borderInlineEndColor = props.borderInlineEndColor ?? props.borderRightColor ?? props.borderInlineColor ?? props.borderColor;
   * ```
   *
   * @see {@link LonghandStyleProps.borderInlineEndColor}
   */
  borderRightColor?: LonghandStyleProps['borderInlineEndColor'];

  /**
   * Alias for setting `borderBlockStartColor`:
   *
   * ```
   * borderBlockStartColor = props.borderBlockStartColor ?? props.borderTopColor ?? props.borderBlockColor ?? props.borderColor;
   * ```
   *
   * @see {@link LonghandStyleProps.borderBlockStartColor}
   */
  borderTopColor?: LonghandStyleProps['borderBlockStartColor'];

  /**
   * Alias for setting `borderBlockStartColor` and `borderBlockEndColor`:
   *
   * ```
   * borderBlockStartColor = props.borderBlockStartColor ?? props.borderTopColor ?? props.borderBlockColor ?? props.borderColor;
   * borderBlockEndColor = props.borderBlockEndColor ?? props.borderBottomColor ?? props.borderBlockColor ?? props.borderColor;
   * ```
   *
   * @see {@link LonghandStyleProps.borderBlockStartColor}
   * @see {@link LonghandStyleProps.borderBlockEndColor}
   */
  borderBlockColor?: LonghandStyleProps['borderBlockStartColor'];

  /**
   * Alias for setting `borderBlockEndColor`:
   *
   * ```
   * borderBlockEndColor = props.borderBlockEndColor ?? props.borderBottomColor ?? props.borderBlockColor ?? props.borderColor;
   * ```
   *
   * @see {@link LonghandStyleProps.borderBlockEndColor}
   */
  borderBottomColor?: LonghandStyleProps['borderBlockEndColor'];

  /**
   * Alias for setting `borderInlineStartStyle`:
   *
   * ```
   * borderInlineStartStyle = props.borderInlineStartStyle ?? props.borderLeftStyle ?? props.borderInlineStyle ?? props.borderStyle;
   * ```
   *
   * @see {@link LonghandStyleProps.borderInlineStartStyle}
   */
  borderLeftStyle?: LonghandStyleProps['borderInlineStartStyle'];

  /**
   * Alias for setting `borderInlineStartStyle` and `borderInlineEndStyle`:
   *
   * ```
   * borderInlineStartStyle = props.borderInlineStartStyle ?? props.borderLeftStyle ?? props.borderInlineStyle ?? props.borderStyle;
   * borderInlineEndStyle = props.borderInlineEndStyle ?? props.borderRightStyle ?? props.borderInlineStyle ?? props.borderStyle;
   * ```
   *
   * @see {@link LonghandStyleProps.borderInlineStartStyle}
   * @see {@link LonghandStyleProps.borderInlineEndStyle}
   */
  borderInlineStyle?: LonghandStyleProps['borderInlineStartStyle'];

  /**
   * Alias for setting `borderInlineStartStyle`, `borderInlineEndStyle`, `borderBlockStartStyle` and `borderBlockEndStyle`:
   *
   * ```
   * borderInlineStartStyle = props.borderInlineStartStyle ?? props.borderLeftStyle ?? props.borderInlineStyle ?? props.borderStyle;
   * borderInlineEndStyle = props.borderInlineEndStyle ?? props.borderRightStyle ?? props.borderInlineStyle ?? props.borderStyle;
   * borderBlockStartStyle = props.borderBlockStartStyle ?? props.borderTopStyle ?? props.borderBlockStyle ?? props.borderStyle;
   * borderBlockEndStyle = props.borderBlockEndStyle ?? props.borderBottomStyle ?? props.borderBlockStyle ?? props.borderStyle;
   * ```
   *
   * @see {@link LonghandStyleProps.borderInlineStartStyle}
   * @see {@link LonghandStyleProps.borderInlineEndStyle}
   * @see {@link LonghandStyleProps.borderBlockStartStyle}
   * @see {@link LonghandStyleProps.borderBlockEndStyle}
   */
  borderStyle?: LonghandStyleProps['borderInlineStartStyle'];

  /**
   * Alias for setting `borderInlineEndStyle`:
   *
   * ```
   * borderInlineEndStyle = props.borderInlineEndStyle ?? props.borderRightStyle ?? props.borderInlineStyle ?? props.borderStyle;
   * ```
   *
   * @see {@link LonghandStyleProps.borderInlineEndStyle}
   */
  borderRightStyle?: LonghandStyleProps['borderInlineEndStyle'];

  /**
   * Alias for setting `borderBlockStartStyle`:
   *
   * ```
   * borderBlockStartStyle = props.borderBlockStartStyle ?? props.borderTopStyle ?? props.borderBlockStyle ?? props.borderStyle;
   * ```
   *
   * @see {@link LonghandStyleProps.borderBlockStartStyle}
   */
  borderTopStyle?: LonghandStyleProps['borderBlockStartStyle'];

  /**
   * Alias for setting `borderBlockStartStyle` and `borderBlockEndStyle`:
   *
   * ```
   * borderBlockStartStyle = props.borderBlockStartStyle ?? props.borderTopStyle ?? props.borderBlockStyle ?? props.borderStyle;
   * borderBlockEndStyle = props.borderBlockEndStyle ?? props.borderBottomStyle ?? props.borderBlockStyle ?? props.borderStyle;
   * ```
   *
   * @see {@link LonghandStyleProps.borderBlockStartStyle}
   * @see {@link LonghandStyleProps.borderBlockEndStyle}
   */
  borderBlockStyle?: LonghandStyleProps['borderBlockStartStyle'];

  /**
   * Alias for setting `borderBlockEndStyle`:
   *
   * ```
   * borderBlockEndStyle = props.borderBlockEndStyle ?? props.borderBottomStyle ?? props.borderBlockStyle ?? props.borderStyle;
   * ```
   *
   * @see {@link LonghandStyleProps.borderBlockEndStyle}
   */
  borderBottomStyle?: LonghandStyleProps['borderBlockEndStyle'];

  /**
   * Alias for setting `borderInlineStartWidth`:
   *
   * ```
   * borderInlineStartWidth = props.borderInlineStartWidth ?? props.borderLeftWidth ?? props.borderInlineWidth ?? props.borderWidth;
   * ```
   *
   * @see {@link LonghandStyleProps.borderInlineStartWidth}
   */
  borderLeftWidth?: LonghandStyleProps['borderInlineStartWidth'];

  /**
   * Alias for setting `borderInlineStartWidth` and `borderInlineEndWidth`:
   *
   * ```
   * borderInlineStartWidth = props.borderInlineStartWidth ?? props.borderLeftWidth ?? props.borderInlineWidth ?? props.borderWidth;
   * borderInlineEndWidth = props.borderInlineEndWidth ?? props.borderRightWidth ?? props.borderInlineWidth ?? props.borderWidth;
   * ```
   *
   * @see {@link LonghandStyleProps.borderInlineStartWidth}
   * @see {@link LonghandStyleProps.borderInlineEndWidth}
   */
  borderInlineWidth?: LonghandStyleProps['borderInlineStartWidth'];

  /**
   * Alias for setting `borderInlineStartWidth`, `borderInlineEndWidth`, `borderBlockStartWidth` and `borderBlockEndWidth`:
   *
   * ```
   * borderInlineStartWidth = props.borderInlineStartWidth ?? props.borderLeftWidth ?? props.borderInlineWidth ?? props.borderWidth;
   * borderInlineEndWidth = props.borderInlineEndWidth ?? props.borderRightWidth ?? props.borderInlineWidth ?? props.borderWidth;
   * borderBlockStartWidth = props.borderBlockStartWidth ?? props.borderTopWidth ?? props.borderBlockWidth ?? props.borderWidth;
   * borderBlockEndWidth = props.borderBlockEndWidth ?? props.borderBottomWidth ?? props.borderBlockWidth ?? props.borderWidth;
   * ```
   *
   * @see {@link LonghandStyleProps.borderInlineStartWidth}
   * @see {@link LonghandStyleProps.borderInlineEndWidth}
   * @see {@link LonghandStyleProps.borderBlockStartWidth}
   * @see {@link LonghandStyleProps.borderBlockEndWidth}
   */
  borderWidth?: LonghandStyleProps['borderInlineStartWidth'];

  /**
   * Alias for setting `borderInlineEndWidth`:
   *
   * ```
   * borderInlineEndWidth = props.borderInlineEndWidth ?? props.borderRightWidth ?? props.borderInlineWidth ?? props.borderWidth;
   * ```
   *
   * @see {@link LonghandStyleProps.borderInlineEndWidth}
   */
  borderRightWidth?: LonghandStyleProps['borderInlineEndWidth'];

  /**
   * Alias for setting `borderBlockStartWidth`:
   *
   * ```
   * borderBlockStartWidth = props.borderBlockStartWidth ?? props.borderTopWidth ?? props.borderBlockWidth ?? props.borderWidth;
   * ```
   *
   * @see {@link LonghandStyleProps.borderBlockStartWidth}
   */
  borderTopWidth?: LonghandStyleProps['borderBlockStartWidth'];

  /**
   * Alias for setting `borderBlockStartWidth` and `borderBlockEndWidth`:
   *
   * ```
   * borderBlockStartWidth = props.borderBlockStartWidth ?? props.borderTopWidth ?? props.borderBlockWidth ?? props.borderWidth;
   * borderBlockEndWidth = props.borderBlockEndWidth ?? props.borderBottomWidth ?? props.borderBlockWidth ?? props.borderWidth;
   * ```
   *
   * @see {@link LonghandStyleProps.borderBlockStartWidth}
   * @see {@link LonghandStyleProps.borderBlockEndWidth}
   */
  borderBlockWidth?: LonghandStyleProps['borderBlockStartWidth'];

  /**
   * Alias for setting `borderBlockEndWidth`:
   *
   * ```
   * borderBlockEndWidth = props.borderBlockEndWidth ?? props.borderBottomWidth ?? props.borderBlockWidth ?? props.borderWidth;
   * ```
   *
   * @see {@link LonghandStyleProps.borderBlockEndWidth}
   */
  borderBottomWidth?: LonghandStyleProps['borderBlockEndWidth'];

  /**
   * Alias for setting `insetInlineStart`:
   *
   * ```
   * insetInlineStart = props.insetInlineStart ?? props.left ?? props.insetInline ?? props.inset;
   * ```
   *
   * @see {@link LonghandStyleProps.insetInlineStart}
   */
  left?: LonghandStyleProps['insetInlineStart'];

  /**
   * Alias for setting `insetInlineStart` and `insetInlineEnd`:
   *
   * ```
   * insetInlineStart = props.insetInlineStart ?? props.left ?? props.insetInline ?? props.inset;
   * insetInlineEnd = props.insetInlineEnd ?? props.right ?? props.insetInline ?? props.inset;
   * ```
   *
   * @see {@link LonghandStyleProps.insetInlineStart}
   * @see {@link LonghandStyleProps.insetInlineEnd}
   */
  insetInline?: LonghandStyleProps['insetInlineStart'];

  /**
   * Alias for setting `insetInlineStart`, `insetInlineEnd`, `insetBlockStart` and `insetBlockEnd`:
   *
   * ```
   * insetInlineStart = props.insetInlineStart ?? props.left ?? props.insetInline ?? props.inset;
   * insetInlineEnd = props.insetInlineEnd ?? props.right ?? props.insetInline ?? props.inset;
   * insetBlockStart = props.insetBlockStart ?? props.top ?? props.insetBlock ?? props.inset;
   * insetBlockEnd = props.insetBlockEnd ?? props.bottom ?? props.insetBlock ?? props.inset;
   * ```
   *
   * @see {@link LonghandStyleProps.insetInlineStart}
   * @see {@link LonghandStyleProps.insetInlineEnd}
   * @see {@link LonghandStyleProps.insetBlockStart}
   * @see {@link LonghandStyleProps.insetBlockEnd}
   */
  inset?: LonghandStyleProps['insetInlineStart'];

  /**
   * Alias for setting `insetInlineEnd`:
   *
   * ```
   * insetInlineEnd = props.insetInlineEnd ?? props.right ?? props.insetInline ?? props.inset;
   * ```
   *
   * @see {@link LonghandStyleProps.insetInlineEnd}
   */
  right?: LonghandStyleProps['insetInlineEnd'];

  /**
   * Alias for setting `insetBlockStart`:
   *
   * ```
   * insetBlockStart = props.insetBlockStart ?? props.top ?? props.insetBlock ?? props.inset;
   * ```
   *
   * @see {@link LonghandStyleProps.insetBlockStart}
   */
  top?: LonghandStyleProps['insetBlockStart'];

  /**
   * Alias for setting `insetBlockStart` and `insetBlockEnd`:
   *
   * ```
   * insetBlockStart = props.insetBlockStart ?? props.top ?? props.insetBlock ?? props.inset;
   * insetBlockEnd = props.insetBlockEnd ?? props.bottom ?? props.insetBlock ?? props.inset;
   * ```
   *
   * @see {@link LonghandStyleProps.insetBlockStart}
   * @see {@link LonghandStyleProps.insetBlockEnd}
   */
  insetBlock?: LonghandStyleProps['insetBlockStart'];

  /**
   * Alias for setting `insetBlockEnd`:
   *
   * ```
   * insetBlockEnd = props.insetBlockEnd ?? props.bottom ?? props.insetBlock ?? props.inset;
   * ```
   *
   * @see {@link LonghandStyleProps.insetBlockEnd}
   */
  bottom?: LonghandStyleProps['insetBlockEnd'];

  /**
   * Alias for setting `scrollPaddingInlineStart`:
   *
   * ```
   * scrollPaddingInlineStart = props.scrollPaddingInlineStart ?? props.scrollPaddingLeft ?? props.scrollPaddingInline ?? props.scrollPadding;
   * ```
   *
   * @see {@link LonghandStyleProps.scrollPaddingInlineStart}
   */
  scrollPaddingLeft?: LonghandStyleProps['scrollPaddingInlineStart'];

  /**
   * Alias for setting `scrollPaddingInlineStart` and `scrollPaddingInlineEnd`:
   *
   * ```
   * scrollPaddingInlineStart = props.scrollPaddingInlineStart ?? props.scrollPaddingLeft ?? props.scrollPaddingInline ?? props.scrollPadding;
   * scrollPaddingInlineEnd = props.scrollPaddingInlineEnd ?? props.scrollPaddingRight ?? props.scrollPaddingInline ?? props.scrollPadding;
   * ```
   *
   * @see {@link LonghandStyleProps.scrollPaddingInlineStart}
   * @see {@link LonghandStyleProps.scrollPaddingInlineEnd}
   */
  scrollPaddingInline?: LonghandStyleProps['scrollPaddingInlineStart'];

  /**
   * Alias for setting `scrollPaddingInlineStart`, `scrollPaddingInlineEnd`, `scrollPaddingBlockStart` and `scrollPaddingBlockEnd`:
   *
   * ```
   * scrollPaddingInlineStart = props.scrollPaddingInlineStart ?? props.scrollPaddingLeft ?? props.scrollPaddingInline ?? props.scrollPadding;
   * scrollPaddingInlineEnd = props.scrollPaddingInlineEnd ?? props.scrollPaddingRight ?? props.scrollPaddingInline ?? props.scrollPadding;
   * scrollPaddingBlockStart = props.scrollPaddingBlockStart ?? props.scrollPaddingTop ?? props.scrollPaddingBlock ?? props.scrollPadding;
   * scrollPaddingBlockEnd = props.scrollPaddingBlockEnd ?? props.scrollPaddingBottom ?? props.scrollPaddingBlock ?? props.scrollPadding;
   * ```
   *
   * @see {@link LonghandStyleProps.scrollPaddingInlineStart}
   * @see {@link LonghandStyleProps.scrollPaddingInlineEnd}
   * @see {@link LonghandStyleProps.scrollPaddingBlockStart}
   * @see {@link LonghandStyleProps.scrollPaddingBlockEnd}
   */
  scrollPadding?: LonghandStyleProps['scrollPaddingInlineStart'];

  /**
   * Alias for setting `scrollPaddingInlineEnd`:
   *
   * ```
   * scrollPaddingInlineEnd = props.scrollPaddingInlineEnd ?? props.scrollPaddingRight ?? props.scrollPaddingInline ?? props.scrollPadding;
   * ```
   *
   * @see {@link LonghandStyleProps.scrollPaddingInlineEnd}
   */
  scrollPaddingRight?: LonghandStyleProps['scrollPaddingInlineEnd'];

  /**
   * Alias for setting `scrollPaddingBlockStart`:
   *
   * ```
   * scrollPaddingBlockStart = props.scrollPaddingBlockStart ?? props.scrollPaddingTop ?? props.scrollPaddingBlock ?? props.scrollPadding;
   * ```
   *
   * @see {@link LonghandStyleProps.scrollPaddingBlockStart}
   */
  scrollPaddingTop?: LonghandStyleProps['scrollPaddingBlockStart'];

  /**
   * Alias for setting `scrollPaddingBlockStart` and `scrollPaddingBlockEnd`:
   *
   * ```
   * scrollPaddingBlockStart = props.scrollPaddingBlockStart ?? props.scrollPaddingTop ?? props.scrollPaddingBlock ?? props.scrollPadding;
   * scrollPaddingBlockEnd = props.scrollPaddingBlockEnd ?? props.scrollPaddingBottom ?? props.scrollPaddingBlock ?? props.scrollPadding;
   * ```
   *
   * @see {@link LonghandStyleProps.scrollPaddingBlockStart}
   * @see {@link LonghandStyleProps.scrollPaddingBlockEnd}
   */
  scrollPaddingBlock?: LonghandStyleProps['scrollPaddingBlockStart'];

  /**
   * Alias for setting `scrollPaddingBlockEnd`:
   *
   * ```
   * scrollPaddingBlockEnd = props.scrollPaddingBlockEnd ?? props.scrollPaddingBottom ?? props.scrollPaddingBlock ?? props.scrollPadding;
   * ```
   *
   * @see {@link LonghandStyleProps.scrollPaddingBlockEnd}
   */
  scrollPaddingBottom?: LonghandStyleProps['scrollPaddingBlockEnd'];

  /**
   * Alias for setting `scrollMarginInlineStart`:
   *
   * ```
   * scrollMarginInlineStart = props.scrollMarginInlineStart ?? props.scrollMarginLeft ?? props.scrollMarginInline ?? props.scrollMargin;
   * ```
   *
   * @see {@link LonghandStyleProps.scrollMarginInlineStart}
   */
  scrollMarginLeft?: LonghandStyleProps['scrollMarginInlineStart'];

  /**
   * Alias for setting `scrollMarginInlineStart` and `scrollMarginInlineEnd`:
   *
   * ```
   * scrollMarginInlineStart = props.scrollMarginInlineStart ?? props.scrollMarginLeft ?? props.scrollMarginInline ?? props.scrollMargin;
   * scrollMarginInlineEnd = props.scrollMarginInlineEnd ?? props.scrollMarginRight ?? props.scrollMarginInline ?? props.scrollMargin;
   * ```
   *
   * @see {@link LonghandStyleProps.scrollMarginInlineStart}
   * @see {@link LonghandStyleProps.scrollMarginInlineEnd}
   */
  scrollMarginInline?: LonghandStyleProps['scrollMarginInlineStart'];

  /**
   * Alias for setting `scrollMarginInlineStart`, `scrollMarginInlineEnd`, `scrollMarginBlockStart` and `scrollMarginBlockEnd`:
   *
   * ```
   * scrollMarginInlineStart = props.scrollMarginInlineStart ?? props.scrollMarginLeft ?? props.scrollMarginInline ?? props.scrollMargin;
   * scrollMarginInlineEnd = props.scrollMarginInlineEnd ?? props.scrollMarginRight ?? props.scrollMarginInline ?? props.scrollMargin;
   * scrollMarginBlockStart = props.scrollMarginBlockStart ?? props.scrollMarginTop ?? props.scrollMarginBlock ?? props.scrollMargin;
   * scrollMarginBlockEnd = props.scrollMarginBlockEnd ?? props.scrollMarginBottom ?? props.scrollMarginBlock ?? props.scrollMargin;
   * ```
   *
   * @see {@link LonghandStyleProps.scrollMarginInlineStart}
   * @see {@link LonghandStyleProps.scrollMarginInlineEnd}
   * @see {@link LonghandStyleProps.scrollMarginBlockStart}
   * @see {@link LonghandStyleProps.scrollMarginBlockEnd}
   */
  scrollMargin?: LonghandStyleProps['scrollMarginInlineStart'];

  /**
   * Alias for setting `scrollMarginInlineEnd`:
   *
   * ```
   * scrollMarginInlineEnd = props.scrollMarginInlineEnd ?? props.scrollMarginRight ?? props.scrollMarginInline ?? props.scrollMargin;
   * ```
   *
   * @see {@link LonghandStyleProps.scrollMarginInlineEnd}
   */
  scrollMarginRight?: LonghandStyleProps['scrollMarginInlineEnd'];

  /**
   * Alias for setting `scrollMarginBlockStart`:
   *
   * ```
   * scrollMarginBlockStart = props.scrollMarginBlockStart ?? props.scrollMarginTop ?? props.scrollMarginBlock ?? props.scrollMargin;
   * ```
   *
   * @see {@link LonghandStyleProps.scrollMarginBlockStart}
   */
  scrollMarginTop?: LonghandStyleProps['scrollMarginBlockStart'];

  /**
   * Alias for setting `scrollMarginBlockStart` and `scrollMarginBlockEnd`:
   *
   * ```
   * scrollMarginBlockStart = props.scrollMarginBlockStart ?? props.scrollMarginTop ?? props.scrollMarginBlock ?? props.scrollMargin;
   * scrollMarginBlockEnd = props.scrollMarginBlockEnd ?? props.scrollMarginBottom ?? props.scrollMarginBlock ?? props.scrollMargin;
   * ```
   *
   * @see {@link LonghandStyleProps.scrollMarginBlockStart}
   * @see {@link LonghandStyleProps.scrollMarginBlockEnd}
   */
  scrollMarginBlock?: LonghandStyleProps['scrollMarginBlockStart'];

  /**
   * Alias for setting `scrollMarginBlockEnd`:
   *
   * ```
   * scrollMarginBlockEnd = props.scrollMarginBlockEnd ?? props.scrollMarginBottom ?? props.scrollMarginBlock ?? props.scrollMargin;
   * ```
   *
   * @see {@link LonghandStyleProps.scrollMarginBlockEnd}
   */
  scrollMarginBottom?: LonghandStyleProps['scrollMarginBlockEnd'];

  /**
   * Alias for setting `justifyItems`:
   *
   * ```
   * justifyItems = props.justifyItems ?? props.justify;
   * ```
   *
   * @see {@link LonghandStyleProps.justifyItems}
   */
  justify?: LonghandStyleProps['justifyItems'];

  /**
   * Alias for setting `alignItems`:
   *
   * ```
   * alignItems = props.alignItems ?? props.align;
   * ```
   *
   * @see {@link LonghandStyleProps.alignItems}
   */
  align?: LonghandStyleProps['alignItems'];

  /**
   * Alias for setting `boxShadow`:
   *
   * ```
   * boxShadow = props.boxShadow ?? props.shadow;
   * ```
   *
   * @see {@link LonghandStyleProps.boxShadow}
   */
  shadow?: LonghandStyleProps['boxShadow'];
};

/**
 * CSS properties we don't support.
 *
 * Note: Some 'disallowed' properties happen to share a name with allowed
 * aliases (eg; `paddingInline` is an alias for `paddingInlineStart` and
 * `paddingInlineEnd`), so they appear in the list below, but are later
 * included in the final `StyleProps` type.
 */
type DisallowedStandardLonghandProperties = 'width'
  | 'height'
  | 'paddingLeft'
  | 'paddingTop'
  | 'paddingRight'
  | 'paddingBottom'
  | 'marginLeft'
  | 'marginTop'
  | 'marginRight'
  | 'marginBottom'
  | 'maxWidth'
  | 'maxHeight'
  | 'minWidth'
  | 'minHeight'
  | 'borderTopLeftRadius'
  | 'borderTopRightRadius'
  | 'borderBottomRightRadius'
  | 'borderBottomLeftRadius'
  | 'borderTopColor'
  | 'borderRightColor'
  | 'borderBottomColor'
  | 'borderLeftColor'
  | 'borderTopStyle'
  | 'borderRightStyle'
  | 'borderBottomStyle'
  | 'borderLeftStyle'
  | 'borderTopWidth'
  | 'borderRightWidth'
  | 'borderBottomWidth'
  | 'borderLeftWidth'
  | 'overscrollBehaviorX'
  | 'overscrollBehaviorY'
  | 'scrollPaddingTop'
  | 'scrollPaddingRight'
  | 'scrollPaddingBottom'
  | 'scrollPaddingLeft'
  | 'scrollMarginTop'
  | 'scrollMarginRight'
  | 'scrollMarginBottom'
  | 'scrollMarginLeft'
  | 'top'
  | 'left'
  | 'right'
  | 'bottom'
  | 'containIntrinsicWidth'
  | 'containIntrinsicHeight'
  | 'borderBlockColor'
  | 'borderBlockStyle'
  | 'borderBlockWidth'
  | 'borderInlineColor'
  | 'borderInlineStyle'
  | 'borderInlineWidth'
  | 'touchAction'
  | 'content'
  | 'quotes'
  | 'content'
  | 'page'
  | 'mathStyle'
  | 'mathShift'
  | 'mathDepth'
  | 'overflowInline'
  | 'overflowBlock'
  | 'paddingLeft'
  | 'paddingRight'
  | 'paddingTop'
  | 'paddingBottom'
  | 'marginLeft'
  | 'marginRight'
  | 'marginTop'
  | 'marginBottom'
  | 'width'
  | 'height'
  | 'minWidth'
  | 'minHeight'
  | 'maxWidth'
  | 'maxHeight'
  | 'containIntrinsicWidth'
  | 'containIntrinsicHeight'
  | 'overflowInline'
  | 'overflowBlock'
  | 'overscrollBehaviorX'
  | 'overscrollBehaviorY'
  | 'borderTopLeftRadius'
  | 'borderTopRightRadius'
  | 'borderBottomLeftRadius'
  | 'borderBottomRightRadius'
  | 'borderLeftColor'
  | 'borderInlineColor'
  | 'borderRightColor'
  | 'borderTopColor'
  | 'borderBlockColor'
  | 'borderBottomColor'
  | 'borderLeftStyle'
  | 'borderInlineStyle'
  | 'borderRightStyle'
  | 'borderTopStyle'
  | 'borderBlockStyle'
  | 'borderBottomStyle'
  | 'borderLeftWidth'
  | 'borderInlineWidth'
  | 'borderRightWidth'
  | 'borderTopWidth'
  | 'borderBlockWidth'
  | 'borderBottomWidth'
  | 'left'
  | 'right'
  | 'top'
  | 'bottom'
  | 'scrollPaddingLeft'
  | 'scrollPaddingRight'
  | 'scrollPaddingTop'
  | 'scrollPaddingBottom'
  | 'scrollMarginLeft'
  | 'scrollMarginRight'
  | 'scrollMarginTop'
  | 'scrollMarginBottom';

/**
 * Props which act as an alias to one or more more specific props.
 *
 * For example; 'padding' is an alias to 'padding-inline-start',
 * 'padding-inline-end', etc, when those individual props aren't set.
 */
export const stylePropAliasFallbacks = {
  rowGap: ["gap"],
  columnGap: ["gap"],
  paddingInlineStart: ["paddingLeft","paddingInline","padding"],
  paddingInlineEnd: ["paddingRight","paddingInline","padding"],
  paddingBlockStart: ["paddingTop","paddingBlock","padding"],
  paddingBlockEnd: ["paddingBottom","paddingBlock","padding"],
  marginInlineStart: ["marginLeft","marginInline","margin"],
  marginInlineEnd: ["marginRight","marginInline","margin"],
  marginBlockStart: ["marginTop","marginBlock","margin"],
  marginBlockEnd: ["marginBottom","marginBlock","margin"],
  inlineSize: ["width","size"],
  blockSize: ["height","size"],
  minInlineSize: ["minWidth","minSize"],
  minBlockSize: ["minHeight","minSize"],
  maxInlineSize: ["maxWidth","maxSize"],
  maxBlockSize: ["maxHeight","maxSize"],
  containIntrinsicInlineSize: ["containIntrinsicWidth","containIntrinsicSize"],
  containIntrinsicBlockSize: ["containIntrinsicHeight","containIntrinsicSize"],
  overflowX: ["overflowInline","overflow"],
  overflowY: ["overflowBlock","overflow"],
  overscrollBehaviorInline: ["overscrollBehaviorX","overscrollBehavior"],
  overscrollBehaviorBlock: ["overscrollBehaviorY","overscrollBehavior"],
  backgroundColor: ["background"],
  backgroundPositionX: ["backgroundPosition"],
  backgroundPositionY: ["backgroundPosition"],
  borderStartStartRadius: ["borderTopLeftRadius","borderRadius"],
  borderStartEndRadius: ["borderTopRightRadius","borderRadius"],
  borderEndStartRadius: ["borderBottomLeftRadius","borderRadius"],
  borderEndEndRadius: ["borderBottomRightRadius","borderRadius"],
  borderInlineStartColor: ["borderLeftColor","borderInlineColor","borderColor"],
  borderInlineEndColor: ["borderRightColor","borderInlineColor","borderColor"],
  borderBlockStartColor: ["borderTopColor","borderBlockColor","borderColor"],
  borderBlockEndColor: ["borderBottomColor","borderBlockColor","borderColor"],
  borderInlineStartStyle: ["borderLeftStyle","borderInlineStyle","borderStyle"],
  borderInlineEndStyle: ["borderRightStyle","borderInlineStyle","borderStyle"],
  borderBlockStartStyle: ["borderTopStyle","borderBlockStyle","borderStyle"],
  borderBlockEndStyle: ["borderBottomStyle","borderBlockStyle","borderStyle"],
  borderInlineStartWidth: ["borderLeftWidth","borderInlineWidth","borderWidth"],
  borderInlineEndWidth: ["borderRightWidth","borderInlineWidth","borderWidth"],
  borderBlockStartWidth: ["borderTopWidth","borderBlockWidth","borderWidth"],
  borderBlockEndWidth: ["borderBottomWidth","borderBlockWidth","borderWidth"],
  insetInlineStart: ["left","insetInline","inset"],
  insetInlineEnd: ["right","insetInline","inset"],
  insetBlockStart: ["top","insetBlock","inset"],
  insetBlockEnd: ["bottom","insetBlock","inset"],
  scrollPaddingInlineStart: ["scrollPaddingLeft","scrollPaddingInline","scrollPadding"],
  scrollPaddingInlineEnd: ["scrollPaddingRight","scrollPaddingInline","scrollPadding"],
  scrollPaddingBlockStart: ["scrollPaddingTop","scrollPaddingBlock","scrollPadding"],
  scrollPaddingBlockEnd: ["scrollPaddingBottom","scrollPaddingBlock","scrollPadding"],
  scrollMarginInlineStart: ["scrollMarginLeft","scrollMarginInline","scrollMargin"],
  scrollMarginInlineEnd: ["scrollMarginRight","scrollMarginInline","scrollMargin"],
  scrollMarginBlockStart: ["scrollMarginTop","scrollMarginBlock","scrollMargin"],
  scrollMarginBlockEnd: ["scrollMarginBottom","scrollMarginBlock","scrollMargin"],
  justifyItems: ["justify"],
  alignItems: ["align"],
  boxShadow: ["shadow"],
} satisfies { [K in keyof SupportedCSSStyleProps]?: (keyof StyleProps)[] };

// Extract a unique set of just the alias names
export const stylePropAliasNames: (keyof StyleProps)[] = Array.from(
  new Set(Object.values(stylePropAliasFallbacks).flat())
);

export type PropDefaults = {[K in keyof StyleProps]?:
  | StyleProps[K]
  | undefined
  | ((props: ResponsiveStyleProps) => StyleProps[K] | undefined) };

export const stylePropDefaults = {
  borderInlineStartStyle: (props) =>
      props.borderInlineStartColor || props.borderInlineStartWidth
        ? 'solid'
        : undefined,
  borderInlineEndStyle: (props) =>
      props.borderInlineEndColor || props.borderInlineEndWidth
        ? 'solid'
        : undefined,
  borderBlockStartStyle: (props) =>
      props.borderBlockStartColor || props.borderBlockStartWidth
        ? 'solid'
        : undefined,
  borderBlockEndStyle: (props) =>
      props.borderBlockEndColor || props.borderBlockEndWidth
        ? 'solid'
        : undefined,
  borderInlineStartWidth: "0",
  borderInlineEndWidth: "0",
  borderBlockStartWidth: "0",
  borderBlockEndWidth: "0",
  outlineStyle: (props) =>
      props.outlineWidth || props.outlineColor ? 'solid' : undefined,
} satisfies PropDefaults;

/**
 * A list of values that if passed to any styleProp on our Box component should
 * warn the user, and bail early from the css property injection procedure. We
 * do this as there is no good way for us to explicitly disallow this string
 * literal in our types holistically for every style property.
 */
export const disallowedCSSPropertyValues = [
  "unset",
  "inherit",
  "initial",
  "revert",
  "-moz-initial"
] satisfies Globals[];

/**
 * Style props which only accept tokens need to be assigned to a token group.
 */
export const stylePropTokenGroupMap = {
  // Longhand CSS Style Props
  borderStartStartRadius: "border-radius",
  borderStartEndRadius: "border-radius",
  borderEndStartRadius: "border-radius",
  borderEndEndRadius: "border-radius",
  outlineWidth: "border-width",
  borderBlockStartWidth: "border-width",
  borderBlockEndWidth: "border-width",
  borderInlineStartWidth: "border-width",
  borderInlineEndWidth: "border-width",
  backgroundColor: "color",
  outlineColor: "color",
  borderInlineStartColor: "color",
  borderInlineEndColor: "color",
  borderBlockStartColor: "color",
  borderBlockEndColor: "color",
  color: "color",
  fontSize: "font",
  lineHeight: "font",
  fontWeight: "font",
  fontFamily: "font",
  letterSpacing: "font",
  containIntrinsicBlockSize: "height",
  containIntrinsicInlineSize: "width",
  boxShadow: "shadow",
  marginInlineStart: "space",
  marginInlineEnd: "space",
  marginBlockStart: "space",
  marginBlockEnd: "space",
  paddingInlineStart: "space",
  paddingInlineEnd: "space",
  paddingBlockStart: "space",
  paddingBlockEnd: "space",
  insetInlineStart: "space",
  insetInlineEnd: "space",
  insetBlockStart: "space",
  insetBlockEnd: "space",
  rowGap: "space",
  columnGap: "space",
  transitionDuration: "motion-duration",
  animationName: "motion-keyframes",
  transitionTimingFunction: "motion",

  // Aliases
  gap: "space",
  paddingLeft: "space",
  paddingInline: "space",
  padding: "space",
  paddingRight: "space",
  paddingTop: "space",
  paddingBlock: "space",
  paddingBottom: "space",
  marginLeft: "space",
  marginInline: "space",
  margin: "space",
  marginRight: "space",
  marginTop: "space",
  marginBlock: "space",
  marginBottom: "space",
  containIntrinsicWidth: "width",
  containIntrinsicSize: "width",
  containIntrinsicHeight: "height",
  background: "color",
  borderTopLeftRadius: "border-radius",
  borderRadius: "border-radius",
  borderTopRightRadius: "border-radius",
  borderBottomLeftRadius: "border-radius",
  borderBottomRightRadius: "border-radius",
  borderLeftColor: "color",
  borderInlineColor: "color",
  borderColor: "color",
  borderRightColor: "color",
  borderTopColor: "color",
  borderBlockColor: "color",
  borderBottomColor: "color",
  borderLeftWidth: "border-width",
  borderInlineWidth: "border-width",
  borderWidth: "border-width",
  borderRightWidth: "border-width",
  borderTopWidth: "border-width",
  borderBlockWidth: "border-width",
  borderBottomWidth: "border-width",
  left: "space",
  insetInline: "space",
  inset: "space",
  right: "space",
  top: "space",
  insetBlock: "space",
  bottom: "space",
  shadow: "shadow",
} as const;

export const cssCustomPropertyNamespace = "_";

export const modifiers = ["_hover","_visited"] as const;
