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
// TODO: Wrap these in PropertyValue<type> | (string & {})?
type StylePropAliases = {
  /**
   * Fallback for `rowGap` and `columnGap`:
   * props.rowGap = props.rowGap ?? props.gap
   * props.columnGap = props.columnGap ?? props.gap
   */
  gap?: SupportedStyleProps['rowGap'];

  /**
   * Fallback for `paddingInlineStart`:
   * props.paddingInlineStart = props.paddingInlineStart ?? props.paddingLeft ?? props.paddingInline ?? props.padding
   */
  paddingLeft?: SupportedStyleProps['paddingInlineStart'];

  /**
   * Fallback for `paddingInlineStart` and `paddingInlineEnd`:
   * props.paddingInlineStart = props.paddingInlineStart ?? props.paddingLeft ?? props.paddingInline ?? props.padding
   * props.paddingInlineEnd = props.paddingInlineEnd ?? props.paddingRight ?? props.paddingInline ?? props.padding
   */
  paddingInline?: SupportedStyleProps['paddingInlineStart'];

  /**
   * Fallback for `paddingInlineStart`, `paddingInlineEnd`, `paddingBlockStart` and `paddingBlockEnd`:
   * props.paddingInlineStart = props.paddingInlineStart ?? props.paddingLeft ?? props.paddingInline ?? props.padding
   * props.paddingInlineEnd = props.paddingInlineEnd ?? props.paddingRight ?? props.paddingInline ?? props.padding
   * props.paddingBlockStart = props.paddingBlockStart ?? props.paddingTop ?? props.paddingBlock ?? props.padding
   * props.paddingBlockEnd = props.paddingBlockEnd ?? props.paddingBottom ?? props.paddingBlock ?? props.padding
   */
  padding?: SupportedStyleProps['paddingInlineStart'];

  /**
   * Fallback for `paddingInlineEnd`:
   * props.paddingInlineEnd = props.paddingInlineEnd ?? props.paddingRight ?? props.paddingInline ?? props.padding
   */
  paddingRight?: SupportedStyleProps['paddingInlineEnd'];

  /**
   * Fallback for `paddingBlockStart`:
   * props.paddingBlockStart = props.paddingBlockStart ?? props.paddingTop ?? props.paddingBlock ?? props.padding
   */
  paddingTop?: SupportedStyleProps['paddingBlockStart'];

  /**
   * Fallback for `paddingBlockStart` and `paddingBlockEnd`:
   * props.paddingBlockStart = props.paddingBlockStart ?? props.paddingTop ?? props.paddingBlock ?? props.padding
   * props.paddingBlockEnd = props.paddingBlockEnd ?? props.paddingBottom ?? props.paddingBlock ?? props.padding
   */
  paddingBlock?: SupportedStyleProps['paddingBlockStart'];

  /**
   * Fallback for `paddingBlockEnd`:
   * props.paddingBlockEnd = props.paddingBlockEnd ?? props.paddingBottom ?? props.paddingBlock ?? props.padding
   */
  paddingBottom?: SupportedStyleProps['paddingBlockEnd'];

  /**
   * Fallback for `marginInlineStart`:
   * props.marginInlineStart = props.marginInlineStart ?? props.marginLeft ?? props.marginInline ?? props.margin
   */
  marginLeft?: SupportedStyleProps['marginInlineStart'];

  /**
   * Fallback for `marginInlineStart` and `marginInlineEnd`:
   * props.marginInlineStart = props.marginInlineStart ?? props.marginLeft ?? props.marginInline ?? props.margin
   * props.marginInlineEnd = props.marginInlineEnd ?? props.marginRight ?? props.marginInline ?? props.margin
   */
  marginInline?: SupportedStyleProps['marginInlineStart'];

  /**
   * Fallback for `marginInlineStart`, `marginInlineEnd`, `marginBlockStart` and `marginBlockEnd`:
   * props.marginInlineStart = props.marginInlineStart ?? props.marginLeft ?? props.marginInline ?? props.margin
   * props.marginInlineEnd = props.marginInlineEnd ?? props.marginRight ?? props.marginInline ?? props.margin
   * props.marginBlockStart = props.marginBlockStart ?? props.marginTop ?? props.marginBlock ?? props.margin
   * props.marginBlockEnd = props.marginBlockEnd ?? props.marginBottom ?? props.marginBlock ?? props.margin
   */
  margin?: SupportedStyleProps['marginInlineStart'];

  /**
   * Fallback for `marginInlineEnd`:
   * props.marginInlineEnd = props.marginInlineEnd ?? props.marginRight ?? props.marginInline ?? props.margin
   */
  marginRight?: SupportedStyleProps['marginInlineEnd'];

  /**
   * Fallback for `marginBlockStart`:
   * props.marginBlockStart = props.marginBlockStart ?? props.marginTop ?? props.marginBlock ?? props.margin
   */
  marginTop?: SupportedStyleProps['marginBlockStart'];

  /**
   * Fallback for `marginBlockStart` and `marginBlockEnd`:
   * props.marginBlockStart = props.marginBlockStart ?? props.marginTop ?? props.marginBlock ?? props.margin
   * props.marginBlockEnd = props.marginBlockEnd ?? props.marginBottom ?? props.marginBlock ?? props.margin
   */
  marginBlock?: SupportedStyleProps['marginBlockStart'];

  /**
   * Fallback for `marginBlockEnd`:
   * props.marginBlockEnd = props.marginBlockEnd ?? props.marginBottom ?? props.marginBlock ?? props.margin
   */
  marginBottom?: SupportedStyleProps['marginBlockEnd'];

  /**
   * Fallback for `inlineSize`:
   * props.inlineSize = props.inlineSize ?? props.width ?? props.size
   */
  width?: SupportedStyleProps['inlineSize'];

  /**
   * Fallback for `inlineSize` and `blockSize`:
   * props.inlineSize = props.inlineSize ?? props.width ?? props.size
   * props.blockSize = props.blockSize ?? props.height ?? props.size
   */
  size?: SupportedStyleProps['inlineSize'];

  /**
   * Fallback for `blockSize`:
   * props.blockSize = props.blockSize ?? props.height ?? props.size
   */
  height?: SupportedStyleProps['blockSize'];

  /**
   * Fallback for `minInlineSize`:
   * props.minInlineSize = props.minInlineSize ?? props.minWidth ?? props.minSize
   */
  minWidth?: SupportedStyleProps['minInlineSize'];

  /**
   * Fallback for `minInlineSize` and `minBlockSize`:
   * props.minInlineSize = props.minInlineSize ?? props.minWidth ?? props.minSize
   * props.minBlockSize = props.minBlockSize ?? props.minHeight ?? props.minSize
   */
  minSize?: SupportedStyleProps['minInlineSize'];

  /**
   * Fallback for `minBlockSize`:
   * props.minBlockSize = props.minBlockSize ?? props.minHeight ?? props.minSize
   */
  minHeight?: SupportedStyleProps['minBlockSize'];

  /**
   * Fallback for `maxInlineSize`:
   * props.maxInlineSize = props.maxInlineSize ?? props.maxWidth ?? props.maxSize
   */
  maxWidth?: SupportedStyleProps['maxInlineSize'];

  /**
   * Fallback for `maxInlineSize` and `maxBlockSize`:
   * props.maxInlineSize = props.maxInlineSize ?? props.maxWidth ?? props.maxSize
   * props.maxBlockSize = props.maxBlockSize ?? props.maxHeight ?? props.maxSize
   */
  maxSize?: SupportedStyleProps['maxInlineSize'];

  /**
   * Fallback for `maxBlockSize`:
   * props.maxBlockSize = props.maxBlockSize ?? props.maxHeight ?? props.maxSize
   */
  maxHeight?: SupportedStyleProps['maxBlockSize'];

  /**
   * Fallback for `containIntrinsicInlineSize`:
   * props.containIntrinsicInlineSize = props.containIntrinsicInlineSize ?? props.containIntrinsicWidth ?? props.containIntrinsicSize
   */
  containIntrinsicWidth?: SupportedStyleProps['containIntrinsicInlineSize'];

  /**
   * Fallback for `containIntrinsicInlineSize` and `containIntrinsicBlockSize`:
   * props.containIntrinsicInlineSize = props.containIntrinsicInlineSize ?? props.containIntrinsicWidth ?? props.containIntrinsicSize
   * props.containIntrinsicBlockSize = props.containIntrinsicBlockSize ?? props.containIntrinsicHeight ?? props.containIntrinsicSize
   */
  containIntrinsicSize?: SupportedStyleProps['containIntrinsicInlineSize'];

  /**
   * Fallback for `containIntrinsicBlockSize`:
   * props.containIntrinsicBlockSize = props.containIntrinsicBlockSize ?? props.containIntrinsicHeight ?? props.containIntrinsicSize
   */
  containIntrinsicHeight?: SupportedStyleProps['containIntrinsicBlockSize'];

  /**
   * Fallback for `overflowInline`:
   * props.overflowInline = props.overflowInline ?? props.overflowX ?? props.overflow
   */
  overflowX?: SupportedStyleProps['overflowInline'];

  /**
   * Fallback for `overflowInline` and `overflowBlock`:
   * props.overflowInline = props.overflowInline ?? props.overflowX ?? props.overflow
   * props.overflowBlock = props.overflowBlock ?? props.overflowY ?? props.overflow
   */
  overflow?: SupportedStyleProps['overflowInline'];

  /**
   * Fallback for `overflowBlock`:
   * props.overflowBlock = props.overflowBlock ?? props.overflowY ?? props.overflow
   */
  overflowY?: SupportedStyleProps['overflowBlock'];

  /**
   * Fallback for `overscrollBehaviorInline`:
   * props.overscrollBehaviorInline = props.overscrollBehaviorInline ?? props.overscrollBehaviorX ?? props.overscrollBehavior
   */
  overscrollBehaviorX?: SupportedStyleProps['overscrollBehaviorInline'];

  /**
   * Fallback for `overscrollBehaviorInline` and `overscrollBehaviorBlock`:
   * props.overscrollBehaviorInline = props.overscrollBehaviorInline ?? props.overscrollBehaviorX ?? props.overscrollBehavior
   * props.overscrollBehaviorBlock = props.overscrollBehaviorBlock ?? props.overscrollBehaviorY ?? props.overscrollBehavior
   */
  overscrollBehavior?: SupportedStyleProps['overscrollBehaviorInline'];

  /**
   * Fallback for `overscrollBehaviorBlock`:
   * props.overscrollBehaviorBlock = props.overscrollBehaviorBlock ?? props.overscrollBehaviorY ?? props.overscrollBehavior
   */
  overscrollBehaviorY?: SupportedStyleProps['overscrollBehaviorBlock'];

  /**
   * Fallback for `backgroundPositionX` and `backgroundPositionY`:
   * props.backgroundPositionX = props.backgroundPositionX ?? props.backgroundPosition
   * props.backgroundPositionY = props.backgroundPositionY ?? props.backgroundPosition
   */
  backgroundPosition?: SupportedStyleProps['backgroundPositionX'];

  /**
   * Fallback for `borderStartStartRadius`:
   * props.borderStartStartRadius = props.borderStartStartRadius ?? props.borderTopLeftRadius ?? props.borderRadius
   */
  borderTopLeftRadius?: SupportedStyleProps['borderStartStartRadius'];

  /**
   * Fallback for `borderStartStartRadius`, `borderStartEndRadius`, `borderEndStartRadius` and `borderEndEndRadius`:
   * props.borderStartStartRadius = props.borderStartStartRadius ?? props.borderTopLeftRadius ?? props.borderRadius
   * props.borderStartEndRadius = props.borderStartEndRadius ?? props.borderTopRightRadius ?? props.borderRadius
   * props.borderEndStartRadius = props.borderEndStartRadius ?? props.borderBottomLeftRadius ?? props.borderRadius
   * props.borderEndEndRadius = props.borderEndEndRadius ?? props.borderBottomRightRadius ?? props.borderRadius
   */
  borderRadius?: SupportedStyleProps['borderStartStartRadius'];

  /**
   * Fallback for `borderStartEndRadius`:
   * props.borderStartEndRadius = props.borderStartEndRadius ?? props.borderTopRightRadius ?? props.borderRadius
   */
  borderTopRightRadius?: SupportedStyleProps['borderStartEndRadius'];

  /**
   * Fallback for `borderEndStartRadius`:
   * props.borderEndStartRadius = props.borderEndStartRadius ?? props.borderBottomLeftRadius ?? props.borderRadius
   */
  borderBottomLeftRadius?: SupportedStyleProps['borderEndStartRadius'];

  /**
   * Fallback for `borderEndEndRadius`:
   * props.borderEndEndRadius = props.borderEndEndRadius ?? props.borderBottomRightRadius ?? props.borderRadius
   */
  borderBottomRightRadius?: SupportedStyleProps['borderEndEndRadius'];

  /**
   * Fallback for `borderInlineStartColor`:
   * props.borderInlineStartColor = props.borderInlineStartColor ?? props.borderLeftColor ?? props.borderInlineColor ?? props.borderColor
   */
  borderLeftColor?: SupportedStyleProps['borderInlineStartColor'];

  /**
   * Fallback for `borderInlineStartColor` and `borderInlineEndColor`:
   * props.borderInlineStartColor = props.borderInlineStartColor ?? props.borderLeftColor ?? props.borderInlineColor ?? props.borderColor
   * props.borderInlineEndColor = props.borderInlineEndColor ?? props.borderRightColor ?? props.borderInlineColor ?? props.borderColor
   */
  borderInlineColor?: SupportedStyleProps['borderInlineStartColor'];

  /**
   * Fallback for `borderInlineStartColor`, `borderInlineEndColor`, `borderBlockStartColor` and `borderBlockEndColor`:
   * props.borderInlineStartColor = props.borderInlineStartColor ?? props.borderLeftColor ?? props.borderInlineColor ?? props.borderColor
   * props.borderInlineEndColor = props.borderInlineEndColor ?? props.borderRightColor ?? props.borderInlineColor ?? props.borderColor
   * props.borderBlockStartColor = props.borderBlockStartColor ?? props.borderTopColor ?? props.borderBlockColor ?? props.borderColor
   * props.borderBlockEndColor = props.borderBlockEndColor ?? props.borderBottomColor ?? props.borderBlockColor ?? props.borderColor
   */
  borderColor?: SupportedStyleProps['borderInlineStartColor'];

  /**
   * Fallback for `borderInlineEndColor`:
   * props.borderInlineEndColor = props.borderInlineEndColor ?? props.borderRightColor ?? props.borderInlineColor ?? props.borderColor
   */
  borderRightColor?: SupportedStyleProps['borderInlineEndColor'];

  /**
   * Fallback for `borderBlockStartColor`:
   * props.borderBlockStartColor = props.borderBlockStartColor ?? props.borderTopColor ?? props.borderBlockColor ?? props.borderColor
   */
  borderTopColor?: SupportedStyleProps['borderBlockStartColor'];

  /**
   * Fallback for `borderBlockStartColor` and `borderBlockEndColor`:
   * props.borderBlockStartColor = props.borderBlockStartColor ?? props.borderTopColor ?? props.borderBlockColor ?? props.borderColor
   * props.borderBlockEndColor = props.borderBlockEndColor ?? props.borderBottomColor ?? props.borderBlockColor ?? props.borderColor
   */
  borderBlockColor?: SupportedStyleProps['borderBlockStartColor'];

  /**
   * Fallback for `borderBlockEndColor`:
   * props.borderBlockEndColor = props.borderBlockEndColor ?? props.borderBottomColor ?? props.borderBlockColor ?? props.borderColor
   */
  borderBottomColor?: SupportedStyleProps['borderBlockEndColor'];

  /**
   * Fallback for `borderInlineStartStyle`:
   * props.borderInlineStartStyle = props.borderInlineStartStyle ?? props.borderLeftStyle ?? props.borderInlineStyle ?? props.borderStyle
   */
  borderLeftStyle?: SupportedStyleProps['borderInlineStartStyle'];

  /**
   * Fallback for `borderInlineStartStyle` and `borderInlineEndStyle`:
   * props.borderInlineStartStyle = props.borderInlineStartStyle ?? props.borderLeftStyle ?? props.borderInlineStyle ?? props.borderStyle
   * props.borderInlineEndStyle = props.borderInlineEndStyle ?? props.borderRightStyle ?? props.borderInlineStyle ?? props.borderStyle
   */
  borderInlineStyle?: SupportedStyleProps['borderInlineStartStyle'];

  /**
   * Fallback for `borderInlineStartStyle`, `borderInlineEndStyle`, `borderBlockStartStyle` and `borderBlockEndStyle`:
   * props.borderInlineStartStyle = props.borderInlineStartStyle ?? props.borderLeftStyle ?? props.borderInlineStyle ?? props.borderStyle
   * props.borderInlineEndStyle = props.borderInlineEndStyle ?? props.borderRightStyle ?? props.borderInlineStyle ?? props.borderStyle
   * props.borderBlockStartStyle = props.borderBlockStartStyle ?? props.borderTopStyle ?? props.borderBlockStyle ?? props.borderStyle
   * props.borderBlockEndStyle = props.borderBlockEndStyle ?? props.borderBottomStyle ?? props.borderBlockStyle ?? props.borderStyle
   */
  borderStyle?: SupportedStyleProps['borderInlineStartStyle'];

  /**
   * Fallback for `borderInlineEndStyle`:
   * props.borderInlineEndStyle = props.borderInlineEndStyle ?? props.borderRightStyle ?? props.borderInlineStyle ?? props.borderStyle
   */
  borderRightStyle?: SupportedStyleProps['borderInlineEndStyle'];

  /**
   * Fallback for `borderBlockStartStyle`:
   * props.borderBlockStartStyle = props.borderBlockStartStyle ?? props.borderTopStyle ?? props.borderBlockStyle ?? props.borderStyle
   */
  borderTopStyle?: SupportedStyleProps['borderBlockStartStyle'];

  /**
   * Fallback for `borderBlockStartStyle` and `borderBlockEndStyle`:
   * props.borderBlockStartStyle = props.borderBlockStartStyle ?? props.borderTopStyle ?? props.borderBlockStyle ?? props.borderStyle
   * props.borderBlockEndStyle = props.borderBlockEndStyle ?? props.borderBottomStyle ?? props.borderBlockStyle ?? props.borderStyle
   */
  borderBlockStyle?: SupportedStyleProps['borderBlockStartStyle'];

  /**
   * Fallback for `borderBlockEndStyle`:
   * props.borderBlockEndStyle = props.borderBlockEndStyle ?? props.borderBottomStyle ?? props.borderBlockStyle ?? props.borderStyle
   */
  borderBottomStyle?: SupportedStyleProps['borderBlockEndStyle'];

  /**
   * Fallback for `borderInlineStartWidth`:
   * props.borderInlineStartWidth = props.borderInlineStartWidth ?? props.borderLeftWidth ?? props.borderInlineWidth ?? props.borderWidth
   */
  borderLeftWidth?: SupportedStyleProps['borderInlineStartWidth'];

  /**
   * Fallback for `borderInlineStartWidth` and `borderInlineEndWidth`:
   * props.borderInlineStartWidth = props.borderInlineStartWidth ?? props.borderLeftWidth ?? props.borderInlineWidth ?? props.borderWidth
   * props.borderInlineEndWidth = props.borderInlineEndWidth ?? props.borderRightWidth ?? props.borderInlineWidth ?? props.borderWidth
   */
  borderInlineWidth?: SupportedStyleProps['borderInlineStartWidth'];

  /**
   * Fallback for `borderInlineStartWidth`, `borderInlineEndWidth`, `borderBlockStartWidth` and `borderBlockEndWidth`:
   * props.borderInlineStartWidth = props.borderInlineStartWidth ?? props.borderLeftWidth ?? props.borderInlineWidth ?? props.borderWidth
   * props.borderInlineEndWidth = props.borderInlineEndWidth ?? props.borderRightWidth ?? props.borderInlineWidth ?? props.borderWidth
   * props.borderBlockStartWidth = props.borderBlockStartWidth ?? props.borderTopWidth ?? props.borderBlockWidth ?? props.borderWidth
   * props.borderBlockEndWidth = props.borderBlockEndWidth ?? props.borderBottomWidth ?? props.borderBlockWidth ?? props.borderWidth
   */
  borderWidth?: SupportedStyleProps['borderInlineStartWidth'];

  /**
   * Fallback for `borderInlineEndWidth`:
   * props.borderInlineEndWidth = props.borderInlineEndWidth ?? props.borderRightWidth ?? props.borderInlineWidth ?? props.borderWidth
   */
  borderRightWidth?: SupportedStyleProps['borderInlineEndWidth'];

  /**
   * Fallback for `borderBlockStartWidth`:
   * props.borderBlockStartWidth = props.borderBlockStartWidth ?? props.borderTopWidth ?? props.borderBlockWidth ?? props.borderWidth
   */
  borderTopWidth?: SupportedStyleProps['borderBlockStartWidth'];

  /**
   * Fallback for `borderBlockStartWidth` and `borderBlockEndWidth`:
   * props.borderBlockStartWidth = props.borderBlockStartWidth ?? props.borderTopWidth ?? props.borderBlockWidth ?? props.borderWidth
   * props.borderBlockEndWidth = props.borderBlockEndWidth ?? props.borderBottomWidth ?? props.borderBlockWidth ?? props.borderWidth
   */
  borderBlockWidth?: SupportedStyleProps['borderBlockStartWidth'];

  /**
   * Fallback for `borderBlockEndWidth`:
   * props.borderBlockEndWidth = props.borderBlockEndWidth ?? props.borderBottomWidth ?? props.borderBlockWidth ?? props.borderWidth
   */
  borderBottomWidth?: SupportedStyleProps['borderBlockEndWidth'];

  /**
   * Fallback for `insetInlineStart`:
   * props.insetInlineStart = props.insetInlineStart ?? props.left ?? props.insetInline ?? props.inset
   */
  left?: SupportedStyleProps['insetInlineStart'];

  /**
   * Fallback for `insetInlineStart` and `insetInlineEnd`:
   * props.insetInlineStart = props.insetInlineStart ?? props.left ?? props.insetInline ?? props.inset
   * props.insetInlineEnd = props.insetInlineEnd ?? props.right ?? props.insetInline ?? props.inset
   */
  insetInline?: SupportedStyleProps['insetInlineStart'];

  /**
   * Fallback for `insetInlineStart`, `insetInlineEnd`, `insetBlockStart` and `insetBlockEnd`:
   * props.insetInlineStart = props.insetInlineStart ?? props.left ?? props.insetInline ?? props.inset
   * props.insetInlineEnd = props.insetInlineEnd ?? props.right ?? props.insetInline ?? props.inset
   * props.insetBlockStart = props.insetBlockStart ?? props.top ?? props.insetBlock ?? props.inset
   * props.insetBlockEnd = props.insetBlockEnd ?? props.bottom ?? props.insetBlock ?? props.inset
   */
  inset?: SupportedStyleProps['insetInlineStart'];

  /**
   * Fallback for `insetInlineEnd`:
   * props.insetInlineEnd = props.insetInlineEnd ?? props.right ?? props.insetInline ?? props.inset
   */
  right?: SupportedStyleProps['insetInlineEnd'];

  /**
   * Fallback for `insetBlockStart`:
   * props.insetBlockStart = props.insetBlockStart ?? props.top ?? props.insetBlock ?? props.inset
   */
  top?: SupportedStyleProps['insetBlockStart'];

  /**
   * Fallback for `insetBlockStart` and `insetBlockEnd`:
   * props.insetBlockStart = props.insetBlockStart ?? props.top ?? props.insetBlock ?? props.inset
   * props.insetBlockEnd = props.insetBlockEnd ?? props.bottom ?? props.insetBlock ?? props.inset
   */
  insetBlock?: SupportedStyleProps['insetBlockStart'];

  /**
   * Fallback for `insetBlockEnd`:
   * props.insetBlockEnd = props.insetBlockEnd ?? props.bottom ?? props.insetBlock ?? props.inset
   */
  bottom?: SupportedStyleProps['insetBlockEnd'];

  /**
   * Fallback for `scrollPaddingInlineStart`:
   * props.scrollPaddingInlineStart = props.scrollPaddingInlineStart ?? props.scrollPaddingLeft ?? props.scrollPaddingInline ?? props.scrollPadding
   */
  scrollPaddingLeft?: SupportedStyleProps['scrollPaddingInlineStart'];

  /**
   * Fallback for `scrollPaddingInlineStart` and `scrollPaddingInlineEnd`:
   * props.scrollPaddingInlineStart = props.scrollPaddingInlineStart ?? props.scrollPaddingLeft ?? props.scrollPaddingInline ?? props.scrollPadding
   * props.scrollPaddingInlineEnd = props.scrollPaddingInlineEnd ?? props.scrollPaddingRight ?? props.scrollPaddingInline ?? props.scrollPadding
   */
  scrollPaddingInline?: SupportedStyleProps['scrollPaddingInlineStart'];

  /**
   * Fallback for `scrollPaddingInlineStart`, `scrollPaddingInlineEnd`, `scrollPaddingBlockStart` and `scrollPaddingBlockEnd`:
   * props.scrollPaddingInlineStart = props.scrollPaddingInlineStart ?? props.scrollPaddingLeft ?? props.scrollPaddingInline ?? props.scrollPadding
   * props.scrollPaddingInlineEnd = props.scrollPaddingInlineEnd ?? props.scrollPaddingRight ?? props.scrollPaddingInline ?? props.scrollPadding
   * props.scrollPaddingBlockStart = props.scrollPaddingBlockStart ?? props.scrollPaddingTop ?? props.scrollPaddingBlock ?? props.scrollPadding
   * props.scrollPaddingBlockEnd = props.scrollPaddingBlockEnd ?? props.scrollPaddingBottom ?? props.scrollPaddingBlock ?? props.scrollPadding
   */
  scrollPadding?: SupportedStyleProps['scrollPaddingInlineStart'];

  /**
   * Fallback for `scrollPaddingInlineEnd`:
   * props.scrollPaddingInlineEnd = props.scrollPaddingInlineEnd ?? props.scrollPaddingRight ?? props.scrollPaddingInline ?? props.scrollPadding
   */
  scrollPaddingRight?: SupportedStyleProps['scrollPaddingInlineEnd'];

  /**
   * Fallback for `scrollPaddingBlockStart`:
   * props.scrollPaddingBlockStart = props.scrollPaddingBlockStart ?? props.scrollPaddingTop ?? props.scrollPaddingBlock ?? props.scrollPadding
   */
  scrollPaddingTop?: SupportedStyleProps['scrollPaddingBlockStart'];

  /**
   * Fallback for `scrollPaddingBlockStart` and `scrollPaddingBlockEnd`:
   * props.scrollPaddingBlockStart = props.scrollPaddingBlockStart ?? props.scrollPaddingTop ?? props.scrollPaddingBlock ?? props.scrollPadding
   * props.scrollPaddingBlockEnd = props.scrollPaddingBlockEnd ?? props.scrollPaddingBottom ?? props.scrollPaddingBlock ?? props.scrollPadding
   */
  scrollPaddingBlock?: SupportedStyleProps['scrollPaddingBlockStart'];

  /**
   * Fallback for `scrollPaddingBlockEnd`:
   * props.scrollPaddingBlockEnd = props.scrollPaddingBlockEnd ?? props.scrollPaddingBottom ?? props.scrollPaddingBlock ?? props.scrollPadding
   */
  scrollPaddingBottom?: SupportedStyleProps['scrollPaddingBlockEnd'];

  /**
   * Fallback for `scrollMarginInlineStart`:
   * props.scrollMarginInlineStart = props.scrollMarginInlineStart ?? props.scrollMarginLeft ?? props.scrollMarginInline ?? props.scrollMargin
   */
  scrollMarginLeft?: SupportedStyleProps['scrollMarginInlineStart'];

  /**
   * Fallback for `scrollMarginInlineStart` and `scrollMarginInlineEnd`:
   * props.scrollMarginInlineStart = props.scrollMarginInlineStart ?? props.scrollMarginLeft ?? props.scrollMarginInline ?? props.scrollMargin
   * props.scrollMarginInlineEnd = props.scrollMarginInlineEnd ?? props.scrollMarginRight ?? props.scrollMarginInline ?? props.scrollMargin
   */
  scrollMarginInline?: SupportedStyleProps['scrollMarginInlineStart'];

  /**
   * Fallback for `scrollMarginInlineStart`, `scrollMarginInlineEnd`, `scrollMarginBlockStart` and `scrollMarginBlockEnd`:
   * props.scrollMarginInlineStart = props.scrollMarginInlineStart ?? props.scrollMarginLeft ?? props.scrollMarginInline ?? props.scrollMargin
   * props.scrollMarginInlineEnd = props.scrollMarginInlineEnd ?? props.scrollMarginRight ?? props.scrollMarginInline ?? props.scrollMargin
   * props.scrollMarginBlockStart = props.scrollMarginBlockStart ?? props.scrollMarginTop ?? props.scrollMarginBlock ?? props.scrollMargin
   * props.scrollMarginBlockEnd = props.scrollMarginBlockEnd ?? props.scrollMarginBottom ?? props.scrollMarginBlock ?? props.scrollMargin
   */
  scrollMargin?: SupportedStyleProps['scrollMarginInlineStart'];

  /**
   * Fallback for `scrollMarginInlineEnd`:
   * props.scrollMarginInlineEnd = props.scrollMarginInlineEnd ?? props.scrollMarginRight ?? props.scrollMarginInline ?? props.scrollMargin
   */
  scrollMarginRight?: SupportedStyleProps['scrollMarginInlineEnd'];

  /**
   * Fallback for `scrollMarginBlockStart`:
   * props.scrollMarginBlockStart = props.scrollMarginBlockStart ?? props.scrollMarginTop ?? props.scrollMarginBlock ?? props.scrollMargin
   */
  scrollMarginTop?: SupportedStyleProps['scrollMarginBlockStart'];

  /**
   * Fallback for `scrollMarginBlockStart` and `scrollMarginBlockEnd`:
   * props.scrollMarginBlockStart = props.scrollMarginBlockStart ?? props.scrollMarginTop ?? props.scrollMarginBlock ?? props.scrollMargin
   * props.scrollMarginBlockEnd = props.scrollMarginBlockEnd ?? props.scrollMarginBottom ?? props.scrollMarginBlock ?? props.scrollMargin
   */
  scrollMarginBlock?: SupportedStyleProps['scrollMarginBlockStart'];

  /**
   * Fallback for `scrollMarginBlockEnd`:
   * props.scrollMarginBlockEnd = props.scrollMarginBlockEnd ?? props.scrollMarginBottom ?? props.scrollMarginBlock ?? props.scrollMargin
   */
  scrollMarginBottom?: SupportedStyleProps['scrollMarginBlockEnd'];

  /**
   * Fallback for `justifyItems`:
   * props.justifyItems = props.justifyItems ?? props.justify
   */
  justify?: SupportedStyleProps['justifyItems'];

  /**
   * Fallback for `alignItems`:
   * props.alignItems = props.alignItems ?? props.align
   */
  align?: SupportedStyleProps['alignItems'];
};

/**
 * CSS properties we don't support. Note: Contains some aliases which are later
 * typed to a different value.
 */
type DisallowedStandardLonghandProperties = 'width' |
  'height' |
  'paddingLeft' |
  'paddingTop' |
  'paddingRight' |
  'paddingBottom' |
  'marginLeft' |
  'marginTop' |
  'marginRight' |
  'marginBottom' |
  'maxWidth' |
  'maxHeight' |
  'minWidth' |
  'minHeight' |
  'borderTopLeftRadius' |
  'borderTopRightRadius' |
  'borderBottomRightRadius' |
  'borderBottomLeftRadius' |
  'borderTopColor' |
  'borderRightColor' |
  'borderBottomColor' |
  'borderLeftColor' |
  'borderTopStyle' |
  'borderRightStyle' |
  'borderBottomStyle' |
  'borderLeftStyle' |
  'borderTopWidth' |
  'borderRightWidth' |
  'borderBottomWidth' |
  'borderLeftWidth' |
  'overflowX' |
  'overflowY' |
  'overscrollBehaviorX' |
  'overscrollBehaviorY' |
  'scrollPaddingTop' |
  'scrollPaddingRight' |
  'scrollPaddingBottom' |
  'scrollPaddingLeft' |
  'scrollMarginTop' |
  'scrollMarginRight' |
  'scrollMarginBottom' |
  'scrollMarginLeft' |
  'top' |
  'left' |
  'right' |
  'bottom' |
  'containIntrinsicWidth' |
  'containIntrinsicHeight' |
  'borderBlockColor' |
  'borderBlockStyle' |
  'borderBlockWidth' |
  'borderInlineColor' |
  'borderInlineStyle' |
  'borderInlineWidth' |
  'touchAction' |
  'content' |
  'quotes' |
  'content' |
  'page' |
  'mathStyle' |
  'mathShift' |
  'mathDepth';

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

export const tokenizedStyleProps = [
  // Longhand CSS Style Props
  'borderStartStartRadius',
  'borderStartEndRadius',
  'borderEndStartRadius',
  'borderEndEndRadius',
  'borderBlockStartWidth',
  'borderBlockEndWidth',
  'borderInlineStartWidth',
  'borderInlineEndWidth',
  'backgroundColor',
  'color',
  'fontSize',
  'lineHeight',
  'fontWeight',
  'fontFamily',
  'letterSpacing',
  'blockSize',
  'minBlockSize',
  'maxBlockSize',
  'inlineSize',
  'minInlineSize',
  'maxInlineSize',
  'containIntrinsicInlineSize',
  'boxShadow',
  'marginInlineStart',
  'marginInlineEnd',
  'marginBlockStart',
  'marginBlockEnd',
  'paddingInlineStart',
  'paddingInlineEnd',
  'paddingBlockStart',
  'paddingBlockEnd',
  'rowGap',
  'columnGap',
  'transitionDuration',
  'animationName',
  'transitionTimingFunction',

  // Aliases
  'gap',
  'paddingLeft',
  'paddingInline',
  'padding',
  'paddingRight',
  'paddingTop',
  'paddingBlock',
  'paddingBottom',
  'marginLeft',
  'marginInline',
  'margin',
  'marginRight',
  'marginTop',
  'marginBlock',
  'marginBottom',
  'width',
  'size',
  'height',
  'minWidth',
  'minSize',
  'minHeight',
  'maxWidth',
  'maxSize',
  'maxHeight',
  'containIntrinsicWidth',
  'containIntrinsicSize',
  'borderTopLeftRadius',
  'borderRadius',
  'borderTopRightRadius',
  'borderBottomLeftRadius',
  'borderBottomRightRadius',
  'borderLeftWidth',
  'borderInlineWidth',
  'borderWidth',
  'borderRightWidth',
  'borderTopWidth',
  'borderBlockWidth',
  'borderBottomWidth',
] as const;
