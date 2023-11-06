import css from '@webref/css';
import fs from 'fs/promises';
import path from 'path';
import * as url from 'url';

const breakpoints = [
  {key: 'xs', value: '0px'},
  {key: 'sm', value: '500px'},
  {key: 'md', value: '768px'},
  {key: 'lg', value: '1040px'},
  {key: 'xl', value: '1400px'},
];

// Object keys in JS are sorted by insertion order.
// Only some CSS properties need to be inserted, so we add them to this object
// here. This object is used as the basis of the final output, but at this time
// we don't know the actual values of each key, so we just set it to `null`
// which enables our algorithm to later look it up based on a truthy check (eg;
// !!propertiesMustBeSorted[name]).
// TODO: How do we ensure this list is exhaustive?
const propertiesMustBeSorted = {
  animation: null,
  'animation-delay': null,
  'animation-direction': null,
  'animation-duration': null,
  'animation-fill-mode': null,
  'animation-iteration-count': null,
  'animation-name': null,
  'animation-play-state': null,
  'animation-timeline': null,
  'animation-timing-function': null,
};

const properties = await getProperties(propertiesMustBeSorted);

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const file = await fs.open(
  path.resolve(__dirname, '../src/components/Cube/style.module.scss'),
  'w+',
);
await writeProperties(file, properties);
await file.close();

// -----

async function getProperties(properties) {
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

  const parsedFiles = await css.listAll();

  // Do a pass to gather up properties and group them by shorthand -> longhand
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
      if (!properties[propertySpec.name]) {
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

  for (let [name, property] of Object.entries(properties)) {
    await writeScopeCustomProperty('box', name);
    await writeResponsiveDeclarationAtBreakpoint('box', name, property, 'xs');
  }

  // Skip the 'xs' size as we've done it above outside of the media queries
  // (mobile first ftw!)
  const mediaQueries = breakpoints.slice(1);
  for (let breakpoint of mediaQueries) {
    await file.write(
      `\n  @media screen and (min-width: ${breakpoint.value}) {`,
    );
    for (let [name, property] of Object.entries(properties)) {
      await writeResponsiveDeclarationAtBreakpoint(
        'box',
        name,
        property,
        breakpoint.key,
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
async function writeScopeCustomProperty(componentName, propertyName) {
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
