/* THIS FILE IS AUTO GENERATED, DO NOT TOUCH */
import type {Properties as CSSStyleProps} from 'csstype';
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
type SupportedCSSStyleProps = Pick<CSSStyleProps, SupportedRawCSSStyleProps>;

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
 * @shopify/polaris-tokens), and helpful aliases for frequently used props.
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
type StylePropAliases = {
  /* Alias for `rowGap` and `columnGap` unless already set. */
  gap?: SupportedStyleProps['rowGap'] & SupportedStyleProps['columnGap'];
  /* Alias for `paddingInlineStart` unless already set. */
  paddingLeft?: SupportedStyleProps['paddingInlineStart'];
  /* Alias for `paddingInlineStart` and `paddingInlineEnd` unless already set. */
  paddingInline?: SupportedStyleProps['paddingInlineStart'] & SupportedStyleProps['paddingInlineEnd'];
  /* Alias for `paddingInlineStart`, `paddingInlineEnd`, `paddingBlockStart` and `paddingBlockEnd` unless already set. */
  padding?: SupportedStyleProps['paddingInlineStart'] & SupportedStyleProps['paddingInlineEnd'] & SupportedStyleProps['paddingBlockStart'] & SupportedStyleProps['paddingBlockEnd'];
  /* Alias for `paddingInlineEnd` unless already set. */
  paddingRight?: SupportedStyleProps['paddingInlineEnd'];
  /* Alias for `paddingBlockStart` unless already set. */
  paddingTop?: SupportedStyleProps['paddingBlockStart'];
  /* Alias for `paddingBlockStart` and `paddingBlockEnd` unless already set. */
  paddingBlock?: SupportedStyleProps['paddingBlockStart'] & SupportedStyleProps['paddingBlockEnd'];
  /* Alias for `paddingBlockEnd` unless already set. */
  paddingBottom?: SupportedStyleProps['paddingBlockEnd'];
  /* Alias for `marginInlineStart` unless already set. */
  marginLeft?: SupportedStyleProps['marginInlineStart'];
  /* Alias for `marginInlineStart` and `marginInlineEnd` unless already set. */
  marginInline?: SupportedStyleProps['marginInlineStart'] & SupportedStyleProps['marginInlineEnd'];
  /* Alias for `marginInlineStart`, `marginInlineEnd`, `marginBlockStart` and `marginBlockEnd` unless already set. */
  margin?: SupportedStyleProps['marginInlineStart'] & SupportedStyleProps['marginInlineEnd'] & SupportedStyleProps['marginBlockStart'] & SupportedStyleProps['marginBlockEnd'];
  /* Alias for `marginInlineEnd` unless already set. */
  marginRight?: SupportedStyleProps['marginInlineEnd'];
  /* Alias for `marginBlockStart` unless already set. */
  marginTop?: SupportedStyleProps['marginBlockStart'];
  /* Alias for `marginBlockStart` and `marginBlockEnd` unless already set. */
  marginBlock?: SupportedStyleProps['marginBlockStart'] & SupportedStyleProps['marginBlockEnd'];
  /* Alias for `marginBlockEnd` unless already set. */
  marginBottom?: SupportedStyleProps['marginBlockEnd'];
  /* Alias for `inlineSize` unless already set. */
  width?: SupportedStyleProps['inlineSize'];
  /* Alias for `inlineSize` and `blockSize` unless already set. */
  size?: SupportedStyleProps['inlineSize'] & SupportedStyleProps['blockSize'];
  /* Alias for `blockSize` unless already set. */
  height?: SupportedStyleProps['blockSize'];
  /* Alias for `minInlineSize` unless already set. */
  minWidth?: SupportedStyleProps['minInlineSize'];
  /* Alias for `minInlineSize` and `minBlockSize` unless already set. */
  minSize?: SupportedStyleProps['minInlineSize'] & SupportedStyleProps['minBlockSize'];
  /* Alias for `minBlockSize` unless already set. */
  minHeight?: SupportedStyleProps['minBlockSize'];
  /* Alias for `maxInlineSize` unless already set. */
  maxWidth?: SupportedStyleProps['maxInlineSize'];
  /* Alias for `maxInlineSize` and `maxBlockSize` unless already set. */
  maxSize?: SupportedStyleProps['maxInlineSize'] & SupportedStyleProps['maxBlockSize'];
  /* Alias for `maxBlockSize` unless already set. */
  maxHeight?: SupportedStyleProps['maxBlockSize'];
  /* Alias for `containIntrinsicInlineSize` unless already set. */
  containIntrinsicWidth?: SupportedStyleProps['containIntrinsicInlineSize'];
  /* Alias for `containIntrinsicInlineSize` and `containIntrinsicBlockSize` unless already set. */
  containIntrinsicSize?: SupportedStyleProps['containIntrinsicInlineSize'] & SupportedStyleProps['containIntrinsicBlockSize'];
  /* Alias for `containIntrinsicBlockSize` unless already set. */
  containIntrinsicHeight?: SupportedStyleProps['containIntrinsicBlockSize'];
  /* Alias for `overflowInline` unless already set. */
  overflowX?: SupportedStyleProps['overflowInline'];
  /* Alias for `overflowInline` and `overflowBlock` unless already set. */
  overflow?: SupportedStyleProps['overflowInline'] & SupportedStyleProps['overflowBlock'];
  /* Alias for `overflowBlock` unless already set. */
  overflowY?: SupportedStyleProps['overflowBlock'];
  /* Alias for `overscrollBehaviorInline` unless already set. */
  overscrollBehaviorX?: SupportedStyleProps['overscrollBehaviorInline'];
  /* Alias for `overscrollBehaviorInline` and `overscrollBehaviorBlock` unless already set. */
  overscrollBehavior?: SupportedStyleProps['overscrollBehaviorInline'] & SupportedStyleProps['overscrollBehaviorBlock'];
  /* Alias for `overscrollBehaviorBlock` unless already set. */
  overscrollBehaviorY?: SupportedStyleProps['overscrollBehaviorBlock'];
  /* Alias for `borderStartStartRadius` unless already set. */
  borderTopLeftRadius?: SupportedStyleProps['borderStartStartRadius'];
  /* Alias for `borderStartStartRadius`, `borderStartEndRadius`, `borderEndStartRadius` and `borderEndEndRadius` unless already set. */
  borderRadius?: SupportedStyleProps['borderStartStartRadius'] & SupportedStyleProps['borderStartEndRadius'] & SupportedStyleProps['borderEndStartRadius'] & SupportedStyleProps['borderEndEndRadius'];
  /* Alias for `borderStartEndRadius` unless already set. */
  borderTopRightRadius?: SupportedStyleProps['borderStartEndRadius'];
  /* Alias for `borderEndStartRadius` unless already set. */
  borderBottomLeftRadius?: SupportedStyleProps['borderEndStartRadius'];
  /* Alias for `borderEndEndRadius` unless already set. */
  borderBottomRightRadius?: SupportedStyleProps['borderEndEndRadius'];
  /* Alias for `borderInlineStartColor` unless already set. */
  borderLeftColor?: SupportedStyleProps['borderInlineStartColor'];
  /* Alias for `borderInlineStartColor` and `borderInlineEndColor` unless already set. */
  borderInlineColor?: SupportedStyleProps['borderInlineStartColor'] & SupportedStyleProps['borderInlineEndColor'];
  /* Alias for `borderInlineStartColor`, `borderInlineEndColor`, `borderBlockStartColor` and `borderBlockEndColor` unless already set. */
  borderColor?: SupportedStyleProps['borderInlineStartColor'] & SupportedStyleProps['borderInlineEndColor'] & SupportedStyleProps['borderBlockStartColor'] & SupportedStyleProps['borderBlockEndColor'];
  /* Alias for `borderInlineEndColor` unless already set. */
  borderRightColor?: SupportedStyleProps['borderInlineEndColor'];
  /* Alias for `borderBlockStartColor` unless already set. */
  borderTopColor?: SupportedStyleProps['borderBlockStartColor'];
  /* Alias for `borderBlockStartColor` and `borderBlockEndColor` unless already set. */
  borderBlockColor?: SupportedStyleProps['borderBlockStartColor'] & SupportedStyleProps['borderBlockEndColor'];
  /* Alias for `borderBlockEndColor` unless already set. */
  borderBottomColor?: SupportedStyleProps['borderBlockEndColor'];
  /* Alias for `borderInlineStartStyle` unless already set. */
  borderLeftStyle?: SupportedStyleProps['borderInlineStartStyle'];
  /* Alias for `borderInlineStartStyle` and `borderInlineEndStyle` unless already set. */
  borderInlineStyle?: SupportedStyleProps['borderInlineStartStyle'] & SupportedStyleProps['borderInlineEndStyle'];
  /* Alias for `borderInlineStartStyle`, `borderInlineEndStyle`, `borderBlockStartStyle` and `borderBlockEndStyle` unless already set. */
  borderStyle?: SupportedStyleProps['borderInlineStartStyle'] & SupportedStyleProps['borderInlineEndStyle'] & SupportedStyleProps['borderBlockStartStyle'] & SupportedStyleProps['borderBlockEndStyle'];
  /* Alias for `borderInlineEndStyle` unless already set. */
  borderRightStyle?: SupportedStyleProps['borderInlineEndStyle'];
  /* Alias for `borderBlockStartStyle` unless already set. */
  borderTopStyle?: SupportedStyleProps['borderBlockStartStyle'];
  /* Alias for `borderBlockStartStyle` and `borderBlockEndStyle` unless already set. */
  borderBlockStyle?: SupportedStyleProps['borderBlockStartStyle'] & SupportedStyleProps['borderBlockEndStyle'];
  /* Alias for `borderBlockEndStyle` unless already set. */
  borderBottomStyle?: SupportedStyleProps['borderBlockEndStyle'];
  /* Alias for `borderInlineStartWidth` unless already set. */
  borderLeftWidth?: SupportedStyleProps['borderInlineStartWidth'];
  /* Alias for `borderInlineStartWidth` and `borderInlineEndWidth` unless already set. */
  borderInlineWidth?: SupportedStyleProps['borderInlineStartWidth'] & SupportedStyleProps['borderInlineEndWidth'];
  /* Alias for `borderInlineStartWidth`, `borderInlineEndWidth`, `borderBlockStartWidth` and `borderBlockEndWidth` unless already set. */
  borderWidth?: SupportedStyleProps['borderInlineStartWidth'] & SupportedStyleProps['borderInlineEndWidth'] & SupportedStyleProps['borderBlockStartWidth'] & SupportedStyleProps['borderBlockEndWidth'];
  /* Alias for `borderInlineEndWidth` unless already set. */
  borderRightWidth?: SupportedStyleProps['borderInlineEndWidth'];
  /* Alias for `borderBlockStartWidth` unless already set. */
  borderTopWidth?: SupportedStyleProps['borderBlockStartWidth'];
  /* Alias for `borderBlockStartWidth` and `borderBlockEndWidth` unless already set. */
  borderBlockWidth?: SupportedStyleProps['borderBlockStartWidth'] & SupportedStyleProps['borderBlockEndWidth'];
  /* Alias for `borderBlockEndWidth` unless already set. */
  borderBottomWidth?: SupportedStyleProps['borderBlockEndWidth'];
  /* Alias for `insetInlineStart` unless already set. */
  left?: SupportedStyleProps['insetInlineStart'];
  /* Alias for `insetInlineStart` and `insetInlineEnd` unless already set. */
  insetInline?: SupportedStyleProps['insetInlineStart'] & SupportedStyleProps['insetInlineEnd'];
  /* Alias for `insetInlineStart`, `insetInlineEnd`, `insetBlockStart` and `insetBlockEnd` unless already set. */
  inset?: SupportedStyleProps['insetInlineStart'] & SupportedStyleProps['insetInlineEnd'] & SupportedStyleProps['insetBlockStart'] & SupportedStyleProps['insetBlockEnd'];
  /* Alias for `insetInlineEnd` unless already set. */
  right?: SupportedStyleProps['insetInlineEnd'];
  /* Alias for `insetBlockStart` unless already set. */
  top?: SupportedStyleProps['insetBlockStart'];
  /* Alias for `insetBlockStart` and `insetBlockEnd` unless already set. */
  insetBlock?: SupportedStyleProps['insetBlockStart'] & SupportedStyleProps['insetBlockEnd'];
  /* Alias for `insetBlockEnd` unless already set. */
  bottom?: SupportedStyleProps['insetBlockEnd'];
  /* Alias for `scrollPaddingInlineStart` unless already set. */
  scrollPaddingLeft?: SupportedStyleProps['scrollPaddingInlineStart'];
  /* Alias for `scrollPaddingInlineStart` and `scrollPaddingInlineEnd` unless already set. */
  scrollPaddingInline?: SupportedStyleProps['scrollPaddingInlineStart'] & SupportedStyleProps['scrollPaddingInlineEnd'];
  /* Alias for `scrollPaddingInlineStart`, `scrollPaddingInlineEnd`, `scrollPaddingBlockStart` and `scrollPaddingBlockEnd` unless already set. */
  scrollPadding?: SupportedStyleProps['scrollPaddingInlineStart'] & SupportedStyleProps['scrollPaddingInlineEnd'] & SupportedStyleProps['scrollPaddingBlockStart'] & SupportedStyleProps['scrollPaddingBlockEnd'];
  /* Alias for `scrollPaddingInlineEnd` unless already set. */
  scrollPaddingRight?: SupportedStyleProps['scrollPaddingInlineEnd'];
  /* Alias for `scrollPaddingBlockStart` unless already set. */
  scrollPaddingTop?: SupportedStyleProps['scrollPaddingBlockStart'];
  /* Alias for `scrollPaddingBlockStart` and `scrollPaddingBlockEnd` unless already set. */
  scrollPaddingBlock?: SupportedStyleProps['scrollPaddingBlockStart'] & SupportedStyleProps['scrollPaddingBlockEnd'];
  /* Alias for `scrollPaddingBlockEnd` unless already set. */
  scrollPaddingBottom?: SupportedStyleProps['scrollPaddingBlockEnd'];
  /* Alias for `scrollMarginInlineStart` unless already set. */
  scrollMarginLeft?: SupportedStyleProps['scrollMarginInlineStart'];
  /* Alias for `scrollMarginInlineStart` and `scrollMarginInlineEnd` unless already set. */
  scrollMarginInline?: SupportedStyleProps['scrollMarginInlineStart'] & SupportedStyleProps['scrollMarginInlineEnd'];
  /* Alias for `scrollMarginInlineStart`, `scrollMarginInlineEnd`, `scrollMarginBlockStart` and `scrollMarginBlockEnd` unless already set. */
  scrollMargin?: SupportedStyleProps['scrollMarginInlineStart'] & SupportedStyleProps['scrollMarginInlineEnd'] & SupportedStyleProps['scrollMarginBlockStart'] & SupportedStyleProps['scrollMarginBlockEnd'];
  /* Alias for `scrollMarginInlineEnd` unless already set. */
  scrollMarginRight?: SupportedStyleProps['scrollMarginInlineEnd'];
  /* Alias for `scrollMarginBlockStart` unless already set. */
  scrollMarginTop?: SupportedStyleProps['scrollMarginBlockStart'];
  /* Alias for `scrollMarginBlockStart` and `scrollMarginBlockEnd` unless already set. */
  scrollMarginBlock?: SupportedStyleProps['scrollMarginBlockStart'] & SupportedStyleProps['scrollMarginBlockEnd'];
  /* Alias for `scrollMarginBlockEnd` unless already set. */
  scrollMarginBottom?: SupportedStyleProps['scrollMarginBlockEnd'];
  /* Alias for `justifyItems` unless already set. */
  justify?: SupportedStyleProps['justifyItems'];
  /* Alias for `alignItems` unless already set. */
  align?: SupportedStyleProps['alignItems'];
};

/**
 * CSS properties for which we pass the user supplied value through. Does not
 * include any alias properties.
 */
type SupportedRawCSSStyleProps = 'zIndex' |
  'pageBreakBefore' |
  'pageBreakAfter' |
  'pageBreakInside' |
  'mixBlendMode' |
  'isolation' |
  'backgroundBlendMode' |
  'alignContent' |
  'justifyContent' |
  'justifySelf' |
  'alignSelf' |
  'justifyItems' |
  'alignItems' |
  'rowGap' |
  'columnGap' |
  'animationDuration' |
  'animationName' |
  'animationTimingFunction' |
  'animationIterationCount' |
  'animationDirection' |
  'animationPlayState' |
  'animationDelay' |
  'animationFillMode' |
  'backgroundPosition' |
  'backgroundClip' |
  'backgroundColor' |
  'backgroundImage' |
  'backgroundRepeat' |
  'backgroundAttachment' |
  'backgroundOrigin' |
  'backgroundSize' |
  'borderImageSource' |
  'borderImageSlice' |
  'borderImageWidth' |
  'borderImageOutset' |
  'borderImageRepeat' |
  'breakBefore' |
  'breakAfter' |
  'breakInside' |
  'orphans' |
  'widows' |
  'boxDecorationBreak' |
  'colorScheme' |
  'printColorAdjust' |
  'color' |
  'opacity' |
  'contain' |
  'containerType' |
  'containerName' |
  'container' |
  'contentVisibility' |
  'display' |
  'order' |
  'visibility' |
  'flexDirection' |
  'flexWrap' |
  'flexGrow' |
  'flexShrink' |
  'flexBasis' |
  'fontSizeAdjust' |
  'fontFamily' |
  'fontWeight' |
  'fontStretch' |
  'fontStyle' |
  'fontSize' |
  'fontSynthesis' |
  'fontKerning' |
  'fontVariantLigatures' |
  'fontVariantPosition' |
  'fontVariantCaps' |
  'fontVariantNumeric' |
  'fontVariantAlternates' |
  'fontVariantEastAsian' |
  'fontVariant' |
  'fontFeatureSettings' |
  'fontLanguageOverride' |
  'fontOpticalSizing' |
  'fontVariationSettings' |
  'fontPalette' |
  'fontVariantEmoji' |
  'gridTemplateColumns' |
  'gridTemplateRows' |
  'gridTemplateAreas' |
  'gridAutoColumns' |
  'gridAutoRows' |
  'gridAutoFlow' |
  'gridRowStart' |
  'gridColumnStart' |
  'gridRowEnd' |
  'gridColumnEnd' |
  'objectFit' |
  'objectPosition' |
  'imageOrientation' |
  'imageRendering' |
  'verticalAlign' |
  'lineHeight' |
  'listStyleImage' |
  'listStyleType' |
  'listStylePosition' |
  'counterReset' |
  'counterIncrement' |
  'counterSet' |
  'blockSize' |
  'inlineSize' |
  'minBlockSize' |
  'minInlineSize' |
  'maxBlockSize' |
  'maxInlineSize' |
  'marginBlockStart' |
  'marginBlockEnd' |
  'marginInlineStart' |
  'marginInlineEnd' |
  'paddingBlockStart' |
  'paddingBlockEnd' |
  'paddingInlineStart' |
  'paddingInlineEnd' |
  'borderBlockStartWidth' |
  'borderBlockEndWidth' |
  'borderInlineStartWidth' |
  'borderInlineEndWidth' |
  'borderBlockStartStyle' |
  'borderBlockEndStyle' |
  'borderInlineStartStyle' |
  'borderInlineEndStyle' |
  'borderBlockStartColor' |
  'borderBlockEndColor' |
  'borderInlineStartColor' |
  'borderInlineEndColor' |
  'borderStartStartRadius' |
  'borderStartEndRadius' |
  'borderEndStartRadius' |
  'borderEndEndRadius' |
  'clipPath' |
  'maskImage' |
  'maskMode' |
  'maskRepeat' |
  'maskPosition' |
  'maskClip' |
  'maskOrigin' |
  'maskSize' |
  'maskComposite' |
  'maskBorderSource' |
  'maskBorderMode' |
  'maskBorderSlice' |
  'maskBorderWidth' |
  'maskBorderOutset' |
  'maskBorderRepeat' |
  'maskBorder' |
  'maskType' |
  'clip' |
  'columnSpan' |
  'columnWidth' |
  'columnCount' |
  'columnRuleColor' |
  'columnRuleStyle' |
  'columnRuleWidth' |
  'columnFill' |
  'overflowClipMargin' |
  'textOverflow' |
  'overflowBlock' |
  'overflowInline' |
  'scrollBehavior' |
  'scrollbarGutter' |
  'overscrollBehaviorInline' |
  'overscrollBehaviorBlock' |
  'position' |
  'insetBlockStart' |
  'insetInlineStart' |
  'insetBlockEnd' |
  'insetInlineEnd' |
  'overflowAnchor' |
  'scrollSnapType' |
  'scrollSnapAlign' |
  'scrollSnapStop' |
  'scrollPaddingInlineStart' |
  'scrollPaddingBlockStart' |
  'scrollPaddingInlineEnd' |
  'scrollPaddingBlockEnd' |
  'scrollMarginBlockStart' |
  'scrollMarginInlineStart' |
  'scrollMarginBlockEnd' |
  'scrollMarginInlineEnd' |
  'scrollbarColor' |
  'scrollbarWidth' |
  'shapeOutside' |
  'shapeImageThreshold' |
  'shapeMargin' |
  'containIntrinsicBlockSize' |
  'containIntrinsicInlineSize' |
  'boxSizing' |
  'tableLayout' |
  'borderCollapse' |
  'borderSpacing' |
  'captionSide' |
  'emptyCells' |
  'textTransform' |
  'whiteSpace' |
  'tabSize' |
  'wordBreak' |
  'lineBreak' |
  'hyphens' |
  'hyphenateCharacter' |
  'hyphenateLimitChars' |
  'overflowWrap' |
  'wordWrap' |
  'textAlign' |
  'textAlignLast' |
  'textJustify' |
  'wordSpacing' |
  'letterSpacing' |
  'textIndent' |
  'hangingPunctuation' |
  'textDecorationLine' |
  'textDecorationStyle' |
  'textDecorationColor' |
  'textDecorationThickness' |
  'textUnderlinePosition' |
  'textUnderlineOffset' |
  'textDecorationSkipInk' |
  'textEmphasisStyle' |
  'textEmphasisColor' |
  'textEmphasisPosition' |
  'textShadow' |
  'translate' |
  'rotate' |
  'scale' |
  'transformStyle' |
  'perspective' |
  'perspectiveOrigin' |
  'backfaceVisibility' |
  'transform' |
  'transformOrigin' |
  'transformBox' |
  'transitionProperty' |
  'transitionDuration' |
  'transitionTimingFunction' |
  'transitionDelay' |
  'outlineWidth' |
  'outlineStyle' |
  'outlineColor' |
  'outlineOffset' |
  'resize' |
  'cursor' |
  'caretColor' |
  'caretShape' |
  'caret' |
  'userSelect' |
  'accentColor' |
  'inputSecurity' |
  'willChange' |
  'direction' |
  'unicodeBidi' |
  'writingMode' |
  'textOrientation' |
  'textCombineUpright' |
  'backdropFilter' |
  'filter' |
  'offsetPath' |
  'offsetDistance' |
  'offsetAnchor' |
  'offsetRotate';

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
} as const;

// Extract a unique set of just the alias names
export const stylePropAliasNames = Array.from(new Set(Object.values(stylePropAliasFallbacks).flat()));

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
] as const;
