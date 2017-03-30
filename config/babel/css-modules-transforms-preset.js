module.exports = {
  plugins: [
    require.resolve('./stylesImportTransformer'),
    [
      'css-modules-transform', {
        extensions: ['.scss'],
        generateScopedName: require.resolve('./className'),
      },
    ],
  ],
};
