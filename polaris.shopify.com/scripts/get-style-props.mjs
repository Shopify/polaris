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

const properties = await getProperties();

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const file = await fs.open(
  path.resolve(__dirname, '../src/components/Cube/style.module.scss'),
  'w+',
);
await writeProperties(file, properties);
await file.close();

// -----

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

  const parsedFiles = await css.listAll();

  // An array as order is important
  const properties = [];

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
      if (
        !properties.find(
          (existingProp) => existingProp.name === propertySpec.name,
        )
      ) {
        properties.push({
          name: propertySpec.name,
          inherited: propertySpec.inherited === 'yes',
        });
      }
    }
  }

  return properties;
}

async function writeProperties(file, properties) {
  await file.write('/* THIS FILE IS AUTO GENERATED, DO NOT TOUCH */');
  await file.write("\n@import '../../styles/mixins';");
  await file.write('\n.Box {');

  for (let property of properties) {
    await writeScopeCustomProperty('box', property.name, property.inherited);
    await writeResponsiveDeclarationAtBreakpoint('box', property, 'xs');
  }

  // Skip the 'xs' size as we've done it above outside of the media queries
  // (mobile first ftw!)
  const mediaQueries = breakpoints.slice(1);
  for (let breakpoint of mediaQueries) {
    await file.write(
      `\n  @media screen and (min-width: ${breakpoint.value}) {`,
    );
    for (let property of properties) {
      await writeResponsiveDeclarationAtBreakpoint(
        'box',
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
  --pc-box-z-index-sm: var(--pc-box-z-index-xs);
  --pc-box-z-index-md: var(--pc-box-z-index-sm);
  --pc-box-z-index-lg: var(--pc-box-z-index-md);
  --pc-box-z-index-xl: var(--pc-box-z-index-lg);
*/
async function writeScopeCustomProperty(
  componentName,
  propertyName,
  isInherited,
) {
  const propPrefix = `--pc-${componentName}-${propertyName}`;
  // Sets the value to 'inherit' if it's an inherited property, or 'initial'
  // otherwise. See: https://www.w3.org/TR/css-cascade-5/#inherit-initial
  await file.write(
    `\n  ${propPrefix}-${breakpoints[0].key}: ${
      isInherited ? 'inherit' : 'initial'
    };`,
  );
  for (let index = 1; index < breakpoints.length; index++) {
    const breakpoint = breakpoints[index];
    const prevBreakpoint = breakpoints[index - 1];
    await file.write(
      `\n  ${propPrefix}-${breakpoint.key}: var(${propPrefix}-${prevBreakpoint.key});`,
    );
  }
}

async function writeResponsiveDeclarationAtBreakpoint(
  componentName,
  property,
  breakpointKey,
) {
  const breakpoint = breakpoints.find((b) => b.key === breakpointKey);
  // `unset` Sets the value to 'inherit' if it's an inherited property, or
  // 'initial' otherwise.
  // See: https://www.w3.org/TR/css-cascade-5/#inherit-initial
  //
  // But, why do we need the fallback here?
  // If the user passes in a value of 'initial' for the `xs` breakpoint, they've
  // overridden our scoping which sets it to `unset`, but the value of 'initial'
  // is equivalent to the "guaranteed-invalid value" which the spec says makes
  // the entire property invalid, therefore the property will be at the whim of
  // the cascade which we DO NOT want; we want to ensure it is set to either
  // `inherit` or `initial` when no/invalid value is passed. Hence we use
  // `unset` to achieve that.
  await file.write(
    `\n  ${property.name}: var(--pc-${componentName}-${property.name}-${breakpoint.key});`,
  );
}
