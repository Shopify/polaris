const {resolve: resolvePath} = require('path');
const {writeFileSync} = require('fs-extra');
const {
  rgbToHex,
  hslToRgb,
  UNSTABLE_toCssCustomPropertySyntax: cssify,
  UNSTABLE_roleVariants: roleVariants,
  UNSTABLE_buildColors: colorFactory,
} = require('../');

const ColorSwatch = {
  Width: 32,
  Height: 32,
  Padding: 16,
};

const RoleDescription = {
  surface:
    'The surface role is used for the backgrounds of the UI. In light mode, surface colors are nearly white, while in dark mode, surface colors are nearly black. The color passed to the surface role impacts the rest of the color roles and their variants, adjusting them for light or dark contexts.',
  onSurface:
    'The onSurface role is made up of elements which appear on top of a surface, including borders, neutral icons, and text. When a light surface is provided, onSurface values will be dark. When a dark surface is provided, onSurface values will be light.',
  interactive:
    'The interactive role is used to express interactivity in components. It is used in links, as an indicator of focus, and as an indicator of selected interactive states.',
  neutral:
    'A neutral interactive color role, for use in secondary and tertiary buttons as a background color, as well as in form elements as a background color.',
  primary:
    'A primary interactive color, for use in primary buttons as a background color. Also used in navigation and tabs for icons, and for a surface color when in a selected state.',
  critical:
    'Used to communicate destructive outcomes on interactive elements, for communicating errors, and to indicate a critical event in inert elements that requires immediate merchant action.',
  warning:
    'For use as an indicator that action should be taken by merchants in components including badges, banners, and exception lists.',
  highlight:
    'Used to highlight elements of the UI that are important for merchants, but do not require immediate action. Used in information banners and badges, indicators that draw attention to new information, bars that indicate loading or progress, and in data visualization.',
  success:
    'Used to indicate the result of a successful action taken by a merchant, to indicate a positive event, or to illustrate growth.',
  decorative:
    'Used to decorate elements where color does convey a specific meaning in components like avatars',
};

// eslint-disable-next-line babel/camelcase
const lightColors = colorFactory({UNSTABLE_colors: {}}, roleVariants);
const darkColors = colorFactory(
  // eslint-disable-next-line babel/camelcase
  {UNSTABLE_colors: {surface: '#111213'}},
  roleVariants,
);

const Template = {
  anchor: (name) => `- [${name}](#${name})\n`,
  role: (name, description) =>
    `## ${name}\n\n[↑ Back to top](#table-of-contents)\n\n${description}\n\n`,
  heading:
    '|CSS variable|Description|Light mode|Dark mode|\n|---|---|---|---|\n',
  hr: '\n\n---\n\n',
  variant: (name, description, light, dark) => {
    const {Width, Height, Padding} = ColorSwatch;
    const size = `${Width + Padding * 2}x${Height + Padding * 2}`;
    const additionalVariants = `\`-inverse\`, \`-light\`, and \`-dark\` variants available.`;

    return `|<pre>${cssify(name)}</pre>|${description} ${
      light === dark ? '' : additionalVariants
    }|![](https://www.gifpng.com/${size}/${light}/FFFFFF?border-width=${Padding}&border-type=rectangle&border-color=${toHex(
      lightColors.surfaceBackground,
    )}&text=%20)|![](https://www.gifpng.com/${size}/${dark}/FFFFFF?border-width=${Padding}&border-type=rectangle&border-color=${toHex(
      darkColors.surfaceBackground,
    )}&text=%20)|\n`;
  },
};

const boilerplate =
  '# Color system\n\n⚠️ The color system is currently an unstable API, and is subject to change in non-major releases of Polaris react. Please use with caution.\n\n';
const tocTitle = '## Table of contents\n\n';

const tocContents = Object.keys(roleVariants).reduce(
  (acc1, role) => acc1 + Template.anchor(role),
  '',
);

const contents = Object.entries(roleVariants).reduce(
  (acc1, [role, variants]) => {
    const children = variants.reduce((acc2, variant) => {
      const light = toHex(lightColors[variant.name]);
      const dark = toHex(darkColors[variant.name]);

      return (
        acc2 + Template.variant(variant.name, variant.description, light, dark)
      );
    }, '');

    return (
      acc1 +
      Template.role(role, RoleDescription[role]) +
      Template.heading +
      children +
      Template.hr
    );
  },
  '',
);

const data = boilerplate + tocTitle + tocContents + contents;

writeFileSync(resolvePath('documentation/Color system.md'), data);

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
