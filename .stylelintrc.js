/** @type {import('stylelint').Config} */
module.exports = {
  extends: ['@shopify/stylelint-plugin/prettier', './stylelint-polaris'],
  // Disabling @shopify/stylelint-plugin/configs/core no-unknown-animations as stylelint is not aware of global Polaris keyframes
  // TODO: create custom plugin to ensure animation-names match Polaris keyframe names
  customSyntax: 'postcss-scss',
  rules: {
    'no-unknown-animations': null,
    'value-keyword-case': ['lower', {camelCaseSvgKeywords: true}],
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
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
    {
      files: ['polaris-react/postcss-mixins/*.css'],
      rules: {
        'comment-word-disallowed-list': [
          /.*/,
          {
            message:
              'Comments in polaris-react/postcss-mixins/*.css cause postcss-mixins to error. To disable lint rules, add them to styleslintrc.js overrides.',
          },
        ],
        'scss/at-rule-no-unknown': null,
        'polaris/coverage': [
          true,
          {
            border: [
              {
                'polaris/at-rule-disallowed-list': null,
              },
            ],
            layout: [
              {
                'polaris/at-rule-disallowed-list': null,
              },
            ],
            conventions: {
              'polaris/custom-property-allowed-list': null,
            },
          },
        ],
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
