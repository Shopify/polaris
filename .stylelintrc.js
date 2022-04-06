module.exports = {
  extends: ['@shopify/stylelint-plugin/prettier', './stylelint-polaris'],
  overrides: [
    {
      files: ['polaris-react/**/*.scss'],
      extends: [
        '@shopify/stylelint-plugin/prettier',
        './stylelint-polaris/configs/internal',
      ],
    },
  ],
};
