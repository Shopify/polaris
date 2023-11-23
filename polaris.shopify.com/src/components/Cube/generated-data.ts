/* THIS FILE IS AUTO GENERATED, DO NOT TOUCH */
import type {StandardLonghandProperties, Globals} from 'csstype';
import type {TokenizedStyleProps} from '@shopify/polaris-tokens';
import type {OverrideProperties}  from 'type-fest';
import type {ResponsiveProp} from '../../utils/various';

/**
 * Pick only the keys in `PickFrom` which are also in `IntersectWith`.
 */
type PickIntersection<PickFrom, IntersectWith> = Pick<
  PickFrom,
  keyof IntersectWith & keyof PickFrom
>;

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
type SupportedStyleProps = OverrideProperties<
  SupportedCSSStyleProps,
  // `@shopify/polaris-tokens` may type more CSS properties than we want to
  // support here, so ensure we're only picking the ones we explicityly support
  PickIntersection<TokenizedStyleProps, SupportedCSSStyleProps>
>;

type StyleProps = SupportedStyleProps & StylePropAliases;

/**
 * A combination of raw CSS style props, tokenized style props (derived from
 * `@shopify/polaris-tokens`), and helpful aliases for frequently used props.
 */
export type ResponsiveStyleProps = {
  [K in keyof StyleProps]?: ResponsiveProp<
    // Excluding globally disallowed values as the last thing we do ensures none
    // slip through the cracks in the above type definitions.
    Exclude<StyleProps[K], (typeof disallowedCSSPropertyValues)[number]>
  >;
};

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
   * @see {@link SupportedStyleProps.rowGap}
   * @see {@link SupportedStyleProps.columnGap}
   */
  gap?: SupportedStyleProps['rowGap'];

  /**
   * Alias for setting `paddingInlineStart`:
   *
   * ```
   * paddingInlineStart = props.paddingInlineStart ?? props.paddingLeft ?? props.paddingInline ?? props.padding;
   * ```
   *
   * @see {@link SupportedStyleProps.paddingInlineStart}
   */
  paddingLeft?: SupportedStyleProps['paddingInlineStart'];

  /**
   * Alias for setting `paddingInlineStart` and `paddingInlineEnd`:
   *
   * ```
   * paddingInlineStart = props.paddingInlineStart ?? props.paddingLeft ?? props.paddingInline ?? props.padding;
   * paddingInlineEnd = props.paddingInlineEnd ?? props.paddingRight ?? props.paddingInline ?? props.padding;
   * ```
   *
   * @see {@link SupportedStyleProps.paddingInlineStart}
   * @see {@link SupportedStyleProps.paddingInlineEnd}
   */
  paddingInline?: SupportedStyleProps['paddingInlineStart'];

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
   * @see {@link SupportedStyleProps.paddingInlineStart}
   * @see {@link SupportedStyleProps.paddingInlineEnd}
   * @see {@link SupportedStyleProps.paddingBlockStart}
   * @see {@link SupportedStyleProps.paddingBlockEnd}
   */
  padding?: SupportedStyleProps['paddingInlineStart'];

  /**
   * Alias for setting `paddingInlineEnd`:
   *
   * ```
   * paddingInlineEnd = props.paddingInlineEnd ?? props.paddingRight ?? props.paddingInline ?? props.padding;
   * ```
   *
   * @see {@link SupportedStyleProps.paddingInlineEnd}
   */
  paddingRight?: SupportedStyleProps['paddingInlineEnd'];

  /**
   * Alias for setting `paddingBlockStart`:
   *
   * ```
   * paddingBlockStart = props.paddingBlockStart ?? props.paddingTop ?? props.paddingBlock ?? props.padding;
   * ```
   *
   * @see {@link SupportedStyleProps.paddingBlockStart}
   */
  paddingTop?: SupportedStyleProps['paddingBlockStart'];

  /**
   * Alias for setting `paddingBlockStart` and `paddingBlockEnd`:
   *
   * ```
   * paddingBlockStart = props.paddingBlockStart ?? props.paddingTop ?? props.paddingBlock ?? props.padding;
   * paddingBlockEnd = props.paddingBlockEnd ?? props.paddingBottom ?? props.paddingBlock ?? props.padding;
   * ```
   *
   * @see {@link SupportedStyleProps.paddingBlockStart}
   * @see {@link SupportedStyleProps.paddingBlockEnd}
   */
  paddingBlock?: SupportedStyleProps['paddingBlockStart'];

  /**
   * Alias for setting `paddingBlockEnd`:
   *
   * ```
   * paddingBlockEnd = props.paddingBlockEnd ?? props.paddingBottom ?? props.paddingBlock ?? props.padding;
   * ```
   *
   * @see {@link SupportedStyleProps.paddingBlockEnd}
   */
  paddingBottom?: SupportedStyleProps['paddingBlockEnd'];

  /**
   * Alias for setting `marginInlineStart`:
   *
   * ```
   * marginInlineStart = props.marginInlineStart ?? props.marginLeft ?? props.marginInline ?? props.margin;
   * ```
   *
   * @see {@link SupportedStyleProps.marginInlineStart}
   */
  marginLeft?: SupportedStyleProps['marginInlineStart'];

  /**
   * Alias for setting `marginInlineStart` and `marginInlineEnd`:
   *
   * ```
   * marginInlineStart = props.marginInlineStart ?? props.marginLeft ?? props.marginInline ?? props.margin;
   * marginInlineEnd = props.marginInlineEnd ?? props.marginRight ?? props.marginInline ?? props.margin;
   * ```
   *
   * @see {@link SupportedStyleProps.marginInlineStart}
   * @see {@link SupportedStyleProps.marginInlineEnd}
   */
  marginInline?: SupportedStyleProps['marginInlineStart'];

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
   * @see {@link SupportedStyleProps.marginInlineStart}
   * @see {@link SupportedStyleProps.marginInlineEnd}
   * @see {@link SupportedStyleProps.marginBlockStart}
   * @see {@link SupportedStyleProps.marginBlockEnd}
   */
  margin?: SupportedStyleProps['marginInlineStart'];

  /**
   * Alias for setting `marginInlineEnd`:
   *
   * ```
   * marginInlineEnd = props.marginInlineEnd ?? props.marginRight ?? props.marginInline ?? props.margin;
   * ```
   *
   * @see {@link SupportedStyleProps.marginInlineEnd}
   */
  marginRight?: SupportedStyleProps['marginInlineEnd'];

  /**
   * Alias for setting `marginBlockStart`:
   *
   * ```
   * marginBlockStart = props.marginBlockStart ?? props.marginTop ?? props.marginBlock ?? props.margin;
   * ```
   *
   * @see {@link SupportedStyleProps.marginBlockStart}
   */
  marginTop?: SupportedStyleProps['marginBlockStart'];

  /**
   * Alias for setting `marginBlockStart` and `marginBlockEnd`:
   *
   * ```
   * marginBlockStart = props.marginBlockStart ?? props.marginTop ?? props.marginBlock ?? props.margin;
   * marginBlockEnd = props.marginBlockEnd ?? props.marginBottom ?? props.marginBlock ?? props.margin;
   * ```
   *
   * @see {@link SupportedStyleProps.marginBlockStart}
   * @see {@link SupportedStyleProps.marginBlockEnd}
   */
  marginBlock?: SupportedStyleProps['marginBlockStart'];

  /**
   * Alias for setting `marginBlockEnd`:
   *
   * ```
   * marginBlockEnd = props.marginBlockEnd ?? props.marginBottom ?? props.marginBlock ?? props.margin;
   * ```
   *
   * @see {@link SupportedStyleProps.marginBlockEnd}
   */
  marginBottom?: SupportedStyleProps['marginBlockEnd'];

  /**
   * Alias for setting `inlineSize`:
   *
   * ```
   * inlineSize = props.inlineSize ?? props.width ?? props.size;
   * ```
   *
   * @see {@link SupportedStyleProps.inlineSize}
   */
  width?: SupportedStyleProps['inlineSize'];

  /**
   * Alias for setting `inlineSize` and `blockSize`:
   *
   * ```
   * inlineSize = props.inlineSize ?? props.width ?? props.size;
   * blockSize = props.blockSize ?? props.height ?? props.size;
   * ```
   *
   * @see {@link SupportedStyleProps.inlineSize}
   * @see {@link SupportedStyleProps.blockSize}
   */
  size?: SupportedStyleProps['inlineSize'];

  /**
   * Alias for setting `blockSize`:
   *
   * ```
   * blockSize = props.blockSize ?? props.height ?? props.size;
   * ```
   *
   * @see {@link SupportedStyleProps.blockSize}
   */
  height?: SupportedStyleProps['blockSize'];

  /**
   * Alias for setting `minInlineSize`:
   *
   * ```
   * minInlineSize = props.minInlineSize ?? props.minWidth ?? props.minSize;
   * ```
   *
   * @see {@link SupportedStyleProps.minInlineSize}
   */
  minWidth?: SupportedStyleProps['minInlineSize'];

  /**
   * Alias for setting `minInlineSize` and `minBlockSize`:
   *
   * ```
   * minInlineSize = props.minInlineSize ?? props.minWidth ?? props.minSize;
   * minBlockSize = props.minBlockSize ?? props.minHeight ?? props.minSize;
   * ```
   *
   * @see {@link SupportedStyleProps.minInlineSize}
   * @see {@link SupportedStyleProps.minBlockSize}
   */
  minSize?: Exclude<
    SupportedStyleProps['minInlineSize'],
    '-moz-fit-content'
  >;

  /**
   * Alias for setting `minBlockSize`:
   *
   * ```
   * minBlockSize = props.minBlockSize ?? props.minHeight ?? props.minSize;
   * ```
   *
   * @see {@link SupportedStyleProps.minBlockSize}
   */
  minHeight?: SupportedStyleProps['minBlockSize'];

  /**
   * Alias for setting `maxInlineSize`:
   *
   * ```
   * maxInlineSize = props.maxInlineSize ?? props.maxWidth ?? props.maxSize;
   * ```
   *
   * @see {@link SupportedStyleProps.maxInlineSize}
   */
  maxWidth?: SupportedStyleProps['maxInlineSize'];

  /**
   * Alias for setting `maxInlineSize` and `maxBlockSize`:
   *
   * ```
   * maxInlineSize = props.maxInlineSize ?? props.maxWidth ?? props.maxSize;
   * maxBlockSize = props.maxBlockSize ?? props.maxHeight ?? props.maxSize;
   * ```
   *
   * @see {@link SupportedStyleProps.maxInlineSize}
   * @see {@link SupportedStyleProps.maxBlockSize}
   */
  maxSize?: Exclude<
    SupportedStyleProps['maxInlineSize'],
    '-moz-fit-content'
  >;

  /**
   * Alias for setting `maxBlockSize`:
   *
   * ```
   * maxBlockSize = props.maxBlockSize ?? props.maxHeight ?? props.maxSize;
   * ```
   *
   * @see {@link SupportedStyleProps.maxBlockSize}
   */
  maxHeight?: SupportedStyleProps['maxBlockSize'];

  /**
   * Alias for setting `containIntrinsicInlineSize`:
   *
   * ```
   * containIntrinsicInlineSize = props.containIntrinsicInlineSize ?? props.containIntrinsicWidth ?? props.containIntrinsicSize;
   * ```
   *
   * @see {@link SupportedStyleProps.containIntrinsicInlineSize}
   */
  containIntrinsicWidth?: SupportedStyleProps['containIntrinsicInlineSize'];

  /**
   * Alias for setting `containIntrinsicInlineSize` and `containIntrinsicBlockSize`:
   *
   * ```
   * containIntrinsicInlineSize = props.containIntrinsicInlineSize ?? props.containIntrinsicWidth ?? props.containIntrinsicSize;
   * containIntrinsicBlockSize = props.containIntrinsicBlockSize ?? props.containIntrinsicHeight ?? props.containIntrinsicSize;
   * ```
   *
   * @see {@link SupportedStyleProps.containIntrinsicInlineSize}
   * @see {@link SupportedStyleProps.containIntrinsicBlockSize}
   */
  containIntrinsicSize?: SupportedStyleProps['containIntrinsicInlineSize'];

  /**
   * Alias for setting `containIntrinsicBlockSize`:
   *
   * ```
   * containIntrinsicBlockSize = props.containIntrinsicBlockSize ?? props.containIntrinsicHeight ?? props.containIntrinsicSize;
   * ```
   *
   * @see {@link SupportedStyleProps.containIntrinsicBlockSize}
   */
  containIntrinsicHeight?: SupportedStyleProps['containIntrinsicBlockSize'];

  /**
   * Alias for setting `overflowInline`:
   *
   * ```
   * overflowInline = props.overflowInline ?? props.overflowX ?? props.overflow;
   * ```
   *
   * @see {@link SupportedStyleProps.overflowInline}
   */
  overflowX?: SupportedStyleProps['overflowInline'];

  /**
   * Alias for setting `overflowInline` and `overflowBlock`:
   *
   * ```
   * overflowInline = props.overflowInline ?? props.overflowX ?? props.overflow;
   * overflowBlock = props.overflowBlock ?? props.overflowY ?? props.overflow;
   * ```
   *
   * @see {@link SupportedStyleProps.overflowInline}
   * @see {@link SupportedStyleProps.overflowBlock}
   */
  overflow?: SupportedStyleProps['overflowInline'];

  /**
   * Alias for setting `overflowBlock`:
   *
   * ```
   * overflowBlock = props.overflowBlock ?? props.overflowY ?? props.overflow;
   * ```
   *
   * @see {@link SupportedStyleProps.overflowBlock}
   */
  overflowY?: SupportedStyleProps['overflowBlock'];

  /**
   * Alias for setting `overscrollBehaviorInline`:
   *
   * ```
   * overscrollBehaviorInline = props.overscrollBehaviorInline ?? props.overscrollBehaviorX ?? props.overscrollBehavior;
   * ```
   *
   * @see {@link SupportedStyleProps.overscrollBehaviorInline}
   */
  overscrollBehaviorX?: SupportedStyleProps['overscrollBehaviorInline'];

  /**
   * Alias for setting `overscrollBehaviorInline` and `overscrollBehaviorBlock`:
   *
   * ```
   * overscrollBehaviorInline = props.overscrollBehaviorInline ?? props.overscrollBehaviorX ?? props.overscrollBehavior;
   * overscrollBehaviorBlock = props.overscrollBehaviorBlock ?? props.overscrollBehaviorY ?? props.overscrollBehavior;
   * ```
   *
   * @see {@link SupportedStyleProps.overscrollBehaviorInline}
   * @see {@link SupportedStyleProps.overscrollBehaviorBlock}
   */
  overscrollBehavior?: SupportedStyleProps['overscrollBehaviorInline'];

  /**
   * Alias for setting `overscrollBehaviorBlock`:
   *
   * ```
   * overscrollBehaviorBlock = props.overscrollBehaviorBlock ?? props.overscrollBehaviorY ?? props.overscrollBehavior;
   * ```
   *
   * @see {@link SupportedStyleProps.overscrollBehaviorBlock}
   */
  overscrollBehaviorY?: SupportedStyleProps['overscrollBehaviorBlock'];

  /**
   * Alias for setting `backgroundPositionX` and `backgroundPositionY`:
   *
   * ```
   * backgroundPositionX = props.backgroundPositionX ?? props.backgroundPosition;
   * backgroundPositionY = props.backgroundPositionY ?? props.backgroundPosition;
   * ```
   *
   * @see {@link SupportedStyleProps.backgroundPositionX}
   * @see {@link SupportedStyleProps.backgroundPositionY}
   */
  backgroundPosition?: Exclude<
    SupportedStyleProps['backgroundPositionX'],
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
   * @see {@link SupportedStyleProps.borderStartStartRadius}
   */
  borderTopLeftRadius?: SupportedStyleProps['borderStartStartRadius'];

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
   * @see {@link SupportedStyleProps.borderStartStartRadius}
   * @see {@link SupportedStyleProps.borderStartEndRadius}
   * @see {@link SupportedStyleProps.borderEndStartRadius}
   * @see {@link SupportedStyleProps.borderEndEndRadius}
   */
  borderRadius?: SupportedStyleProps['borderStartStartRadius'];

  /**
   * Alias for setting `borderStartEndRadius`:
   *
   * ```
   * borderStartEndRadius = props.borderStartEndRadius ?? props.borderTopRightRadius ?? props.borderRadius;
   * ```
   *
   * @see {@link SupportedStyleProps.borderStartEndRadius}
   */
  borderTopRightRadius?: SupportedStyleProps['borderStartEndRadius'];

  /**
   * Alias for setting `borderEndStartRadius`:
   *
   * ```
   * borderEndStartRadius = props.borderEndStartRadius ?? props.borderBottomLeftRadius ?? props.borderRadius;
   * ```
   *
   * @see {@link SupportedStyleProps.borderEndStartRadius}
   */
  borderBottomLeftRadius?: SupportedStyleProps['borderEndStartRadius'];

  /**
   * Alias for setting `borderEndEndRadius`:
   *
   * ```
   * borderEndEndRadius = props.borderEndEndRadius ?? props.borderBottomRightRadius ?? props.borderRadius;
   * ```
   *
   * @see {@link SupportedStyleProps.borderEndEndRadius}
   */
  borderBottomRightRadius?: SupportedStyleProps['borderEndEndRadius'];

  /**
   * Alias for setting `borderInlineStartColor`:
   *
   * ```
   * borderInlineStartColor = props.borderInlineStartColor ?? props.borderLeftColor ?? props.borderInlineColor ?? props.borderColor;
   * ```
   *
   * @see {@link SupportedStyleProps.borderInlineStartColor}
   */
  borderLeftColor?: SupportedStyleProps['borderInlineStartColor'];

  /**
   * Alias for setting `borderInlineStartColor` and `borderInlineEndColor`:
   *
   * ```
   * borderInlineStartColor = props.borderInlineStartColor ?? props.borderLeftColor ?? props.borderInlineColor ?? props.borderColor;
   * borderInlineEndColor = props.borderInlineEndColor ?? props.borderRightColor ?? props.borderInlineColor ?? props.borderColor;
   * ```
   *
   * @see {@link SupportedStyleProps.borderInlineStartColor}
   * @see {@link SupportedStyleProps.borderInlineEndColor}
   */
  borderInlineColor?: SupportedStyleProps['borderInlineStartColor'];

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
   * @see {@link SupportedStyleProps.borderInlineStartColor}
   * @see {@link SupportedStyleProps.borderInlineEndColor}
   * @see {@link SupportedStyleProps.borderBlockStartColor}
   * @see {@link SupportedStyleProps.borderBlockEndColor}
   */
  borderColor?: SupportedStyleProps['borderInlineStartColor'];

  /**
   * Alias for setting `borderInlineEndColor`:
   *
   * ```
   * borderInlineEndColor = props.borderInlineEndColor ?? props.borderRightColor ?? props.borderInlineColor ?? props.borderColor;
   * ```
   *
   * @see {@link SupportedStyleProps.borderInlineEndColor}
   */
  borderRightColor?: SupportedStyleProps['borderInlineEndColor'];

  /**
   * Alias for setting `borderBlockStartColor`:
   *
   * ```
   * borderBlockStartColor = props.borderBlockStartColor ?? props.borderTopColor ?? props.borderBlockColor ?? props.borderColor;
   * ```
   *
   * @see {@link SupportedStyleProps.borderBlockStartColor}
   */
  borderTopColor?: SupportedStyleProps['borderBlockStartColor'];

  /**
   * Alias for setting `borderBlockStartColor` and `borderBlockEndColor`:
   *
   * ```
   * borderBlockStartColor = props.borderBlockStartColor ?? props.borderTopColor ?? props.borderBlockColor ?? props.borderColor;
   * borderBlockEndColor = props.borderBlockEndColor ?? props.borderBottomColor ?? props.borderBlockColor ?? props.borderColor;
   * ```
   *
   * @see {@link SupportedStyleProps.borderBlockStartColor}
   * @see {@link SupportedStyleProps.borderBlockEndColor}
   */
  borderBlockColor?: SupportedStyleProps['borderBlockStartColor'];

  /**
   * Alias for setting `borderBlockEndColor`:
   *
   * ```
   * borderBlockEndColor = props.borderBlockEndColor ?? props.borderBottomColor ?? props.borderBlockColor ?? props.borderColor;
   * ```
   *
   * @see {@link SupportedStyleProps.borderBlockEndColor}
   */
  borderBottomColor?: SupportedStyleProps['borderBlockEndColor'];

  /**
   * Alias for setting `borderInlineStartStyle`:
   *
   * ```
   * borderInlineStartStyle = props.borderInlineStartStyle ?? props.borderLeftStyle ?? props.borderInlineStyle ?? props.borderStyle;
   * ```
   *
   * @see {@link SupportedStyleProps.borderInlineStartStyle}
   */
  borderLeftStyle?: SupportedStyleProps['borderInlineStartStyle'];

  /**
   * Alias for setting `borderInlineStartStyle` and `borderInlineEndStyle`:
   *
   * ```
   * borderInlineStartStyle = props.borderInlineStartStyle ?? props.borderLeftStyle ?? props.borderInlineStyle ?? props.borderStyle;
   * borderInlineEndStyle = props.borderInlineEndStyle ?? props.borderRightStyle ?? props.borderInlineStyle ?? props.borderStyle;
   * ```
   *
   * @see {@link SupportedStyleProps.borderInlineStartStyle}
   * @see {@link SupportedStyleProps.borderInlineEndStyle}
   */
  borderInlineStyle?: SupportedStyleProps['borderInlineStartStyle'];

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
   * @see {@link SupportedStyleProps.borderInlineStartStyle}
   * @see {@link SupportedStyleProps.borderInlineEndStyle}
   * @see {@link SupportedStyleProps.borderBlockStartStyle}
   * @see {@link SupportedStyleProps.borderBlockEndStyle}
   */
  borderStyle?: SupportedStyleProps['borderInlineStartStyle'];

  /**
   * Alias for setting `borderInlineEndStyle`:
   *
   * ```
   * borderInlineEndStyle = props.borderInlineEndStyle ?? props.borderRightStyle ?? props.borderInlineStyle ?? props.borderStyle;
   * ```
   *
   * @see {@link SupportedStyleProps.borderInlineEndStyle}
   */
  borderRightStyle?: SupportedStyleProps['borderInlineEndStyle'];

  /**
   * Alias for setting `borderBlockStartStyle`:
   *
   * ```
   * borderBlockStartStyle = props.borderBlockStartStyle ?? props.borderTopStyle ?? props.borderBlockStyle ?? props.borderStyle;
   * ```
   *
   * @see {@link SupportedStyleProps.borderBlockStartStyle}
   */
  borderTopStyle?: SupportedStyleProps['borderBlockStartStyle'];

  /**
   * Alias for setting `borderBlockStartStyle` and `borderBlockEndStyle`:
   *
   * ```
   * borderBlockStartStyle = props.borderBlockStartStyle ?? props.borderTopStyle ?? props.borderBlockStyle ?? props.borderStyle;
   * borderBlockEndStyle = props.borderBlockEndStyle ?? props.borderBottomStyle ?? props.borderBlockStyle ?? props.borderStyle;
   * ```
   *
   * @see {@link SupportedStyleProps.borderBlockStartStyle}
   * @see {@link SupportedStyleProps.borderBlockEndStyle}
   */
  borderBlockStyle?: SupportedStyleProps['borderBlockStartStyle'];

  /**
   * Alias for setting `borderBlockEndStyle`:
   *
   * ```
   * borderBlockEndStyle = props.borderBlockEndStyle ?? props.borderBottomStyle ?? props.borderBlockStyle ?? props.borderStyle;
   * ```
   *
   * @see {@link SupportedStyleProps.borderBlockEndStyle}
   */
  borderBottomStyle?: SupportedStyleProps['borderBlockEndStyle'];

  /**
   * Alias for setting `borderInlineStartWidth`:
   *
   * ```
   * borderInlineStartWidth = props.borderInlineStartWidth ?? props.borderLeftWidth ?? props.borderInlineWidth ?? props.borderWidth;
   * ```
   *
   * @see {@link SupportedStyleProps.borderInlineStartWidth}
   */
  borderLeftWidth?: SupportedStyleProps['borderInlineStartWidth'];

  /**
   * Alias for setting `borderInlineStartWidth` and `borderInlineEndWidth`:
   *
   * ```
   * borderInlineStartWidth = props.borderInlineStartWidth ?? props.borderLeftWidth ?? props.borderInlineWidth ?? props.borderWidth;
   * borderInlineEndWidth = props.borderInlineEndWidth ?? props.borderRightWidth ?? props.borderInlineWidth ?? props.borderWidth;
   * ```
   *
   * @see {@link SupportedStyleProps.borderInlineStartWidth}
   * @see {@link SupportedStyleProps.borderInlineEndWidth}
   */
  borderInlineWidth?: SupportedStyleProps['borderInlineStartWidth'];

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
   * @see {@link SupportedStyleProps.borderInlineStartWidth}
   * @see {@link SupportedStyleProps.borderInlineEndWidth}
   * @see {@link SupportedStyleProps.borderBlockStartWidth}
   * @see {@link SupportedStyleProps.borderBlockEndWidth}
   */
  borderWidth?: SupportedStyleProps['borderInlineStartWidth'];

  /**
   * Alias for setting `borderInlineEndWidth`:
   *
   * ```
   * borderInlineEndWidth = props.borderInlineEndWidth ?? props.borderRightWidth ?? props.borderInlineWidth ?? props.borderWidth;
   * ```
   *
   * @see {@link SupportedStyleProps.borderInlineEndWidth}
   */
  borderRightWidth?: SupportedStyleProps['borderInlineEndWidth'];

  /**
   * Alias for setting `borderBlockStartWidth`:
   *
   * ```
   * borderBlockStartWidth = props.borderBlockStartWidth ?? props.borderTopWidth ?? props.borderBlockWidth ?? props.borderWidth;
   * ```
   *
   * @see {@link SupportedStyleProps.borderBlockStartWidth}
   */
  borderTopWidth?: SupportedStyleProps['borderBlockStartWidth'];

  /**
   * Alias for setting `borderBlockStartWidth` and `borderBlockEndWidth`:
   *
   * ```
   * borderBlockStartWidth = props.borderBlockStartWidth ?? props.borderTopWidth ?? props.borderBlockWidth ?? props.borderWidth;
   * borderBlockEndWidth = props.borderBlockEndWidth ?? props.borderBottomWidth ?? props.borderBlockWidth ?? props.borderWidth;
   * ```
   *
   * @see {@link SupportedStyleProps.borderBlockStartWidth}
   * @see {@link SupportedStyleProps.borderBlockEndWidth}
   */
  borderBlockWidth?: SupportedStyleProps['borderBlockStartWidth'];

  /**
   * Alias for setting `borderBlockEndWidth`:
   *
   * ```
   * borderBlockEndWidth = props.borderBlockEndWidth ?? props.borderBottomWidth ?? props.borderBlockWidth ?? props.borderWidth;
   * ```
   *
   * @see {@link SupportedStyleProps.borderBlockEndWidth}
   */
  borderBottomWidth?: SupportedStyleProps['borderBlockEndWidth'];

  /**
   * Alias for setting `insetInlineStart`:
   *
   * ```
   * insetInlineStart = props.insetInlineStart ?? props.left ?? props.insetInline ?? props.inset;
   * ```
   *
   * @see {@link SupportedStyleProps.insetInlineStart}
   */
  left?: SupportedStyleProps['insetInlineStart'];

  /**
   * Alias for setting `insetInlineStart` and `insetInlineEnd`:
   *
   * ```
   * insetInlineStart = props.insetInlineStart ?? props.left ?? props.insetInline ?? props.inset;
   * insetInlineEnd = props.insetInlineEnd ?? props.right ?? props.insetInline ?? props.inset;
   * ```
   *
   * @see {@link SupportedStyleProps.insetInlineStart}
   * @see {@link SupportedStyleProps.insetInlineEnd}
   */
  insetInline?: SupportedStyleProps['insetInlineStart'];

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
   * @see {@link SupportedStyleProps.insetInlineStart}
   * @see {@link SupportedStyleProps.insetInlineEnd}
   * @see {@link SupportedStyleProps.insetBlockStart}
   * @see {@link SupportedStyleProps.insetBlockEnd}
   */
  inset?: SupportedStyleProps['insetInlineStart'];

  /**
   * Alias for setting `insetInlineEnd`:
   *
   * ```
   * insetInlineEnd = props.insetInlineEnd ?? props.right ?? props.insetInline ?? props.inset;
   * ```
   *
   * @see {@link SupportedStyleProps.insetInlineEnd}
   */
  right?: SupportedStyleProps['insetInlineEnd'];

  /**
   * Alias for setting `insetBlockStart`:
   *
   * ```
   * insetBlockStart = props.insetBlockStart ?? props.top ?? props.insetBlock ?? props.inset;
   * ```
   *
   * @see {@link SupportedStyleProps.insetBlockStart}
   */
  top?: SupportedStyleProps['insetBlockStart'];

  /**
   * Alias for setting `insetBlockStart` and `insetBlockEnd`:
   *
   * ```
   * insetBlockStart = props.insetBlockStart ?? props.top ?? props.insetBlock ?? props.inset;
   * insetBlockEnd = props.insetBlockEnd ?? props.bottom ?? props.insetBlock ?? props.inset;
   * ```
   *
   * @see {@link SupportedStyleProps.insetBlockStart}
   * @see {@link SupportedStyleProps.insetBlockEnd}
   */
  insetBlock?: SupportedStyleProps['insetBlockStart'];

  /**
   * Alias for setting `insetBlockEnd`:
   *
   * ```
   * insetBlockEnd = props.insetBlockEnd ?? props.bottom ?? props.insetBlock ?? props.inset;
   * ```
   *
   * @see {@link SupportedStyleProps.insetBlockEnd}
   */
  bottom?: SupportedStyleProps['insetBlockEnd'];

  /**
   * Alias for setting `scrollPaddingInlineStart`:
   *
   * ```
   * scrollPaddingInlineStart = props.scrollPaddingInlineStart ?? props.scrollPaddingLeft ?? props.scrollPaddingInline ?? props.scrollPadding;
   * ```
   *
   * @see {@link SupportedStyleProps.scrollPaddingInlineStart}
   */
  scrollPaddingLeft?: SupportedStyleProps['scrollPaddingInlineStart'];

  /**
   * Alias for setting `scrollPaddingInlineStart` and `scrollPaddingInlineEnd`:
   *
   * ```
   * scrollPaddingInlineStart = props.scrollPaddingInlineStart ?? props.scrollPaddingLeft ?? props.scrollPaddingInline ?? props.scrollPadding;
   * scrollPaddingInlineEnd = props.scrollPaddingInlineEnd ?? props.scrollPaddingRight ?? props.scrollPaddingInline ?? props.scrollPadding;
   * ```
   *
   * @see {@link SupportedStyleProps.scrollPaddingInlineStart}
   * @see {@link SupportedStyleProps.scrollPaddingInlineEnd}
   */
  scrollPaddingInline?: SupportedStyleProps['scrollPaddingInlineStart'];

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
   * @see {@link SupportedStyleProps.scrollPaddingInlineStart}
   * @see {@link SupportedStyleProps.scrollPaddingInlineEnd}
   * @see {@link SupportedStyleProps.scrollPaddingBlockStart}
   * @see {@link SupportedStyleProps.scrollPaddingBlockEnd}
   */
  scrollPadding?: SupportedStyleProps['scrollPaddingInlineStart'];

  /**
   * Alias for setting `scrollPaddingInlineEnd`:
   *
   * ```
   * scrollPaddingInlineEnd = props.scrollPaddingInlineEnd ?? props.scrollPaddingRight ?? props.scrollPaddingInline ?? props.scrollPadding;
   * ```
   *
   * @see {@link SupportedStyleProps.scrollPaddingInlineEnd}
   */
  scrollPaddingRight?: SupportedStyleProps['scrollPaddingInlineEnd'];

  /**
   * Alias for setting `scrollPaddingBlockStart`:
   *
   * ```
   * scrollPaddingBlockStart = props.scrollPaddingBlockStart ?? props.scrollPaddingTop ?? props.scrollPaddingBlock ?? props.scrollPadding;
   * ```
   *
   * @see {@link SupportedStyleProps.scrollPaddingBlockStart}
   */
  scrollPaddingTop?: SupportedStyleProps['scrollPaddingBlockStart'];

  /**
   * Alias for setting `scrollPaddingBlockStart` and `scrollPaddingBlockEnd`:
   *
   * ```
   * scrollPaddingBlockStart = props.scrollPaddingBlockStart ?? props.scrollPaddingTop ?? props.scrollPaddingBlock ?? props.scrollPadding;
   * scrollPaddingBlockEnd = props.scrollPaddingBlockEnd ?? props.scrollPaddingBottom ?? props.scrollPaddingBlock ?? props.scrollPadding;
   * ```
   *
   * @see {@link SupportedStyleProps.scrollPaddingBlockStart}
   * @see {@link SupportedStyleProps.scrollPaddingBlockEnd}
   */
  scrollPaddingBlock?: SupportedStyleProps['scrollPaddingBlockStart'];

  /**
   * Alias for setting `scrollPaddingBlockEnd`:
   *
   * ```
   * scrollPaddingBlockEnd = props.scrollPaddingBlockEnd ?? props.scrollPaddingBottom ?? props.scrollPaddingBlock ?? props.scrollPadding;
   * ```
   *
   * @see {@link SupportedStyleProps.scrollPaddingBlockEnd}
   */
  scrollPaddingBottom?: SupportedStyleProps['scrollPaddingBlockEnd'];

  /**
   * Alias for setting `scrollMarginInlineStart`:
   *
   * ```
   * scrollMarginInlineStart = props.scrollMarginInlineStart ?? props.scrollMarginLeft ?? props.scrollMarginInline ?? props.scrollMargin;
   * ```
   *
   * @see {@link SupportedStyleProps.scrollMarginInlineStart}
   */
  scrollMarginLeft?: SupportedStyleProps['scrollMarginInlineStart'];

  /**
   * Alias for setting `scrollMarginInlineStart` and `scrollMarginInlineEnd`:
   *
   * ```
   * scrollMarginInlineStart = props.scrollMarginInlineStart ?? props.scrollMarginLeft ?? props.scrollMarginInline ?? props.scrollMargin;
   * scrollMarginInlineEnd = props.scrollMarginInlineEnd ?? props.scrollMarginRight ?? props.scrollMarginInline ?? props.scrollMargin;
   * ```
   *
   * @see {@link SupportedStyleProps.scrollMarginInlineStart}
   * @see {@link SupportedStyleProps.scrollMarginInlineEnd}
   */
  scrollMarginInline?: SupportedStyleProps['scrollMarginInlineStart'];

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
   * @see {@link SupportedStyleProps.scrollMarginInlineStart}
   * @see {@link SupportedStyleProps.scrollMarginInlineEnd}
   * @see {@link SupportedStyleProps.scrollMarginBlockStart}
   * @see {@link SupportedStyleProps.scrollMarginBlockEnd}
   */
  scrollMargin?: SupportedStyleProps['scrollMarginInlineStart'];

  /**
   * Alias for setting `scrollMarginInlineEnd`:
   *
   * ```
   * scrollMarginInlineEnd = props.scrollMarginInlineEnd ?? props.scrollMarginRight ?? props.scrollMarginInline ?? props.scrollMargin;
   * ```
   *
   * @see {@link SupportedStyleProps.scrollMarginInlineEnd}
   */
  scrollMarginRight?: SupportedStyleProps['scrollMarginInlineEnd'];

  /**
   * Alias for setting `scrollMarginBlockStart`:
   *
   * ```
   * scrollMarginBlockStart = props.scrollMarginBlockStart ?? props.scrollMarginTop ?? props.scrollMarginBlock ?? props.scrollMargin;
   * ```
   *
   * @see {@link SupportedStyleProps.scrollMarginBlockStart}
   */
  scrollMarginTop?: SupportedStyleProps['scrollMarginBlockStart'];

  /**
   * Alias for setting `scrollMarginBlockStart` and `scrollMarginBlockEnd`:
   *
   * ```
   * scrollMarginBlockStart = props.scrollMarginBlockStart ?? props.scrollMarginTop ?? props.scrollMarginBlock ?? props.scrollMargin;
   * scrollMarginBlockEnd = props.scrollMarginBlockEnd ?? props.scrollMarginBottom ?? props.scrollMarginBlock ?? props.scrollMargin;
   * ```
   *
   * @see {@link SupportedStyleProps.scrollMarginBlockStart}
   * @see {@link SupportedStyleProps.scrollMarginBlockEnd}
   */
  scrollMarginBlock?: SupportedStyleProps['scrollMarginBlockStart'];

  /**
   * Alias for setting `scrollMarginBlockEnd`:
   *
   * ```
   * scrollMarginBlockEnd = props.scrollMarginBlockEnd ?? props.scrollMarginBottom ?? props.scrollMarginBlock ?? props.scrollMargin;
   * ```
   *
   * @see {@link SupportedStyleProps.scrollMarginBlockEnd}
   */
  scrollMarginBottom?: SupportedStyleProps['scrollMarginBlockEnd'];

  /**
   * Alias for setting `justifyItems`:
   *
   * ```
   * justifyItems = props.justifyItems ?? props.justify;
   * ```
   *
   * @see {@link SupportedStyleProps.justifyItems}
   */
  justify?: SupportedStyleProps['justifyItems'];

  /**
   * Alias for setting `alignItems`:
   *
   * ```
   * alignItems = props.alignItems ?? props.align;
   * ```
   *
   * @see {@link SupportedStyleProps.alignItems}
   */
  align?: SupportedStyleProps['alignItems'];
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
  | 'overflowX'
  | 'overflowY'
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
  | 'overflowX'
  | 'overflowY'
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
  overflowInline: ["overflowX","overflow"],
  overflowBlock: ["overflowY","overflow"],
  overscrollBehaviorInline: ["overscrollBehaviorX","overscrollBehavior"],
  overscrollBehaviorBlock: ["overscrollBehaviorY","overscrollBehavior"],
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
} satisfies { [K in keyof SupportedCSSStyleProps]?: (keyof StyleProps)[] };

// Extract a unique set of just the alias names
export const stylePropAliasNames: (keyof StyleProps)[] = Array.from(
  new Set(Object.values(stylePropAliasFallbacks).flat())
);

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
  outlineStyle: (props) =>
      props.outlineWidth || props.outlineColor ? 'solid' : undefined,
} satisfies {
  [K in keyof StyleProps]?:
    | StyleProps[K]
    | undefined
    | ((props: ResponsiveStyleProps) => StyleProps[K] | undefined)
};

/**
 * A list of values that if passed to any styleProp on our Box component should
 * warn the user, and bail early from the css property injection procedure. We
 * do this as there is no good way for us to explicitly disallow this string
 * literal in our types holistically for every style property.
 */
export const disallowedCSSPropertyValues = [
  "inherit",
  "initial",
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
  borderBlockStartWidth: "border-width",
  borderBlockEndWidth: "border-width",
  borderInlineStartWidth: "border-width",
  borderInlineEndWidth: "border-width",
  backgroundColor: "color",
  color: "color",
  fontSize: "font",
  lineHeight: "font",
  fontWeight: "font",
  fontFamily: "font",
  letterSpacing: "font",
  blockSize: "height",
  minBlockSize: "height",
  maxBlockSize: "height",
  containIntrinsicBlockSize: "height",
  inlineSize: "width",
  minInlineSize: "width",
  maxInlineSize: "width",
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
  width: "width",
  size: "width",
  height: "height",
  minWidth: "width",
  minSize: "width",
  minHeight: "height",
  maxWidth: "width",
  maxSize: "width",
  maxHeight: "height",
  containIntrinsicWidth: "width",
  containIntrinsicSize: "width",
  containIntrinsicHeight: "height",
  borderTopLeftRadius: "border-radius",
  borderRadius: "border-radius",
  borderTopRightRadius: "border-radius",
  borderBottomLeftRadius: "border-radius",
  borderBottomRightRadius: "border-radius",
  borderLeftWidth: "border-width",
  borderInlineWidth: "border-width",
  borderWidth: "border-width",
  borderRightWidth: "border-width",
  borderTopWidth: "border-width",
  borderBlockWidth: "border-width",
  borderBottomWidth: "border-width",
} as const;
