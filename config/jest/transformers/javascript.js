const {createTransformer} = require('babel-jest');

const babelOptions = {
  presets: [
    ['shopify/node', {modules: 'commonjs'}],
    'shopify/react',
  ],
};

module.exports = createTransformer(babelOptions);
