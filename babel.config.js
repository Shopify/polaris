/**
 * @type {import('@babel/core').TransformOptions}
 */
module.exports = {
  presets: [
    [
      '@shopify/babel-preset',
      {typescript: true, react: true, reactOptions: {runtime: 'automatic'}},
    ],
  ],
  babelrcRoots: [
    '.',
    // Note: The following projects use rootMode: 'upward' to inherit
    // and merge with this root level config.
    './polaris-tokens',
    './polaris-icons',
    './polaris-react',
  ],
};
