const {ruleName} = require('.');

const config = [[/\$font-size-data/, /--p-token/]];

testRule({
  ruleName,
  plugins: [__dirname],
  config,
  customSyntax: 'postcss-scss',
  accept: [
    {
      code: '.a { color: red; }',
      description: 'Uses nothing on the disallowed list',
    },
  ],

  reject: [
    {
      code: '.a { font-size: $font-size-data; }',
      description: 'Uses something on the disallowed list',
      message:
        'Unexpected disallowed value "$font-size-data" (polaris/global-disallowed-list)',
      line: 1,
      column: 17,
      endLine: 1,
      endColumn: 32,
    },
  ],
});
