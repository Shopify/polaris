// TODO: Confirm this list is complete or source it from mdn/webref data somehow
const positionalCSSProperties = [
  'width',
  'height',
  'paddingLeft',
  'paddingTop',
  'paddingRight',
  'paddingBottom',
  'marginLeft',
  'marginTop',
  'marginRight',
  'marginBottom',
  'maxWidth',
  'maxHeight',
  'minWidth',
  'minHeight',
  'borderTopLeftRadius',
  'borderTopRightRadius',
  'borderBottomRightRadius',
  'borderBottomLeftRadius',
  'borderTopColor',
  'borderRightColor',
  'borderBottomColor',
  'borderLeftColor',
  'borderTopStyle',
  'borderRightStyle',
  'borderBottomStyle',
  'borderLeftStyle',
  'borderTopWidth',
  'borderRightWidth',
  'borderBottomWidth',
  'borderLeftWidth',
  'overflowX',
  'overflowY',
  'overscrollBehaviorX',
  'overscrollBehaviorY',
  'scrollPaddingTop',
  'scrollPaddingRight',
  'scrollPaddingBottom',
  'scrollPaddingLeft',
  'scrollMarginTop',
  'scrollMarginRight',
  'scrollMarginBottom',
  'scrollMarginLeft',
  'top',
  'left',
  'right',
  'bottom',
  'containIntrinsicWidth',
  'containIntrinsicHeight',
];

// Remove these once https://github.com/frenic/csstype/pull/188 is merged
const incorrectlyMarkedAsLonghandByCSSTypes = [
  'borderBlockColor',
  'borderBlockStyle',
  'borderBlockWidth',
  'borderInlineColor',
  'borderInlineStyle',
  'borderInlineWidth',
];

export const disallowedCSSProperties = [
  // We only support logical properties, but later alias these to their
  // positional counterparts following the principle of: Do what the user
  // intended, not what they said.
  ...positionalCSSProperties,

  ...incorrectlyMarkedAsLonghandByCSSTypes,

  // Exclude from https://www.w3.org/TR/compat
  'touchAction',
  // Exclude from https://www.w3.org/TR/css-cascade
  'all',
  // Exclude from https://www.w3.org/TR/css-content
  'content',
  'quotes',
  'stringSet',
  'bookmarkLevel',
  'bookmarkLabel',
  'bookmarkState',
  // Exclude from https://www.w3.org/TR/css-gcpm
  'copyInto',
  'content',
  'footnoteDisplay',
  'footnotePolicy',
  // Exclude from https://www.w3.org/TR/css-page-floats
  'floatReference',
  'floatDefer',
  'floatOffset',
  // Exclude from https://www.w3.org/TR/css-page
  'page',
  // Exclude from https://www.w3.org/TR/mathml-core
  'mathStyle',
  'mathShift',
  'mathDepth',
];

export const disallowedCSSPropertyValues = [
  'inherit',
  'initial',
  '-moz-initial',
];

/**
 * An incomplete list of supported style props.
 *
 * The complete list is roughly:
 * ```
 * styleProps = {
 *   ...StandardLonghandProperties.exclude(disallowedCSSProperties),
 *   ...stylePropConfig,
 *   ...stylePropConfig[].fallbacks.flat(),
 * };
 * ```
 *
 * Where `StandardLonghandProperties` comes from csstype:
 * https://github.com/frenic/csstype/blob/46694defae2cf3386218d0000490b0d0ac385aa6/index.d.ts#L11
 */
export const stylePropConfig = {
  rowGap: {aliases: ['gap']},
  columnGap: {aliases: ['gap']},
  paddingInlineStart: {aliases: ['paddingLeft', 'paddingInline', 'padding']},
  paddingInlineEnd: {aliases: ['paddingRight', 'paddingInline', 'padding']},
  paddingBlockStart: {aliases: ['paddingTop', 'paddingBlock', 'padding']},
  paddingBlockEnd: {aliases: ['paddingBottom', 'paddingBlock', 'padding']},
  marginInlineStart: {aliases: ['marginLeft', 'marginInline', 'margin']},
  marginInlineEnd: {aliases: ['marginRight', 'marginInline', 'margin']},
  marginBlockStart: {aliases: ['marginTop', 'marginBlock', 'margin']},
  marginBlockEnd: {aliases: ['marginBottom', 'marginBlock', 'margin']},
  inlineSize: {aliases: ['width', 'size']},
  blockSize: {aliases: ['height', 'size']},
  minInlineSize: {aliases: ['minWidth', 'minSize']},
  minBlockSize: {aliases: ['minHeight', 'minSize']},
  maxInlineSize: {aliases: ['maxWidth', 'maxSize']},
  maxBlockSize: {aliases: ['maxHeight', 'maxSize']},
  containIntrinsicInlineSize: {
    aliases: ['containIntrinsicWidth', 'containIntrinsicSize'],
  },
  containIntrinsicBlockSize: {
    aliases: ['containIntrinsicHeight', 'containIntrinsicSize'],
  },
  overflowInline: {aliases: ['overflowX', 'overflow']},
  overflowBlock: {aliases: ['overflowY', 'overflow']},
  overscrollBehaviorInline: {
    aliases: ['overscrollBehaviorX', 'overscrollBehavior'],
  },
  overscrollBehaviorBlock: {
    aliases: ['overscrollBehaviorY', 'overscrollBehavior'],
  },
  backgroundPositionX: {aliases: ['backgroundPosition']},
  backgroundPositionY: {aliases: ['backgroundPosition']},
  borderStartStartRadius: {aliases: ['borderTopLeftRadius', 'borderRadius']},
  borderStartEndRadius: {aliases: ['borderTopRightRadius', 'borderRadius']},
  borderEndStartRadius: {aliases: ['borderBottomLeftRadius', 'borderRadius']},
  borderEndEndRadius: {aliases: ['borderBottomRightRadius', 'borderRadius']},
  borderInlineStartColor: {
    aliases: ['borderLeftColor', 'borderInlineColor', 'borderColor'],
  },
  borderInlineEndColor: {
    aliases: ['borderRightColor', 'borderInlineColor', 'borderColor'],
  },
  borderBlockStartColor: {
    aliases: ['borderTopColor', 'borderBlockColor', 'borderColor'],
  },
  borderBlockEndColor: {
    aliases: ['borderBottomColor', 'borderBlockColor', 'borderColor'],
  },
  borderInlineStartStyle: {
    aliases: ['borderLeftStyle', 'borderInlineStyle', 'borderStyle'],
  },
  borderInlineEndStyle: {
    aliases: ['borderRightStyle', 'borderInlineStyle', 'borderStyle'],
  },
  borderBlockStartStyle: {
    aliases: ['borderTopStyle', 'borderBlockStyle', 'borderStyle'],
  },
  borderBlockEndStyle: {
    aliases: ['borderBottomStyle', 'borderBlockStyle', 'borderStyle'],
  },
  borderInlineStartWidth: {
    aliases: ['borderLeftWidth', 'borderInlineWidth', 'borderWidth'],
  },
  borderInlineEndWidth: {
    aliases: ['borderRightWidth', 'borderInlineWidth', 'borderWidth'],
  },
  borderBlockStartWidth: {
    aliases: ['borderTopWidth', 'borderBlockWidth', 'borderWidth'],
  },
  borderBlockEndWidth: {
    aliases: ['borderBottomWidth', 'borderBlockWidth', 'borderWidth'],
  },
  insetInlineStart: {aliases: ['left', 'insetInline', 'inset']},
  insetInlineEnd: {aliases: ['right', 'insetInline', 'inset']},
  insetBlockStart: {aliases: ['top', 'insetBlock', 'inset']},
  insetBlockEnd: {aliases: ['bottom', 'insetBlock', 'inset']},
  scrollPaddingInlineStart: {
    aliases: ['scrollPaddingLeft', 'scrollPaddingInline', 'scrollPadding'],
  },
  scrollPaddingInlineEnd: {
    aliases: ['scrollPaddingRight', 'scrollPaddingInline', 'scrollPadding'],
  },
  scrollPaddingBlockStart: {
    aliases: ['scrollPaddingTop', 'scrollPaddingBlock', 'scrollPadding'],
  },
  scrollPaddingBlockEnd: {
    aliases: ['scrollPaddingBottom', 'scrollPaddingBlock', 'scrollPadding'],
  },
  scrollMarginInlineStart: {
    aliases: ['scrollMarginLeft', 'scrollMarginInline', 'scrollMargin'],
  },
  scrollMarginInlineEnd: {
    aliases: ['scrollMarginRight', 'scrollMarginInline', 'scrollMargin'],
  },
  scrollMarginBlockStart: {
    aliases: ['scrollMarginTop', 'scrollMarginBlock', 'scrollMargin'],
  },
  scrollMarginBlockEnd: {
    aliases: ['scrollMarginBottom', 'scrollMarginBlock', 'scrollMargin'],
  },
  justifyItems: {aliases: ['justify']},
  alignItems: {aliases: ['align']},
};
