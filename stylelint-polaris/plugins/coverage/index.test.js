const {ruleName} = require('.');

const config = {
  motion: {
    'at-rule-disallowed-list': [['keyframes'], {severity: 'warning'}],
  },
};

testRule({
  ruleName,
  plugins: [__dirname],
  config,
  customSyntax: 'postcss-scss',
  accept: [
    {
      code: '@media (min-width: 320px) {}',
      description: 'Uses allowed at-rule',
    },
  ],

  reject: [
    {
      code: '@keyframes foo {}',
      description: 'Uses disallowed at-rule',
      message:
        'Unexpected at-rule "keyframes" (stylelint-polaris/coverage/motion)',
    },
  ],
});
