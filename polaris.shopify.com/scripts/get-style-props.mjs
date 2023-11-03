import css from '@webref/css';
import fs from 'fs/promises';
import path from 'path';
import * as url from 'url';
const breakpoints = [
  {key: 'xs', value: '0px;'},
  {key: 'sm', value: '500px;'},
  {key: 'md', value: '768px;'},
  {key: 'lg', value: '1040px;'},
  {key: 'xl', value: '1400px;'},
];
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
/*
  const propsList = ['z-index', {prop: 'x', default: 'y'}]
  responsiveCSSProps('box', propsList);
*/

function responsiveProps() {}

// Generate style.module.scss from that same spec
/*
  .Box {
    @getResponsiveProps(${namespace}, ${propertyName}, ${variableName})
  }
*/

const parsedFiles = await css.listAll();
const file = await fs.open(
  path.resolve(__dirname, '../src/components/Cube/style.module.scss'),
  'w+',
);

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

const writeProperty = async (file, property) => {
  if (property.inherited) {
    await file.write(`\n    (prop: '${property.name}', default: 'inherit'),`);
  } else {
    await file.write(`\n    '${property.name}',`);
  }
};

// An array as order is important
const properties = [];

const getOrPushProperty = (list, name) => {
  let prop = list.find((existingProp) => existingProp.name === name);
  if (!prop) {
    prop = {name, inherited: false};
    list.push(prop);
  }
  return prop;
};

await file.write('/* THIS FILE IS AUTO GENERATED, DO NOT TOUCH */');
await file.write("\n@import '../../styles/mixins';");
await file.write('\n.Box {');

// Do a pass to gather up properties and group them by shorthand -> longhand
for (let [shortname, data] of Object.entries(parsedFiles)) {
  // Treat delta specs the same as their "full" spec name. The data in
  // @webref/css is ordered, so deltas will always come after full specs.
  shortname = stripDeltaSpecSuffix(shortname);
  if (!supportedSpecifications.includes(shortname)) {
    continue;
  }

  for (let i = 0; i < data.properties.length; i++) {
    const propertySpec = data.properties[i];
    // TODO: This could be a long-hand version of another property, such as
    // `margin-left` -> `margin` as indicated by .logicalPropertyGroup. However,
    // the .logicalPropertyGroup value does not always seem map to a CSS
    // property name, so it's not possible to know which longhand the shorthand
    // should come after. We need to figure this out somehow so we can ensure
    // specificity is maintained.
    const prop = getOrPushProperty(properties, propertySpec.name);
    prop.inherited = propertySpec.inherited === 'yes';
  }
}

// Now write them all out in the correct order
await writeProperties(properties);
// for (let property of properties) {
//   await writeProperty(file, property);
// }
await file.write('\n}');
await file.close();

async function writeScopeCustomProperty(componentName, propertyName) {
  for (let breakpoint of breakpoints) {
    await file.write(
      `\n  --pc-${componentName}-${propertyName}-${breakpoint.key}: initial;`,
    );
  }
}

async function writeResponsiveDeclarationAtBreakpoint(
  componentName,
  property,
  breakpoint,
) {
  const lastIndex = breakpoints.findIndex((b) => b.key === breakpoint);
  let variables = property.inherited ? 'inherit' : 'initial';

  // Nest the fallbacks from smallest on the inside to largest on the outside
  for (let index = 0; index <= lastIndex; index++) {
    variables = `var(--pc-${componentName}-${property.name}-${breakpoints[index].key}, ${variables})`;
  }
  await file.write(`\n  ${property.name}: ${variables};`);
}

async function writeProperties(properties) {
  for (let property of properties) {
    await writeScopeCustomProperty('box', property.name);
    await writeResponsiveDeclarationAtBreakpoint('box', property, 'xs');
  }
  const mediaQueries = breakpoints.slice(1);
  for (let breakpoint of mediaQueries) {
    await file.write(
      `\n  @media and screen (min-width: ${breakpoint.value}) {`,
    );
    for (let property of properties) {
      await writeResponsiveDeclarationAtBreakpoint(
        'box',
        property,
        breakpoint.key,
      );
    }
    await file.write('\n};');
  }

  // Iterate and dump properties once as responsiveCSS values
  // Loop through media queries to generate media queries in css
  // Internally loop through properties to generate css properties with
  // valid scopes and callbacks.
}
