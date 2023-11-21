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
   * Fallback for `rowGap` and `columnGap`.
   *
   * ```
   * rowGap = props.rowGap ?? props.gap;
   * columnGap = props.columnGap ?? props.gap;
   * ```
   */
  gap?: SupportedStyleProps['rowGap'];

  /**
   * Fallback for `paddingInlineStart`.
   *
   * ```
   * paddingInlineStart = props.paddingInlineStart ?? props.paddingLeft ?? props.paddingInline ?? props.padding;
   * ```
   */
  paddingLeft?: SupportedStyleProps['paddingInlineStart'];

  /**
   * Fallback for `paddingInlineStart` and `paddingInlineEnd`.
   *
   * ```
   * paddingInlineStart = props.paddingInlineStart ?? props.paddingLeft ?? props.paddingInline ?? props.padding;
   * paddingInlineEnd = props.paddingInlineEnd ?? props.paddingRight ?? props.paddingInline ?? props.padding;
   * ```
   */
  paddingInline?: SupportedStyleProps['paddingInlineStart'];

  /**
   * Fallback for `paddingInlineStart`, `paddingInlineEnd`, `paddingBlockStart` and `paddingBlockEnd`.
   *
   * ```
   * paddingInlineStart = props.paddingInlineStart ?? props.paddingLeft ?? props.paddingInline ?? props.padding;
   * paddingInlineEnd = props.paddingInlineEnd ?? props.paddingRight ?? props.paddingInline ?? props.padding;
   * paddingBlockStart = props.paddingBlockStart ?? props.paddingTop ?? props.paddingBlock ?? props.padding;
   * paddingBlockEnd = props.paddingBlockEnd ?? props.paddingBottom ?? props.paddingBlock ?? props.padding;
   * ```
   */
  padding?: SupportedStyleProps['paddingInlineStart'];

  /**
   * Fallback for `paddingInlineEnd`.
   *
   * ```
   * paddingInlineEnd = props.paddingInlineEnd ?? props.paddingRight ?? props.paddingInline ?? props.padding;
   * ```
   */
  paddingRight?: SupportedStyleProps['paddingInlineEnd'];

  /**
   * Fallback for `paddingBlockStart`.
   *
   * ```
   * paddingBlockStart = props.paddingBlockStart ?? props.paddingTop ?? props.paddingBlock ?? props.padding;
   * ```
   */
  paddingTop?: SupportedStyleProps['paddingBlockStart'];

  /**
   * Fallback for `paddingBlockStart` and `paddingBlockEnd`.
   *
   * ```
   * paddingBlockStart = props.paddingBlockStart ?? props.paddingTop ?? props.paddingBlock ?? props.padding;
   * paddingBlockEnd = props.paddingBlockEnd ?? props.paddingBottom ?? props.paddingBlock ?? props.padding;
   * ```
   */
  paddingBlock?: SupportedStyleProps['paddingBlockStart'];

  /**
   * Fallback for `paddingBlockEnd`.
   *
   * ```
   * paddingBlockEnd = props.paddingBlockEnd ?? props.paddingBottom ?? props.paddingBlock ?? props.padding;
   * ```
   */
  paddingBottom?: SupportedStyleProps['paddingBlockEnd'];

  /**
   * Fallback for `marginInlineStart`.
   *
   * ```
   * marginInlineStart = props.marginInlineStart ?? props.marginLeft ?? props.marginInline ?? props.margin;
   * ```
   */
  marginLeft?: SupportedStyleProps['marginInlineStart'];

  /**
   * Fallback for `marginInlineStart` and `marginInlineEnd`.
   *
   * ```
   * marginInlineStart = props.marginInlineStart ?? props.marginLeft ?? props.marginInline ?? props.margin;
   * marginInlineEnd = props.marginInlineEnd ?? props.marginRight ?? props.marginInline ?? props.margin;
   * ```
   */
  marginInline?: SupportedStyleProps['marginInlineStart'];

  /**
   * Fallback for `marginInlineStart`, `marginInlineEnd`, `marginBlockStart` and `marginBlockEnd`.
   *
   * ```
   * marginInlineStart = props.marginInlineStart ?? props.marginLeft ?? props.marginInline ?? props.margin;
   * marginInlineEnd = props.marginInlineEnd ?? props.marginRight ?? props.marginInline ?? props.margin;
   * marginBlockStart = props.marginBlockStart ?? props.marginTop ?? props.marginBlock ?? props.margin;
   * marginBlockEnd = props.marginBlockEnd ?? props.marginBottom ?? props.marginBlock ?? props.margin;
   * ```
   */
  margin?: SupportedStyleProps['marginInlineStart'];

  /**
   * Fallback for `marginInlineEnd`.
   *
   * ```
   * marginInlineEnd = props.marginInlineEnd ?? props.marginRight ?? props.marginInline ?? props.margin;
   * ```
   */
  marginRight?: SupportedStyleProps['marginInlineEnd'];

  /**
   * Fallback for `marginBlockStart`.
   *
   * ```
   * marginBlockStart = props.marginBlockStart ?? props.marginTop ?? props.marginBlock ?? props.margin;
   * ```
   */
  marginTop?: SupportedStyleProps['marginBlockStart'];

  /**
   * Fallback for `marginBlockStart` and `marginBlockEnd`.
   *
   * ```
   * marginBlockStart = props.marginBlockStart ?? props.marginTop ?? props.marginBlock ?? props.margin;
   * marginBlockEnd = props.marginBlockEnd ?? props.marginBottom ?? props.marginBlock ?? props.margin;
   * ```
   */
  marginBlock?: SupportedStyleProps['marginBlockStart'];

  /**
   * Fallback for `marginBlockEnd`.
   *
   * ```
   * marginBlockEnd = props.marginBlockEnd ?? props.marginBottom ?? props.marginBlock ?? props.margin;
   * ```
   */
  marginBottom?: SupportedStyleProps['marginBlockEnd'];

  /**
   * Fallback for `inlineSize`.
   *
   * ```
   * inlineSize = props.inlineSize ?? props.width ?? props.size;
   * ```
   */
  width?: SupportedStyleProps['inlineSize'];

  /**
   * Fallback for `inlineSize` and `blockSize`.
   *
   * ```
   * inlineSize = props.inlineSize ?? props.width ?? props.size;
   * blockSize = props.blockSize ?? props.height ?? props.size;
   * ```
   */
  size?: SupportedStyleProps['inlineSize'];

  /**
   * Fallback for `blockSize`.
   *
   * ```
   * blockSize = props.blockSize ?? props.height ?? props.size;
   * ```
   */
  height?: SupportedStyleProps['blockSize'];

  /**
   * Fallback for `minInlineSize`.
   *
   * ```
   * minInlineSize = props.minInlineSize ?? props.minWidth ?? props.minSize;
   * ```
   */
  minWidth?: SupportedStyleProps['minInlineSize'];

  /**
   * Fallback for `minInlineSize` and `minBlockSize`.
   *
   * ```
   * minInlineSize = props.minInlineSize ?? props.minWidth ?? props.minSize;
   * minBlockSize = props.minBlockSize ?? props.minHeight ?? props.minSize;
   * ```
   */
  minSize?: Exclude<
    SupportedStyleProps['minInlineSize'],
    '-moz-fit-content'
  >;

  /**
   * Fallback for `minBlockSize`.
   *
   * ```
   * minBlockSize = props.minBlockSize ?? props.minHeight ?? props.minSize;
   * ```
   */
  minHeight?: SupportedStyleProps['minBlockSize'];

  /**
   * Fallback for `maxInlineSize`.
   *
   * ```
   * maxInlineSize = props.maxInlineSize ?? props.maxWidth ?? props.maxSize;
   * ```
   */
  maxWidth?: SupportedStyleProps['maxInlineSize'];

  /**
   * Fallback for `maxInlineSize` and `maxBlockSize`.
   *
   * ```
   * maxInlineSize = props.maxInlineSize ?? props.maxWidth ?? props.maxSize;
   * maxBlockSize = props.maxBlockSize ?? props.maxHeight ?? props.maxSize;
   * ```
   */
  maxSize?: Exclude<
    SupportedStyleProps['maxInlineSize'],
    '-moz-fit-content'
  >;

  /**
   * Fallback for `maxBlockSize`.
   *
   * ```
   * maxBlockSize = props.maxBlockSize ?? props.maxHeight ?? props.maxSize;
   * ```
   */
  maxHeight?: SupportedStyleProps['maxBlockSize'];

  /**
   * Fallback for `containIntrinsicInlineSize`.
   *
   * ```
   * containIntrinsicInlineSize = props.containIntrinsicInlineSize ?? props.containIntrinsicWidth ?? props.containIntrinsicSize;
   * ```
   */
  containIntrinsicWidth?: SupportedStyleProps['containIntrinsicInlineSize'];

  /**
   * Fallback for `containIntrinsicInlineSize` and `containIntrinsicBlockSize`.
   *
   * ```
   * containIntrinsicInlineSize = props.containIntrinsicInlineSize ?? props.containIntrinsicWidth ?? props.containIntrinsicSize;
   * containIntrinsicBlockSize = props.containIntrinsicBlockSize ?? props.containIntrinsicHeight ?? props.containIntrinsicSize;
   * ```
   */
  containIntrinsicSize?: SupportedStyleProps['containIntrinsicInlineSize'];

  /**
   * Fallback for `containIntrinsicBlockSize`.
   *
   * ```
   * containIntrinsicBlockSize = props.containIntrinsicBlockSize ?? props.containIntrinsicHeight ?? props.containIntrinsicSize;
   * ```
   */
  containIntrinsicHeight?: SupportedStyleProps['containIntrinsicBlockSize'];

  /**
   * Fallback for `overflowInline`.
   *
   * ```
   * overflowInline = props.overflowInline ?? props.overflowX ?? props.overflow;
   * ```
   */
  overflowX?: SupportedStyleProps['overflowInline'];

  /**
   * Fallback for `overflowInline` and `overflowBlock`.
   *
   * ```
   * overflowInline = props.overflowInline ?? props.overflowX ?? props.overflow;
   * overflowBlock = props.overflowBlock ?? props.overflowY ?? props.overflow;
   * ```
   */
  overflow?: SupportedStyleProps['overflowInline'];

  /**
   * Fallback for `overflowBlock`.
   *
   * ```
   * overflowBlock = props.overflowBlock ?? props.overflowY ?? props.overflow;
   * ```
   */
  overflowY?: SupportedStyleProps['overflowBlock'];

  /**
   * Fallback for `overscrollBehaviorInline`.
   *
   * ```
   * overscrollBehaviorInline = props.overscrollBehaviorInline ?? props.overscrollBehaviorX ?? props.overscrollBehavior;
   * ```
   */
  overscrollBehaviorX?: SupportedStyleProps['overscrollBehaviorInline'];

  /**
   * Fallback for `overscrollBehaviorInline` and `overscrollBehaviorBlock`.
   *
   * ```
   * overscrollBehaviorInline = props.overscrollBehaviorInline ?? props.overscrollBehaviorX ?? props.overscrollBehavior;
   * overscrollBehaviorBlock = props.overscrollBehaviorBlock ?? props.overscrollBehaviorY ?? props.overscrollBehavior;
   * ```
   */
  overscrollBehavior?: SupportedStyleProps['overscrollBehaviorInline'];

  /**
   * Fallback for `overscrollBehaviorBlock`.
   *
   * ```
   * overscrollBehaviorBlock = props.overscrollBehaviorBlock ?? props.overscrollBehaviorY ?? props.overscrollBehavior;
   * ```
   */
  overscrollBehaviorY?: SupportedStyleProps['overscrollBehaviorBlock'];

  /**
   * Fallback for `backgroundPositionX` and `backgroundPositionY`.
   *
   * ```
   * backgroundPositionX = props.backgroundPositionX ?? props.backgroundPosition;
   * backgroundPositionY = props.backgroundPositionY ?? props.backgroundPosition;
   * ```
   */
  backgroundPosition?: Exclude<
    SupportedStyleProps['backgroundPositionX'],
    'left'
    | 'right'
    | 'x-end'
    | 'x-start'
  >;

  /**
   * Fallback for `borderStartStartRadius`.
   *
   * ```
   * borderStartStartRadius = props.borderStartStartRadius ?? props.borderTopLeftRadius ?? props.borderRadius;
   * ```
   */
  borderTopLeftRadius?: SupportedStyleProps['borderStartStartRadius'];

  /**
   * Fallback for `borderStartStartRadius`, `borderStartEndRadius`, `borderEndStartRadius` and `borderEndEndRadius`.
   *
   * ```
   * borderStartStartRadius = props.borderStartStartRadius ?? props.borderTopLeftRadius ?? props.borderRadius;
   * borderStartEndRadius = props.borderStartEndRadius ?? props.borderTopRightRadius ?? props.borderRadius;
   * borderEndStartRadius = props.borderEndStartRadius ?? props.borderBottomLeftRadius ?? props.borderRadius;
   * borderEndEndRadius = props.borderEndEndRadius ?? props.borderBottomRightRadius ?? props.borderRadius;
   * ```
   */
  borderRadius?: SupportedStyleProps['borderStartStartRadius'];

  /**
   * Fallback for `borderStartEndRadius`.
   *
   * ```
   * borderStartEndRadius = props.borderStartEndRadius ?? props.borderTopRightRadius ?? props.borderRadius;
   * ```
   */
  borderTopRightRadius?: SupportedStyleProps['borderStartEndRadius'];

  /**
   * Fallback for `borderEndStartRadius`.
   *
   * ```
   * borderEndStartRadius = props.borderEndStartRadius ?? props.borderBottomLeftRadius ?? props.borderRadius;
   * ```
   */
  borderBottomLeftRadius?: SupportedStyleProps['borderEndStartRadius'];

  /**
   * Fallback for `borderEndEndRadius`.
   *
   * ```
   * borderEndEndRadius = props.borderEndEndRadius ?? props.borderBottomRightRadius ?? props.borderRadius;
   * ```
   */
  borderBottomRightRadius?: SupportedStyleProps['borderEndEndRadius'];

  /**
   * Fallback for `borderInlineStartColor`.
   *
   * ```
   * borderInlineStartColor = props.borderInlineStartColor ?? props.borderLeftColor ?? props.borderInlineColor ?? props.borderColor;
   * ```
   */
  borderLeftColor?: SupportedStyleProps['borderInlineStartColor'];

  /**
   * Fallback for `borderInlineStartColor` and `borderInlineEndColor`.
   *
   * ```
   * borderInlineStartColor = props.borderInlineStartColor ?? props.borderLeftColor ?? props.borderInlineColor ?? props.borderColor;
   * borderInlineEndColor = props.borderInlineEndColor ?? props.borderRightColor ?? props.borderInlineColor ?? props.borderColor;
   * ```
   */
  borderInlineColor?: SupportedStyleProps['borderInlineStartColor'];

  /**
   * Fallback for `borderInlineStartColor`, `borderInlineEndColor`, `borderBlockStartColor` and `borderBlockEndColor`.
   *
   * ```
   * borderInlineStartColor = props.borderInlineStartColor ?? props.borderLeftColor ?? props.borderInlineColor ?? props.borderColor;
   * borderInlineEndColor = props.borderInlineEndColor ?? props.borderRightColor ?? props.borderInlineColor ?? props.borderColor;
   * borderBlockStartColor = props.borderBlockStartColor ?? props.borderTopColor ?? props.borderBlockColor ?? props.borderColor;
   * borderBlockEndColor = props.borderBlockEndColor ?? props.borderBottomColor ?? props.borderBlockColor ?? props.borderColor;
   * ```
   */
  borderColor?: SupportedStyleProps['borderInlineStartColor'];

  /**
   * Fallback for `borderInlineEndColor`.
   *
   * ```
   * borderInlineEndColor = props.borderInlineEndColor ?? props.borderRightColor ?? props.borderInlineColor ?? props.borderColor;
   * ```
   */
  borderRightColor?: SupportedStyleProps['borderInlineEndColor'];

  /**
   * Fallback for `borderBlockStartColor`.
   *
   * ```
   * borderBlockStartColor = props.borderBlockStartColor ?? props.borderTopColor ?? props.borderBlockColor ?? props.borderColor;
   * ```
   */
  borderTopColor?: SupportedStyleProps['borderBlockStartColor'];

  /**
   * Fallback for `borderBlockStartColor` and `borderBlockEndColor`.
   *
   * ```
   * borderBlockStartColor = props.borderBlockStartColor ?? props.borderTopColor ?? props.borderBlockColor ?? props.borderColor;
   * borderBlockEndColor = props.borderBlockEndColor ?? props.borderBottomColor ?? props.borderBlockColor ?? props.borderColor;
   * ```
   */
  borderBlockColor?: SupportedStyleProps['borderBlockStartColor'];

  /**
   * Fallback for `borderBlockEndColor`.
   *
   * ```
   * borderBlockEndColor = props.borderBlockEndColor ?? props.borderBottomColor ?? props.borderBlockColor ?? props.borderColor;
   * ```
   */
  borderBottomColor?: SupportedStyleProps['borderBlockEndColor'];

  /**
   * Fallback for `borderInlineStartStyle`.
   *
   * ```
   * borderInlineStartStyle = props.borderInlineStartStyle ?? props.borderLeftStyle ?? props.borderInlineStyle ?? props.borderStyle;
   * ```
   */
  borderLeftStyle?: SupportedStyleProps['borderInlineStartStyle'];

  /**
   * Fallback for `borderInlineStartStyle` and `borderInlineEndStyle`.
   *
   * ```
   * borderInlineStartStyle = props.borderInlineStartStyle ?? props.borderLeftStyle ?? props.borderInlineStyle ?? props.borderStyle;
   * borderInlineEndStyle = props.borderInlineEndStyle ?? props.borderRightStyle ?? props.borderInlineStyle ?? props.borderStyle;
   * ```
   */
  borderInlineStyle?: SupportedStyleProps['borderInlineStartStyle'];

  /**
   * Fallback for `borderInlineStartStyle`, `borderInlineEndStyle`, `borderBlockStartStyle` and `borderBlockEndStyle`.
   *
   * ```
   * borderInlineStartStyle = props.borderInlineStartStyle ?? props.borderLeftStyle ?? props.borderInlineStyle ?? props.borderStyle;
   * borderInlineEndStyle = props.borderInlineEndStyle ?? props.borderRightStyle ?? props.borderInlineStyle ?? props.borderStyle;
   * borderBlockStartStyle = props.borderBlockStartStyle ?? props.borderTopStyle ?? props.borderBlockStyle ?? props.borderStyle;
   * borderBlockEndStyle = props.borderBlockEndStyle ?? props.borderBottomStyle ?? props.borderBlockStyle ?? props.borderStyle;
   * ```
   */
  borderStyle?: SupportedStyleProps['borderInlineStartStyle'];

  /**
   * Fallback for `borderInlineEndStyle`.
   *
   * ```
   * borderInlineEndStyle = props.borderInlineEndStyle ?? props.borderRightStyle ?? props.borderInlineStyle ?? props.borderStyle;
   * ```
   */
  borderRightStyle?: SupportedStyleProps['borderInlineEndStyle'];

  /**
   * Fallback for `borderBlockStartStyle`.
   *
   * ```
   * borderBlockStartStyle = props.borderBlockStartStyle ?? props.borderTopStyle ?? props.borderBlockStyle ?? props.borderStyle;
   * ```
   */
  borderTopStyle?: SupportedStyleProps['borderBlockStartStyle'];

  /**
   * Fallback for `borderBlockStartStyle` and `borderBlockEndStyle`.
   *
   * ```
   * borderBlockStartStyle = props.borderBlockStartStyle ?? props.borderTopStyle ?? props.borderBlockStyle ?? props.borderStyle;
   * borderBlockEndStyle = props.borderBlockEndStyle ?? props.borderBottomStyle ?? props.borderBlockStyle ?? props.borderStyle;
   * ```
   */
  borderBlockStyle?: SupportedStyleProps['borderBlockStartStyle'];

  /**
   * Fallback for `borderBlockEndStyle`.
   *
   * ```
   * borderBlockEndStyle = props.borderBlockEndStyle ?? props.borderBottomStyle ?? props.borderBlockStyle ?? props.borderStyle;
   * ```
   */
  borderBottomStyle?: SupportedStyleProps['borderBlockEndStyle'];

  /**
   * Fallback for `borderInlineStartWidth`.
   *
   * ```
   * borderInlineStartWidth = props.borderInlineStartWidth ?? props.borderLeftWidth ?? props.borderInlineWidth ?? props.borderWidth;
   * ```
   */
  borderLeftWidth?: SupportedStyleProps['borderInlineStartWidth'];

  /**
   * Fallback for `borderInlineStartWidth` and `borderInlineEndWidth`.
   *
   * ```
   * borderInlineStartWidth = props.borderInlineStartWidth ?? props.borderLeftWidth ?? props.borderInlineWidth ?? props.borderWidth;
   * borderInlineEndWidth = props.borderInlineEndWidth ?? props.borderRightWidth ?? props.borderInlineWidth ?? props.borderWidth;
   * ```
   */
  borderInlineWidth?: SupportedStyleProps['borderInlineStartWidth'];

  /**
   * Fallback for `borderInlineStartWidth`, `borderInlineEndWidth`, `borderBlockStartWidth` and `borderBlockEndWidth`.
   *
   * ```
   * borderInlineStartWidth = props.borderInlineStartWidth ?? props.borderLeftWidth ?? props.borderInlineWidth ?? props.borderWidth;
   * borderInlineEndWidth = props.borderInlineEndWidth ?? props.borderRightWidth ?? props.borderInlineWidth ?? props.borderWidth;
   * borderBlockStartWidth = props.borderBlockStartWidth ?? props.borderTopWidth ?? props.borderBlockWidth ?? props.borderWidth;
   * borderBlockEndWidth = props.borderBlockEndWidth ?? props.borderBottomWidth ?? props.borderBlockWidth ?? props.borderWidth;
   * ```
   */
  borderWidth?: SupportedStyleProps['borderInlineStartWidth'];

  /**
   * Fallback for `borderInlineEndWidth`.
   *
   * ```
   * borderInlineEndWidth = props.borderInlineEndWidth ?? props.borderRightWidth ?? props.borderInlineWidth ?? props.borderWidth;
   * ```
   */
  borderRightWidth?: SupportedStyleProps['borderInlineEndWidth'];

  /**
   * Fallback for `borderBlockStartWidth`.
   *
   * ```
   * borderBlockStartWidth = props.borderBlockStartWidth ?? props.borderTopWidth ?? props.borderBlockWidth ?? props.borderWidth;
   * ```
   */
  borderTopWidth?: SupportedStyleProps['borderBlockStartWidth'];

  /**
   * Fallback for `borderBlockStartWidth` and `borderBlockEndWidth`.
   *
   * ```
   * borderBlockStartWidth = props.borderBlockStartWidth ?? props.borderTopWidth ?? props.borderBlockWidth ?? props.borderWidth;
   * borderBlockEndWidth = props.borderBlockEndWidth ?? props.borderBottomWidth ?? props.borderBlockWidth ?? props.borderWidth;
   * ```
   */
  borderBlockWidth?: SupportedStyleProps['borderBlockStartWidth'];

  /**
   * Fallback for `borderBlockEndWidth`.
   *
   * ```
   * borderBlockEndWidth = props.borderBlockEndWidth ?? props.borderBottomWidth ?? props.borderBlockWidth ?? props.borderWidth;
   * ```
   */
  borderBottomWidth?: SupportedStyleProps['borderBlockEndWidth'];

  /**
   * Fallback for `insetInlineStart`.
   *
   * ```
   * insetInlineStart = props.insetInlineStart ?? props.left ?? props.insetInline ?? props.inset;
   * ```
   */
  left?: SupportedStyleProps['insetInlineStart'];

  /**
   * Fallback for `insetInlineStart` and `insetInlineEnd`.
   *
   * ```
   * insetInlineStart = props.insetInlineStart ?? props.left ?? props.insetInline ?? props.inset;
   * insetInlineEnd = props.insetInlineEnd ?? props.right ?? props.insetInline ?? props.inset;
   * ```
   */
  insetInline?: SupportedStyleProps['insetInlineStart'];

  /**
   * Fallback for `insetInlineStart`, `insetInlineEnd`, `insetBlockStart` and `insetBlockEnd`.
   *
   * ```
   * insetInlineStart = props.insetInlineStart ?? props.left ?? props.insetInline ?? props.inset;
   * insetInlineEnd = props.insetInlineEnd ?? props.right ?? props.insetInline ?? props.inset;
   * insetBlockStart = props.insetBlockStart ?? props.top ?? props.insetBlock ?? props.inset;
   * insetBlockEnd = props.insetBlockEnd ?? props.bottom ?? props.insetBlock ?? props.inset;
   * ```
   */
  inset?: SupportedStyleProps['insetInlineStart'];

  /**
   * Fallback for `insetInlineEnd`.
   *
   * ```
   * insetInlineEnd = props.insetInlineEnd ?? props.right ?? props.insetInline ?? props.inset;
   * ```
   */
  right?: SupportedStyleProps['insetInlineEnd'];

  /**
   * Fallback for `insetBlockStart`.
   *
   * ```
   * insetBlockStart = props.insetBlockStart ?? props.top ?? props.insetBlock ?? props.inset;
   * ```
   */
  top?: SupportedStyleProps['insetBlockStart'];

  /**
   * Fallback for `insetBlockStart` and `insetBlockEnd`.
   *
   * ```
   * insetBlockStart = props.insetBlockStart ?? props.top ?? props.insetBlock ?? props.inset;
   * insetBlockEnd = props.insetBlockEnd ?? props.bottom ?? props.insetBlock ?? props.inset;
   * ```
   */
  insetBlock?: SupportedStyleProps['insetBlockStart'];

  /**
   * Fallback for `insetBlockEnd`.
   *
   * ```
   * insetBlockEnd = props.insetBlockEnd ?? props.bottom ?? props.insetBlock ?? props.inset;
   * ```
   */
  bottom?: SupportedStyleProps['insetBlockEnd'];

  /**
   * Fallback for `scrollPaddingInlineStart`.
   *
   * ```
   * scrollPaddingInlineStart = props.scrollPaddingInlineStart ?? props.scrollPaddingLeft ?? props.scrollPaddingInline ?? props.scrollPadding;
   * ```
   */
  scrollPaddingLeft?: SupportedStyleProps['scrollPaddingInlineStart'];

  /**
   * Fallback for `scrollPaddingInlineStart` and `scrollPaddingInlineEnd`.
   *
   * ```
   * scrollPaddingInlineStart = props.scrollPaddingInlineStart ?? props.scrollPaddingLeft ?? props.scrollPaddingInline ?? props.scrollPadding;
   * scrollPaddingInlineEnd = props.scrollPaddingInlineEnd ?? props.scrollPaddingRight ?? props.scrollPaddingInline ?? props.scrollPadding;
   * ```
   */
  scrollPaddingInline?: SupportedStyleProps['scrollPaddingInlineStart'];

  /**
   * Fallback for `scrollPaddingInlineStart`, `scrollPaddingInlineEnd`, `scrollPaddingBlockStart` and `scrollPaddingBlockEnd`.
   *
   * ```
   * scrollPaddingInlineStart = props.scrollPaddingInlineStart ?? props.scrollPaddingLeft ?? props.scrollPaddingInline ?? props.scrollPadding;
   * scrollPaddingInlineEnd = props.scrollPaddingInlineEnd ?? props.scrollPaddingRight ?? props.scrollPaddingInline ?? props.scrollPadding;
   * scrollPaddingBlockStart = props.scrollPaddingBlockStart ?? props.scrollPaddingTop ?? props.scrollPaddingBlock ?? props.scrollPadding;
   * scrollPaddingBlockEnd = props.scrollPaddingBlockEnd ?? props.scrollPaddingBottom ?? props.scrollPaddingBlock ?? props.scrollPadding;
   * ```
   */
  scrollPadding?: SupportedStyleProps['scrollPaddingInlineStart'];

  /**
   * Fallback for `scrollPaddingInlineEnd`.
   *
   * ```
   * scrollPaddingInlineEnd = props.scrollPaddingInlineEnd ?? props.scrollPaddingRight ?? props.scrollPaddingInline ?? props.scrollPadding;
   * ```
   */
  scrollPaddingRight?: SupportedStyleProps['scrollPaddingInlineEnd'];

  /**
   * Fallback for `scrollPaddingBlockStart`.
   *
   * ```
   * scrollPaddingBlockStart = props.scrollPaddingBlockStart ?? props.scrollPaddingTop ?? props.scrollPaddingBlock ?? props.scrollPadding;
   * ```
   */
  scrollPaddingTop?: SupportedStyleProps['scrollPaddingBlockStart'];

  /**
   * Fallback for `scrollPaddingBlockStart` and `scrollPaddingBlockEnd`.
   *
   * ```
   * scrollPaddingBlockStart = props.scrollPaddingBlockStart ?? props.scrollPaddingTop ?? props.scrollPaddingBlock ?? props.scrollPadding;
   * scrollPaddingBlockEnd = props.scrollPaddingBlockEnd ?? props.scrollPaddingBottom ?? props.scrollPaddingBlock ?? props.scrollPadding;
   * ```
   */
  scrollPaddingBlock?: SupportedStyleProps['scrollPaddingBlockStart'];

  /**
   * Fallback for `scrollPaddingBlockEnd`.
   *
   * ```
   * scrollPaddingBlockEnd = props.scrollPaddingBlockEnd ?? props.scrollPaddingBottom ?? props.scrollPaddingBlock ?? props.scrollPadding;
   * ```
   */
  scrollPaddingBottom?: SupportedStyleProps['scrollPaddingBlockEnd'];

  /**
   * Fallback for `scrollMarginInlineStart`.
   *
   * ```
   * scrollMarginInlineStart = props.scrollMarginInlineStart ?? props.scrollMarginLeft ?? props.scrollMarginInline ?? props.scrollMargin;
   * ```
   */
  scrollMarginLeft?: SupportedStyleProps['scrollMarginInlineStart'];

  /**
   * Fallback for `scrollMarginInlineStart` and `scrollMarginInlineEnd`.
   *
   * ```
   * scrollMarginInlineStart = props.scrollMarginInlineStart ?? props.scrollMarginLeft ?? props.scrollMarginInline ?? props.scrollMargin;
   * scrollMarginInlineEnd = props.scrollMarginInlineEnd ?? props.scrollMarginRight ?? props.scrollMarginInline ?? props.scrollMargin;
   * ```
   */
  scrollMarginInline?: SupportedStyleProps['scrollMarginInlineStart'];

  /**
   * Fallback for `scrollMarginInlineStart`, `scrollMarginInlineEnd`, `scrollMarginBlockStart` and `scrollMarginBlockEnd`.
   *
   * ```
   * scrollMarginInlineStart = props.scrollMarginInlineStart ?? props.scrollMarginLeft ?? props.scrollMarginInline ?? props.scrollMargin;
   * scrollMarginInlineEnd = props.scrollMarginInlineEnd ?? props.scrollMarginRight ?? props.scrollMarginInline ?? props.scrollMargin;
   * scrollMarginBlockStart = props.scrollMarginBlockStart ?? props.scrollMarginTop ?? props.scrollMarginBlock ?? props.scrollMargin;
   * scrollMarginBlockEnd = props.scrollMarginBlockEnd ?? props.scrollMarginBottom ?? props.scrollMarginBlock ?? props.scrollMargin;
   * ```
   */
  scrollMargin?: SupportedStyleProps['scrollMarginInlineStart'];

  /**
   * Fallback for `scrollMarginInlineEnd`.
   *
   * ```
   * scrollMarginInlineEnd = props.scrollMarginInlineEnd ?? props.scrollMarginRight ?? props.scrollMarginInline ?? props.scrollMargin;
   * ```
   */
  scrollMarginRight?: SupportedStyleProps['scrollMarginInlineEnd'];

  /**
   * Fallback for `scrollMarginBlockStart`.
   *
   * ```
   * scrollMarginBlockStart = props.scrollMarginBlockStart ?? props.scrollMarginTop ?? props.scrollMarginBlock ?? props.scrollMargin;
   * ```
   */
  scrollMarginTop?: SupportedStyleProps['scrollMarginBlockStart'];

  /**
   * Fallback for `scrollMarginBlockStart` and `scrollMarginBlockEnd`.
   *
   * ```
   * scrollMarginBlockStart = props.scrollMarginBlockStart ?? props.scrollMarginTop ?? props.scrollMarginBlock ?? props.scrollMargin;
   * scrollMarginBlockEnd = props.scrollMarginBlockEnd ?? props.scrollMarginBottom ?? props.scrollMarginBlock ?? props.scrollMargin;
   * ```
   */
  scrollMarginBlock?: SupportedStyleProps['scrollMarginBlockStart'];

  /**
   * Fallback for `scrollMarginBlockEnd`.
   *
   * ```
   * scrollMarginBlockEnd = props.scrollMarginBlockEnd ?? props.scrollMarginBottom ?? props.scrollMarginBlock ?? props.scrollMargin;
   * ```
   */
  scrollMarginBottom?: SupportedStyleProps['scrollMarginBlockEnd'];

  /**
   * Fallback for `justifyItems`.
   *
   * ```
   * justifyItems = props.justifyItems ?? props.justify;
   * ```
   */
  justify?: SupportedStyleProps['justifyItems'];

  /**
   * Fallback for `alignItems`.
   *
   * ```
   * alignItems = props.alignItems ?? props.align;
   * ```
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
  "rowGap": ["gap"],
  "columnGap": ["gap"],
  "paddingInlineStart": ["paddingLeft","paddingInline","padding"],
  "paddingInlineEnd": ["paddingRight","paddingInline","padding"],
  "paddingBlockStart": ["paddingTop","paddingBlock","padding"],
  "paddingBlockEnd": ["paddingBottom","paddingBlock","padding"],
  "marginInlineStart": ["marginLeft","marginInline","margin"],
  "marginInlineEnd": ["marginRight","marginInline","margin"],
  "marginBlockStart": ["marginTop","marginBlock","margin"],
  "marginBlockEnd": ["marginBottom","marginBlock","margin"],
  "inlineSize": ["width","size"],
  "blockSize": ["height","size"],
  "minInlineSize": ["minWidth","minSize"],
  "minBlockSize": ["minHeight","minSize"],
  "maxInlineSize": ["maxWidth","maxSize"],
  "maxBlockSize": ["maxHeight","maxSize"],
  "containIntrinsicInlineSize": ["containIntrinsicWidth","containIntrinsicSize"],
  "containIntrinsicBlockSize": ["containIntrinsicHeight","containIntrinsicSize"],
  "overflowInline": ["overflowX","overflow"],
  "overflowBlock": ["overflowY","overflow"],
  "overscrollBehaviorInline": ["overscrollBehaviorX","overscrollBehavior"],
  "overscrollBehaviorBlock": ["overscrollBehaviorY","overscrollBehavior"],
  "backgroundPositionX": ["backgroundPosition"],
  "backgroundPositionY": ["backgroundPosition"],
  "borderStartStartRadius": ["borderTopLeftRadius","borderRadius"],
  "borderStartEndRadius": ["borderTopRightRadius","borderRadius"],
  "borderEndStartRadius": ["borderBottomLeftRadius","borderRadius"],
  "borderEndEndRadius": ["borderBottomRightRadius","borderRadius"],
  "borderInlineStartColor": ["borderLeftColor","borderInlineColor","borderColor"],
  "borderInlineEndColor": ["borderRightColor","borderInlineColor","borderColor"],
  "borderBlockStartColor": ["borderTopColor","borderBlockColor","borderColor"],
  "borderBlockEndColor": ["borderBottomColor","borderBlockColor","borderColor"],
  "borderInlineStartStyle": ["borderLeftStyle","borderInlineStyle","borderStyle"],
  "borderInlineEndStyle": ["borderRightStyle","borderInlineStyle","borderStyle"],
  "borderBlockStartStyle": ["borderTopStyle","borderBlockStyle","borderStyle"],
  "borderBlockEndStyle": ["borderBottomStyle","borderBlockStyle","borderStyle"],
  "borderInlineStartWidth": ["borderLeftWidth","borderInlineWidth","borderWidth"],
  "borderInlineEndWidth": ["borderRightWidth","borderInlineWidth","borderWidth"],
  "borderBlockStartWidth": ["borderTopWidth","borderBlockWidth","borderWidth"],
  "borderBlockEndWidth": ["borderBottomWidth","borderBlockWidth","borderWidth"],
  "insetInlineStart": ["left","insetInline","inset"],
  "insetInlineEnd": ["right","insetInline","inset"],
  "insetBlockStart": ["top","insetBlock","inset"],
  "insetBlockEnd": ["bottom","insetBlock","inset"],
  "scrollPaddingInlineStart": ["scrollPaddingLeft","scrollPaddingInline","scrollPadding"],
  "scrollPaddingInlineEnd": ["scrollPaddingRight","scrollPaddingInline","scrollPadding"],
  "scrollPaddingBlockStart": ["scrollPaddingTop","scrollPaddingBlock","scrollPadding"],
  "scrollPaddingBlockEnd": ["scrollPaddingBottom","scrollPaddingBlock","scrollPadding"],
  "scrollMarginInlineStart": ["scrollMarginLeft","scrollMarginInline","scrollMargin"],
  "scrollMarginInlineEnd": ["scrollMarginRight","scrollMarginInline","scrollMargin"],
  "scrollMarginBlockStart": ["scrollMarginTop","scrollMarginBlock","scrollMargin"],
  "scrollMarginBlockEnd": ["scrollMarginBottom","scrollMarginBlock","scrollMargin"],
  "justifyItems": ["justify"],
  "alignItems": ["align"],
} satisfies Partial<{ [K in keyof SupportedCSSStyleProps]: (keyof StyleProps)[] }>;

// Extract a unique set of just the alias names
export const stylePropAliasNames: (keyof StyleProps)[] = Array.from(
  new Set(Object.values(stylePropAliasFallbacks).flat())
);

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
  'borderStartStartRadius': "border-radius",
  'borderStartEndRadius': "border-radius",
  'borderEndStartRadius': "border-radius",
  'borderEndEndRadius': "border-radius",
  'borderBlockStartWidth': "border-width",
  'borderBlockEndWidth': "border-width",
  'borderInlineStartWidth': "border-width",
  'borderInlineEndWidth': "border-width",
  'backgroundColor': "color",
  'color': "color",
  'fontSize': "font",
  'lineHeight': "font",
  'fontWeight': "font",
  'fontFamily': "font",
  'letterSpacing': "font",
  'blockSize': "height",
  'minBlockSize': "height",
  'maxBlockSize': "height",
  'containIntrinsicBlockSize': "height",
  'inlineSize': "width",
  'minInlineSize': "width",
  'maxInlineSize': "width",
  'containIntrinsicInlineSize': "width",
  'boxShadow': "shadow",
  'marginInlineStart': "space",
  'marginInlineEnd': "space",
  'marginBlockStart': "space",
  'marginBlockEnd': "space",
  'paddingInlineStart': "space",
  'paddingInlineEnd': "space",
  'paddingBlockStart': "space",
  'paddingBlockEnd': "space",
  'rowGap': "space",
  'columnGap': "space",
  'transitionDuration': "motion-duration",
  'animationName': "motion-keyframes",
  'transitionTimingFunction': "motion",

  // Aliases
  'gap': "space",
  'paddingLeft': "space",
  'paddingInline': "space",
  'padding': "space",
  'paddingRight': "space",
  'paddingTop': "space",
  'paddingBlock': "space",
  'paddingBottom': "space",
  'marginLeft': "space",
  'marginInline': "space",
  'margin': "space",
  'marginRight': "space",
  'marginTop': "space",
  'marginBlock': "space",
  'marginBottom': "space",
  'width': "width",
  'size': "width",
  'height': "height",
  'minWidth': "width",
  'minSize': "width",
  'minHeight': "height",
  'maxWidth': "width",
  'maxSize': "width",
  'maxHeight': "height",
  'containIntrinsicWidth': "width",
  'containIntrinsicSize': "width",
  'containIntrinsicHeight': "height",
  'borderTopLeftRadius': "border-radius",
  'borderRadius': "border-radius",
  'borderTopRightRadius': "border-radius",
  'borderBottomLeftRadius': "border-radius",
  'borderBottomRightRadius': "border-radius",
  'borderLeftWidth': "border-width",
  'borderInlineWidth': "border-width",
  'borderWidth': "border-width",
  'borderRightWidth': "border-width",
  'borderTopWidth': "border-width",
  'borderBlockWidth': "border-width",
  'borderBottomWidth': "border-width",
} as const;
