/* THIS FILE IS AUTO GENERATED, DO NOT TOUCH */
import * as CSS from 'csstype';
// NOTE: Includes aliases as well as CSS Properties
import type {TokenizedStyleProps as TokenizedStylePropsAndAliases} from '@shopify/polaris-tokens';
import type {ResponsiveProp} from '../../utils/various';

/**
 * A subset of Raw CSS properties supported in Polaris
 */
type NonTokenizedStyleProps = Pick<CSS.Properties, SupportedRawCSSStyleProps>;

/**
 * Props which act as an alias to one or more more non-tokenized style props.
 *
 * For example; 'justify' is an alias to 'justify-items' when that individual
 * prop isn't set.
 */
type NonTokenizedStylePropAliases = {
  
  /* Alias for `overflowInline` unless already set. */
  overflowX?: NonTokenizedStyleProps['overflowInline'];
  /* Alias for `overflowInline` and `overflowBlock` unless already set. */
  overflow?: NonTokenizedStyleProps['overflowInline'] & NonTokenizedStyleProps['overflowBlock'];
  /* Alias for `overflowBlock` unless already set. */
  overflowY?: NonTokenizedStyleProps['overflowBlock'];
  /* Alias for `overscrollBehaviorInline` unless already set. */
  overscrollBehaviorX?: NonTokenizedStyleProps['overscrollBehaviorInline'];
  /* Alias for `overscrollBehaviorInline` and `overscrollBehaviorBlock` unless already set. */
  overscrollBehavior?: NonTokenizedStyleProps['overscrollBehaviorInline'] & NonTokenizedStyleProps['overscrollBehaviorBlock'];
  /* Alias for `overscrollBehaviorBlock` unless already set. */
  overscrollBehaviorY?: NonTokenizedStyleProps['overscrollBehaviorBlock'];
  /* Alias for `borderStartStartRadius` unless already set. */
  borderTopLeftRadius?: NonTokenizedStyleProps['borderStartStartRadius'];
  /* Alias for `borderStartEndRadius` unless already set. */
  borderTopRightRadius?: NonTokenizedStyleProps['borderStartEndRadius'];
  /* Alias for `borderEndStartRadius` unless already set. */
  borderBottomLeftRadius?: NonTokenizedStyleProps['borderEndStartRadius'];
  /* Alias for `borderEndEndRadius` unless already set. */
  borderBottomRightRadius?: NonTokenizedStyleProps['borderEndEndRadius'];
  /* Alias for `borderInlineStartColor` unless already set. */
  borderLeftColor?: NonTokenizedStyleProps['borderInlineStartColor'];
  /* Alias for `borderInlineStartColor` and `borderInlineEndColor` unless already set. */
  borderInlineColor?: NonTokenizedStyleProps['borderInlineStartColor'] & NonTokenizedStyleProps['borderInlineEndColor'];
  /* Alias for `borderInlineEndColor` unless already set. */
  borderRightColor?: NonTokenizedStyleProps['borderInlineEndColor'];
  /* Alias for `borderBlockStartColor` unless already set. */
  borderTopColor?: NonTokenizedStyleProps['borderBlockStartColor'];
  /* Alias for `borderBlockStartColor` and `borderBlockEndColor` unless already set. */
  borderBlockColor?: NonTokenizedStyleProps['borderBlockStartColor'] & NonTokenizedStyleProps['borderBlockEndColor'];
  /* Alias for `borderBlockEndColor` unless already set. */
  borderBottomColor?: NonTokenizedStyleProps['borderBlockEndColor'];
  /* Alias for `borderInlineStartStyle` unless already set. */
  borderLeftStyle?: NonTokenizedStyleProps['borderInlineStartStyle'];
  /* Alias for `borderInlineStartStyle` and `borderInlineEndStyle` unless already set. */
  borderInlineStyle?: NonTokenizedStyleProps['borderInlineStartStyle'] & NonTokenizedStyleProps['borderInlineEndStyle'];
  /* Alias for `borderInlineStartStyle`, `borderInlineEndStyle`, `borderBlockStartStyle` and `borderBlockEndStyle` unless already set. */
  borderStyle?: NonTokenizedStyleProps['borderInlineStartStyle'] & NonTokenizedStyleProps['borderInlineEndStyle'] & NonTokenizedStyleProps['borderBlockStartStyle'] & NonTokenizedStyleProps['borderBlockEndStyle'];
  /* Alias for `borderInlineEndStyle` unless already set. */
  borderRightStyle?: NonTokenizedStyleProps['borderInlineEndStyle'];
  /* Alias for `borderBlockStartStyle` unless already set. */
  borderTopStyle?: NonTokenizedStyleProps['borderBlockStartStyle'];
  /* Alias for `borderBlockStartStyle` and `borderBlockEndStyle` unless already set. */
  borderBlockStyle?: NonTokenizedStyleProps['borderBlockStartStyle'] & NonTokenizedStyleProps['borderBlockEndStyle'];
  /* Alias for `borderBlockEndStyle` unless already set. */
  borderBottomStyle?: NonTokenizedStyleProps['borderBlockEndStyle'];
  /* Alias for `borderInlineStartWidth` unless already set. */
  borderLeftWidth?: NonTokenizedStyleProps['borderInlineStartWidth'];
  /* Alias for `borderInlineStartWidth` and `borderInlineEndWidth` unless already set. */
  borderInlineWidth?: NonTokenizedStyleProps['borderInlineStartWidth'] & NonTokenizedStyleProps['borderInlineEndWidth'];
  /* Alias for `borderInlineEndWidth` unless already set. */
  borderRightWidth?: NonTokenizedStyleProps['borderInlineEndWidth'];
  /* Alias for `borderBlockStartWidth` unless already set. */
  borderTopWidth?: NonTokenizedStyleProps['borderBlockStartWidth'];
  /* Alias for `borderBlockStartWidth` and `borderBlockEndWidth` unless already set. */
  borderBlockWidth?: NonTokenizedStyleProps['borderBlockStartWidth'] & NonTokenizedStyleProps['borderBlockEndWidth'];
  /* Alias for `borderBlockEndWidth` unless already set. */
  borderBottomWidth?: NonTokenizedStyleProps['borderBlockEndWidth'];
  /* Alias for `insetInlineStart` unless already set. */
  left?: NonTokenizedStyleProps['insetInlineStart'];
  /* Alias for `insetInlineStart` and `insetInlineEnd` unless already set. */
  insetInline?: NonTokenizedStyleProps['insetInlineStart'] & NonTokenizedStyleProps['insetInlineEnd'];
  /* Alias for `insetInlineStart`, `insetInlineEnd`, `insetBlockStart` and `insetBlockEnd` unless already set. */
  inset?: NonTokenizedStyleProps['insetInlineStart'] & NonTokenizedStyleProps['insetInlineEnd'] & NonTokenizedStyleProps['insetBlockStart'] & NonTokenizedStyleProps['insetBlockEnd'];
  /* Alias for `insetInlineEnd` unless already set. */
  right?: NonTokenizedStyleProps['insetInlineEnd'];
  /* Alias for `insetBlockStart` unless already set. */
  top?: NonTokenizedStyleProps['insetBlockStart'];
  /* Alias for `insetBlockStart` and `insetBlockEnd` unless already set. */
  insetBlock?: NonTokenizedStyleProps['insetBlockStart'] & NonTokenizedStyleProps['insetBlockEnd'];
  /* Alias for `insetBlockEnd` unless already set. */
  bottom?: NonTokenizedStyleProps['insetBlockEnd'];
  /* Alias for `scrollPaddingInlineStart` unless already set. */
  scrollPaddingLeft?: NonTokenizedStyleProps['scrollPaddingInlineStart'];
  /* Alias for `scrollPaddingInlineStart` and `scrollPaddingInlineEnd` unless already set. */
  scrollPaddingInline?: NonTokenizedStyleProps['scrollPaddingInlineStart'] & NonTokenizedStyleProps['scrollPaddingInlineEnd'];
  /* Alias for `scrollPaddingInlineStart`, `scrollPaddingInlineEnd`, `scrollPaddingBlockStart` and `scrollPaddingBlockEnd` unless already set. */
  scrollPadding?: NonTokenizedStyleProps['scrollPaddingInlineStart'] & NonTokenizedStyleProps['scrollPaddingInlineEnd'] & NonTokenizedStyleProps['scrollPaddingBlockStart'] & NonTokenizedStyleProps['scrollPaddingBlockEnd'];
  /* Alias for `scrollPaddingInlineEnd` unless already set. */
  scrollPaddingRight?: NonTokenizedStyleProps['scrollPaddingInlineEnd'];
  /* Alias for `scrollPaddingBlockStart` unless already set. */
  scrollPaddingTop?: NonTokenizedStyleProps['scrollPaddingBlockStart'];
  /* Alias for `scrollPaddingBlockStart` and `scrollPaddingBlockEnd` unless already set. */
  scrollPaddingBlock?: NonTokenizedStyleProps['scrollPaddingBlockStart'] & NonTokenizedStyleProps['scrollPaddingBlockEnd'];
  /* Alias for `scrollPaddingBlockEnd` unless already set. */
  scrollPaddingBottom?: NonTokenizedStyleProps['scrollPaddingBlockEnd'];
  /* Alias for `scrollMarginInlineStart` unless already set. */
  scrollMarginLeft?: NonTokenizedStyleProps['scrollMarginInlineStart'];
  /* Alias for `scrollMarginInlineStart` and `scrollMarginInlineEnd` unless already set. */
  scrollMarginInline?: NonTokenizedStyleProps['scrollMarginInlineStart'] & NonTokenizedStyleProps['scrollMarginInlineEnd'];
  /* Alias for `scrollMarginInlineStart`, `scrollMarginInlineEnd`, `scrollMarginBlockStart` and `scrollMarginBlockEnd` unless already set. */
  scrollMargin?: NonTokenizedStyleProps['scrollMarginInlineStart'] & NonTokenizedStyleProps['scrollMarginInlineEnd'] & NonTokenizedStyleProps['scrollMarginBlockStart'] & NonTokenizedStyleProps['scrollMarginBlockEnd'];
  /* Alias for `scrollMarginInlineEnd` unless already set. */
  scrollMarginRight?: NonTokenizedStyleProps['scrollMarginInlineEnd'];
  /* Alias for `scrollMarginBlockStart` unless already set. */
  scrollMarginTop?: NonTokenizedStyleProps['scrollMarginBlockStart'];
  /* Alias for `scrollMarginBlockStart` and `scrollMarginBlockEnd` unless already set. */
  scrollMarginBlock?: NonTokenizedStyleProps['scrollMarginBlockStart'] & NonTokenizedStyleProps['scrollMarginBlockEnd'];
  /* Alias for `scrollMarginBlockEnd` unless already set. */
  scrollMarginBottom?: NonTokenizedStyleProps['scrollMarginBlockEnd'];
  /* Alias for `justifyItems` unless already set. */
  justify?: NonTokenizedStyleProps['justifyItems'];
  /* Alias for `alignItems` unless already set. */
  align?: NonTokenizedStyleProps['alignItems'];
};

/**
 * Style props who only accept tokenized values.
 *
 * For example; 'padding-inline-start' can only accept the 'space-*' tokens.
 */
type TokenizedStyleProps = Omit<TokenizedStylePropsAndAliases, typeof stylePropAliasNames[number]>;

/**
 * Props which act as an alias to one or more more tokenized style props.
 *
 * For example; 'padding' is an alias to 'padding-inline-start',
 * 'padding-inline-end', etc, when those individual props aren't set.
 */
type TokenizedStylePropAliases = Pick<
  TokenizedStylePropsAndAliases,
  typeof stylePropAliasNames[number] & keyof TokenizedStylePropsAndAliases
>;

type StyleProps = NonTokenizedStyleProps &
  NonTokenizedStylePropAliases &
  TokenizedStyleProps &
  TokenizedStylePropAliases;

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
 * CSS properties for which we pass the user supplied value through. Does not
 * include any properties which are tokenized, or any alias properties.
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
  'animationDuration' |
  'animationTimingFunction' |
  'animationIterationCount' |
  'animationDirection' |
  'animationPlayState' |
  'animationDelay' |
  'animationFillMode' |
  'backgroundPosition' |
  'backgroundClip' |
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
  'fontStretch' |
  'fontStyle' |
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
  'listStyleImage' |
  'listStyleType' |
  'listStylePosition' |
  'counterReset' |
  'counterIncrement' |
  'counterSet' |
  'minBlockSize' |
  'minInlineSize' |
  'maxBlockSize' |
  'maxInlineSize' |
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
