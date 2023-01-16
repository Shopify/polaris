// To run, create a file called "temp.md" with h3 tags for the categories h4 for the rules
// run: npx node ./polaris.shopify.com/content/tools/stylelint-polaris/rules/ruleMaker.js
// make sure temp.md and ruleMaker.js are both in the rules folder

const fs = require('fs');
const path = require('path');

const h3 = '### ';
const h4 = '#### ';
const ruleDescriptions = {
  'conventions/custom-property-allowed-list':
    'Allows definition of custom properties not using Polaris prefixes, flags declaration property values that are not valid Polaris tokens, flags declaration property values using private tokens',
  'colors/color-named': 'Disallows named colors',
  'colors/color-no-hex': 'Disallows hex colors',
  'colors/declaration-property-value-disallowed-list':
    'Disallows custom decimal opacity values',
  'colors/function-disallowed-list':
    'Disallows allows use of built in and legacy color functions',
  'colors/at-rule-disallowed-list': 'Disallows use of legacy color mixins',
  'colors/global-disallowed-list':
    'Disallows use of legacy color custom properties and mixin map data',
  'motion/function-disallowed-list':
    'Disallows use of legacy Sass motion functions',
  'motion/declaration-property-unit-disallowed-list':
    'Disallows use of hard-coded millisecond `ms` and second `s` values on transition and animation properties',
  'motion/at-rule-disallowed-list': 'Disallows use of CSS @keyframes',
  'motion/global-disallowed-list':
    'Disallows use of legacy Polaris motion tokens',
  'typography/declaration-property-value-disallowed-list':
    'Disallows hard-coded alphanumeric font-weight values',
  'typography/declaration-property-unit-disallowed-list':
    'Disallows hard-coded `px`, `em`, and `rem` values for font-size and line-height properties',
  'typography/function-disallowed-list':
    'Disallows use of legacy Sass typography functions',
  'typography/at-rule-disallowed-list':
    'Disallows use of legacy Sass typography mixins',
  'typography/global-disallowed-list':
    'Disallows use of legacy Polaris typography tokens and mixin map data',
  'shape/declaration-property-unit-disallowed-list':
    'Disallows hard-coded `px`, `em`, and `rem` units in border property values',
  'shape/function-disallowed-list':
    'Disallows use of legacy Sass border functions',
  'shape/at-rule-disallowed-list': 'Disallows use of legacy Sass border mixins',
  'shape/global-disallowed-list':
    'Disallows use of legacy Polaris shape tokens and mixin map data',
  'spacing/declaration-property-unit-disallowed-list':
    'Disallows use of hard-coded px, em, and rem values on gap, margin, and padding properties',
  'spacing/function-disallowed-list':
    'Disallows use of legacy Sass spacing functions',
  'spacing/global-disallowed-list':
    'Disallows use of legacy spacing custom properties and Sass mixin data',
  'depth/declaration-property-unit-disallowed-list':
    'Disallows box-shadow declarations with hard coded px, rem, or em units',
  'depth/function-disallowed-list':
    'Disallows use of built-in and legacy shadow functions',
  'depth/global-disallowed-list':
    'Disallows use of legacy shadow custom properties and Sass mixin data',
  'depth/property-disallowed-list': 'Disallows text shadow property',
  'media-queries/function-disallowed-list':
    'Disallows use of legacy breakpoint sass functions',
  'media-queries/media-queries-allowed-list':
    'Allows declaration of `print` and `screen` `@media` queries, allows `@media` queries for `forced-colors` and `ms-high-contrast` features, allows `@media` queries using Polaris breakpoints',
  'media-queries/at-rule-disallowed-list':
    'Disallows use of legacy breakpoint Sass mixins',
  'z-index/declaration-property-value-allowed-list':
    'Disallows declaration of `z-index` values that are not Polaris z-index tokens',
  'z-index/function-disallowed-list':
    'Disallows use of the legacy z-index Sass function',
  'z-index/global-disallowed-list':
    'Disallows the use of legacy z-index custom properties and Sass mixin data',
  'layout/declaration-property-value-disallowed-list':
    'Disallows declaration of positioning and dimension property values with Polaris tokens',
  'layout/function-disallowed-list':
    'Disallows use of internal Sass layout functions',
  'layout/at-rule-disallowed-list': 'Disallows use of legacy Sass mixins',
  'layout/property-disallowed-list':
    'Disallows declarations of layout properties',
  'layout/global-disallowed-list':
    'Disallows use of legacy custom properties and Sass mixin map data',
  'legacy/at-rule-disallowed-list': 'Disallows use pf legacy Sass mixins',
  'legacy/function-disallowed-list': 'Disallows use off legacy Sass functions',
  'legacy/global-disallowed-list':
    'Disallows use of legacy custom properties and Sass mixin map data',
};

main();

function main() {
  const ruleFile = fs.readFileSync(path.join(__dirname, 'temp.md'), 'utf8');
  const content = ruleFile.split('\n');
  content.push('#');

  let category;
  let fileName;
  let ruleName;
  let ruleContent = [];

  const data = {};

  while (content.length) {
    const line = content.shift();

    if (line.startsWith(h3)) {
      category = line.split(h3)[1].toLowerCase();
      data[category] = {};
      ruleName = undefined;
    } else if (line.startsWith(h4)) {
      ruleName = line.split(h4)[1].toLowerCase();
      data[category][ruleName] = [];
    } else if (category && ruleName) {
      data[category][ruleName].push(line);
    }
  }

  Object.keys(data).forEach((category) =>
    Object.keys(data[category]).forEach((ruleName) => {
      const fileName = `${ruleName.replace('/', '-')}.md`;
      fs.writeFileSync(
        path.join(__dirname, fileName),
        getContent(ruleName, category, data[category][ruleName]),
      );
    }),
  );

  fs.writeFileSync(path.join(__dirname, 'index.md'), getIndexContent());
}

function getContent(ruleName, category, ruleContent) {
  const resourceLink = getCategoryResourceLink(category);
  const categoryIs = `${category} ${category.slice(-1) === 's' ? 'are' : 'is'}`;
  const resourceText =
    resourceLink && resourceLink !== ''
      ? [
          '',
          `Try to use ${resourceLink} instead of custom styles so that ${categoryIs} consistent across the Admin. This helps merchants have a coherent user experience and also ensures that ${categoryIs} in sync with updates from the design system.`,
        ]
      : [];

  const template = [
    '---',
    `title: ${ruleName}`,
    `description: ${ruleDescriptions[ruleName]}`,
    'keywords:',
    '  - stylelint',
    `  - ${category}`,
    `  - ${category} rules`,
    '---',
    ...resourceText,
    ...ruleContent,
    `Have you found that merchants benefit from styles or components that aren't in Polaris? We'd love to learn more. You can jumpstart a contribution to Polaris in GitHub by:`,
    '',
    '- Starting a [discussion](https://github.com/Shopify/polaris/discussions/6750) to collaborate with the community to find a solution',
    '- Submitting a [feature proposal issue](https://github.com/Shopify/polaris/issues/new?assignees=&labels=Feature+request&template=FEATURE_REQUEST.md) to share context on your suggestion',
    '- Drafting a [pull request](https://github.com/Shopify/polaris/pulls) with your proposed improvement or addition',
    '',
  ];

  return template.join('\n');
}

function getCategoryResourceLink(category) {
  const resourceLinks = {
    conventions: '',
    colors: 'Polaris [color tokens](/tokens/colors)',
    motion: 'Polaris [motion tokens](/tokens/motion)',
    typography:
      'the [text component](/components/text) or [font tokens](/tokens/font)',
    shape: 'Polaris [shape tokens](/tokens/shape)',
    spacing: 'Polaris [spacking tokens](/tokens/spacing)',
    depth: 'Polaris [depth tokens](/tokens/depth)',
    'media queries':
      'Polaris [breakpoint sass variables](/tokens/breakpoints#sass-variables)',
    'z-index': 'Polaris [z-index tokens](/tokens/z-index)',
    layout: 'Polaris [layout components](/components)',
    legacy: 'Polaris [components](/components) or [tokens](/tokens)',
  };
  return resourceLinks[category];
}

function getIndexContent() {
  const rules = Object.keys(ruleDescriptions);
  const data = {};
  rules.forEach((rule) => {
    const category = rule.split('/')[0];
    if (!(category in data)) {
      data[category] = [
        '',
        `## ${category.charAt(0).toUpperCase() + category.slice(1)}`,
        '',
      ];
    }
    data[category].push(
      `- [${rule}](/tools/stylelint-polaris/rules/${rule.replace('/', '-')}): ${
        ruleDescriptions[rule]
      }`,
    );
  });

  const content = [
    '---',
    'title: Rules',
    'description: There are over 40 rules configured in Stylelint Polaris to help you avoid errors and follow stylistic and non-stylistic conventions while building for the Shopify admin.',
    'hideChildren: true',
    'keywords:',
    '  - rules',
    '  - stylelint rules',
    '  - css rules',
    '---',
    ...Object.keys(data).reduce((prev, key) => [...prev, ...data[key]], []),
  ];
  return content.join('\n');
}
