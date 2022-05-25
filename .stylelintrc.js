module.exports = {
  extends: ['@shopify/stylelint-plugin/prettier', './stylelint-polaris'],
  // Disabling @shopify/stylelint-plugin/configs/core no-unknown-animations as styelint
  // is not aware of global Polaris keyframes
  // TODO: create custom plugin to ensure animation-names match Polaris keyframe names
  rules: {
    'no-unknown-animations': undefined,
    'value-keyword-case': ['lower', {camelCaseSvgKeywords: true}],
  },
  overrides: [
    {
      files: ['polaris-react/**/*.scss'],
      extends: [
        '@shopify/stylelint-plugin/prettier',
        './stylelint-polaris/configs/internal',
      ],
    },
  ],
};
