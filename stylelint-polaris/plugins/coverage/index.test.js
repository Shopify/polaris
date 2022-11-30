const path = require('path');

const {ruleName} = require('.');

const config = {
  colors: [
    {
      'color-named': 'never',
    },
    {
      message:
        'Please use a Polaris color token: https://polaris.shopify.com/tokens/colors',
    },
  ],
  motion: {
    'at-rule-disallowed-list': [['keyframes'], {severity: 'warning'}],
  },
  legacy: {
    // Test case for calling `checkAgainstRule` with custom rules
    'stylelint-polaris/global-disallowed-list': [/--p-legacy-var/],
  },
};

testRule({
  ruleName,
  plugins: [__dirname, path.resolve(__dirname, '../global-disallowed-list')],
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
      code: '.class {color: red;}',
      description: 'Appends custom category message to rule warning text',
      message:
        'Unexpected named color "red" (color-named) Please use a Polaris color token: https://polaris.shopify.com/tokens/colors',
    },
    {
      code: '@keyframes foo {}',
      description: 'Uses disallowed at-rule (built-in rule)',
      message: 'Unexpected at-rule "keyframes" (at-rule-disallowed-list)',
    },
    {
      code: '.class {color: var(--p-legacy-var);}',
      description: 'Uses disallowed legacy variable (custom rule)',
      message:
        'Unexpected disallowed value "--p-legacy-var" (stylelint-polaris/global-disallowed-list)',
    },
  ],
});
