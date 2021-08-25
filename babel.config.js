module.exports = {
  presets: [
    [
      '@shopify/babel-preset',
      {typescript: true, react: true, reactOptions: {runtime: 'automatic'}},
    ],
  ],
};
