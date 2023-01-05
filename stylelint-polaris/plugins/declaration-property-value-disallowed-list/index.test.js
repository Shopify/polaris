const {ruleName} = require('.');

const config = {
  'font-weight': [/(\$.*|[0-9]+)/],
};

testRule({
  ruleName,
  plugins: [__dirname],
  config,
  customSyntax: 'postcss-scss',
  accept: [
    {
      code: '@font-face { font-weight: 400; }',
      description: '@font-face descriptors are ignored',
    },
  ],

  reject: [
    {
      code: '.class { font-weight: 400; }',
      description: 'Not using a Polaris custom property',
      message:
        'Unexpected value "400" for property "font-weight" (declaration-property-value-disallowed-list)',
    },
  ],
});
