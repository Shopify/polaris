/** @type {import('stylelint').Config} */
module.exports = {
  extends: ['@shopify/stylelint-plugin/prettier', './stylelint-polaris'],
  ignoreFiles: [
    'polaris-tokens/dist/**/*.{css,scss}',
    // TODO: Remove and address stylelint errors
    'polaris.shopify.com/**/*.{css,scss}',
  ],
  // Disabling @shopify/stylelint-plugin/configs/core no-unknown-animations as styelint
  // is not aware of global Polaris keyframes
  // TODO: create custom plugin to ensure animation-names match Polaris keyframe names
  rules: {
    'no-unknown-animations': undefined,
    'value-keyword-case': ['lower', {camelCaseSvgKeywords: true}],
  },
  overrides: [
    {
      files: ['polaris-react/**/*.{css,scss}'],
      ignoreFiles: ['polaris-react/build/**/*.{css,scss}'],
      extends: [
        '@shopify/stylelint-plugin/prettier',
        './stylelint-polaris/configs/internal',
      ],
    },
  ],
};
