import css from '@webref/css';
import mdnData from './mdn-properties-data.mjs';
import fs from 'fs/promises';
import path from 'path';
import camelcase from 'camelcase';
import * as url from 'url';

const breakpoints = [
  {key: 'xs', value: '0px'},
  {key: 'sm', value: '500px'},
  {key: 'md', value: '768px'},
  {key: 'lg', value: '1040px'},
  {key: 'xl', value: '1400px'},
];

const properties = await getProperties();

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const sassFile = await fs.open(
  path.resolve(__dirname, '../src/components/Cube/style.module.scss'),
  'w+',
);

await writeProperties(sassFile, properties);

await sassFile.close();

const tsFile = await fs.open(
  path.resolve(__dirname, '../src/components/Cube/types.ts'),
  'w+',
);
await writeTSProperties(tsFile, properties);
await tsFile.close();

// -----

async function writeTSProperties(tsFile, properties) {
  const camelisedKeys = Object.keys(properties).map((key) => camelcase(key));
  const generateTSPickList = (keys) => {
    // We add additional single quotes here because the second argument for Pick is a union of string literal types
    return camelisedKeys.map((key) => `'${key}'`).join(' | ');
  };
  await tsFile.write('/* THIS FILE IS AUTO GENERATED, DO NOT TOUCH */');
  await tsFile.write("\nimport * as CSS from 'csstype';");
  await tsFile.write("\nimport {ResponsiveProp} from '../../utils/various';");
  await tsFile.write(
    "\nimport type {ComputedTokenCSSProperties} from '@shopify/polaris-tokens';",
  );
  // We Omit the keys of the ComputedTokenCSSProperties interface, as we want to ensure that there are no type collisions between
  // CSS.Properties and our token types.
  await tsFile.write(
    `\nexport type CSSProperties= Omit<Pick<CSS.Properties, ${generateTSPickList(
      camelisedKeys,
    )}>, keyof ComputedTokenCSSProperties>`,
  );
  await tsFile.write(
    `\nexport type ResponsiveTokenProperties = { [K in keyof ComputedTokenCSSProperties]: ResponsiveProp<ComputedTokenCSSProperties[K]> }`,
  );
  await tsFile.write(
    `\nexport type CubeProps = CSSProperties & ResponsiveTokenProperties;`,
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
  const supportedSpecifications = [
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

  // Object keys in JS are sorted by insertion order.
  // Only some CSS properties need to be inserted, so we add them to this object
  // here. This object is used as the basis of the final output, but at this time
  // we don't know the actual values of each key, so we just set it to `null`
  // which enables our algorithm to later look it up based on a truthy check (eg;
  // !!propertiesMustBeSorted[name]).
  // TODO: How do we ensure this list is exhaustive?
  const shorthandPropertiesMap = {
    animation: [
      'animation-name',
      'animation-duration',
      'animation-timing-function',
      'animation-delay',
      'animation-iteration-count',
      'animation-direction',
      'animation-fill-mode',
      'animation-play-state',
    ],
    background: [
      'background-color',
      'background-image',
      'background-repeat',
      'background-attachment',
      'background-position',
    ],
    border: ['border-width', 'border-style', 'border-color'],
    'border-block': [
      'border-block-width',
      'border-block-style',
      'border-block-color',
    ],
    'border-block-end': [
      'border-block-end-width',
      'border-block-end-style',
      'border-block-end-color',
    ],
    'border-block-start': [
      'border-block-start-width',
      'border-block-start-style',
      'border-block-start-color',
    ],
    'border-bottom': [
      'border-bottom-width',
      'border-bottom-style',
      'border-bottom-color',
    ],
    'border-color': [
      'border-top-color',
      'border-right-color',
      'border-bottom-color',
      'border-left-color',
    ],
    'border-image': [
      'border-image-source',
      'border-image-slice',
      'border-image-width',
      'border-image-outset',
      'border-image-repeat',
    ],
    'border-inline': [
      'border-inline-width',
      'border-inline-style',
      'border-inline-color',
    ],
    'border-inline-end': [
      'border-inline-end-width',
      'border-inline-end-style',
      'border-inline-end-color',
    ],
    'border-inline-start': [
      'border-inline-start-width',
      'border-inline-start-style',
      'border-inline-start-color',
    ],
    'border-left': [
      'border-left-width',
      'border-left-style',
      'border-left-color',
    ],
    'border-radius': [
      'border-top-left-radius',
      'border-top-right-radius',
      'border-bottom-right-radius',
      'border-bottom-left-radius',
    ],
    'border-right': [
      'border-right-width',
      'border-right-style',
      'border-right-color',
    ],
    'border-style': [
      'border-top-style',
      'border-right-style',
      'border-bottom-style',
      'border-left-style',
    ],
    'border-top': ['border-top-width', 'border-top-style', 'border-top-color'],
    'border-width': [
      'border-top-width',
      'border-right-width',
      'border-bottom-width',
      'border-left-width',
    ],
    'box-shadow': ['box-shadow'],
    'column-rule': [
      'column-rule-width',
      'column-rule-style',
      'column-rule-color',
    ],
    columns: ['column-width', 'column-count'],
    flex: ['flex-grow', 'flex-shrink', 'flex-basis'],
    'flex-flow': ['flex-direction', 'flex-wrap'],
    font: [
      'font-style',
      'font-variant',
      'font-weight',
      'font-stretch',
      'font-size',
      'line-height',
      'font-family',
    ],
    gap: ['row-gap', 'column-gap'],
    grid: [
      'grid-template-rows',
      'grid-template-columns',
      'grid-template-areas',
      'grid-auto-rows',
      'grid-auto-columns',
      'grid-auto-flow',
    ],
    'grid-area': [
      'grid-row-start',
      'grid-column-start',
      'grid-row-end',
      'grid-column-end',
    ],
    'grid-column': ['grid-column-start', 'grid-column-end'],
    'grid-row': ['grid-row-start', 'grid-row-end'],
    'grid-template': [
      'grid-template-rows',
      'grid-template-columns',
      'grid-template-areas',
    ],
    'list-style': [
      'list-style-type',
      'list-style-position',
      'list-style-image',
    ],
    margin: ['margin-top', 'margin-right', 'margin-bottom', 'margin-left'],
    mask: [
      'mask-image',
      'mask-mode',
      'mask-repeat',
      'mask-position',
      'mask-clip',
      'mask-origin',
      'mask-size',
      'mask-composite',
    ],
    offset: [
      'offset-position',
      'offset-path',
      'offset-distance',
      'offset-rotate',
      'offset-anchor',
    ],
    outline: ['outline-width', 'outline-style', 'outline-color'],
    overflow: ['overflow-x', 'overflow-y'],
    padding: ['padding-top', 'padding-right', 'padding-bottom', 'padding-left'],
    'place-content': ['align-content', 'justify-content'],
    'place-items': ['align-items', 'justify-items'],
    'place-self': ['align-self', 'justify-self'],
    'text-decoration': [
      'text-decoration-line',
      'text-decoration-style',
      'text-decoration-color',
      'text-decoration-thickness',
    ],
    'text-emphasis': ['text-emphasis-style', 'text-emphasis-color'],
    transition: [
      'transition-property',
      'transition-duration',
      'transition-timing-function',
      'transition-delay',
    ],
  };

  const shorthandProperties = Object.entries(shorthandPropertiesMap).reduce(
    (acc, [key, value]) => {
      /*
      We don't include key here because we do not support css shorthands,
      but we do support alias props whose values are fallbacks for the longhand css properties
      ( i.e. padding is an alias whose token value is a fallback for padding-block-start and padding-block-end etc).
      {
        'animation-name': null
        ...
      }
    */
      if (value === 'background') {
        console.log(value);
      }

      for (let val of value) {
        acc[val] = null;
      }
      return acc;
    },
    {},
  );

  const parsedFiles = await css.listAll();
  // Do a pass to gather up properties and group them by shorthand -> longhand
  // { CSS: { properties: [] }, print: { properties: [] } }
  for (let [shortname, data] of Object.entries(parsedFiles)) {
    // Treat delta specs the same as their "full" spec name. The data in
    // @webref/css is ordered, so deltas will always come after full specs.
    shortname = stripDeltaSpecSuffix(shortname);
    if (!supportedSpecifications.includes(shortname)) {
      continue;
    }

    // Need to ensure shorthand properties come before longhand properties so
    // the most specific (longhand) applies when set.
    // For example, `flex-flow` is a shorthand of `flex-direction` and
    // `flex-wrap`, and so must come before both of those.
    // Cannot use alphabetical sorting (`flex-direction` would end up before
    // `flex-flow` which is invalid).
    // Cannot use `property.logicalProperyGroup` as that's not reliable (doesn't
    // even exist for the `flex` family of properties).
    // Cannot rely on the properties in this dataset containing both long and
    // shorthand variants since later "Delta" specs might introduce new
    // shorthands (and so would come after the longhand when iterating and
    // therefore are invalid).
    // Possible solutions:
    // 1. Filter out all the shorthand properties.
    // 2. Create a list of { 'flex-direction': 'flex-flow' } used to sort
    //    longhands after shorthands
    for (let i = 0; i < data.properties.length; i++) {
      const propertySpec = data.properties[i];
      if (
        !shorthandProperties[propertySpec.name] &&
        !Object.keys(shorthandPropertiesMap).includes(propertySpec.name)
      ) {
        shorthandProperties[propertySpec.name] = {
          name: propertySpec.name,
          inherited: propertySpec.inherited === 'yes',
        };
      }
    }
  }

  // For some reason these properties are not excluded from the mdn data set we've imported,
  // But is excluded from the csstype library that the CSS.Properties comes from.
  // We filter them out here so we a) remove unnecessary rule and variable instantiation in our CSS
  // and b) don't get type errors in our typescript files.
  const disallowList = [
    'font-synthesis-weight',
    'font-synthesis-style',
    'font-synthesis-small-caps',
  ];
  // We need to filter out null values, as they represent css properties we do not support.
  return Object.fromEntries(
    Object.entries(shorthandProperties).filter(([key, value]) => {
      if (
        !Object.entries(mdnData)
          .filter(([key, value]) => {
            return (
              // We don't want to include any experimental or non-standard css rules in our CSS
              // These also throw type errors when we generate our types in writeTSProperties
              value.status === 'standard' &&
              // We don't want to include vendor prefixed properties
              // We need this because most other vender prefixed properties are marked as not 'standard' in our mdn Data set
              // but there are a few webkit properties that are "standard" oddly enough.
              !key.startsWith('-webkit') &&
              !disallowList.includes(key)
            );
          })
          .map(([key]) => key)
          .includes(key)
      ) {
        return false;
      }

      return value !== null;
    }),
  );
}

async function writeProperties(file, properties) {
  await file.write('/* THIS FILE IS AUTO GENERATED, DO NOT TOUCH */');
  await file.write("\n@import '../../styles/mixins';");
  await file.write('\n.Box {');
  const filteredProperties = Object.entries(properties).filter(
    ([key]) =>
      ![
        'width',
        'height',
        'max-width',
        'max-height',
        'min-width',
        'min-height',
      ].includes(key),
  );
  for (let [name, property] of filteredProperties) {
    // console.log(name, property);
    await writeScopeCustomProperty('box', name, file);
    await writeResponsiveDeclarationAtBreakpoint(
      'box',
      name,
      property,
      'xs',
      file,
    );
  }

  // Skip the 'xs' size as we've done it above outside of the media queries
  // (mobile first ftw!)
  const mediaQueries = breakpoints.slice(1);
  for (let breakpoint of mediaQueries) {
    await file.write(
      `\n  @media screen and (min-width: ${breakpoint.value}) {`,
    );
    for (let [name, property] of filteredProperties) {
      await writeResponsiveDeclarationAtBreakpoint(
        'box',
        name,
        property,
        breakpoint.key,
        file,
      );
    }
    await file.write('\n}');
  }

  await file.write('\n}');
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
) {
  const lastIndex = breakpoints.findIndex((b) => b.key === breakpoint);
  // Sets the value to 'inherit' if it's an inherited property, or 'initial'
  // otherwise. See: https://www.w3.org/TR/css-cascade-5/#inherit-initial
  let variables = property.inherited ? 'inherit' : 'initial';

  // Nest the fallbacks from smallest on the inside to largest on the outside
  for (let index = 0; index <= lastIndex; index++) {
    variables = `var(--pc-${componentName}-${propertyName}-${breakpoints[index].key}, ${variables})`;
  }
  await file.write(`\n  ${propertyName}: ${variables};`);
}

// For typescript we want to:
// For properties that have design token values, enforce only using token values
// For properties that do not have design token values, fallback to the original CSS property type.
// disallow-list, initial and inherit as possible values.
