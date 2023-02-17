const {getCustomPropertyNames, tokens} = require('@shopify/polaris-tokens');

const {messages, ruleName} = require('.');

const polarisCustomPropertyNames = getCustomPropertyNames(tokens);

/*
 --p-* Tokens are to be defined in polaris-tokens.
   - Defining custom properties with this prefix anywhere else is disallowed
   - Usage of them is allowed
 --pc-* Tokens are reserved for usage by components in polaris-react
  - Defining custom properties with this prefix is disallowed
  - Usage and definition of them is deprecated in polaris-react
  - Existing tokens with this prefix should be contributed to and/or replaced with polaris-tokens
*/

const allowedCustomPropertyNames = /--(?!(p|pc|polaris-version)-).+/;
const invalidOrDeprecatedPrivateCustomPropertyNames = /--(?!(p|pc)-).+/;
const config = [
  {
    allowedProperties: [allowedCustomPropertyNames],
    allowedValues: {
      '/.+/': [
        ...polarisCustomPropertyNames,
        invalidOrDeprecatedPrivateCustomPropertyNames,
      ],
    },
  },
];

testRule({
  ruleName,
  plugins: [__dirname],
  config,
  accept: [
    {
      code: '.a { border: 1px red; }',
      description: 'Use of no custom properties is allowed',
    },
    {
      code: '.a { --test: red; }',
      description:
        "Defining custom-properties that don't start with --p- or --pc- is allowed",
    },
    {
      code: '.a { color: var(--p-text); }',
      description: 'Using custom-properties from polaris-tokens is allowed',
    },
  ],

  reject: [
    {
      code: '.a { --p-test: red; }',
      description:
        'Defining custom-properties that start with --p- is disallowed',
      message: messages.rejected('--p-test', 'red', '--p-', true, undefined),
      line: 1,
      column: 6,
      endLine: 1,
      endColumn: 20,
    },
    {
      code: '.a { --pc-test: red; }',
      description:
        'Defining custom-properties that start with --pc- is disallowed',
      message: messages.rejected('--pc-test', 'red', '--pc-', true, undefined),
      line: 1,
      column: 6,
      endLine: 1,
      endColumn: 21,
    },
    {
      code: '.a { color: var(--p-unknown); }',
      description:
        'Using --p- prefixed tokens that do not exist in polaris-tokens is disallowed',
      message: messages.rejected(
        'color',
        'var(--p-unknown)',
        undefined,
        false,
        ['--p-unknown'],
      ),
      line: 1,
      column: 6,
      endLine: 1,
      endColumn: 30,
    },
    {
      code: '.a { color: var(--pc-test); }',
      description: 'Using --pc- prefixed tokens is disallowed',
      message: messages.rejected('color', 'var(--pc-test)', undefined, false, [
        '--pc-test',
      ]),
      line: 1,
      column: 6,
      endLine: 1,
      endColumn: 28,
    },
  ],
});
