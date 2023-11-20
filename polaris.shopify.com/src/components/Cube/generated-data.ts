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
  overflowX?: NonTokenizedStyleProps['overflowInline'];
  overflow?: NonTokenizedStyleProps['overflowInline'] & NonTokenizedStyleProps['overflowBlock'];
  overflowY?: NonTokenizedStyleProps['overflowBlock'];
  overscrollBehaviorX?: NonTokenizedStyleProps['overscrollBehaviorInline'];
  overscrollBehavior?: NonTokenizedStyleProps['overscrollBehaviorInline'] & NonTokenizedStyleProps['overscrollBehaviorBlock'];
  overscrollBehaviorY?: NonTokenizedStyleProps['overscrollBehaviorBlock'];
  borderTopLeftRadius?: NonTokenizedStyleProps['borderStartStartRadius'];
  borderTopRightRadius?: NonTokenizedStyleProps['borderStartEndRadius'];
  borderBottomLeftRadius?: NonTokenizedStyleProps['borderEndStartRadius'];
  borderBottomRightRadius?: NonTokenizedStyleProps['borderEndEndRadius'];
  borderLeftColor?: NonTokenizedStyleProps['borderInlineStartColor'];
  borderInlineColor?: NonTokenizedStyleProps['borderInlineStartColor'] & NonTokenizedStyleProps['borderInlineEndColor'];
  borderRightColor?: NonTokenizedStyleProps['borderInlineEndColor'];
  borderTopColor?: NonTokenizedStyleProps['borderBlockStartColor'];
  borderBlockColor?: NonTokenizedStyleProps['borderBlockStartColor'] & NonTokenizedStyleProps['borderBlockEndColor'];
  borderBottomColor?: NonTokenizedStyleProps['borderBlockEndColor'];
  borderLeftStyle?: NonTokenizedStyleProps['borderInlineStartStyle'];
  borderInlineStyle?: NonTokenizedStyleProps['borderInlineStartStyle'] & NonTokenizedStyleProps['borderInlineEndStyle'];
  borderStyle?: NonTokenizedStyleProps['borderInlineStartStyle'] & NonTokenizedStyleProps['borderInlineEndStyle'] & NonTokenizedStyleProps['borderBlockStartStyle'] & NonTokenizedStyleProps['borderBlockEndStyle'];
  borderRightStyle?: NonTokenizedStyleProps['borderInlineEndStyle'];
  borderTopStyle?: NonTokenizedStyleProps['borderBlockStartStyle'];
  borderBlockStyle?: NonTokenizedStyleProps['borderBlockStartStyle'] & NonTokenizedStyleProps['borderBlockEndStyle'];
  borderBottomStyle?: NonTokenizedStyleProps['borderBlockEndStyle'];
  borderLeftWidth?: NonTokenizedStyleProps['borderInlineStartWidth'];
  borderInlineWidth?: NonTokenizedStyleProps['borderInlineStartWidth'] & NonTokenizedStyleProps['borderInlineEndWidth'];
  borderRightWidth?: NonTokenizedStyleProps['borderInlineEndWidth'];
  borderTopWidth?: NonTokenizedStyleProps['borderBlockStartWidth'];
  borderBlockWidth?: NonTokenizedStyleProps['borderBlockStartWidth'] & NonTokenizedStyleProps['borderBlockEndWidth'];
  borderBottomWidth?: NonTokenizedStyleProps['borderBlockEndWidth'];
  left?: NonTokenizedStyleProps['insetInlineStart'];
  insetInline?: NonTokenizedStyleProps['insetInlineStart'] & NonTokenizedStyleProps['insetInlineEnd'];
  inset?: NonTokenizedStyleProps['insetInlineStart'] & NonTokenizedStyleProps['insetInlineEnd'] & NonTokenizedStyleProps['insetBlockStart'] & NonTokenizedStyleProps['insetBlockEnd'];
  right?: NonTokenizedStyleProps['insetInlineEnd'];
  top?: NonTokenizedStyleProps['insetBlockStart'];
  insetBlock?: NonTokenizedStyleProps['insetBlockStart'] & NonTokenizedStyleProps['insetBlockEnd'];
  bottom?: NonTokenizedStyleProps['insetBlockEnd'];
  scrollPaddingLeft?: NonTokenizedStyleProps['scrollPaddingInlineStart'];
  scrollPaddingInline?: NonTokenizedStyleProps['scrollPaddingInlineStart'] & NonTokenizedStyleProps['scrollPaddingInlineEnd'];
  scrollPadding?: NonTokenizedStyleProps['scrollPaddingInlineStart'] & NonTokenizedStyleProps['scrollPaddingInlineEnd'] & NonTokenizedStyleProps['scrollPaddingBlockStart'] & NonTokenizedStyleProps['scrollPaddingBlockEnd'];
  scrollPaddingRight?: NonTokenizedStyleProps['scrollPaddingInlineEnd'];
  scrollPaddingTop?: NonTokenizedStyleProps['scrollPaddingBlockStart'];
  scrollPaddingBlock?: NonTokenizedStyleProps['scrollPaddingBlockStart'] & NonTokenizedStyleProps['scrollPaddingBlockEnd'];
  scrollPaddingBottom?: NonTokenizedStyleProps['scrollPaddingBlockEnd'];
  scrollMarginLeft?: NonTokenizedStyleProps['scrollMarginInlineStart'];
  scrollMarginInline?: NonTokenizedStyleProps['scrollMarginInlineStart'] & NonTokenizedStyleProps['scrollMarginInlineEnd'];
  scrollMargin?: NonTokenizedStyleProps['scrollMarginInlineStart'] & NonTokenizedStyleProps['scrollMarginInlineEnd'] & NonTokenizedStyleProps['scrollMarginBlockStart'] & NonTokenizedStyleProps['scrollMarginBlockEnd'];
  scrollMarginRight?: NonTokenizedStyleProps['scrollMarginInlineEnd'];
  scrollMarginTop?: NonTokenizedStyleProps['scrollMarginBlockStart'];
  scrollMarginBlock?: NonTokenizedStyleProps['scrollMarginBlockStart'] & NonTokenizedStyleProps['scrollMarginBlockEnd'];
  scrollMarginBottom?: NonTokenizedStyleProps['scrollMarginBlockEnd'];
  justify?: NonTokenizedStyleProps['justifyItems'];
  align?: NonTokenizedStyleProps['alignItems'];
};

/**
 * Style props who only accept tokenized values.
 *
 * For example; 'padding-inline-start' can only accept the 'space-*' tokens.
 */
type TokenizedStyleProps= Omit<TokenizedStylePropsAndAliases, typeof stylePropAliasNames[number]>;

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
  'opacity' |
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
export const stylePropAliases = {
  "rowGap": [
    "gap"
  ],
  "columnGap": [
    "gap"
  ],
  "paddingInlineStart": [
    "paddingLeft",
    "paddingInline",
    "padding"
  ],
  "paddingInlineEnd": [
    "paddingRight",
    "paddingInline",
    "padding"
  ],
  "paddingBlockStart": [
    "paddingTop",
    "paddingBlock",
    "padding"
  ],
  "paddingBlockEnd": [
    "paddingBottom",
    "paddingBlock",
    "padding"
  ],
  "marginInlineStart": [
    "marginLeft",
    "marginInline",
    "margin"
  ],
  "marginInlineEnd": [
    "marginRight",
    "marginInline",
    "margin"
  ],
  "marginBlockStart": [
    "marginTop",
    "marginBlock",
    "margin"
  ],
  "marginBlockEnd": [
    "marginBottom",
    "marginBlock",
    "margin"
  ],
  "inlineSize": [
    "width",
    "size"
  ],
  "blockSize": [
    "height",
    "size"
  ],
  "minInlineSize": [
    "minWidth",
    "minSize"
  ],
  "minBlockSize": [
    "minHeight",
    "minSize"
  ],
  "maxInlineSize": [
    "maxWidth",
    "maxSize"
  ],
  "maxBlockSize": [
    "maxHeight",
    "maxSize"
  ],
  "containIntrinsicInlineSize": [
    "containIntrinsicWidth",
    "containIntrinsicSize"
  ],
  "containIntrinsicBlockSize": [
    "containIntrinsicHeight",
    "containIntrinsicSize"
  ],
  "overflowInline": [
    "overflowX",
    "overflow"
  ],
  "overflowBlock": [
    "overflowY",
    "overflow"
  ],
  "overscrollBehaviorInline": [
    "overscrollBehaviorX",
    "overscrollBehavior"
  ],
  "overscrollBehaviorBlock": [
    "overscrollBehaviorY",
    "overscrollBehavior"
  ],
  "borderStartStartRadius": [
    "borderTopLeftRadius",
    "borderRadius"
  ],
  "borderStartEndRadius": [
    "borderTopRightRadius",
    "borderRadius"
  ],
  "borderEndStartRadius": [
    "borderBottomLeftRadius",
    "borderRadius"
  ],
  "borderEndEndRadius": [
    "borderBottomRightRadius",
    "borderRadius"
  ],
  "borderInlineStartColor": [
    "borderLeftColor",
    "borderInlineColor",
    "borderColor"
  ],
  "borderInlineEndColor": [
    "borderRightColor",
    "borderInlineColor",
    "borderColor"
  ],
  "borderBlockStartColor": [
    "borderTopColor",
    "borderBlockColor",
    "borderColor"
  ],
  "borderBlockEndColor": [
    "borderBottomColor",
    "borderBlockColor",
    "borderColor"
  ],
  "borderInlineStartStyle": [
    "borderLeftStyle",
    "borderInlineStyle",
    "borderStyle"
  ],
  "borderInlineEndStyle": [
    "borderRightStyle",
    "borderInlineStyle",
    "borderStyle"
  ],
  "borderBlockStartStyle": [
    "borderTopStyle",
    "borderBlockStyle",
    "borderStyle"
  ],
  "borderBlockEndStyle": [
    "borderBottomStyle",
    "borderBlockStyle",
    "borderStyle"
  ],
  "borderInlineStartWidth": [
    "borderLeftWidth",
    "borderInlineWidth",
    "borderWidth"
  ],
  "borderInlineEndWidth": [
    "borderRightWidth",
    "borderInlineWidth",
    "borderWidth"
  ],
  "borderBlockStartWidth": [
    "borderTopWidth",
    "borderBlockWidth",
    "borderWidth"
  ],
  "borderBlockEndWidth": [
    "borderBottomWidth",
    "borderBlockWidth",
    "borderWidth"
  ],
  "insetInlineStart": [
    "left",
    "insetInline",
    "inset"
  ],
  "insetInlineEnd": [
    "right",
    "insetInline",
    "inset"
  ],
  "insetBlockStart": [
    "top",
    "insetBlock",
    "inset"
  ],
  "insetBlockEnd": [
    "bottom",
    "insetBlock",
    "inset"
  ],
  "scrollPaddingInlineStart": [
    "scrollPaddingLeft",
    "scrollPaddingInline",
    "scrollPadding"
  ],
  "scrollPaddingInlineEnd": [
    "scrollPaddingRight",
    "scrollPaddingInline",
    "scrollPadding"
  ],
  "scrollPaddingBlockStart": [
    "scrollPaddingTop",
    "scrollPaddingBlock",
    "scrollPadding"
  ],
  "scrollPaddingBlockEnd": [
    "scrollPaddingBottom",
    "scrollPaddingBlock",
    "scrollPadding"
  ],
  "scrollMarginInlineStart": [
    "scrollMarginLeft",
    "scrollMarginInline",
    "scrollMargin"
  ],
  "scrollMarginInlineEnd": [
    "scrollMarginRight",
    "scrollMarginInline",
    "scrollMargin"
  ],
  "scrollMarginBlockStart": [
    "scrollMarginTop",
    "scrollMarginBlock",
    "scrollMargin"
  ],
  "scrollMarginBlockEnd": [
    "scrollMarginBottom",
    "scrollMarginBlock",
    "scrollMargin"
  ],
  "justifyItems": [
    "justify"
  ],
  "alignItems": [
    "align"
  ]
} as const;

// Extract a unique set of just the alias names
export const stylePropAliasNames = Array.from(new Set(Object.values(stylePropAliases).flat()));

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
