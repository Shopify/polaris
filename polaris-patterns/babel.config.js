/**
 * @type {import('@babel/core').TransformOptions}
 */
module.exports = {
  presets: [['@shopify/babel-preset', {typescript: true, react: true}]],
  plugins: [['@shopify/react-i18n/babel', {mode: 'with-explicit-paths'}]],
  babelrcRoots: ['.'],
};
