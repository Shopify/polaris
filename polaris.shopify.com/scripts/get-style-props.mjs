import css from '@webref/css';
import mdnData from './mdn-properties-data.mjs';
import fs from 'fs/promises';
import path from 'path';
import camelcase from 'camelcase';
import * as url from 'url';

// TODO: Import these from token lib?
const breakpoints = [
  {key: 'xs', value: '0px'},
  {key: 'sm', value: '500px'},
  {key: 'md', value: '768px'},
  {key: 'lg', value: '1040px'},
  {key: 'xl', value: '1400px'},
];

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
  'border-image',
  'border-inline',
  'border-inline-end',
  'border-inline-start',
  'border-left',
  'border-radius',
  'border-right',
  'border-style',
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

  // We only support logical properties, but later alias these to their logical
  // counterparts following the principle of: Do what the user intended, not
  // what they said.
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
  'top',
  'left',
  'right',
  'bottom',
  'contain-intrinsic-width',
  'contain-intrinsic-height',

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
  // TODO...
];

// TODO: Throw error when a CSS property with the same name is allowed.
const stylePropAliases = {
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
  // TODO...And more
};

const inverseAliases = Object.entries(stylePropAliases).reduce(
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

await writeProperties(sassFile, properties);

await sassFile.close();

const tsFile = await fs.open(
  path.resolve(__dirname, '../src/components/Cube/generated-data.ts'),
  'w+',
);
await writeTSProperties(tsFile, properties);
await tsFile.close();

// -----

async function writeTSProperties(tsFile, properties) {
  const camelisedKeys = Object.keys(properties).map((key) => camelcase(key));
  const generateTSPickList = (keys) => {
    // We add additional single quotes here because the second argument for Pick is a union of string literal types
    return keys.map((key) => `'${key}'`).join(' | ');
  };
  await tsFile.write(`
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
    ${generateTSPickList(camelisedKeys)}
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
  ${Object.entries(inverseAliases)
    .map(
      ([alias, styleProps]) =>
        `${alias}?: ${styleProps
          .map((prop) => `StyleProps['${prop}']`)
          .join(' & ')};`,
    )
    .join('\n  ')}
};

export type CubeProps = StyleProps & StylePropAliases;

/**
 * An ordered set of aliases for each style prop that has them.
 */
export const stylePropAliases: Partial<Record<keyof StyleProps, readonly (keyof StylePropAliases)[]>> = ${JSON.stringify(
    stylePropAliases,
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
        properties[propertySpec.name] = {
          name: propertySpec.name,
          inherited: propertySpec.inherited === 'yes',
        };
      }
    }
  }

  return properties;
}

async function writeProperties(file, properties) {
  await file.write('/* THIS FILE IS AUTO GENERATED, DO NOT TOUCH */');
  await file.write("\n@import '../../styles/mixins';");

  await file.write('\n.Box {');
  const propertyEntries = Object.entries(properties);
  for (let [name, property] of propertyEntries) {
    await writeScopeCustomProperty('box', name, file);
    await writeResponsiveDeclarationAtBreakpoint(
      'box',
      name,
      property,
      'xs',
      file,
      2,
    );
  }
  await file.write('\n}');

  // Skip the 'xs' size as we've done it above outside of the media queries
  // (mobile first ftw!)
  const mediaQueries = breakpoints.slice(1);
  for (let breakpoint of mediaQueries) {
    await file.write(`\n@media screen and (min-width: ${breakpoint.value}) {`);
    await file.write(`\n  .Box {`);
    for (let [name, property] of propertyEntries) {
      await writeResponsiveDeclarationAtBreakpoint(
        'box',
        name,
        property,
        breakpoint.key,
        file,
        4,
      );
    }
    await file.write(`\n  }`);
    await file.write(`\n}`);
  }
}

/*
* Ouputs something like:

  --pc-box-z-index-xs: initial;
  --pc-box-z-index-sm: var(--pc-box-z-index-xs, initial);
  --pc-box-z-index-md: var(--pc-box-z-index-sm, initial);
  --pc-box-z-index-lg: var(--pc-box-z-index-md, initial);
  --pc-box-z-index-xl: var(--pc-box-z-index-lg, initial);
*/
async function writeScopeCustomProperty(componentName, propertyName, file) {
  for (let breakpoint of breakpoints) {
    await file.write(
      `\n  --pc-${componentName}-${propertyName}-${breakpoint.key}: initial;`,
    );
  }
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

// For typescript we want to:
// For properties that have design token values, enforce only using token values
// For properties that do not have design token values, fallback to the original CSS property type.
// disallow-list, initial and inherit as possible values.
