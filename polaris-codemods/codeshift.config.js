/* eslint-disable prettier/prettier */

function resolve(transform) {
  return require.resolve(`./dist/codemods/${transform}/transform`);
}

module.exports = {
  transforms: {
    '9.0.0': resolve('9.0.0'),
    '10.0.0': resolve('10.0.0'),
    '11.0.0': resolve('11.0.0'),
  },
  presets: {
    'react-rename-component': resolve('react-rename-component'),
    'react-rename-component-prop': resolve('react-rename-component-prop'),
    'scss-remove-unused-at-use': resolve('scss-remove-unused-at-use'),
    'styles-insert-stylelint-disable': resolve('styles-insert-stylelint-disable'),
    'styles-replace-custom-property': resolve('styles-replace-custom-property'),
    'v11-react-update-page-breadcrumbs': resolve('v11-react-update-page-breadcrumbs'),
    'v11-styles-replace-custom-property-border': resolve('v11-styles-replace-custom-property-border'),
    'v11-styles-replace-custom-property-depth': resolve('v11-styles-replace-custom-property-depth'),
    'v11-styles-replace-custom-property-legacy': resolve('v11-styles-replace-custom-property-legacy'),
    'v11-styles-replace-custom-property-z-index': resolve('v11-styles-replace-custom-property-z-index'),
    'v10-react-replace-text-components': resolve('v10-react-replace-text-components'),
    'v9-scss-replace-border': resolve('v9-scss-replace-border'),
    'v9-scss-replace-border-radius': resolve('v9-scss-replace-border-radius'),
    'v9-scss-replace-border-width': resolve('v9-scss-replace-border-width'),
    'v9-scss-replace-breakpoints': resolve('v9-scss-replace-breakpoints'),
    'v9-scss-replace-color': resolve('v9-scss-replace-color'),
    'v9-scss-replace-duration': resolve('v9-scss-replace-duration'),
    'v9-scss-replace-easing': resolve('v9-scss-replace-easing'),
    'v9-scss-replace-font-family': resolve('v9-scss-replace-font-family'),
    'v9-scss-replace-font-size': resolve('v9-scss-replace-font-size'),
    'v9-scss-replace-line-height': resolve('v9-scss-replace-line-height'),
    'v9-scss-replace-spacing': resolve('v9-scss-replace-spacing'),
    'v9-scss-replace-text-emphasis': resolve('v9-scss-replace-text-emphasis'),
    'v9-scss-replace-z-index': resolve('v9-scss-replace-z-index'),
    'v9-styles-replace-custom-property-border': resolve('v9-styles-replace-custom-property-border'),
    'v9-styles-replace-custom-property-depth': resolve('v9-styles-replace-custom-property-depth'),
    'v9-styles-replace-custom-property-font': resolve('v9-styles-replace-custom-property-font'),
    'v9-styles-replace-custom-property-legacy': resolve('v9-styles-replace-custom-property-legacy'),
    'v9-styles-replace-custom-property-motion': resolve('v9-styles-replace-custom-property-motion'),
    'v9-styles-tokenize-font': resolve('v9-styles-tokenize-font'),
    'v9-styles-tokenize-motion': resolve('v9-styles-tokenize-motion'),
    'v9-styles-tokenize-shape': resolve('v9-styles-tokenize-shape'),
    'v9-styles-tokenize-space': resolve('v9-styles-tokenize-space'),
  },
};
