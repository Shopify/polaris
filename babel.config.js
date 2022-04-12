module.exports = {
  presets: [['@shopify/babel-preset', {typescript: true}]],
  overrides: [
    {
      test: './polaris-react',
      presets: [['@shopify/babel-preset', {typescript: true, react: true}]],
    },
  ],
};
