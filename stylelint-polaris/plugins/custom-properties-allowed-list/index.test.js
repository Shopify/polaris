const {getCustomPropertyNames, tokens} = require('@shopify/polaris-tokens');

const {messages, ruleName} = require('.');

const polarisCustomPropertyNames = getCustomPropertyNames(tokens);

// For external usage:
// -p-* Tokens are reserved for usage by polaris-tokens.
//   - Defining custom properties with this prefix is disallowed
//   - Usage of them is allowed
// -pc-* Tokens are reserved for usage by components in polaris-react
//  - Defining custom properties with this prefix is disallowed
//  - Usage of them is disallowed
// Any other tokens can be freely defined and used
const externalUserDefinedCustomPropertyNames = /--(?!pc?-).+/;
const externalConfig = [
  {
    allowedProperties: [externalUserDefinedCustomPropertyNames],
    allowedValues: {
      '/.+/': [
        ...polarisCustomPropertyNames,
        externalUserDefinedCustomPropertyNames,
      ],
    },
  },
];

// For internal usage:
// -p-* Tokens are reserved for usage by polaris-tokens.
//   - Defining custom properties with this prefix is disallowed
//   - Usage of them is allowed
// -pc-* Tokens are reserved for usage by components in polaris-react
//  - Defining custom properties with this prefix is allowed
//  - Usage of them is allowed
// Any other tokens should not be defined or used
const internalPolarisComponentCustomProperties = /--pc-.+/;
const internalConfig = [
  {
    allowedProperties: [
      '--polaris-version-number',
      internalPolarisComponentCustomProperties,
    ],
    allowedValues: {
      '/.+/': [
        internalPolarisComponentCustomProperties,
        ...polarisCustomPropertyNames,
      ],
    },
  },
];

testRule({
  ruleName,
  plugins: [__dirname],
  config: externalConfig,
  accept: [
    {
      code: '.a { border: 1px red; }',
      description: 'Uses no custom properties',
    },
    {
      code: '.a { --test: red; }',
      description:
        "Defining custom-properties that don't start with --p- or --pc-",
    },
    {
      code: '.a { color: var(--p-text); }',
      description: 'Using custom-properties from polaris-tokens',
    },
    {
      code: '.a { --test: red; color: var(--test); }',
      description: 'Using other custom-properties',
    },
  ],

  reject: [
    {
      code: '.a { --p-test: red; }',
      description:
        'Defining custom-properties that start with --p- is disallowed',
      message: messages.rejected('--p-test'),
      line: 1,
      column: 6,
      endLine: 1,
      endColumn: 20,
    },
    {
      code: '.a { --pc-test: red; }',
      description:
        'Defining custom-properties that start with --pc- is disallowed',
      message: messages.rejected('--pc-test'),
      line: 1,
      column: 6,
      endLine: 1,
      endColumn: 21,
    },
    {
      code: '.a { color: var(--p-unknown); }',
      description:
        'Using --p- prefixed tokens that do not exist in polaris-tokens is disallowed',
      message: messages.rejected(undefined, '--p-unknown'),
      line: 1,
      column: 6,
      endLine: 1,
      endColumn: 30,
    },
    {
      code: '.a { color: var(--pc-test); }',
      description: 'Using --pc- prefixed tokens is disallowed',
      message: messages.rejected(undefined, '--pc-test'),
      line: 1,
      column: 6,
      endLine: 1,
      endColumn: 28,
    },
  ],
});

testRule({
  ruleName,
  plugins: [__dirname],
  config: internalConfig,
  accept: [
    {
      code: '.a { --pc-test: red; }',
      description: 'Defining custom-properties that start with --pc-',
    },
    {
      code: '.a { color: var(--p-text); }',
      description: 'Using custom-properties from polaris-tokens',
    },
    {
      code: '.a { color: var(--pc-my-value); }',
      description: 'Using custom-properties that start with --pc-',
    },
  ],
  reject: [
    {
      code: '.a { --p-test: red; }',
      description:
        'Defining custom-properties that start with --p- is disallowed',
      message: messages.rejected('--p-test'),
      line: 1,
      column: 6,
      endLine: 1,
      endColumn: 20,
    },
    {
      code: '.a { --test: red; }',
      description:
        "Defining custom-properties that don't start with --p- or --pc- is disallowed",
      message: messages.rejected('--test'),
      line: 1,
      column: 6,
      endLine: 1,
      endColumn: 18,
    },
    {
      code: '.a { color: var(--test); }',
      description: 'Using other custom-properties',
      message: messages.rejected(undefined, '--test'),
      line: 1,
      column: 6,
      endLine: 1,
      endColumn: 25,
    },
  ],
});
