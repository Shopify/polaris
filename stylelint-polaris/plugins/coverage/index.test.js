const path = require('path');

const {ruleName} = require('.');

const config = {
  colors: [
    {
      'color-named': 'never',
      'color-no-hex': [true, {message: 'Overridden category rule message'}],
    },
    {
      message: 'Appended category rule message',
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
      code: '.class {color: #bad;}',
      description: 'Overrides category rule warning text',
      message: 'Overridden category rule message (color-no-hex)',
    },
    {
      code: '.class {color: red;}',
      description: 'Appends message to category rule warning text',
      message:
        'Unexpected named color "red" (color-named) Appended category rule message',
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
