const {messages, ruleName} = require('.');

const config = [[/rem\(/, /--p-button-font/, /@include layout-flex-fix/]];

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
      code: '.a { font-size: rem(20px); }',
      description: 'Uses something on the disallowed list',
      message: messages.rejected('rem('),
      line: 1,
      column: 17,
      endLine: 1,
      endColumn: 21,
    },
    {
      code: '.a { color: var(--p-button-font); }',
      description: 'Uses something on the disallowed list',
      message: messages.rejected('--p-button-font'),
      line: 1,
      column: 17,
      endLine: 1,
      endColumn: 32,
    },
    // {
    //   code: '.a { @include layout-flex-fix(); }',
    //   description: 'Uses something on the disallowed list',
    //   message: messages.rejected('@include layout-flex-fix'),
    //   line: 1,
    //   column: 17,
    //   endLine: 1,
    //   endColumn: 32,
    // },
  ],
});
