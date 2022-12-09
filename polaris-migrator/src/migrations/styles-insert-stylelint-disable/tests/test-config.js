const path = require('path');

module.exports = {
  customSyntax: 'postcss-scss',
  reportDescriptionlessDisables: true,
  plugins: [
    path.join(
      __dirname,
      '../../../../../stylelint-polaris/plugins/at-rule-disallowed-list',
    ),
  ],
  rules: {
    'unit-disallowed-list': ['rem'],
    'selector-pseudo-class-no-unknown': true,
    'polaris/at-rule-disallowed-list': {
      include: [/([\w-]+\.)?safe-area-for($|\()/],
    },
  },
};
