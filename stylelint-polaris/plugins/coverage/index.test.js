const path = require('path');

const {ruleName} = require('.');

const config = {
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
    {
      code: `
      	/* stylelint-disable -- polaris: context */
        @keyframes foo {}
        /* stylelint-enable */
      `,
      description:
        'Uses disallowed at-rule with disable/enable comment and context',
    },
    {
      code: `
      	/* stylelint-disable -- polaris: context */
        @keyframes foo {}
      `,
      description:
        'Uses disallowed at-rule with disable comment and context and without enable comment',
    },
    {
      code: `
      	/* stylelint-disable-next-line -- polaris: context */
        @keyframes foo {}
      `,
      description:
        'Uses disallowed at-rule with disable next line comment and context',
    },
  ],

  reject: [
    {
      code: '@keyframes foo {}',
      description: 'Uses disallowed at-rule',
      message: 'Unexpected at-rule "keyframes" (at-rule-disallowed-list)',
    },
    {
      code: '.class {color: var(--p-legacy-var);}',
      description: 'Uses disallowed legacy variable',
      message:
        'Unexpected disallowed value "--p-legacy-var" (stylelint-polaris/global-disallowed-list)',
    },
    {
      code: `
      	/* stylelint-disable */
        @keyframes foo {}
        /* stylelint-enable */
      `,
      description:
        'Uses disallowed at-rule with disable/enable comment and without context',
      message:
        'Expected /* stylelint-disable -- polaris: Reason for disabling */',
    },
    {
      code: `
      	/* stylelint-disable */

        @keyframes fooz {}
      `,
      description:
        'Uses disallowed at-rule with disable comment and without context and enable comment',
      message:
        'Expected /* stylelint-disable -- polaris: Reason for disabling */',
    },
    {
      code: `
      	/* stylelint-disable-next-line */
        @keyframes foo {}
      `,
      description:
        'Uses disallowed at-rule with disable next line comment and without context',
      message:
        'Expected /* stylelint-disable-next-line -- polaris: Reason for disabling */',
    },
  ],
});
