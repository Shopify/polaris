/* eslint-disable no-console */

const {resolve: resolvePath} = require('path');
const {writeFileSync} = require('fs-extra');
const {
  rgbToHex,
  hslToRgb,
  UNSTABLE_toCssCustomPropertySyntax: cssify,
  UNSTABLE_roleVariants: roleVariants,
  UNSTABLE_buildColors: colorFactory,
} = require('../');

// eslint-disable-next-line babel/camelcase
const lightColors = colorFactory({UNSTABLE_colors: {}}, roleVariants);
const darkColors = colorFactory(
  // eslint-disable-next-line babel/camelcase
  {UNSTABLE_colors: {surface: '#111213'}},
  roleVariants,
);

function stringToHsla(hsla) {
  const [hue, saturation, lightness] = hsla
    .substring(5)
    .slice(0, -1)
    .split(', ');

  return {
    hue,
    saturation: saturation.slice(0, -1),
    lightness: lightness.slice(0, -1),
    alpha: 1,
  };
}

function toHex(color) {
  return rgbToHex(hslToRgb(stringToHsla(color))).substr(1);
}

const Template = {
  parent: (name) => `- [\`${name}\`](#${name})\n`,
  child: (name) => `  - [\`${name}\`](#${name})\n`,
  role: (name, description) => `## \`${name}\`\n\n${description}\n\n`,
  variant: (name, description, light, dark) => {
    const additionalVariants = () => `| \`${cssify(
      name,
    )}-inverse\` | ![][${name}Dark]  | ![][${name}Light] |
| \`${cssify(name)}-light\`   | ![][${name}Light] | ![][${name}Light] |
| \`${cssify(name)}-dark\`    | ![][${name}Dark]  | ![][${name}Dark]  |`;

    return `### \`${name}\`\n\n${description}

| CSS variable                | Light mode        | Dark mode         |
| ----------------------------| ------------------| ------------------|
| \`${cssify(name)}\`         | ![][${name}Light] | ![][${name}Dark]  |
${light === dark ? '' : additionalVariants()}

[${name}Light]: https://www.gifpng.com/64x32/${light}/FFFFFF?border-width=8&border-type=rectangle&border-color=${toHex(
      lightColors.surfaceBackground,
    )}&text=%20
[${name}Dark]: https://www.gifpng.com/64x32/${dark}/FFFFFF?border-width=8&border-type=rectangle&border-color=${toHex(
      darkColors.surfaceBackground,
    )}&text=%20\n\n---\n\n`;
  },
};

const contents = `# Color system

⚠️ The color system is currently an unstable API, and is subject to change in non-major releases of Polaris react. Please use with caution.

## Table of contents

${Object.entries(roleVariants).reduce((acc1, [role, variants]) => {
  const children = variants.reduce((acc2, variant) => {
    return acc2 + Template.child(variant.name);
  }, '');

  return acc1 + Template.parent(role) + children;
}, '')}

${Object.entries(roleVariants).reduce((acc1, [role, variants]) => {
  const children = variants.reduce((acc2, variant) => {
    const light = toHex(lightColors[variant.name]);
    const dark = toHex(darkColors[variant.name]);

    return (
      acc2 + Template.variant(variant.name, variant.description, light, dark)
    );
  }, '');

  return acc1 + Template.role(role, 'GET DESC FROM TYPE') + children;
}, '')}`;

writeFileSync(resolvePath('documentation/Color system.md'), contents, function(
  err,
) {
  if (err) throw err;
  console.log('File is created successfully.');
});
