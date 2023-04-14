const {messages, ruleName} = require('.');

const config = [
  {
    disallowedProperties: ['--p-foo', /--p-bar/],
    disallowedValues: {
      '/.+/': ['--p-foo', /--p-bar/],
    },
  },
];

testRule({
  ruleName,
  plugins: [__dirname],
  config,
  accept: [
    {
      code: '.a { --p-foo-bar: red; }',
      description: 'Defining allowed custom property',
    },
    {
      code: '.a { color: var(--p-foo-bar); }',
      description: 'Defining allowed custom property value',
    },
    {
      code: '.a { --p-foo-bar: var(--p-foo-bar); }',
      description: 'Defining allowed custom property and value',
    },
  ],

  reject: [
    {
      code: '.a { --p-foo: red; }',
      description: 'Defining disallowed custom property (literal match)',
      message: messages.rejected('--p-foo', 'red', true, undefined),
      line: 1,
      column: 6,
      endLine: 1,
      endColumn: 19,
    },
    {
      code: '.a { --p-bar-baz: red; }',
      description: 'Defining disallowed custom property (regex match)',
      message: messages.rejected('--p-bar-baz', 'red', true, undefined),
      line: 1,
      column: 6,
      endLine: 1,
      endColumn: 23,
    },
    {
      code: '.a { color: var(--p-foo); }',
      description: 'Defining disallowed custom property value (literal match)',
      message: messages.rejected('color', 'var(--p-foo)', false, ['--p-foo']),
      line: 1,
      column: 6,
      endLine: 1,
      endColumn: 26,
    },
    {
      code: '.a { color: var(--p-bar-baz); }',
      description: 'Defining disallowed custom property value (regex match)',
      message: messages.rejected('color', 'var(--p-bar-baz)', false, [
        '--p-bar-baz',
      ]),
      line: 1,
      column: 6,
      endLine: 1,
      endColumn: 30,
    },
    {
      code: '.a { --p-foo: var(--p-bar); }',
      description: 'Defining disallowed custom property and value',
      message: messages.rejected('--p-foo', 'var(--p-bar)', true, ['--p-bar']),
      line: 1,
      column: 6,
      endLine: 1,
      endColumn: 28,
    },
    {
      code: '.a { border: var(--p-foo) solid var(--p-bar); }',
      description: 'Defining multiple disallowed custom property values',
      message: messages.rejected(
        'border',
        'var(--p-foo) solid var(--p-bar)',
        false,
        ['--p-foo', '--p-bar'],
      ),
      line: 1,
      column: 6,
      endLine: 1,
      endColumn: 46,
    },
    {
      code: '.a { --p-foo: var(--p-foo) solid var(--p-bar); }',
      description: 'Defining multiple disallowed custom property and values',
      message: messages.rejected(
        '--p-foo',
        'var(--p-foo) solid var(--p-bar)',
        true,
        ['--p-foo', '--p-bar'],
      ),
      line: 1,
      column: 6,
      endLine: 1,
      endColumn: 47,
    },
  ],
});
