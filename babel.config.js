/**
 * @type {import('@babel/core').TransformOptions}
 */
module.exports = {
  presets: [['@shopify/babel-preset', {typescript: true, react: true}]],
  plugins: [['@shopify/react-i18n/babel', {mode: 'with-explicit-paths'}]],
  babelrcRoots: [
    '.',
    // Note: The following projects use rootMode: 'upward' to inherit
    // and merge with this root level config.
    './polaris-codemods',
    './polaris-migrator',
    './polaris-tokens',
    './polaris-icons',
    './polaris-react',
    './polaris-patterns',
  ],
};
