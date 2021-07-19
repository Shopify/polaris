const {resolve: resolvePath} = require('path');

const {writeFileSync} = require('fs-extra');
const {
  config: roleVariants,
} = require('@shopify/polaris-tokens/dist-modern/configs/base');
const theme = require('@shopify/polaris-tokens/dist-modern/theme/base.json');
const {colorFactory} = require('@shopify/polaris-tokens/dist-modern');

const {
  rgbToHex,
  UNSTABLE_toCssCustomPropertySyntax: cssify,
  UNSTABLE_Tokens: Tokens,
} = require('../');

const ColorSwatch = {
  Width: 32,
  Height: 32,
  Padding: 16,
};

const RoleDescription = {
  surface:
    'The surface role is used for the backgrounds of the UI. With a light color scheme, surface colors are nearly white, while in a dark color scheme, surface colors are nearly black. The color passed to the surface role impacts the rest of the color roles and their variants, adjusting them for light or dark contexts.',
  onSurface:
    'The onSurface role is made up of elements which appear on top of a surface, including borders, secondary icons, and text. When a light surface is provided, onSurface values will be dark. When a dark surface is provided, onSurface values will be light.',
  interactive:
    'The interactive role is used to express interactivity in components. It is used in links, as an indicator of focus, and as an indicator of selected interactive states.',
  secondary:
    'A secondary interactive color role, for use in secondary and tertiary buttons as a background color, as well as in form elements as a background color.',
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

const lightColors = colorFactory(theme, 'light');
const darkColors = colorFactory(theme, 'dark');

const Template = {
  tocItem: (name) => `- [${name}](#${name})\n`,
  section: (name, description) =>
    `## ${name}\n\n[↑ Back to top](#table-of-contents)\n\n${
      description ? `${description}\n\n` : ''
    }`,
  heading:
    '|CSS variable|Description|Light mode|Dark mode|\n|---|---|---|---|\n',
  hr: '\n\n---\n\n',
  variant: (name, description, light, dark) => {
    const {Width, Height, Padding} = ColorSwatch;
    const size = `${Width + Padding * 2}x${Height + Padding * 2}`;

    return `|<pre>${cssify(
      name,
    )}</pre>|${description} |![](https://www.gifpng.com/${size}/${light}/FFFFFF?border-width=${Padding}&border-type=rectangle&border-color=${toHex(
      lightColors.background,
    )}&text=%20)<br />#${light}|![](https://www.gifpng.com/${size}/${dark}/FFFFFF?border-width=${Padding}&border-type=rectangle&border-color=${toHex(
      darkColors.background,
    )}&text=%20)<br />#${dark}|\n`;
  },
  overrideItem: (name, value) => `|\`${cssify(name)}\`|\`${value}\`|\n`,
};

const tocTitle = '## Table of contents\n\n';

const tocContents = Object.keys(roleVariants).reduce(
  (accumulator, role) => accumulator + Template.tocItem(role),
  '',
);

const contents = Object.entries(roleVariants).reduce(
  (tableMarkdown, [role, variants]) => {
    const children = variants.reduce((rowMarkdown, variant) => {
      const light = toHex(lightColors[variant.name]);
      const dark = toHex(darkColors[variant.name]);

      return (
        rowMarkdown +
        Template.variant(variant.name, variant.description, light, dark)
      );
    }, '');

    return (
      tableMarkdown +
      Template.section(role, RoleDescription[role]) +
      Template.heading +
      children +
      Template.hr
    );
  },
  '',
);

const overridesContents = Object.entries(Tokens).reduce(
  (accumulator, [override, value]) => {
    return accumulator + Template.overrideItem(override, value);
  },
  '### UNSTABLE these variables are being @deprecated\n|CSS variable|Value|\n|---|---|\n',
);

const data =
  tocTitle +
  tocContents +
  Template.tocItem('Overrides') +
  contents +
  Template.section('Overrides') +
  overridesContents;

writeFileSync(resolvePath('documentation/Color system.md'), data);

function stringToRgba(rgba) {
  const [red, green, blue] = rgba
    .substring(5)
    .slice(0, -1)
    .split(', ')
    .map((num) => Number(num));

  return {
    red,
    green,
    blue,
  };
}

function toHex(color) {
  return rgbToHex(stringToRgba(color)).substr(1);
}
