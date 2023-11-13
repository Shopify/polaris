import css from '@webref/css';
import mdnData from './mdn-properties-data.mjs';
import fs from 'fs/promises';
import path from 'path';
import camelcase from 'camelcase';
import * as url from 'url';
import {
  tokenizedStyleProps,
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

// TODO: Confirm this list is complete.
const cssShorthandProperties = [
  'animation',
  'background',
  'border',
  'border-block',
  'border-block-end',
  'border-block-start',
  'border-bottom',
  'border-color',
  'border-inline-color',
  'border-block-color',
  'border-image',
  'border-inline',
  'border-inline-end',
  'border-inline-start',
  'border-left',
  'border-radius',
  'border-right',
  'border-style',
  'border-block-style',
  'border-inline-style',
  'border-top',
  'border-width',
  'border-inline-width',
  'border-block-width',
  'box-shadow',
  'column-rule',
  'columns',
  'contain-intrinsic-size',
  'flex',
  'flex-flow',
  'font',
  'gap',
  'grid',
  'grid-area',
  'grid-column',
  'grid-row',
  'grid-template',
  'inset',
  'inset-inline',
  'inset-block',
  'list-style',
  'margin',
  'margin-block',
  'margin-inline',
  'mask',
  'offset',
  'outline',
  'overflow',
  'overscroll-behavior',
  'padding',
  'padding-block',
  'padding-inline',
  'place-content',
  'place-items',
  'place-self',
  'scroll-padding',
  'scroll-padding-inline',
  'scroll-padding-block',
  'scroll-margin',
  'scroll-margin-inline',
  'scroll-margin-block',
  'text-decoration',
  'text-emphasis',
  'transition',
];

// TODO: Confirm this list is complete.
const positionalCSSProperties = [
  'width',
  'height',
  'padding-left',
  'padding-top',
  'padding-right',
  'padding-bottom',
  'margin-left',
  'margin-top',
  'margin-right',
  'margin-bottom',
  'max-width',
  'max-height',
  'min-width',
  'min-height',
  'border-top-left-radius',
  'border-top-right-radius',
  'border-bottom-right-radius',
  'border-bottom-left-radius',
  'border-top-color',
  'border-right-color',
  'border-bottom-color',
  'border-left-color',
  'border-top-style',
  'border-right-style',
  'border-bottom-style',
  'border-left-style',
  'border-top-width',
  'border-right-width',
  'border-bottom-width',
  'border-left-width',
  'overflow-x',
  'overflow-y',
  'overscroll-behavior-x',
  'overscroll-behavior-y',
  'scroll-padding-top',
  'scroll-padding-right',
  'scroll-padding-bottom',
  'scroll-padding-left',
  'scroll-margin-top',
  'scroll-margin-right',
  'scroll-margin-bottom',
  'scroll-margin-left',
  'top',
  'left',
  'right',
  'bottom',
  'contain-intrinsic-width',
  'contain-intrinsic-height',
];

// We don't want to include any experimental or non-standard css rules in our
// CSS. These also throw type errors when we generate our types in
// `writeTSProperties()`.
const standardCSSProperties = Object.entries(mdnData)
  .filter(([_, value]) => value.status === 'standard')
  .map(([key]) => key);

const disallowedCSSProperties = [
  // Shorthand properties need to come before longhand properties so
  // the most specific (longhand) applies based on CSS order.
  // For example, `flex-flow` is a shorthand of `<flex-direction> <flex-wrap>`,
  // and so must come before both of those.
  //
  // Challenges with supporting shorthand properties:
  // a. Cannot use alphabetical sorting (`flex-direction` would end up before
  // `flex-flow` which is invalid).
  // b. Cannot use `property.logicalProperyGroup` from `@webref/css` as that's not
  // reliable (doesn't even exist for the `flex` family of properties).
  // c. Cannot rely on the order of properties in an @webref/css specification
  // containing both long and shorthand variants since later "Delta" specs might
  // introduce new shorthands (and so would come after the longhand when
  // iterating and therefore are invalid).
  //
  // Possible solutions:
  // 1. Use data like { 'flex-flow': ['flex-direction', 'flex-wrap'] } to sort
  //    longhands after shorthands
  // 2. Filter out all the shorthand properties completely.
  //
  // We're chosing solution #2 here; filtering out shorthand CSS Properties.
  // This is distinct from a later step where we create "aliases" to enable a
  // builder to pass a single value which acts as a fallback for the props
  // specified as fallbacks. Some of these aliases may have identical names to
  // the shorthand properties, but shouldn't be confused as being the same.
  ...cssShorthandProperties,

  // We only support logical properties, but later alias these to their
  // positional counterparts following the principle of: Do what the user
  // intended, not what they said.
  ...positionalCSSProperties,

  // For some reason these properties are not excluded from the mdn data set we've imported,
  // But is excluded from the csstype library that the CSS.Properties comes from.
  // We filter them out here so we a) remove unnecessary rule and variable instantiation in our CSS
  // and b) don't get type errors in our typescript files.
  'font-synthesis-weight',
  'font-synthesis-style',
  'font-synthesis-small-caps',

  // We don't want to include vendor prefixed properties, but oddly this one
  // property shows up in the list of "standard" CSS Properties.
  '-webkit-line-clamp',
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

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const properties = await getProperties();

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
await writeTSProperties(tsFile, properties);
await tsFile.close();

// -----

async function writeTSProperties(tsFile, properties) {
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
  ${Object.entries(inverseAliases)
    .filter(([key]) => !tokenizedStyleProps.includes(key))
    .map(
      ([alias, styleProps]) => `
  /* Alias for ${joinEnglish(
    styleProps.map((prop) => `\`${prop}\``),
  )} unless already set. */
  ${alias}?: ${styleProps
        .map((prop) => `NonTokenizedStyleProps['${prop}']`)
        .join(' & ')};`,
    )
    .join('')}
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
type SupportedRawCSSStyleProps = ${generateTSPickList(
    Object.keys(properties)
      .map((key) => camelcase(key))
      .filter(
        (key) =>
          !tokenizedStyleProps.includes(key) && !allAliases.includes(key),
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
} as const;

// Extract a unique set of just the alias names
export const stylePropAliasNames = Array.from(new Set(Object.values(stylePropAliasFallbacks).flat()));

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
  )} as const;
`);
}

function isCSSPropertyAllowed(name) {
  return (
    standardCSSProperties.includes(name) &&
    !disallowedCSSProperties.includes(name)
  );
}

async function getProperties() {
  // @webref/css conveniently curates down all the available specs for us. Some
  // specs are defined as "Delta" where they add / modify some properties, those
  // specs are suffixed with `-<number>`
  const stripDeltaSpecSuffix = (specShortName) =>
    specShortName.replace(/-\d$/, '');

  // Note, we don't list the "Delta" specs here (those ending in `-<number>`),
  // but they will be included if found.
  const allowedSpecifications = [
    'CSS',
    'compositing',
    'css-align',
    'css-animations',
    'css-backgrounds',
    'css-borders',
    'css-box',
    'css-break',
    'css-color',
    'css-display',
    'css-flexbox',
    'css-fonts',
    'css-grid',
    'css-images',
    'css-inline',
    'css-line-grid',
    'css-link-params',
    'css-lists',
    'css-logical',
    'css-multicol',
    'css-nav',
    'css-overflow',
    'css-overscroll',
    'css-position',
    'css-scroll-snap',
    'css-scrollbars',
    'css-shapes',
    'css-size-adjust',
    'css-sizing',
    'css-speech',
    'css-tables',
    'css-text',
    'css-text-decor',
    'css-transforms',
    'css-transitions',
    'css-ui',
    'css-view-transitions',
    'css-will-change',
    'css-writing-modes',
    'filter-effects',
    'motion',
    'scroll-animations',
  ];

  const parsedFiles = await css.listAll();

  const properties = {};
  const aliasCollisions = [];
  for (let [shortname, data] of Object.entries(parsedFiles)) {
    // Treat delta specs the same as their "full" spec name. The data in
    // @webref/css is ordered, so deltas will always come after full specs.
    shortname = stripDeltaSpecSuffix(shortname);
    if (!allowedSpecifications.includes(shortname)) {
      continue;
    }

    for (let i = 0; i < data.properties.length; i++) {
      const propertySpec = data.properties[i];
      if (isCSSPropertyAllowed(propertySpec.name)) {
        // To avoid ambiguity and ensure data integrity, we do not allow aliases
        // to have the same name as an allowed CSS property.
        const possibleAliasName = camelcase(propertySpec.name);
        if (allAliases.includes(possibleAliasName)) {
          aliasCollisions.push([propertySpec.name, possibleAliasName]);
        }

        properties[propertySpec.name] = {
          name: propertySpec.name,
          inherited: propertySpec.inherited === 'yes',
        };
      }
    }
  }

  if (aliasCollisions.length) {
    console.error(
      `The following CSS properties collide with style prop aliases. Did you mean to add the CSS properties to cssShorthandProperties[] or disallowedCSSProperties[]?

${aliasCollisions
  .map(([cssProp, alias]) => `${cssProp} => ${alias}`)
  .join('\n')}`,
    );

    process.exit(-1);
  }

  return properties;
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

/*
  * Generates something like:
  *
    color: var(--pc-box-color-xl, var(--pc-box-color-lg, var(--pc-box-color-md, var(--pc-box-color-sm, var(--pc-box-color-xs, inherit)))));

  * Why can't this be simpler, like `color: var(--pc-box-color-xl)`?
* Because we want the custom property to fallback to the `-lg` size if `-xl`
* isn't set.
* Ok, so why can't the defaults be simpler, like:
*
  --pc-box-color-xs: inherit;
  // ...
  --pc-box-color-lg: var(--pc-box-color-md);
  --pc-box-color-xl: var(--pc-box-color-lg);
*
* Because `inherit` applies to what's on the left of the `:` (ie; the CSS custom
* property, NOT the final CSS declaration [like `color`]), and so it'll
* accidentally "inherit" the value of a CSS custom property further up the tree.
*
* Test case:
  <Cube color={{xs: 'red', md: 'white'}}>
    Cube 1
    <Cube color={{sm: 'skyblue', md: 'green'}}>
      Cube 2<Cube>Cube 3</Cube>
    </Cube>
  </Cube>
*/
async function writeResponsiveDeclarationAtBreakpoint(
  componentName,
  propertyName,
  property,
  breakpoint,
  file,
  indent = 2,
) {
  const lastIndex = breakpoints.findIndex((b) => b.key === breakpoint);
  // Sets the value to 'inherit' if it's an inherited property, or 'initial'
  // otherwise. See: https://www.w3.org/TR/css-cascade-5/#inherit-initial
  let variables = property.inherited ? 'inherit' : 'initial';

  // Nest the fallbacks from smallest on the inside to largest on the outside
  for (let index = 0; index <= lastIndex; index++) {
    variables = `var(--pc-${componentName}-${propertyName}-${breakpoints[index].key}, ${variables})`;
  }
  await file.write(`\n${' '.repeat(indent)}${propertyName}: ${variables};`);
}
