const path = require('path');

const {ruleName} = require('.');

const config = {
  colors: [
    {
      'color-named': 'never',
      'color-no-hex': [true, {message: 'Overridden category rule message'}],
      'function-disallowed-list': [
        'rgb',
        {
          message: (func) => `Overridden category rule message "${func}"`,
        },
      ],
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
    'polaris/global-disallowed-list': [/--p-legacy-var/],
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
      description: 'Overrides appended category rule warning text (string)',
      message: 'Overridden category rule message',
    },
    {
      code: '.class {color: red;}',
      description: 'Appends message to category rule warning text',
      message:
        'Unexpected named color "red" (color-named) Appended category rule message',
    },
    {
      code: '.class {color: rgb(0, 256, 0);}',
      description: 'Overrides appended category rule warning text (function)',
      message: 'Overridden category rule message "rgb(0, 256, 0)"',
    },
    {
      code: '@keyframes foo {}',
      description: 'Uses disallowed at-rule (built-in rule)',
      message: 'Unexpected at-rule "keyframes"',
    },
    {
      code: '.class {color: var(--p-legacy-var);}',
      description: 'Uses disallowed legacy variable (custom rule)',
      message: 'Unexpected disallowed value "--p-legacy-var"',
    },
  ],
});
