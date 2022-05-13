/* global testRule */

const {messages, ruleName} = require('.');

const config = ['--p-button-font'];

testRule({
  ruleName,
  plugins: [__dirname],
  config,
  customSyntax: 'postcss-scss',
  accept: [
    {
      code: '.valid { color: red; }',
      description: 'Uses nothing on the banned list',
    },
  ],

  reject: [
    {
      code: '.invalid { color: --p-button-font; }',
      description: 'Uses something on the banned list',
      message: messages.rejected('--p-button-font'),
      line: 1,
      column: 19,
      endLine: 1,
      endColumn: 34,
    },
  ],
});
