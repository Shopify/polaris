import fs from 'fs/promises';
import path from 'path';
import * as url from 'url';
import {createRequire} from 'node:module';
import * as ts from 'typescript';
import {
  tokenizedStyleProps as tokenizedCSSStyleProps,
  metaThemeDefault,
  toPx,
} from '@shopify/polaris-tokens';

// Get all breakpoints massaged into a more useful set of data
const breakpoints = Object.entries(metaThemeDefault.breakpoints).map(
  ([key, breakpoint]) => ({
    // We just want the actual size, no prefix
    key: key.replace('breakpoints-', ''),
    // convert rems to px
    value: toPx(breakpoint.value),
  }),
);

const cssLonghandProperties = getCSSTypeLonghandPropertyNames();

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

const disallowedCSSProperties = [
  // We only support logical properties, but later alias these to their
  // positional counterparts following the principle of: Do what the user
  // intended, not what they said.
  ...positionalCSSProperties,

  ...incorrectlyMarkedAsLonghandByCSSTypes,

  // We don't want to include vendor prefixed properties, but oddly this one
  // property shows up in the list of "standard" CSS Properties.
  // '-webkit-line-clamp',

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

const disallowedCSSPropertyValues = ['inherit', 'initial', '-moz-initial'];

const stylePropAliasFallbacks = {
  rowGap: ['gap'],
  columnGap: ['gap'],
  paddingInlineStart: ['paddingLeft', 'paddingInline', 'padding'],
  paddingInlineEnd: ['paddingRight', 'paddingInline', 'padding'],
  paddingBlockStart: ['paddingTop', 'paddingBlock', 'padding'],
  paddingBlockEnd: ['paddingBottom', 'paddingBlock', 'padding'],
  marginInlineStart: ['marginLeft', 'marginInline', 'margin'],
  marginInlineEnd: ['marginRight', 'marginInline', 'margin'],
  marginBlockStart: ['marginTop', 'marginBlock', 'margin'],
  marginBlockEnd: ['marginBottom', 'marginBlock', 'margin'],
  inlineSize: ['width', 'size'],
  blockSize: ['height', 'size'],
  minInlineSize: ['minWidth', 'minSize'],
  minBlockSize: ['minHeight', 'minSize'],
  maxInlineSize: ['maxWidth', 'maxSize'],
  maxBlockSize: ['maxHeight', 'maxSize'],
  containIntrinsicInlineSize: ['containIntrinsicWidth', 'containIntrinsicSize'],
  containIntrinsicBlockSize: ['containIntrinsicHeight', 'containIntrinsicSize'],
  overflowInline: ['overflowX', 'overflow'],
  overflowBlock: ['overflowY', 'overflow'],
  overscrollBehaviorInline: ['overscrollBehaviorX', 'overscrollBehavior'],
  overscrollBehaviorBlock: ['overscrollBehaviorY', 'overscrollBehavior'],
  backgroundPositionX: ['backgroundPosition'],
  backgroundPositionY: ['backgroundPosition'],
  borderStartStartRadius: ['borderTopLeftRadius', 'borderRadius'],
  borderStartEndRadius: ['borderTopRightRadius', 'borderRadius'],
  borderEndStartRadius: ['borderBottomLeftRadius', 'borderRadius'],
  borderEndEndRadius: ['borderBottomRightRadius', 'borderRadius'],
  borderInlineStartColor: [
    'borderLeftColor',
    'borderInlineColor',
    'borderColor',
  ],
  borderInlineEndColor: [
    'borderRightColor',
    'borderInlineColor',
    'borderColor',
  ],
  borderBlockStartColor: ['borderTopColor', 'borderBlockColor', 'borderColor'],
  borderBlockEndColor: ['borderBottomColor', 'borderBlockColor', 'borderColor'],
  borderInlineStartStyle: [
    'borderLeftStyle',
    'borderInlineStyle',
    'borderStyle',
  ],
  borderInlineEndStyle: [
    'borderRightStyle',
    'borderInlineStyle',
    'borderStyle',
  ],
  borderBlockStartStyle: ['borderTopStyle', 'borderBlockStyle', 'borderStyle'],
  borderBlockEndStyle: ['borderBottomStyle', 'borderBlockStyle', 'borderStyle'],
  borderInlineStartWidth: [
    'borderLeftWidth',
    'borderInlineWidth',
    'borderWidth',
  ],
  borderInlineEndWidth: [
    'borderRightWidth',
    'borderInlineWidth',
    'borderWidth',
  ],
  borderBlockStartWidth: ['borderTopWidth', 'borderBlockWidth', 'borderWidth'],
  borderBlockEndWidth: ['borderBottomWidth', 'borderBlockWidth', 'borderWidth'],
  insetInlineStart: ['left', 'insetInline', 'inset'],
  insetInlineEnd: ['right', 'insetInline', 'inset'],
  insetBlockStart: ['top', 'insetBlock', 'inset'],
  insetBlockEnd: ['bottom', 'insetBlock', 'inset'],
  scrollPaddingInlineStart: [
    'scrollPaddingLeft',
    'scrollPaddingInline',
    'scrollPadding',
  ],
  scrollPaddingInlineEnd: [
    'scrollPaddingRight',
    'scrollPaddingInline',
    'scrollPadding',
  ],
  scrollPaddingBlockStart: [
    'scrollPaddingTop',
    'scrollPaddingBlock',
    'scrollPadding',
  ],
  scrollPaddingBlockEnd: [
    'scrollPaddingBottom',
    'scrollPaddingBlock',
    'scrollPadding',
  ],
  scrollMarginInlineStart: [
    'scrollMarginLeft',
    'scrollMarginInline',
    'scrollMargin',
  ],
  scrollMarginInlineEnd: [
    'scrollMarginRight',
    'scrollMarginInline',
    'scrollMargin',
  ],
  scrollMarginBlockStart: [
    'scrollMarginTop',
    'scrollMarginBlock',
    'scrollMargin',
  ],
  scrollMarginBlockEnd: [
    'scrollMarginBottom',
    'scrollMarginBlock',
    'scrollMargin',
  ],
  justifyItems: ['justify'],
  alignItems: ['align'],
};

// Extract a unique set of just the alias names
const allAliases = Array.from(
  new Set(Object.values(stylePropAliasFallbacks).flat()),
);

const inverseAliases = Object.entries(stylePropAliasFallbacks).reduce(
  (acc, [prop, aliases]) => {
    for (let alias of aliases) {
      acc[alias] = acc[alias] ?? [];
      acc[alias].push(prop);
    }
    return acc;
  },
  {},
);

verifyAliases();

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const sassFile = await fs.open(
  path.resolve(__dirname, '../src/components/Cube/style.module.scss'),
  'w+',
);

await writeCSSMediaVars(sassFile);

await sassFile.close();

const tsFile = await fs.open(
  path.resolve(__dirname, '../src/components/Cube/generated-data.ts'),
  'w+',
);
await writeTSProperties(tsFile);
await tsFile.close();

// -----

function verifyAliases() {
  const aliasCollisions = [];
  for (let longhandProperty of cssLonghandProperties) {
    // To avoid ambiguity and ensure data integrity, we do not allow aliases
    // to have the same name as an allowed CSS property.
    if (
      !disallowedCSSProperties.includes(longhandProperty) &&
      allAliases.includes(longhandProperty)
    ) {
      aliasCollisions.push(longhandProperty);
    }
  }

  if (aliasCollisions.length) {
    console.error(
      `The following CSS properties collide with style prop aliases. Did you mean to add the CSS properties to disallowedCSSProperties[]?

${aliasCollisions.map((prop) => `${prop}`).join('\n')}`,
    );

    process.exit(-1);
  }
}

// TODO, use this for:
// 1. Ensure there are no aliases overriding longhand CSS properties
// 2. Filter down the tokenized property names exported from tokens lib
function getCSSTypeLonghandPropertyNames() {
  const require = createRequire(import.meta.url);
  const cssTypeDefinitionFile = require.resolve('csstype/index.d.ts');

  const program = ts.default.createProgram([cssTypeDefinitionFile], {});
  const checker = program.getTypeChecker();
  const sourceFile = program.getSourceFile(cssTypeDefinitionFile);
  const exports = checker.getExportsOfModule(
    checker.getSymbolAtLocation(sourceFile),
  );
  const defaultExportSymbol = exports.find(
    (e) => e.escapedName === 'StandardLonghandProperties',
  );

  let type = checker.getDeclaredTypeOfSymbol(defaultExportSymbol);

  return type.getProperties().map(({name}) => name);
}

async function writeTSProperties(tsFile) {
  const generateTSPickList = (keys, indent) => {
    // We add additional single quotes here because the second argument for Pick
    // is a union of string literal types
    return keys.map((key) => `'${key}'`).join(` |\n${' '.repeat(indent)}`);
  };

  const joinEnglish = (arr) => {
    if (arr.length === 1) {
      return arr[0];
    }
    const joined = arr.slice(0, -1).join(', ');
    if (arr.length < 2) {
      return joined;
    }

    return `${joined} and ${arr[arr.length - 1]}`;
  };

  await tsFile.write(`/* THIS FILE IS AUTO GENERATED, DO NOT TOUCH */
import type {StandardLonghandProperties, Globals} from 'csstype';
import type {TokenizedStyleProps} from '@shopify/polaris-tokens';
import type {OverrideProperties}  from 'type-fest';
import type {ResponsiveProp} from '../../utils/various';

/**
 * Pick only the keys in \`PickFrom\` which are also in \`IntersectWith\`.
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
  // For example, \`flex-flow\` is a shorthand of \`<flex-direction> <flex-wrap>\`,
  // and so must come before both of those.
  //
  // Challenges with supporting shorthand properties:
  // a. Cannot use alphabetical sorting (\`flex-direction\` would end up before
  // \`flex-flow\` which is invalid).
  // b. Cannot use \`property.logicalProperyGroup\` from \`@webref/css\` as that's
  // not reliable (doesn't even exist for the \`flex\` family of properties).
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
 * \`@shopify/polaris-tokens\`, so we override those properties here
 *
 * @example
 * \`padding-inline-start\` can only accept the \`space-*\` tokens.
 */
type SupportedStyleProps = OverrideProperties<
  SupportedCSSStyleProps,
  // \`@shopify/polaris-tokens\` may type more CSS properties than we want to
  // support here, so ensure we're only picking the ones we explicityly support
  PickIntersection<TokenizedStyleProps, SupportedCSSStyleProps>
>;

type StyleProps = SupportedStyleProps & StylePropAliases;

/**
 * A combination of raw CSS style props, tokenized style props (derived from
 * \`@shopify/polaris-tokens\`), and helpful aliases for frequently used props.
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
 * \`justify\` is an alias to \`justifyItems\` when \`justifyItems\` isn't set.
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
* \`paddingInline\` is an alias to \`paddingInlineStart\` and
* \`paddingInlineEnd\` when they aren't set.
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
* \`padding\` is an alias to \`paddingInline\` and \`paddingBlock\` which themselves
* are aliases to \`paddingInlineStart\`, \`paddingInlineEnd\` and
* \`paddingBlockStart\`, \`paddingBlockEnd\` respectively.
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
type StylePropAliases = {${Object.entries(inverseAliases)
    .map(
      ([alias, styleProps]) => `
  /**
   * Fallback for ${joinEnglish(styleProps.map((prop) => `\`${prop}\``))}:
   * ${styleProps
     .map(
       (prop) =>
         `props.${prop} = props.${prop} ?? ${stylePropAliasFallbacks[prop]
           .map((fallbackProp) => `props.${fallbackProp}`)
           .join(' ?? ')}`,
     )
     .join('\n   * ')}
   */
  ${alias}?: SupportedStyleProps['${styleProps[0]}'];`,
    )
    .join('\n')}
};

/**
 * CSS properties we don't support. Note: Contains some aliases which are later
 * typed to a different value.
 */
type DisallowedStandardLonghandProperties = ${generateTSPickList(
    disallowedCSSProperties.filter((prop) =>
      cssLonghandProperties.includes(prop),
    ),
    2,
  )};

/**
 * Props which act as an alias to one or more more specific props.
 *
 * For example; 'padding' is an alias to 'padding-inline-start',
 * 'padding-inline-end', etc, when those individual props aren't set.
 */
export const stylePropAliasFallbacks = {
  ${Object.entries(stylePropAliasFallbacks)
    .map(
      ([styleProp, aliasFallbacks]) =>
        `"${styleProp}": ${JSON.stringify(aliasFallbacks)},`,
    )
    .join('\n  ')}
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
export const disallowedCSSPropertyValues = ${JSON.stringify(
    disallowedCSSPropertyValues,
    null,
    2,
  )} satisfies Globals[];

export const tokenizedStyleProps = [
  // Longhand CSS Style Props
  ${tokenizedCSSStyleProps
    .filter(
      (prop) =>
        cssLonghandProperties.includes(prop) && !allAliases.includes(prop),
    )
    .map((prop) => `'${prop}'`)
    .join(',\n  ')},

  // Aliases
  ${Object.entries(inverseAliases)
    // We only check the first property relying on this alias and assume the
    // rest are also tokenized
    .filter(([, properties]) => tokenizedCSSStyleProps.includes(properties[0]))
    .map(([alias]) => `'${alias}'`)
    .join(',\n  ')},
] as const;
`);
}

// See: https://github.com/propjockey/css-media-vars/blob/master/css-media-vars.css
async function writeCSSMediaVars(file) {
  // Skip the 'xs' size as we've done it above outside of the media queries
  // (mobile first ftw!)
  const breakpointsWithoutXs = breakpoints.slice(1);
  await file.write(`/* THIS FILE IS AUTO GENERATED, DO NOT TOUCH */
.Box {
  ${breakpointsWithoutXs
    // Set css-media-vars values to `initial`. If any of these are attempted to be
    // read in a custom CSS Property, it will have the value 'initial' which then
    // triggers the fallback of `var()` to be substituted.
    .map(({key}) => `--_p-media-${key}: initial;`)
    .join('\n  ')}
}
${breakpointsWithoutXs
  // At each breakpoint, set the css-media-vars value to ` ` (a space; a valid
  // value in CSS!). Now when this is attempted to be read, it will simply
  // insert a space which is ignored and the rest of the value is used.
  // Later, these will be used in a rule similar to:
  // --pc-box-color-sm: var(--_p-media-sm) red;
  // --pc-box-color-lg: var(--_p-media-lg) blue;
  // color: var(--pc-box-color-lg, var(--pc-box-color-sm, unset));
  .map(
    ({key, value}) => `
@media screen and (min-width: ${value}) {
  .Box {
    --_p-media-${key}: ;
  }
}`,
  )
  .join('\n')}`);
}
