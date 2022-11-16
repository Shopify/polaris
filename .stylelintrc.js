/** @type {import('stylelint').Config} */
module.exports = {
  extends: [/*'@shopify/stylelint-plugin/prettier', */ './stylelint-polaris'],
  // Disabling @shopify/stylelint-plugin/configs/core no-unknown-animations as stylelint is not aware of global Polaris keyframes
  // TODO: create custom plugin to ensure animation-names match Polaris keyframe names
  customSyntax: 'postcss-scss',
  rules: {
    'no-unknown-animations': null,
    'value-keyword-case': ['lower', {camelCaseSvgKeywords: true}],
  },
  overrides: [
    {
      files: ['polaris-migrator/**/tests/*.{css,scss}'],
      rules: {
        'comment-empty-line-before': null,
        'declaration-property-value-disallowed-list': null,
        'function-disallowed-list': null,
      },
    },
  ],
  ignoreFiles: [
    '**/.next/**/*.{css,scss}',
    '**/node_modules/**/*.{css,scss}',
    '**/dist/**/*.{css,scss}',
    'documentation/guides/legacy-polaris-v8-public-api.scss',
    'polaris-react/build/**/*.{css,scss}',
    'polaris-react/build-internal/**/*.{css,scss}',
    'stylelint-polaris/tests/**/*.{css,scss}',
    // TODO: Remove and address stylelint errors
    'polaris.shopify.com/**/*.{css,scss}',
  ],
};
