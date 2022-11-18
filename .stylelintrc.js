/** @type {import('stylelint').Config} */
module.exports = {
  extends: ['./stylelint-polaris'],
  // Disabling @shopify/stylelint-plugin/configs/core no-unknown-animations as styelint
  // is not aware of global Polaris keyframes
  // TODO: create custom plugin to ensure animation-names match Polaris keyframe names
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
