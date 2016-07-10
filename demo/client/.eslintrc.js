module.exports = {
  extends: [
    'plugin:shopify/react',
  ],
  env: {
    es6: true,
    browser: true
  },
  settings: {
    'import/ignore': [
      'node_modules',
      '\\.s?css$',
    ],
  },
  rules: {
    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'shopify/require-flow': 'off',
  },
};
