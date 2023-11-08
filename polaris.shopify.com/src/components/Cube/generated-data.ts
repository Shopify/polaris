
/* THIS FILE IS AUTO GENERATED, DO NOT TOUCH */
import * as CSS from 'csstype';
import type {ComputedTokenCSSProperties} from '@shopify/polaris-tokens';
import {ResponsiveProp} from '../../utils/various';

// We Omit the keys of the ComputedTokenCSSProperties interface, as we want to
// ensure that there are no type collisions between CSS.Properties and our token
// types.
type CSSProperties = Omit<
  Pick<
    CSS.Properties,
    'zIndex' | 'pageBreakBefore' | 'pageBreakAfter' | 'pageBreakInside' | 'mixBlendMode' | 'isolation' | 'backgroundBlendMode' | 'alignContent' | 'justifyContent' | 'justifySelf' | 'alignSelf' | 'justifyItems' | 'alignItems' | 'rowGap' | 'columnGap' | 'animationDuration' | 'animationName' | 'animationTimingFunction' | 'animationIterationCount' | 'animationDirection' | 'animationPlayState' | 'animationDelay' | 'animationFillMode' | 'backgroundPosition' | 'backgroundClip' | 'backgroundColor' | 'backgroundImage' | 'backgroundRepeat' | 'backgroundAttachment' | 'backgroundOrigin' | 'backgroundSize' | 'borderImageSource' | 'borderImageSlice' | 'borderImageWidth' | 'borderImageOutset' | 'borderImageRepeat' | 'breakBefore' | 'breakAfter' | 'breakInside' | 'orphans' | 'widows' | 'boxDecorationBreak' | 'color' | 'opacity' | 'display' | 'order' | 'visibility' | 'flexDirection' | 'flexWrap' | 'flexGrow' | 'flexShrink' | 'flexBasis' | 'fontSizeAdjust' | 'fontFamily' | 'fontWeight' | 'fontStretch' | 'fontStyle' | 'fontSize' | 'fontSynthesis' | 'fontKerning' | 'fontVariantLigatures' | 'fontVariantPosition' | 'fontVariantCaps' | 'fontVariantNumeric' | 'fontVariantAlternates' | 'fontVariantEastAsian' | 'fontVariant' | 'fontFeatureSettings' | 'fontLanguageOverride' | 'fontOpticalSizing' | 'fontVariationSettings' | 'fontPalette' | 'fontVariantEmoji' | 'gridTemplateColumns' | 'gridTemplateRows' | 'gridTemplateAreas' | 'gridAutoColumns' | 'gridAutoRows' | 'gridAutoFlow' | 'gridRowStart' | 'gridColumnStart' | 'gridRowEnd' | 'gridColumnEnd' | 'objectFit' | 'objectPosition' | 'imageOrientation' | 'imageRendering' | 'verticalAlign' | 'lineHeight' | 'listStyleImage' | 'listStyleType' | 'listStylePosition' | 'counterReset' | 'counterIncrement' | 'counterSet' | 'blockSize' | 'inlineSize' | 'minBlockSize' | 'minInlineSize' | 'maxBlockSize' | 'maxInlineSize' | 'marginBlockStart' | 'marginBlockEnd' | 'marginInlineStart' | 'marginInlineEnd' | 'paddingBlockStart' | 'paddingBlockEnd' | 'paddingInlineStart' | 'paddingInlineEnd' | 'borderBlockStartWidth' | 'borderBlockEndWidth' | 'borderInlineStartWidth' | 'borderInlineEndWidth' | 'borderBlockStartStyle' | 'borderBlockEndStyle' | 'borderInlineStartStyle' | 'borderInlineEndStyle' | 'borderBlockStyle' | 'borderInlineStyle' | 'borderBlockStartColor' | 'borderBlockEndColor' | 'borderInlineStartColor' | 'borderInlineEndColor' | 'borderBlockColor' | 'borderInlineColor' | 'borderStartStartRadius' | 'borderStartEndRadius' | 'borderEndStartRadius' | 'borderEndEndRadius' | 'columnSpan' | 'columnWidth' | 'columnCount' | 'columnRuleColor' | 'columnRuleStyle' | 'columnRuleWidth' | 'columnFill' | 'overflowClipMargin' | 'textOverflow' | 'overflowBlock' | 'overflowInline' | 'scrollBehavior' | 'scrollbarGutter' | 'overscrollBehaviorInline' | 'overscrollBehaviorBlock' | 'position' | 'insetBlockStart' | 'insetInlineStart' | 'insetBlockEnd' | 'insetInlineEnd' | 'scrollSnapType' | 'scrollSnapAlign' | 'scrollSnapStop' | 'scrollPaddingTop' | 'scrollPaddingRight' | 'scrollPaddingBottom' | 'scrollPaddingLeft' | 'scrollPaddingInlineStart' | 'scrollPaddingBlockStart' | 'scrollPaddingInlineEnd' | 'scrollPaddingBlockEnd' | 'scrollMarginTop' | 'scrollMarginRight' | 'scrollMarginBottom' | 'scrollMarginLeft' | 'scrollMarginBlockStart' | 'scrollMarginInlineStart' | 'scrollMarginBlockEnd' | 'scrollMarginInlineEnd' | 'scrollbarColor' | 'scrollbarWidth' | 'shapeOutside' | 'shapeImageThreshold' | 'shapeMargin' | 'containIntrinsicBlockSize' | 'containIntrinsicInlineSize' | 'boxSizing' | 'tableLayout' | 'borderCollapse' | 'borderSpacing' | 'captionSide' | 'emptyCells' | 'textTransform' | 'whiteSpace' | 'tabSize' | 'wordBreak' | 'lineBreak' | 'hyphens' | 'hyphenateCharacter' | 'hyphenateLimitChars' | 'overflowWrap' | 'wordWrap' | 'textAlign' | 'textAlignLast' | 'textJustify' | 'wordSpacing' | 'letterSpacing' | 'textIndent' | 'hangingPunctuation' | 'textDecorationLine' | 'textDecorationStyle' | 'textDecorationColor' | 'textDecorationThickness' | 'textUnderlinePosition' | 'textUnderlineOffset' | 'textDecorationSkipInk' | 'textEmphasisStyle' | 'textEmphasisColor' | 'textEmphasisPosition' | 'textShadow' | 'translate' | 'rotate' | 'scale' | 'transformStyle' | 'perspective' | 'perspectiveOrigin' | 'backfaceVisibility' | 'transform' | 'transformOrigin' | 'transformBox' | 'transitionProperty' | 'transitionDuration' | 'transitionTimingFunction' | 'transitionDelay' | 'outlineWidth' | 'outlineStyle' | 'outlineColor' | 'outlineOffset' | 'resize' | 'cursor' | 'caretColor' | 'caretShape' | 'caret' | 'userSelect' | 'accentColor' | 'inputSecurity' | 'willChange' | 'direction' | 'unicodeBidi' | 'writingMode' | 'textOrientation' | 'textCombineUpright' | 'backdropFilter' | 'filter' | 'offsetPath' | 'offsetDistance' | 'offsetAnchor' | 'offsetRotate'
  >,
  keyof ComputedTokenCSSProperties
>;

type ResponsiveCSSProperties = {
  [K in keyof CSSProperties]?: ResponsiveProp<CSSProperties[K]>
};

type ResponsiveTokenProperties = {
  [K in keyof ComputedTokenCSSProperties]?: ResponsiveProp<ComputedTokenCSSProperties[K]>
};

type StyleProps = ResponsiveCSSProperties & ResponsiveTokenProperties;

// TODO: Do we need the intersections here? Can we somehow guarantee that just
// taking the first prop will give us the correct type?
type StylePropAliases = {
  gap?: StyleProps['rowGap'] & StyleProps['columnGap'];
  paddingLeft?: StyleProps['paddingInlineStart'];
  paddingInline?: StyleProps['paddingInlineStart'] & StyleProps['paddingInlineEnd'];
  padding?: StyleProps['paddingInlineStart'] & StyleProps['paddingInlineEnd'] & StyleProps['paddingBlockStart'] & StyleProps['paddingBlockEnd'];
  paddingRight?: StyleProps['paddingInlineEnd'];
  paddingTop?: StyleProps['paddingBlockStart'];
  paddingBlock?: StyleProps['paddingBlockStart'] & StyleProps['paddingBlockEnd'];
  paddingBottom?: StyleProps['paddingBlockEnd'];
  marginLeft?: StyleProps['marginInlineStart'];
  marginInline?: StyleProps['marginInlineStart'] & StyleProps['marginInlineEnd'];
  margin?: StyleProps['marginInlineStart'] & StyleProps['marginInlineEnd'] & StyleProps['marginBlockStart'] & StyleProps['marginBlockEnd'];
  marginRight?: StyleProps['marginInlineEnd'];
  marginTop?: StyleProps['marginBlockStart'];
  marginBlock?: StyleProps['marginBlockStart'] & StyleProps['marginBlockEnd'];
  marginBottom?: StyleProps['marginBlockEnd'];
  width?: StyleProps['inlineSize'];
  size?: StyleProps['inlineSize'] & StyleProps['blockSize'];
  height?: StyleProps['blockSize'];
  minWidth?: StyleProps['minInlineSize'];
  minSize?: StyleProps['minInlineSize'] & StyleProps['minBlockSize'];
  minHeight?: StyleProps['minBlockSize'];
  maxWidth?: StyleProps['maxInlineSize'];
  maxSize?: StyleProps['maxInlineSize'] & StyleProps['maxBlockSize'];
  maxHeight?: StyleProps['maxBlockSize'];
  containIntrinsicWidth?: StyleProps['containIntrinsicInlineSize'];
  containIntrinsicSize?: StyleProps['containIntrinsicInlineSize'] & StyleProps['containIntrinsicBlockSize'];
  containIntrinsicHeight?: StyleProps['containIntrinsicBlockSize'];
  overflowX?: StyleProps['overflowInline'];
  overflow?: StyleProps['overflowInline'] & StyleProps['overflowBlock'];
  overflowY?: StyleProps['overflowBlock'];
  overscrollBehaviorX?: StyleProps['overscrollBehaviorInline'];
  overscrollBehavior?: StyleProps['overscrollBehaviorInline'] & StyleProps['overscrollBehaviorBlock'];
  overscrollBehaviorY?: StyleProps['overscrollBehaviorBlock'];
  borderTopLeftRadius?: StyleProps['borderStartStartRadius'];
  borderRadius?: StyleProps['borderStartStartRadius'] & StyleProps['borderStartEndRadius'] & StyleProps['borderEndStartRadius'] & StyleProps['borderEndEndRadius'];
  borderTopRightRadius?: StyleProps['borderStartEndRadius'];
  borderBottomLeftRadius?: StyleProps['borderEndStartRadius'];
  borderBottomRightRadius?: StyleProps['borderEndEndRadius'];
  borderLeftColor?: StyleProps['borderInlineStartColor'];
  borderInlineColor?: StyleProps['borderInlineStartColor'] & StyleProps['borderInlineEndColor'];
  borderColor?: StyleProps['borderInlineStartColor'] & StyleProps['borderInlineEndColor'] & StyleProps['borderBlockStartColor'] & StyleProps['borderBlockEndColor'];
  borderRightColor?: StyleProps['borderInlineEndColor'];
  borderTopColor?: StyleProps['borderBlockStartColor'];
  borderBlockColor?: StyleProps['borderBlockStartColor'] & StyleProps['borderBlockEndColor'];
  borderBottomColor?: StyleProps['borderBlockEndColor'];
  borderLeftStyle?: StyleProps['borderInlineStartStyle'];
  borderInlineStyle?: StyleProps['borderInlineStartStyle'] & StyleProps['borderInlineEndStyle'];
  borderStyle?: StyleProps['borderInlineStartStyle'] & StyleProps['borderInlineEndStyle'] & StyleProps['borderBlockStartStyle'] & StyleProps['borderBlockEndStyle'];
  borderRightStyle?: StyleProps['borderInlineEndStyle'];
  borderTopStyle?: StyleProps['borderBlockStartStyle'];
  borderBlockStyle?: StyleProps['borderBlockStartStyle'] & StyleProps['borderBlockEndStyle'];
  borderBottomStyle?: StyleProps['borderBlockEndStyle'];
  borderLeftWidth?: StyleProps['borderInlineStartWidth'];
  borderInlineWidth?: StyleProps['borderInlineStartWidth'] & StyleProps['borderInlineEndWidth'];
  borderWidth?: StyleProps['borderInlineStartWidth'] & StyleProps['borderInlineEndWidth'] & StyleProps['borderBlockStartWidth'] & StyleProps['borderBlockEndWidth'];
  borderRightWidth?: StyleProps['borderInlineEndWidth'];
  borderTopWidth?: StyleProps['borderBlockStartWidth'];
  borderBlockWidth?: StyleProps['borderBlockStartWidth'] & StyleProps['borderBlockEndWidth'];
  borderBottomWidth?: StyleProps['borderBlockEndWidth'];
  left?: StyleProps['insetInlineStart'];
  insetInline?: StyleProps['insetInlineStart'] & StyleProps['insetInlineEnd'];
  inset?: StyleProps['insetInlineStart'] & StyleProps['insetInlineEnd'] & StyleProps['insetBlockStart'] & StyleProps['insetBlockEnd'];
  right?: StyleProps['insetInlineEnd'];
  top?: StyleProps['insetBlockStart'];
  insetBlock?: StyleProps['insetBlockStart'] & StyleProps['insetBlockEnd'];
  bottom?: StyleProps['insetBlockEnd'];
  scrollPaddingLeft?: StyleProps['scrollPaddingInlineStart'];
  scrollPaddingInline?: StyleProps['scrollPaddingInlineStart'] & StyleProps['scrollPaddingInlineEnd'];
  scrollPadding?: StyleProps['scrollPaddingInlineStart'] & StyleProps['scrollPaddingInlineEnd'] & StyleProps['scrollPaddingBlockStart'] & StyleProps['scrollPaddingBlockEnd'];
  scrollPaddingRight?: StyleProps['scrollPaddingInlineEnd'];
  scrollPaddingTop?: StyleProps['scrollPaddingBlockStart'];
  scrollPaddingBlock?: StyleProps['scrollPaddingBlockStart'] & StyleProps['scrollPaddingBlockEnd'];
  scrollPaddingBottom?: StyleProps['scrollPaddingBlockEnd'];
  scrollMarginLeft?: StyleProps['scrollMarginInlineStart'];
  scrollMarginInline?: StyleProps['scrollMarginInlineStart'] & StyleProps['scrollMarginInlineEnd'];
  scrollMargin?: StyleProps['scrollMarginInlineStart'] & StyleProps['scrollMarginInlineEnd'] & StyleProps['scrollMarginBlockStart'] & StyleProps['scrollMarginBlockEnd'];
  scrollMarginRight?: StyleProps['scrollMarginInlineEnd'];
  scrollMarginTop?: StyleProps['scrollMarginBlockStart'];
  scrollMarginBlock?: StyleProps['scrollMarginBlockStart'] & StyleProps['scrollMarginBlockEnd'];
  scrollMarginBottom?: StyleProps['scrollMarginBlockEnd'];
};

export type CubeProps = StyleProps & StylePropAliases;

/**
 * An ordered set of aliases for each style prop that has them.
 */
export const stylePropAliases: Partial<Record<keyof StyleProps, readonly (keyof StylePropAliases)[]>> = {
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
  ]
} as const;
  