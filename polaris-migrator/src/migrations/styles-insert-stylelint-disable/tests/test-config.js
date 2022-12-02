module.exports = {
  customSyntax: 'postcss-scss',
  reportDescriptionlessDisables: true,
  plugins: ['@shopify/stylelint-polaris/plugins/at-rule-disallowed-list'],
  rules: {
    'unit-disallowed-list': ['rem'],
    'selector-pseudo-class-no-unknown': true,
    'stylelint-polaris/at-rule-disallowed-list': {
      include: [/([\w-]+\.)?safe-area-for($|\()/],
    },
  },
};
