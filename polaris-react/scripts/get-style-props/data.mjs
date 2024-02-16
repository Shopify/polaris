import path from 'path';
import * as url from 'url';

import {metaThemeDefault} from '@shopify/polaris-tokens';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export const styleFile = path.resolve(
  __dirname,
  '../../src/components/Box/generated-style.module.scss',
);
export const typesFile = path.resolve(
  __dirname,
  '../../src/components/Box/generated-data.ts',
);

export const valueMapperFile = path.resolve(
  __dirname,
  '../../src/components/Box/.scss',
);

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
  'quotes',
  'stringSet',
  'bookmarkLevel',
  'bookmarkLabel',
  'bookmarkState',
  // Exclude from https://www.w3.org/TR/css-gcpm
  'copyInto',
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
  // Standardized, but no browser support, so we alias it to x/y
  'overflowInline',
  'overflowBlock',
];

// Can disable some global property values if desired.
// For possibe values, see csstype:
// https://github.com/frenic/csstype/blob/46694defae2cf3386218d0000490b0d0ac385aa6/index.d.ts#L18457
export const disallowedCSSPropertyValues = ['-moz-initial'];

/**
 * An incomplete list of supported style props.
 *
 * The complete list is roughly:
 * ```
 * styleProps = {
 *   ...StandardLonghandProperties.exclude(disallowedCSSProperties),
 *   ...stylePropConfig,
 *   ...stylePropConfig[].aliases.flat(),
 * };
 * ```
 *
 * Where `StandardLonghandProperties` comes from csstype:
 * https://github.com/frenic/csstype/blob/46694defae2cf3386218d0000490b0d0ac385aa6/index.d.ts#L11
 *
 * Type:
 * {
 *   [x: string]: {
 *     aliases?: (keyof StandardLonghandProperties | keyof Aliases)[],
 *     // Defaults can be responsive, but are NOT merged with passed in values.
 *   }
 * }
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
  overflowX: {aliases: ['overflowInline', 'overflow']},
  overflowY: {aliases: ['overflowBlock', 'overflow']},
  overscrollBehaviorInline: {
    aliases: ['overscrollBehaviorX', 'overscrollBehavior'],
  },
  overscrollBehaviorBlock: {
    aliases: ['overscrollBehaviorY', 'overscrollBehavior'],
  },
  backgroundColor: {aliases: ['background']},
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
  boxShadow: {aliases: ['shadow']},
};

// Get all breakpoints massaged into a more useful set of data
export const breakpoints = Object.fromEntries([
  // Alias base size to 'xs': A bare '&' has a special meaning; it's an alias
  // for the 'base' styles when no media query applies.
  ['xs', '&'],
  ...Object.entries(metaThemeDefault.breakpoints)
    .map(([key, breakpoint]) => [
      // We just want the actual size, no prefix
      key.replace('breakpoints-', ''),
      `@media screen and (min-width: ${breakpoint.value})`,
    ])
    // Skip the 'xs' size as we've done it above outside of the media queries
    // (mobile first ftw!)
    .slice(1),
]);

// keys are CSS selectors, values are used as CSS custom property names (see
// https://drafts.csswg.org/css-syntax-3/#non-ascii-ident-code-point) AND
// Typescript types.
// Can be set to `true` to use a default set of common modifiers.
export const modifiers = {
  _active: ':active',
  _focus: ':focus',
  _hover: ':hover',
  _visited: ':visited',
  _link: ':link',
};

// keys are CSS selectors, values are used as CSS custom property names (see
// https://drafts.csswg.org/css-syntax-3/#non-ascii-ident-code-point) AND
// Typescript types.
// Can be set to `true` to use a default set of common pseudo elements.
// Enables style objects such as:
// ```
// &::before { /* Style ::before pseudo */ }
// &:hover::before { /* Style ::before pseudo when parent is hovered */ }
// ```
// NOTE: CSS does not make it possible to style a modified pseudo element. ie;
// There's no ::before:hover
export const pseudoElements = {
  _before: '::before',
  _after: '::after',
};

// Used to ensure custom properties don't collide with other user created ones
// Alternatives: ⅀ ℈ ￪ 〓 ￮ _
export const cssCustomPropertyNamespace = '_';

// TODO: Replace this with a version passed into whatever function gets called
// inside `<AppProvider>` to setup the whole lot (currently it's passed into
// `<Box>`'s callsite of the convert function).
export const boxValueMapperFactory =
  (stylePropTokenGroupMap) => (value, prop) => {
    // If this is a tokenized styleprop, we must convert it to a CSS var().
    if (!Object.prototype.hasOwnProperty.call(stylePropTokenGroupMap, prop)) {
      return value;
    }

    // @ts-expect-error The above check ensures this key exists
    const tokenSubgroup = stylePropTokenGroupMap[prop];

    // `Grid`'s `gap` prop used to allow passing fully formed var() functions as
    // the value. This is no longer supported in v12+.
    if (typeof value === 'string' && value.startsWith('var(')) {
      throw new Error(
        `"${value}" is not from the ${tokenSubgroup} token group.`,
      );
    }

    // NOTE: All our token values today are either strings or numbers, so
    // stringifying them here works. But if we ever have anything more complex
    // (such as an object) this may generate invalid token names.
    return `var(--p-${tokenSubgroup ? `${tokenSubgroup}-` : ''}${value})`;
  };
